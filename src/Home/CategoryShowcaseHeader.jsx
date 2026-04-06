import React from "react";
import { Link } from "react-router-dom";

const CategoryShowcaseHeader = ({ filterItem, active }) => {
  return (
    <div className="flex items-center flex-col flex-wrap md:flex-row justify-center md:justify-between gap-4 md:px-20 py-4 glass-panel rounded-2xl">
      <h1 className="text-4xl font-semibold text-white">Our Products</h1>
      <ul className="flex flex-row gap-6 md:gap-16 flex-wrap justify-center items-center md:justify-around">
        <button
          onClick={() => filterItem("All")}
          className={`text-lg font-semibold  hover:bg-amber-300/10 hover:px-3 hover:py-1 hover:rounded-full ${
            active == "All" ? "text-amber-300" : "text-slate-200"
          }`}
        >
          <li>All</li>
        </button>
        <button
          onClick={() => filterItem("Shoes")}
          className={`text-lg font-semibold hover:bg-amber-300/10 hover:px-3 hover:py-1 hover:rounded-full ${
            active == "Shoes" ? "text-amber-300" : "text-slate-200"
          }`}
        >
          <li>Shoes</li>
        </button>
        <button
          onClick={() => filterItem("Bags")}
          className={`text-lg font-semibold hover:bg-amber-300/10 hover:px-3 hover:py-1 hover:rounded-full ${
            active == "Bags" ? "text-amber-300" : "text-slate-200"
          }`}
        >
          <li>Bags</li>
        </button>
        <button
          onClick={() => filterItem("Phones")}
          className={`text-lg font-semibold  hover:bg-amber-300/10 hover:px-3 hover:py-1 hover:rounded-full ${
            active == "Phones" ? "text-amber-300" : "text-slate-200"
          }`}
        >
          <li>Phones</li>
        </button>
        <button
          onClick={() => filterItem("Beauty")}
          className={`text-lg font-semibold  hover:bg-amber-300/10 hover:px-3 hover:py-1 hover:rounded-full ${
            active == "Beauty" ? "text-amber-300" : "text-slate-200"
          }`}
        >
          <li>Beauty</li>
        </button>
      </ul>
    </div>
  );
};

export default CategoryShowcaseHeader;
