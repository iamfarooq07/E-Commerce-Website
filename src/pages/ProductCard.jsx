import { Link } from "react-router-dom";
import { useCart } from "../contextFile/CartContext";
import CartItem from "../component/CartItem";

const Cart = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const total = getTotalPrice();
  // console.log(total);
  console.log(cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen  py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Your Card is Empty</h1>
          <p className="text-gray-600 mb-8">
            Add some delicious items to get started!
          </p>
          <Link
            to="/products"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold tracking-wide">🛒 Shopping Card</h1>

          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 font-semibold transition"
          >
            Clear Card
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* LEFT SIDE – CART ITEMS */}
          <div className="col-span-8 bg-gray-800/60 backdrop-blur-xl text-gray-100 rounded-2xl shadow-xl border border-gray-700">
            <div className="p-5 border-b border-gray-700/70">
              <h2 className="text-xl font-semibold tracking-wide">
                Your Items
              </h2>
            </div>

            <div className="bg-gray-800">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartItem key={item.cartItemId} item={item} />
                ))
              ) : (
                <p className="p-6 text-center text-gray-400">
                  Your cart is empty
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE – SUMMARY */}
          <div className="col-span-4">
            <div className="bg-gray-800/70 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 tracking-wide">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>Shipping:</span>
                  <span className="font-medium text-green-400">Free</span>
                </div>

                <div className="border-t border-gray-700 pt-4 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="block w-full bg-blue-600 hover:bg-blue-500 transition text-white text-center py-3 rounded-xl font-semibold shadow-lg mb-3"
              >
                Proceed to Checkout
              </Link>

              {/* Shopping Button */}
              <Link
                to="/products"
                className="block w-full bg-gray-700 hover:bg-gray-600 transition text-gray-200 text-center py-3 rounded-xl font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
