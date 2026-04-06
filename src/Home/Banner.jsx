import React, { useEffect, useState, useRef } from "react";
import searchIcon from "../assets/icons/search-2.svg";
import Select from "../components/Select";
import Product from "../products.json";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// ── Hero slide data ────────────────────────────────────────────────────────────
const heroSlides = [
  {
    id: 1,
    eyebrow: "New Arrivals · Spring 2025",
    headline: "Wear What\nMatters Most",
    sub: "Curated fashion, tech & lifestyle drops — delivered fast across India.",
    cta: "Shop Collection",
    ctaLink: "/shop",
    badge: "UP TO 40% OFF",
    color: "from-violet-900/60 via-slate-950/80",
    accent: "#a78bfa",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
  },
  {
    id: 2,
    eyebrow: "Tech · Gadgets & More",
    headline: "Next-Gen Gadgets\nAre Here",
    sub: "Explore the latest smartphones, cameras & accessories at unbeatable prices.",
    cta: "Explore Tech",
    ctaLink: "/shop",
    badge: "FREE SHIPPING",
    color: "from-sky-900/60 via-slate-950/80",
    accent: "#38bdf8",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1600&q=80",
  },
  {
    id: 3,
    eyebrow: "Beauty · Skincare Essentials",
    headline: "Glow From\nWithin",
    sub: "Top beauty & skincare brands trusted by thousands — shop today.",
    cta: "Shop Beauty",
    ctaLink: "/shop",
    badge: "BUY 2 GET 1",
    color: "from-rose-900/60 via-slate-950/80",
    accent: "#fb7185",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=80",
  },
];

const floatingCards = [
  { label: "Shoes", count: "2.4k+ Products", emoji: "👟", color: "from-violet-500/20 to-violet-600/5" },
  { label: "Phones", count: "1.8k+ Products", emoji: "📱", color: "from-sky-500/20 to-sky-600/5" },
  { label: "Beauty", count: "3.2k+ Products", emoji: "✨", color: "from-rose-500/20 to-rose-600/5" },
];

const trustBadges = [
  { icon: "🚚", text: "Free Delivery", sub: "Orders over ₹999" },
  { icon: "↩️", text: "Easy Returns", sub: "7-day policy" },
  { icon: "🔒", text: "Secure Pay", sub: "256-bit SSL" },
  { icon: "⭐", text: "4.8 Rated", sub: "60k+ reviews" },
];

// ── Component ──────────────────────────────────────────────────────────────────
const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [paused, setPaused] = useState(false);
  const dropdownRef = useRef(null);
  const data = Product;

  // Auto-slide
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  // Search filter
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilterProducts([]);
      setShowDropdown(false);
    } else {
      const filter = data.filter((prod) =>
        prod.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilterProducts(filter);
      setShowDropdown(true);
    }
  }, [searchText, data]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#04060e]">

      {/* ── Background Image with parallax feel ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slide.img}
            alt="Hero background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} to-transparent`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060e] via-transparent to-[#04060e]/40" />
        </motion.div>
      </AnimatePresence>

      {/* ── Decorative orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${slide.accent}, transparent 70%)` }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-15%] right-[-5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full opacity-8"
          style={{ background: `radial-gradient(circle, ${slide.accent}, transparent 70%)` }}
        />
      </div>

      {/* ── Main Hero Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-36 pb-12 max-w-screen-2xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div className="flex flex-col gap-8">
            {/* Eyebrow */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`eyebrow-${slide.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <span
                  className="inline-block h-px w-10"
                  style={{ backgroundColor: slide.accent }}
                />
                <span
                  className="text-[11px] uppercase tracking-[0.4em] font-semibold"
                  style={{ color: slide.accent }}
                >
                  {slide.eyebrow}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Headline */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${slide.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-serif text-white leading-[1.05] tracking-tight"
              >
                {slide.headline.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? (
                      <span className="italic font-light" style={{ color: slide.accent }}>
                        {line}
                      </span>
                    ) : line}
                  </span>
                ))}
              </motion.h1>
            </AnimatePresence>

            {/* Sub */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${slide.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg text-white/55 max-w-md leading-relaxed"
              >
                {slide.sub}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link to={slide.ctaLink}>
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative px-7 py-3.5 rounded-full text-slate-900 font-bold text-[13px] uppercase tracking-[0.15em] overflow-hidden group"
                  style={{ background: `linear-gradient(135deg, ${slide.accent}, #f8d77b)` }}
                >
                  {slide.cta}
                  <motion.span
                    className="ml-2 inline-block group-hover:translate-x-1 transition-transform"
                  >→</motion.span>
                </motion.button>
              </Link>
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-[13px] uppercase tracking-[0.12em] hover:border-white/50 hover:bg-white/5 transition-all"
                >
                  View All
                </motion.button>
              </Link>
            </motion.div>

            {/* Slide nav dots */}
            <div className="flex items-center gap-3 pt-2">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { setCurrent(i); setPaused(true); }}
                  className="relative h-[3px] rounded-full overflow-hidden transition-all"
                  style={{
                    width: i === current ? "36px" : "16px",
                    backgroundColor: "rgba(255,255,255,0.15)"
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  {i === current && (
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ backgroundColor: slide.accent }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      key={`dot-${i}-${current}`}
                    />
                  )}
                </button>
              ))}
              <span className="text-white/30 text-[11px] tracking-widest ml-2">
                {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right: Floating Category Cards */}
          <div className="hidden lg:flex flex-col gap-4 items-center relative">
            {/* Badge pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="self-end mr-12 px-5 py-2 rounded-full bg-amber-400 text-slate-900 text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-amber-400/30"
            >
              🏷 {slide.badge}
            </motion.div>

            {floatingCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 20 }}
                animate={{ opacity: 1, x: i % 2 === 0 ? -20 : 20, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, type: "spring", bounce: 0.3 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`glass-panel bg-gradient-to-br ${card.color} border border-white/10 rounded-2xl p-5 flex items-center gap-4 cursor-pointer w-56`}
                style={{ alignSelf: i % 2 === 0 ? "flex-start" : "flex-end" }}
              >
                <span className="text-3xl">{card.emoji}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{card.label}</p>
                  <p className="text-white/40 text-[11px]">{card.count}</p>
                </div>
              </motion.div>
            ))}

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-panel border border-white/10 rounded-2xl p-5 flex gap-6 self-center"
            >
              {[["60k+", "Happy Clients"], ["500+", "Brands"], ["24/7", "Support"]].map(([num, label]) => (
                <div key={label} className="text-center">
                  <p className="font-bold text-white text-xl" style={{ color: slide.accent }}>{num}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Search Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative max-w-3xl mx-auto mt-14 w-full"
          ref={dropdownRef}
        >
          <div className="relative flex items-center bg-white/[0.04] backdrop-blur-3xl border border-white/12 rounded-full p-1.5 transition-all duration-500 focus-within:border-white/30 focus-within:bg-white/[0.07] shadow-2xl">
            <div className="hidden md:block pl-5 pr-3 border-r border-white/10">
              <Select select={"all"} />
            </div>

            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for products, brands & more..."
              className="flex-1 bg-transparent px-6 py-3.5 outline-none text-white font-light tracking-wide placeholder:text-white/25 text-sm"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3.5 bg-amber-400 rounded-full hover:bg-amber-300 transition-all duration-300 flex items-center gap-2 text-slate-900 font-semibold text-[12px] uppercase tracking-wider"
            >
              <img src={searchIcon} alt="search" className="size-4" />
              <span className="hidden sm:inline">Search</span>
            </motion.button>
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.ul
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                className="absolute left-0 right-0 mt-3 bg-[#0a0e1c]/98 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)] z-[100] max-h-[320px] overflow-y-auto"
              >
                {filterProducts.length > 0 ? (
                  filterProducts.slice(0, 8).map((item) => (
                    <li
                      key={item.id}
                      onClick={() => { setSearchText(item.name); setShowDropdown(false); }}
                      className="group px-6 py-3.5 flex justify-between items-center hover:bg-white/[0.04] cursor-pointer transition-all border-b border-white/5 last:border-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                          {item.img && <img src={item.img} alt={item.name} className="size-full object-cover" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-white/30 uppercase tracking-widest">
                            {item.category || "Collection"}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/shop/${item.id}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-amber-400 font-semibold uppercase tracking-wider"
                      >
                        View →
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-8 py-8 text-center">
                    <span className="text-3xl block mb-3">🔍</span>
                    <p className="text-white/40 text-sm">No products found for "{searchText}"</p>
                  </li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Quick category pills below search */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-2 mt-4 justify-center"
          >
            {["Electronics", "Fashion", "Beauty", "Shoes", "Bags", "Phones"].map((cat) => (
              <Link key={cat} to="/shop">
                <motion.span
                  whileHover={{ scale: 1.06, backgroundColor: "rgba(251,191,36,0.15)" }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-block px-4 py-1.5 rounded-full border border-white/10 text-white/50 text-[11px] uppercase tracking-widest cursor-pointer transition-colors hover:text-white hover:border-amber-400/30"
                >
                  {cat}
                </motion.span>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Trust Badges Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative z-10 border-t border-white/5 bg-white/[0.02] backdrop-blur-sm"
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-16 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl flex-shrink-0">{badge.icon}</span>
                <div>
                  <p className="text-white font-semibold text-[13px]">{badge.text}</p>
                  <p className="text-white/35 text-[11px]">{badge.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;