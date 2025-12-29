import { getVisibleProducts } from "../data/product-filters";
import { useState } from "react";
import { priceRange } from "../data/products";

import CategoryFilter from "../component/CategoryFilter";
import Products from "../component/Products";
import Ratingfilter from "../component/Ratingfilter";
import Pricefilter from "../component/Pricefilter";
import SortingFilter from "../component/SortingFilter";
import Pagination from "../component/Pagination";
import FilterChip from "../component/FilterChip";

function Colections() {
  // Rating Filter Logic
  const [selectedRatings, setSelectedRatings] = useState([]);

  const onChangeRatingHandler = (rating, isChecked) => {
    if (isChecked) {
      setSelectedRatings([...selectedRatings, rating]);
    } else {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    }
  };

  // Category Filter Logic
  const [selectedCategories, setSelectedCategories] = useState([]);

  const onChangeCategoryHandler = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    }
  };

  // Price Filter Logic
  const initPriceFilter = {
    min: priceRange.min,
    max: priceRange.max,
    isApplied: false,
  };
  const [initPriceRange, setInitPriceRange] = useState(initPriceFilter);

  const filteredProducts = getVisibleProducts(
    selectedCategories,
    selectedRatings,
    initPriceRange
  );

  // Product Sorting Filter Logic
  const [selectedSort, setSelectedSort] = useState("");

  const sortProducts = (sortValue) => {
    setSelectedSort(sortValue);
  };

  const sortedProducts = [...filteredProducts];

  if (selectedSort === "ratingHightToLow") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  } else if (selectedSort === "ratingLowToHight") {
    sortedProducts.sort((a, b) => a.rating - b.rating);
  } else if (selectedSort === "PriceHightToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === "PriceLowToHight") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  // Pagination Filter Logic
  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const totalItems = sortedProducts.length;

  const startIndex = (currentPage - 1) * pageSize;

  const endIndex = startIndex + pageSize;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
  // console.log(selectedCategories);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-3 my-2 mx-2">
        <div className="col-span-2">
          {/* Category Filter */}
          <CategoryFilter
            selectedCategories={selectedCategories}
            onChangeCategory={onChangeCategoryHandler}
          />

          {/* Price Filter */}
          <Pricefilter
            init={initPriceRange}
            price={priceRange}
            setfun={setInitPriceRange}
          />
          {/* Rating Filter */}
          <Ratingfilter
            selectedRatings={selectedRatings}
            onChangeRating={onChangeRatingHandler}
          />
          {/* <button className="relative mb-2 p-2 w-full border-2 overflow-hidden rounded-xl bg-black text-white cursor-pointer group">
            <span className="relative z-10">Clear All</span>
            <span
              className="absolute top-0 left-0 w-full h-full rounded-xl 
             hover:border-none bg-gray-500 scale-x-0 origin-left transition-transform group-hover:scale-x-100"
            ></span>
          </button> */}
          <SortingFilter click={sortProducts} />
        </div>

        <div className="col-span-10">
          <FilterChip
            seleted={selectedCategories}
            onRemoveCategory={onChangeCategoryHandler}
          />

          <hr className="my-2" />
          <Products products={paginatedProducts} />

          <Pagination
            totalItems={totalItems}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Colections;
