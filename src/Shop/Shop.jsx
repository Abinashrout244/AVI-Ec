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
    <div>
      <HeroBanner title="Our Shop Page" page="Shop" />

      <div className="px-5 md:px-16 pt-14 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/4 flex flex-col gap-5">
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

        <div className="w-full md:w-3/4 flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <p>Showing 01-12 of 139 Results</p>

            <div className="flex gap-3">
              <button onClick={() => setGridList(!gridlist)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-grid-3x3-gap-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2a1 1 ..." />
                </svg>
              </button>

              <button onClick={() => setGridList(!gridlist)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-grid-1x2"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 1H1v14h5zM9 1h5v5H9z" />
                </svg>
              </button>
            </div>
          </div>

          {/* PRODUCTS */}
          <ShopCard products={currentProducts} gridlist={gridlist} />

          {/* PAGINATION */}
          <div className="mb-10 flex justify-center">
            <Pegination
              productperpage={productperpage}
              totalproducts={products.length}
              currPage={currPage}
              peginate={peginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
