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
    <div className="mt-5  shadow shadow-gray-300 rounded-sm bg-white  border border-slate-300 w-[340px] md:w-full md:ml-2.5  ">
      <h2 className="text-lg font-sans border-b border-b-slate-300 p-2">
        Our Popular Tags
      </h2>
      <ul className="flex flex-row gap-3 flex-wrap p-3  ">
        {tagsList.map((item, index) => {
          return (
            <li
              className="p-1.5 border hover:bg-rose-600 hover:text-white hover:font-semibold hover:border-0  border-slate-500 rounded-lg shadow shadow-gray-500 hover:scale-95 ease-in hover:cursor-grab"
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
