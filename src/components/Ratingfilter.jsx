import React from "react";

function Ratingfilter({ selectedRatings, onChangeRating }) {
  const ratings = [5, 4, 3, 2, 1];
  // console.log(ratings);

  return (
    <div className="my-3">
      <div className="w-full py-3 bg-black border-2 border-white shadow-xl rounded">
        {ratings.map((rating) => (
          <div
            key={rating}
            className="flex items-center px-5 mb-2 cursor-pointer"
            onClick={() => {
              if (selectedRatings.includes(rating)) {
                onChangeRating(rating, false);
              } else {
                onChangeRating(rating, true);
              }
            }}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < rating ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={i < rating ? "currentColor" : "gray"}
                className={`w-6 h-6 ${
                  i < rating ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.5a.562.562 0 0 1 1.04 0l2.125 5.11a.563.563 0 0 0 .475.344l5.518.443c.499.04.701.664.321.988l-4.204 3.603a.563.563 0 0 0-.182.556l1.285 5.386a.562.562 0 0 1-.84.609l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.609l1.285-5.386a.563.563 0 0 0-.182-.556l-4.204-3.603a.562.562 0 0 1 .321-.988l5.518-.443a.563.563 0 0 0 .475-.344L11.48 3.5Z"
                />
              </svg>
            ))}
            <span className="px-2">{rating}+</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ratingfilter;
