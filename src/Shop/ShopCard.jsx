import React from "react";
import star from "../assets/icons/star.svg";
import { Link } from "react-router-dom";

const ShopCard = ({ products, gridlist }) => {
  return (
    <div
      className={`grid px-4 md:px-0 gap-10 
        ${
          gridlist ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1"
        }
      `}
    >
      {products.map((item, i) => (
        <div
          key={i}
          className={`relative flex 
            ${gridlist ? "flex-col" : "flex-row"} 
            gap-5 sm:gap-10 w-full
          `}
        >
          {/* IMAGE */}
          <div className="relative w-40 h-40 sm:w-64 sm:h-64 md:overflow-hidden mx-auto">
            <Link to={`/shop/${item.id}`}>
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-110 hover:opacity-80 transition-all"
              />
            </Link>

            {/* BUTTONS */}
            <div className="absolute bottom-2  -right-12 md:right-2 flex flex-col gap-2">
              <Link
                to="/cart-page"
                className="bg-black/80 text-white text-xs px-3 py-2 rounded-md hover:bg-black transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </Link>

              <Link
                to={`/shop/${item.id}`}
                className="bg-yellow-500 text-black text-xs px-3 py-2 rounded-md hover:bg-yellow-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bag-check"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"
                  />
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                </svg>
              </Link>

              <button className="bg-white text-black text-xs px-3 py-2 rounded-md border hover:bg-gray-200 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
              </button>
            </div>
          </div>

          {/* TEXT */}
          <div className="p-4 flex flex-col justify-center items-center text-center gap-2 w-full">
            <Link to={`/shop/${item.id}`}>
              <h2 className="text-lg font-semibold">{item.name}</h2>
            </Link>

            <div className="flex flex-row gap-1">
              {[...Array(5)].map((_, idx) => (
                <img key={idx} src={star} className="w-4 h-4" alt="star" />
              ))}
            </div>

            <p className="text-xl font-bold text-gray-800">₹{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopCard;
