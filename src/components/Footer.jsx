import React from "react";
import { Link } from "react-router-dom";

const addressList = [
  {
    iconName: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          strokeWidth="2"
        />
      </svg>
    ),
    text: "Bhubaneswar,India",
    href: "https://maps.google.com",
  },
  {
    iconName: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    text: "+91 8123456789",
    href: "tel:+918249281685",
  },
  {
    iconName: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    text: "info@shopcart.com",
    href: "mailto:info@shopcart.com",
  },
];

const socialList = [
  {
    iconName: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
      </svg>
    ),
    siteLink: "#",
    className: "hover:bg-blue-600 hover:text-white",
  },
  {
    iconName: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
      </svg>
    ),
    siteLink: "#",
    className: "hover:bg-neutral-900 hover:text-white",
  },
  {
    iconName: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
      </svg>
    ),
    siteLink: "#",
    className: "hover:bg-blue-700 hover:text-white",
  },
  {
    iconName: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
      </svg>
    ),
    siteLink: "#",
    className:
      "hover:bg-gradient-to-tr hover:from-amber-500 hover:to-purple-600 hover:text-white",
  },
];

const ItemList = [
  { text: "All Products", link: "/shop" },
  { text: "Shop", link: "/shop" },
  { text: "Blog", link: "/blog" },
  { text: "About", link: "/about" },
  { text: "Policy", link: "#" },
  { text: "FAQs", link: "/about" },
];

const quickList = [
  { text: "Summer Sessions", link: "#" },
  { text: "Events", link: "#" },
  { text: "Gallery", link: "#" },
  { text: "Forums", link: "#" },
  { text: "Privacy Policy", link: "#" },
  { text: "Terms of Use", link: "#" },
];

const tweetList = [
  {
    desc: (
      <p className="text-sm">
        Aminur islam{" "}
        <a href="#" className="text-sky-400 hover:underline">
          @ShopCart
        </a>{" "}
        Greetings! <span className="text-amber-400">#HTML_Template</span> Grab
        your item, 50% Big Sale Offer !!
      </p>
    ),
  },
  {
    desc: (
      <p className="text-sm">
        Somrat islam{" "}
        <a href="#" className="text-sky-400 hover:underline">
          @ShopCart
        </a>{" "}
        Hey! <span className="text-amber-400">#HTML_Template</span> Grab your
        item, 50% Big Sale Offer !!
      </p>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="mt-24 px-4 sm:px-8 lg:px-16 pb-10 font-sans antialiased">
      {/* Premium Glassmorphic Layout Wrapper */}
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl p-8 lg:p-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        {/* Column 1: Brand & Contact Info */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              ShopCart
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Eduaid theme number one world class university in the world.
              Delivering state-of-the-art consumer experiences globally and
              round-the-clock.
            </p>

            <div className="space-y-4">
              {addressList.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="flex items-center gap-3.5 group text-slate-300 hover:text-white transition duration-300 text-sm"
                >
                  <span className="flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5 text-amber-400 group-hover:scale-110 transition duration-300 shadow-inner">
                    {item.iconName}
                  </span>
                  <p>{item.text}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Social Platforms Row */}
          <div className="flex gap-3 pt-4">
            {socialList.map((item, i) => (
              <a
                key={i}
                href={item.siteLink}
                className={`p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 transition-all duration-300 hover:-translate-y-1 ${item.className}`}
              >
                {item.iconName}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Categories */}
        <div className="lg:col-span-2 lg:pl-6">
          <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-5">
            Categories
          </h3>
          <ul className="space-y-3.5">
            {ItemList.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.link}
                  className="inline-block text-slate-300/80 text-sm hover:text-amber-400 transform hover:translate-x-1 transition duration-200"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3.5">
            {quickList.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.link}
                  className="inline-block text-slate-300/80 text-sm hover:text-amber-400 transform hover:translate-x-1 transition duration-200"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: App Live-Feed Updates (Tweets) */}
        <div className="lg:col-span-4">
          <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-5 flex items-center gap-2">
            Recent Activity
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
          </h3>
          <div className="space-y-4">
            {tweetList.map((item, i) => (
              <div
                key={i}
                className="flex gap-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition duration-300"
              >
                <span className="text-sky-400 shrink-0 pt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
                  </svg>
                </span>
                <div className="text-slate-300 leading-relaxed">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deep Footer Meta Data info */}
      <div className="mt-8 px-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
        <p className="text-slate-500 text-xs tracking-wide">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            to="/"
            className="text-slate-400 hover:text-white transition font-medium"
          >
            ShopCart
          </Link>
          . All Rights Reserved.
        </p>
        <div className="flex gap-4 text-xs text-slate-500">
          <a href="#" className="hover:text-slate-400 transition">
            Privacy
          </a>
          <span>&middot;</span>
          <a href="#" className="hover:text-slate-400 transition">
            Terms
          </a>
          <span>&middot;</span>
          <a href="#" className="hover:text-slate-400 transition">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
