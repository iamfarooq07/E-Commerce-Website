import React, { useState } from "react";
import { useCart } from "../contextFile/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEcommerceAuth } from "../contexts/EcommerceAuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Checkout() {
  const { cartItems, getTotalPrice } = useCart();
  const { user } = useEcommerceAuth();
  const total = getTotalPrice() ?? 0;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    city: "",
    address: "",
    paymentMethod: "cash",
  });
  const [placing, setPlacing] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!user) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    setPlacing(true);
    try {
      const token = localStorage.getItem("ecommerce_token");

      // Map cart items to order format
      const items = cartItems.map((item) => ({
        foodItem: item._id || item.id,
        quantity: item.cartQty,
        price: item.price,
      }));

      const payload = {
        items,
        totalAmount: total,
        deliveryAddress: {
          street: form.address,
          city: form.city,
          phone: form.phone,
        },
        paymentMethod: form.paymentMethod,
      };

      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Order failed");

      toast.success("Order placed successfully!", { autoClose: 2000 });
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 text-gray-100 rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                required
                className="border p-3 rounded-xl w-full bg-gray-700 text-white"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email Address"
                required
                className="border p-3 rounded-xl w-full bg-gray-700 text-white"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="text"
                placeholder="Phone Number"
                required
                className="border p-3 rounded-xl w-full bg-gray-700 text-white"
              />
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                type="text"
                placeholder="City"
                required
                className="border p-3 rounded-xl w-full bg-gray-700 text-white"
              />
            </div>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Full Address"
              required
              className="border p-3 rounded-xl w-full mt-4 h-24 resize-none bg-gray-700 text-white"
            />
          </div>

          <div className="bg-gray-800 text-gray-100 rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-3">
              {[
                { value: "cash", label: "Cash on Delivery" },
                { value: "card", label: "Credit / Debit Card" },
                { value: "online", label: "JazzCash / EasyPaisa" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer bg-gray-700">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.value}
                    checked={form.paymentMethod === opt.value}
                    onChange={handleChange}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={placing}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3 rounded-xl font-semibold"
          >
            {placing ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-800 text-gray-100 rounded-2xl shadow p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is empty</p>
            ) : (
              cartItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <img
                    src={item.imageURL || item.image}
                    alt={item.name || item.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name || item.title}</p>
                    <p className="text-gray-300 text-sm">Qty: {item.cartQty}</p>
                    <p className="font-semibold">PKR {(item.price * item.cartQty).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
            <div className="flex justify-between border-t border-gray-600 pt-4">
              <span>Subtotal</span>
              <span>PKR {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-400">Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-600 pt-4">
              <span>Total</span>
              <span>PKR {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
