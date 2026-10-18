import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem, removeItem } from "../utilis/CartSlice";
import { addToast } from "../utilis/ToastSlice";

const SIZES = ["SM", "MD", "LG", "XL", "XXL"];
const COLORS = [
  { name: "Black", bg: "bg-slate-900 border-white/30" },
  { name: "White", bg: "bg-white border-slate-300" },
  { name: "Navy", bg: "bg-blue-950 border-blue-500/40" },
  { name: "Red", bg: "bg-rose-600 border-rose-400" },
];

const ProductCarDisplay = ({ product }) => {
  const [size, setSize] = useState("MD");
  const [color, setColor] = useState("Black");
  const [pincode, setPincode] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, seller, name, ratings = 4.3, ratingsCount = 1240, price = 0, description, img } = product;

  const originalPrice = Math.round(price * 1.35);
  const discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);

  const CartItems = useSelector((store) => store.cart.items || []);
  const currentItem = CartItems.find(
    (i) => i.id === id && i.size === size && i.color === color
  );

  const handleAddItem = () => {
    dispatch(addItem({ id, seller, name, price, img, size, color }));
    dispatch(addToast({ type: "success", message: "Added to Cart" }));
  };

  const handleBuyNow = () => {
    dispatch(addItem({ id, seller, name, price, img, size, color }));
    navigate("/cart-page");
  };

  const increment = () => {
    dispatch(addItem({ id, seller, name, price, img, size, color }));
  };

  const decrement = () => {
    dispatch(removeItem({ id, size, color }));
  };

  return (
    <div className="flex flex-col text-slate-100">
      
      {/* Brand & Title */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 hover:underline cursor-pointer">
            Visit the {seller || "Official"} Store
          </span>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
            In Stock
          </span>
        </div>

        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug text-white">
          {name}
        </h1>

        {/* Rating Pill + Badges */}
        <div className="flex items-center gap-3 mt-3 flex-wrap text-xs">
          <div className="flex items-center gap-1 bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded">
            <span>{ratings}</span>
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.572-.955L10 0l2.94 5.955 6.572.955-4.756 4.635 1.122 6.545z" />
            </svg>
          </div>
          <span className="text-slate-400 underline decoration-slate-600 cursor-pointer">
            {ratingsCount.toLocaleString()} ratings & reviews
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-medium">100+ bought in past month</span>
        </div>
      </div>

      {/* Pricing Section (Amazon/Flipkart Discount Breakdown) */}
      <div className="py-4 border-b border-white/10">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl text-rose-500 font-light">-{discountPercentage}%</span>
          <div className="flex items-start">
            <span className="text-xs text-slate-300 font-semibold mt-1">₹</span>
            <span className="text-4xl font-extrabold tracking-tight text-white">{price.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
          <span>M.R.P.:</span>
          <span className="line-through text-slate-500">₹{originalPrice.toLocaleString()}</span>
          <span className="text-slate-400 font-normal">(Inclusive of all taxes)</span>
        </div>

        {/* Bank & Special Offers Bar */}
        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-amber-400/[0.08] via-amber-400/[0.03] to-transparent border border-amber-400/20 flex items-start gap-3">
          <span className="text-lg">🏷️</span>
          <div className="text-xs">
            <span className="font-bold text-amber-300">Bank Offer:</span> 5% Unlimited Cashback on Axis Bank Credit Cards. Flat ₹100 instant off on UPI orders.
          </div>
        </div>
      </div>

      {/* Size Selector: Amazon/Flipkart Square Chips */}
      <div className="py-4 border-b border-white/10">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-xs font-semibold text-slate-300">
            Size: <strong className="text-white font-bold">{size}</strong>
          </span>
          <button type="button" className="text-xs text-amber-400 hover:underline">
            Size Chart
          </button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {SIZES.map((s) => {
            const isSelected = size === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`min-w-[46px] h-10 px-3 rounded-lg text-xs font-bold transition-all border ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                    : "bg-slate-900 text-slate-300 border-white/10 hover:border-white/30"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Selector: Visual Swatches */}
      <div className="py-4 border-b border-white/10">
        <span className="text-xs font-semibold text-slate-300 block mb-2.5">
          Color: <strong className="text-white font-bold">{color}</strong>
        </span>
        <div className="flex items-center gap-3">
          {COLORS.map((c) => {
            const isSelected = color === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c.name)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isSelected
                    ? "border-amber-400 bg-amber-400/10 text-amber-300 ring-1 ring-amber-400"
                    : "border-white/10 bg-slate-900 text-slate-400 hover:border-white/20"
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full border ${c.bg}`} />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Delivery Pincode Checker (Flipkart/Amazon staple) */}
      <div className="py-4 border-b border-white/10">
        <span className="text-xs font-semibold text-slate-300 block mb-2">Delivery & Services</span>
        <div className="flex gap-2 max-w-sm">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter Delivery Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white outline-none"
          />
          <button
            type="button"
            onClick={() => setDeliveryChecked(true)}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-xs font-bold rounded-lg border border-white/10 transition-colors"
          >
            Check
          </button>
        </div>
        {deliveryChecked && (
          <p className="text-[11px] text-emerald-400 font-medium mt-2 flex items-center gap-1.5">
            <span>✓</span> Free Delivery by <strong>Tomorrow, 4 PM</strong>
          </p>
        )}
      </div>

      {/* Trust Guarantee Badges */}
      <div className="grid grid-cols-3 gap-2 py-4 border-b border-white/10 text-center text-[10px] text-slate-400">
        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col items-center gap-1">
          <span className="text-base">🔄</span>
          <span>7 Days Replacement</span>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col items-center gap-1">
          <span className="text-base">🚚</span>
          <span>Free Express Shipping</span>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col items-center gap-1">
          <span className="text-base">🛡️</span>
          <span>1 Year Warranty</span>
        </div>
      </div>

      {/* Description Snippet */}
      <div className="py-4">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
          About this item
        </span>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
          {description || "Engineered for optimal comfort and longevity. Made from premium certified materials suited for everyday performance and elevated lifestyle aesthetics."}
        </p>
      </div>

      {/* Action / Buy CTAs (Desktop inline, Sticky on Mobile) */}
      <div className="fixed bottom-0 left-0 w-full p-3 bg-[#05070e]/95 backdrop-blur-xl border-t border-white/10 md:static md:p-0 md:bg-transparent md:border-0 z-50 flex items-center gap-3 mt-4">
        
        {/* Quantity Controller (shows if item is in cart) */}
        {currentItem?.quantity > 0 ? (
          <div className="flex items-center h-12 bg-slate-900 border border-white/20 rounded-xl px-2">
            <button
              onClick={decrement}
              className="w-8 h-full flex items-center justify-center text-slate-300 hover:text-white font-bold text-lg"
            >
              -
            </button>
            <span className="w-8 text-center text-xs font-bold text-amber-400">
              {currentItem.quantity}
            </span>
            <button
              onClick={increment}
              className="w-8 h-full flex items-center justify-center text-slate-300 hover:text-white font-bold text-lg"
            >
              +
            </button>
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleAddItem}
          className="flex-1 h-12 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-400/40 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_14px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Add to Cart
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 h-12 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(251,191,36,0.35)] flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Buy Now
        </button>
      </div>

    </div>
  );
};

export default ProductCarDisplay;