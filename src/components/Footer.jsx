import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=Cormorant+Garamond:wght@300;400&display=swap";

const serif = "font-['Instrument_Serif',Georgia,serif]";
const sans = "font-['Hanken_Grotesk',system-ui,sans-serif]";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { text: "All Products", to: "/shop" },
      { text: "Shoes", to: "/shop" },
      { text: "Beauty", to: "/shop" },
      { text: "Phones", to: "/shop" },
      { text: "Bags", to: "/shop" },
    ],
  },
  {
    title: "Explore",
    links: [
      { text: "Journal", to: "/blog" },
      { text: "About", to: "/about" },
      { text: "FAQs", to: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { text: "Policy", to: "#" },
      { text: "Privacy Policy", to: "#" },
      { text: "Terms of Use", to: "#" },
    ],
  },
];

const CONTACT = [
  { text: "Bhubaneswar, India", href: "https://maps.google.com" },
  { text: "+91 8123456789", href: "tel:+918249281685" },
  { text: "info@shopcart.com", href: "mailto:info@shopcart.com" },
];

const SOCIAL = [
  { text: "Instagram", href: "#" },
  { text: "Facebook", href: "#" },
  { text: "X", href: "#" },
  { text: "LinkedIn", href: "#" },
];

const linkCls =
  "relative inline-block py-1 text-[14px] font-light text-white/60 transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#c4a1f5] after:transition-transform after:duration-500 hover:text-white hover:after:scale-x-100";

const Heading = ({ children }) => (
  <h3
    className={`${sans} mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-white/40`}
  >
    {children}
  </h3>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_LINK}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_LINK;
    document.head.appendChild(l);
  }, []);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: connect to your newsletter / Supabase table here
    setDone(true);
    setEmail("");
  };

  return (
    <footer
      className={`${sans} relative mt-24 overflow-hidden border-t border-white/10 bg-[#0d0910] text-[#f3ecf4]`}
    >
      <div className="mx-auto max-w-[1500px] px-6 pt-16 md:px-12 lg:pt-24">
        {/* ── Top: newsletter + link columns ── */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Newsletter */}
          <div className="lg:col-span-5">
            <p className="mb-6 flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
              <span className="h-px w-10 bg-white/40" />
              The Journal
            </p>
            <h2
              className={`${serif} max-w-md text-[clamp(2.2rem,4.4vw,3.4rem)] font-normal leading-[1] tracking-[-0.02em]`}
            >
              Be first to the
              <br />
              <span className="italic text-[#c4a1f5]">next drop.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[14px] font-light leading-relaxed text-white/55">
              New arrivals, quiet offers and edits worth your time. No noise.
            </p>

            <form onSubmit={subscribe} className="mt-8 max-w-md">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center border-b border-white/25 transition-colors duration-500 focus-within:border-[#c4a1f5]">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setDone(false);
                  }}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-[14px] font-light text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  className="group flex items-center gap-2.5 py-3.5 pl-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9b55f] transition-colors duration-300 hover:text-[#e8c97a]"
                >
                  Subscribe
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 transition-transform duration-500 group-hover:translate-x-1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 12h17M14 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
              <p
                role="status"
                className={`mt-3 text-[12px] font-light text-[#c4a1f5] transition-opacity duration-500 ${
                  done ? "opacity-100" : "opacity-0"
                }`}
              >
                Thank you — you're on the list.
              </p>
            </form>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4 lg:col-span-7 lg:pl-10">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <Heading>{col.title}</Heading>
                <ul className="space-y-1.5">
                  {col.links.map((l) => (
                    <li key={l.text}>
                      <Link to={l.to} className={linkCls}>
                        {l.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="col-span-2 sm:col-span-1">
              <Heading>Reach us</Heading>
              <ul className="space-y-1.5">
                {CONTACT.map((c) => (
                  <li key={c.text}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className={`${linkCls} break-all`}
                    >
                      {c.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <p className="text-[11px] font-light tracking-wide text-white/40">
            &copy; {new Date().getFullYear()} AVI Store. All rights reserved.
          </p>

          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {SOCIAL.map((s) => (
              <li key={s.text}>
                <a
                  href={s.href}
                  className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/50 transition-colors duration-500 hover:text-[#c4a1f5]"
                >
                  {s.text}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group hidden items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/50 transition-colors duration-500 hover:text-white sm:flex"
          >
            Back to top
            <svg
              viewBox="0 0 24 24"
              className="size-4 transition-transform duration-500 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 20V4M6 10l6-6 6 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Oversized wordmark, cropped at the bottom ── */}
      {/* SVG scales to the exact container width, so every letter is the same
          size/height (all caps) and it never overflows or crops on any screen */}
      <div
        aria-hidden="true"
        className="mx-auto max-w-[1500px] select-none px-6 pb-4 md:px-12"
      >
        <svg
          viewBox="0 0 1200 170"
          className="block h-auto w-full"
          role="presentation"
        >
          <text
            x="0"
            y="150"
            textLength="1200"
            lengthAdjust="spacing"
            fontSize="190"
            fontWeight="300"
            className="fill-white/[0.09]"
            style={{
              fontFamily:
                "'Cormorant Garamond', 'Instrument Serif', Georgia, serif",
            }}
          >
            AVI STORE
          </text>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
