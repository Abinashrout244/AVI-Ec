import React, { useEffect, useState } from "react";
import bg from "../assets/images/bg-banner/bg-banner.jpg";
import search from "../assets/icons/search-2.svg";
import Select from "../components/Select";
import Product from "../products.json";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
      <section className="relative h-[92vh] md:h-[88vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bg})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-950/90" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-4 md:px-32 space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold leading-tight"
          >
            Search your One from Thousands of Products
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full md:w-[640px] mx-auto"
          >
            <div className="glass-panel rounded-2xl px-4 py-3 flex md:flex-row flex-col items-center gap-2">
              <Select select={"all"} />

              <div className="flex flex-row flex-1">
                <input
                  type="text"
                  name="search"
                  value={searchText}
                  placeholder="Search premium collections"
                  className="bg-transparent border border-white/10 rounded-l-full px-4 py-2 w-full outline-none text-slate-100 placeholder:text-slate-400"
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button className="px-4 py-2 border border-white/10 rounded-r-full bg-white/10 hover:bg-white/20 transition">
                  <img src={search} alt="search_logo" className="size-6" />
                </button>
              </div>
            </div>

            {searchText && (
              <ul className="absolute left-0 right-0 top-full mt-3 glass-panel rounded-2xl max-h-40 md:max-h-64 overflow-y-auto z-10">
                {filterProducts.length > 0 ? (
                  filterProducts.map((item) => (
                    <Link to={`/shop/${item.id}`} key={item.id}>
                      <li className="px-4 py-3 text-slate-100 cursor-pointer hover:bg-white/10 transition-colors">
                        {item.name}
                      </li>
                    </Link>
                  ))
                ) : (
                  <li className="px-4 py-3 text-slate-400">No results found</li>
                )}
              </ul>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-slate-200"
          >
            {description}
          </motion.p>
        </motion.div>
      </section>
    </>
  );
};

export default Banner;
