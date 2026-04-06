import React from "react";
import star from "../assets/icons/star.svg";

const CategoryShowcaseCard = ({ imgUrl, cate, title, brand, price }) => {
  const formattedPrice = price
    ? String(price).replace("$", "INR ")
    : "INR 00.00";
  return (
    <div className="w-full max-w-full sm:max-w-xs overflow-hidden lux-card">
      <div className="relative">
        <img
          src={imgUrl}
          alt="category"
          className="w-full h-48 object-cover object-fit"
        />

        <div className="absolute -bottom-4 left-0 right-0 flex items-center justify-between bg-amber-300/90 text-slate-900 px-4 py-2 shadow-md">
          <p className="text-base font-semibold">{cate || "Category"}</p>
          <div className="flex flex-row ">
            <img src={star} className="w-5 h-5" alt="star" />
            <img src={star} className="w-5 h-5" alt="star" />
            <img src={star} className="w-5 h-5" alt="star" />
            <img src={star} className="w-5 h-5" alt="star" />
            <img src={star} className="w-5 h-5" alt="star" />
          </div>
        </div>
      </div>

      <div className="mt-6 px-2 md:px-4 py-3 md:y-6 flex flex-col gap-3">
        <h1 className="text-xl font-bold text-white">
          {title || "Title here"}
        </h1>

        <div className="flex items-center justify-between">
          <p className="font-semibold text-slate-300">{brand || "Brand"}</p>
          <p className="text-lg font-bold text-amber-200">
            {formattedPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryShowcaseCard;
