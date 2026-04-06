import React from "react";
import Regist from "../assets/images/Register.jpg";
const Register = () => {
  return (
    <div
      className=" bg-cover bg-center bg-no-repeat h-full md:h-[75vh] mb-16 md:mr-3 text-white relative"
      style={{
        backgroundImage: `url(${Regist})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 px-2 ml-4 md:px-10 pt-14 md:pt-36 gap-7 md:gap-4  ">
        <div className="col-span-2 flex flex-col justify-center items-start px-3 md:px-16 ">
          <p className=" text-xl md:text-3xl font-semibold tracking-wide text-rose-600">
            SAVE THE DAY
          </p>

          <h1 className="text-3xl md:text-5xl font-semi-bold leading-tight mt-2 mb-3">
            Join One Day Long Free Workshop for Advanced Mastering on Sales
          </h1>

          <p className=" text-lg md:text-2xl text-yellow-300">
            Limited Time Offer! Hurry up..
          </p>
        </div>

        <div className="px-8 py-12 rounded-3xl glass-panel w-full max-w-md mx-auto relative z-10">
          <h2 className="text-2xl font-semibold text-center mb-6 text-white">
            Register Now
          </h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="User Name"
              className="w-full px-4 py-2 text-white rounded-full bg-transparent border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder:text-slate-400"
            />
            <input
              type="email"
              name="Email"
              placeholder="E-mail"
              className="w-full px-4 py-2 text-white rounded-full bg-transparent border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder:text-slate-400"
            />
            <input
              type="text"
              name="Phone"
              placeholder="Phone"
              className="w-full px-4 py-2 text-white rounded-full bg-transparent border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder:text-slate-400"
            />
          </form>

          <button
            className="mt-6 w-full px-10 py-3 bg-amber-300 text-slate-900 font-semibold rounded-full shadow-md hover:bg-amber-200 transition-all duration-200 hover:-translate-y-0.5"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
