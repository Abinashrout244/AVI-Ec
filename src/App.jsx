import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState, useContext } from "react";
import ToastContainer from "./components/ToastContainer";
import MobileBottomNav from "./components/MobileBottomNav";
import { AuthContext } from "./context/AuthProvider";
import { useDispatch } from "react-redux";
import { setUserId } from "./utilis/CartSlice";
import { setWishlistUserId } from "./utilis/WishlistSlice";
import AjioLoader from "./utilis/AjioLoader.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const { user, loading: authLoading } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (user) {
      dispatch(setUserId(user.uid));
      dispatch(setWishlistUserId(user.uid));
    } else {
      dispatch(setUserId(null));
      dispatch(setWishlistUserId(null));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!authLoading) {
      const timer = setTimeout(() => {
        setInitialLoading(false);
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [authLoading]);

  return (
    <div className="min-h-screen text-slate-100 bg-[#03050C]">
      <AnimatePresence>
        {initialLoading && (
          <motion.div
            key="app-init-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="fixed inset-0 z-[100]"
          >
            <AjioLoader fullscreen={true} text="Initializing AVI Store..." />
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTop />
      <Header />
      <ToastContainer />

      <main className="pt-20 md:pt-24 pb-16 md:pb-0 min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

export default App;
