import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryShowcaseHeader from "./CategoryShowcaseHeader";
import CategoryShowcaseCard from "./CategoryShowcaseCard";
import { Link } from "react-router-dom";

const ProductData = [
  {
    imgUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    cate: "Shoes",
    title: "Nike Air Zoom X",
    brand: "Nike",
    price: "$199.00",
    rating: 4.8,
    reviews: 1240,
    id: 1,
    badge: "Best Seller",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    cate: "Bags",
    title: "Aesthetic Tote Bag",
    brand: "D&J Bags",
    price: "$159.00",
    rating: 4.6,
    reviews: 832,
    id: 2,
    badge: "New",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80",
    cate: "Phones",
    title: "iPhone 15 Pro",
    brand: "Apple",
    price: "$999.00",
    rating: 4.9,
    reviews: 5420,
    id: 3,
    badge: "Hot",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    cate: "Bags",
    title: "Hiking Bag NH100",
    brand: "Quechua",
    price: "$249.00",
    rating: 4.7,
    reviews: 678,
    id: 4,
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
    cate: "Shoes",
    title: "Outdoor Sport Shoes",
    brand: "Adidas",
    price: "$179.00",
    rating: 4.5,
    reviews: 921,
    id: 5,
    badge: "Sale",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    cate: "Beauty",
    title: "Glow Serum Kit",
    brand: "Zaara Beauty",
    price: "$89.00",
    rating: 4.8,
    reviews: 2310,
    id: 6,
    badge: "Trending",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    cate: "Bags",
    title: "Mini Chanel Look",
    brand: "Gucci",
    price: "$329.00",
    rating: 4.9,
    reviews: 450,
    id: 7,
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    cate: "Shoes",
    title: "Casual Sneakers",
    brand: "Puma",
    price: "$129.00",
    rating: 4.4,
    reviews: 1876,
    id: 8,
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    cate: "Phones",
    title: "Galaxy S25 Ultra",
    brand: "Samsung",
    price: "$1199.00",
    rating: 4.8,
    reviews: 3240,
    id: 9,
    badge: "New",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1614251056798-0a63eda2bb25?w=600&q=80",
    cate: "Beauty",
    title: "Cetaphil Glow Set",
    brand: "Cetaphil",
    price: "$59.00",
    rating: 4.7,
    reviews: 988,
    id: 10,
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80",
    cate: "Beauty",
    title: "De-Construct Serum",
    brand: "De-Construct",
    price: "$79.00",
    rating: 4.6,
    reviews: 765,
    id: 11,
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
    cate: "Phones",
    title: "iPhone 16",
    brand: "Apple",
    price: "$899.00",
    rating: 4.9,
    reviews: 4200,
    id: 12,
    badge: "Hot",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, scale: 0.92, y: -10,
    transition: { duration: 0.3 },
  },
};

const CategoryShowcase = () => {
  const [data, setData] = useState(ProductData);
  const [active, setActive] = useState("All");

  const filterItem = (select) => {
    setActive(select);
    if (select === "All") {
      setData(ProductData);
    } else {
      setData(ProductData.filter((item) => item.cate === select));
    }
  };

  return (
    <div className="py-20 px-2 md:px-8 flex flex-col gap-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center flex flex-col gap-3"
      >
        <p className="text-amber-400 text-[11px] uppercase tracking-[0.4em] font-semibold">
          — Featured Products
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-white">
          Our{" "}
          <span className="italic text-white/40 font-light">Bestsellers</span>
        </h2>
        <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
          Handpicked products loved by thousands of shoppers across India
        </p>
      </motion.div>

      {/* Filter Header */}
      <CategoryShowcaseHeader filterItem={filterItem} active={active} />

      {/* Product Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {data.map((item) => (
            <motion.div key={item.id} variants={cardVariants}>
              <CategoryShowcaseCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-center pt-4"
      >
        <Link to="/shop">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3 px-9 py-3.5 rounded-full border border-amber-400/30 text-amber-400 text-[12px] uppercase tracking-widest font-semibold hover:bg-amber-400 hover:text-slate-900 transition-all duration-300"
          >
            View All Products
            <motion.span
              className="group-hover:translate-x-1 transition-transform inline-block"
            >→</motion.span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default CategoryShowcase;
