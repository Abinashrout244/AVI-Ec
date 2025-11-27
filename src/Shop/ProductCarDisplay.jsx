import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, removeItem } from "../utilis/CartSlice";
const ProductCarDisplay = ({ product }) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  const { id, seller, name, ratings, ratingsCount, price, description, img } =
    product;

  const handleAddItem = () => {
    dispatch(addItem({ id, seller, name, price, img, size, color }));
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
    <div className="flex flex-col gap-1.5  ">
      <h2 className="text-2xl font-bold uppercase tracking-wide">{name}</h2>
      <p className="text-gray-500 mt-1">{seller}</p>

      <div className="flex items-center mt-2">
        <p className="text-yellow-400 text-xl">
          {"★".repeat(ratings)}
          {"☆".repeat(5 - ratings)}
        </p>
        <p className="text-sm text-gray-600 ml-2">({ratingsCount} Reviews)</p>
      </div>

      <p className="text-3xl font-semibold text-gray-900 mt-4">${price}</p>

      <p className="text-gray-600 mt-3 leading-relaxed">
        {description ||
          "Energistically deliver tactical metrics after analyzing properly transition enterprises and emerging applications."}
      </p>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <div className="flex w-fit ml-24 items-center border border-slate-300 overflow-hidden">
          <button
            disabled={!size || !color}
            onClick={decrement}
            className={`px-3 py-2 bg-gray-200 text-lg ${
              !size || !color
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-rose-600 hover:text-white"
            }`}
          >
            -
          </button>

          <span className="px-4">{currentItem?.quantity || 0}</span>
          <button
            disabled={!size || !color}
            onClick={increment}
            className={`px-3 py-2 bg-gray-200 text-lg ${
              !size || !color
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-rose-600 hover:text-white"
            }`}
          >
            +
          </button>
        </div>

        {/* Size */}
        <select
          className="border  border-slate-300 p-2 flex-1"
          onChange={(e) => setSize(e.target.value)}
          value={size}
        >
          <option value="">Select Size</option>
          <option>SM</option>
          <option>MD</option>
          <option>LG</option>
          <option>XL</option>
          <option>XXL</option>
        </select>

        {/* Color */}
        <select
          className="border border-slate-300 p-2 flex-1 "
          onChange={(e) => setColor(e.target.value)}
          value={color}
        >
          <option value="">Select Color</option>
          <option>Black</option>
          <option>White</option>
          <option>Blue</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <button
          disabled={!size || !color}
          onClick={() => {
            handleAddItem();
          }}
          type="submit"
          className={`bg-orange-500 text-white py-2 px-6 rounded-lg font-semibold ${
            !size || !color
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-rose-500 hover:text-white"
          }`}
        >
          Add To Cart
        </button>
        <Link to="/cart-page">
          <button
            disabled={!size || !color}
            className={`bg-blue-500 text-white py-2 px-6 w-full rounded-lg font-semibold 
              ${
                !size || !color
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-600 hover:text-wh"
              }`}
          >
            Check Out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCarDisplay;
