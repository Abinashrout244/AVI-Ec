import React from "react";
import { motion } from "framer-motion";

const CATEGORIES = [
  { label: "All", emoji: "\uD83D\uDECD\uFE0F" },
  { label: "Shoes", emoji: "\uD83D\uDC5F" },
  { label: "Bags", emoji: "\uD83D\uDC5C" },
  { label: "Phones", emoji: "\uD83D\uDCF1" },
  { label: "Beauty", emoji: "\u2728" },
  { label: "DSLR Camera", emoji: "\uD83D\uDCF7" },
  { label: "Photography", emoji: "\uD83C\uDF9E\uFE0F" },
  { label: "Formal Dress", emoji: "\uD83D\uDC54" },
  { label: "Home Decor", emoji: "\uD83D\uDECB\uFE0F" },
  { label: "Men's Pants", emoji: "\uD83D\uDC56" },
  { label: "Men's Boot", emoji: "\uD83D\uDC62" },
  { label: "Bag", emoji: "\uD83D\uDC5C" },
  { label: "Cap", emoji: "\uD83E\uDDE2" },
  { label: "Men's Sneaker", emoji: "\uD83D\uDC5F" },
  { label: "Earphones", emoji: "\uD83C\uDFA7" },
  { label: "Bottle", emoji: "\uD83C\uDF76" },
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
