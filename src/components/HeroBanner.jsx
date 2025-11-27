import React from "react";
import { Link } from "react-router-dom";
import bgimg from "../assets/images/bg-img/01.jpg";
const HeroBanner = ({ title, page }) => {
  return (
    <div
      className="relative bg-cover bg-center gap-5 bg-no-repeat h-[60vh] flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: `url(${bgimg})`,
      }}
    >
      <h2 className="text-4xl font-semibold text-black">{title}</h2>
      <ul className="flex flex-row gap-3 text-gray-600 text-lg">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>/</li>
        <li>{page}</li>
      </ul>
    </div>
  );
};

export default HeroBanner;
