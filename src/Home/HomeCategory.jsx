const btnText = "Get Started Now";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import icon from "../assets/icons/cube.svg";
const categoryList = [
  {
    imgUrl: "src/assets/images/category/01.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: icon,
    title: "DSLR Camera",
  },
  {
    imgUrl: "src/assets/images/category/02.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: icon,
    title: "Shoes",
  },
  {
    imgUrl: "src/assets/images/category/03.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: icon,
    title: "Photography",
  },
  {
    imgUrl: "src/assets/images/category/04.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: icon,
    title: "Formal Dress",
  },
  {
    imgUrl: "src/assets/images/category/05.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: icon,
    title: "Colorful Bags",
  },
  {
    imgUrl: "src/assets/images/category/06.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: icon,
    title: "Home Decor",
  },
];

import React from "react";

const HomeCategory = () => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center px-2 md:px-22 py-7 ">
      <div className="flex flex-col text-center">
        <p className="text-lg ">Choose Any Products</p>
        <h2 className="font-semibold text-3xl md:text-4xl">
          Buy Everything with Us
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-7">
        {categoryList.map((item, index) => {
          return (
            <Link to="/shop" key={index}>
              <CategoryCard {...item} />
            </Link>
          );
        })}
      </div>
      <Link to="/shop">
        <button className="border-amber-400 px-6 py-1 rounded-md border-2 hover:bg-amber-400 hover:border-none transition-all ease-in">
          Get Started Now
        </button>
      </Link>
    </div>
  );
};

export default HomeCategory;
