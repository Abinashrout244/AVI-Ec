import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

  const { user, logOut } = useContext(AuthContext);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => setHeaderPos(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollY.current;
    if (latest > prev && latest > 120) setHidden(true);
    else setHidden(false);
    lastScrollY.current = latest;
  });

  // Variants for luxury staggering
  const navLinks = [
    { label: "Home", link: "/" },
    { label: "Shop", link: "/shop" },
    { label: "Blog", link: "/blog" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <motion.header
      initial={false}
      animate={{
        y: hidden ? -100 : 0,
        backgroundColor: headerPos
          ? "rgba(10, 10, 10, 0.8)"
          : "rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        headerPos ? "py-4 backdrop-blur-xl border-b border-white/5" : "py-8"
      } px-6 md:px-20`}
    >
      <div className="max-w-screen-2xl mx-auto flex flex-row justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="z-50">
          <img
            src={Logo}
            className="h-8 md:h-10 w-auto object-contain brightness-110"
            alt="Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-16">
          <ul className="flex gap-10">
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link
                  className="text-[13px] uppercase tracking-[0.2em] font-medium text-white/60 hover:text-white transition-colors duration-300"
                  to={item.link}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-8 border-l border-white/10 pl-8">
            {!user ? (
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  className="text-[12px] uppercase tracking-widest text-white/80 hover:text-amber-400 transition"
                >
                  Login
                </Link>
                <Link to="/signup">
                  <button className="px-6 py-2.5 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-amber-400 transition-all duration-300">
                    Join
                  </button>
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
                    className="size-10 rounded-full object-cover ring-1 ring-white/20 group-hover:ring-amber-400 transition-all duration-500"
                    alt="profile"
                  />
                </button>

                <AnimatePresence>
                  {profileDrop && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-4 w-48 bg-zinc-950/90 backdrop-blur-2xl border border-white/10 p-2 shadow-2xl"
                    >
                      {["Profile", "Cart Page"].map((label) => (
                        <Link
                          key={label}
                          to={`/${label.toLowerCase().replace(" ", "-")}`}
                          className="block px-4 py-3 text-[11px] uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition"
                        >
                          {label}
                        </Link>
                      ))}
                      <button
                        onClick={logOut}
                        className="w-full text-left px-4 py-3 text-[11px] uppercase tracking-widest text-amber-500 hover:bg-white/5 transition"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-5 md:hidden z-50">
          {user && (
            <img
              src={profile}
              className="size-9 rounded-full ring-1 ring-white/20"
              alt="profile"
            />
          )}

          {/* Animated Luxury Hamburger */}
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className="flex flex-col gap-1.5 justify-center items-center w-8 h-8"
          >
            <motion.span
              animate={toggleMenu ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-full h-[1px] bg-white block"
            />
            <motion.span
              animate={toggleMenu ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-[1px] bg-white block"
            />
            <motion.span
              animate={
                toggleMenu ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
              }
              className="w-full h-[1px] bg-white block"
            />
          </button>
        </div>

        {/* Fullscreen Mobile Overlay */}
        <AnimatePresence>
          {toggleMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center md:hidden"
            >
              <motion.ul
                initial="initial"
                animate="animate"
                className="text-center space-y-8"
              >
                {navLinks.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      onClick={() => setToggleMenu(false)}
                      className="text-3xl font-serif tracking-tighter text-white hover:text-amber-400 transition"
                      to={item.link}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-20 flex flex-col items-center gap-6"
              >
                {!user ? (
                  <Link
                    to="/login"
                    onClick={() => setToggleMenu(false)}
                    className="text-[11px] uppercase tracking-[0.3em] text-white/50"
                  >
                    Sign In to Boutique
                  </Link>
                ) : (
                  <button
                    onClick={logOut}
                    className="text-amber-500 uppercase tracking-widest text-xs"
                  >
                    Sign Out
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
