import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Logo from "../assets/images/logo/logo.png";
import { AuthContext } from "../context/AuthProvider";
import profile from "../assets/images/profileimage/avi.jpg";

const Header = () => {
  const [headerPos, setHeaderPos] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [profileDrop, setProfileDrop] = useState(false);
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(true);
  const [cartCount] = useState(3);

  const location = useLocation();
  const { user, logOut } = useContext(AuthContext);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Close mobile menu on route change
  useEffect(() => {
    setToggleMenu(false);
    setProfileDrop(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setHeaderPos(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollY.current;
    if (latest > prev && latest > 180) setHidden(true);
    else setHidden(false);
    lastScrollY.current = latest;
  });

  const navLinks = [
    { label: "Home", link: "/" },
    { label: "Shop", link: "/shop" },
    { label: "Blog", link: "/blog" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
  ];

  const announcements = [
    "🎉 Free shipping on orders over ₹999 — Shop Now",
    "🔥 New arrivals every week — Don't miss out!",
    "💎 Use code SHOPAVI for 15% off your first order",
  ];
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIdx((i) => (i + 1) % announcements.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Announcement Bar */}
      <AnimatePresence>
        {showAnnouncementBar && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-900 text-xs font-semibold tracking-widest uppercase"
          >
            <div className="max-w-screen-2xl mx-auto px-6 py-2 flex items-center justify-between">
              <div className="flex-1 text-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={announcementIdx}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="block tracking-[0.15em]"
                  >
                    {announcements[announcementIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <button
                onClick={() => setShowAnnouncementBar(false)}
                className="ml-4 text-slate-800 hover:text-slate-900 transition-colors flex-shrink-0"
                aria-label="Close announcement"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <motion.header
        initial={false}
        animate={{
          y: hidden ? -200 : 0,
          backgroundColor: headerPos
            ? "rgba(6, 8, 18, 0.88)"
            : "rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full transition-all duration-500 ${
          headerPos ? "py-3 backdrop-blur-2xl border-b border-white/8 shadow-2xl" : "py-6"
        } px-6 md:px-16`}
      >
        <div className="max-w-screen-2xl mx-auto flex flex-row justify-between items-center gap-6">
          {/* Logo */}
          <Link to="/" className="z-50 flex-shrink-0">
            <img
              src={Logo}
              className="h-8 md:h-9 w-auto object-contain brightness-110"
              alt="AVI Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <ul className="flex gap-2">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.link;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.link}
                      className={`relative px-4 py-2 text-[12px] uppercase tracking-[0.18em] font-semibold transition-colors duration-300 ${
                        isActive ? "text-amber-400" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 rounded-full"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-5 border-l border-white/10 pl-6">
            {/* Search icon */}
            <button className="text-white/50 hover:text-white transition-colors" aria-label="Search">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
            </button>

            {/* Cart */}
            <Link to="/cart-page" className="relative text-white/50 hover:text-white transition-colors group" aria-label="Cart">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zm0 0h12M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 text-[10px] font-bold rounded-full size-4 flex items-center justify-center leading-none"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Wishlist */}
            <button className="text-white/50 hover:text-red-400 transition-colors" aria-label="Wishlist">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Auth */}
            {!user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-[11px] uppercase tracking-widest text-white/70 hover:text-amber-400 transition"
                >
                  Login
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2 bg-amber-400 text-slate-900 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-amber-300 transition-all duration-300 rounded-full"
                  >
                    Join Free
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileDrop(!profileDrop)}
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={profile}
                    className="size-9 rounded-full object-cover ring-2 ring-amber-400/30 group-hover:ring-amber-400 transition-all duration-500"
                    alt="profile"
                  />
                </button>

                <AnimatePresence>
                  {profileDrop && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-52 bg-[#0a0d18]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden"
                    >
                      {["Profile", "Cart Page"].map((label) => (
                        <Link
                          key={label}
                          to={`/${label.toLowerCase().replace(" ", "-")}`}
                          className="flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition"
                        >
                          {label}
                        </Link>
                      ))}
                      <div className="border-t border-white/5 my-1" />
                      <button
                        onClick={logOut}
                        className="w-full text-left flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-widest text-amber-500 hover:bg-white/5 rounded-xl transition"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-4 md:hidden z-50">
            {/* Mobile Cart */}
            <Link to="/cart-page" className="relative text-white/60" aria-label="Cart">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zm0 0h12M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 text-[9px] font-bold rounded-full size-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user && (
              <img src={profile} className="size-8 rounded-full ring-1 ring-white/20" alt="profile" />
            )}

            {/* Hamburger */}
            <button
              onClick={() => setToggleMenu(!toggleMenu)}
              className="flex flex-col gap-1.5 justify-center items-end w-8 h-8"
              aria-label="Menu"
            >
              <motion.span
                animate={toggleMenu ? { rotate: 45, y: 7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
                className="h-[1.5px] bg-white block rounded-full"
                style={{ width: "100%" }}
              />
              <motion.span
                animate={toggleMenu ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                className="h-[1.5px] bg-white block rounded-full"
                style={{ width: "66%" }}
              />
              <motion.span
                animate={toggleMenu ? { rotate: -45, y: -7, width: "100%" } : { rotate: 0, y: 0, width: "83%" }}
                className="h-[1.5px] bg-white block rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {toggleMenu && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#060810] z-40 flex flex-col justify-center items-center md:hidden"
          >
            {/* Decorative blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-amber-500/5 blur-[80px]" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-600/5 blur-[80px]" />
            </div>

            <motion.ul className="text-center space-y-6 relative z-10">
              {navLinks.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    onClick={() => setToggleMenu(false)}
                    className={`text-4xl font-serif tracking-tight transition ${
                      location.pathname === item.link ? "text-amber-400" : "text-white hover:text-amber-400"
                    }`}
                    to={item.link}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-14 flex flex-col items-center gap-6"
            >
              {!user ? (
                <div className="flex gap-4">
                  <Link
                    to="/login"
                    onClick={() => setToggleMenu(false)}
                    className="px-6 py-2.5 rounded-full border border-white/20 text-[11px] uppercase tracking-[0.3em] text-white/60 hover:border-white/50 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setToggleMenu(false)}
                    className="px-6 py-2.5 rounded-full bg-amber-400 text-slate-900 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-amber-300 transition"
                  >
                    Join Free
                  </Link>
                </div>
              ) : (
                <button
                  onClick={logOut}
                  className="text-amber-500 uppercase tracking-widest text-xs"
                >
                  Sign Out
                </button>
              )}
              <p className="text-white/20 text-[10px] tracking-widest uppercase">© 2025 AVI Store</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
