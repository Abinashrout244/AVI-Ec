import React from "react";

const Pegination = ({ productperpage, totalproducts, currPage, peginate }) => {
  const totalPages = Math.ceil(totalproducts / productperpage);

  const pagenums = [];
  for (let i = 1; i <= totalPages; i++) {
    pagenums.push(i);
  }

  const goPrev = () => {
    if (currPage > 1) peginate(currPage - 1);
  };

  const goNext = () => {
    if (currPage < totalPages) peginate(currPage + 1);
  };

  return (
    <div
      className="
  flex items-center justify-center 
  gap-2 md:gap-3 
  mt-6 flex-wrap
  px-3
"
    >
      {/* Prev Button */}
      <button
        onClick={goPrev}
        disabled={currPage === 1}
        className="
      p-2 md:p-3
      disabled:opacity-40 disabled:cursor-not-allowed
    "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          className="md:w-4 md:h-4"
          viewBox="0 0 16 16"
        >
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
        </svg>
      </button>

      {/* Page Numbers */}
      <ul className="flex gap-2 md:gap-4 flex-wrap justify-center">
        {pagenums.map((num) => (
          <li key={num}>
            <button
              onClick={() => peginate(num)}
              className={`
            px-3 py-1.5 md:px-4 md:py-2 
            rounded-full shadow text-sm md:text-base
            transition-all
            ${
              currPage === num
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold scale-105"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
            }
          `}
            >
              {num}
            </button>
          </li>
        ))}
      </ul>

      {/* Next Button */}
      <button
        onClick={goNext}
        disabled={currPage === totalPages}
        className="
      p-2 md:p-3
      disabled:opacity-40 disabled:cursor-not-allowed
    "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          className="md:w-4 md:h-4"
          viewBox="0 0 16 16"
        >
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
      </button>
    </div>
  );
};

export default Pegination;
