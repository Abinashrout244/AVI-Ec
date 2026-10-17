import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

// Same font link as the hero, so the card looks right on any page (injected once)
const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap";

const serif = "font-['Instrument_Serif',Georgia,serif]";
const sans = "font-['Hanken_Grotesk',system-ui,sans-serif]";

const ease = [0.16, 1, 0.3, 1];

/**
 * Props are unchanged so existing usages keep working:
 *  imgUrl, imgAlt, title, count, accent
 *  `emoji` is still accepted but no longer rendered (editorial look).
 *  New optional: `to` (default "/shop"), `index` (shows 01, 02… label)
 */
const CategoryCard = ({
  imgUrl,
  imgAlt,
  title,
  count,
  accent = "#c4a1f5",
  to = "/shop",
  index,
}) => {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_LINK}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_LINK;
    document.head.appendChild(l);
  }, []);

  return (
    <Link
      to={to}
      className="group block focus-visible:outline-none"
      aria-label={`${title} — ${count}`}
    >
      <motion.article
        whileHover="hover"
        className={`${sans} relative aspect-[3/4] overflow-hidden bg-[#150f1a] outline outline-1 -outline-offset-1 outline-white/10 transition-[outline-color] duration-500 group-hover:outline-white/25 group-focus-visible:outline-2 group-focus-visible:outline-[#c4a1f5] rounded-sm`}
      >
        {/* Photograph: slightly muted, warms up on hover */}
        <motion.img
          src={imgUrl}
          alt={imgAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover saturate-[0.8] contrast-[1.05] transition-[filter] duration-700 group-hover:saturate-100"
          variants={{ hover: { scale: reduce ? 1 : 1.05 } }}
          transition={{ duration: 1.1, ease }}
        />

        {/* Tonal grade + base gradient for type */}
        <div className="absolute inset-0 bg-[#1a0f22]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0910] via-[#0d0910]/30 to-transparent" />

        {/* Top row: index + count */}
        <div className="absolute inset-x-5 top-5 flex items-start justify-between text-[10px] font-medium uppercase tracking-[0.22em] text-white/70">
          <span className="tabular-nums">
            {index !== undefined ? String(index + 1).padStart(2, "0") : ""}
          </span>
          <span className="text-white/55">{count}</span>
        </div>

        {/* Bottom: title, rule, arrow */}
        <div className="absolute inset-x-5 bottom-5">
          <div className="flex items-end justify-between gap-4">
            <h3
              className={`${serif} text-[1.9rem] italic leading-none text-white md:text-[2.2rem]`}
            >
              {title}
            </h3>
            <svg
              viewBox="0 0 24 24"
              className="mb-1 size-5 shrink-0 -translate-x-2 text-white/0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 12h17M14 6l6 6-6 6" />
            </svg>
          </div>

          {/* Hairline that draws in on hover, tinted by the accent prop */}
          <div className="mt-4 h-px w-full bg-white/15">
            <span
              className="block h-px w-8 transition-all duration-700 ease-out group-hover:w-full"
              style={{ backgroundColor: accent }}
            />
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default CategoryCard;
