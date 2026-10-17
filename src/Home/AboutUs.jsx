import React, { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap";

const serif = "font-['Instrument_Serif',Georgia,serif]";
const sans = "font-['Hanken_Grotesk',system-ui,sans-serif]";
const ease = [0.16, 1, 0.3, 1];

const stats = [
  { count: 12600, suffix: "+", label: "Merchants enrolled" },
  { count: 30, suffix: "+", label: "Training programs" },
  { count: 100, suffix: "+", label: "Rewards & gift cards" },
  { count: 60000, suffix: "+", label: "Happy customers" },
];

const features = [
  {
    title: "Lightning fast",
    desc: "Same-day delivery across 300+ cities in India.",
  },
  { title: "Premium brands", desc: "500+ top brands, curated for you." },
  { title: "Secure shopping", desc: "Bank-grade 256-bit SSL encryption." },
  {
    title: "Hassle-free returns",
    desc: "7-day, no-questions-asked return policy.",
  },
];

const Arrow = () => (
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
);

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
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
      className={`${sans} mx-auto flex max-w-[1500px] flex-col gap-20 px-6 py-20 text-[#f3ecf4] md:px-12 lg:gap-32 lg:py-28`}
    >
      {/* ── Stats ── */}
      <motion.div
        {...reveal(0)}
        ref={ref}
        className="grid grid-cols-2 border-y border-white/10 md:grid-cols-4"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-5 py-9 sm:px-8 sm:py-12 md:border-l ${
              i % 2 === 1 ? "border-l" : ""
            } ${i >= 2 ? "border-t md:border-t-0" : ""} ${i === 0 ? "md:border-l-0" : ""} border-white/10`}
          >
            <p
              className={`${serif} text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-[-0.02em]`}
            >
              {isInView ? (
                <CountUp end={s.count} duration={2.5} separator="," />
              ) : (
                "0"
              )}
              <span className="italic text-[#c4a1f5]">{s.suffix}</span>
            </p>
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.24em] text-white/45 sm:text-[11px]">
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* ── Why choose us ── */}
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Text */}
        <motion.div {...reveal(0)} className="lg:col-span-7">
          <p className="mb-7 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/55">
            <span className="h-px w-10 bg-white/40" />
            Why choose us
          </p>

          <h2
            className={`${serif} text-[clamp(2.8rem,6vw,5.2rem)] font-normal leading-[0.96] tracking-[-0.025em]`}
          >
            Become a <span className="italic text-[#c4a1f5]">merchant</span>
            <br />
            partner today
          </h2>

          <p className="mt-7 max-w-md text-[16px] font-light leading-relaxed text-white/60">
            Join India's fastest growing e-commerce marketplace. Get access to
            millions of customers, powerful seller tools, and dedicated support
            to grow your business.
          </p>

          {/* Features */}
          <ul className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {features.map((f, i) => (
              <li key={f.title} className="border-t border-white/10 py-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-[10px] tabular-nums tracking-[0.2em] text-[#d9b55f]">
                    0{i + 1}
                  </span>
                  <div>
                    <h3
                      className={`${serif} text-[1.7rem] italic leading-none text-white`}
                    >
                      {f.title}
                    </h3>
                    <p className="mt-3 max-w-[16rem] text-[13px] font-light leading-relaxed text-white/50">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Link
              to="/signup"
              className="group inline-flex items-center gap-3 border border-[#d9b55f] bg-[#d9b55f] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0d0910] transition-colors duration-500 hover:bg-transparent hover:text-[#d9b55f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a1f5]"
            >
              Apply as merchant
              <Arrow />
            </Link>
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 border-b border-white/25 pb-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-white/80 transition-colors duration-500 hover:border-[#c4a1f5] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a1f5]"
            >
              Learn more
              <Arrow />
            </Link>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div {...reveal(0.15)} className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1420]">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=80"
              alt="Customer paying at a store counter"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover saturate-[0.8] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-[#1a0f22]/25 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0910]/70 via-transparent to-transparent" />
          </div>

          {/* Quiet caption instead of floating cards */}
          <dl className="mt-5 grid grid-cols-2 border-b border-white/10 pb-5">
            <div>
              <dd className={`${serif} text-[1.9rem] leading-none`}>10M+</dd>
              <dt className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">
                Orders delivered last year
              </dt>
            </div>
            <div className="border-l border-white/10 pl-6">
              <dd className={`${serif} text-[1.9rem] leading-none`}>
                4.9<span className="text-white/40"> / 5</span>
              </dd>
              <dt className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">
                Average rating
              </dt>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
