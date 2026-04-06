import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Logo from "../assets/images/logo/logo.png";
import { AuthContext } from "../context/AuthProvider";
import profile from "../assets/images/profileimage/avi.jpg";

const Header = () => {
  const [hedaerPos, setHedaerPos] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [profileDrop, setProfileDrop] = useState(false);
  const mneuopen = () => setToggleMenu((prev) => !prev);
  const { user, logOut } = useContext(AuthContext);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setHedaerPos(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollY.current;
    if (latest > prev && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? -96 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`px-2 md:px-20 font-semibold w-full z-40 ${
        hedaerPos
          ? "fixed top-0 left-0 glass-panel py-3"
          : "absolute top-0 left-0 bg-transparent py-6"
      }`}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="logo">
          <Link to="/">
            <img src={Logo} className="h-full w-[150px] md:w-full" />
          </Link>
        </div>

        <div className="hidden md:flex flex-row gap-20 items-center justify-around">
          <ul className="flex flex-row justify-around gap-10 text-white/80">
            {[
              { label: "Home", link: "/" },
              { label: "Shop", link: "/shop" },
              { label: "Blog", link: "/blog" },
              { label: "About", link: "/about" },
              { label: "Contact", link: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link className="hover:text-white transition" to={item.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {!user && (
            <div className="flex flex-row gap-3">
              <Link to="/signup">
                <button className="btn-ghost">Create Account</button>
              </Link>
              <Link to="/login">
                <button className="btn-primary">Login</button>
              </Link>
            </div>
          )}

          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileDrop(!profileDrop)}
                className="rounded-full transition-transform duration-200 hover:scale-105"
              >
                <div className="flex items-center">
                  <img
                    src={profile}
                    className="size-12 rounded-full object-cover ring-2 ring-white/70 shadow-md hover:ring-amber-300 transition-all duration-200"
                    alt="profile"
                  />
                </div>
              </button>

              {profileDrop && (
                <div className="absolute right-0 mt-3 glass-panel text-white rounded-2xl w-44 py-2">
                  <Link
                    to="/cart-page"
                    className="block px-4 py-2 hover:bg-white/10"
                    onClick={() => setProfileDrop(false)}
                  >
                    Cart Page
                  </Link>

                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-white/10"
                    onClick={() => setProfileDrop(false)}
                  >
                    Profile
                  </Link>

                  <button
                    className="w-full text-left px-4 py-2 hover:bg-white/10"
                    onClick={logOut}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button className="btn-primary px-3 py-1.5 text-xs">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn-ghost px-3 py-1.5 text-xs">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <button onClick={() => setProfileDrop(!profileDrop)}>
              <img
                src={profile}
                className="size-10 rounded-full object-cover ring-2 ring-white/70"
                alt="profile"
              />
            </button>
          )}

          <button
            className="text-xs font-semibold items-center border border-white/20 rounded-full px-3 py-1 text-white/80"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            {toggleMenu ? "Close" : "Menu"}
          </button>
        </div>

        {toggleMenu && (
          <div className="absolute glass-panel top-full left-4 right-4 rounded-2xl flex flex-col items-center gap-4 py-6 md:hidden">
            <ul className="flex flex-col gap-6 text-base font-medium text-white/80">
              {[
                { label: "Home", link: "/" },
                { label: "Shop", link: "/shop" },
                { label: "Blog", link: "/blog" },
                { label: "About", link: "/about" },
                { label: "Contact", link: "/contact" },
              ].map((item) => (
                <li key={item.label} onClick={mneuopen}>
                  <Link className="hover:text-white transition" to={item.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {profileDrop && user && (
          <div className="absolute -right-2 top-20 glass-panel text-white rounded-2xl w-40 py-2 md:hidden">
            <Link
              to="/cart-page"
              className="block px-4 py-2 hover:bg-white/10"
              onClick={() => setProfileDrop(false)}
            >
              Cart Page
            </Link>
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-white/10"
              onClick={() => setProfileDrop(false)}
            >
              Profile
            </Link>
            <button
              className="w-full text-left px-4 py-2 hover:bg-white/10"
              onClick={logOut}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
