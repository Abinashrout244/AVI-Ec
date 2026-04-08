import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import { addItem } from "../utilis/CartSlice";
import { removeWishlist } from "../utilis/WishlistSlice";
import { addToast } from "../utilis/ToastSlice";

const LikePage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((store) => store?.wishlist?.items || []);

  const handleAddToCart = (item) => {
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        img: item.img,
        price: item.price,
        seller: item.seller,
        size: "Standard",
        color: "Default",
      }),
    );
    dispatch(addToast({ type: "success", message: "Added to cart" }));
  };

  return (
    <div className="space-y-10">
      <HeroBanner title="Liked Products" page="Like Page" />

      {wishlistItems.length === 0 ? (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center gap-6 px-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            No liked products yet.
          </h1>
          <Link to="/shop">
            <button className="btn-primary">Browse products</button>
          </Link>
        </div>
      ) : (
        <div className="px-3 md:px-14 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="lux-card overflow-hidden flex flex-col">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 flex flex-col gap-2 flex-1">
                  <p className="text-white/40 text-[11px] uppercase tracking-widest">
                    {item.category || "Wishlist"}
                  </p>
                  <h3 className="text-white font-semibold text-base leading-snug">
                    {item.name}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
                    <p className="text-amber-300 font-bold text-lg">
                      INR {Number(item.price || 0).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          dispatch(removeWishlist({ id: item.id }));
                          dispatch(addToast({ type: "info", message: "Removed from likes" }));
                        }}
                        className="btn-ghost text-[10px] px-3 py-2"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="btn-primary text-[10px] px-3 py-2"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LikePage;
