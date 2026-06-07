import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NoOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[450px] px-6 text-center font-sans antialiased">
      {/* Premium Layered Icon Animation */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Glow Background Pulse */}
        <div className="absolute size-28 bg-amber-500/10 blur-3xl rounded-full animate-pulse" />

        {/* Decorative Floating Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute size-24 border border-dashed border-slate-700/50 rounded-full"
        />

        {/* The Box/Package Icon Layers */}
        <div className="relative size-20 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-xl shadow-black/20">
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-amber-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </motion.div>

          {/* Floating Sparkle Elements */}
          <motion.span
            animate={{ scale: [0.6, 1.1, 0.6], opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-3 right-3 text-sky-400 text-xs"
          >
            ✦
          </motion.span>
          <motion.span
            animate={{ scale: [1, 0.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-4 left-3 text-amber-300 text-sm"
          >
            ✦
          </motion.span>
        </div>
      </div>

      {/* Typography Section */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-2"
      >
        No Orders Placed Yet
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-slate-400 text-sm max-w-sm leading-relaxed mb-8"
      >
        Your order history is currently empty. Explore our catalog to find the
        premium products curated just for you.
      </motion.p>

      {/* Premium CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          to="/shop"
          className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-semibold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 overflow-hidden group"
        >
          {/* Shimmer Light Flash Effect on Hover */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out]" />
          Start Exploring
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            className="group-hover:translate-x-0.5 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
};

export default NoOrders;
