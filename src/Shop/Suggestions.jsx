import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Suggestions = ({ filteredsearchproducts, search }) => {
  if (!search || filteredsearchproducts.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="glass-panel rounded-2xl overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-semibold">
            Matching Products
          </p>
          <span className="text-amber-400 text-[11px] font-semibold">
            {filteredsearchproducts.length}
          </span>
        </div>
        <div className="max-h-60 overflow-y-auto custom-scrollbar">
          {filteredsearchproducts.slice(0, 6).map((prod) => (
            <Link to={`/shop/${prod.id}`} key={prod.id}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(255,255,255,0.04)", x: 4 }}
                className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 last:border-none cursor-pointer"
              >
                <div className="size-10 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                  <img
                    src={prod.img}
                    alt={prod.name}
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-white text-[13px] font-medium line-clamp-1">{prod.name}</p>
                  <p className="text-amber-400 text-[11px] font-semibold">
                    ₹{prod.price?.toLocaleString()}
                  </p>
                </div>
                <span className="ml-auto text-white/20 text-[11px] flex-shrink-0">→</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Suggestions;
