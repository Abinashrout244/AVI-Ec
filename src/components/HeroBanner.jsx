import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import bgimg from "../assets/images/bg-img/01.jpg";
import { motion } from "framer-motion";

// Per-page config for unique accent colors & subtext
const pageConfig = {
  Shop: {
    accent: "#c4a882",
    accentRgb: "196,168,130",
    glow: "#92400e",
    sub: "Discover thousands of curated products",
    tag: "Premium Collection",
  },
  Blog: {
    accent: "#7dd3fc",
    accentRgb: "125,211,252",
    glow: "#0369a1",
    sub: "Stories, guides & inspiration",
    tag: "From Our Journal",
  },
  About: {
    accent: "#86efac",
    accentRgb: "134,239,172",
    glow: "#166534",
    sub: "Crafted with passion since 2021",
    tag: "Our Story",
  },
  Contact: {
    accent: "#f0abfc",
    accentRgb: "240,171,252",
    glow: "#86198f",
    sub: "We'd love to hear from you",
    tag: "Get in Touch",
  },
  "Like Page": {
    accent: "#fda4af",
    accentRgb: "253,164,175",
    glow: "#be123c",
    sub: "Your saved favorites in one place",
    tag: "Wishlist",
  },
  "Contact Us": {
    accent: "#f0abfc",
    accentRgb: "240,171,252",
    glow: "#86198f",
    sub: "We'd love to hear from you",
    tag: "Get in Touch",
  },
  Default: {
    accent: "#fbbf24",
    accentRgb: "251,191,36",
    glow: "#92400e",
    sub: "Welcome to AVI Store",
    tag: "AVI Store",
  },
};

// Letter-by-letter stagger reveal
const LetterReveal = ({ text, accent }) => {
  const letters = text.split("");
  return (
    <span>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={char === " " ? { marginRight: "0.3em" } : {}}
          initial={{ y: "100%", opacity: 0, rotateX: -40 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.55,
            delay: 0.3 + i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === " " ? "\u00A0" : (
            <span style={accent && i > 4 ? { color: accent, fontStyle: "italic" } : {}}>
              {char}
            </span>
          )}
        </motion.span>
      ))}
    </span>
  );
};

const HeroBanner = ({ title, page }) => {
  const cfg = pageConfig[page] || pageConfig.Default;
  const canvasRef = useRef(null);

  // Animated particles on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -(Math.random() * 0.4 + 0.2),
      opacity: Math.random() * 0.5 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const [r, g, b] = cfg.accentRgb.split(",");
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [cfg.accentRgb]);

  return (
    <section className="relative h-[52vh] md:h-[58vh] flex items-center justify-center overflow-hidden bg-[#03050c]">

      {/* ── Background image (Ken Burns subtle zoom) ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <img
          src={bgimg}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.14 }}
        />
      </motion.div>

      {/* ── Layered grade overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03050c]/80 via-transparent to-[#03050c]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#03050c]/70 via-[#03050c]/20 to-transparent" />

      {/* ── Accent color atmosphere ── */}
      <motion.div
        animate={{ opacity: [0.06, 0.10, 0.06], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 60% 50%, rgba(${cfg.accentRgb},1), transparent)`,
        }}
      />

      {/* ── Animated floating particles canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* ── Grain texture ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Drifting gradient orb top-right ── */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${cfg.glow}25, transparent 70%)`,
        }}
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${cfg.glow}18, transparent 70%)`,
        }}
      />

      {/* ── Decorative horizontal lines ── */}
      <div className="absolute left-0 right-0 top-1/3 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent 0%, rgba(${cfg.accentRgb},0.08) 30%, rgba(${cfg.accentRgb},0.08) 70%, transparent 100%)` }}
      />
      <div className="absolute left-0 right-0 bottom-1/3 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.04) 70%, transparent 100%)` }}
      />

      {/* ── Vertical accent lines (sides) ── */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-8 md:left-16 top-1/4 bottom-1/4 w-px origin-top pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, rgba(${cfg.accentRgb},0.25), transparent)` }}
      />
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-8 md:right-16 top-1/4 bottom-1/4 w-px origin-bottom pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, rgba(${cfg.accentRgb},0.15), transparent)` }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 text-center flex flex-col items-center gap-6 px-6">

        {/* ── Tag pill ── */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, type: "spring", bounce: 0.35 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full backdrop-blur-xl border"
          style={{
            backgroundColor: `rgba(${cfg.accentRgb}, 0.08)`,
            borderColor: `rgba(${cfg.accentRgb}, 0.25)`,
            boxShadow: `0 0 30px rgba(${cfg.accentRgb}, 0.12)`,
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="size-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: cfg.accent }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.35em] font-bold"
            style={{ color: cfg.accent }}
          >
            {cfg.tag}
          </span>
          <span
            className="w-px h-3 flex-shrink-0"
            style={{ backgroundColor: `rgba(${cfg.accentRgb}, 0.3)` }}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-medium">
            AVI Store
          </span>
        </motion.div>

        {/* ── Page Title ── */}
        <div className="overflow-hidden" style={{ perspective: "800px" }}>
          <h1 className="font-serif text-[clamp(2.8rem,8vw,5.5rem)] text-white leading-[1.05] tracking-tight">
            <LetterReveal text={title} accent={cfg.accent} />
          </h1>
        </div>

        {/* ── Sub text ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-[13px] font-light tracking-[0.12em] max-w-xs"
          style={{ color: `rgba(${cfg.accentRgb}, 0.55)` }}
        >
          {cfg.sub}
        </motion.p>

        {/* ── Breadcrumb ── */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex items-center gap-2.5 mt-1"
        >
          <Link
            to="/"
            className="text-[11px] uppercase tracking-[0.25em] text-white/30 hover:text-white transition-colors duration-300"
          >
            Home
          </Link>

          {/* Animated separator */}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 1.0 }}
            className="inline-block h-px w-6 origin-left"
            style={{ backgroundColor: `rgba(${cfg.accentRgb}, 0.4)` }}
          />

          <span
            className="text-[11px] uppercase tracking-[0.25em] font-semibold"
            style={{ color: cfg.accent }}
          >
            {page}
          </span>
        </motion.nav>

        {/* ── Decorative bottom accent line ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-32 mt-1 origin-center"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${cfg.accentRgb},0.5), transparent)`,
          }}
        />
      </div>

      {/* ── Bottom edge gradient fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, #03050c, transparent)" }}
      />

      {/* ── Corner accents ── */}
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
          className={`absolute ${pos} w-8 h-8 pointer-events-none`}
          style={{
            borderTop: i < 2 ? `1px solid rgba(${cfg.accentRgb},0.18)` : "none",
            borderBottom: i >= 2 ? `1px solid rgba(${cfg.accentRgb},0.18)` : "none",
            borderLeft: i % 2 === 0 ? `1px solid rgba(${cfg.accentRgb},0.18)` : "none",
            borderRight: i % 2 === 1 ? `1px solid rgba(${cfg.accentRgb},0.18)` : "none",
          }}
        />
      ))}
    </section>
  );
};

export default HeroBanner;
