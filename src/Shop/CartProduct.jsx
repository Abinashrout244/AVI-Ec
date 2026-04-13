import React from "react";
import { useDispatch } from "react-redux";
import { addItem, deleteItem, removeItem } from "../utilis/CartSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { addToast } from "../utilis/ToastSlice";

const CartProduct = ({ id, seller, name, price, img, size, color, quantity, onClickProduct }) => {
  const total = quantity * price;
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(addItem({ id, name, img, price, size, color }));
    dispatch(addToast({ type: "success", message: "Quantity increased" }));
  };

  const decrement = () => {
    dispatch(removeItem({ id, size, color }));
    dispatch(
      addToast({
        type: quantity > 1 ? "info" : "warning",
        message: quantity > 1 ? "Quantity decreased" : "Removed from cart",
      }),
    );
  };

  const handleRemove = () => {
    dispatch(deleteItem({ id, size, color }));
    dispatch(addToast({ type: "warning", message: "Removed from cart" }));
  };

  return (
    <motion.div
      className="
        grid grid-cols-1 md:grid-cols-5
        gap-y-4 md:gap-x-6 
        py-5 md:py-4 px-4 md:px-3
        items-center md:text-center
        lux-card
        relative
        border border-white/5
      "
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      
    >
      {/* Product Image and Name */}
      <div className="flex items-center gap-4 justify-start pr-8 md:pr-0" >
        <button onClick={onClickProduct} className="flex items-center gap-4 text-left hover:opacity-80 transition cursor-pointer outline-none">
          <img src={img} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg bg-white/5 flex-shrink-0 border border-white/5" />
          <div className="flex flex-col md:hidden">
            <p className="font-bold text-sm text-white line-clamp-2 leading-tight">{name}</p>
            <p className="text-xs text-amber-200/80 mt-1 font-medium">INR {price}</p>
          </div>
          <p className="hidden md:block font-bold text-sm md:text-base text-white">{name}</p>
        </button>
      </div>

      {/* Desktop Price */}
      <p className="hidden md:block text-sm sm:text-base font-medium text-slate-200">
        INR {price}
      </p>

      {/* Mobile container for Quantity and Total using contents on desktop */}
      <div className="flex items-center justify-between md:contents w-full mt-2 md:mt-0">
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-center border border-white/10 rounded-full bg-slate-900/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
            <button
              onClick={decrement}
              className="px-3.5 py-1.5 hover:bg-amber-400 hover:text-slate-900 text-lg rounded-full transition-all"
            >
              -
            </button>
            <span className="px-4 font-bold text-sm sm:text-base text-white">
              {quantity}
            </span>
            <button
              onClick={increment}
              className="px-3.5 py-1.5 hover:bg-amber-400 hover:text-slate-900 text-lg rounded-full transition-all"
            >
              +
            </button>
          </div>
        </div>

        <p className="font-black text-lg md:text-base text-amber-300 md:text-amber-200">
          INR {total}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="absolute top-4 right-4 md:static md:flex text-slate-500 hover:text-rose-400 transition justify-center items-center p-2 md:p-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-trash3-fill"
          viewBox="0 0 16 16"
        >
          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
        </svg>
      </button>
    </motion.div>
  );
};

export default CartProduct;
