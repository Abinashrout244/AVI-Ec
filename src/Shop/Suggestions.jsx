import React from "react";
import { Link } from "react-router-dom";
const Suggestions = ({ filteredsearchproducts, search }) => {
  return (
    <div className="mt-2 flex flex-col gap-3 pl-2">
      {search &&
        filteredsearchproducts.map((prod) => {
          return (
            <Link to={`/shop/${prod.id}`} key={prod.id}>
              <div className="flex flex-row gap-2 items-center bg-white/5 rounded-2xl p-2 border border-white/10">
                <img src={prod.img} className="object-cover size-12" />
                <h2 className="text-white">{prod.name}</h2>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Suggestions;
