import React, { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import Info from "../products.json";
import ShopCard from "./ShopCard";

import Pegination from "./Pegination";
import Search from "./Search";
import ShopCategory from "./ShopCategory";
import Suggestions from "./Suggestions";
import Popularpost from "./Popularpost";
import TagList from "./TagList";
import MotionSection from "../components/MotionSection";

const Shop = () => {
  const [gridlist, setGridList] = useState(true);
  const [products, setProducts] = useState(Info);

  const [currPage, setCurrPage] = useState(1);
  const productperpage = 9;
  const lastindex = currPage * productperpage;
  const firstindex = lastindex - productperpage;
  const currentProducts = products.slice(firstindex, lastindex);

  const peginate = (pagenum) => {
    setCurrPage(pagenum);
  };

  const [selectCategory, setSelectCategory] = useState("All");
  const filterCtaegory = (select) => {
    setSelectCategory(select);
    if (select === "All") {
      setProducts(Info);
    } else {
      const filtered = Info.filter((item) => item.category === select);
      setProducts(filtered);
    }
  };

  const [search, setSearch] = useState("");
  const filteredsearchproducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <HeroBanner title="Our Shop Page" page="Shop" />

      <div className="px-5 md:px-16 pb-16 flex flex-col md:flex-row gap-16">
        <MotionSection className="w-full md:w-1/4">
          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-5">
            <Search setSearch={setSearch} search={search} />

            <ShopCategory
              filterCtaegory={filterCtaegory}
              selectCategory={selectCategory}
            />

            <Suggestions
              search={search}
              filteredsearchproducts={filteredsearchproducts}
            />

            <Popularpost />

            <TagList />
          </div>
        </MotionSection>

        <MotionSection className="w-full md:w-3/4">
          <div className="flex flex-col gap-10">
            <div className="flex justify-between items-center text-slate-300">
              <p>Showing 01-12 of 139 Results</p>

              <div className="flex gap-3 text-white/70">
                <button
                  onClick={() => setGridList(!gridlist)}
                  className="p-2 rounded-full border border-white/10 hover:border-white/30 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-grid-3x3-gap-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm4 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm-9 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1zm4 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                  </svg>
                </button>

                <button
                  onClick={() => setGridList(!gridlist)}
                  className="p-2 rounded-full border border-white/10 hover:border-white/30 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-grid-1x2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 1H1v14h5zM9 1h5v5H9z" />
                    <path d="M9 8h5v7H9z" />
                  </svg>
                </button>
              </div>
            </div>

            <ShopCard products={currentProducts} gridlist={gridlist} />

            <div className="mb-10 flex justify-center">
              <Pegination
                productperpage={productperpage}
                totalproducts={products.length}
                currPage={currPage}
                peginate={peginate}
              />
            </div>
          </div>
        </MotionSection>
      </div>
    </div>
  );
};

export default Shop;
