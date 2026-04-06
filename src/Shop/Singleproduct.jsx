import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import item from "../products.json";
import Popularpost from "../Shop/Popularpost";
import TagList from "./TagList";
import HeroBanner from "../components/HeroBanner";
import ProductCarDisplay from "./ProductCarDisplay";
import ReviewListpage from "./ReviewListpage";

export default function Singleproduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = item.find((p) => String(p.id) === String(id));
    setProduct(found);
  }, [id]);

  if (!product) {
    return <div className="text-center py-20 text-white">Loading product...</div>;
  }

  return (
    <div>
      <HeroBanner title="OUR SHOP SINGLE" page="Shop / Single Product" />

      <div className="grid grid-cols-1 md:grid-cols-3 p-6 md:p-12 gap-10 mt-6">
        <div className="col-span-2 flex flex-col gap-10">
          <div className="glass-panel rounded-3xl p-6 gap-12 flex flex-col md:flex-row md:h-[65vh]">
            <div className="flex items-center justify-center w-full">
              <img
                src={product.img}
                alt={product.name}
                className="w-[400px] h-full object-cover rounded-2xl"
              />
            </div>

            <ProductCarDisplay product={product} />
          </div>

          <ReviewListpage />
        </div>

        <div className="col-span-1 flex flex-col gap-8">
          <Popularpost />
          <TagList />
        </div>
      </div>
    </div>
  );
}
