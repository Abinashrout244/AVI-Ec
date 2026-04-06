import React from "react";
import HeroBanner from "../components/HeroBanner";
import img1 from "../assets/images/about/01.jpg";
import img2 from "../assets/images/about/02.jpg";

const desc =
  "Distinctively provide acces mutfuncto users whereas transparent proceses somes ncentivize eficient functionalities rather than extensible archtectur communicate leveraged services and cross-platform.";

const aboutList = [
  {
    imgUrl: "https://cdn-icons-png.freepik.com/512/6997/6997674.png",
    imgAlt: "about icon rajibraj91 rajibraj",
    title: "Skilled Instructors",
    desc: "Distinctively provide acces mutfuncto users whereas communicate leveraged services",
  },
  {
    imgUrl:
      "https://tse4.mm.bing.net/th/id/OIP.QDFEuIKmXssCtMlXzPqbfgHaH0?pid=Api&P=0&h=180",
    imgAlt: "about icon rajibraj91 rajibraj",
    title: "Get Certificate",
    desc: "Distinctively provide acces mutfuncto users whereas communicate leveraged services",
  },
  {
    imgUrl:
      "https://tse3.mm.bing.net/th/id/OIP.ahyJaS8whsyYidcD3vvpdQAAAA?pid=Api&P=0&h=180",
    imgAlt: "about icon rajibraj91 rajibraj",
    title: "Online Classes",
    desc: "Distinctively provide acces mutfuncto users whereas communicate leveraged services",
  },
];

const About = () => {
  return (
    <div className="bg-transparent">
      <HeroBanner title={"About Our Brand"} page={"About"} />
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 md:px-36 pt-35 pb-5 gap-14">
        {/* left */}
        <div>
          <div className="glass-panel p-2 w-fit relative rounded-2xl">
            <img src={img1} />

            <div className="bg-amber-300 flex flex-col justify-center items-center w-[100px] p-2 h-[120px] border-8 border-slate-900/60 absolute bottom-0 left-0 rounded-tr-2xl">
              <p className="text-4xl text-center text-white font-semibold">
                30+
              </p>
              <p className="text-white text-center">Years of Experience</p>
            </div>
          </div>

          <div className="glass-panel p-2 md:w-fit relative md:-right-[340px] md:-top-[250px] mt-3 md:mt-0 rounded-2xl">
            <img src={img2} className="w-full" />
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col gap-3 text-white">
          <h2 className="text-xl text-amber-200">ABOUT OUR BRAND</h2>
          <p className="text-2xl md:text-3xl font-semibold">
            Good Qualification Services And Better Expriences
          </p>
          <p className="text-slate-300">{desc}</p>
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
                    <h2 className="text-xl font-semibold text-white">
                      {item.title}
                    </h2>
                    <p className="text-slate-300">{item.desc}</p>
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
