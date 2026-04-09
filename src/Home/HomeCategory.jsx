import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import icon from "../assets/icons/cube.svg";

const categoryList = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    imgAlt: "DSLR Camera",
    iconName: icon,
    title: "DSLR Camera",
    categoryKey: "DSLR Camera",
    count: "240+ Items",
    emoji: "📷",
    accent: "#818cf8",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    imgAlt: "Shoes",
    iconName: icon,
    title: "Shoes",
    categoryKey: "Shoes",
    count: "1.2k+ Items",
    emoji: "👟",
    accent: "#34d399",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1756705533779-105bf34e0722?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imgAlt: "Photography",
    iconName: icon,
    title: "Photography",
    categoryKey: "Photography",
    count: "180+ Items",
    emoji: "🎞️",
    accent: "#f59e0b",
  },
  {
    imgUrl:
      "https://i.pinimg.com/736x/40/f8/e0/40f8e031add6ee1019966446130bc235.jpg",
    imgAlt: "Formal Dress",
    iconName: icon,
    title: "Formal Dress",
    categoryKey: "Formal Dress",
    count: "560+ Items",
    emoji: "👔",
    accent: "#38bdf8",
  },
  {
    imgUrl:
      "http://www.galaxybags.com.pk/cdn/shop/files/IMG_1844.jpg?v=1714918713",
    imgAlt: "Colorful Bags",
    iconName: icon,
    title: "Colorful Bags",
    categoryKey: "Bags",
    count: "390+ Items",
    emoji: "👜",
    accent: "#f472b6",
  },
  {
    imgUrl:
      "https://www.hello-hayley.com/wp-content/uploads/2024/08/funky-living-room-ideas-1-683x1024.jpg",
    imgAlt: "Home Decor",
    iconName: icon,
    title: "Home Decor",
    categoryKey: "Home Decor",
    count: "820+ Items",
    emoji: "🛋️",
    accent: "#fb923c",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const HomeCategory = () => {
  return (
    <div className="flex flex-col gap-12 py-20 px-2 md:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="text-center md:text-left">
          <p className="text-amber-400 text-[11px] uppercase tracking-[0.4em] font-semibold mb-3">
            — Browse Categories
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
            Shop by{" "}
            <span className="italic text-white/40 font-light">Category</span>
          </h2>
        </div>
        <Link to="/shop">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-amber-400/40 text-[12px] uppercase tracking-widest transition-all duration-300"
          >
            View All Categories →
          </motion.button>
        </Link>
      </motion.div>

      {/* Category Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5"
      >
        {categoryList.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link to={`/shop?category=${encodeURIComponent(item.categoryKey)}`}>
              <CategoryCard {...item} />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-center"
      >
        <Link to="/shop">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-9 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 font-bold text-[12px] uppercase tracking-[0.2em] shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 transition-all duration-300"
          >
            Explore All Products
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default HomeCategory;
