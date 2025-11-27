import React from "react";
const categoies = [
  "All",

  "Men's Pants",
  "Men's Boot",
  "Bag",
  "Cap",
  "Men's Sneaker",
  "Earphones",
  "Bottle",
];
const ShopCategory = ({ filterCtaegory, selectCategory }) => {
  return (
    <div className="mt-3 pl-2  ">
      <h2 className="text-lg font-sans">ShopCategory</h2>
      <div className="flex flex-row flex-wrap gap-5 mt-4 py-3">
        {categoies.map((cat, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                filterCtaegory(cat);
              }}
              className={`p-2 bg-gray-300/50 rounded-md text-black ${
                selectCategory === cat
                  ? "bg-rose-600 text-white"
                  : "bg-gray-300/50 "
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
