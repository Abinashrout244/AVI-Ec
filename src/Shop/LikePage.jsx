import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import { addItem } from "../utilis/CartSlice";
import { removeWishlist } from "../utilis/WishlistSlice";
import { addToast } from "../utilis/ToastSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, ExternalLink } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

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
        seller: item.seller || "Official Brand",
        size: "Standard",
        color: "Default",
      }),
    );
    dispatch(addToast({ type: "success", message: `"${item.name}" added to cart!` }));
  };

  const handleRemove = (id) => {
    dispatch(removeWishlist({ id }));
    dispatch(addToast({ type: "info", message: "Removed from wishlist" }));
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => {
      dispatch(
        addItem({
          id: item.id,
          name: item.name,
          img: item.img,
          price: item.price,
          seller: item.seller || "Official Brand",
          size: "Standard",
          color: "Default",
        })
      );
    });
    dispatch(addToast({ type: "success", message: "All liked products moved to cart!" }));
  };

  return (
    <div className="bg-[#03050C] min-h-screen text-slate-100 selection:bg-amber-400 selection:text-black">
      <HeroBanner title="Curated Wishlist" page="Saved Items" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {wishlistItems.length === 0 ? (
          /* ── Empty Wishlist State ── */
          <div className="flex flex-col items-center justify-center text-center py-24 px-4 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
            <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 shadow-[0_0_30px_rgba(244,63,94,0.15)]">
              <Heart size={36} className="fill-rose-500/20" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Your wishlist is currently empty
            </h1>
            
            <p className="mt-2 text-sm text-slate-400 max-w-sm leading-relaxed">
              Explore our boutique and tap the heart icon on any product to save it here for later.
            </p>

            <Link to="/shop" className="mt-8">
              <button className="flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-[0_10px_25px_rgba(251,191,36,0.35)] hover:shadow-[0_15px_35px_rgba(251,191,36,0.5)] transition-all active:scale-95">
                <span>Browse Collection</span>
                <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        ) : (
          /* ── Wishlist Active Grid ── */
          <div>
            {/* Header Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Saved Pieces
                </h2>
                <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                  <Sparkles size={12} />
                  {wishlistItems.length} {wishlistItems.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleMoveAllToCart}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 shadow-[0_4px_15px_rgba(251,191,36,0.3)] transition-all active:scale-95"
                >
                  <ShoppingBag size={14} />
                  <span>Move All to Bag</span>
                </button>
              </div>
            </div>

            {/* Product Cards Grid */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {wishlistItems.map((item) => {
                  const mrp = Math.round((item.price || 0) * 1.3);
                  return (
                    <motion.div
                      layout
                      variants={itemAnim}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={item.id}
                      className="group relative flex flex-col rounded-3xl overflow-hidden bg-slate-900/40 border border-white/[0.08] hover:border-amber-400/30 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
                    >
                      {/* Image Block */}
                      <div className="relative aspect-square overflow-hidden bg-[#070b14]">
                        <Link to={`/shop/${item.id}`} className="block w-full h-full">
                          <img
                            src={item.img}
                            alt={item.name}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        </Link>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-[#03050C]/80 via-transparent to-transparent pointer-events-none" />

                        {/* Category Pill */}
                        <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                          {item.category || "Curation"}
                        </span>

                        {/* Remove / Unlike Floating Trigger */}
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          aria-label="Remove from wishlist"
                          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 hover:bg-rose-500/20 text-white/70 hover:text-rose-400 border border-white/10 hover:border-rose-500/40 backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-90"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Content & Actions */}
                      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                        <div>
                          {item.seller && (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                              {item.seller}
                            </span>
                          )}

                          <Link to={`/shop/${item.id}`}>
                            <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 hover:text-amber-300 transition-colors">
                              {item.name}
                            </h3>
                          </Link>

                          {/* Pricing Row */}
                          <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-base font-black text-amber-300">
                              ₹{Number(item.price || 0).toLocaleString()}
                            </span>
                            <span className="text-xs text-slate-500 line-through">
                              ₹{mrp.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">
                              Save 25%
                            </span>
                          </div>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex items-center gap-2 pt-3 border-t border-white/[0.08]">
                          <Link
                            to={`/shop/${item.id}`}
                            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white transition-colors"
                            title="Quick View"
                          >
                            <ExternalLink size={15} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleAddToCart(item)}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-white/[0.06] hover:bg-amber-400 hover:text-slate-950 border border-white/10 hover:border-amber-400 transition-all duration-200 active:scale-[0.98] shadow-sm"
                          >
                            <ShoppingBag size={14} />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

      </main>
    </div>
  );
};

export default LikePage;