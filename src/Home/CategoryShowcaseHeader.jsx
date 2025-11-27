import React from "react";
import { Link } from "react-router-dom";

const CategoryShowcaseHeader = ({ filterItem, active }) => {
  return (
    <div className="flex items-center flex-col flex-wrap md:flex-row justify-center md:justify-between gap-4 md:px-20 py-4 bg-white shadow-lg  shadow-gray-400">
      <h1 className="text-4xl font-semibold">Our Products</h1>
      <ul className="flex flex-row gap-6 md:gap-16 flex-wrap justify-center items-center md:justify-around">
        <button
          onClick={() => filterItem("All")}
          className={`text-lg font-semibold  hover:bg-rose-600/50 hover:px-3 hover:py-1 hover:rounded-sm ${
            active == "All" ? "text-rose-600" : "text-black"
          }`}
        >
          <li>All</li>
        </button>
        <button
          onClick={() => filterItem("Shoes")}
          className={`text-lg font-semibold hover:bg-rose-600/50 hover:px-3 hover:py-1 hover:rounded-sm ${
            active == "Shoes" ? "text-rose-600" : "text-black"
          }`}
        >
          <li>Shoes</li>
        </button>
        <button
          onClick={() => filterItem("Bags")}
          className={`text-lg font-semibold text-black hover:bg-rose-600/50 hover:px-3 hover:py-1 hover:rounded-sm ${
            active == "Bags" ? "text-rose-600" : "text-black"
          }`}
        >
          <li>Bags</li>
        </button>
        <button
          onClick={() => filterItem("Phones")}
          className={`text-lg font-semibold  hover:bg-rose-600/50 hover:px-3 hover:py-1 hover:rounded-sm ${
            active == "Phones" ? "text-rose-600" : "text-black"
          }`}
        >
          <li>Phones</li>
        </button>
        <button
          onClick={() => filterItem("Beauty")}
          className={`text-lg font-semibold  hover:bg-rose-600/50 hover:px-3 hover:py-1 hover:rounded-sm ${
            active == "Beauty" ? "text-rose-600" : "text-black"
          }`}
        >
          <li>Beauty</li>
        </button>
      </ul>
    </div>
  );
};

export default CategoryShowcaseHeader;
