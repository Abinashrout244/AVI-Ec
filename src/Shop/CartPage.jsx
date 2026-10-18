import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../Shop/CartProduct";
import HeroBanner from "../components/HeroBanner";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { clearCart } from "../utilis/CartSlice";
import items from "../products.json";
import { 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Trash2, 
  CheckCircle2, 
  Lock,
  ChevronDown,
  RotateCcw
} from "lucide-react";

const INDIAN_STATES = [
  "Telangana",
  "Maharashtra",
  "Karnataka",
  "Delhi",
  "Tamil Nadu",
  "Gujarat",
  "Uttar Pradesh",
  "West Bengal",
];

const CartPage = () => {
  const CartItem = useSelector((store) => store?.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);
  const selectedProduct = selectedItem
    ? items.find((p) => String(p.id) === String(selectedItem.id))
    : null;

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState(null);

  // Shipping calculation state
  const [selectedState, setSelectedState] = useState("Telangana");
  const [pincode, setPincode] = useState("");
  const [shippingCalculated, setShippingCalculated] = useState(false);

  const subtotal = CartItem.reduce((acc, curr) => {
    return acc + (curr.price || 0) * (curr.quantity || 1);
  }, 0);

  const totalItemsCount = CartItem.reduce((acc, curr) => acc + (curr.quantity || 1), 0);
  const finalTotal = Math.max(0, subtotal - discount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.toUpperCase() === "AVI10" || couponCode.toUpperCase() === "SAVE10") {
      const discountValue = Math.round(subtotal * 0.1);
      setDiscount(discountValue);
      setCouponMessage({ type: "success", text: "10% discount applied successfully!" });
    } else {
      setCouponMessage({ type: "error", text: "Invalid code. Try 'AVI10' for 10% off." });
    }
  };

  return (
    <div className="bg-[#03050C] min-h-screen text-slate-100 selection:bg-amber-400 selection:text-black">
      <HeroBanner title="Shopping Bag" page="Cart" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {CartItem.length === 0 ? (
          /* ── Empty Cart State ── */
          <div className="flex flex-col items-center justify-center text-center py-24 px-4 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
            <div className="w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-6 shadow-[0_0_30px_rgba(251,191,36,0.15)]">
              <ShoppingBag size={36} />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Your bag is currently empty
            </h1>
            <p className="mt-2 text-sm text-slate-400 max-w-sm leading-relaxed">
              Explore our hand-picked curated edits across electronics, luxury apparel, and home essentials.
            </p>
            <Link to="/shop" className="mt-8">
              <button className="flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-[0_10px_25px_rgba(251,191,36,0.35)] hover:shadow-[0_15px_35px_rgba(251,191,36,0.5)] transition-all active:scale-95">
                <span>Start Shopping</span>
                <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        ) : (
          /* ── Active Cart Layout ── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 8 Cols: Product Table and Cart Items */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Header Action Row */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Cart Items
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-bold">
                    {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <button
                  onClick={() => dispatch(clearCart())}
                  className="flex items-center gap-1.5 text-xs text-rose-400/80 hover:text-rose-400 transition-colors"
                >
                  <Trash2 size={13} />
                  <span>Clear Bag</span>
                </button>
              </div>

              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="col-span-6">Product Details</span>
                <span className="col-span-2 text-center">Price</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Subtotal</span>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-3">
                {CartItem.map((item, idx) => (
                  <CartProduct
                    {...item}
                    key={idx}
                    onClickProduct={() => setSelectedItem(item)}
                  />
                ))}
              </div>

              {/* Trust Badges Strip */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 mt-2">
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck size={16} className="text-amber-400" />
                  <span>100% Authentic</span>
                </div>
                <div className="flex items-center justify-center gap-2 border-x border-white/10">
                  <Truck size={16} className="text-amber-400" />
                  <span>Express Dispatch</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <RotateCcw size={16} className="text-amber-400" />
                  <span>7-Day Return</span>
                </div>
              </div>

              {/* Shipping Estimator Section */}
              <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl mt-4">
                <div className="flex items-center gap-2 mb-4">
                  <Truck size={16} className="text-amber-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Delivery Estimate
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <select
                      value="India"
                      disabled
                      className="w-full appearance-none px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white/70 outline-none"
                    >
                      <option className="bg-[#0b0f19]">India (Domestic)</option>
                    </select>
                  </div>

                  <div className="relative">
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full appearance-none px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-amber-400/50 cursor-pointer"
                    >
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state} className="bg-[#0b0f19]">
                          {state}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter 6-digit PIN"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-white/30 outline-none focus:border-amber-400/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShippingCalculated(true)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 border border-white/10 text-white transition-colors flex-shrink-0"
                    >
                      Check
                    </button>
                  </div>
                </div>

                {shippingCalculated && (
                  <p className="mt-3 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 size={13} />
                    <span>Eligible for Free Standard Express Delivery to <strong>{selectedState}</strong></span>
                  </p>
                )}
              </div>
            </div>

            {/* Right 4 Cols: Order Summary Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-28">
              <div className="p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col gap-6">
                
                <h3 className="text-lg font-bold text-white tracking-tight border-b border-white/10 pb-4">
                  Order Summary
                </h3>

                {/* Promo Code Box */}
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag size={12} className="text-amber-400" />
                    Promotional Voucher
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. AVI10"
                      className="w-full uppercase px-4 py-2.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 outline-none focus:border-amber-400/50 transition-all font-mono"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-slate-950 border border-white/10 hover:border-amber-400 text-xs font-bold text-white transition-all duration-200"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`text-[11px] mt-1 ${couponMessage.type === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </form>

                {/* Subtotals & Breakdowns */}
                <div className="flex flex-col gap-3 py-4 border-y border-white/10 text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Bag Subtotal</span>
                    <span className="font-semibold text-white">₹{subtotal.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center text-emerald-400">
                      <span>Promotional Discount (10%)</span>
                      <span className="font-semibold">- ₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-slate-400">
                    <span>Estimated Shipping</span>
                    <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
                      Free
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-400">
                    <span>Estimated Taxes & GST</span>
                    <span className="text-slate-500">Included</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block">
                      Total Payable
                    </span>
                    <span className="text-[10px] text-slate-500">All local taxes included</span>
                  </div>
                  <span className="text-2xl md:text-3xl font-black text-amber-300 tracking-tight">
                    ₹{finalTotal.toLocaleString()}
                  </span>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_25px_rgba(251,191,36,0.35)] hover:shadow-[0_0_35px_rgba(251,191,36,0.55)] transition-all duration-300 active:scale-[0.98]"
                >
                  <Lock size={14} />
                  <span>Secure Checkout</span>
                  <ArrowRight size={14} />
                </button>

                <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <span>256-bit encrypted checkout with bank-grade safety</span>
                </p>
              </div>
            </div>

          </div>
        )}
      </main>

      {/* ── Product Quick-View Modal ── */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        maxWidth="max-w-[760px]"
      >
        {selectedProduct && selectedItem && (
          <div className="flex flex-col md:flex-row gap-6 w-full text-slate-100 p-2">
            
            {/* Image Preview */}
            <div className="w-full md:w-1/2 aspect-square rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex items-center justify-center">
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="max-h-full max-w-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Info details */}
            <div className="w-full md:w-1/2 flex flex-col justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  {selectedProduct.seller || "Official Brand"}
                </span>

                <h3 className="text-xl font-bold text-white mt-2 leading-snug">
                  {selectedProduct.name}
                </h3>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-2xl font-black text-white">
                    ₹{selectedProduct.price?.toLocaleString()}
                  </span>
                  {selectedProduct.ratings && (
                    <span className="flex items-center gap-1 bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-xs font-bold">
                      {selectedProduct.ratings} ★
                    </span>
                  )}
                </div>

                {/* Selected Attributes */}
                {(selectedItem.size || selectedItem.color) && (
                  <div className="flex items-center gap-2 mt-4 text-xs">
                    {selectedItem.size && (
                      <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                        Size: <strong className="text-white">{selectedItem.size}</strong>
                      </span>
                    )}
                    {selectedItem.color && (
                      <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                        Color: <strong className="text-white">{selectedItem.color}</strong>
                      </span>
                    )}
                  </div>
                )}

                <p className="mt-4 text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {selectedProduct.description ||
                    "Experience top-tier quality with this product from our exclusive curated line."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 py-2.5 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/10 text-xs font-semibold text-white transition-colors"
                >
                  Close
                </button>
                <Link
                  to={`/shop/${selectedProduct.id}`}
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold text-center transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Product Details</span>
                  <ArrowRight size={13} />
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