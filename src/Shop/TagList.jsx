import React from "react";

const tagsList = [
  {
    link: "#",
    text: "envato",
  },
  {
    link: "#",
    text: "themeforest",
  },
  {
    link: "#",
    text: "codecanyon",
  },
  {
    link: "#",
    text: "videohive",
  },
  {
    link: "#",
    text: "audiojungle",
  },
  {
    link: "#",
    text: "3docean",
  },
  {
    link: "#",
    text: "envato",
  },
  {
    link: "#",
    text: "themeforest",
  },
  {
    link: "#",
    text: "codecanyon",
  },
];
const TagList = () => {
  return (
    <div className="mt-5 rounded-2xl glass-panel w-[340px] md:w-full md:ml-2.5">
      <h2 className="text-lg font-sans border-b border-white/10 p-2 text-white">
        Our Popular Tags
      </h2>
      <ul className="flex flex-row gap-3 flex-wrap p-3  ">
        {tagsList.map((item, index) => {
          return (
            <li
              className="p-1.5 border border-white/10 text-slate-200 rounded-lg hover:bg-amber-300 hover:text-slate-900 hover:font-semibold hover:border-amber-200 shadow hover:scale-95 ease-in hover:cursor-grab"
              key={index}
            >
              <a href={item.link}> {item.text}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TagList;
