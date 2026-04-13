import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { clearCart } from "../utilis/CartSlice";

const Checkout = () => {
  const CartItem = useSelector((store) => store?.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalOrder = CartItem.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  // Timeline Step (1: Address, 2: Payment, 3: Review)
  const [step, setStep] = useState(1);

  // Step 1 State: Address
  const [addr, setAddr] = useState({ name: "", email: "", phone: "", street: "", city: "", zip: "" });

  // Step 2 State: Payment
  const [paymentMethod, setPaymentMethod] = useState("card"); // card, paypal, upi, cash
  const [card, setCard] = useState({ name: "", num: "", exp: "", cvv: "" });
  const [paypal, setPaypal] = useState({ email: "", username: "" });
  const [upi, setUpi] = useState({ id: "" });

  const nextStep = () => setStep((s) => Math.min(3, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handlePlaceOrder = () => {
    const newOrder = {
      id: "ORD-" + Math.floor(Math.random() * 90000 + 10000),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      total: totalOrder,
      status: "Ordered",
      tracking: "TRK-" + Math.floor(Math.random() * 9000000 + 1000000),
      items: CartItem.map(i => ({ name: i.name, qty: i.quantity, price: i.price }))
    };

    const existingOrders = JSON.parse(localStorage.getItem("avi_orders") || "[]");
    localStorage.setItem("avi_orders", JSON.stringify([newOrder, ...existingOrders]));

    dispatch(clearCart());
    navigate("/order-success");
  };

  const isAddressValid = addr.name && addr.email && addr.phone && addr.street && addr.city && addr.zip;
  
  const isPaymentValid = () => {
    if (paymentMethod === "card") return card.name && card.num && card.exp && card.cvv;
    if (paymentMethod === "paypal") return paypal.email && paypal.username;
    if (paymentMethod === "upi") return upi.id;
    if (paymentMethod === "cash") return true; // always valid
    return false;
  };

  if (CartItem.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 px-4">
        <h1 className="text-3xl font-black text-white">Your cart is empty.</h1>
        <p className="text-slate-400 mb-4">Add some items before proceeding to checkout.</p>
        <button onClick={() => navigate("/shop")} className="btn-primary py-4 px-8">Return to Shop</button>
      </div>
    );
  }

  // --- Animation Variants ---
  const fadeInVariants = {
     hidden: { opacity: 0, x: 20 },
     visible: { opacity: 1, x: 0 },
     exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="max-w-[800px] w-full mx-auto pb-20 pt-8 px-4 min-h-screen">
      <h1 className="text-3xl md:text-5xl font-black text-white mb-2 pb-6 text-center tracking-tight">Checkout</h1>
      
      {/* Dynamic Timeline Indicator */}
      <div className="flex items-center justify-between relative mb-12 max-w-[500px] mx-auto px-4 mt-6">
         <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[80%] h-1 bg-white/10 -z-10 rounded-full" />
         <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((step - 1) / 2) * 80}%` }}
            className="absolute left-[10%] top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-400 to-amber-300 -z-10 rounded-full"
            transition={{ duration: 0.5, ease: "easeInOut" }}
         />

         {["Address", "Payment", "Review"].map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = step > stepNum;
            const isActive = step === stepNum;
            
            return (
               <div key={idx} className="flex flex-col items-center gap-3 relative z-10">
                 <motion.div 
                   animate={{ 
                     scale: isActive ? 1.1 : 1,
                     backgroundColor: isCompleted || isActive ? "#fbbf24" : "#1e293b",
                     borderColor: isCompleted || isActive ? "#fbbf24" : "#334155",
                     color: isCompleted || isActive ? "#0f172a" : "#64748b"
                   }}
                   className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold border-2 transition-colors duration-300 shadow-lg"
                 >
                   {isCompleted ? "✓" : stepNum}
                 </motion.div>
                 <span className={`absolute top-14 text-[10px] md:text-[11px] font-black uppercase tracking-widest whitespace-nowrap ${isActive ? "text-amber-400" : (isCompleted ? "text-slate-300" : "text-slate-600")}`}>
                   {label}
                 </span>
               </div>
            )
         })}
      </div>

      <div className="glass-panel w-full p-6 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden mt-8 border border-white/5">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: ADDRESS */}
          {step === 1 && (
             <motion.div key="step1" variants={fadeInVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                   <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">1</div>
                   <h2 className="text-2xl font-bold text-white tracking-wide">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                   <div className="col-span-1 md:col-span-2">
                     <label className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2 block ml-2">Full Name</label>
                     <input type="text" value={addr.name} onChange={e => setAddr({...addr, name: e.target.value})} className="w-full bg-slate-900/50 text-white px-5 py-4 rounded-2xl border border-white/5 focus:border-amber-400 outline-none transition-all focus:bg-slate-900" placeholder="Abinash Rout" />
                   </div>
                   
                   <div className="relative">
                     <label className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2 block ml-2">Email</label>
                     <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                       </div>
                       <input type="email" value={addr.email} onChange={e => setAddr({...addr, email: e.target.value})} className="w-full bg-slate-900/50 text-white pl-12 pr-5 py-4 rounded-2xl border border-white/5 focus:border-amber-400 outline-none transition-all focus:bg-slate-900" placeholder="john@example.com" />
                     </div>
                   </div>
                   
                   <div>
                     <label className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2 block ml-2">Phone</label>
                     <input type="text" value={addr.phone} onChange={e => setAddr({...addr, phone: e.target.value})} className="w-full bg-slate-900/50 text-white px-5 py-4 rounded-2xl border border-white/5 focus:border-amber-400 outline-none transition-all focus:bg-slate-900" placeholder="+91 8249281685" />
                   </div>

                   <div className="col-span-1 md:col-span-2 mt-2">
                     <label className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2 block ml-2">Street Address</label>
                     <input type="text" value={addr.street} onChange={e => setAddr({...addr, street: e.target.value})} className="w-full bg-slate-900/50 text-white px-5 py-4 rounded-2xl border border-white/5 focus:border-amber-400 outline-none transition-all focus:bg-slate-900" placeholder="123 Main St, Apt 4B" />
                   </div>

                   <div>
                     <label className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2 block ml-2">City & State</label>
                     <input type="text" value={addr.city} onChange={e => setAddr({...addr, city: e.target.value})} className="w-full bg-slate-900/50 text-white px-5 py-4 rounded-2xl border border-white/5 focus:border-amber-400 outline-none transition-all focus:bg-slate-900" placeholder="New York, NY" />
                   </div>
                   
                   <div>
                     <label className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2 block ml-2">ZIP / Postal Code</label>
                     <input type="text" value={addr.zip} onChange={e => setAddr({...addr, zip: e.target.value})} className="w-full bg-slate-900/50 text-white px-5 py-4 rounded-2xl border border-white/5 focus:border-amber-400 outline-none transition-all focus:bg-slate-900" placeholder="10001" />
                   </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                   <button onClick={nextStep} disabled={!isAddressValid} className="btn-primary py-4 px-10 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed">
                     Continue to Payment
                   </button>
                </div>
             </motion.div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 2 && (
             <motion.div key="step2" variants={fadeInVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                   <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">2</div>
                   <h2 className="text-2xl font-bold text-white tracking-wide">Payment Details</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                   {[
                     { id: "card", label: "Credit Card", icon: "https://tse4.mm.bing.net/th/id/OIP.VOMO352OP4axk11dPRMX2AHaB2?pid=Api&P=0&h=180" },
                     { id: "paypal", label: "PayPal", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
                     { id: "upi", label: "UPI", icon: "https://tse1.mm.bing.net/th/id/OIP.XG6pEDZc-vL2T9n3D8ZQKwHaEK?pid=Api&P=0&w=300&h=300" },
                     { id: "cash", label: "Cash on Delivery", icon: "https://tse2.mm.bing.net/th/id/OIP.S3t7sU48D6nJz1V2y9s_aAHaHa?pid=Api&P=0" }
                   ].map(method => (
                      <button 
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex flex-col items-center justify-center gap-3 py-6 px-2 rounded-2xl border-2 transition-all cursor-pointer ${
                          paymentMethod === method.id 
                            ? "bg-amber-400/10 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.15)]" 
                            : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                         <img src={method.icon} alt={method.label} className={`h-6 object-contain ${method.id === 'cash' ? 'invert opacity-80' : ''}`} />
                         <span className={`text-xs font-bold uppercase tracking-widest ${paymentMethod === method.id ? 'text-amber-400' : 'text-slate-400'}`}>{method.label}</span>
                      </button>
                   ))}
                </div>

                <div className="min-h-[220px]">
                   <AnimatePresence mode="wait">
                      {paymentMethod === "card" && (
                         <motion.div key="p-card" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="flex flex-col gap-4">
                            <input type="text" value={card.name} onChange={e=>setCard({...card, name: e.target.value})} placeholder="Cardholder Name" className="w-full bg-slate-900/50 text-white px-5 py-4 rounded-2xl border border-white/5 outline-none focus:border-amber-400 transition-all font-medium" />
                            <input type="text" value={card.num} onChange={e=>setCard({...card, num: e.target.value})} placeholder="Card Number (0000 0000 0000 0000)" className="w-full bg-slate-900/50 text-white px-5 py-4 rounded-2xl border border-white/5 outline-none focus:border-amber-400 transition-all font-mono" />
                            <div className="flex gap-4">
                               <input type="text" value={card.exp} onChange={e=>setCard({...card, exp: e.target.value})} placeholder="MM/YY" className="w-1/2 bg-slate-900/50 text-white px-5 py-4 rounded-2xl border border-white/5 outline-none focus:border-amber-400 transition-all font-mono" />
                               <input type="password" value={card.cvv} onChange={e=>setCard({...card, cvv: e.target.value})} placeholder="CVV" className="w-1/2 bg-slate-900/50 text-white px-5 py-4 rounded-2xl border border-white/5 outline-none focus:border-amber-400 transition-all font-mono" />
                            </div>
                         </motion.div>
                      )}
                      
                      {paymentMethod === "paypal" && (
                         <motion.div key="p-paypal" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="flex flex-col gap-4">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                              </div>
                              <input type="email" value={paypal.email} onChange={e=>setPaypal({...paypal, email: e.target.value})} placeholder="PayPal Email Address" className="w-full bg-slate-900/50 text-white pl-12 pr-5 py-4 rounded-2xl border border-white/5 outline-none focus:border-amber-400 transition-all font-medium" />
                            </div>
                            <input type="text" value={paypal.username} onChange={e=>setPaypal({...paypal, username: e.target.value})} placeholder="PayPal Username" className="w-full bg-slate-900/50 text-white px-5 py-4 rounded-2xl border border-white/5 outline-none focus:border-amber-400 transition-all font-medium" />
                         </motion.div>
                      )}

                      {paymentMethod === "upi" && (
                         <motion.div key="p-upi" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="flex flex-col gap-4">
                            <input type="text" value={upi.id} onChange={e=>setUpi({...upi, id: e.target.value})} placeholder="Enter VPA / UPI ID (e.g. name@bank)" className="w-full bg-slate-900/50 text-white px-5 py-4 rounded-2xl border border-white/5 outline-none focus:border-amber-400 transition-all font-medium" />
                            <p className="text-sm text-slate-400 mt-2 px-2">A payment request will be sent to this UPI ID upon placing the order.</p>
                         </motion.div>
                      )}

                      {paymentMethod === "cash" && (
                         <motion.div key="p-cash" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="flex flex-col items-center justify-center py-8 text-center bg-white/5 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-bold text-amber-400 mb-2">Pay on Delivery</h3>
                            <p className="text-slate-400">Please prepare the exact exact amount of ₹{totalOrder} in cash.</p>
                         </motion.div>
                      )}
                   </AnimatePresence>
                </div>

                <div className="flex justify-between pt-6 border-t border-white/10 mt-6">
                   <button onClick={prevStep} className="btn-ghost py-4 px-8 rounded-2xl border-white/10 hover:bg-white/5 text-slate-300">
                     Back
                   </button>
                   <button onClick={nextStep} disabled={!isPaymentValid()} className="btn-primary py-4 px-10 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed">
                     Review Order
                   </button>
                </div>
             </motion.div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 3 && (
             <motion.div key="step3" variants={fadeInVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                   <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">3</div>
                   <h2 className="text-2xl font-bold text-white tracking-wide">Final Review</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                   <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 relative">
                      <div className="absolute top-4 right-4 text-slate-500 hover:text-amber-400 cursor-pointer transition-colors flex items-center gap-1" onClick={() => setStep(1)}>
                         <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                         <span className="text-[10px] font-bold uppercase tracking-widest leading-none mt-[1px]">Edit</span>
                      </div>
                      <p className="text-xs text-amber-500 uppercase tracking-widest font-black mb-3">Shipping To</p>
                      <p className="font-bold text-white text-lg mb-1">{addr.name}</p>
                      <p className="text-slate-400 text-sm whitespace-pre-line leading-relaxed">
                         {addr.street}<br/>
                         {addr.city}, {addr.zip}<br/>
                         Contact: {addr.phone}
                      </p>
                   </div>
                   
                   <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 relative">
                      <div className="absolute top-4 right-4 text-slate-500 hover:text-amber-400 cursor-pointer transition-colors flex items-center gap-1" onClick={() => setStep(2)}>
                         <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                         <span className="text-[10px] font-bold uppercase tracking-widest leading-none mt-[1px]">Edit</span>
                      </div>
                      <p className="text-xs text-amber-500 uppercase tracking-widest font-black mb-3">Payment Method</p>
                      <h3 className="font-black text-white text-2xl uppercase tracking-wider mb-2">
                         {paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'paypal' ? 'PayPal' : paymentMethod === 'upi' ? 'UPI' : 'Cash'}
                      </h3>
                      <p className="text-slate-400 text-sm">
                         {paymentMethod === 'card' ? `Ending in ${card.num.slice(-4) || '****'}` : paymentMethod === 'paypal' ? paypal.email : paymentMethod === 'upi' ? upi.id : 'Pay at doorstep'}
                      </p>
                   </div>
                </div>

                <div className="bg-gradient-to-br from-amber-400/10 to-amber-500/5 border border-amber-400/20 p-8 rounded-3xl mb-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 shadow-inner">
                   <div>
                     <p className="text-sm font-black text-amber-400 uppercase tracking-widest mb-1">Total Order Value</p>
                     <p className="text-slate-300 text-xs font-semibold">{CartItem.length} item(s) • Free Shipping Applied</p>
                   </div>
                   <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter drop-shadow-lg">
                      ₹{totalOrder}
                   </h2>
                </div>

                <div className="flex justify-between pt-6 border-t border-white/10 mt-2">
                   <button onClick={prevStep} className="btn-ghost py-4 px-8 rounded-2xl border-white/10 hover:bg-white/5 text-slate-300">
                     Back
                   </button>
                   <button onClick={handlePlaceOrder} className="btn-primary py-4 px-10 md:px-14 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-900 text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transform hover:-translate-y-1 transition-all">
                     Place Order
                   </button>
                </div>
             </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default Checkout;
