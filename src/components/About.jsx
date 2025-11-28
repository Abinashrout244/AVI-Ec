import React from "react";
import HeroBanner from "../components/HeroBanner";
import img1 from "../assets/images/about/01.jpg";
import img2 from "../assets/images/about/02.jpg";

const desc =
  "Distinctively provide acces mutfuncto users whereas transparent proceses somes ncentivize eficient functionalities rather than extensible archtectur communicate leveraged services and cross-platform.";

const aboutList = [
  {
    imgUrl: "/src/assets/images/about/icon/01.jpg",
    imgAlt: "about icon rajibraj91 rajibraj",
    title: "Skilled Instructors",
    desc: "Distinctively provide acces mutfuncto users whereas communicate leveraged services",
  },
  {
    imgUrl: "/src/assets/images/about/icon/02.jpg",
    imgAlt: "about icon rajibraj91 rajibraj",
    title: "Get Certificate",
    desc: "Distinctively provide acces mutfuncto users whereas communicate leveraged services",
  },
  {
    imgUrl: "/src/assets/images/about/icon/03.jpg",
    imgAlt: "about icon rajibraj91 rajibraj",
    title: "Online Classes",
    desc: "Distinctively provide acces mutfuncto users whereas communicate leveraged services",
  },
];

const About = () => {
  return (
    <div className="bg-yellow-50">
      <HeroBanner title={"About Our Brand"} page={"About"} />
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 md:px-36 pt-35 pb-5 gap-14">
        {/* left */}
        <div>
          <div className="bg-white p-2 w-fit relative">
            <img src={img1} />

            <div className="bg-orange-600 flex flex-col justify-center items-center w-[100px] p-2 h-[120px] border-8 border-white absolute bottom-0 left-0">
              <p className="text-4xl text-center text-white font-semibold">
                30+
              </p>
              <p className="text-white text-center">Years of Experience</p>
            </div>
          </div>

          <div className="bg-white p-2 md:w-fit relative md:-right-[340px] md:-top-[250px] mt-3 md:mt-0">
            <img src={img2} className="w-full" />
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl">ABOUT OUR BRAND</h2>
          <p className="text-2xl md:text-3xl font-semibold">
            Good Qualification Services And Better Expriences
          </p>
          <p>{desc}</p>
          <ul className="flex flex-col gap-5 mt-6">
            {aboutList.map((item, index) => {
              return (
                <li className="flex flex-row gap-1 items-center" key={index}>
                  <img
                    src={item.imgUrl}
                    alt={item.imgAlt}
                    className="rounded-full size-16"
                  />
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p>{item.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
