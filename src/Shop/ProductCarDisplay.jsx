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
      <div className="mb-2">
        <span className="text-amber-400 font-semibold tracking-wider text-sm uppercase">{seller}</span>
        <h1 className="text-2xl md:text-3xl font-bold leading-tight mt-1">{name}</h1>
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-3 mt-2 mb-4">
        <div className="flex items-center bg-amber-400/10 px-2 py-1 rounded text-amber-400 text-sm font-bold">
          {ratings} <svg className="w-3.5 h-3.5 ml-1 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.572-.955L10 0l2.94 5.955 6.572.955-4.756 4.635 1.122 6.545z"/></svg>
        </div>
        <p className="text-sm text-slate-400 underline decoration-slate-600 underline-offset-4 cursor-pointer hover:text-white transition-colors">
          {ratingsCount} Ratings & Reviews
        </p>
      </div>

      {/* Price Section */}
      <div className="flex items-end gap-3 mb-6">
        <span className="text-4xl font-extrabold text-white">₹{price}</span>
        <span className="text-lg text-slate-500 line-through mb-1">₹{originalPrice}</span>
        <span className="text-emerald-400 font-semibold mb-1">{discountPercentage}% off</span>
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
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-400 font-medium">Select Size</label>
          <select
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-colors"
            onChange={(e) => setSize(e.target.value)}
            value={size}
          >
            <option value="" disabled>Select Size</option>
            {['SM', 'MD', 'LG', 'XL', 'XXL'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-400 font-medium">Select Color</label>
          <select
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-colors"
            onChange={(e) => setColor(e.target.value)}
            value={color}
          >
            <option value="" disabled>Select Color</option>
            {['Black', 'White', 'Blue', 'Red'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4 mb-8">
        <label className="text-sm text-slate-400 font-medium">Quantity</label>
        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-slate-900/50">
          <button
            disabled={!size || !color}
            onClick={decrement}
            className="px-4 py-2 hover:bg-white/10 disabled:opacity-50 transition-colors text-lg"
          >
            -
          </button>
          <span className="px-4 font-semibold w-12 text-center">{currentItem?.quantity || 0}</span>
          <button
            disabled={!size || !color}
            onClick={increment}
            className="px-4 py-2 hover:bg-white/10 disabled:opacity-50 transition-colors text-lg"
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
      <div className="fixed bottom-0 left-0 w-full p-4 bg-slate-900/95 md:bg-transparent md:static md:p-0 backdrop-blur-md md:backdrop-blur-none border-t border-white/10 md:border-0 z-50 flex gap-3">
        <button
          disabled={!size || !color}
          onClick={handleAddItem}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 rounded-xl border border-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          Add to Cart
        </button>
        <button
          disabled={!size || !color}
          onClick={handleBuyNow}
          className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCarDisplay;
