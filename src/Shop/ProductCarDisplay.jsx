import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, removeItem } from "../utilis/CartSlice";
import { addToast } from "../utilis/ToastSlice";

const ProductCarDisplay = ({ product }) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  const { id, seller, name, ratings, ratingsCount, price, description, img } =
    product;

  const handleAddItem = () => {
    dispatch(addItem({ id, seller, name, price, img, size, color }));
    dispatch(addToast({ type: "success", message: "Added to cart" }));
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
    <div className="flex flex-col gap-1.5 text-white">
      <h2 className="text-2xl font-bold uppercase tracking-wide">{name}</h2>
      <p className="text-slate-400 mt-1">{seller}</p>

      <div className="flex items-center mt-2">
        <p className="text-amber-300 text-xl">
          {"*".repeat(ratings)}
          {".".repeat(5 - ratings)}
        </p>
        <p className="text-sm text-slate-400 ml-2">({ratingsCount} Reviews)</p>
      </div>

      <p className="text-3xl font-semibold text-amber-200 mt-4">
        INR {price}
      </p>

      <p className="text-slate-300 mt-3 leading-relaxed">
        {description ||
          "Energistically deliver tactical metrics after analyzing properly transition enterprises and emerging applications."}
      </p>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <div className="flex w-fit ml-24 items-center border border-white/10 overflow-hidden rounded-full">
          <button
            disabled={!size || !color}
            onClick={decrement}
            className={`px-3 py-2 bg-white/10 text-lg ${
              !size || !color
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-amber-300 hover:text-slate-900"
            }`}
          >
            -
          </button>

          <span className="px-4 text-white">{currentItem?.quantity || 0}</span>
          <button
            disabled={!size || !color}
            onClick={increment}
            className={`px-3 py-2 bg-white/10 text-lg ${
              !size || !color
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-amber-300 hover:text-slate-900"
            }`}
          >
            +
          </button>
        </div>

        <select
          className="border border-white/10 bg-transparent text-white p-2 flex-1 rounded-full"
          onChange={(e) => setSize(e.target.value)}
          value={size}
        >
          <option className="text-slate-900" value="">
            Select Size
          </option>
          <option className="text-slate-900">SM</option>
          <option className="text-slate-900">MD</option>
          <option className="text-slate-900">LG</option>
          <option className="text-slate-900">XL</option>
          <option className="text-slate-900">XXL</option>
        </select>

        <select
          className="border border-white/10 bg-transparent text-white p-2 flex-1 rounded-full"
          onChange={(e) => setColor(e.target.value)}
          value={color}
        >
          <option className="text-slate-900" value="">
            Select Color
          </option>
          <option className="text-slate-900">Black</option>
          <option className="text-slate-900">White</option>
          <option className="text-slate-900">Blue</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <button
          disabled={!size || !color}
          onClick={() => {
            handleAddItem();
          }}
          type="submit"
          className={`btn-primary ${!size || !color ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Add To Cart
        </button>
        <Link to="/cart-page">
          <button
            disabled={!size || !color}
            className={`btn-ghost w-full ${!size || !color ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Check Out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCarDisplay;
