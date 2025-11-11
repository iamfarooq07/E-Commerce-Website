import React from "react";

function SortingFilter({ click }) {
  console.log(click);

  return (
    <div>
      <div className="bg-black text-white flex justify-end items-center px-4">
        <select
          onChange={(e) => click(e.target.value)}
          className="bg-black text-white my-2 px-3 py-3 border-2 rounded-2xl border-white"
        >
          <option value="PriceLowToHight">Price low to High</option>
          <option value="PriceHightToLow">Price High to Low</option>
          <option value="ratingHightToLow">Rating High to low</option>
          <option value="ratingLowToHight">Rating low to High</option>
        </select>
      </div>
    </div>
  );
}

export default SortingFilter;
