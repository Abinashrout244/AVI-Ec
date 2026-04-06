import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import icon from "../assets/icons/cube.svg";

const categoryList = [
  {
    imgUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    imgAlt: "DSLR Camera",
    iconName: icon,
    title: "DSLR Camera",
    count: "240+ Items",
    emoji: "📷",
    accent: "#818cf8",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    imgAlt: "Shoes",
    iconName: icon,
    title: "Shoes",
    count: "1.2k+ Items",
    emoji: "👟",
    accent: "#34d399",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?w=600&q=80",
    imgAlt: "Photography",
    iconName: icon,
    title: "Photography",
    count: "180+ Items",
    emoji: "🎞️",
    accent: "#f59e0b",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4cbb76?w=600&q=80",
    imgAlt: "Formal Dress",
    iconName: icon,
    title: "Formal Dress",
    count: "560+ Items",
    emoji: "👔",
    accent: "#38bdf8",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    imgAlt: "Colorful Bags",
    iconName: icon,
    title: "Colorful Bags",
    count: "390+ Items",
    emoji: "👜",
    accent: "#f472b6",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    imgAlt: "Home Decor",
    iconName: icon,
    title: "Home Decor",
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
            <Link to="/shop">
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
