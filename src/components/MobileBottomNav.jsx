import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

const MobileBottomNav = () => {
   const location = useLocation();
   const cartItems = useSelector((store) => store?.cart?.items || []);
   const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
   
   const navLinks = [
     {
       name: "Home",
       path: "/",
       icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
     },
     {
       name: "Shop",
       path: "/shop",
       icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
     },
     {
       name: "Orders",
       path: "/orders",
       icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
     },
     {
       name: "Cart",
       path: "/cart-page",
       icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
     },
     {
       name: "Profile",
       path: "/profile",
       icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
     }
   ];

   return (
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0a0e1c]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-15px_30px_rgba(0,0,0,0.5)] z-[60] pb-2 pt-2 px-2">
         <div className="flex justify-between items-center h-14 w-full">
            {navLinks.map((link) => {
               const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
               return (
                  <Link to={link.path} key={link.name} className={`flex flex-col items-center justify-center w-full relative h-full ${isActive ? "text-amber-400" : "text-white/40 hover:text-white transition-colors"}`}>
                     <div className={`relative mb-1 transition-transform duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                       <svg className={`w-6 h-6 ${isActive ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         {link.icon}
                       </svg>
                       {link.name === "Cart" && cartCount > 0 && (
                          <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-900 border-2 border-[#0a0e1c] text-[9px] font-bold rounded-full min-w-4 h-4 flex items-center justify-center px-1">
                            {cartCount}
                          </span>
                       )}
                     </div>
                     <span className={`text-[9px] uppercase font-bold tracking-widest ${isActive ? "opacity-100" : "opacity-0"} transition-all absolute bottom-0`}>
                       {link.name}
                     </span>
                  </Link>
               );
            })}
         </div>
         {/* Safe area support for iOS */}
         <div className="h-[env(safe-area-inset-bottom)] w-full"></div>
      </div>
   );
};

export default MobileBottomNav;
