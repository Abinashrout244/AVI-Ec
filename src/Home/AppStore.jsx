import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import img1 from "../assets/images/app/01.jpg";
import img2 from "../assets/images/app/02.jpg";

const appFeatures = [
  { icon: "⚡", text: "Lightning fast checkout" },
  { icon: "🔔", text: "Real-time order tracking" },
  { icon: "💰", text: "Exclusive app-only deals" },
  { icon: "🎁", text: "Loyalty rewards program" },
];

const AppStore = () => {
  return (
    <section className="relative py-20 px-2 md:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-7"
        >
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-violet-400/30 text-violet-400 text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-violet-400/10 transition-all"
            >
              <span className="size-2 rounded-full bg-violet-400 animate-pulse" />
              Sign up for free →
            </motion.button>
          </Link>

          <div>
            <p className="text-amber-400 text-[11px] uppercase tracking-[0.4em] font-semibold mb-3">
              — Download Our App
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              Shop Anytime,{" "}
              <span className="italic text-white/40 font-light">Anywhere</span>
            </h2>
          </div>

          <p className="text-white/50 text-base leading-relaxed max-w-md">
            Get the full AVI Store experience on your phone. Browse 50,000+ products, 
            track orders in real-time, and get exclusive app-only discounts.
          </p>

          {/* Feature list */}
          <div className="grid grid-cols-2 gap-3">
            {appFeatures.map((f, i) => (
              <motion.div
                key={f.text}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-2.5"
              >
                <span className="text-base flex-shrink-0">{f.icon}</span>
                <span className="text-white/60 text-[13px]">{f.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Store badges */}
          <div className="flex gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="block"
            >
              <img src={img1} alt="App Store" className="h-14 md:h-16 rounded-xl object-cover shadow-lg" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="block"
            >
              <img src={img2} alt="Play Store" className="h-14 md:h-16 rounded-xl object-cover shadow-lg" />
            </motion.a>
          </div>
        </motion.div>

        {/* Right: Phone mockup visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center items-center relative"
        >
          <div className="relative">
            {/* Phone frame */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[240px] md:w-[280px] aspect-[9/19] rounded-[40px] overflow-hidden border-4 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
              style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)" }}
            >
              {/* Screen content mockup */}
              <div className="absolute inset-0 bg-gradient-to-b from-violet-900/30 to-purple-900/20" />
              <div className="absolute inset-0 flex flex-col p-4 gap-3 overflow-hidden">
                {/* Status bar */}
                <div className="flex justify-between items-center">
                  <span className="text-white text-[9px] font-medium">9:41</span>
                  <div className="flex gap-1.5 items-center">
                    <div className="w-4 h-2 rounded-sm bg-white/60" />
                    <div className="size-2 rounded-full bg-white/60" />
                  </div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mt-1">
                  <p className="text-white text-[11px] font-semibold">AVI Store</p>
                  <div className="size-6 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="size-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                    </svg>
                  </div>
                </div>

                {/* Banner mockup */}
                <div className="rounded-2xl bg-gradient-to-r from-amber-500/30 to-rose-500/20 p-3 border border-white/10">
                  <p className="text-[9px] text-amber-400 uppercase tracking-wider font-bold">Flash Sale</p>
                  <p className="text-white text-[11px] font-semibold mt-0.5">Up to 50% OFF</p>
                </div>

                {/* Product grid mockup */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {["#1e1b4b", "#0f2b1b", "#2a0a0a", "#0f1e2b"].map((bg, i) => (
                    <div key={i} className="rounded-xl aspect-square" style={{ background: bg, border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="w-full h-full rounded-xl flex items-end p-2">
                        <div className="w-full">
                          <div className="h-1.5 rounded-full bg-white/20 w-3/4 mb-1" />
                          <div className="h-1 rounded-full bg-amber-400/40 w-1/2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom nav bar mockup */}
                <div className="mt-auto flex justify-around items-center pt-2 border-t border-white/5">
                  {["🏠", "🛍️", "❤️", "👤"].map((icon, i) => (
                    <span key={i} className={`text-sm ${i === 0 ? "" : "opacity-40"}`}>{icon}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating pills */}
            <motion.div
              animate={{ x: [0, 6, 0], y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-4 -right-10 glass-panel rounded-2xl px-3.5 py-2.5 flex items-center gap-2 shadow-xl border border-white/10"
            >
              <span className="text-base">📦</span>
              <div>
                <p className="text-white text-[10px] font-semibold">Order Shipped!</p>
                <p className="text-white/40 text-[9px]">Just now</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ x: [0, -6, 0], y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-4 -left-10 glass-panel rounded-2xl px-3.5 py-2.5 flex items-center gap-2 shadow-xl border border-white/10"
            >
              <span className="text-base">⭐</span>
              <div>
                <p className="text-white text-[10px] font-semibold">5-star Review</p>
                <p className="text-white/40 text-[9px]">From Kiran D.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppStore;
