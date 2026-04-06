import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CategoryCard = ({ imgUrl, imgAlt, title, count, emoji, accent }) => {
  return (
    <motion.div
      whileHover="hover"
      className="relative group overflow-hidden rounded-2xl cursor-pointer aspect-[3/4]"
    >
      {/* Image */}
      <motion.img
        src={imgUrl}
        alt={imgAlt}
        className="w-full h-full object-cover"
        variants={{
          hover: { scale: 1.08 },
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Colored glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{ background: `radial-gradient(circle at bottom, ${accent}30, transparent 70%)` }}
        variants={{ hover: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        {/* Emoji badge */}
        <motion.div
          className="self-start"
          variants={{ hover: { scale: 1.15, y: -2 } }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="text-2xl p-2.5 rounded-xl backdrop-blur-md block"
            style={{ backgroundColor: `${accent}25`, border: `1px solid ${accent}40` }}
          >
            {emoji}
          </span>
        </motion.div>

        {/* Bottom info */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white font-semibold text-base md:text-lg leading-tight">
              {title}
            </p>
            <p className="text-white/50 text-[11px] mt-0.5 uppercase tracking-wider">
              {count}
            </p>
          </div>

          {/* Animated arrow */}
          <motion.div
            className="size-9 rounded-full flex items-center justify-center text-slate-900 font-bold flex-shrink-0"
            style={{ backgroundColor: accent }}
            variants={{
              hover: { scale: 1.1, x: 2, y: -2 },
            }}
            transition={{ duration: 0.3 }}
          >
            →
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
