import React, { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import img1 from "../assets/images/about/01.jpg";
import img2 from "../assets/images/about/02.jpg";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Truck, Sparkles, ArrowRight } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// ── Data ──────────────────────────────────────────────────────────────────────
const stats = [
  { num: 60000, suffix: "+", label: "Happy Customers", icon: "😊" },
  { num: 500, suffix: "+", label: "Partner Brands", icon: "🏷️" },
  { num: 3, suffix: "M+", label: "Orders Delivered", icon: "📦" },
  { num: 4.9, suffix: "", label: "Average Rating", icon: "⭐", decimals: 1 },
];

const values = [
  {
    icon: "✦",
    title: "Curated Quality",
    desc: "Every product passes through a strict quality check before listing. We partner only with verified brands.",
    color: "#c4a882",
  },
  {
    icon: "✦",
    title: "Customer First",
    desc: "Your satisfaction drives every decision we make — from shipping speed to return ease.",
    color: "#7dd3fc",
  },
  {
    icon: "✦",
    title: "Transparent Pricing",
    desc: "No hidden fees, no surprise charges. The price you see is the price you pay.",
    color: "#86efac",
  },
  {
    icon: "✦",
    title: "Fast Delivery",
    desc: "Same-day delivery in major cities and express shipping nationwide — because time matters.",
    color: "#f0abfc",
  },
];

const team = [
  {
    name: "Aryan Verma",
    role: "Founder & CEO",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "We built AVI Store to make premium products accessible to everyone.",
  },
  {
    name: "Sneha Patel",
    role: "Head of Curation",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Each collection is hand-picked to tell a story of quality and style.",
  },
  {
    name: "Rohit Das",
    role: "Chief of Logistics",
    img: "https://randomuser.me/api/portraits/men/61.jpg",
    quote: "Getting your order to you fast and safely is my personal mission.",
  },
];

const timeline = [
  { year: "2021", event: "AVI Store founded in Bangalore with 50 products." },
  { year: "2022", event: "Crossed 10,000 customers and launched mobile app." },
  { year: "2023", event: "Expanded to 500+ brands and 3 fulfilment centres." },
  { year: "2024", event: "3M+ orders delivered — India's fastest growing store." },
  { year: "2025", event: "Launching international shipping & loyalty program." },
];

// ── Reusable section header ───────────────────────────────────────────────────
const SectionHeader = ({ tag, title, sub, accentColor = "#c4a882" }) => (
  <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
    <p className="text-[11px] uppercase tracking-[0.4em] font-semibold" style={{ color: accentColor }}>
      — {tag}
    </p>
    <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">{title}</h2>
    {sub && <p className="text-white/40 text-sm leading-relaxed">{sub}</p>}
  </div>
);

// ── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ stat, i }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-panel rounded-2xl p-7 flex flex-col items-center gap-3 text-center relative overflow-hidden group"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(196,168,130,0.06), transparent 70%)" }}
      />
      <span className="text-3xl">{stat.icon}</span>
      <p className="font-serif text-4xl md:text-5xl text-white font-bold">
        {inView ? (
          <CountUp
            end={stat.num}
            duration={2.2}
            decimals={stat.decimals || 0}
            suffix={stat.suffix}
          />
        ) : `0${stat.suffix}`}
      </p>
      <p className="text-white/40 text-[12px] uppercase tracking-widest">{stat.label}</p>
    </motion.div>
  );
};

// ── MAIN ─────────────────────────────────────────────────────────────────────
const About = () => {
  const [activeTab, setActiveTab] = useState("story");
const ABOUT_IMAGES = {
  // Main showcase: High-end curated boutique space
  primary: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  // Secondary overlay: Minimalist artisan luxury watch / accessories packaging
  secondary: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
};

const TAB_DATA = {
  story: "Founded in 2021 by a team of design and retail specialists, AVI Store evolved from an exclusive micro-boutique into India's fastest-growing destination for authentic lifestyle goods, delivering to more than 3 million households nationwide.",
  mission: "Our mission is to democratize fine craftsmanship—combining certified authenticity, transparent direct-to-consumer pricing, and lightning-fast fulfillment so you never have to settle for compromises.",
  vision: "We envision a connected marketplace where discovering the world's most innovative fashion, beauty, and tech essentials is effortless, backed by relentless attention to detail and customer care."
};
  return (
    <div className="min-h-screen">
      <HeroBanner title="About AVI Store" page="About" />

      {/* ── INTRO SECTION ── */}
     <section className="relative max-w-screen-2xl mx-auto px-6 md:px-16 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center overflow-hidden">
      
      {/* ── Left: Interactive Image Collage ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-6 relative pb-10 sm:pb-12"
      >
        {/* Ambient lighting glow underneath images */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Primary Flagship Image Container */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.8)] bg-slate-900 group">
          <img
            src={ABOUT_IMAGES.primary}
            alt="AVI Store Interior & Flagship Curation"
            className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03050c]/80 via-transparent to-black/20 pointer-events-none" />
          
          {/* Subtle watermark / accreditation */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-amber-300 uppercase tracking-widest">
            <Sparkles size={11} className="text-amber-400" />
            Curated Showroom
          </div>
        </div>

        {/* Overlapping Secondary Focus Image */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 right-0 sm:-right-6 md:-right-8 w-1/2 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-2 border-amber-400/30 bg-slate-900"
        >
          <img
            src={ABOUT_IMAGES.secondary}
            alt="AVI Precision Product Selection"
            className="w-full object-cover aspect-square hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03050c]/50 to-transparent pointer-events-none" />
        </motion.div>

        {/* Floating Stat Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, type: "spring", bounce: 0.35 }}
          className="absolute -bottom-6 left-0 sm:-left-4 md:-left-6 backdrop-blur-2xl bg-[#070b14]/90 rounded-2xl px-5 py-4 border border-amber-400/30 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center gap-4 z-20"
        >
          <div className="text-center pr-3 border-r border-white/10">
            <p className="font-serif text-3xl md:text-4xl text-amber-400 font-black leading-none">4+</p>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-1">Years</p>
          </div>
          <div className="text-left text-xs leading-tight">
            <p className="font-bold text-white tracking-wide">Excellence</p>
            <p className="text-slate-400 text-[11px] mt-0.5">3M+ Packages Sent</p>
          </div>
        </motion.div>

        {/* Accent Geometric Brackets */}
        <div className="absolute -top-3 -left-3 size-10 border-t-2 border-l-2 border-amber-400/40 rounded-tl-xl pointer-events-none" />
        <div className="absolute -bottom-3 -right-3 size-10 border-b-2 border-r-2 border-amber-400/25 rounded-br-xl pointer-events-none" />
      </motion.div>

      {/* ── Right: Narrative & Mission ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-6 flex flex-col gap-7"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-bold uppercase tracking-[0.25em] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Our Brand Heritage
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15] font-normal tracking-tight">
            Premium Shopping,{" "}
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
              Redefined.
            </span>
          </h2>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          AVI Store was born from a singular proposition: exceptional design, uncompromising authenticity, and seamless service shouldn’t belong solely to luxury gatekeepers. We partner with over 500 hand-selected makers across fashion, electronics, and home decor—delivering flagship quality directly to your doorstep.
        </p>

        {/* Trust Points Mini-Grid */}
        <div className="grid grid-cols-2 gap-3 py-1">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
              <ShieldCheck size={18} />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white">Direct Source</p>
              <p className="text-slate-400 text-[11px]">Zero Middlemen</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
              <Truck size={18} />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white">Priority Dispatch</p>
              <p className="text-slate-400 text-[11px]">Across 28 States</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/10 w-fit backdrop-blur-md">
          {["story", "mission", "vision"].map((tab) => {
            const isCurrent = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2 rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-200 ${
                  isCurrent ? "text-slate-950" : "text-slate-400 hover:text-white"
                }`}
              >
                {isCurrent && (
                  <motion.span
                    layoutId="about-active-tab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.35)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Body */}
        <div className="min-h-[80px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-slate-400 text-xs sm:text-sm leading-relaxed border-l-2 border-amber-400/40 pl-4"
            >
              {TAB_DATA[activeTab]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <div>
          <Link to="/shop" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-[0.2em] text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-[0_10px_25px_rgba(251,191,36,0.35)] hover:shadow-[0_15px_35px_rgba(251,191,36,0.5)] transition-shadow"
            >
              <span>Explore Collection</span>
              <ArrowRight size={15} />
            </motion.button>
          </Link>
        </div>
      </motion.div>

    </section>

      {/* ── STATS ── */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => <StatCard key={stat.label} stat={stat} i={i} />)}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-16 py-24">
        <SectionHeader
          tag="Our Principles"
          title="What We Stand For"
          sub="Every decision at AVI Store is guided by these four core values"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-panel rounded-2xl p-7 flex flex-col gap-5 group relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, rgba(${v.color.replace("#", "").match(/.{2}/g).map(hex => parseInt(hex, 16)).join(",")},0.07), transparent 70%)` }}
              />
              <span
                className="text-xl font-bold"
                style={{ color: v.color }}
              >
                {v.icon}
              </span>
              <div>
                <h3
                  className="font-semibold text-lg text-white mb-2"
                >
                  {v.title}
                </h3>
                <p className="text-white/45 text-[13px] leading-relaxed">{v.desc}</p>
              </div>
              <motion.div
                className="h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ backgroundColor: v.color, opacity: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-16 py-24">
        <SectionHeader
          tag="Our Journey"
          title="Built Year by Year"
          accentColor="#7dd3fc"
        />
        <div className="relative mt-16 max-w-3xl mx-auto">
          {/* vertical line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-white/5" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex items-center gap-6 mb-10 ${i % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""}`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 size-3 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)] z-10 flex-shrink-0" />

              {/* Content */}
              <div className={`ml-14 md:ml-0 md:w-[45%] glass-panel rounded-2xl p-5 ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                <span className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.3em]">{item.year}</span>
                <p className="text-white/60 text-[13px] leading-relaxed mt-1">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-16 py-24">
        <SectionHeader
          tag="Meet The Team"
          title="People Behind AVI Store"
          sub="Passionate, driven, and customer-obsessed"
          accentColor="#f0abfc"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="glass-panel rounded-3xl p-8 flex flex-col items-center gap-5 text-center group"
            >
              <div className="relative">
                <div className="size-20 rounded-full overflow-hidden ring-4 ring-amber-400/15 group-hover:ring-amber-400/35 transition-all duration-500">
                  <img src={member.img} alt={member.name} className="size-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-amber-400 border-2 border-[#03050c]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                <p className="text-amber-400/70 text-[11px] uppercase tracking-[0.25em] mt-1">{member.role}</p>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed italic">"{member.quote}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl px-8 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            background: "linear-gradient(135deg, rgba(196,168,130,0.12) 0%, rgba(12,16,28,0.8) 100%)",
            border: "1px solid rgba(196,168,130,0.2)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(196,168,130,0.08), transparent)" }}
          />
          <div className="relative">
            <p className="text-amber-400 text-[11px] uppercase tracking-[0.4em] font-semibold mb-2">Join Us</p>
            <h3 className="font-serif text-3xl md:text-4xl text-white">Ready to experience <span className="italic text-white/40">AVI Store?</span></h3>
          </div>
          <div className="flex gap-4 relative flex-shrink-0">
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-full font-bold text-[12px] uppercase tracking-[0.2em] text-[#0a0c10]"
                style={{ background: "linear-gradient(135deg, #c4a882, #f8d77b)", boxShadow: "0 12px 30px rgba(196,168,130,0.35)" }}
              >
                Shop Now →
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-full border border-white/15 text-white/60 font-semibold text-[12px] uppercase tracking-[0.2em] hover:text-white hover:border-white/35 transition-all"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
