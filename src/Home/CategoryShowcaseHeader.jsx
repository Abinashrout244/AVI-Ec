import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap";

const sans = "font-['Hanken_Grotesk',system-ui,sans-serif]";

const FILTERS = ["All", "Shoes", "Bags", "Phones", "Beauty"];

const CategoryShowcaseHeader = ({ filterItem, active }) => {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_LINK}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_LINK;
    document.head.appendChild(l);
  }, []);

  return (
    <nav
      aria-label="Filter products by category"
      className={`${sans} -mx-6 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden`}
    >
      {/* hairline under the whole row; active tab draws a lavender line over it */}
      <ul className="mx-auto flex w-max min-w-full items-center justify-start gap-8 border-b border-white/10 md:w-full md:justify-center md:gap-12">
        {FILTERS.map((label) => {
          const on = active === label;
          return (
            <li key={label} className="shrink-0">
              <button
                type="button"
                onClick={() => filterItem(label)}
                aria-pressed={on}
                className={`relative block py-4 text-[11px] font-medium uppercase tracking-[0.26em] transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4a1f5] md:text-[12px] ${
                  on ? "text-white" : "text-white/45 hover:text-white/80"
                }`}
              >
                {label}
                {on && (
                  <motion.span
                    layoutId="filter-underline"
                    className="absolute -bottom-px left-0 right-0 h-px bg-[#c4a1f5]"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", bounce: 0.15, duration: 0.6 }
                    }
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoryShowcaseHeader;
