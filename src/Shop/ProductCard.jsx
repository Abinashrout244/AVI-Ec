import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utilis/CartSlice";
import { toggleWishlist } from "../utilis/WishlistSlice";
import { addToast } from "../utilis/ToastSlice";

/* ── Star Rating ── */
const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        viewBox="0 0 24 24"
        className={`w-3 h-3 ${s <= Math.round(rating) ? "fill-amber-400" : "fill-white/10"}`}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
    <span className="text-[10px] text-white/30 ml-1">{rating.toFixed(1)}</span>
  </div>
);

/* ── Product Card Component ── */
const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((s) => s?.wishlist?.items || []);
  const isLiked = wishlistItems.some((w) => w.id === item.id);

  // Stable rating per card across renders
  const ratingRef = useRef(parseFloat((4 + Math.random()).toFixed(1)));
  const rating = ratingRef.current;
  const discount = 25;
  const mrp = Math.round((item.price || 0) * 1.25);

  const handleCart = (e) => {
    e.preventDefault();
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        img: item.img,
        price: item.price,
        seller: item.seller,
        size: "Standard",
        color: "Default",
      })
    );
    dispatch(addToast({ type: "success", message: "Added to cart!" }));
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch(
      toggleWishlist({
        id: item.id,
        name: item.name,
        img: item.img,
        price: item.price,
        category: item.category,
        seller: item.seller,
      })
    );
    dispatch(
      addToast({
        type: isLiked ? "info" : "success",
        message: isLiked ? "Removed from wishlist" : "Saved to wishlist",
      })
    );
  };

  return (
    <div className="pcard group relative flex flex-col overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/20 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      {/* Image Block */}
      <div className="relative overflow-hidden aspect-square bg-white/[0.02]">
        <Link to={`/shop/${item.id}`} className="block w-full h-full">
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Ambient bottom shadow overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050914]/70 via-transparent to-transparent" />

        {/* Discount Badge */}
        <span className="absolute top-2.5 left-2.5 text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 tracking-wider">
          {discount}% OFF
        </span>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 bg-black/50 backdrop-blur-md border border-white/10"
        >
          <svg
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className={`w-3.5 h-3.5 transition-colors duration-200 ${
              isLiked ? "fill-red-400 stroke-red-400" : "fill-none stroke-white/60"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Info Block */}
      <div className="flex flex-col flex-1 gap-1.5 p-3">
        {/* Category */}
        <p className="text-[9px] uppercase tracking-widest font-semibold text-amber-400/70">
          {item.category}
        </p>

        {/* Name */}
        <Link to={`/shop/${item.id}`}>
          <p className="text-white/85 text-xs sm:text-[13px] font-medium leading-snug line-clamp-2 hover:text-amber-400 transition-colors duration-200">
            {item.name}
          </p>
        </Link>

        {/* Star Rating */}
        <Stars rating={rating} />

        {/* Price Row */}
        <div className="flex items-baseline gap-1.5 flex-wrap mt-auto pt-1">
          <span className="text-white font-bold text-sm sm:text-[15px]">
            ₹{item.price?.toLocaleString()}
          </span>
          <span className="text-white/30 text-[10px] line-through">
            ₹{mrp.toLocaleString()}
          </span>
          <span className="text-emerald-400 text-[10px] font-semibold">{discount}% off</span>
        </div>

        {/* Free Delivery Tag */}
        <p className="text-[10px] font-medium text-emerald-400/80">
          Free delivery
        </p>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleCart}
          className="pcard-btn mt-1.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold bg-white/[0.06] hover:bg-amber-400 hover:text-slate-950 text-white/90 border border-white/10 hover:border-amber-400 transition-all duration-200 active:scale-[0.98]"
        >
          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;