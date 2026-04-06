import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-slate-100">
      <ScrollToTop />
      <Header />
      {/* <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="pt-24 md:pt-28"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence> */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
