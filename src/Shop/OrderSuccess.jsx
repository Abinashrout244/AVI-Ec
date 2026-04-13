import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../utilis/CartSlice";

const OrderSuccess = () => {
   const dispatch = useDispatch();

   useEffect(() => {
     // Clear the cart securely when reaching the success page
     dispatch(clearCart());
   }, [dispatch]);

   return (
      <div className="min-h-[100vh] bg-[#060810] text-slate-100 flex items-center justify-center p-4">
         <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
            className="flex flex-col items-center text-center gap-4 md:gap-6 p-6 md:p-16 glass-panel rounded-3xl md:rounded-[3rem] shadow-[0_0_80px_rgba(52,211,153,0.15)] border border-emerald-500/20 max-w-[90%] md:max-w-[600px] w-full relative overflow-hidden"
         >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", delay: 0.3, duration: 0.8, bounce: 0.5 }}
               className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-emerald-400 flex items-center justify-center shadow-[0_0_60px_rgba(52,211,153,0.6)] relative z-10"
            >
               <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-900 w-12 h-12 md:w-16 md:h-16"
               >
                  <path d="M20 6L9 17l-5-5" />
               </motion.svg>
            </motion.div>
            
            <div className="relative z-10 mt-6 mt-2">
               <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-3xl md:text-5xl font-black text-white mt-4 md:mb-4 tracking-tight"
               >
                  Payment Successful!
               </motion.h1>
               <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-slate-400 text-base md:text-lg max-w-[300px] md:max-w-md mx-auto leading-relaxed"
               >
                  Your order has been placed successfully and is being processed. You will receive an email confirmation shortly.
               </motion.p>
            </div>

            <motion.div
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.2, duration: 0.5 }}
               className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center relative z-10"
            >
               <Link to="/shop" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl text-center text-lg transition-all border border-white/10 hover:border-white/20 w-fit mx-auto shadow-lg hover:shadow-xl">
                  Continue Shopping
               </Link>
            </motion.div>
         </motion.div>
      </div>
   )
}

export default OrderSuccess;
