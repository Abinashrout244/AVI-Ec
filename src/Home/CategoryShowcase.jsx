import React, { useState } from "react";
const title = "Our Products";
import CategoryShowcaseHeader from "./CategoryShowcaseHeader";
import CategoryShowcaseCard from "./CategoryShowcaseCard";
const ProductData = [
  {
    imgUrl:
      "https://tse3.mm.bing.net/th/id/OIP.3j_mj_z3PaG-Qudv9ZGG3wHaEc?pid=Api&P=0&h=180",
    cate: "Shoes",
    title: "Nike Premier X",
    author: "assets/images/course/author/01.jpg",
    brand: "Nike",
    price: "$199.00",
    id: 1,
  },
  {
    imgUrl:
      "https://tse2.mm.bing.net/th/id/OIP.yR7KQqB_v06ezdU6sUl8RwHaHa?pid=Api&P=0&h=180",
    cate: "Bags",
    title: "Asthetic Bags",
    author: "assets/images/course/author/02.jpg",
    brand: "D&J Bags",
    price: "$199.00",
    id: 2,
  },
  {
    imgUrl:
      "https://cellularkenya.co.ke/wp-content/uploads/2022/05/Apple-iPhone-12.jpg",
    cate: "Phones",
    title: "iPhone 12",
    author: "src/assets/images/categoryTab/brand/apple.png",
    brand: "Apple",
    price: "$199.00",
    id: 3,
  },
  {
    imgUrl:
      "https://tse1.mm.bing.net/th/id/OIP.RhcgsGtTnuy_Mt5Hx1FEZgHaE0?pid=Api&P=0&h=180",
    cate: "Bags",
    title: "Hiking Bag 15 Nh100",
    author: "assets/images/course/author/04.jpg",
    brand: "Gucci",
    price: "$199.00",
    id: 4,
  },
  {
    imgUrl:
      "https://tse4.mm.bing.net/th/id/OIP.p_ddxU-XtchSauJgLpYh0QHaE5?pid=Api&P=0&h=180",
    cate: "Shoes",
    title: "Outdoor Sports Shoes",
    author: "assets/images/course/author/05.jpg",
    brand: "Nike",
    price: "$199.00",
    id: 5,
  },
  {
    imgUrl:
      "https://img.freepik.com/premium-photo/collection-beauty-products-stone-with-plants-dark-background_926968-60.jpg",
    cate: "Beauty",
    title: "COSRX Snail Mucin",
    author: "assets/images/course/author/06.jpg",
    brand: "Zaara",
    price: "$199.00",
    id: 6,
  },
  {
    imgUrl:
      "https://tse4.mm.bing.net/th/id/OIP._-gzAX31VLInzuH2XuuZCQHaFF?pid=Api&P=0&h=180",
    cate: "Bags",
    title: "Look Less Chanel Bag ",
    author: "assets/images/course/author/01.jpg",
    brand: "Gucci",
    price: "$199.00",
    id: 7,
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    cate: "Shoes",
    title: "Casual Sneakers",
    author: "assets/images/course/author/02.jpg",
    brand: "Bata",
    price: "$199.00",
    id: 8,
  },
  {
    imgUrl:
      "https://tse1.mm.bing.net/th/id/OIP.HlFVZumCmO9aSI_w5x7tIgHaEK?pid=Api&P=0&h=180",
    cate: "Phones",
    title: "IPhone 16",
    author: "assets/images/course/author/02.jpg",
    brand: "Iphone",
    price: "$159.00",
    id: 9,
  },
  {
    imgUrl:
      "https://tse3.mm.bing.net/th/id/OIP.kHnkUX0mGo-AN6p48e2fUgHaEK?pid=Api&P=0&h=180",
    cate: "Phones",
    title: "Samsung S25 ultra",
    author: "assets/images/course/author/02.jpg",
    brand: "Samsung",
    price: "$189.00",
    id: 10,
  },
  {
    imgUrl:
      "https://img.freepik.com/premium-photo/beauty-products-with-pink-flowers-soft-pink-background-cosmetic-skincare-products_656098-652.jpg?w=2000",
    cate: "Beauty",
    title: "Cetaphil",
    author: "assets/images/course/author/06.jpg",
    brand: "Zaara",
    price: "$299.00",
    id: 11,
  },
  {
    imgUrl:
      "https://tse2.mm.bing.net/th/id/OIP.W1Sy7nr_h8Esct0U6-8t6gHaEq?pid=Api&P=0&h=180",
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
