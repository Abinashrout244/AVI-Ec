import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utilis/CartSlice";
import { toggleWishlist } from "../utilis/WishlistSlice";
import { addToast } from "../utilis/ToastSlice";

/*
  GRID on the parent (2 per row on phones):
    className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:gap-x-6"
  Fonts (Instrument Serif + Hanken Grotesk) are already loaded by the hero.
*/

const serif = "font-['Instrument_Serif',Georgia,serif]";
const sans = "font-['Hanken_Grotesk',system-ui,sans-serif]";

const parsePrice = (v) => Number(String(v ?? "").replace(/[^0-9.]/g, "")) || 0;
const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const CategoryShowcaseCard = ({
  imgUrl,
  cate,
  title,
  brand,
  price,
  mrp, // optional: original price. Strike-through + "% off" only show when higher than price
  rating,
  reviews,
  badge,
  id,
}) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((store) => store?.wishlist?.items || []);
  const isWishlisted = wishlistItems.some((item) => item.id === id);

  const numericPrice = parsePrice(price);
  const numericMrp = parsePrice(mrp);
  const hasDiscount = numericMrp > numericPrice && numericPrice > 0;
  const off = hasDiscount
    ? Math.round(((numericMrp - numericPrice) / numericMrp) * 100)
    : 0;
  const formattedPrice = numericPrice
    ? inr(numericPrice)
    : price
      ? String(price).replace("$", "₹")
      : "₹0";

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
    <article className={`${sans} group relative flex h-full flex-col`}>
      {/* ── Image: borderless, quiet, slow zoom ── */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1420]">
        <Link to={`/shop/${id}`} className="block h-full" aria-label={title}>
          <img
            src={imgUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover saturate-[0.92] transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transform-none"
          />
        </Link>

        {/* soft grade so any photo sits well on the dark page */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0910]/35 via-transparent to-transparent" />

        {/* Badge: just type, no box */}
        {badge && (
          <span className="pointer-events-none absolute left-3 top-3 text-[10px] font-medium uppercase tracking-[0.24em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]">
            {badge}
          </span>
        )}

        {/* Wishlist: thin outline heart, no circle */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          className="absolute right-2.5 top-2.5 flex size-9 items-center justify-center"
        >
          <svg
            className={`size-[19px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)] transition-all duration-300 ${
              isWishlisted
                ? "fill-[#c4a1f5] text-[#c4a1f5]"
                : "fill-none text-white hover:scale-110"
            }`}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Desktop: quick-add bar slides up on hover */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute inset-x-0 bottom-0 hidden translate-y-full items-center justify-center gap-2 bg-[#f3ecf4]/95 py-3.5 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#0d0910] opacity-0 backdrop-blur-sm transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 md:flex"
        >
          Add to bag
        </button>

        {/* Mobile: small always-visible quick-add */}
        <button
          type="button"
          onClick={handleAddToCart}
          aria-label="Add to bag"
          className="absolute bottom-2.5 right-2.5 flex size-9 items-center justify-center rounded-full bg-[#f3ecf4]/95 text-[#0d0910] shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-transform duration-200 active:scale-90 md:hidden"
        >
          <svg
            className="size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* ── Details: left-aligned to the image edge, no box ── */}
      <div className="flex flex-1 flex-col pt-3.5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">
            {brand || cate}
          </p>
          {rating ? (
            <span className="shrink-0 text-[10.5px] tabular-nums tracking-wide text-white/40">
              {Number(rating).toFixed(1)} ★
              {reviews ? ` · ${Number(reviews).toLocaleString("en-IN")}` : ""}
            </span>
          ) : null}
        </div>

        <Link to={`/shop/${id}`} className="mt-1.5">
          <h3
            className={`${sans} line-clamp-2 text-[13px] font-normal leading-[1.3] tracking-[0.01em] text-white/85 transition-colors duration-500 group-hover:text-white md:text-[14px]`}
          >
            {title}
          </h3>
        </Link>

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2.5 pt-3">
          <span
            className={`${serif} text-[20px] leading-none tabular-nums text-white md:text-[22px]`}
          >
            {formattedPrice}
          </span>
          {hasDiscount && (
            <>
              <span className="text-[11px] tabular-nums text-white/30 line-through">
                {inr(numericMrp)}
              </span>
              <span className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#d9b55f]">
                {off}% off
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default CategoryShowcaseCard;
