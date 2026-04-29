import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../utilis/ToastSlice";

const SettingsTab = ({ user }) => {
  const dispatch = useDispatch();
  const profileKey = user ? `avi_user_profile_${user.uid}` : "avi_user_profile_guest";

  // Initialize state from localStorage or user object
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(profileKey);
      if (saved) {
        setFormData(JSON.parse(saved));
      } else {
        setFormData({
          firstName: user.displayName ? user.displayName.split(" ")[0] : "",
          lastName: user.displayName ? user.displayName.split(" ").slice(1).join(" ") : "",
          phone: "",
          email: user.email || "",
        });
      }
    }
  }, [user, profileKey]);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem(profileKey, JSON.stringify(formData));
    dispatch(addToast({ message: "Profile saved to local storage!", type: "success" }));
  };

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
        <form className="space-y-6" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                First Name
              </label>
              <input
                placeholder="First Name"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Last Name
              </label>
              <input
                placeholder="Last Name"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 outline-none cursor-not-allowed text-sm text-slate-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 1234567890"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm text-white"
            />
          </div>
          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-amber-400 text-black font-bold text-sm rounded-xl hover:bg-amber-300 transition-colors shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SettingsTab;
