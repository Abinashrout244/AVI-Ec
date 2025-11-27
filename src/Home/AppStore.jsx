import React from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/images/app/01.jpg";
import img2 from "../assets/images/app/02.jpg";

const AppStore = () => {
  return (
    <div className="flex flex-col gap-7 justify-center items-center h-[70vh] px-5 md:px-[380px]">
      <Link to="/signup">
        <button className="px-4 py-2 w-[150px] bg-transparent rounded-sm text-black  text-center items-center font-semibold hover:bg-rose-600 hover:text-white border-2 border-rose-600">
          Sing up for free
        </button>
      </Link>
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl font-semibold text-center">
          Learn Anytime, Anywhere
        </h1>
        <p className="text-lg text-center">
          Take courses on your any device with our app & learn all time what you
          want. Just download & install & start to learn
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-7">
        <img src={img1} className=" h-[63px] md:h-[88px]" />
        <img src={img2} className=" h-[63px] md:h-[88px]" />
      </div>
    </div>
  );
};

export default AppStore;
