import React from "react";
import { useCart } from "../contextFile/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const { cartItems, getTotalPrice } = useCart();
  const total = getTotalPrice() ?? 0;

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    toast.success("Order Placed Successfully!", {
      autoClose: 1500,
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 text-gray-100 rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border p-3 rounded-xl w-full bg-gray-700 text-white"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border p-3 rounded-xl w-full bg-gray-700 text-white"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="border p-3 rounded-xl w-full bg-gray-700 text-white"
              />
              <input
                type="text"
                placeholder="City"
                className="border p-3 rounded-xl w-full bg-gray-700 text-white"
              />
            </div>
            <textarea
              placeholder="Full Address"
              className="border p-3 rounded-xl w-full mt-4 h-62 resize-none bg-gray-700 text-white"
            />
          </div>

          {/* Payment Method */}
          <div className="bg-gray-800 text-gray-100 rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer bg-gray-700">
                <input type="radio" name="payment" />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer bg-gray-700">
                <input type="radio" name="payment" />
                <span>Credit / Debit Card</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer bg-gray-700">
                <input type="radio" name="payment" />
                <span>JazzCash / EasyPaisa</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Order Summary */}
        <div className="bg-gray-800 text-gray-100 rounded-2xl shadow p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-4">
            {/* Dynamic Cart Items */}
            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl"
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
            onClick={handlePlaceOrder}
            className="block w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl mt-6 text-center font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
