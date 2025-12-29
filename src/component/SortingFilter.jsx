import React from "react";

function SortingFilter({ click }) {
  // console.log(click);

  return (
    <div>
      <div className="flex justify-center items-center">
        <select
          onChange={(e) => click(e.target.value)}
          className="text-white py-2 px-3 bg-gray-800 rounded-xl border-2"
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
