import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItem, removeItem } from "../utilis/CartSlice";
import { addToast } from "../utilis/ToastSlice";

const ProductCarDisplay = ({ product }) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { id, seller, name, ratings, ratingsCount, price, description, img } = product;
  
  // Mock Data for UI enhancements
  const originalPrice = Math.round(price * 1.3); // 30% discount mock
  const discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);
  const inStock = true;

  const handleAddItem = () => {
    dispatch(addItem({ id, seller, name, price, img, size, color }));
    dispatch(addToast({ type: "success", message: "Added to cart" }));
  };
  
  const handleBuyNow = () => {
    handleAddItem();
    navigate("/cart-page");
  };

  const increment = () => {
    dispatch(addItem({ id, name, img, price, size, color }));
  };
  
  const decrement = () => {
    dispatch(removeItem({ id, size, color }));
  };

  const CartItem = useSelector((store) => store.cart.items);
  const currentItem = CartItem.find(
    (i) => i.id === id && i.size === size && i.color === color
  );

  return (
    <div className="flex flex-col h-full text-white pb-20 md:pb-0">
      {/* Title & Brand */}
      <div className="mb-4">
        <span className="inline-block bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold tracking-widest text-xs md:text-sm px-3.5 py-1.5 rounded-full uppercase mb-4 shadow-[0_0_15px_rgba(251,191,36,0.15)] backdrop-blur-sm">
          {seller}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mt-1 text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-slate-400 drop-shadow-sm">
          {name}
        </h1>
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-4 mt-2 mb-6">
        <div className="flex items-center bg-amber-400/20 border border-amber-400/30 px-2.5 py-1.5 rounded-lg text-amber-400 text-sm font-black shadow-[0_0_10px_rgba(251,191,36,0.2)]">
          {ratings} <svg className="w-4 h-4 ml-1.5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.572-.955L10 0l2.94 5.955 6.572.955-4.756 4.635 1.122 6.545z"/></svg>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        <p className="text-sm font-medium text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group flex items-center gap-1.5">
          <span className="text-white">{ratingsCount}</span>
          <span className="group-hover:underline decoration-amber-400/50 underline-offset-4">Verified Reviews</span>
        </p>
      </div>

      {/* Price Section */}
      <div className="flex items-center gap-5 mb-8 bg-white/5 p-4 md:p-5 rounded-2xl border border-white/10 w-fit backdrop-blur-sm">
        <span className="text-4xl md:text-5xl font-black text-white tracking-tight">₹{price}</span>
        <div className="flex flex-col justify-center h-full gap-1">
          <span className="text-sm md:text-base text-slate-400 line-through font-medium">₹{originalPrice}</span>
          <span className="text-xs md:text-sm font-extrabold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded flex items-center justify-center tracking-wide">{discountPercentage}% OFF</span>
        </div>
      </div>

      {/* Stock Status */}
      <div className="mb-6">
        {inStock ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> In Stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-400 bg-red-400/10 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Out of Stock
          </span>
        )}
      </div>

      <div className="h-px w-full bg-white/10 mb-6" />

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-5 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-300 font-semibold tracking-wide">Select Size</label>
          <div className="relative">
            <select
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 appearance-none transition-all cursor-pointer hover:bg-slate-800"
              onChange={(e) => setSize(e.target.value)}
              value={size}
            >
              <option value="" disabled>Choose Size</option>
              {['SM', 'MD', 'LG', 'XL', 'XXL'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-300 font-semibold tracking-wide">Select Color</label>
          <div className="relative">
            <select
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 appearance-none transition-all cursor-pointer hover:bg-slate-800"
              onChange={(e) => setColor(e.target.value)}
              value={color}
            >
              <option value="" disabled>Choose Color</option>
              {['Black', 'White', 'Blue', 'Red'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-6 mb-8">
        <label className="text-sm text-slate-300 font-semibold tracking-wide">Quantity</label>
        <div className="flex items-center border border-white/10 rounded-xl overflow-hidden bg-slate-900/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
          <button
            disabled={!size || !color}
            onClick={decrement}
            className="px-5 py-2.5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-xl font-medium"
          >
            -
          </button>
          <span className="font-bold w-12 text-center text-lg">{currentItem?.quantity || 0}</span>
          <button
            disabled={!size || !color}
            onClick={increment}
            className="px-5 py-2.5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-xl font-medium"
          >
            +
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-auto mb-8 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold mb-3">Product Description</h3>
        <p className="text-slate-400 leading-relaxed text-sm">
          {description || "Experience top-tier quality with this premium product from our exclusive collection. Crafted for durability and style, it blends modern aesthetics with reliable performance perfectly suited for your everyday needs."}
        </p>
      </div>

      {/* Action Buttons (Sticky on Mobile) */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-slate-900/95 md:bg-transparent md:static md:p-0 backdrop-blur-xl md:backdrop-blur-none border-t border-white/10 md:border-0 z-50 flex gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-none">
        <button
          disabled={!size || !color}
          onClick={handleAddItem}
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl border border-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          Add to Cart
        </button>
        <button
          disabled={!size || !color}
          onClick={handleBuyNow}
          className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-black py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCarDisplay;
