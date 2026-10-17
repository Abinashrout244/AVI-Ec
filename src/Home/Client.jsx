import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap";

const serif = "font-['Instrument_Serif',Georgia,serif]";
const sans = "font-['Hanken_Grotesk',system-ui,sans-serif]";
const ease = [0.16, 1, 0.3, 1];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Fashion Blogger · Mumbai",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "AVI Store completely changed how I shop online. The curation is incredible — every product feels thoughtfully selected. Delivery was same-day!",
    rating: 5,
    purchase: "Aesthetic Tote Bag",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Tech Enthusiast · Bangalore",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Got my Samsung S25 Ultra in 18 hours. The packaging was premium and the price was unbeatable. Already told all my friends about this store.",
    rating: 5,
    purchase: "Samsung S25 Ultra",
  },
  {
    id: 3,
    name: "Ananya Singh",
    role: "Beauty Creator · Delhi",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "The beauty section is a dream. Authentic products, fast delivery, and the return process was so easy when one item didn't work for me.",
    rating: 5,
    purchase: "Glow Serum Kit",
  },
  {
    id: 4,
    name: "Kiran Patel",
    role: "Entrepreneur · Ahmedabad",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    quote:
      "I became a merchant partner and my sales tripled in 3 months. The seller tools and analytics are top-notch. Best decision ever.",
    rating: 5,
    purchase: "Merchant Partner",
  },
];

const STATS = [
  ["60,000+", "Verified reviews"],
  ["4.9 / 5", "Average rating"],
  ["98%", "Would recommend"],
];

const pad = (n) => String(n).padStart(2, "0");

const Stars = ({ count }) => (
  <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <svg
        key={i}
        className="size-3.5 fill-[#d9b55f]"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const Arrow = ({ flip }) => (
  <svg
    viewBox="0 0 24 24"
    className={`size-4 ${flip ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 12h17M14 6l6 6-6 6" />
  </svg>
);

const Client = () => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const t = testimonials[active];
  const total = testimonials.length;
  const go = (n) => setActive((n + total) % total);

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
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section
      className={`${sans} mx-auto max-w-[1500px] px-6 py-20 text-[#f3ecf4] md:px-12 lg:py-28`}
    >
      {/* Header */}
      <motion.div {...reveal(0)} className="mb-14 max-w-2xl lg:mb-20">
        <p className="mb-6 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/55">
          <span className="h-px w-10 bg-white/40" />
          Customer stories
        </p>
        <h2
          className={`${serif} text-[clamp(2.6rem,6vw,5rem)] font-normal leading-[0.98] tracking-[-0.025em]`}
        >
          Loved by <span className="italic text-[#c4a1f5]">60,000+</span>
          <br />
          customers
        </h2>
        <p className="mt-5 text-[14px] font-light text-white/50">
          Real stories from real shoppers across India.
        </p>
      </motion.div>

      {/* Featured quote + selector */}
      <motion.div
        {...reveal(0.1)}
        className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
      >
        {/* Quote */}
        <div className="flex flex-col lg:col-span-8">
          <div className="relative min-h-[16rem] sm:min-h-[15rem] lg:min-h-[17rem]">
            <span
              aria-hidden="true"
              className={`${serif} pointer-events-none absolute -left-1 -top-6 select-none text-[6rem] leading-none text-[#c4a1f5]/30 sm:-top-8 sm:text-[8rem]`}
            >
              “
            </span>
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease }}
                className="relative pt-8"
              >
                <Stars count={t.rating} />
                <blockquote
                  className={`${serif} mt-6 text-[clamp(1.6rem,3.1vw,2.6rem)] font-normal leading-[1.18] tracking-[-0.01em] text-white/95`}
                >
                  {t.quote}
                </blockquote>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Author + controls */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4"
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  width="48"
                  height="48"
                  className="size-12 rounded-full object-cover grayscale-[0.4]"
                />
                <div>
                  <p className="text-[14px] font-medium text-white">{t.name}</p>
                  <p className="mt-0.5 text-[12px] font-light text-white/50">
                    {t.role}
                  </p>
                  <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#d9b55f]">
                    Purchased · {t.purchase}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-5">
              <span className="text-[11px] tabular-nums tracking-[0.2em] text-white/45">
                {pad(active + 1)} / {pad(total)}
              </span>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => go(active - 1)}
                  aria-label="Previous story"
                  className="flex size-11 items-center justify-center border border-white/20 text-white/70 transition-colors duration-500 hover:border-[#c4a1f5] hover:text-[#c4a1f5]"
                >
                  <Arrow flip />
                </button>
                <button
                  type="button"
                  onClick={() => go(active + 1)}
                  aria-label="Next story"
                  className="-ml-px flex size-11 items-center justify-center border border-white/20 text-white/70 transition-colors duration-500 hover:border-[#c4a1f5] hover:text-[#c4a1f5]"
                >
                  <Arrow />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selector list */}
        <ul className="lg:col-span-4 lg:pl-8" aria-label="Choose a story">
          {testimonials.map((item, i) => {
            const on = i === active;
            return (
              <li
                key={item.id}
                className="border-b border-white/10 first:border-t"
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={on}
                  className="group flex w-full items-baseline gap-5 py-5 text-left"
                >
                  <span
                    className={`text-[10px] tabular-nums tracking-[0.2em] transition-colors duration-500 ${
                      on ? "text-[#c4a1f5]" : "text-white/30"
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`${serif} block text-[1.6rem] italic leading-none transition-colors duration-500 ${
                        on
                          ? "text-white"
                          : "text-white/45 group-hover:text-white/80"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="mt-2 block text-[11px] font-light tracking-wide text-white/40">
                      {item.role}
                    </span>
                  </span>
                  <span
                    className={`h-px bg-[#c4a1f5] transition-all duration-700 ${on ? "w-8" : "w-0"}`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </motion.div>

      {/* Stats */}
      <motion.dl
        {...reveal(0.1)}
        className="mt-20 grid grid-cols-3 border-y border-white/10 lg:mt-28"
      >
        {STATS.map(([num, label], i) => (
          <div
            key={label}
            className={`px-2 py-8 text-center sm:py-10 ${i > 0 ? "border-l border-white/10" : ""}`}
          >
            <dd
              className={`${serif} text-[clamp(1.6rem,4vw,3.4rem)] leading-none tracking-[-0.02em]`}
            >
              {num}
            </dd>
            <dt className="mt-3 text-[9px] font-medium uppercase tracking-[0.22em] text-white/45 sm:text-[10px] sm:tracking-[0.26em]">
              {label}
            </dt>
          </div>
        ))}
      </motion.dl>
    </section>
  );
};

export default Client;
