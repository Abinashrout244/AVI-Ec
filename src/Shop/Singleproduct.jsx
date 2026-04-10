import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import item from "../products.json";
import Popularpost from "../Shop/Popularpost";
import TagList from "./TagList";
import ProductCarDisplay from "./ProductCarDisplay";
import ReviewListpage from "./ReviewListpage";

// Swiper for mobile
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
    return <div className="text-center py-20 text-white min-h-screen flex items-center justify-center">Loading product...</div>;
  }

  // Generate mock images for gallery if only one exists
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
    <div className="max-w-[1440px] mx-auto pt-24 pb-12 px-4 md:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-amber-300 transition-colors flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-amber-300 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-slate-500">{product.category}</span>
        <span>/</span>
        <span className="text-amber-200 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Main Product Area */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          
          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-4 md:p-8 flex flex-col md:flex-row gap-8">
            {/* Left: Images */}
            <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4">
              {/* Desktop Thumbnails */}
              <div className="hidden md:flex flex-col gap-3 w-20 overflow-y-auto max-h-[500px] custom-scrollbar pr-2">
                {images.map((imgUrl, idx) => {
                  const isActive = imgUrl === activeImage;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        isActive ? "border-amber-400" : "border-transparent hover:border-white/20"
                      }`}
                    >
                      <img src={imgUrl} alt="thumbnail" className="w-full h-20 object-cover bg-white/5 p-1" />
                    </button>
                  );
                })}
              </div>

              {/* Main Image Container */}
              <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center">
                {/* Mobile Swiper */}
                <div className="md:hidden w-full h-full pb-8">
                  <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    className="w-full h-full"
                    onSlideChange={(swiper) => setActiveImage(images[swiper.activeIndex])}
                  >
                    {images.map((imgUrl, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="w-full h-full p-4 flex items-center justify-center">
                            <img src={imgUrl} alt="Product" className="max-w-full max-h-full object-contain" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Desktop Zoomable Image */}
                <div 
                  className="hidden md:block w-full h-full cursor-crosshair overflow-hidden p-6"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-200"
                    style={{
                      transform: isZoomed ? "scale(2.5)" : "scale(1)",
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Details (ProductCarDisplay) */}
            <div className="w-full md:w-1/2">
              <ProductCarDisplay product={product} />
            </div>
          </div>

          <ReviewListpage />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Popularpost />
          <TagList />
        </div>
      </div>
    </div>
  );
}
