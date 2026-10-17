import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import img1 from "../assets/images/app/01.jpg";
import img2 from "../assets/images/app/02.jpg";

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap";

const serif = "font-['Instrument_Serif',Georgia,serif]";
const sans = "font-['Hanken_Grotesk',system-ui,sans-serif]";
const ease = [0.16, 1, 0.3, 1];

const appFeatures = [
  "Lightning fast checkout",
  "Real-time order tracking",
  "Exclusive app-only deals",
  "Loyalty rewards program",
];

const NAV_ICONS = [
  "M3 11l9-8 9 8v10h-6v-6H9v6H3z",
  "M6 8h12l1 13H5L6 8zM9 8V6a3 3 0 016 0v2",
  "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0",
];

const TILES = [
  "from-[#3b2350] to-[#1a1022]",
  "from-[#4a2a3a] to-[#1f1118]",
  "from-[#2d2a4d] to-[#14122a]",
  "from-[#4d3a2a] to-[#211710]",
];

const AppStore = () => {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_LINK}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_LINK;
    document.head.appendChild(l);
  }, []);

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section
      className={`${sans} relative mx-auto max-w-[1500px] overflow-hidden px-6 py-20 text-[#f3ecf4] md:px-12 lg:py-28`}
    >
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
        {/* ── Left: content ── */}
        <motion.div {...reveal(0)} className="lg:col-span-7">
          <p className="mb-7 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/55">
            <span className="h-px w-10 bg-white/40" />
            Download our app
          </p>

          <h2
            className={`${serif} text-[clamp(2.8rem,6.2vw,5.4rem)] font-normal leading-[0.96] tracking-[-0.025em]`}
          >
            Shop anytime,
            <br />
            <span className="italic text-[#c4a1f5]">anywhere</span>
          </h2>

          <p className="mt-7 max-w-md text-[16px] font-light leading-relaxed text-white/60">
            Get the full AVI Store experience on your phone. Browse 50,000+
            products, track orders in real-time, and get exclusive app-only
            discounts.
          </p>

          {/* Features */}
          <ul className="mt-10 grid max-w-xl grid-cols-1 gap-x-10 sm:grid-cols-2">
            {appFeatures.map((f, i) => (
              <li
                key={f}
                className="flex items-baseline gap-4 border-t border-white/10 py-4"
              >
                <span className="text-[10px] tabular-nums tracking-[0.2em] text-[#d9b55f]">
                  0{i + 1}
                </span>
                <span className="text-[14px] font-light text-white/75">
                  {f}
                </span>
              </li>
            ))}
          </ul>

          {/* Store badges + sign-up */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
            <div className="flex gap-3">
              {[
                { src: img1, alt: "Download on the App Store" },
                { src: img2, alt: "Get it on Google Play" },
              ].map((b) => (
                <a
                  key={b.alt}
                  href="#"
                  className="block overflow-hidden rounded-md outline outline-1 -outline-offset-1 outline-white/15 transition-all duration-500 hover:outline-white/50 focus-visible:outline-2 focus-visible:outline-[#c4a1f5]"
                >
                  <img
                    src={b.src}
                    alt={b.alt}
                    loading="lazy"
                    className="h-12 w-auto object-cover transition-opacity duration-500 hover:opacity-85 md:h-14"
                  />
                </a>
              ))}
            </div>

            <Link
              to="/signup"
              className="group inline-flex items-center gap-3 border-b border-white/25 pb-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-white/80 transition-colors duration-500 hover:border-[#c4a1f5] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a1f5]"
            >
              Sign up for free
              <svg
                viewBox="0 0 24 24"
                className="size-4 transition-transform duration-500 group-hover:translate-x-1.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 12h17M14 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* ── Right: phone ── */}
        <motion.div
          {...reveal(0.15)}
          className="relative flex items-center justify-center lg:col-span-5"
          aria-hidden="true"
        >
          {/* hairline rings instead of a glow */}
          <div className="absolute size-[340px] rounded-full border border-white/[0.07] md:size-[440px]" />
          <div className="absolute size-[250px] rounded-full border border-white/[0.07] md:size-[320px]" />

          <div className="relative aspect-[9/19] w-[230px] overflow-hidden rounded-[2.4rem] border border-white/20 bg-[#0d0910] p-3 shadow-[0_40px_90px_rgba(0,0,0,0.7)] md:w-[270px]">
            <div className="flex h-full flex-col overflow-hidden rounded-[1.8rem] bg-[#130e18]">
              {/* status */}
              <div className="flex items-center justify-between px-4 pt-3 text-[9px] font-medium text-white/70">
                <span>9:41</span>
                <span className="h-1.5 w-4 rounded-[2px] bg-white/50" />
              </div>

              {/* header */}
              <div className="flex items-center justify-between px-4 pb-2 pt-4">
                <p className={`${serif} text-[17px] italic leading-none`}>
                  AVI Store
                </p>
                <svg
                  className="size-3.5 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
                  />
                </svg>
              </div>

              {/* editorial banner */}
              <div className="mx-4 mt-1 border border-white/10 bg-gradient-to-br from-[#3b2350] to-[#150e1d] px-3 py-3.5">
                <p className="text-[7.5px] font-medium uppercase tracking-[0.24em] text-[#d9b55f]">
                  Flash sale
                </p>
                <p className={`${serif} mt-1.5 text-[17px] leading-none`}>
                  Up to <span className="italic text-[#c4a1f5]">50% off</span>
                </p>
              </div>

              {/* product tiles */}
              <div className="mt-3 grid grid-cols-2 gap-2 px-4">
                {TILES.map((t, i) => (
                  <div key={i}>
                    <div className={`aspect-[3/4] bg-gradient-to-b ${t}`} />
                    <div className="mt-1.5 h-[3px] w-3/4 bg-white/20" />
                    <div className="mt-1 h-[3px] w-1/3 bg-[#d9b55f]/50" />
                  </div>
                ))}
              </div>

              {/* bottom nav */}
              <div className="mt-auto flex items-center justify-around border-t border-white/10 py-3">
                {NAV_ICONS.map((d, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    className={`size-[15px] ${i === 0 ? "text-[#c4a1f5]" : "text-white/40"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={d} />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppStore;
