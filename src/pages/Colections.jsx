import { useState, useEffect } from "react";
import { fetchPublicProducts } from "../services/api";

import CategoryFilter from "../component/CategoryFilter";
import Products from "../component/Products";
import Ratingfilter from "../component/Ratingfilter";
import Pricefilter from "../component/Pricefilter";
import SortingFilter from "../component/SortingFilter";
import Pagination from "../component/Pagination";
import FilterChip from "../component/FilterChip";

function Colections() {
  const [allProducts, setAllProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicProducts()
      .then((data) => {
        setAllProducts(data);
        if (data.length > 0) {
          const prices = data.map((p) => p.price);
          setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    }
  };

  // Price Filter Logic
  const [initPriceRange, setInitPriceRange] = useState({ min: 0, max: 1000, isApplied: false });

  // Apply filters
  let filteredProducts = allProducts;

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      selectedCategories.includes(p.category)
    );
  }
  if (selectedRatings.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      selectedRatings.includes(p.rating)
    );
  }
  if (initPriceRange.isApplied) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= initPriceRange.min && p.price <= initPriceRange.max
    );
  }

  // Sorting
  const [selectedSort, setSelectedSort] = useState("");
  const sortedProducts = [...filteredProducts];

  if (selectedSort === "ratingHightToLow") sortedProducts.sort((a, b) => b.rating - a.rating);
  else if (selectedSort === "ratingLowToHight") sortedProducts.sort((a, b) => a.rating - b.rating);
  else if (selectedSort === "PriceHightToLow") sortedProducts.sort((a, b) => b.price - a.price);
  else if (selectedSort === "PriceLowToHight") sortedProducts.sort((a, b) => a.price - b.price);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalItems = sortedProducts.length;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + pageSize);

  // Normalize DB products to match ProductCard field names
  const normalizedProducts = paginatedProducts.map((p) => ({
    ...p,
    id: p._id || p.id,
    title: p.name || p.title,
    image: p.imageURL || p.image,
  }));

  return (
    <div>
      {loading && <p className="text-center text-gray-400 py-10">Loading products...</p>}
      {!loading && (
        <div className="grid grid-cols-12 gap-3 my-2 mx-2">
          <div className="col-span-2">
            <CategoryFilter
              selectedCategories={selectedCategories}
              onChangeCategory={onChangeCategoryHandler}
            />
            <Pricefilter
              init={initPriceRange}
              price={priceRange}
              setfun={setInitPriceRange}
            />
            <Ratingfilter
              selectedRatings={selectedRatings}
              onChangeRating={onChangeRatingHandler}
            />
            <SortingFilter click={setSelectedSort} />
          </div>

          <div className="col-span-10">
            <FilterChip
              seleted={selectedCategories}
              onRemoveCategory={onChangeCategoryHandler}
            />
            <hr className="my-2" />
            <Products products={normalizedProducts} />
            <Pagination
              totalItems={totalItems}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Colections;
