import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const StarRating = ({ rating = 4.5 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`size-3 ${star <= Math.round(rating) ? "fill-amber-400" : "fill-white/15"}`}
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const ShopCard = ({ products, gridlist }) => {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id) =>
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid gap-5 ${
        gridlist
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      }`}
    >
      {products.map((item) => (
        <motion.div
          key={item.id}
          variants={cardVariants}
          whileHover="hover"
          className={`group lux-card overflow-hidden flex ${
            gridlist ? "flex-col" : "flex-row gap-5"
          }`}
        >
          {/* Image */}
          <div className={`relative overflow-hidden flex-shrink-0 ${gridlist ? "aspect-square w-full" : "w-36 h-36 sm:w-48 sm:h-48 rounded-xl m-4"}`}>
            <motion.img
              src={item.img}
              alt={item.name}
              className="w-full h-full object-cover"
              variants={{ hover: { scale: 1.07 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Overlay actions */}
            <motion.div
              className="absolute inset-0 bg-black/30 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              variants={{ hover: { opacity: 1 } }}
            >
              <Link to={`/shop/${item.id}`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="size-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg font-bold text-sm"
                  title="View Product"
                >
                  👁
                </motion.button>
              </Link>
              <Link to="/cart-page">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="size-10 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-lg"
                  title="Add to Cart"
                >
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>

            {/* Wishlist btn */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.87 }}
              onClick={() => toggleWishlist(item.id)}
              className="absolute top-3 right-3 size-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center"
            >
              <svg
                className={`size-3.5 transition-colors ${wishlist[item.id] ? "fill-red-400 text-red-400" : "fill-none text-white/60"}`}
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.button>

            {/* Category badge */}
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] text-white/70 uppercase tracking-wider border border-white/10">
              {item.category}
            </span>
          </div>

          {/* Content */}
          <div className={`flex flex-col gap-2 p-4 ${gridlist ? "" : "justify-center flex-1"}`}>
            <StarRating rating={4 + Math.random()} />

            <Link to={`/shop/${item.id}`}>
              <h2 className="text-white font-semibold text-base leading-snug line-clamp-2 hover:text-amber-400 transition-colors">
                {item.name}
              </h2>
            </Link>

            <p className="text-white/35 text-[12px] line-clamp-1">{item.category}</p>

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
              <div>
                <p className="text-amber-300 font-bold text-lg leading-none">
                  ₹{item.price?.toLocaleString() || "000"}
                </p>
                <p className="text-white/20 text-[11px] line-through mt-0.5">
                  ₹{Math.round((item.price || 0) * 1.25).toLocaleString()}
                </p>
              </div>

              <Link to={`/shop/${item.id}`}>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[11px] font-semibold uppercase tracking-wider hover:bg-amber-400 hover:text-slate-900 transition-all"
                >
                  Details
                  <span>→</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ShopCard;
