import React, { useState } from "react";
import img from "../assets/images/shop/01.jpg";

const ReviewList = [
  {
    imgUrl:
      "https://tse1.mm.bing.net/th/id/OIP.jQc294WED8p75DlIKBgMNAHaE8?pid=Api&P=0&h=180",
    imgAlt: "Client thumb",
    name: "Ganelon Boileau",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl:
      "https://tse1.mm.bing.net/th/id/OIP.Mm74R6uzPdojftaEp3SvfgHaHa?pid=Api&P=0&h=180",
    imgAlt: "Client thumb",
    name: "Morgana Cailot",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl:
      "https://tse2.mm.bing.net/th/id/OIP.gzp3Wbpv3n9_8Ilr4i0TRwHaHa?pid=Api&P=0&h=180",
    imgAlt: "Client thumb",
    name: "Telford Bois",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/profileimage/avi.jpg",
    imgAlt: "Client thumb",
    name: "AVi",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "The Author! build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
];

const ReviewListpage = () => {
  const [active, setActive] = useState("desc");

  return (
    <div className="glass-panel rounded-3xl pt-2">
      <ul className="flex flex-row justify-start gap-5 p-2">
        <li
          className={`text-white px-4 py-2 text-center hover:cursor-pointer w-[120px] rounded-full ${
            active === "desc" ? "bg-amber-300 text-slate-900" : "bg-white/10"
          }`}
          onClick={() => {
            setActive("desc");
          }}
        >
          Description
        </li>
        <li
          className={`text-white px-4 py-2 text-center w-[120px] hover:cursor-pointer rounded-full ${
            active === "review" ? "bg-amber-300 text-slate-900" : "bg-white/10"
          }`}
          onClick={() => {
            setActive("review");
          }}
        >
          Reviews 4
        </li>
      </ul>

      {active === "review" && (
        <ul className="py-3">
          {ReviewList.map((item, index) => {
            return (
              <li
                key={index}
                className="flex flex-row gap-4 hover:brightness-110 hover:cursor-pointer items-start p-4 border-b border-white/10"
              >
                <img
                  src={item.imgUrl}
                  className="w-16 h-16 object-cover rounded-full border border-white/10"
                  alt={item.imgAlt}
                />

                <div className="flex flex-col w-full gap-2">
                  <div className="flex flex-row justify-between items-start">
                    <div className="flex flex-col">
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-slate-400">{item.date}</p>
                    </div>

                    <div className="text-amber-300 font-bold text-lg">
                      *****
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {active === "desc" && (
        <div className="flex flex-col gap-10 p-5 text-slate-300">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            assumenda vitae iusto ea ut veritatis deserunt ullam optio
            perspiciatis velit aut exercitationem nam, quas aperiam asperiores
            consectetur nobis dignissimos accusantium?
          </p>
          <div className="flex flex-col gap-6 md:gap-0 md:flex-row justify-around">
            <ul>
              {[
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet, consectetur elit",
                "Lorem ipsum dolor sit amet, adipisicing elit",
                "Lorem ipsum dolor sit adipisicing elit",
                "Lorem ipsum dolor sit amet, consectetur",
              ].map((line, idx) => (
                <li key={idx} className="flex flex-row gap-1 items-center">
                  <span className="text-amber-300 text-3xl">*</span>
                  {line}
                </li>
              ))}
            </ul>
            <img src={img} alt="product review" />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            assumenda vitae iusto ea ut veritatis deserunt ullam optio
            perspiciatis velit aut exercitationem nam, quas aperiam asperiores
            consectetur nobis dignissimos accusantium?
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewListpage;
