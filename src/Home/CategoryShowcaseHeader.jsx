import React from "react";
import { motion } from "framer-motion";

const FILTERS = ["All", "Shoes", "Bags", "Phones", "Beauty"];

const CategoryShowcaseHeader = ({ filterItem, active }) => {
  return (
    <div className="flex items-center flex-wrap gap-3 justify-center">
      {FILTERS.map((label) => (
        <motion.button
          key={label}
          onClick={() => filterItem(label)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className={`relative px-5 py-2 rounded-full text-[12px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 ${
            active === label
              ? "text-slate-900"
              : "text-white/50 hover:text-white border border-white/10 hover:border-white/25"
          }`}
        >
          {active === label && (
            <motion.span
              layoutId="filter-bg"
              className="absolute inset-0 rounded-full bg-amber-400"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryShowcaseHeader;
