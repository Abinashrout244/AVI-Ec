import React from "react";
import star from "../assets/icons/star.svg";

const CategoryShowcaseCard = ({ imgUrl, cate, title, brand, price }) => {
  return (
    <div className="w-full max-w-full sm:max-w-xs  overflow-hidden shadow-lg shadow-black/20 bg-white">
      <div className="relative">
        <img
          src={imgUrl}
          alt="category"
          className="w-full h-48 object-cover object-fit"
        />

        <div className="absolute -bottom-4 left-0 right-0 flex items-center justify-between bg-rose-600 text-white px-4 py-2 shadow-md">
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
        <h1 className="text-xl font-bold text-gray-900">
          {title || "Title here"}
        </h1>

        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-600">{brand || "Brand"}</p>
          <p className="text-lg font-bold text-rose-600">{price || "$00.00"}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryShowcaseCard;
