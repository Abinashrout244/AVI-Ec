import React, { useEffect, useState, useRef } from "react";
import searchIcon from "../assets/icons/search-2.svg";
import Select from "../components/Select";
import Product from "../products.json";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  const [searchText, setSearchText] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const data = Product;
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Filter logic
    if (searchText.trim() === "") {
      setFilterProducts([]);
      setShowDropdown(false);
    } else {
      const filter = data.filter((prod) =>
        prod.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilterProducts(filter);
      setShowDropdown(true);
    }
  }, [searchText, data]);

  // Handle clicking a suggestion
  const handleSelectProduct = (name) => {
    setSearchText(name); // This prints the name into the input
    setShowDropdown(false); // Close dropdown after selection
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#050505]">
      {/* Background stays the same - Minimalist Luxury */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 text-center"
      >
        <motion.span className="inline-block text-[10px] uppercase tracking-[0.5em] text-amber-500/60 mb-6 font-medium">
          The Curated Selection
        </motion.span>

        <motion.h1 className="text-5xl md:text-8xl font-serif text-white leading-[1.1] mb-10 tracking-tight">
          Exquisite Finds <br />
          <span className="italic text-white/40 font-light text-4xl md:text-7xl">
            For the Collector
          </span>
        </motion.h1>

        {/* --- LUXURY SEARCH BAR --- */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-full p-1.5 transition-all duration-500 focus-within:border-white/30 shadow-2xl">
            <div className="hidden md:block pl-4 pr-2 border-r border-white/10">
              <Select select={"all"} />
            </div>

            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search masterpieces..."
              className="flex-1 bg-transparent px-6 py-3 outline-none text-white font-light tracking-wide placeholder:text-white/20 text-sm md:text-base"
            />

            <button className="bg-white p-3 rounded-full hover:bg-amber-400 transition-all duration-500">
              <img src={searchIcon} alt="search" className="size-5 invert" />
            </button>
          </div>

          {/* --- RESULTS DROPDOWN (Fixed Logic) --- */}
          <AnimatePresence>
            {showDropdown && (
              <motion.ul
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                // This z-index and absolute positioning ensures it shows over the content
                className="absolute left-0 right-0 mt-4 bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-[100] max-h-[300px] overflow-y-auto custom-scrollbar"
              >
                {filterProducts.length > 0 ? (
                  filterProducts.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleSelectProduct(item.name)}
                      className="group px-8 py-4 text-left flex justify-between items-center hover:bg-white/[0.05] cursor-pointer transition-all border-b border-white/5 last:border-none"
                    >
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-light group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-white/30 uppercase tracking-widest">
                          {item.category || "Collection"}
                        </span>
                      </div>
                      <Link
                        to={`/shop/${item.id}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-amber-500 uppercase tracking-tighter"
                      >
                        Details →
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-8 py-6 text-white/30 text-sm italic">
                    No pieces found in our vault.
                  </li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
