import React, { useState } from "react";
import icon_search from "../assets/icons/search-2.svg";
import { Link } from "react-router-dom";
import Suggestions from "./Suggestions";
const Search = ({ products, search, setSearch }) => {
  return (
    <div>
      <div className="flex flex-row flex-1">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="border border-white/10 rounded-l-full px-4 py-2 w-full outline-none text-white bg-transparent placeholder:text-slate-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <button className="px-4 py-2 border border-white/10 rounded-r-full bg-white/10 hover:bg-white/20 transition">
          <img src={icon_search} alt="search_logo" className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default Search;
