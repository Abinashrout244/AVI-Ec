import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroBanner from "../components/HeroBanner";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthProvider";
import { getStorageKey } from "../utilis/Persistence";
import NoOrders from "../components/NoOrders";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Calendar, 
  CreditCard, 
  MapPin, 
  ShieldCheck, 
  Copy, 
  Check 
} from "lucide-react";

/* ── Order Status Timeline Component ── */
const OrderTimeline = ({ status }) => {
  const steps = [
    { label: "Ordered", desc: "Payment Confirmed" },
    { label: "Processed", desc: "Packed & Sealed" },
    { label: "Shipped", desc: "Handed to Courier" },
    { label: "Delivered", desc: "Arrived at Doorstep" },
  ];

  const currentIdx = steps.findIndex((s) => s.label.toLowerCase() === (status || "").toLowerCase());
  const activeIndex = currentIdx === -1 ? 0 : currentIdx;

  return (
    <div className="w-full py-6 px-2 sm:px-6">
      <div className="relative flex items-center justify-between">
        
        {/* Base Timeline Track */}
        <div className="absolute left-6 right-6 top-5 -translate-y-1/2 h-1 bg-white/10 rounded-full z-0" />
        
        {/* Animated Progress Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${(activeIndex / (steps.length - 1)) * 88}%`,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-6 top-5 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 rounded-full z-0 shadow-[0_0_15px_rgba(251,191,36,0.5)] origin-left"
        />

        {steps.map((step, idx) => {
          const isCompleted = idx <= activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div key={idx} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.15 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                  isCompleted
                    ? "bg-amber-400 border-amber-300 text-slate-950 shadow-[0_0_18px_rgba(251,191,36,0.4)]"
                    : "bg-[#0b101d] border-white/10 text-slate-500"
                } ${isCurrent ? "ring-4 ring-amber-400/25 scale-105" : ""}`}
              >
                {isCompleted ? <CheckCircle2 size={18} className="stroke-[2.5]" /> : idx + 1}
              </motion.div>

              <div className="text-center mt-3">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider block ${
                    isCurrent
                      ? "text-amber-300"
                      : isCompleted
                      ? "text-white"
                      : "text-slate-500"
                  }`}
                >
                  {step.label}
                </span>
                <span className="hidden sm:block text-[10px] text-slate-500 mt-0.5">
                  {step.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Main Orders Component ── */
const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mockOrders, setMockOrders] = useState([]);
  const [copiedId, setCopiedId] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const orderKey = getStorageKey("avi_orders", user);
    const stored = JSON.parse(localStorage.getItem(orderKey) || "[]");
    setMockOrders(stored);
  }, [user]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="bg-[#03050C] min-h-screen text-slate-100 selection:bg-amber-400 selection:text-black">
      <HeroBanner title="My Orders" page="Purchase History" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Header Action Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Order History
            </h2>
            <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold">
              {mockOrders.length} {mockOrders.length === 1 ? "Order" : "Orders"}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Buyer Protection Guaranteed</span>
          </div>
        </div>

        {mockOrders.length === 0 ? (
          <NoOrders />
        ) : (
          <div className="flex flex-col gap-5">
            {mockOrders.map((order, i) => {
              const isDelivered = order.status === "Delivered";
              const itemCount = order.items?.reduce((acc, curr) => acc + (curr.qty || 1), 0) || 0;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedOrder(order)}
                  className="group relative rounded-3xl bg-slate-900/40 hover:bg-slate-900/60 border border-white/[0.08] hover:border-amber-400/30 backdrop-blur-2xl p-6 sm:p-7 cursor-pointer transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-amber-400/[0.03] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                    
                    {/* Left: Identification & Primary Product */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Package size={22} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-400">
                            {order.id}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Calendar size={12} className="text-amber-400/70" />
                            {order.date}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors mt-1 truncate">
                          {order.items?.[0]?.name || "Purchased Goods"}
                        </h3>

                        <p className="text-xs text-slate-400 mt-0.5">
                          {order.items?.length > 1
                            ? `+ ${order.items.length - 1} additional items (${itemCount} total units)`
                            : `Quantity: ${order.items?.[0]?.qty || 1} unit`}
                        </p>
                      </div>
                    </div>

                    {/* Right: Price, Status Badge, Details CTA */}
                    <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto pt-4 lg:pt-0 border-t border-white/[0.06] lg:border-t-0">
                      <div className="text-left lg:text-right">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                          Total Amount
                        </span>
                        <span className="text-lg sm:text-xl font-black text-amber-300">
                          ₹{Number(order.total || 0).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                            isDelivered
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                              : "bg-amber-400/10 text-amber-300 border-amber-400/25 shadow-[0_0_12px_rgba(251,191,36,0.15)]"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isDelivered ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
                          {order.status || "Processing"}
                        </span>

                        <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 group-hover:border-amber-400/40 group-hover:bg-amber-400/10 flex items-center justify-center text-slate-400 group-hover:text-amber-300 transition-all">
                          <ExternalLink size={14} />
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* ── Order Detail & Tracking Modal ── */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        maxWidth="max-w-[760px]"
      >
        {selectedOrder && (
          <div className="flex flex-col text-slate-100 p-2 sm:p-4">
            
            {/* Modal Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                    Order Overview
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400">{selectedOrder.date}</span>
                </div>
                
                <h3 className="text-2xl font-black text-white mt-1 flex items-center gap-2">
                  {selectedOrder.id}
                  <button
                    onClick={() => handleCopy(selectedOrder.id)}
                    title="Copy Order ID"
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedId ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </h3>
              </div>

              {/* Courier Tracking Tag */}
              <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-right">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  Tracking Waybill
                </p>
                <p className="text-xs font-mono font-bold text-amber-300 mt-0.5">
                  {selectedOrder.tracking || "TRK-98241029"}
                </p>
              </div>
            </div>

            {/* Visual Shipment Timeline Stage */}
            <div className="my-6 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Shipment Progress
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-400">
                  Standard Courier Express
                </span>
              </div>
              <OrderTimeline status={selectedOrder.status} />
            </div>

            {/* Itemized Receipt Breakdown */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Purchased Items ({selectedOrder.items?.length || 0})
              </span>

              <div className="divide-y divide-white/[0.06] border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden max-h-56 overflow-y-auto no-scrollbar">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3.5 min-w-0 pr-4">
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-xl border border-white/10 bg-slate-900 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-500 flex-shrink-0">
                          <Package size={20} />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">{item.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Qty: <strong className="text-slate-200">{item.qty || 1}</strong>
                          {item.size ? ` • Size: ${item.size}` : ""}
                          {item.color ? ` • Color: ${item.color}` : ""}
                        </p>
                      </div>
                    </div>

                    <span className="text-sm font-bold text-amber-300 flex-shrink-0">
                      ₹{((item.price || 0) * (item.qty || 1)).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Summary Footer */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400/10 via-amber-400/5 to-transparent border border-amber-400/20 flex items-center justify-between mb-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                  Total Paid
                </span>
                <span className="text-[11px] text-slate-500">Taxes & Shipping included</span>
              </div>
              <span className="text-2xl font-black text-amber-300">
                ₹{Number(selectedOrder.total || 0).toLocaleString()}
              </span>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white transition-colors"
              >
                Close Details
              </button>
            </div>

          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrdersPage;