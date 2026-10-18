import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shirt, 
  ShoppingBag, 
  Footprints, 
  Watch, 
  Glasses, 
  Sparkles 
} from "lucide-react";

const RETAIL_ICONS = [
  { id: "shirt", Component: Shirt, label: "Apparel" },
  { id: "bag", Component: ShoppingBag, label: "Accessories" },
  { id: "shoes", Component: Footprints, label: "Footwear" },
  { id: "watch", Component: Watch, label: "Watches" },
  { id: "glasses", Component: Glasses, label: "Eyewear" },
];

export default function AjioLoader({ 
  fullscreen = true, 
  text = "Curating your collection..." 
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % RETAIL_ICONS.length);
    }, 700); // 700ms cadence mirrors Ajio's cycling speed

    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = RETAIL_ICONS[index].Component;

  const content = (
    <div className="flex flex-col items-center justify-center select-none">
      {/* ── Outer Halo & Morphing Icon Ring ── */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
        
        {/* Soft Amber Glow */}
        <div className="absolute inset-0 bg-amber-400/15 rounded-full blur-2xl animate-pulse pointer-events-none" />

        {/* Orbiting Rotating Dashed Ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-amber-400/30 animate-[spin_8s_linear_infinite]" />

        {/* Glass Orb Housing */}
        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#070b14]/90 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(251,191,36,0.08)] backdrop-blur-xl flex items-center justify-center overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={RETAIL_ICONS[index].id}
              initial={{ scale: 0.3, opacity: 0, y: 10, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.3, opacity: 0, y: -10, rotate: 15 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"
            >
              <CurrentIcon size={34} strokeWidth={1.8} />
            </motion.div>
          </AnimatePresence>

          {/* Glint effect */}
          <div className="absolute top-1 right-1">
            <Sparkles size={10} className="text-amber-300/40 animate-ping" />
          </div>
        </div>

        {/* Orbiting Satellite Dot */}
        <div className="absolute inset-0 animate-[spin_3s_linear_infinite] pointer-events-none">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
        </div>
      </div>

      {/* ── Brand Label / Progress Dots ── */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <motion.p
          key={RETAIL_ICONS[index].label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300/90"
        >
          {RETAIL_ICONS[index].label}
        </motion.p>

        <p className="text-xs text-slate-400 font-medium">
          {text}
        </p>

        {/* Small Dot Progress Bar */}
        <div className="flex items-center gap-1.5 mt-1">
          {RETAIL_ICONS.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index 
                  ? "w-4 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" 
                  : "w-1 bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03050c]/90 backdrop-blur-2xl">
        {content}
      </div>
    );
  }

  return (
    <div className="w-full py-16 flex items-center justify-center">
      {content}
    </div>
  );
}