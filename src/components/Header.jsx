import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo/logo.png";
import { AuthContext } from "../context/AuthProvider";
import profile from "../assets/images/profileimage/avi.jpg";

const Header = () => {
  const [hedaerPos, setHedaerPos] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const mneuopen = () => setToggleMenu((prev) => !prev);
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  const [profileDrop, setProfileDrop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHedaerPos(true);
      } else {
        setHedaerPos(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={` px-2 md:px-24  text-black font-semibold  w-full z-20 ${
        hedaerPos
          ? "fixed top-0 left-0 bg-white shadow-md text-gray-800 py-2"
          : "absolute top-0 left-0 bg-transparent text-white py-6"
      }`}
    >
      <div></div>
      {/* nav items */}
      <div className="flex flex-row justify-between ">
        {/* Logo area */}
        <div className="logo ">
          <Link to={"/"}>
            <img src={Logo} className="h-full w-[150px] md:w-full" />
          </Link>
        </div>
        {/* menuarea */}
        <div className=" hidden md:flex flex-row gap-20 items-center justify-around ">
          <ul className="flex flex-row justify-around gap-10 text-black">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          {/* If NOT logged in */}
          {!user && (
            <div className="flex flex-row gap-3">
              <Link to="/signup">
                <button className="bg-blue-500 py-2 text-white font-semibold px-3.5 rounded-lg">
                  Create Account
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-orange-500 py-2 text-white font-semibold px-3.5 rounded-lg">
                  Login
                </button>
              </Link>
            </div>
          )}

          {/* If logged in */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileDrop(!profileDrop)}
                className="rounded-full transition-transform duration-200 hover:scale-105"
              >
                <div className="flex items-center">
                  <img
                    src={profile}
                    className="size-12 rounded-full object-cover ring-2 ring-white shadow-md hover:ring-blue-400 transition-all duration-200"
                    alt="profile"
                  />
                </div>
              </button>

              {profileDrop && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg text-black rounded-lg w-40 py-2">
                  <Link
                    to="/cart-page"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileDrop(false)}
                  >
                    Cart Page
                  </Link>

                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileDrop(false)}
                  >
                    Profile
                  </Link>

                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={logOut}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* mobile menu */}
        {/* MOBILE RIGHT SECTION (Visible only on mobile) */}
        <div className="flex items-center gap-4 md:hidden">
          {/* MOBILE AUTH BUTTONS */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button className="bg-orange-500 text-white py-1 px-3 rounded-md text-sm">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-blue-500 text-white py-1 px-3 rounded-md text-sm">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <button onClick={() => setProfileDrop(!profileDrop)}>
              <img
                src={profile}
                className="size-10 rounded-full object-cover ring-2 ring-white"
                alt="profile"
              />
            </button>
          )}

          {/* MENU ICON */}
          <button
            className="text-3xl font-semibold items-center"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            {toggleMenu ? "❌" : "☰"}
          </button>
        </div>

        {/* MOBILE DROPDOWN — ONLY NAV LINKS */}
        {toggleMenu && (
          <div className="absolute bg-blue-300 top-full left-0 w-full flex flex-col items-center gap-4 py-6 md:hidden">
            <ul className="flex flex-col gap-6 text-lg font-medium text-black">
              <li onClick={mneuopen}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={mneuopen}>
                <Link to="/shop">Shop</Link>
              </li>
              <li onClick={mneuopen}>
                <Link to="/blog">Blog</Link>
              </li>
              <li onClick={mneuopen}>
                <Link to="/about">About</Link>
              </li>
              <li onClick={mneuopen}>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        )}

        {/* MOBILE PROFILE DROPDOWN */}
        {profileDrop && user && (
          <div className="absolute -right-5 top-20 bg-white shadow-lg text-black rounded-lg w-40 py-2 md:hidden">
            <Link
              to="/cart-page"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setProfileDrop(false)}
            >
              Cart Page
            </Link>
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setProfileDrop(false)}
            >
              Profile
            </Link>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={logOut}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
