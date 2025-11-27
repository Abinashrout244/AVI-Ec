import React from "react";
import { useDispatch } from "react-redux";
import { addItem, deleteItem, removeItem } from "../utilis/CartSlice";
import { Link } from "react-router-dom";

const CartProduct = ({
  id,
  seller,
  name,
  price,
  img,
  size,
  color,
  quantity,
}) => {
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
    <div
      className="
        grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5
        gap-4 sm:gap-6 
        py-4 px-2
        items-center text-center
        shadow shadow-slate-300
      "
    >
      {/* IMAGE + NAME */}
      <Link to="/shop" className="flex items-center gap-4 justify-center">
        <img src={img} className="w-20 h-20 object-cover rounded" />
        <p className="font-semibold text-sm sm:text-base">{name}</p>
      </Link>

      {/* PRICE */}
      <p className="text-sm sm:text-base font-medium">₹{price}</p>

      {/* QUANTITY */}
      <div className="flex justify-center">
        <div className="inline-flex items-center justify-center border border-slate-300 rounded">
          <button
            onClick={decrement}
            className="px-3 py-2 bg-gray-200 hover:bg-rose-600 hover:text-white text-lg"
          >
            -
          </button>

          <span className="px-4 text-sm sm:text-base">{quantity}</span>

          <button
            onClick={increment}
            className="px-3 py-2 bg-gray-200 hover:bg-rose-600 hover:text-white text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* TOTAL */}
      <p className="font-semibold text-sm sm:text-base">₹{total}</p>

      {/* DELETE BUTTON */}
      <button
        onClick={handleRemove}
        className="text-red-500 flex justify-center items-center"
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
    </div>
  );
};

export default CartProduct;
