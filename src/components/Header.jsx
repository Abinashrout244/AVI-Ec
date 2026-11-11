import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { AuthContext } from "../context/AuthProvider";
import UserAvatar from "./UserAvatar";
import { useSelector } from "react-redux";
import { fetchProducts } from "../api.js";
import { X, ArrowRight } from "lucide-react";

/* ── Smooth physics easing for expand/squeeze morphing ── */
const MORPH_EASE = [0.16, 1, 0.3, 1];
const MORPH_DURATION = 0.65;

const useViewportWidth = () => {
  const [vw, setVw] = useState(
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );
  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setVw(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return vw;
};

const Header = () => {
  const [scrollState, setScrollState] = useState("top"); // 'top' | 'hidden' | 'pill'
  const [toggleMenu, setToggleMenu] = useState(false);
  const [profileDrop, setProfileDrop] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(false);

  const cartItems = useSelector((store) => store?.cart?.items || []);
  const wishlistItems = useSelector((store) => store?.wishlist?.items || []);
  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0,
  );
  const wishlistCount = wishlistItems.length;

  const location = useLocation();
  const { user, logOut } = useContext(AuthContext);
  const { scrollY } = useScroll();
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const vw = useViewportWidth();

  const isHome = location.pathname === "/";
  const isDesktop = vw >= 768;

  /* close popovers on route change */
  useEffect(() => {
    setToggleMenu(false);
    setProfileDrop(false);
    setSearchOpen(false);
  }, [location]);

  /* ── Evaluate header scroll phase with hysteresis ── */
  const evaluateScroll = (y) => {
    if (!isDesktop) {
      setScrollState(y > 30 ? "pill" : "top");
      return;
    }

    if (isHome) {
      const heroThreshold = window.innerHeight * 0.9;
      if (y <= 40) {
        setScrollState("top");
      } else if (y > 40 && y < heroThreshold) {
        setScrollState("hidden"); // Smoothly tuck away while traveling through hero
      } else {
        setScrollState("pill"); // Squeezed compact pill past hero
      }
    } else {
      if (y <= 40) {
        setScrollState("top");
      } else {
        setScrollState("pill");
      }
    }
  };

  useMotionValueEvent(scrollY, "change", evaluateScroll);

  useEffect(() => {
    evaluateScroll(scrollY.get());
  }, [isHome, isDesktop]);

  /* ── Fetch products for search ── */
  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError(false);
        const result = await fetchProducts();
        const list = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
            ? result.data
            : Array.isArray(result?.products)
              ? result.products
              : [];
        if (isMounted) setProducts(list);
      } catch (error) {
        console.error("Failed to fetch products for header search:", error);
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

  const query = searchText.trim().toLowerCase();
  const showDropdown = searchOpen && query.length > 0;
  const filterProducts = useMemo(() => {
    if (!query) return [];
    return products
      .filter((p) =>
        String(p?.name ?? "")
          .toLowerCase()
          .includes(query),
      )
      .slice(0, 6);
  }, [query, products]);

  /* Click outside to close menus */
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDrop(false);
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  /* Lock body scroll on mobile menu */
  useEffect(() => {
    document.body.style.overflow = toggleMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [toggleMenu]);

  const navLinks = [
    { label: "Home", link: "/" },
    { label: "Shop", link: "/shop" },
    { label: "Blog", link: "/blog" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
  ];

  const isPill = isDesktop && scrollState === "pill";
  const isHidden = isDesktop && scrollState === "hidden";

  /* Proportional dimensional bounds */
  const fullMax = Math.min(vw, 1536);
  const compactMax = Math.min(vw >= 1024 ? 820 : 700, vw - 24);
  const padX = isPill ? 22 : isDesktop ? 64 : 20;

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50 flex w-full flex-col items-center">
      {/* ── Main Morphing Header ── */}
      <motion.header
        initial={false}
        animate={{
          y: isHidden ? -110 : 0,
          opacity: isHidden ? 0 : 1,
          maxWidth: !isDesktop ? "100%" : isPill ? compactMax : fullMax,
          marginTop: isPill ? 14 : 0,
          paddingTop: isPill ? 8 : !isDesktop ? 16 : 24,
          paddingBottom: isPill ? 8 : !isDesktop ? 16 : 24,
          paddingLeft: padX,
          paddingRight: padX,
          borderRadius: isPill ? 999 : 0,
          backgroundColor: isPill
            ? "rgba(10, 8, 20, 0.78)"
            : !isDesktop && scrollState !== "top"
              ? "rgba(10, 8, 20, 0.92)"
              : "rgba(10, 8, 20, 0)",
          borderColor: isPill
            ? "rgba(255, 255, 255, 0.12)"
            : !isDesktop && scrollState !== "top"
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(255, 255, 255, 0)",
          boxShadow: isPill
            ? "0px 20px 50px 0px rgba(0, 0, 0, 0.55)"
            : "0px 0px 0px 0px rgba(0, 0, 0, 0)",
          backdropFilter:
            isPill || (!isDesktop && scrollState !== "top")
              ? "blur(20px) saturate(140%)"
              : "blur(0px) saturate(100%)",
          WebkitBackdropFilter:
            isPill || (!isDesktop && scrollState !== "top")
              ? "blur(20px) saturate(140%)"
              : "blur(0px) saturate(100%)",
        }}
        transition={{
          duration: MORPH_DURATION,
          ease: MORPH_EASE,
        }}
        style={{
          willChange: "transform, opacity, max-width, padding, border-radius",
        }}
        className="pointer-events-auto w-full border border-solid"
      >
        <div className="flex w-full flex-row items-center justify-between gap-3 md:gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="group z-50 flex flex-shrink-0 items-center gap-3"
            aria-label="AVI Elements home"
          >
            <motion.div
              animate={{
                width: isPill ? 34 : isDesktop ? 40 : 34,
                height: isPill ? 34 : isDesktop ? 40 : 34,
              }}
              transition={{ duration: MORPH_DURATION, ease: MORPH_EASE }}
              className="relative flex flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-shadow duration-500 group-hover:shadow-[0_0_25px_rgba(251,191,36,0.6)]"
            >
              <span className="pr-0.5 text-lg font-black italic tracking-tighter text-slate-900 md:text-xl">
                A
              </span>
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/30 transition-colors group-hover:ring-white/50" />
            </motion.div>

            {/* Wordmark smoothly collapses when squeezing, expands when returning */}
            <motion.div
              initial={false}
              animate={{
                width: isPill ? 0 : "auto",
                opacity: isPill ? 0 : 1,
                marginLeft: isPill ? -6 : 0,
              }}
              transition={{ duration: MORPH_DURATION * 0.85, ease: MORPH_EASE }}
              className="hidden flex-col overflow-hidden whitespace-nowrap sm:flex"
              aria-hidden={isPill}
            >
              <span className="text-base font-extrabold uppercase leading-none tracking-[0.2em] text-white transition-colors duration-300 group-hover:text-amber-400 md:text-lg">
                AVI
              </span>
              <span className="mt-1.5 text-[9px] font-semibold uppercase leading-none tracking-[0.4em] text-white/50 md:text-[10px]">
                Elements
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center md:flex" aria-label="Primary">
            <ul className="flex gap-0.5 lg:gap-1.5">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.link;
                return (
                  <li key={item.label}>
                    <motion.div
                      animate={{
                        paddingLeft: isPill ? 10 : 16,
                        paddingRight: isPill ? 10 : 16,
                      }}
                      transition={{
                        duration: MORPH_DURATION,
                        ease: MORPH_EASE,
                      }}
                    >
                      <Link
                        to={item.link}
                        className={`relative block py-2 font-semibold uppercase transition-colors duration-300 ${
                          isPill
                            ? "text-[11px] tracking-[0.14em]"
                            : "text-[12px] tracking-[0.18em]"
                        } ${
                          isActive
                            ? "text-amber-400"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        {item.label}
                        <span
                          className={`absolute bottom-0 left-2 right-2 h-[2px] origin-center rounded-full bg-amber-400 transition-transform duration-300 ${
                            isActive ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Right Actions */}
          <motion.div
            animate={{
              gap: isPill ? 16 : 24,
              paddingLeft: isPill ? 16 : 24,
              borderColor: isPill
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(255, 255, 255, 0.12)",
            }}
            transition={{ duration: MORPH_DURATION, ease: MORPH_EASE }}
            className="hidden items-center border-l md:flex"
          >
            {/* Search Button */}
            <div
              className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center"
              ref={searchRef}
            >
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className={`flex h-full w-full items-center justify-center rounded-full transition-colors ${
                  searchOpen
                    ? "text-amber-400"
                    : "text-white/60 hover:text-white"
                }`}
                aria-label="Search"
                aria-expanded={searchOpen}
              >
                <svg
                  className="size-[19px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 z-[60] mt-5 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-[#0a0e1c] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
                  >
                    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                      <svg
                        className="size-4 text-white/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Escape" && setSearchOpen(false)
                        }
                        placeholder="Search products..."
                        className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                        autoComplete="off"
                        autoFocus
                      />
                    </div>

                    <AnimatePresence>
                      {showDropdown && (
                        <motion.ul
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="custom-scrollbar mt-3 max-h-[280px] overflow-y-auto"
                        >
                          {productsLoading ? (
                            <li className="px-4 py-6 text-center text-sm text-white/40">
                              Loading products...
                            </li>
                          ) : productsError ? (
                            <li className="px-4 py-6 text-center text-sm text-rose-400">
                              Could not load products. Please try again.
                            </li>
                          ) : filterProducts.length > 0 ? (
                            filterProducts.map((item) => (
                              <li key={item._id || item.id}>
                                <Link
                                  to={`/shop/${item._id || item.id}`}
                                  onClick={() => {
                                    setSearchText("");
                                    setSearchOpen(false);
                                  }}
                                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.05]"
                                >
                                  <div className="size-9 flex-shrink-0 overflow-hidden rounded-lg bg-white/5">
                                    {(item.img || item.image) && (
                                      <img
                                        src={item.img || item.image}
                                        alt={item.name || "Product"}
                                        loading="lazy"
                                        className="size-full object-cover"
                                      />
                                    )}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-white transition-colors group-hover:text-amber-400">
                                      {item.name || "Untitled product"}
                                    </p>
                                    <p className="text-[10px] uppercase tracking-widest text-white/35">
                                      {item.category || "Collection"}
                                    </p>
                                  </div>
                                  <span className="text-[10px] uppercase tracking-wider text-amber-400/80 opacity-0 transition-opacity group-hover:opacity-100">
                                    View
                                  </span>
                                </Link>
                              </li>
                            ))
                          ) : (
                            <li className="px-4 py-6 text-center text-sm text-white/40">
                              No products found for "{searchText}"
                            </li>
                          )}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Link Container */}
            <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center">
              <Link
                to="/cart-page"
                className="flex h-full w-full items-center justify-center text-white/60 transition-colors hover:text-white"
                aria-label="Cart"
              >
                <svg
                  className="size-[19px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zm0 0h12M16 10a4 4 0 01-8 0"
                  />
                </svg>
              </Link>
              {cartCount > 0 && (
                <span className="pointer-events-none absolute right-0 top-0 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-amber-400 px-1 text-[9px] font-black text-slate-950 ring-2 ring-[#0a0814]">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Wishlist Link Container */}
            <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center">
              <Link
                to="/like-page"
                className="flex h-full w-full items-center justify-center text-white/60 transition-colors hover:text-rose-400"
                aria-label="Wishlist"
              >
                <svg
                  className="size-[19px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </Link>
              {wishlistCount > 0 && (
                <span className="pointer-events-none absolute right-0 top-0 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-black text-white ring-2 ring-[#0a0814]">
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* Avatar / Auth */}
            {!user ? (
              <div className="flex flex-shrink-0 items-center gap-3 pl-1">
                <Link
                  to="/login"
                  className={`text-[11px] uppercase tracking-widest text-white/70 transition hover:text-amber-400 ${
                    isPill ? "hidden xl:inline" : ""
                  }`}
                >
                  Login
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-full bg-amber-400 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-950 transition-colors hover:bg-amber-300"
                  >
                    Join Free
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div
                className="relative ml-2 flex flex-shrink-0 items-center"
                ref={profileRef}
              >
                <button
                  onClick={() => setProfileDrop(!profileDrop)}
                  className="flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-white/10 transition-all hover:ring-amber-400/50"
                  aria-label="Account menu"
                  aria-expanded={profileDrop}
                >
                  <UserAvatar user={user} size="sm" />
                </button>

                <AnimatePresence>
                  {profileDrop && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d18] p-2 shadow-2xl"
                    >
                      {["Profile", "Orders", "Cart Page"].map((label) => (
                        <Link
                          key={label}
                          to={`/${label.toLowerCase().replace(" ", "-")}`}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-[11px] uppercase tracking-widest text-white/60 transition hover:bg-white/5 hover:text-white"
                        >
                          {label}
                        </Link>
                      ))}
                      <div className="my-1 border-t border-white/5" />
                      <button
                        onClick={logOut}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[11px] uppercase tracking-widest text-amber-500 transition hover:bg-white/5"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Simple Mobile Controls (Always fixed width / no morph squeeze) */}
          <div className="z-50 flex items-center gap-4 md:hidden">
            {/* <Link
              to="/cart-page"
              className="relative text-white/60"
              aria-label="Cart"
            >
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zm0 0h12M16 10a4 4 0 01-8 0"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-slate-900">
                  {cartCount}
                </span>
              )}
            </Link> */}

            <Link
              to="/like-page"
              className="relative text-white/60 pe-3 "
              aria-label="Wishlist"
            >
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute right-1 -top-2 flex size-4 items-center justify-center rounded-full bg-rose-400 text-[9px] font-bold text-slate-900">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Hamburger Icon */}
            <button
              onClick={() => setToggleMenu(!toggleMenu)}
              className="flex h-8 w-8 flex-col items-end justify-center gap-1.5 "
              aria-label="Menu"
              aria-expanded={toggleMenu}
            >
              <motion.span
                animate={
                  toggleMenu
                    ? { rotate: 45, y: 7, width: "100%" }
                    : { rotate: 0, y: 0, width: "100%" }
                }
                className="block h-[1.5px] rounded-full bg-white"
                style={{ width: "100%" }}
              />
              <motion.span
                animate={
                  toggleMenu ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }
                }
                className="block h-[1.5px] rounded-full bg-white"
                style={{ width: "66%" }}
              />
              <motion.span
                animate={
                  toggleMenu
                    ? { rotate: -45, y: -7, width: "100%" }
                    : { rotate: 0, y: 0, width: "83%" }
                }
                className="block h-[1.5px] rounded-full bg-white"
                style={{ width: "100%" }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Fullscreen Drawer ── */}
      <AnimatePresence>
        {toggleMenu && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: MORPH_EASE }}
            className="pointer-events-auto fixed inset-0 z-50 flex flex-col md:hidden"
            style={{ background: "#080b12" }}
          >
            {/* Ambient gradients */}
            <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
              <div
                className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(234,175,49,0.07), transparent)",
                }}
              />
              <div
                className="absolute bottom-1/4 left-1/2 h-80 w-80 -translate-x-1/2"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(59,99,202,0.07), transparent)",
                }}
              />
            </div>

            {/* Mobile Header Bar */}
            <div className="relative z-10 flex items-center justify-between px-6 pb-3 pt-[max(1.25rem,env(safe-area-inset-top))]">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[15px] font-medium tracking-wide"
                  style={{ color: "rgba(255,255,255,0.92)" }}
                >
                  AVI
                </span>
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ background: "#eaaf31" }}
                />
                <span
                  className="text-[11px] font-normal uppercase tracking-[0.12em]"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Store
                </span>
              </div>

              <button
                onClick={() => setToggleMenu(false)}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full"
                style={{ border: "0.5px solid rgba(255,255,255,0.12)" }}
                aria-label="Close menu"
              >
                <X size={14} style={{ color: "rgba(255,255,255,0.5)" }} />
              </button>
            </div>

            <div className="mx-6">
              <div
                className="h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(234,175,49,0.25) 40%, rgba(234,175,49,0.25) 60%, transparent)",
                }}
              />
            </div>

            {/* Links */}
            <nav className="relative z-10 my-auto flex flex-col gap-1 px-7 py-8">
              {navLinks.map((item, i) => {
                const isActive = location.pathname === item.link;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.055,
                      ease: MORPH_EASE,
                      duration: 0.5,
                    }}
                  >
                    <Link
                      to={item.link}
                      onClick={() => setToggleMenu(false)}
                      className="flex items-center justify-between px-4 py-[13px] transition-colors duration-200"
                      style={{
                        borderRadius: 14,
                        border: isActive
                          ? "0.5px solid rgba(234,175,49,0.18)"
                          : "0.5px solid transparent",
                        background: isActive
                          ? "rgba(234,175,49,0.07)"
                          : "transparent",
                      }}
                    >
                      <span
                        className="text-[22px] tracking-tight"
                        style={{
                          fontWeight: isActive ? 500 : 400,
                          color: isActive ? "#eaaf31" : "rgba(255,255,255,0.6)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {item.label}
                      </span>
                      <ArrowRight
                        size={15}
                        style={{
                          color: isActive
                            ? "rgba(234,175,49,0.55)"
                            : "rgba(255,255,255,0.18)",
                        }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile Footer Area */}
            {/* <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, ease: "easeOut", duration: 0.4 }}
              className="relative z-10 px-6 pb-[max(2rem,env(safe-area-inset-bottom))]"
            >
              <div
                className="mb-6 h-px w-full"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />

              {!user ? (
                <div className="mb-6 grid grid-cols-2 gap-2.5">
                  <Link
                    to="/login"
                    onClick={() => setToggleMenu(false)}
                    className="flex items-center justify-center py-[13px] transition-all duration-200 active:scale-[0.98]"
                    style={{
                      borderRadius: 14,
                      border: "0.5px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      Login
                    </span>
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setToggleMenu(false)}
                    className="flex items-center justify-center py-[13px] transition-all duration-200 active:scale-[0.98]"
                    style={{ borderRadius: 14, background: "#eaaf31" }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: "#1a1200" }}
                    >
                      Join Free
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="mb-6 flex flex-col items-center gap-3">
                  <Link
                    to="/orders"
                    onClick={() => setToggleMenu(false)}
                    className="flex w-full items-center justify-center py-[13px] transition-all duration-200 active:scale-[0.98]"
                    style={{
                      borderRadius: 14,
                      border: "0.5px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      Orders
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setToggleMenu(false);
                      logOut();
                    }}
                    className="py-1 pb-5 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-200 active:scale-95"
                    style={{ color: "rgba(248,113,113,0.75)" }}
                  >
                    Sign Out
                  </button>
                </div>
              )}

              <p
                className="select-none text-center text-[9px] font-medium uppercase tracking-[0.35em]"
                style={{ color: "rgba(255,255,255,0.14)" }}
              >
                © {new Date().getFullYear()} &nbsp;·&nbsp; AVI Store
              </p>
            </motion.div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
