import React from "react";
import { motion } from "framer-motion";

const CATEGORIES = [
  { label: "All", emoji: "🛍️" },
  { label: "Men's Pants", emoji: "👖" },
  { label: "Men's Boot", emoji: "👢" },
  { label: "Bag", emoji: "👜" },
  { label: "Cap", emoji: "🧢" },
  { label: "Men's Sneaker", emoji: "👟" },
  { label: "Earphones", emoji: "🎧" },
  { label: "Bottle", emoji: "🍶" },
];

const ShopCategory = ({ filterCategory, selectCategory }) => {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <h2 className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-semibold mb-4">
        Browse by Category
      </h2>
      <div className="flex flex-col gap-1">
        {CATEGORIES.map((cat) => {
          const active = selectCategory === cat.label;
          return (
            <motion.button
              key={cat.label}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => filterCategory(cat.label)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-200 ${
                active
                  ? "bg-amber-400/15 text-amber-400 border border-amber-400/25 font-semibold"
                  : "text-white/55 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <span className="text-base flex-shrink-0">{cat.emoji}</span>
              <span>{cat.label}</span>
              {active && (
                <motion.span
                  layoutId="cat-dot"
                  className="ml-auto size-1.5 rounded-full bg-amber-400"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
