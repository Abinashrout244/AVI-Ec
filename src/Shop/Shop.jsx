import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroBanner from "../components/HeroBanner";
import Info from "../products.json";
import ShopCard from "./ShopCard";
import Pegination from "./Pegination";
import Search from "./Search";
import ShopCategory from "./ShopCategory";
import Suggestions from "./Suggestions";
import Popularpost from "./Popularpost";
import TagList from "./TagList";

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Name A–Z", value: "name_asc" },
];

const Shop = () => {
  const [gridlist, setGridList] = useState(true);
  const [baseProducts, setBaseProducts] = useState(Info);
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const productperpage = 9;

  // Filter
  const filterCategory = (select) => {
    setSelectCategory(select);
    setCurrPage(1);
    if (select === "All") {
      setBaseProducts(Info);
    } else {
      setBaseProducts(Info.filter((item) => item.category === select));
    }
  };

  // Sort
  const sortProducts = (prods) => {
    const sorted = [...prods];
    if (sortBy === "price_asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "name_asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  };

  const filtered = sortProducts(
    baseProducts.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  const lastindex = currPage * productperpage;
  const firstindex = lastindex - productperpage;
  const currentProducts = filtered.slice(firstindex, lastindex);

  const peginate = (pagenum) => {
    setCurrPage(pagenum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredsearchproducts = baseProducts.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner title="Our Shop" page="Shop" />

      {/* Shop content */}
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-24">

        {/* Top bar: results + controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 py-6 mb-6 border-b border-white/5"
        >
          <div className="flex items-center gap-3">
            <p className="text-white/50 text-sm">
              Showing{" "}
              <span className="text-white font-semibold">
                {Math.min(firstindex + 1, filtered.length)}–{Math.min(lastindex, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="text-amber-400 font-semibold">{filtered.length}</span> results
              {selectCategory !== "All" && (
                <span className="ml-2 text-white/30">in <span className="text-amber-400">{selectCategory}</span></span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 text-white/70 text-[12px] rounded-full px-4 py-2 outline-none focus:border-amber-400/40 transition cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-[#0a0e1c]">
                  {o.label}
                </option>
              ))}
            </select>

            {/* Grid / List toggle */}
            <div className="flex gap-1 p-1 rounded-full bg-white/5 border border-white/10">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setGridList(true)}
                className={`p-2 rounded-full transition-all ${gridlist ? "bg-amber-400 text-slate-900" : "text-white/40 hover:text-white"}`}
                aria-label="Grid view"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm4 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm-9 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1zm4 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                </svg>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setGridList(false)}
                className={`p-2 rounded-full transition-all ${!gridlist ? "bg-amber-400 text-slate-900" : "text-white/40 hover:text-white"}`}
                aria-label="List view"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
              </motion.button>
            </div>

            {/* Mobile filter toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-[12px] hover:border-amber-400/30 transition"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h18M6 8h12M9 12h6M12 16h0" />
              </svg>
              Filters
            </motion.button>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <AnimatePresence>
            {(showFilters || true) && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`w-full md:w-72 flex-shrink-0 flex-col gap-5 ${showFilters ? "flex" : "hidden md:flex"}`}
              >
                <Search setSearch={setSearch} search={search} />
                <ShopCategory filterCategory={filterCategory} selectCategory={selectCategory} />
                <Suggestions search={search} filteredsearchproducts={filteredsearchproducts} />
                <Popularpost />
                <TagList />
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Products */}
          <div className="flex-1 flex flex-col gap-10">
            <AnimatePresence mode="wait">
              <motion.div key={`${selectCategory}-${search}-${sortBy}`}>
                {currentProducts.length > 0 ? (
                  <ShopCard products={currentProducts} gridlist={gridlist} />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-24 gap-4"
                  >
                    <span className="text-5xl">🔍</span>
                    <p className="text-white/40 text-lg">No products found</p>
                    <button
                      onClick={() => { filterCategory("All"); setSearch(""); }}
                      className="px-6 py-2.5 rounded-full bg-amber-400 text-slate-900 font-semibold text-sm hover:bg-amber-300 transition"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {filtered.length > productperpage && (
              <Pegination
                productperpage={productperpage}
                totalproducts={filtered.length}
                currPage={currPage}
                peginate={peginate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
