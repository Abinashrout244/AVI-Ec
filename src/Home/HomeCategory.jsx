const btnText = "Get Started Now";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import icon from "../assets/icons/cube.svg";
const categoryList = [
  {
    imgUrl:
      "https://tse3.mm.bing.net/th/id/OIP.wJwYj1g3r1BzqO7tPgUs3QHaEo?pid=Api&P=0&h=180",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: icon,
    title: "DSLR Camera",
  },
  {
    imgUrl:
      "https://static.vecteezy.com/system/resources/previews/022/255/712/non_2x/beautiful-shoes-generative-ai-free-photo.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: icon,
    title: "Shoes",
  },
  {
    imgUrl:
      "https://tse4.mm.bing.net/th/id/OIP.67DZtOnSLEPKwSCDpAakmAHaE8?pid=Api&P=0&h=180",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: icon,
    title: "Photography",
  },
  {
    imgUrl:
      "https://thumbs.dreamstime.com/b/men-s-shoes-belt-tie-table-174136858.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: icon,
    title: "Formal Dress",
  },
  {
    imgUrl:
      "https://png.pngtree.com/background/20230524/original/pngtree-group-of-different-colored-handbags-picture-image_2707306.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: icon,
    title: "Colorful Bags",
  },
  {
    imgUrl:
      "https://tse2.mm.bing.net/th/id/OIP.Uk9UZPAVX-gZF3efDVhNsgHaE8?pid=Api&P=0&h=180",
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-6">
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
