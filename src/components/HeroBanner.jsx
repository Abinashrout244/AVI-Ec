import React from "react";
import { Link } from "react-router-dom";
import bgimg from "../assets/images/bg-img/01.jpg";
import { motion } from "framer-motion";
const HeroBanner = ({ title, page }) => {
  return (
    <section className="relative h-[52vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgimg})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-slate-950/90" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center space-y-3"
      >
        <h2 className="text-4xl md:text-5xl font-semibold text-white">
          {title}
        </h2>
        <ul className="flex flex-row gap-3 text-slate-300 text-base justify-center">
          <li>
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-amber-200">{page}</li>
        </ul>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
