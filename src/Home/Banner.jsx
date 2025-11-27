import React, { useEffect, useState } from "react";
import bg from "../assets/images/bg-banner/bg-banner.jpg";
import search from "../assets/icons/search-2.svg";
import Select from "../components/Select";
import Product from "../products.json";
import { Link } from "react-router-dom";

const Banner = () => {
  const description = "We have the Largest collections of products";
  const [searchText, setSearchText] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const data = Product;

  useEffect(() => {
    handlefilter();
  }, [searchText]);

  const handlefilter = () => {
    const filter = data.filter((prod) =>
      prod.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilterProducts(filter);
  };

  return (
    <>
      <div
        className="relative bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center justify-center text-white"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="text-center px-4 md:px-96 space-y-3">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">
            Search your One from Thousands of Products
          </h1>

          <div className="relative w-full md:w-[600px] mx-auto">
            <div className="flex md:flex-row flex-col items-center gap-2 bg-white shadow-md shadow-slate-600 rounded-md md:rounded-full px-6 py-2 w-full">
              <Select select={"all"} />

              <div className="flex flex-row flex-1">
                <input
                  type="text"
                  name="search"
                  value={searchText}
                  placeholder="Search..."
                  className="border border-gray-300 rounded-l-full px-4 py-2 w-full outline-none text-slate-700"
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button className="px-4 py-2 border border-gray-300 rounded-r-full">
                  <img src={search} alt="search_logo" className="size-6" />
                </button>
              </div>
            </div>

            {searchText && (
              <ul
                className="absolute left-0 right-0 top-full mt-2 bg-gray-200
                rounded-xl shadow-xl border border-gray-200 
               max-h-40 md:max-h-64 overflow-y-auto z-10"
              >
                {filterProducts.length > 0 ? (
                  filterProducts.map((item) => (
                    <Link to={`/shop/${item.id}`} key={item.id}>
                      {" "}
                      <li
                        className="px-4 py-3 text-gray-700 cursor-pointer 
                      hover:bg-slate-600/50 active:bg-slate-500
                      transition-colors"
                      >
                        {item.name}
                      </li>
                    </Link>
                  ))
                ) : (
                  <li className="px-4 py-3 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>

          <p className="text-lg mb-6">{description}</p>
        </div>
      </div>
    </>
  );
};

export default Banner;
