import React from "react";
import { motion } from "framer-motion";

const tagsList = [
  { text: "Fashion", color: "from-violet-500/15 border-violet-400/20 text-violet-300" },
  { text: "Shoes", color: "from-sky-500/15 border-sky-400/20 text-sky-300" },
  { text: "Beauty", color: "from-rose-500/15 border-rose-400/20 text-rose-300" },
  { text: "Tech", color: "from-emerald-500/15 border-emerald-400/20 text-emerald-300" },
  { text: "Bags", color: "from-amber-500/15 border-amber-400/20 text-amber-300" },
  { text: "Phones", color: "from-blue-500/15 border-blue-400/20 text-blue-300" },
  { text: "Sneakers", color: "from-pink-500/15 border-pink-400/20 text-pink-300" },
  { text: "Watches", color: "from-orange-500/15 border-orange-400/20 text-orange-300" },
  { text: "Caps", color: "from-teal-500/15 border-teal-400/20 text-teal-300" },
];

const TagList = () => {
  return (
    <div className="glass-panel rounded-2xl p-4">
      <h2 className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-semibold mb-4">
        Popular Tags
      </h2>
      <div className="flex flex-wrap gap-2">
        {tagsList.map((tag, i) => (
          <motion.a
            key={i}
            href="#"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border bg-gradient-to-r to-transparent cursor-pointer transition-all ${tag.color}`}
          >
            {tag.text}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default TagList;
