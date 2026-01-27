import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../contextFile/CartContext";
import { toast } from "react-toastify";

const drinks = [
  { id: 1, name: "Coca Cola", price: 2.99 },
  { id: 2, name: "Pepsi", price: 2.99 },
  { id: 3, name: "Sprite", price: 2.99 },
  { id: 4, name: "Orange Juice", price: 3.99 },
  { id: 5, name: "Water", price: 1.99 },
  { id: 6, name: "No Drink", price: 0 },
  { id: 7, name: "Fanta", price: 2.99 },
  { id: 8, name: "Lemonade", price: 3.49 },
  { id: 9, name: "Iced Tea", price: 3.29 },
  { id: 10, name: "Coffee", price: 2.49 },
  { id: 11, name: "Green Tea", price: 2.79 },
  { id: 12, name: "Milkshake", price: 4.99 },
  { id: 13, name: "Smoothie", price: 5.49 },
  { id: 14, name: "Energy Drink", price: 3.99 },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedDrink, setSelectedDrink] = useState(drinks[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.194 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/collection")}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
          >
            Browse Collection
          </button>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 ${
            index < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  const totalPrice = (product.price + selectedDrink.price) * quantity;

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAdding(true);

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 300));

    addToCart(product, quantity, selectedDrink);

    toast.success(
      `Added ${quantity} ${product.title}${quantity > 1 ? "s" : ""} to cart!`,
      {
        autoClose: 1500,
        position: "bottom-right",
        style: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          borderRadius: "12px",
          padding: "16px",
        },
      },
    );

    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 mb-8 text-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-600 transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>
          <span className="text-gray-400">/</span>
          {/* <button
            onClick={() => navigate("/collection")}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Collection
          </button> */}
          {/* <span className="text-gray-400">/</span> */}
          <span className="text-gray-400 font-medium truncate max-w-xs">
            {product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-4">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    NEW ARRIVAL
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery (if you have multiple images) */}
            {/* <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="bg-white rounded-xl shadow-sm overflow-hidden p-2 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg"></div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 lg:p-8">
              {/* Product Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-3">
                  {product.title}
                </h1>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-semibold text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                    <span className="text-sm text-white ml-2">
                      ({product.reviews || 124})
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-8"></div>
              {/* {/* Drink Selection Dropdown */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Add a Drink
                  </h3>
                  <span className="text-sm text-gray-400">Optional</span>
                </div>

                <div className="relative">
                  <select
                    value={selectedDrink.id}
                    onChange={(e) => {
                      const drink = drinks.find(
                        (d) => d.id === parseInt(e.target.value),
                      );
                      setSelectedDrink(drink);
                    }}
                    className="appearance-none w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 font-medium text-lg"
                  >
                    {drinks.map((drink) => (
                      <option key={drink.id} value={drink.id}>
                        {drink.name}{" "}
                        {drink.price > 0 ? `(+$${drink.price.toFixed(2)})` : ""}
                      </option>
                    ))}
                  </select>

                  {/* Custom dropdown arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Selected drink price display */}
                {selectedDrink.price > 0 && (
                  <div className="mt-3 flex items-center justify-between px-1">
                    <span className="text-sm text-white">
                      Selected:{" "}
                      <span className="font-medium">{selectedDrink.name}</span>
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      +${selectedDrink.price.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-8"></div>

              {/* Quantity & Actions */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Quantity
                    </h3>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={quantity <= 1}
                      >
                        −
                      </button>
                      <div className="w-16 text-center">
                        <span className="text-2xl font-bold text-white">
                          {quantity}
                        </span>
                      </div>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors font-bold text-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total Price Display */}
                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-1">
                      Total Price
                    </div>
                    <div className="text-3xl font-bold text-white">
                      ${totalPrice.toFixed(2)}
                    </div>
                    {selectedDrink.price > 0 && (
                      <div className="text-sm text-gray-400 mt-1">
                        Includes ${selectedDrink.price.toFixed(2)} for{" "}
                        {selectedDrink.name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl active:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isAdding ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Adding...
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 group-hover:scale-110 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      handleAddToCart();
                      navigate("/checkout");
                    }}
                    className="bg-gradient-to-r from-gray-900 to-black text-white py-4 rounded-xl font-semibold text-lg hover:from-black hover:to-gray-900 transition-all shadow-lg hover:shadow-xl active:shadow-md flex items-center justify-center gap-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Product Highlights */}
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Product Highlights
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-400">
                    Premium quality materials
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-400">Eco-friendly packaging</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-400">
                    1-year warranty included
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
