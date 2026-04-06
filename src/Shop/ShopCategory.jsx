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
    <div className="mt-3 pl-2">
      <h2 className="text-lg font-sans text-white">Shop Category</h2>
      <div className="flex flex-row flex-wrap gap-5 mt-4 py-3">
        {categoies.map((cat, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                filterCtaegory(cat);
              }}
              className={`p-2 rounded-full text-sm border border-white/10 text-slate-200 ${
                selectCategory === cat
                  ? "bg-amber-300 text-slate-900"
                  : "bg-white/5 hover:bg-white/10"
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
