import React from "react";
import bgimg from "../assets/images/clients/bg.png";
import Clients from "../assets/images/clients/01.jpg";
import { Link } from "react-router-dom";

const Client = () => {
  return (
    <div className="flex flex-col gap-7 justify-center items-center px-2 md:px-24 lg:px-56 py-16  md:mt-28 h-[55vh] md:h-[80vh] md:mb-64 ">
      <div className="text-center flex flex-col gap-4 md:px-32">
        <p className=" text-3xl md:text-5xl font-semibold">
          More Than <span className="text-rose-600 font-bold">60,000</span>{" "}
          Customers
        </p>
        <p className="text-gray-600 text-m md:text-lg">
          Buy products on your any device with our app & enjoy your time what
          you want. Just download & install & start to shopping
        </p>
      </div>

      <div
        className="relative w-full  h-[200px] sm:h-[300px] md:h-[450px] bg-contain bg-no-repeat bg-top "
        style={{
          backgroundImage: `url(${bgimg})`,
        }}
      >
        <div
          className="relative w-full max-w-[1000px] aspect-[819/481] bg-contain bg-no-repeat bg-center
  "
          style={{ backgroundImage: `url(${bgimg})` }}
        >
          <Link to="/signup">
            <button className="absolute top-[32%] left-[25%] bg-white p-2 rounded-full shadow group">
              <img src={Clients} className="size-7 rounded-full" />
              <div className="absolute -left-6 -translate-x-1/2 -top-8 bg-rose-600 text-white px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap shadow-xl">
                USA
              </div>
            </button>
          </Link>
          <Link to="/signup">
            <button className="absolute top-[20%] left-[28%] bg-white p-2 rounded-full shadow group">
              <img src={Clients} className="size-7 rounded-full" />
              <div className="absolute -left-6 -translate-x-1/2 -top-8 bg-sky-600 text-white px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap shadow-xl">
                Canada
              </div>
            </button>
          </Link>
          <Link to="/signup">
            <button className="absolute top-[25%] left-[48%] bg-white p-2 rounded-full shadow group">
              <img src={Clients} className="size-7 rounded-full" />
              <div className="absolute -left-6 -translate-x-1/2 -top-8 bg-pink-600 text-white px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap shadow-xl">
                UK
              </div>
            </button>
          </Link>
          <Link to="/signup">
            <button className="absolute top-[45%] left-[62%] bg-white p-2 rounded-full shadow group">
              <img src={Clients} className="size-7 rounded-full" />
              <div className="absolute -left-6 -translate-x-1/2 -top-8 bg-yellow-600 text-white px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap shadow-xl">
                India
              </div>
            </button>
          </Link>
          <Link to="/signup">
            <button className="absolute top-[65%] left-[75%] bg-white p-2 rounded-full shadow group">
              <img src={Clients} className="size-7 rounded-full" />
              <div className="absolute -left-6 -translate-x-1/2 -top-8 bg-green-600 text-white px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap shadow-xl">
                Australia
              </div>
            </button>
          </Link>
          <Link to="/signup">
            <button className="absolute top-[52%] left-[50%] bg-white p-2 rounded-full shadow group">
              <img src={Clients} className="size-7 rounded-full" />
              <div className="absolute -left-6 -translate-x-1/2 -top-8 bg-cyan-600 text-white px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap shadow-xl">
                Africa
              </div>
            </button>
          </Link>
          <Link to="/signup">
            <button className="absolute top-[58%] left-[33%] bg-white p-2 rounded-full shadow group">
              <img src={Clients} className="size-7 rounded-full" />
              <div className="absolute -left-6 -translate-x-1/2 -top-8 bg-rose-600 text-white px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap shadow-xl">
                Brazil
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Client;
