import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Regist from "../assets/images/Register.jpg";

const Register = () => {
  return (
    <div
      className="relative overflow-hidden rounded-3xl min-h-[500px] md:min-h-[560px] bg-cover bg-center"
      style={{ backgroundImage: `url(${Regist})` }}
    >
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full min-h-[500px] md:min-h-[560px]">

        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center px-8 md:px-14 py-12 gap-6"
        >
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="size-2 rounded-full bg-rose-500 inline-block"
            />
            <span className="text-rose-400 text-[10px] uppercase tracking-[0.4em] font-bold">
              Limited Time Offer
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
            Free Workshop on{" "}
            <span className="italic text-amber-300 font-light">
              Advanced Sales
            </span>
          </h2>

          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-sm">
            Join thousands of sellers mastering the art of e-commerce. One day. 
            Free. Life-changing.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <svg className="size-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>April 20, 2025</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <svg className="size-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>10:00 AM – 6:00 PM</span>
            </div>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex -space-x-2.5">
              {["bg-violet-500", "bg-sky-500", "bg-rose-500", "bg-amber-500"].map((c, i) => (
                <div key={i} className={`size-8 rounded-full border-2 border-[#04060e] ${c} flex items-center justify-center text-[10px] font-bold text-white`}>
                  {["K", "R", "A", "S"][i]}
                </div>
              ))}
            </div>
            <p className="text-white/50 text-[12px]">
              <span className="text-white font-semibold">2,400+</span> already registered
            </p>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center p-6 md:p-12"
        >
          <div className="glass-panel w-full max-w-sm rounded-2xl p-7 flex flex-col gap-5">
            <div className="text-center">
              <h3 className="text-white font-semibold text-xl mb-1">Register Now</h3>
              <p className="text-white/40 text-[12px]">Seats are filling fast — grab yours!</p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              {[
                { type: "text", name: "name", placeholder: "Your Full Name", icon: "👤" },
                { type: "email", name: "email", placeholder: "Email Address", icon: "✉️" },
                { type: "tel", name: "phone", placeholder: "Phone Number", icon: "📱" },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none">
                    {field.icon}
                  </span>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/40 transition-all"
                  />
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 font-bold text-[13px] uppercase tracking-[0.15em] shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 transition-all duration-300"
              >
                Claim My Free Seat 🎟️
              </motion.button>
            </form>

            <p className="text-center text-white/25 text-[11px]">
              No credit card required · 100% Free
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
