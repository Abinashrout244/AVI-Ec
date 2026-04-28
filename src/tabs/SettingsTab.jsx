import { motion } from "framer-motion";

const SettingsTab = ({ activeTab, user }) => {


  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-2 h-8 rounded-full bg-amber-400 inline-block"></span>
        Account Settings
      </h2>
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">First Name</label>
              <input placeholder="Abinash" type="text" defaultValue={user?.displayName ? user.displayName.split(' ')[0] : ''} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
              <input placeholder="Rout" type="text" defaultValue={user?.displayName ? user.displayName.split(' ')[1] || '' : ''} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <input type="email" defaultValue={user?.email || ''} readOnly className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 outline-none cursor-not-allowed text-sm text-slate-400" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
            <input type="tel" placeholder="+91 1234567890" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm text-white" />
          </div>
          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button className="px-6 py-3 bg-amber-400 text-black font-bold text-sm rounded-xl hover:bg-amber-300 transition-colors shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SettingsTab;
