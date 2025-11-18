import React from "react";

function Maincard({ name, price, image, description }) {
  console.log();

  return (
    <div>
      <div className="border-gray-400 border-2 w-70 m-5 rounded p-1 shadow-lg">
        <img
          src={image}
          alt="Product image"
          className="w-full h-48 object-cover"
        />

        <h1 className="mt-4 text-3xl font-bold">{name}</h1>
        <p className="mt-2 text-gray-400 text-sm">{description}</p>
        <div className="flex justify-between items-center my-4 mx-2">
          <h3 className="text-2xl text-gray-200">Rs {price}</h3>
          <button className="border-2 px-4 py-2 rounded-2xl text-gray-400 hover:text-white">
            Add to Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default Maincard;
