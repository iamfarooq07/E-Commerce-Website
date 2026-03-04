import React, { useState } from "react";
import { useCart } from "../contextFile/CartContext";
import { useAuth } from "../contextFile/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderAPI } from "../services/api";

function CheckoutBackend() {
  const { cartItems, getTotalPrice } = useCart();
  const { user } = useAuth();
  const total = getTotalPrice() ?? 0;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
    phone: "",
    city: "",
    address: "",
    paymentMethod: "cash"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Validation
    if (!user) {
      toast.error("Please login to place an order");
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.city || !formData.address) {
      toast.error("Please fill all shipping information");
      return;
    }

    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          foodItem: item.id, // This should be MongoDB _id from backend
          quantity: item.cartQty,
          price: item.price + (item.drink?.price || 0)
        })),
        totalAmount: total,
        deliveryAddress: {
          street: formData.address,
          city: formData.city,
          zipCode: "", // Add if you have zipcode field
          phone: formData.phone
        },
        paymentMethod: formData.paymentMethod
      };

      const response = await orderAPI.createOrder(orderData);

      toast.success("Order Placed Successfully!", {
        autoClose: 2000,
      });

      console.log('Order created:', response.data);

      // Clear cart and redirect
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      const message = error.response?.data?.message || "Failed to place order. Please try again.";
      toast.error(message);
      console.error('Order error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="bg-gray-800 text-gray-100 rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
                className="border p-3 rounded-xl w-full bg-gray-700 text-white"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                required
                className="border p-3 rounded-xl w-full bg-gray-700 text-white"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
                className="border p-3 rounded-xl w-full bg-gray-700 text-white"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                required
                className="border p-3 rounded-xl w-full bg-gray-700 text-white"
              />
            </div>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Full Address"
              required
              className="border p-3 rounded-xl w-full mt-4 h-24 resize-none bg-gray-700 text-white"
            />
          </div>

          {/* Payment Method */}
          <div className="bg-gray-800 text-gray-100 rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer bg-gray-700">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === "cash"}
                  onChange={handleInputChange}
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer bg-gray-700">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleInputChange}
                />
                <span>Credit / Debit Card</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer bg-gray-700">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={formData.paymentMethod === "online"}
                  onChange={handleInputChange}
                />
                <span>JazzCash / EasyPaisa</span>
              </label>
            </div>
          </div>
        </form>

        {/* RIGHT SIDE: Order Summary */}
        <div className="bg-gray-800 text-gray-100 rounded-2xl shadow p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-4">
            {/* Dynamic Cart Items */}
            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is empty</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    {item.drink && (
                      <p className="text-gray-400 text-sm">
                        Drink: {item.drink.name} (+${item.drink.price})
                      </p>
                    )}
                    <p className="text-gray-300">Qty: {item.cartQty}</p>
                    <p className="font-semibold">
                      $
                      {(
                        (item.price + (item.drink?.price ?? 0)) *
                        item.cartQty
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}

            {/* Summary */}
            <div className="flex justify-between border-t border-gray-600 pt-4">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-400">Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-600 pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            onClick={handlePlaceOrder}
            disabled={loading || cartItems.length === 0}
            className="block w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl mt-6 text-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutBackend;
