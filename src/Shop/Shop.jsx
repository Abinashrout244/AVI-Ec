import React, { useEffect, useMemo, useRef, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import { fetchProducts } from "../api";
import Pegination from "./Pegination";
import { useLocation, Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { CATEGORIES } from "../utilis/Categorydata";

const SORT_OPTIONS = [
  { label: "Relevance", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A to Z", value: "name_asc" },
];

/* ── Main Shop ── */
const Shop = () => {
  const [baseProducts, setBaseProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  const productperpage = 20;
  const location = useLocation();

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchProducts();
        if (!ignore) {
          setBaseProducts(data || []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load products.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      ignore = true;
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const categoryAliases = useMemo(
    () => ({
      Bags: ["Bag", "Bags", "Colorful Bags"],
      Shoes: ["Shoes", "Men's Sneaker", "Men's Boot"],
    }),
    [],
  );

  const matchesCategory = (itemCat, selected) => {
    if (selected === "All") return true;
    const aliases = categoryAliases[selected];
    return aliases ? aliases.includes(itemCat) : itemCat === selected;
  };

  const filterCategory = (cat) => {
    setSelectCategory(cat);
    setCurrPage(1);
  };

  const filtered = useMemo(() => {
    const list = baseProducts.filter((item) => {
      const matchCat = matchesCategory(item.category, selectCategory);
      const matchSearch = item.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      return matchCat && matchSearch;
    });

    const sorted = [...list];
    if (sortBy === "price_asc") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") sorted.sort((a, b) => b.price - a.price);
    if (sortBy === "name_asc")
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [baseProducts, selectCategory, search, sortBy, categoryAliases]);

  const lastindex = currPage * productperpage;
  const firstindex = lastindex - productperpage;
  const currentProducts = filtered.slice(firstindex, lastindex);

  const peginate = (n) => {
    setCurrPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const cat = new URLSearchParams(location.search).get("category");
    if (cat) filterCategory(cat);
  }, [location.search]);

  return (
    <div
      className="min-h-screen text-slate-100 selection:bg-amber-400 selection:text-black"
      style={{ background: "linear-gradient(180deg,#04060e 0%,#070a14 100%)" }}
    >
      <HeroBanner title="Our Shop" page="Shop" />

      {/* ── Category Bar ── */}
      <div className="sticky top-0 z-30 border-y border-white/[0.06] bg-[#04060e]/85 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#04060e] to-transparent z-10 sm:hidden" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#04060e] to-transparent z-10 sm:hidden" />

          <div className="flex items-center gap-2 overflow-x-auto py-3.5 no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => {
              const active = selectCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => filterCategory(cat.label)}
                  className={`group relative flex-shrink-0 flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 select-none ${
                    active
                      ? "text-amber-300 bg-amber-400/[0.12] border border-amber-400/40 shadow-[0_0_16px_rgba(251,191,36,0.18)]"
                      : "text-white/60 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/20"
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-5 h-5 rounded-full object-cover border border-white/20 group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-screen-xl mx-auto px-3 sm:px-6 py-6">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[220px] max-w-md group">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-white/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
            <div className="relative flex items-center">
              <svg
                className="absolute left-3.5 w-4 h-4 text-white/35 group-focus-within:text-amber-400 transition-colors duration-200 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search collection, brands, items…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrPage(1);
                }}
                className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder:text-white/30 rounded-xl bg-white/[0.04] border border-white/[0.09] hover:border-white/20 focus:border-amber-400/50 focus:bg-white/[0.07] outline-none backdrop-blur-xl transition-all duration-200"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 w-4 h-4 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/50 hover:text-white text-[10px] transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white/40">
              Showing{" "}
              <span className="text-white/90 font-semibold">
                {filtered.length}
              </span>{" "}
              items
            </span>

            {/* Custom Glass Dropdown */}
            <div ref={sortRef} className="relative inline-block select-none">
              <button
                type="button"
                onClick={() => setIsSortOpen((prev) => !prev)}
                className={`flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium rounded-xl transition-all duration-200 outline-none backdrop-blur-xl border ${
                  isSortOpen
                    ? "bg-white/[0.1] border-amber-400/40 text-white ring-1 ring-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.1)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 hover:border-white/20 text-white/70 hover:text-white"
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">
                  Sort:
                </span>
                <span className="text-white/90 font-medium">
                  {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-white/40 transition-transform duration-300 ${
                    isSortOpen ? "rotate-180 text-amber-400" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isSortOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl p-1.5 backdrop-blur-2xl bg-[#090d16]/95 border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)]">
                  <div className="flex flex-col gap-0.5">
                    {SORT_OPTIONS.map((o) => {
                      const isSelected = o.value === sortBy;
                      return (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => {
                            setSortBy(o.value);
                            setIsSortOpen(false);
                          }}
                          className={`flex items-center justify-between w-full px-3 py-2 text-xs rounded-lg transition-all duration-150 text-left ${
                            isSelected
                              ? "bg-amber-400/10 text-amber-300 font-medium"
                              : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                          }`}
                        >
                          <span>{o.label}</span>
                          {isSelected && (
                            <svg
                              className="w-3.5 h-3.5 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Active Filter Badges ── */}
        {(selectCategory !== "All" || search) && (
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            {selectCategory !== "All" && (
              <span className="flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 backdrop-blur-md">
                Category:{" "}
                <strong className="font-semibold text-white">
                  {selectCategory}
                </strong>
                <button
                  onClick={() => filterCategory("All")}
                  className="hover:text-white ml-0.5 text-[11px] p-0.5 rounded-full hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </span>
            )}
            {search && (
              <span className="flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-white/70 backdrop-blur-md">
                Keyword:{" "}
                <strong className="font-semibold text-white">"{search}"</strong>
                <button
                  onClick={() => setSearch("")}
                  className="hover:text-white ml-0.5 text-[11px] p-0.5 rounded-full hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}

        {/* ── Products Grid ── */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {currentProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <span className="text-5xl">🔍</span>
            <p className="text-white/40 font-medium">No products found</p>
            <button
              onClick={() => {
                filterCategory("All");
                setSearch("");
              }}
              className="px-6 py-2.5 rounded-xl text-slate-900 font-bold text-sm transition-all"
              style={{
                background: "linear-gradient(135deg,#fbbf24,#f59e0b)",
                boxShadow: "0 8px 24px rgba(251,191,36,0.3)",
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

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
  );
};

export default Shop;
