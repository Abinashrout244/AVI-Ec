import { motion } from "framer-motion";

const PaymentTab = ({ activeTab }) => {


  return (
    <motion.div
      key="payment"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-8 rounded-full bg-amber-400 inline-block"></span>
          Payment Methods
        </h2>
        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm font-bold transition-all">
          + Add Card
        </button>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center py-16">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <div className="w-10 h-7 border-2 border-slate-400 rounded-md relative opacity-50">
            <div className="absolute top-2 left-0 right-0 h-[2px] bg-slate-400"></div>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">No Saved Cards</h3>
        <p className="text-slate-400 text-sm max-w-sm">
          You haven't saved any payment methods yet. Add a credit or debit card for faster checkout.
        </p>
      </div>
    </motion.div>
  );
};

export default PaymentTab;
