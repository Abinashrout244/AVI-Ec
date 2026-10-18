import React from "react";
import { useDispatch } from "react-redux";
import { addItem, deleteItem, removeItem } from "../utilis/CartSlice";
import { motion } from "framer-motion";
import { addToast } from "../utilis/ToastSlice";
import { Trash2, Plus, Minus, ExternalLink } from "lucide-react";

const CartProduct = ({
  id,
  seller,
  name,
  price = 0,
  img,
  size,
  color,
  quantity = 1,
  onClickProduct,
}) => {
  const total = quantity * price;
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(addItem({ id, seller, name, img, price, size, color }));
    dispatch(addToast({ type: "success", message: "Quantity increased" }));
  };

  const decrement = () => {
    dispatch(removeItem({ id, size, color }));
    dispatch(
      addToast({
        type: quantity > 1 ? "info" : "warning",
        message: quantity > 1 ? "Quantity decreased" : "Removed from cart",
      })
    );
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    dispatch(deleteItem({ id, size, color }));
    dispatch(addToast({ type: "warning", message: "Removed from cart" }));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] hover:border-amber-400/20 backdrop-blur-xl p-3.5 sm:p-4.5 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* ── Product Info (Image + Details) [6 Cols on Desktop] ── */}
        <div className="md:col-span-6 flex items-center gap-3.5 sm:gap-4 pr-8 md:pr-2">
          {/* Thumbnail preview button */}
          <button
            type="button"
            onClick={onClickProduct}
            className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-900 border border-white/10 group-hover:border-amber-400/30 transition-all outline-none"
          >
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <ExternalLink size={14} />
            </span>
          </button>

          {/* Description & variant chips */}
          <div className="flex flex-col min-w-0 text-left">
            {seller && (
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400/80 mb-0.5 truncate">
                {seller}
              </span>
            )}
            
            <button
              type="button"
              onClick={onClickProduct}
              className="text-left font-bold text-xs sm:text-sm text-white hover:text-amber-300 transition-colors line-clamp-1 leading-snug outline-none"
            >
              {name}
            </button>

            {/* Variant Badges */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {size && (
                <span className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-[10px] font-medium text-slate-300">
                  Size: <strong className="text-white">{size}</strong>
                </span>
              )}
              {color && (
                <span className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-[10px] font-medium text-slate-300">
                  Color: <strong className="text-white">{color}</strong>
                </span>
              )}
            </div>

            {/* Mobile price tag */}
            <div className="md:hidden mt-2 flex items-baseline gap-2">
              <span className="text-xs text-slate-400">Unit: ₹{price?.toLocaleString()}</span>
              <span className="text-xs font-black text-amber-300">₹{total?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* ── Unit Price [2 Cols on Desktop] ── */}
        <div className="hidden md:flex md:col-span-2 items-center justify-center text-xs font-semibold text-slate-300">
          ₹{price?.toLocaleString()}
        </div>

        {/* ── Quantity Controls [2 Cols on Desktop] ── */}
        <div className="flex items-center justify-between md:justify-center md:col-span-2 mt-2 md:mt-0 pt-2 md:pt-0 border-t border-white/5 md:border-t-0">
          <span className="text-xs text-slate-400 md:hidden font-medium">Quantity:</span>
          
          <div className="inline-flex items-center border border-white/10 rounded-xl bg-slate-950/80 shadow-inner overflow-hidden">
            <button
              type="button"
              onClick={decrement}
              aria-label="Decrease quantity"
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all outline-none"
            >
              <Minus size={13} />
            </button>
            
            <span className="w-8 text-center text-xs font-bold text-white select-none">
              {quantity}
            </span>

            <button
              type="button"
              onClick={increment}
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all outline-none"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>

        {/* ── Line Total & Delete Action [2 Cols on Desktop] ── */}
        <div className="hidden md:flex md:col-span-2 items-center justify-end gap-4 text-right">
          <span className="font-extrabold text-sm text-amber-300">
            ₹{total?.toLocaleString()}
          </span>

          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove item"
            className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all outline-none"
          >
            <Trash2 size={15} />
          </button>
        </div>

        {/* Mobile floating delete button */}
        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove item"
          className="md:hidden absolute top-3.5 right-3.5 p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <Trash2 size={15} />
        </button>

      </div>
    </motion.div>
  );
};

export default CartProduct;