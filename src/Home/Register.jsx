import React from "react";
import Regist from "../assets/images/Register.jpg";
const Register = () => {
  return (
    <div
      className=" bg-cover bg-center bg-no-repeat h-full md:h-[75vh] mb-16   md:mr-3 text-white "
      style={{
        backgroundImage: `url(${Regist})`,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 px-2 ml-4 md:px-10 pt-14 md:pt-36 gap-7 md:gap-4  ">
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

        <div
          className="px-8 py-14 rounded-t-lg 
        bg-linear-to-b from-white/70 to-white/10 
        backdrop-blur-md shadow-lg w-full max-w-md mx-auto"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
            Register Now
          </h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="User Name"
              className="w-full px-4 py-2 text-black rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="Email"
              placeholder="E-mail"
              className="w-full px-4 py-2 text-black rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="Phone"
              placeholder="Phone"
              className="w-full px-4 py-2 text-black rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>

          <button
            className="mt-6 w-full  px-10 py-3 bg-blue-600 text-white font-semibold 
            rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 hover:translate-y-1"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
