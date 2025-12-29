import React from "react";

function Pagination({ totalItems, pageSize, currentPage, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const windowSize = 5;
  let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
  let end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);

  const pages = [];
  for (let p = start; p <= end; p++) {
    pages.push(p);
  }

  return (
    <div className="flex items-center gap-2 justify-center my-4">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md border bg-neutral-800 border-neutral-700 hover:bg-neutral-700 disabled:opacity-50"
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded-md border ${
            p === currentPage
              ? "bg-sky-600 border-sky-500"
              : "bg-neutral-800 border-neutral-700 hover:bg-neutral-700"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md border bg-neutral-800 border-neutral-700 hover:bg-neutral-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
