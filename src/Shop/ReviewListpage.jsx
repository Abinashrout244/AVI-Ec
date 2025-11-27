import React, { useState } from "react";
import star from "../assets/icons/star.svg";
import img from "../assets/images/shop/01.jpg";
let ReviewList = [
  {
    imgUrl: "/src/assets/images/instructor/01.jpg",
    imgAlt: "Client thumb",
    name: "Ganelon Boileau",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/02.jpg",
    imgAlt: "Client thumb",
    name: "Morgana Cailot",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/03.jpg",
    imgAlt: "Client thumb",
    name: "Telford Bois",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/04.jpg",
    imgAlt: "Client thumb",
    name: "Cher Daviau",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
];
const ReviewListpage = () => {
  const [active, setActive] = useState("desc");

  return (
    <div className="bg-white pt-2 shadow shadow-slate-400">
      <ul className="flex flex-row justify-start gap-5 p-2">
        <li
          className={` text-white px-4 py-2 text-center hover:cursor-pointer w-[120px] ${
            active === "desc" ? " bg-orange-600" : "bg-blue-950"
          }`}
          onClick={() => {
            setActive("desc");
          }}
        >
          Description
        </li>
        <li
          className={` text-white px-4 py-2 text-center w-[120px] hover:cursor-pointer ${
            active === "review" ? " bg-orange-600" : "bg-blue-950"
          }`}
          onClick={() => {
            setActive("review");
          }}
        >
          Reviews 4
        </li>
      </ul>

      {active === "review" && (
        <ul className=" py-3">
          {ReviewList.map((item, index) => {
            return (
              <li
                key={index}
                className="flex flex-row gap-4 hover:brightness-90 hover:cursor-pointer items-start p-4 bg-white border-b border-b-slate-200  "
              >
                <img
                  src={item.imgUrl}
                  className="w-16 h-16 object-cover rounded-full border"
                  alt={item.imgAlt}
                />

                <div className="flex flex-col w-full gap-2">
                  <div className="flex flex-row justify-between items-start">
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>

                    <div className="text-orange-600 font-bold text-lg">
                      ★★★★☆
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {active === "desc" && (
        <div className="flex flex-col gap-10 p-5">
          <p>
            LOremEmmet Abbreviation Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Illum assumenda vitae iusto ea ut veritatis
            deserunt ullam optio perspiciatis velit aut exercitationem nam, quas
            aperiam asperiores consectetur nobis dignissimos accusantium?
            deserunt ullam optio perspiciatis velit aut exercitationem nam, quas
            aperiam asperiores consectetur nobis dignissimos accusantium?
          </p>
          <div className="flex flex-col gap-6 md:gap-0 md:flex-row justify-around">
            <ul>
              <li className="flex flex-row gap-1 items-center">
                <span className="text-orange-600 text-3xl">☆</span>Lorem ipsum
                dolor sit amet, consectetur adipisicing elit
              </li>
              <li className="flex flex-row gap-1 items-center">
                <span className="text-orange-600 text-3xl">☆</span>Lorem ipsum
                dolor sit amet, consectetur adipisicing elit
              </li>
              <li className="flex flex-row gap-1 items-center">
                <span className="text-orange-600 text-3xl">☆</span>Lorem ipsum
                dolor sit amet, consectetur elit
              </li>
              <li className="flex flex-row gap-1 items-center">
                <span className="text-orange-600 text-3xl">☆</span>Lorem ipsum
                dolor sit amet, adipisicing elit
              </li>
              <li className="flex flex-row gap-1 items-center">
                <span className="text-orange-600 text-3xl">☆</span>Lorem ipsum
                dolor sit adipisicing elit
              </li>
              <li className="flex flex-row gap-1 items-center">
                <span className="text-orange-600 text-3xl">☆</span>Lorem ipsum
                dolor sit amet, consectetur .
              </li>
            </ul>
            <img src={img} />
          </div>
          <p>
            LOremEmmet Abbreviation Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Illum assumenda vitae iusto ea ut veritatis
            deserunt ullam optio perspiciatis velit aut exercitationem nam, quas
            aperiam asperiores consectetur nobis dignissimos accusantium?
            deserunt ullam optio perspiciatis velit aut exercitationem nam, quas
            aperiam asperiores consectetur nobis dignissimos accusantium?
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewListpage;
