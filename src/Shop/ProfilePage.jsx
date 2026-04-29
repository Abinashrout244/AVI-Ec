import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utilis/CartSlice";
import { clearWishlist } from "../utilis/WishlistSlice";
import { addToast } from "../utilis/ToastSlice";
import UserAvatar from "../components/UserAvatar";
import AddressTab from "../tabs/AddressTab";
import OrdersTab from "../tabs/OrdersTab";
import SettingsTab from "../tabs/SettingsTab";
import PaymentTab from "../tabs/PaymentTab";
import OverView from "../tabs/OverView";
import { 
  ShoppingBag, 
  Heart, 
  Award, 
  Settings, 
  MapPin, 
  CreditCard, 
  LogOut, 
  ChevronRight,
  Mail,
  Calendar,
  LogIn,
  Edit3,
  User,
  ShieldCheck
} from "lucide-react";

const ProfilePage = () => {
  const { user, logOut, loading, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const [isUpdating, setIsUpdating] = useState(false);
  const [newName, setNewName] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // User-Specific Keys
  const addressKey = user ? `avi_addresses_${user.uid}` : "avi_addresses_guest";
  const profileKey = user ? `avi_user_profile_${user.uid}` : "avi_user_profile_guest";
  const ordersKey = user ? `avi_orders_${user.uid}` : "avi_orders_guest";

  // Address Persistence
  const [mockAddresses, setMockAddresses] = useState([]);

  useEffect(() => {
    if (user) {
      // Load Profile Name
      const savedProfile = localStorage.getItem(profileKey);
      if (savedProfile) {
        const data = JSON.parse(savedProfile);
        setNewName(`${data.firstName} ${data.lastName}`.trim());
      } else {
        setNewName(user.displayName || "");
      }

      // Load Addresses
      const savedAddresses = localStorage.getItem(addressKey);
      setMockAddresses(savedAddresses ? JSON.parse(savedAddresses) : [
        { id: 1, type: "Home", address: "123 Galaxy Way, Star City, NY 10001", default: true },
      ]);
    }
  }, [user, addressKey, profileKey]);

  useEffect(() => {
    if (user && mockAddresses.length > 0) {
      localStorage.setItem(addressKey, JSON.stringify(mockAddresses));
    }
  }, [mockAddresses, addressKey, user]);

  const handleLogout = async () => {
    try {
      await logOut();
      dispatch(clearCart());
      dispatch(clearWishlist());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleUpdateName = async () => {
    if (!newName.trim()) return;
    setIsUpdating(true);
    try {
      await updateUserProfile(newName, user.photoURL);
      
      const names = newName.split(" ");
      const firstName = names[0] || "";
      const lastName = names.slice(1).join(" ") || "";
      
      localStorage.setItem(profileKey, JSON.stringify({
        firstName,
        lastName,
        email: user.email,
        phone: JSON.parse(localStorage.getItem(profileKey) || "{}").phone || ""
      }));

      dispatch(addToast({ message: "Profile updated successfully!", type: "success" }));
    } catch (error) {
      console.error("Update profile error:", error);
      dispatch(addToast({ message: "Failed to update profile.", type: "error" }));
    } finally {
      setIsUpdating(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0603] flex items-center justify-center p-8">
        <div className="w-full max-w-4xl space-y-8 animate-pulse">
          <div className="h-64 bg-white/5 rounded-3xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl" />)}
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-white/5 rounded-xl" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0603] text-white font-sans selection:bg-[#e0b96a]/30">
      <div className="max-w-6xl mx-auto px-4 py-12 pt-28">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* User Hero Section */}
          <motion.section variants={itemVariants} className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e0b96a]/10 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="relative group">
                <UserAvatar user={user} size="xl" className="shadow-[0_0_30px_rgba(224,185,106,0.2)] group-hover:shadow-[0_0_40px_rgba(224,185,106,0.3)]" />
                <div className="absolute -bottom-2 -right-2 bg-[#e0b96a] p-2 rounded-full text-[#0a0603] shadow-lg">
                  <Award size={18} />
                </div>
              </div>

              <div className="text-center md:text-left space-y-4 flex-1">
                <div>
                  <h4 className="text-[#e0b96a] text-xs font-bold uppercase tracking-[0.3em] mb-2 flex items-center justify-center md:justify-start gap-2">
                    <ShieldCheck size={14} /> VIP Member
                  </h4>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">{newName || user?.displayName || "Valued Customer"}</span>
                  </h1>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 text-sm text-white/60">
                    <Calendar size={14} className="text-[#e0b96a]" />
                    Member since {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#e0b96a]/50 transition-all"
                    placeholder="Enter new name"
                  />
                  <button 
                    onClick={handleUpdateName}
                    disabled={isUpdating}
                    className="bg-[#e0b96a] text-[#0a0603] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#c8973a] transition-all disabled:opacity-50"
                  >
                    {isUpdating ? "..." : <Edit3 size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Stats Grid */}
          <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              icon={<ShoppingBag className="text-[#e0b96a]" />} 
              label="Active Orders" 
              value={JSON.parse(localStorage.getItem(ordersKey) || "[]").length < 10 ? `0${JSON.parse(localStorage.getItem(ordersKey) || "[]").length}` : JSON.parse(localStorage.getItem(ordersKey) || "[]").length} 
              subValue={`${cartCount} Items in Cart`} 
            />
            <StatCard 
              icon={<Heart className="text-[#e0b96a]" />} 
              label="Wishlist Count" 
              value={wishlistCount < 10 ? `0${wishlistCount}` : wishlistCount} 
              subValue="Favorite items" 
            />
            <StatCard 
              icon={<Award className="text-[#e0b96a]" />} 
              label="Reward Points" 
              value="2,450" 
              subValue="Gold Status" 
            />
          </motion.section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Membership Card - Left Side */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#e0b96a] rounded-full" />
                Membership Card
              </h3>
              <div className="relative h-56 w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#e0b96a] via-[#c8973a] to-[#8a6321] p-6 shadow-2xl shadow-[#e0b96a]/10 group">
                {/* Patterns */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/20 blur-[80px] rounded-full" />
                
                <div className="relative h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#0a0603]/60">Digital Privilege</p>
                      <h4 className="text-xl font-black text-[#0a0603] italic">SHOPCART GOLD</h4>
                    </div>
                    <div className="w-12 h-8 bg-[#0a0603]/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                      <div className="w-6 h-6 rounded-full bg-[#0a0603]/20" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-8 bg-gradient-to-br from-yellow-200 to-yellow-600 rounded flex items-center justify-center overflow-hidden">
                        <div className="w-full h-[1px] bg-black/10 rotate-45" />
                        <div className="w-full h-[1px] bg-black/10 -rotate-45" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#0a0603]/60">Card Holder</p>
                        <p className="text-lg font-bold text-[#0a0603] uppercase tracking-wider truncate max-w-[180px]">
                          {newName || user?.displayName || "SHOPCART USER"}
                        </p>
                      </div>
                      <p className="text-[#0a0603] font-mono text-sm">•••• 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

              {/* Tabs Content */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview-content"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      {/* Information Grid */}
                      <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                          <div className="w-1.5 h-6 bg-[#e0b96a] rounded-full" />
                          Account Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InfoItem icon={<Mail size={18} />} label="Contact Email" value={user?.email || "N/A"} />
                          <InfoItem icon={<LogIn size={18} />} label="Last Login" value={user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : 'N/A'} />
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                          <div className="w-1.5 h-6 bg-[#e0b96a] rounded-full" />
                          Quick Actions
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ActionRow icon={<ShoppingBag size={20} />} label="My Orders" onClick={() => setActiveTab('orders')} />
                          <ActionRow icon={<MapPin size={20} />} label="Shipping Address" onClick={() => setActiveTab('address')} />
                          <ActionRow icon={<CreditCard size={20} />} label="Payment Methods" onClick={() => setActiveTab('payment')} />
                          <ActionRow icon={<Settings size={20} />} label="Account Settings" onClick={() => setActiveTab('settings')} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "address" && (
                    <div key="address-tab">
                      <button onClick={() => setActiveTab('overview')} className="text-[#e0b96a] text-xs font-bold uppercase tracking-widest mb-4 hover:underline">← Back to Overview</button>
                      <AddressTab mockAddresses={mockAddresses} setMockAddresses={setMockAddresses} />
                    </div>
                  )}

                  {activeTab === "orders" && (
                    <div key="orders-tab">
                      <button onClick={() => setActiveTab('overview')} className="text-[#e0b96a] text-xs font-bold uppercase tracking-widest mb-4 hover:underline">← Back to Overview</button>
                      <OrdersTab mockOrders={JSON.parse(localStorage.getItem(ordersKey) || "[]")} />
                    </div>
                  )}

                  {activeTab === "settings" && (
                    <div key="settings-tab">
                      <button onClick={() => setActiveTab('overview')} className="text-[#e0b96a] text-xs font-bold uppercase tracking-widest mb-4 hover:underline">← Back to Overview</button>
                      <SettingsTab user={user} />
                    </div>
                  )}

                  {activeTab === "payment" && (
                    <div key="payment-tab">
                      <button onClick={() => setActiveTab('overview')} className="text-[#e0b96a] text-xs font-bold uppercase tracking-widest mb-4 hover:underline">← Back to Overview</button>
                      <PaymentTab />
                    </div>
                  )}
                </AnimatePresence>

                {/* Logout Button */}
                <div className="pt-10">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 py-4 rounded-2xl text-red-400 font-bold transition-all group"
                  >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Logout Session
                  </button>
                </div>
              </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, subValue }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:border-[#e0b96a]/30 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-[#e0b96a]/10 rounded-2xl group-hover:bg-[#e0b96a]/20 transition-all">
        {icon}
      </div>
      <div className="text-right">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">{label}</p>
        <p className="text-3xl font-black mt-1">{value}</p>
      </div>
    </div>
    <div className="h-px bg-white/10 w-full mb-3" />
    <p className="text-xs text-white/30 font-medium">{subValue}</p>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
    <div className="text-[#e0b96a]">{icon}</div>
    <div>
      <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{label}</p>
      <p className="text-sm font-medium truncate max-w-[200px] md:max-w-none">{value}</p>
    </div>
  </div>
);

const ActionRow = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-2xl transition-all group w-full text-left"
  >
    <div className="flex items-center gap-4">
      <div className="p-2 bg-white/5 rounded-xl group-hover:text-[#e0b96a] transition-all">
        {icon}
      </div>
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </div>
    <ChevronRight size={18} className="text-white/20 group-hover:text-[#e0b96a] group-hover:translate-x-1 transition-all" />
  </button>
);

export default ProfilePage;
