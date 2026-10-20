import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import searchIcon from "../assets/icons/search-2.svg";
import Select from "../components/Select";
import fallbackImg from "../assets/images/bg-img/01.jpg";
import { fetchProducts } from "../api.js";

/* ─────────────────────────────────────────────────────────
   EDIT ME
   Drop a clean campaign photo at src/assets/images/hero-editorial.jpg
   and update HERO_IMAGE below if you want to use a local image.
   ───────────────────────────────────────────────────────── */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80";

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap";

const serif = "font-['Instrument_Serif',Georgia,serif]";
const sans = "font-['Hanken_Grotesk',system-ui,sans-serif]";

const FEATURE_LINKS = [
  { label: "Shoes", sub: "Step into style", to: "/shop" },
  { label: "Beauty", sub: "Glow your way", to: "/shop" },
  { label: "Phones", sub: "Smarter every day", to: "/shop" },
];

const TRENDING = [
  "Electronics",
  "Fashion",
  "Beauty",
  "Shoes",
  "Bags",
  "Phones",
];

const TRUST = [
  {
    label: "Free Shipping",
    sub: "Across India",
    d: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7.5 17.5h.01M17.5 17.5h.01",
  },
  {
    label: "Secure Payments",
    sub: "100% Safe",
    d: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9 12l2 2 4-4",
  },
  {
    label: "Fast Delivery",
    sub: "2–5 Days",
    d: "M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2",
  },
];

const GRAIN =
  "bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")]";

const Arrow = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={`size-4 shrink-0 transition-transform duration-500 ease-out ${className}`}
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

const ease = [0.16, 1, 0.3, 1];

const Banner = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(false);
  const [src, setSrc] = useState(HERO_IMAGE);

  const dropdownRef = useRef(null);
  const reduce = useReducedMotion();
  const navigate = useNavigate();

  // Load editorial fonts once.
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_LINK}"]`)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_LINK;
    document.head.appendChild(link);
  }, []);

  // Fetch products from the fake API once when the banner mounts.
  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError(false);

        const result = await fetchProducts();
        const productList = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
            ? result.data
            : Array.isArray(result?.products)
              ? result.products
              : [];

        if (isMounted) setProducts(productList);
      } catch (error) {
        console.error("Failed to load products for banner search:", error);
        if (isMounted) {
          setProducts([]);
          setProductsError(true);
        }
      } finally {
        if (isMounted) setProductsLoading(false);
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter API products as the user types.
  useEffect(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      setFilterProducts([]);
      setShowDropdown(false);
      return;
    }

    const filtered = products.filter((product) => {
      const name = String(product?.name ?? "").toLowerCase();
      const category = String(product?.category ?? "").toLowerCase();
      return name.includes(query) || category.includes(query);
    });

    setFilterProducts(filtered);
    setShowDropdown(true);
  }, [searchText, products]);

  // Close dropdown when clicking outside the search area.
  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const query = searchText.trim();
    setShowDropdown(false);
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
  };

  const openProduct = (productId) => {
    setShowDropdown(false);
    navigate(`/shop/${productId}`);
  };

  const rise = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section
      className={`${sans} relative isolate z-20 flex min-h-screen flex-col overflow-x-clip bg-[#0d0910] text-[#f3ecf4]`}
    >
      {/* Editorial photograph, blended into the dark */}
      <motion.div
        className="absolute inset-0 -z-10 lg:left-auto lg:w-[76%]"
        initial={reduce ? false : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        <img
          src={src}
          onError={() => setSrc(fallbackImg)}
          alt="Editorial campaign photograph"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[60%_20%] saturate-[0.9] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0910] via-[#0d0910]/70 to-transparent lg:via-[#0d0910]/25" />
        <div className="absolute inset-0 bg-[#0d0910]/55 lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0d0910] via-[#0d0910]/70 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0d0910]/80 to-transparent" />
      </motion.div>

      <div
        className={`pointer-events-none absolute inset-0 -z-10 opacity-[0.04] mix-blend-overlay ${GRAIN}`}
      />

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-6 pb-10 pt-32 md:px-12 lg:pt-36">
        <div className="flex flex-1 items-start justify-between gap-10 lg:items-center">
          {/* LEFT */}
          <div className="w-full max-w-[680px]">
            <motion.p
              {...rise(0.1)}
              className="mb-8 flex items-center gap-4 text-[11px] font-normal uppercase tracking-[0.3em] text-white/60"
            >
              <span className="h-px w-10 bg-white/50" />
              Style <span className="text-white/30">/</span> Tech{" "}
              <span className="text-white/30">/</span> Lifestyle
            </motion.p>

            <h1
              className={`${serif} text-[clamp(3.6rem,9vw,8rem)] font-normal leading-[0.9] tracking-[-0.025em]`}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.2, ease }}
                >
                  Wear What
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <motion.span
                  className="block italic text-[#c4a1f5]"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.32, ease }}
                >
                  Matters Most
                </motion.span>
              </span>
            </h1>

            <motion.p
              {...rise(0.55)}
              className="mt-8 max-w-[24rem] text-[17px] font-light leading-[1.55] text-white/70"
            >
              Curated fashion, tech &amp; lifestyle drops — delivered fast
              across India.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...rise(0.68)}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 rounded-full bg-[#c4a1f5] px-7 py-3.5 text-[13px] font-medium tracking-[0.02em] text-[#150d1c] transition-colors duration-500 hover:bg-[#d6bcfa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a1f5]"
              >
                Shop collection
                <Arrow className="group-hover:translate-x-1.5" />
              </Link>
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-medium tracking-[0.02em] text-white/90 transition-colors duration-500 hover:border-white/60 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
              >
                Explore all
              </Link>
            </motion.div>

            {/* Trust */}
            <motion.ul
              {...rise(0.82)}
              className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              {TRUST.map((item, index) => (
                <li key={item.label} className="flex items-center gap-7">
                  {index > 0 && (
                    <span className="hidden h-7 w-px bg-white/15 sm:block" />
                  )}
                  <div className="flex items-center gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-[18px] text-white/65"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={item.d} />
                    </svg>
                    <div className="leading-tight">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/85">
                        {item.label}
                      </p>
                      <p className="mt-1 text-[10px] font-light tracking-wide text-white/40">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT: editorial category links */}
          <motion.nav
            aria-label="Featured categories"
            {...rise(0.9)}
            className="hidden self-start pt-2 lg:flex lg:flex-col lg:gap-10"
          >
            {FEATURE_LINKS.map((item) => (
              <Link key={item.label} to={item.to} className="group block w-56">
                <div className="flex items-center justify-between">
                  <span
                    className={`${serif} text-[2.1rem] italic leading-none text-white/95 transition-colors duration-500 group-hover:text-[#c4a1f5]`}
                  >
                    {item.label}
                  </span>
                  <Arrow className="text-white/70 group-hover:translate-x-1.5 group-hover:text-[#c4a1f5]" />
                </div>
                <span className="mt-3 block h-px w-8 bg-[#c4a1f5] transition-all duration-500 group-hover:w-16" />
                <p className="mt-3 text-[12px] font-light tracking-wide text-white/65">
                  {item.sub}
                </p>
              </Link>
            ))}
          </motion.nav>
        </div>

        {/* Search */}
        <motion.div
          {...rise(1)}
          ref={dropdownRef}
          className="relative mx-auto mt-14 w-full max-w-[640px]"
        >
          <form
            onSubmit={submit}
            role="search"
            className="flex items-center rounded-full border border-white/20 bg-[#0d0910]/70 p-1.5 backdrop-blur-md transition-colors duration-500 focus-within:border-[#c4a1f5]/60"
          >
            <div className="hidden border-r border-white/10 pl-4 pr-3 md:block">
              <Select select="all" />
            </div>
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search for products, brands & more…"
              aria-label="Search products"
              aria-expanded={showDropdown}
              className="min-w-0 flex-1 bg-transparent px-5 py-3 text-[13px] font-light tracking-wide text-white outline-none placeholder:text-white/40"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#d9b55f] transition-colors duration-300 hover:bg-[#e8c97a]"
            >
              <img src={searchIcon} alt="" className="size-4" />
            </button>
          </form>

          {/* Search dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="absolute left-0 right-0 z-[100] mt-3 max-h-[320px] overflow-y-auto rounded-2xl border border-white/10 bg-[#120c16]/95 shadow-[0_30px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              >
                {productsLoading ? (
                  <li className="px-8 py-8 text-center text-sm text-white/45">
                    Loading products...
                  </li>
                ) : productsError ? (
                  <li className="px-8 py-8 text-center text-sm text-rose-300">
                    Could not load products. Please try again.
                  </li>
                ) : filterProducts.length > 0 ? (
                  filterProducts.slice(0, 8).map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => openProduct(item.id)}
                        className="group flex w-full items-center justify-between border-b border-white/5 px-5 py-3 text-left transition-colors last:border-none hover:bg-white/[0.04]"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="size-10 shrink-0 overflow-hidden rounded-md bg-white/5">
                            {(item.img || item.image || item.images?.[0]) && (
                              <img
                                src={item.img || item.image || item.images?.[0]}
                                alt={item.name || "Product"}
                                loading="lazy"
                                className="size-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex min-w-0 flex-col">
                            <span className="truncate text-sm text-white transition-colors group-hover:text-[#c4a1f5]">
                              {item.name || "Untitled product"}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                              {item.category || "Collection"}
                            </span>
                          </div>
                        </div>
                        <span className="ml-3 shrink-0 text-[10px] font-medium uppercase tracking-[0.2em] text-[#d9b55f]">
                          View →
                        </span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-8 py-8 text-center text-sm text-white/45">
                    No products found for “{searchText}”
                  </li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Trending */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-2">
            {TRENDING.map((category) => (
              <Link
                key={category}
                to={`/shop?category=${encodeURIComponent(category)}`}
                className="relative py-1 text-[10px] font-normal uppercase tracking-[0.25em] text-white/55 transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#c4a1f5] after:transition-transform after:duration-500 hover:text-white hover:after:scale-x-100"
              >
                {category}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
