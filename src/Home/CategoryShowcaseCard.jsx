import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utilis/CartSlice";
import { toggleWishlist } from "../utilis/WishlistSlice";
import { addToast } from "../utilis/ToastSlice";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`size-3 ${star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-white/15 text-white/15"}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

const BADGE_COLORS = {
  "Best Seller": "bg-amber-400/15 text-amber-400 border-amber-400/30",
  "New": "bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
  "Hot": "bg-rose-400/15 text-rose-400 border-rose-400/30",
  "Sale": "bg-blue-400/15 text-blue-400 border-blue-400/30",
  "Trending": "bg-violet-400/15 text-violet-400 border-violet-400/30",
};

const CategoryShowcaseCard = ({ imgUrl, cate, title, brand, price, rating, reviews, badge, id }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((store) => store?.wishlist?.items || []);
  const isWishlisted = wishlistItems.some((item) => item.id === id);
  const numericPrice = Number(String(price || "").replace(/[^0-9.]/g, "")) || 0;
  const formattedPrice = price ? String(price).replace("$", "₹") : "₹00.00";

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id,
        name: title,
        img: imgUrl,
        price: numericPrice,
        seller: brand,
        size: "Standard",
        color: "Default",
      }),
    );
    dispatch(addToast({ type: "success", message: "Added to cart" }));
  };

  const handleToggleWishlist = () => {
    dispatch(
      toggleWishlist({
        id,
        name: title,
        img: imgUrl,
        price: numericPrice,
        category: cate,
        seller: brand,
      }),
    );
    dispatch(
      addToast({
        type: isWishlisted ? "info" : "success",
        message: isWishlisted ? "Removed from likes" : "Added to likes",
      }),
    );
  };

  return (
    <motion.div
      whileHover="hover"
      className="group relative rounded-2xl overflow-hidden lux-card flex flex-col h-full"
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <Link to={`/shop/${id}`} className="block">
          <motion.img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover"
            variants={{ hover: { scale: 1.07 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </Link>

        {/* Badge */}
        {badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${BADGE_COLORS[badge] || BADGE_COLORS["New"]}`}>
            {badge}
          </span>
        )}

        {/* Wishlist button */}
        <motion.button
          onClick={handleToggleWishlist}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 size-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all hover:bg-black/60"
          aria-label="Add to wishlist"
        >
          <svg
            className={`size-4 transition-colors ${isWishlisted ? "fill-red-400 text-red-400" : "fill-none text-white/60"}`}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>

        {/* Add to Cart hover overlay */}
        <motion.div
          className="absolute inset-x-0 bottom-0 p-3"
          initial={{ opacity: 0, y: 10 }}
          variants={{ hover: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2.5 rounded-xl bg-amber-400 text-slate-900 font-bold text-[11px] uppercase tracking-[0.15em] shadow-lg shadow-amber-400/30 hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        {/* Category tag */}
        <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400/70 font-semibold">
          {cate}
        </span>

        {/* Title */}
        <Link to={`/shop/${id}`}>
          <h3 className="text-white font-semibold text-[15px] leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
            {title}
          </h3>
        </Link>

        {/* Brand + Rating row */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-white/40 text-[12px]">{brand}</span>
          <div className="flex items-center gap-1.5">
            <StarRating rating={rating || 4.5} />
            <span className="text-white/30 text-[10px]">({reviews?.toLocaleString() || "0"})</span>
          </div>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <div>
            <p className="text-amber-300 font-bold text-lg leading-none">{formattedPrice}</p>
            <p className="text-white/20 text-[10px] line-through mt-0.5">
              {formattedPrice.replace("₹", "₹").replace(/\d+/, (n) => Math.round(n * 1.3))}
            </p>
          </div>
          <Link to={`/shop/${id}`}>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="size-9 rounded-full bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/40 flex items-center justify-center transition-all duration-300 text-white/60 hover:text-amber-400"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryShowcaseCard;
