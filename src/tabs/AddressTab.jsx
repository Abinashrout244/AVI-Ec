import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

const AddressTab = ({ activeTab, mockAddresses, setMockAddresses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({ type: "", address: "", default: false });

  const handleAddClick = () => {
    setEditData(null);
    setFormData({ type: "", address: "", default: false });
    setIsModalOpen(true);
  };

  const handleEditClick = (addr) => {
    setEditData(addr);
    setFormData({ type: addr.type, address: addr.address, default: addr.default });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updated = mockAddresses.filter((a) => a.id !== id);
    // If we deleted the default address and there are others, we could assign a new default.
    // For simplicity, we just delete it here.
    setMockAddresses(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editData) {
      let newAddresses = mockAddresses.map((a) => 
        a.id === editData.id ? { ...a, ...formData } : a
      );
      if (formData.default) {
        newAddresses = newAddresses.map((a) => 
          a.id !== editData.id ? { ...a, default: false } : a
        );
      }
      setMockAddresses(newAddresses);
    } else {
      const newId = Date.now(); // Simple ID generation
      let newAddresses = [...mockAddresses, { id: newId, ...formData }];
      if (formData.default || newAddresses.length === 1) {
        newAddresses = newAddresses.map((a) => 
          a.id !== newId ? { ...a, default: false } : { ...a, default: true }
        );
      }
      setMockAddresses(newAddresses);
    }
    setIsModalOpen(false);
  };

  return (
    <motion.div
      key="address"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="w-2 h-8 rounded-full bg-amber-400 inline-block"></span>
          Address Book
        </h2>
        <button 
          onClick={handleAddClick}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm font-bold transition-all"
        >
          + Add New
        </button>
      </div>
      
      {mockAddresses.length === 0 ? (
        <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center py-16">
          <p className="text-slate-400 text-sm">No addresses saved yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockAddresses.map((addr) => (
            <div key={addr.id} className="glass-panel p-6 rounded-2xl border border-white/5 relative group hover:border-amber-400/30 transition-all">
              {addr.default && (
                <span className="absolute top-4 right-4 bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">DEFAULT</span>
              )}
              <h4 className="text-lg font-bold text-white mb-2">{addr.type}</h4>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-[80%]">{addr.address}</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleEditClick(addr)}
                  className="text-xs font-semibold text-slate-300 hover:text-white pb-1 border-b border-white/20 hover:border-white transition-all"
                >
                  <Edit />
                  </button>
                <button 
                  onClick={() => handleDelete(addr.id)}
                  className="text-xs font-semibold text-rose-400 hover:text-rose-300 pb-1 border-b border-rose-400/30 hover:border-rose-400 transition-all"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#03050C]/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-panel p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-amber-400 inline-block"></span>
                {editData ? "Edit Address" : "Add New Address"}
              </h3>
              
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Location Type</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. Home, Office" 
                    value={formData.type} 
                    onChange={(e) => setFormData({...formData, type: e.target.value})} 
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm text-white focus:bg-white/5" 
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Address</label>
                  <textarea 
                    required 
                    rows="3" 
                    placeholder="Enter full address details" 
                    value={formData.address} 
                    onChange={(e) => setFormData({...formData, address: e.target.value})} 
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm text-white resize-none focus:bg-white/5" 
                  />
                </div>
                
                <label className="flex items-center gap-3 cursor-pointer pt-2 group w-max">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      checked={formData.default} 
                      onChange={(e) => setFormData({...formData, default: e.target.checked})} 
                      className="peer h-4 w-4 appearance-none rounded border border-white/20 bg-transparent transition-all checked:bg-amber-400 checked:border-amber-400 cursor-pointer" 
                    />
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-[#03050C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Set as default address</span>
                </label>

                <div className="flex justify-end gap-3 pt-6 border-t border-white/10 mt-6">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-amber-400 text-black font-bold text-sm rounded-xl hover:bg-amber-300 transition-colors shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddressTab;
