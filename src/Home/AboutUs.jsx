import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const countList = [
    {
      iconName: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
          className="size-14 p-4 rounded-full bg-red-500 shadow-md shadow-gray-200"
        >
          <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
        </svg>
      ),
      count: "12600",
      text: "Marchant Enrolled",
    },
    {
      iconName: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
          className="size-14 p-4 rounded-full bg-green-400 shadow-md shadow-gray-200"
        >
          <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
        </svg>
      ),
      count: "30",
      text: "Certified Courses",
    },
    {
      iconName: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
          className="size-14 p-4 rounded-full bg-yellow-400 shadow-md shadow-gray-200"
        >
          <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
        </svg>
      ),
      count: "100",
      text: "Rewards and GitCards",
    },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-3  items-center justify-between bg-linear-to-r from-gray-900 to-yellow-400 text-white h-screen md:h-[85vh]  p-8 md:py-20 md:pl-56">
      <div className="flex flex-col gap-6 md:w-1/2">
        {countList.map((item, index) => {
          return (
            <div className="flex flex-row gap-10 items-center " key={index}>
              <div className="shrink-0">{item.iconName}</div>

              <div className="space-y-1">
                <p className="text-4xl font-semibold space-x-2">
                  <span>
                    <CountUp end={item.count} />
                  </span>
                  <span>+</span>
                </p>
                <p className="text-sm">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 col-span-2 md:pl-40  pl-3 md:pt-0 ">
        <p className="tex-xl md:text-sm">Why Choose Us</p>
        <h1 className="text-3xl md:text-5xl font-semibold text-black">
          Become a Marchant
        </h1>
        <p className="md:text-lg text-[16px] text-slate-100 md:text-slate-800">
          Take courses on your any device with our app & learn all about
          business what you want. Just download & install & start to learn
        </p>
        <Link to="/signup">
          <button className="px-4 py-2 w-[150px] bg-white rounded-sm text-black  text-center items-center font-semibold hover:bg-transparent hover:text-white hover:border-2 hover:border-white">
            Apply Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;
