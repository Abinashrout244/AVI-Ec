import {motion} from "framer-motion";
const OverView = ({activeTab,orderStats,mockOrders,setActiveTab})=>{


    return (
        <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 rounded-full bg-amber-400 inline-block"></span>
                    Dashboard Overview
                  </h2>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {orderStats.map((stat, idx) => (
                      <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center hover:border-amber-400/30 transition-colors">
                        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">{stat.value}</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 mt-2 font-semibold">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity Mini */}
                  <div className="glass-panel p-6 rounded-3xl border border-white/5 mt-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold">Recent Orders</h3>
                      <button onClick={() => setActiveTab("orders")} className="text-xs text-amber-400 hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                      {mockOrders.slice(0,2).map((order, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                          <div>
                            <p className="font-bold text-sm tracking-wide">{order.id}</p>
                            <p className="text-xs text-slate-400 mt-1">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm text-white">{order.total}</p>
                            <p className={`text-xs font-semibold mt-1 ${order.status === 'Delivered' ? 'text-emerald-400' : 'text-amber-400'}`}>
                              {order.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
    );
}
export default OverView;