import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../Shop/CartProduct";
import HeroBanner from "../components/HeroBanner";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { clearCart } from "../utilis/CartSlice";
import items from "../products.json";

const CartPage = () => {
  const CartItem = useSelector((store) => store?.cart?.items);
  const dispatch = useDispatch();
  const totalOrder = CartItem.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const [selectedItem, setSelectedItem] = useState(null);
  const selectedProduct = selectedItem ? items.find((p) => String(p.id) === String(selectedItem.id)) : null;

  const navigate = useNavigate();



  return (
    <div className="space-y-10">
      <HeroBanner title="Shop Cart" page="Cart Page" />

      {CartItem.length === 0 ? (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center gap-6 px-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Your cart is feeling a little light.
          </h1>
          <Link to="/shop">
            <button className="btn-primary">Start shopping</button>
          </Link>
        </div>
      ) : (
        <div
          className={`px-3 md:px-14 mt-8 md:mt-16 pb-10 ${
            selectedItem ? "brightness-75" : ""
          }`}
        >
          <div className="hidden md:grid grid-cols-5 font-semibold text-sm p-3 glass-panel text-white items-center text-center rounded-2xl shadow-lg">
            <h2 className="text-start pl-8">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Total</h2>
            <h2>Edit</h2>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {CartItem.map((item, idx) => {
              return <CartProduct {...item} key={idx} onClickProduct={() => setSelectedItem(item)} />;
            })}
          </div>
        </div>
      )}

      <div
        className={`px-3 md:px-14 pb-16 ${
          selectedItem ? "brightness-75 transition-all" : "transition-all"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-3xl p-6 flex flex-col gap-5">
            <div className="flex flex-row gap-2">
              <input
                type="text"
                className="py-2 px-3 border border-white/10 bg-transparent text-white rounded-full flex-1 outline-none placeholder:text-slate-400"
                placeholder="Coupon Code"
              />
              <button className="btn-primary">Apply</button>
            </div>
            <div className="flex flex-col gap-5 w-full">
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                Calculate Shipping
              </h2>

              <select className="w-full py-2 pl-3 border border-white/10 rounded-full text-white bg-transparent focus:border-amber-300 outline-none">
                <option className="text-slate-900">India</option>
                <option className="text-slate-900">Africa</option>
                <option className="text-slate-900">America</option>
                <option className="text-slate-900">Bangalore</option>
              </select>

              <div className="flex flex-col md:flex-row gap-4 w-full">
                <select className="w-full py-2 pl-3 border border-white/10 rounded-full text-white bg-transparent focus:border-amber-300 outline-none">
                  <option className="text-slate-900">India</option>
                  <option className="text-slate-900">Africa</option>
                  <option className="text-slate-900">America</option>
                  <option className="text-slate-900">Bangalore</option>
                </select>

                <input
                  type="text"
                  placeholder="Post / ZIP"
                  className="w-full py-2 px-3 border border-white/10 rounded-full bg-transparent text-white focus:border-amber-300 outline-none placeholder:text-slate-400"
                />
              </div>

              <button className="btn-ghost w-fit">Update Total</button>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-end items-center">
              <button className="btn-ghost w-full sm:w-auto">Update cart</button>

              <button
                onClick={() => navigate("/checkout")}
                className="btn-primary w-full sm:w-auto"
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                Order Summary
              </h2>
              <div className="px-4 flex flex-row justify-between items-center border border-white/10 py-3 rounded-2xl">
                <p className="text-slate-300">Cart Subtotal</p>
                <h2 className="text-amber-200 font-semibold">
                  INR {totalOrder}
                </h2>
              </div>
              <div className="px-4 flex flex-row justify-between items-center border border-white/10 py-3 rounded-2xl">
                <p className="text-slate-300">Shipping and Handling</p>
                <h2 className="text-amber-200 font-semibold">Free Shipping</h2>
              </div>
              <div className="px-4 flex flex-row justify-between items-center border border-white/10 py-3 rounded-2xl">
                <p className="text-slate-300">Order Total</p>
                <h2 className="text-amber-200 font-semibold">
                  INR {totalOrder}.00
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} maxWidth="max-w-[800px]">
        {selectedProduct && selectedItem && (
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 w-full text-white">
            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-white/5 rounded-2xl p-4 md:p-8 flex items-center justify-center border border-white/10">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="max-w-full max-h-[250px] md:max-h-[350px] object-contain drop-shadow-2xl" />
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
               <div>
                 <span className="inline-block bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold tracking-widest text-xs px-2.5 py-1 rounded-full uppercase mb-3 shadow-[0_0_10px_rgba(251,191,36,0.1)]">
                   {selectedProduct.seller}
                 </span>
                 <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-slate-400">
                   {selectedProduct.name}
                 </h2>
               </div>
               
               <div className="flex items-center gap-3 mt-1">
                 <span className="text-3xl md:text-4xl font-black tracking-tight">₹{selectedProduct.price}</span>
                 {selectedProduct.ratings && (
                   <div className="flex items-center bg-amber-400/20 border border-amber-400/30 px-2 py-1 rounded text-amber-400 text-xs font-bold ml-2">
                     {selectedProduct.ratings} <svg className="w-3 h-3 ml-1 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.572-.955L10 0l2.94 5.955 6.572.955-4.756 4.635 1.122 6.545z"/></svg>
                   </div>
                 )}
               </div>

               {/* Size and Color Selection */}
               {(selectedItem.size || selectedItem.color) && (
                 <div className="flex gap-4 mt-2">
                   {selectedItem.size && (
                     <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex flex-col shadow-inner">
                       <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-0.5">Size</span>
                       <span className="text-base font-black text-white">{selectedItem.size}</span>
                     </div>
                   )}
                   {selectedItem.color && (
                     <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex flex-col shadow-inner">
                       <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-0.5">Color</span>
                       <span className="text-base font-black text-white">{selectedItem.color}</span>
                     </div>
                   )}
                 </div>
               )}

               <div className="h-px w-full bg-white/10 my-1" />
               
               <div className="flex flex-col gap-1.5">
                  <h3 className="text-sm font-semibold text-slate-300">Description</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-h-[120px] overflow-y-auto custom-scrollbar pr-2">
                    {selectedProduct.description || "Experience top-tier quality with this premium product from our exclusive collection. Crafted for durability and style, it perfectly meets your everyday needs."}
                  </p>
               </div>
               
               <div className="mt-4 flex gap-4 w-full">
                 <button onClick={() => setSelectedItem(null)} className="btn-ghost flex-1 py-3.5 border-white/20 hover:bg-white/10">Close</button>
                 <Link to={`/shop/${selectedProduct.id}`} className="btn-primary flex-1 text-center py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 border-none shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)]">
                   View Full Page
                 </Link>
               </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CartPage;
