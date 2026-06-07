import React, { useState } from "react";
import { motion } from "framer-motion";
import HeroBanner from "../components/HeroBanner";
import Modal from "./Modal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { getStorageKey } from "../utilis/Persistence";
import NoOrders from "../components/NoOrders";

const OrderTimeline = ({ status }) => {
  const steps = ["Ordered", "Processed", "Shipped", "Delivered"];
  const currentIdx = steps.indexOf(status);

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 -z-10 rounded-full" />
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${(Math.max(0, currentIdx) / (steps.length - 1)) * 100}%`,
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-amber-400 -z-10 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)]"
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx <= currentIdx;
          const isActive = idx === currentIdx;
          return (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 relative"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.2 }}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 ${isCompleted ? "bg-amber-400 text-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.6)]" : "bg-slate-800 text-slate-500 border-2 border-slate-700"}`}
              >
                {isCompleted ? "✓" : idx + 1}
              </motion.div>
              <span
                className={`absolute top-12 md:top-14 text-[10px] md:text-xs font-bold ${isActive ? "text-amber-400" : isCompleted ? "text-slate-200" : "text-slate-600"} uppercase tracking-widest text-center whitespace-nowrap`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mockOrders, setMockOrders] = useState([]);
  const { user } = useContext(AuthContext);

  React.useEffect(() => {
    const orderKey = getStorageKey("avi_orders", user);
    const stored = JSON.parse(localStorage.getItem(orderKey) || "[]");
    setMockOrders(stored);
  }, [user]);

  return (
    <div className="space-y-10 min-h-screen">
      <HeroBanner title="My Orders" page="Purchase History" />
      <div className="max-w-[1100px] mx-auto px-4 pb-20 mt-10">
        {mockOrders.length === 0 ? (
          <NoOrders />
        ) : (
          <div className="flex flex-col gap-6">
            {mockOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.01, y: -2 }}
                onClick={() => setSelectedOrder(order)}
                className="glass-panel p-6 md:p-8 rounded-3xl cursor-pointer hover:border-amber-400/30 transition-all border border-white/5 shadow-lg group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/0 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 relative z-10 w-full">
                  <div className="w-full xl:w-1/3 flex-shrink-0">
                    <p className="text-xs md:text-sm text-slate-400 tracking-wider uppercase mb-1">
                      Order ID
                    </p>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                      {order.id}
                    </h3>
                    <div className="text-sm font-medium text-slate-300 line-clamp-1 md:line-clamp-2 pr-4">
                      {order.items?.length > 0 ? (
                        <span className="text-amber-400 font-bold">
                          {order.items[0].name}
                        </span>
                      ) : (
                        "Unknown Items"
                      )}
                      {order.items?.length > 1 && (
                        <span className="text-slate-400 ml-1 font-bold">
                          {" "}
                          + {order.items.length - 1} more items
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full flex-1">
                    <div>
                      <p className="text-xs md:text-sm text-slate-400 tracking-wider uppercase mb-1">
                        Date
                      </p>
                      <p className="font-semibold text-white text-sm md:text-base">
                        {order.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-slate-400 tracking-wider uppercase mb-1">
                        Total
                      </p>
                      <p className="font-black text-lg md:text-xl text-amber-300">
                        ₹{order.total}
                      </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end w-full md:w-auto mt-2 md:mt-0">
                      <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold mb-2 md:hidden">
                        Status
                      </p>
                      <span
                        className={`px-4 py-2 text-xs md:text-sm font-black rounded-xl border ${order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]" : "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]"}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        maxWidth="max-w-[800px]"
      >
        {selectedOrder && (
          <div className="flex flex-col text-white w-full relative">
            <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
                  Order Details
                </h2>
                <p className="text-slate-400 font-mono mt-1 mb-1">
                  ID: {selectedOrder.id}
                </p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                  Date: {selectedOrder.date}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold mb-1">
                  Tracking ID
                </p>
                <p className="text-sm font-mono text-white">
                  {selectedOrder.tracking || "Pending"}
                </p>
              </div>
            </div>

            {/* Visual Tracking Timeline */}
            <div className="bg-slate-900/40 rounded-3xl p-6 md:p-8 mb-8 border border-white/5 shadow-inner">
              <div className="flex items-center gap-3 mb-8">
                <svg
                  className="w-5 h-5 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <h3 className="font-extrabold text-white tracking-widest text-sm uppercase">
                  Shipment Tracking
                </h3>
              </div>
              <div className="pb-8">
                <OrderTimeline status={selectedOrder.status} />
              </div>
            </div>

            {/* Receipt Grid */}
            <h3 className="font-extrabold text-slate-300 tracking-widest text-sm uppercase mb-4 px-2">
              Order Items
            </h3>
            <div className="flex flex-col gap-0 bg-slate-900/60 rounded-2xl border border-white/10 overflow-hidden shadow-lg">
              {selectedOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-white mb-1">
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                      Qty: <span className="text-white">{item.qty}</span>
                    </span>
                  </div>
                  <span className="font-black text-lg text-slate-200">
                    ₹{item.price}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center p-6 bg-amber-400/5 border-t border-amber-400/20">
                <span className="font-black text-xl text-slate-200 uppercase tracking-wider">
                  Total
                </span>
                <span className="font-black text-3xl text-amber-400 drop-shadow-md">
                  ₹{selectedOrder.total}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="btn-ghost mt-8 py-4 border-white/10 hover:bg-white/5 text-slate-300 font-bold tracking-widest uppercase"
            >
              Close Details
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrdersPage;
