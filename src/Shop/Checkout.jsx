import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { clearCart } from "../utilis/CartSlice";
import { AuthContext } from "../context/AuthProvider";
import { getStorageKey } from "../utilis/Persistence";
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Edit2,
  Banknote,
  Smartphone,
  ShoppingBag
} from "lucide-react";

const fadeInVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 }
};

const Checkout = () => {
  const CartItem = useSelector((store) => store?.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const totalOrder = CartItem.reduce((acc, curr) => acc + (curr.price || 0) * (curr.quantity || 1), 0);
  const totalItemCount = CartItem.reduce((acc, curr) => acc + (curr.quantity || 1), 0);

  // Stepper State (1: Shipping, 2: Payment, 3: Review)
  const [step, setStep] = useState(1);

  // Form States
  const [addr, setAddr] = useState({ name: "", email: "", phone: "", street: "", city: "", zip: "" });
  const [paymentMethod, setPaymentMethod] = useState("upi"); // upi, card, paypal, cash
  const [card, setCard] = useState({ name: "", num: "", exp: "", cvv: "" });
  const [paypal, setPaypal] = useState({ email: "" });
  const [upi, setUpi] = useState({ id: "" });

  const nextStep = () => setStep((s) => Math.min(3, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const isAddressValid = Boolean(
    addr.name.trim() && 
    addr.email.trim() && 
    addr.phone.trim() && 
    addr.street.trim() && 
    addr.city.trim() && 
    addr.zip.trim()
  );

  const isPaymentValid = () => {
    if (paymentMethod === "card") {
      return card.name.trim() && card.num.trim().length >= 15 && card.exp.trim() && card.cvv.trim();
    }
    if (paymentMethod === "paypal") return paypal.email.trim();
    if (paymentMethod === "upi") return upi.id.trim().includes("@");
    if (paymentMethod === "cash") return true;
    return false;
  };

  const handlePlaceOrder = () => {
    const newOrder = {
      id: "ORD-" + Math.floor(Math.random() * 90000 + 10000),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      total: totalOrder,
      status: "Ordered",
      tracking: "TRK-" + Math.floor(Math.random() * 9000000 + 1000000),
      items: CartItem.map((i) => ({ 
        name: i.name, 
        qty: i.quantity || 1, 
        price: i.price, 
        img: i.img,
        size: i.size,
        color: i.color
      })),
      shippingAddress: addr,
      paymentSummary: {
        method: paymentMethod,
        ref: paymentMethod === "card" ? `•••• ${card.num.slice(-4)}` : paymentMethod === "upi" ? upi.id : "Cash on Delivery"
      }
    };

    const orderKey = getStorageKey("avi_orders", user);
    const existingOrders = JSON.parse(localStorage.getItem(orderKey) || "[]");
    localStorage.setItem(orderKey, JSON.stringify([newOrder, ...existingOrders]));

    dispatch(clearCart());
    navigate("/order-success");
  };

  if (CartItem.length === 0) {
    return (
      <div className="bg-[#03050C] min-h-screen text-slate-100 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-20 h-20 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-amber-400 mb-6 shadow-xl">
          <ShoppingBag size={34} />
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Your bag is empty</h1>
        <p className="text-slate-400 text-sm max-w-sm mt-2 mb-8 leading-relaxed">
          Please add items to your cart before proceeding through checkout.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)]"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#03050C] min-h-screen text-slate-100 selection:bg-amber-400 selection:text-black pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Security Assurance */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-white/[0.08]">
          <Link to="/cart-page" className="group flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Bag</span>
          </Link>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
            <Lock size={12} />
            <span>Encrypted 256-Bit SSL Checkout</span>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        <div className="max-w-md mx-auto relative mb-12 px-6">
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-white/10 -z-0" />
          <motion.div
            className="absolute left-8 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 -z-0 origin-left"
            animate={{ width: `${((step - 1) / 2) * 78}%` }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />

          <div className="flex items-center justify-between relative z-10">
            {[
              { num: 1, label: "Shipping" },
              { num: 2, label: "Payment" },
              { num: 3, label: "Review" },
            ].map(({ num, label }) => {
              const isDone = step > num;
              const isCurrent = step === num;
              return (
                <div key={num} className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                      isDone
                        ? "bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.35)]"
                        : isCurrent
                        ? "bg-amber-400 text-slate-950 ring-4 ring-amber-400/20 font-black shadow-lg"
                        : "bg-slate-900 border border-white/10 text-slate-500"
                    }`}
                  >
                    {isDone ? <CheckCircle2 size={16} /> : num}
                  </div>
                  <span
                    className={`mt-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
                      isCurrent ? "text-amber-300" : isDone ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Main Layout: Form (Left) & Live Order Summary (Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Flow Container */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="rounded-3xl border border-white/[0.08] bg-slate-900/40 backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <AnimatePresence mode="wait">
                
                {/* ── STEP 1: SHIPPING ADDRESS ── */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                      <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Delivery Details</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Where should we deliver your order?</p>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">Step 1 of 3</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <label className="font-semibold text-slate-300 mb-1.5 block">Full Recipient Name *</label>
                        <input
                          type="text"
                          required
                          value={addr.name}
                          onChange={(e) => setAddr({ ...addr, name: e.target.value })}
                          placeholder="e.g. Abinash Rout"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-amber-400/60 focus:bg-white/[0.06] transition-all"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-300 mb-1.5 block">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={addr.email}
                          onChange={(e) => setAddr({ ...addr, email: e.target.value })}
                          placeholder="name@domain.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-amber-400/60 focus:bg-white/[0.06] transition-all"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-300 mb-1.5 block">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={addr.phone}
                          onChange={(e) => setAddr({ ...addr, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-amber-400/60 focus:bg-white/[0.06] transition-all"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-semibold text-slate-300 mb-1.5 block">Street Address & Landmark *</label>
                        <input
                          type="text"
                          required
                          value={addr.street}
                          onChange={(e) => setAddr({ ...addr, street: e.target.value })}
                          placeholder="Flat / House No., Building Name, Street"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-amber-400/60 focus:bg-white/[0.06] transition-all"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-300 mb-1.5 block">City & State *</label>
                        <input
                          type="text"
                          required
                          value={addr.city}
                          onChange={(e) => setAddr({ ...addr, city: e.target.value })}
                          placeholder="e.g. Bhubaneswar, Odisha"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-amber-400/60 focus:bg-white/[0.06] transition-all"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-300 mb-1.5 block">PIN / Postal Code *</label>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          value={addr.zip}
                          onChange={(e) => setAddr({ ...addr, zip: e.target.value })}
                          placeholder="6-digit PIN"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-amber-400/60 focus:bg-white/[0.06] transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-8 mt-6 border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!isAddressValid}
                        className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.45)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: PAYMENT METHOD ── */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                      <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Payment Method</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Select a verified payment gateway</p>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">Step 2 of 3</span>
                    </div>

                    {/* Method Selector Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {[
                        { id: "upi", label: "Instant UPI", icon: Smartphone },
                        { id: "card", label: "Card", icon: CreditCard },
                        { id: "paypal", label: "PayPal", icon: Lock },
                        { id: "cash", label: "COD", icon: Banknote },
                      ].map(({ id, label, icon: Icon }) => {
                        const isSelected = paymentMethod === id;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setPaymentMethod(id)}
                            className={`flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-2xl border transition-all text-xs font-bold ${
                              isSelected
                                ? "bg-amber-400/10 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                                : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]"
                            }`}
                          >
                            <Icon size={20} className={isSelected ? "text-amber-400" : "text-slate-400"} />
                            <span className="tracking-wide uppercase text-[10px]">{label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Dynamic Gateway Inputs */}
                    <div className="min-h-[170px] p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-6">
                      <AnimatePresence mode="wait">
                        {paymentMethod === "upi" && (
                          <motion.div key="upi" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
                            <label className="text-xs font-semibold text-slate-300 block">Virtual Payment Address (VPA / UPI ID) *</label>
                            <input
                              type="text"
                              value={upi.id}
                              onChange={(e) => setUpi({ id: e.target.value })}
                              placeholder="e.g. yourname@oksbi or mobile@paytm"
                              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder:text-white/20 outline-none focus:border-amber-400/60"
                            />
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                              Open your UPI app (Google Pay, PhonePe, Paytm) to approve the collect prompt after placing the order.
                            </p>
                          </motion.div>
                        )}

                        {paymentMethod === "card" && (
                          <motion.div key="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-2 gap-3 text-xs">
                            <div className="col-span-2">
                              <label className="font-semibold text-slate-300 mb-1 block">Cardholder Name *</label>
                              <input
                                type="text"
                                value={card.name}
                                onChange={(e) => setCard({ ...card, name: e.target.value })}
                                placeholder="Name printed on card"
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-amber-400/60"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="font-semibold text-slate-300 mb-1 block">Card Number *</label>
                              <input
                                type="text"
                                maxLength={19}
                                value={card.num}
                                onChange={(e) => setCard({ ...card, num: e.target.value })}
                                placeholder="4000 1234 5678 9010"
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-amber-400/60 font-mono"
                              />
                            </div>
                            <div>
                              <label className="font-semibold text-slate-300 mb-1 block">Expiry *</label>
                              <input
                                type="text"
                                maxLength={5}
                                value={card.exp}
                                onChange={(e) => setCard({ ...card, exp: e.target.value })}
                                placeholder="MM/YY"
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-amber-400/60 font-mono text-center"
                              />
                            </div>
                            <div>
                              <label className="font-semibold text-slate-300 mb-1 block">CVV *</label>
                              <input
                                type="password"
                                maxLength={4}
                                value={card.cvv}
                                onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                                placeholder="•••"
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-amber-400/60 font-mono text-center"
                              />
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === "paypal" && (
                          <motion.div key="paypal" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
                            <label className="text-xs font-semibold text-slate-300 block">PayPal Verified Email Address *</label>
                            <input
                              type="email"
                              value={paypal.email}
                              onChange={(e) => setPaypal({ email: e.target.value })}
                              placeholder="account@paypal.com"
                              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder:text-white/20 outline-none focus:border-amber-400/60"
                            />
                            <p className="text-[11px] text-slate-400">
                              You will be prompted to authenticate through PayPal's secure gateway on the next step.
                            </p>
                          </motion.div>
                        )}

                        {paymentMethod === "cash" && (
                          <motion.div key="cash" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="py-4 text-center">
                            <p className="text-sm font-bold text-amber-300 mb-1">Cash on Delivery Available</p>
                            <p className="text-xs text-slate-400 max-w-sm mx-auto">
                              Please keep ₹{totalOrder.toLocaleString()} in exact currency ready for the courier upon arrival.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 rounded-xl border border-white/10 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!isPaymentValid()}
                        className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.45)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <span>Review Order</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: REVIEW & PLACE ORDER ── */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                      <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Review & Confirm</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Verify your details before placing the order</p>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">Step 3 of 3</span>
                    </div>

                    {/* Verification Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* Shipping Summary */}
                      <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="absolute top-4 right-4 text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <Edit2 size={12} />
                          <span>Edit</span>
                        </button>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Ship To</span>
                        <p className="text-sm font-bold text-white">{addr.name}</p>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {addr.street}<br />
                          {addr.city}, {addr.zip}<br />
                          Phone: {addr.phone}
                        </p>
                      </div>

                      {/* Payment Summary */}
                      <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="absolute top-4 right-4 text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <Edit2 size={12} />
                          <span>Edit</span>
                        </button>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Payment Method</span>
                        <p className="text-sm font-bold text-white uppercase">{paymentMethod}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {paymentMethod === "card" && `Card ending in •••• ${card.num.slice(-4)}`}
                          {paymentMethod === "upi" && `VPA: ${upi.id}`}
                          {paymentMethod === "paypal" && paypal.email}
                          {paymentMethod === "cash" && "Pay in cash at doorstep"}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 rounded-xl border border-white/10 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={handlePlaceOrder}
                        className="flex items-center gap-2 px-10 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-[0_0_25px_rgba(52,211,153,0.35)] hover:shadow-[0_0_35px_rgba(52,211,153,0.5)] transition-all active:scale-[0.98]"
                      >
                        <ShieldCheck size={16} />
                        <span>Confirm & Place Order</span>
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Sticky Live Cart Summary */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-white/[0.08] bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-7 shadow-xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-bold text-white text-base">Order Details</h3>
                <span className="text-xs text-slate-400">{totalItemCount} items</span>
              </div>

              {/* Item Previews list */}
              <div className="divide-y divide-white/[0.05] max-h-60 overflow-y-auto no-scrollbar my-4 pr-1">
                {CartItem.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg border border-white/10 bg-black/40 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{item.name}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Qty: {item.quantity || 1} {item.size ? `• Size: ${item.size}` : ""}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-amber-300">
                      ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">₹{totalOrder.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Taxes</span>
                  <span className="text-slate-500">Included</span>
                </div>
              </div>

              {/* Final Amount */}
              <div className="flex items-baseline justify-between pt-5 mt-4 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total</span>
                <span className="text-2xl font-black text-amber-300 tracking-tight">
                  ₹{totalOrder.toLocaleString()}
                </span>
              </div>

              {/* Delivery Promise */}
              <div className="mt-5 p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 text-[11px] text-slate-400">
                <Truck size={14} className="text-amber-400 flex-shrink-0" />
                <span>Express courier dispatch within 24 hours</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;