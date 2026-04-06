import React from "react";
import { useDispatch } from "react-redux";
import { addItem, deleteItem, removeItem } from "../utilis/CartSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CartProduct = ({ id, seller, name, price, img, size, color, quantity }) => {
  const total = quantity * price;
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(addItem({ id, name, img, price, size, color }));
  };

  const decrement = () => {
    dispatch(removeItem({ id, size, color }));
  };

  const handleRemove = () => {
    dispatch(deleteItem({ id, size, color }));
  };

  return (
    <motion.div
      className="
        grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5
        gap-4 sm:gap-6 
        py-4 px-3
        items-center text-center
        lux-card
      "
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Link to="/shop" className="flex items-center gap-4 justify-center">
        <img src={img} className="w-20 h-20 object-cover rounded" />
        <p className="font-semibold text-sm sm:text-base text-white">{name}</p>
      </Link>

      <p className="text-sm sm:text-base font-medium text-slate-200">
        INR {price}
      </p>

      <div className="flex justify-center">
        <div className="inline-flex items-center justify-center border border-white/10 rounded-full">
          <button
            onClick={decrement}
            className="px-3 py-2 bg-white/10 hover:bg-amber-300 hover:text-slate-900 text-lg rounded-full transition"
          >
            -
          </button>

          <span className="px-4 text-sm sm:text-base text-white">
            {quantity}
          </span>

          <button
            onClick={increment}
            className="px-3 py-2 bg-white/10 hover:bg-amber-300 hover:text-slate-900 text-lg rounded-full transition"
          >
            +
          </button>
        </div>
      </div>

      <p className="font-semibold text-sm sm:text-base text-amber-200">
        INR {total}
      </p>

      <button
        onClick={handleRemove}
        className="text-rose-300 flex justify-center items-center hover:text-rose-200 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
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
