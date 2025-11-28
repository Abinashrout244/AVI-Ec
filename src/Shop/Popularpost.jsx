import React from "react";
import { Link } from "react-router-dom";

const postList = [
  {
    id: 1,
    imgUrl:
      "https://tse1.mm.bing.net/th/id/OIP.elhNKszD_-QhuhwbJtbUZgHaE8?pid=Api&P=0&h=180",
    imgAlt: "rajibraj91",
    title: "Poor People Campaign Our Resources",
    date: "Jun 05,2022",
  },
  {
    id: 2,
    imgUrl:
      "https://tse2.mm.bing.net/th/id/OIP.rnHni72jK4d5bnZ2HS_A2QHaE7?pid=Api&P=0&h=180",
    imgAlt: "rajibraj91",
    title: "Poor Peoples Campaign Our Resources",
    date: "Jun 05,2022",
  },
  {
    id: 3,
    imgUrl:
      "https://tse2.mm.bing.net/th/id/OIP.TlMoTQmv8bp92N_EqxhymwHaE8?pid=Api&P=0&h=180",
    imgAlt: "rajibraj91",
    title: "Poor Peoples Campaign Our Resources",
    date: "Jun 05,2022",
  },
  {
    id: 4,
    imgUrl:
      "https://tse2.mm.bing.net/th/id/OIP.5IxaIVOZsNsNctnwLfePxAHaE8?pid=Api&P=0&h=180",
    imgAlt: "rajibraj91",
    title: "Poor Peoples Campaign Our Resources",
    date: "Jun 05,2022",
  },
];

const Popularpost = () => {
  return (
    <div className="w-[340px] md:w-full shadow bg-white shadow-gray-300 rounded-sm border border-slate-300 md:ml-2.5">
      <h2 className="text-lg md:text-xl font-sans border-b border-b-slate-300 p-3">
        Most Popular Posts
      </h2>

      <ul>
        {postList.map((item) => (
          <Link to={`/blog/${item.id}`} key={item.id}>
            <li
              className="flex items-center gap-3 
                         p-2 md:p-3 
                         border-b border-b-slate-300 
                         hover:bg-black/10 transition"
            >
              <img
                src={item.imgUrl}
                alt={item.imgAlt}
                className="object-cover w-16 h-16 md:w-20 md:h-20 rounded"
              />

              <div className="flex flex-col gap-1 flex-1">
                <h2 className="text-base md:text-lg font-semibold line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                  {item.date}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Popularpost;
