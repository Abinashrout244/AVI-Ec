import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import item from "../products.json";
import Popularpost from "../Shop/Popularpost";
import TagList from "./TagList";
import ProductCarDisplay from "./ProductCarDisplay";
import ReviewListpage from "./ReviewListpage";

// Swiper for mobile
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Singleproduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const found = item.find((p) => String(p.id) === String(id));
    setProduct(found);
    setActiveImage(found?.img || "");
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#05070e] text-white">
        <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-slate-400 font-medium">Loading product...</span>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.img, product.img, product.img, product.img];

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-100">
      <div className="max-w-[1440px] mx-auto pt-20 pb-16 px-4 md:px-8">
        
        {/* Amazon/Flipkart Breadcrumb Trail */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 overflow-x-auto whitespace-nowrap py-1">
          <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span className="text-slate-600">›</span>
          <Link to="/shop" className="hover:text-amber-400 transition-colors">Shop</Link>
          <span className="text-slate-600">›</span>
          <span className="text-slate-400">{product.category}</span>
          <span className="text-slate-600">›</span>
          <span className="text-amber-300 font-medium truncate max-w-[260px]">{product.name}</span>
        </nav>

        {/* 2-Column Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Sticky Gallery (Amazon Style) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col-reverse md:flex-row gap-3">
            
            {/* Desktop Thumbnail Sidebar */}
            <div className="hidden md:flex flex-col gap-2.5 w-18 flex-shrink-0">
              {images.map((imgUrl, idx) => {
                const isActive = imgUrl === activeImage;
                return (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveImage(imgUrl)}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-900/80 ${
                      isActive 
                        ? "border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.35)] scale-[1.02]" 
                        : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt="thumbnail" className="w-14 h-14 object-contain rounded-lg" />
                  </button>
                );
              })}
            </div>

            {/* Main Stage Image Container */}
            <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl flex items-center justify-center group">
              
              {/* Flipkart Assured / Prime Style Badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                VERIFIED AUTHENTIC
              </div>

              {/* Mobile Swiper */}
              <div className="md:hidden w-full h-full">
                <Swiper
                  modules={[Pagination, Navigation]}
                  pagination={{ clickable: true }}
                  navigation={true}
                  loop={true}
                  className="w-full h-full pb-8"
                  onSlideChange={(swiper) => setActiveImage(images[swiper.realIndex])}
                >
                  {images.map((imgUrl, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="w-full h-full p-6 flex items-center justify-center">
                        <img src={imgUrl} alt="Product" className="max-h-[320px] object-contain drop-shadow-2xl" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Desktop Zoomable Stage */}
              <div
                className="hidden md:flex w-full h-full cursor-crosshair items-center justify-center p-8 overflow-hidden"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-150 drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                  style={{
                    transform: isZoomed ? "scale(2.2)" : "scale(1)",
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }}
                />
              </div>

              <div className="hidden md:block absolute bottom-3 right-3 text-[10px] text-slate-400 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/5 pointer-events-none">
                Hover to zoom
              </div>
            </div>
          </div>

          {/* Right Column: Buying Details */}
          <div className="lg:col-span-7">
            <ProductCarDisplay product={product} />
          </div>
        </div>

        {/* Lower Details, Reviews & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <ReviewListpage />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-6">
            <Popularpost />
            <TagList />
          </div>
        </div>

      </div>
    </div>
  );
}