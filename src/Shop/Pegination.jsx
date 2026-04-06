import React from "react";
import { motion } from "framer-motion";

const Pegination = ({ productperpage, totalproducts, currPage, peginate }) => {
  const totalPages = Math.ceil(totalproducts / productperpage);

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currPage > 3) pages.push("...");
      const start = Math.max(2, currPage - 1);
      const end = Math.min(totalPages - 1, currPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {/* Prev */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => currPage > 1 && peginate(currPage - 1)}
        disabled={currPage === 1}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-[12px] uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:border-amber-400/30 hover:text-white transition-all"
      >
        ← Prev
      </motion.button>

      {/* Page numbers */}
      <div className="flex items-center gap-1.5">
        {getPages().map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-white/20 text-sm">
              ···
            </span>
          ) : (
            <motion.button
              key={page}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => peginate(page)}
              className={`size-10 rounded-full text-sm font-semibold transition-all duration-200 ${
                currPage === page
                  ? "bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/25"
                  : "bg-white/5 border border-white/10 text-white/50 hover:border-amber-400/30 hover:text-white"
              }`}
            >
              {page}
            </motion.button>
          )
        )}
      </div>

      {/* Next */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => currPage < totalPages && peginate(currPage + 1)}
        disabled={currPage === totalPages}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-[12px] uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:border-amber-400/30 hover:text-white transition-all"
      >
        Next →
      </motion.button>
    </div>
  );
};

export default Pegination;
