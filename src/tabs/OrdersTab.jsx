import { motion } from "framer-motion";

const OrdersTab = ({ activeTab, mockOrders }) => {


  return (
    <motion.div
      key="orders"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-2 h-8 rounded-full bg-amber-400 inline-block"></span>
        Order History
      </h2>
      <div className="glass-panel rounded-3xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-300">Order ID</th>
                <th className="px-6 py-4 font-semibold text-slate-300">Date</th>
                <th className="px-6 py-4 font-semibold text-slate-300">Total</th>
                <th className="px-6 py-4 font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-300 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                  <td className="px-6 py-4 text-slate-400">{order.date}</td>
                  <td className="px-6 py-4 font-bold text-amber-300">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'Delivered' ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' :
                      order.status === 'Shipped' ? 'bg-blue-400/10 text-blue-400 border border-blue-400/20' :
                      'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-bold text-slate-300 hover:text-white transition-colors">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default OrdersTab;
