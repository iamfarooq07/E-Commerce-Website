import Checkbox from "./Checkbox";
import { categoryTitle } from "../data/category";

function CategoryFilter({ selectedCategories, onChangeCategory }) {
  return (
    <div className="h-auto p-5 space-y-2 bg-gray-800 border border-gray-200 shadow-lg rounded-md">
      {categoryTitle.map((category, index) => (
        <Checkbox
          key={index}
          text={category}
          checked={selectedCategories.includes(category)}
          onChange={(e) => onChangeCategory(category, e.target.checked)}
        />
      ))}
    </div>
  );
}

export default CategoryFilter;
