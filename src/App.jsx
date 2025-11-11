import { getVisibleProducts } from "./data/product-filters";
import { useState } from "react";
import { priceRange } from "./data/products";

import CategoryFilter from "./components/CategoryFilter";
import Products from "./components/Products";
import Ratingfilter from "./components/Ratingfilter";
import Pricefilter from "./components/Pricefilter";
import SortingFilter from "./components/SortingFilter";

function App() {
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
        </div>

        <div className="col-span-10">
          <SortingFilter click={sortProducts} />
          <hr className="my-4" />
          <Products products={sortedProducts} />
        </div>
      </div>
    </div>
  );
}

export default App;
