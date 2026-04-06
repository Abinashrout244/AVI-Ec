import React, { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import blogList from "../utilis/blogdata";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { PrisonGuardIcon, Calendar03Icon } from "@hugeicons/core-free-icons";
const Blog = () => {
  const [bdata, setBdata] = useState(blogList);
  return (
    <div className="bg-transparent">
      <HeroBanner title="Blog Page" page="Blog" />
      <div className=" px-1 md:px-32 py-5 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          {bdata.map((item) => {
            return (
              <Link to={`/blog/${item.id}`} key={item.id}>
                <div className="glass-panel rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                  <img
                    src={item.imgUrl}
                    alt={item.imgAlt}
                    className="object-cover w-full h-56 hover:opacity-45 transition-all ease-in-out"
                  />

                  <div className="p-4 flex flex-col gap-3">
                    <h1 className="text-2xl font-bold text-white hover:text-amber-200">
                      {item.title}
                    </h1>

                    <div className="flex flex-row justify-between text-slate-300 text-sm">
                      <div className="flex flex-row items-center gap-2">
                        <span>
                          <HugeiconsIcon icon={PrisonGuardIcon} />
                        </span>
                        <p>{item.metaList[0].text}</p>
                      </div>

                      <div className="flex flex-row items-center gap-2">
                        <span>
                          <HugeiconsIcon icon={Calendar03Icon} />
                        </span>
                        <p>{item.metaList[1].text}</p>
                      </div>
                    </div>

                    <p className="text-[15px] text-slate-300 leading-relaxed hover:text-amber-200">
                      {item.desc}
                    </p>

                    <div className="flex flex-row justify-between items-center pt-3 border-t border-t-white/10">
                      <div className="flex flex-row gap-2 items-center">
                        <button className="flex flex-row gap-2 items-center text-amber-300 font-semibold hover:underline">
                          {item.btnText}
                        </button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-box-arrow-up-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                          />
                          <path
                            fillRule="evenodd"
                            d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                          />
                        </svg>
                      </div>

                      <button className="relative flex flex-row items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-chat-right-text"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
                          <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                        </svg>

                        <p className="absolute -top-2 -right-3 bg-amber-300 text-slate-900 text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                          {item.commentCount}
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
