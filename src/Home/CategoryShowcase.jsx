import React, { useState } from "react";
const title = "Our Products";
import CategoryShowcaseHeader from "./CategoryShowcaseHeader";
import CategoryShowcaseCard from "./CategoryShowcaseCard";
const ProductData = [
  {
    imgUrl: "src/assets/images/categoryTab/01.jpg",
    cate: "Shoes",
    title: "Nike Premier X",
    author: "assets/images/course/author/01.jpg",
    brand: "Nike",
    price: "$199.00",
    id: 1,
  },
  {
    imgUrl: "src/assets/images/categoryTab/02.jpg",
    cate: "Bags",
    title: "Asthetic Bags",
    author: "assets/images/course/author/02.jpg",
    brand: "D&J Bags",
    price: "$199.00",
    id: 2,
  },
  {
    imgUrl: "src/assets/images/categoryTab/03.jpg",
    cate: "Phones",
    title: "iPhone 12",
    author: "src/assets/images/categoryTab/brand/apple.png",
    brand: "Apple",
    price: "$199.00",
    id: 3,
  },
  {
    imgUrl: "src/assets/images/categoryTab/04.jpg",
    cate: "Bags",
    title: "Hiking Bag 15 Nh100",
    author: "assets/images/course/author/04.jpg",
    brand: "Gucci",
    price: "$199.00",
    id: 4,
  },
  {
    imgUrl: "src/assets/images/categoryTab/05.jpg",
    cate: "Shoes",
    title: "Outdoor Sports Shoes",
    author: "assets/images/course/author/05.jpg",
    brand: "Nike",
    price: "$199.00",
    id: 5,
  },
  {
    imgUrl: "src/assets/images/categoryTab/06.jpg",
    cate: "Beauty",
    title: "COSRX Snail Mucin",
    author: "assets/images/course/author/06.jpg",
    brand: "Zaara",
    price: "$199.00",
    id: 6,
  },
  {
    imgUrl: "src/assets/images/categoryTab/07.jpg",
    cate: "Bags",
    title: "Look Less Chanel Bag ",
    author: "assets/images/course/author/01.jpg",
    brand: "Gucci",
    price: "$199.00",
    id: 7,
  },
  {
    imgUrl: "src/assets/images/categoryTab/08.jpg",
    cate: "Shoes",
    title: "Casual Sneakers",
    author: "assets/images/course/author/02.jpg",
    brand: "Bata",
    price: "$199.00",
    id: 8,
  },
  {
    imgUrl: "src/assets/images/categoryTab/31.jpg",
    cate: "Phones",
    title: "IPhone 16",
    author: "assets/images/course/author/02.jpg",
    brand: "Iphone",
    price: "$159.00",
    id: 9,
  },
  {
    imgUrl: "src/assets/images/categoryTab/30.jpg",
    cate: "Phones",
    title: "Samsung S25 ultra",
    author: "assets/images/course/author/02.jpg",
    brand: "Samsung",
    price: "$189.00",
    id: 10,
  },
  {
    imgUrl: "src/assets/images/categoryTab/28.jpg",
    cate: "Beauty",
    title: "Cetaphil",
    author: "assets/images/course/author/06.jpg",
    brand: "Zaara",
    price: "$299.00",
    id: 11,
  },
  {
    imgUrl: "src/assets/images/categoryTab/29.jpg",
    cate: "Beauty",
    title: " De-construct",
    author: "assets/images/course/author/06.jpg",
    brand: "Zaraa",
    price: "$259.00",
    id: 12,
  },
];
const CategoryShowcase = () => {
  const [data, setData] = useState(ProductData);
  const [active, setActive] = useState("All");
  const filterItem = (select) => {
    setActive(select);
    if (select == "All") {
      setData(ProductData);

      return;
    } else {
      const filterdata = ProductData.filter((item) => {
        return item.cate == select;
      });
      setData(filterdata);
    }
  };
  return (
    <div className=" md:px-22 pt-20 md:pt-32 pb-28 bg-gray-200 flex flex-col gap-16 ">
      <CategoryShowcaseHeader filterItem={filterItem} active={active} />
      <div className="grid grid-cols-1 md:grid-cols-4 px-2 gap-5 ">
        {data.map((item) => {
          return <CategoryShowcaseCard {...item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default CategoryShowcase;
