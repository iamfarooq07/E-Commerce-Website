import React from "react";

function FilterChip({ seleted, onRemoveCategory }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 flex-wrap my-2">
        {seleted.map((cat) => (
          <button
            key={cat}
            onClick={() => onRemoveCategory(cat, false)}
            className="flex items-center gap-1 bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
          >
            {cat} <i className="fa-solid fa-xmark text-black"></i>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterChip;
