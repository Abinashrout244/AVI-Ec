import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const stats = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
        <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
      </svg>
    ),
    count: 12600,
    suffix: "+",
    label: "Merchants Enrolled",
    color: "#f472b6",
    bg: "from-rose-500/20 to-pink-600/5",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
        <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
      </svg>
    ),
    count: 30,
    suffix: "+",
    label: "Training Programs",
    color: "#34d399",
    bg: "from-emerald-500/20 to-teal-600/5",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
        <path d="M440-120v-80h80v80h-80Zm-80 0v-80h80v80h-80Zm160 0v-80h80v80h-80ZM160-280v-480h80v480h-80Zm560 0v-480h80v480h-80ZM240-840h480v80H240v-80ZM160-840v-80h640v80H160Zm80 640v-80h480v80H240Z" />
      </svg>
    ),
    count: 100,
    suffix: "+",
    label: "Rewards & Gift Cards",
    color: "#f59e0b",
    bg: "from-amber-500/20 to-yellow-600/5",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
        <path d="M480-260q68 0 123.5-38.5T680-400H280q25 63 80.5 101.5T480-260ZM312-520l44-42 42 42 42-42-86-84-86 84 44 42Zm250 0 42-42 44 42 42-42-86-84-86 84 42 42ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
    ),
    count: 60000,
    suffix: "+",
    label: "Happy Customers",
    color: "#818cf8",
    bg: "from-violet-500/20 to-indigo-600/5",
  },
];

const features = [
  { icon: "🚀", title: "Lightning Fast", desc: "Same-day delivery across 300+ cities in India" },
  { icon: "💎", title: "Premium Brands", desc: "500+ top brands curated for you" },
  { icon: "🔒", title: "Secure Shopping", desc: "Bank-grade 256-bit SSL encryption" },
  { icon: "↩️", title: "Hassle-free Returns", desc: "7-day no-questions-asked return policy" },
];

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 px-2 md:px-8 flex flex-col gap-20">

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5" ref={ref}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`relative glass-panel bg-gradient-to-br ${stat.bg} rounded-2xl p-6 flex flex-col gap-3 cursor-default overflow-hidden`}
          >
            {/* Decorative glow */}
            <div
              className="absolute -top-4 -right-4 size-20 rounded-full blur-2xl opacity-30"
              style={{ backgroundColor: stat.color }}
            />

            <div
              className="size-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${stat.color}20`, color: stat.color, border: `1px solid ${stat.color}30` }}
            >
              {stat.icon}
            </div>

            <div>
              <p className="text-3xl font-bold text-white">
                {isInView ? (
                  <CountUp end={stat.count} duration={2.5} separator="," />
                ) : "0"}
                <span style={{ color: stat.color }}>{stat.suffix}</span>
              </p>
              <p className="text-white/45 text-[12px] mt-1 leading-snug">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Why Choose Us ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <div>
            <p className="text-amber-400 text-[11px] uppercase tracking-[0.4em] font-semibold mb-3">
              — Why Choose Us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              Become a{" "}
              <span className="italic text-white/40 font-light">Merchant</span>
              <br />Partner Today
            </h2>
          </div>

          <p className="text-white/50 text-base leading-relaxed max-w-md">
            Join India's fastest growing e-commerce marketplace. Get access to 
            millions of customers, powerful seller tools, and dedicated support 
            to grow your business.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass-panel rounded-xl p-4 flex gap-3"
              >
                <span className="text-2xl flex-shrink-0">{f.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{f.title}</p>
                  <p className="text-white/40 text-[11px] mt-0.5 leading-snug">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 mt-2">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 font-bold text-[12px] uppercase tracking-[0.15em] shadow-lg shadow-amber-400/25"
              >
                Apply as Merchant
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 font-semibold text-[12px] uppercase tracking-[0.15em] transition-all"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right: Visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Main image card */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
              alt="Shopping experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring" }}
            className="absolute -bottom-6 -left-6 glass-panel rounded-2xl p-4 flex items-center gap-4 shadow-2xl"
          >
            <div className="size-12 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-2xl">
              📦
            </div>
            <div>
              <p className="text-white font-bold text-base">10M+ Orders</p>
              <p className="text-white/40 text-[11px]">Delivered last year</p>
            </div>
          </motion.div>

          {/* Floating rating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute -top-6 -right-6 glass-panel rounded-2xl p-4 flex items-center gap-3 shadow-2xl"
          >
            <span className="text-2xl">⭐</span>
            <div>
              <p className="text-white font-bold text-base">4.9 / 5.0</p>
              <p className="text-white/40 text-[11px]">Average rating</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
