import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const postList = [
  {
    id: 1,
    imgUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=70",
    title: "Top 10 Sneakers of 2025",
    date: "Apr 01, 2025",
    category: "Shoes",
  },
  {
    id: 2,
    imgUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=70",
    title: "Bag Trends You Must Know",
    date: "Mar 25, 2025",
    category: "Bags",
  },
  {
    id: 3,
    imgUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=70",
    title: "Best Skincare Routine 2025",
    date: "Mar 18, 2025",
    category: "Beauty",
  },
  {
    id: 4,
    imgUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=70",
    title: "Galaxy S25 vs iPhone 16",
    date: "Mar 10, 2025",
    category: "Phones",
  },
];

const Popularpost = () => {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/5">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-semibold">
          Popular Posts
        </h2>
      </div>
      <div className="flex flex-col">
        {postList.map((item, i) => (
          <Link to={`/blog/${item.id}`} key={item.id}>
            <motion.div
              whileHover={{ backgroundColor: "rgba(255,255,255,0.04)", x: 4 }}
              className={`flex items-center gap-3 px-4 py-3 ${
                i < postList.length - 1 ? "border-b border-white/5" : ""
              } cursor-pointer transition-colors`}
            >
              <div className="size-14 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-amber-400/70 text-[10px] uppercase tracking-wider font-semibold">
                  {item.category}
                </span>
                <p className="text-white text-[12px] font-medium line-clamp-2 leading-snug">
                  {item.title}
                </p>
                <p className="text-white/30 text-[11px]">{item.date}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Popularpost;
