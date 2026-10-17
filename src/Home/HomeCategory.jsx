import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
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

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap";

const serif = "font-['Instrument_Serif',Georgia,serif]";
const sans = "font-['Hanken_Grotesk',system-ui,sans-serif]";
const ease = [0.16, 1, 0.3, 1];

const HomeCategory = () => {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_LINK}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_LINK;
    document.head.appendChild(l);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };
  const itemVariants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
  };
  const Arrow = () => (
    <svg
      viewBox="0 0 24 24"
      className="size-4 transition-transform duration-500 group-hover:translate-x-1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12h17M14 6l6 6-6 6" />
    </svg>
  );
  return (
    <div className="flex flex-col gap-12 py-20 px-2 md:px-8">
      {/* Header */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease }}
        className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
      >
        <div>
          <p className="mb-6 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/55">
            <span className="h-px w-10 bg-white/40" />
            Browse categories
          </p>
          <h2
            className={`${serif} text-[clamp(2.8rem,6vw,5.2rem)] font-normal leading-[0.96] tracking-[-0.025em]`}
          >
            Shop by <span className="italic text-[#c4a1f5]">category</span>
          </h2>
        </div>

        <Link
          to="/shop"
          className="group inline-flex items-center gap-3 border-b border-white/25 pb-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-white/80 transition-colors duration-500 hover:border-[#c4a1f5] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a1f5]"
        >
          View all categories
          <Arrow />
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
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="flex justify-center pt-4"
      >
        <Link
          to="/shop"
          className="group inline-flex items-center gap-3 border border-[#d9b55f] bg-[#d9b55f] px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0d0910] transition-colors duration-500 hover:bg-transparent hover:text-[#d9b55f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a1f5]"
        >
          Explore all products
          <Arrow />
        </Link>
      </motion.div>
    </div>
  );
};

export default HomeCategory;
