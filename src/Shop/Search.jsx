import React from "react";
import icon_search from "../assets/icons/search-2.svg";

const Search = ({ search, setSearch }) => {
  return (
    <div className="glass-panel rounded-2xl p-4">
      <h2 className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-semibold mb-3">
        Search Products
      </h2>
      <div className="relative flex items-center">
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-amber-400/40 focus:bg-white/8 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute left-3.5 size-5 flex items-center justify-center pointer-events-none">
          <img src={icon_search} alt="search" className="size-4 opacity-40" />
        </div>
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3.5 size-5 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition text-xs"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
