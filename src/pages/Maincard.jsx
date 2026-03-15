import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contextFile/CartContext";

function Maincard({ product }) {
  const { addToCart } = useCart();
  const id = product._id || product.id;
  const title = product.name || product.title;
  const image = product.imageURL || product.image;

  const handleAddToCart = () => {
    const normalized = { ...product, id, title, image };
    addToCart(normalized, 1, { id: 0, name: "No Drink", price: 0 });
  };

  return (
    <div className="bg-gray-800 text-white w-full border-white rounded-xl shadow-xl p-4 border-2">
      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </Link>

      <h1 className="mt-4 text-xl font-bold">{title}</h1>

      <p className="mt-2 text-gray-200 text-sm leading-relaxed">
        {product.description}
      </p>

      <div className="flex justify-between items-center mt-4">
        <h3 className="text-xl font-semibold text-gray-200">
          Rs {product.price}
        </h3>

        <button onClick={handleAddToCart} className="border-white flex items-center gap-2 border px-3 py-1.5 rounded-lg font-medium hover:bg-black hover:scale-105 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}

export default Maincard;
