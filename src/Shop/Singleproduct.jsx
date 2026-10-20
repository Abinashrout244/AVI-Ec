import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

const API_URL = "https://my-store-api-sgnu.onrender.com/";

export default function Singleproduct() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch a single product from the Render API.
  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      setProduct(null);
      setActiveImage("");

      try {
        const response = await fetch(
          `${API_URL}/products/${encodeURIComponent(id)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found.");
          }

          throw new Error(
            `Unable to load product. Server returned ${response.status}.`,
          );
        }

        const data = await response.json();

        if (!data || typeof data !== "object" || !data.id) {
          throw new Error("The API returned invalid product data.");
        }

        setProduct(data);
        setActiveImage(
          data.img || (Array.isArray(data.images) ? data.images[0] : "") || "",
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching product:", err);
          setError(err.message || "Failed to load product.");
          setProduct(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError("Product ID is missing.");
      setLoading(false);
    }

    return () => controller.abort();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#05070e] text-white">
        <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-slate-400 font-medium">
          Loading product...
        </span>
      </div>
    );
  }

  // Error or product not found state
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#05070e] px-4 text-white">
        <div className="text-5xl">📦</div>

        <h2 className="text-xl font-semibold">
          {error === "Product not found."
            ? "Product not found"
            : "Unable to load product"}
        </h2>

        <p className="max-w-md text-center text-sm text-slate-400">
          {error || "This product may no longer be available."}
        </p>

        <Link
          to="/shop"
          className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-black transition hover:bg-amber-300"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  // Main image first, followed by the remaining gallery images.
  // Supports products containing either img, images, or both.
  const images = [
    ...new Set(
      [
        product.img,
        ...(Array.isArray(product.images) ? product.images : []),
      ].filter((image) => typeof image === "string" && image.trim().length > 0),
    ),
  ];

  // Handle products that have no images.
  const displayImages = images.length > 0 ? images : [];

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-100">
      <div className="max-w-[1440px] mx-auto pt-20 pb-16 px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 overflow-x-auto whitespace-nowrap py-1">
          <Link to="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>

          <span className="text-slate-600">›</span>

          <Link to="/shop" className="hover:text-amber-400 transition-colors">
            Shop
          </Link>

          <span className="text-slate-600">›</span>

          <span className="text-slate-400">
            {product.category || "Products"}
          </span>

          <span className="text-slate-600">›</span>

          <span className="text-amber-300 font-medium truncate max-w-[260px]">
            {product.name || "Product"}
          </span>
        </nav>

        {/* Product showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Product gallery */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col-reverse md:flex-row gap-3">
            {/* Desktop thumbnails */}
            <div className="hidden md:flex flex-col gap-2.5 w-18 flex-shrink-0">
              {displayImages.map((imgUrl, idx) => {
                const isActive = imgUrl === activeImage;

                return (
                  <button
                    key={`${imgUrl}-${idx}`}
                    type="button"
                    onMouseEnter={() => setActiveImage(imgUrl)}
                    onClick={() => setActiveImage(imgUrl)}
                    aria-label={`View product image ${idx + 1}`}
                    aria-pressed={isActive}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-900/80 ${
                      isActive
                        ? "border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.35)] scale-[1.02]"
                        : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name || "Product"} thumbnail ${idx + 1}`}
                      loading="lazy"
                      className="w-14 h-14 object-contain rounded-lg"
                    />
                  </button>
                );
              })}
            </div>

            {/* Main image stage */}
            <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl flex items-center justify-center group">
              {/* Authenticity badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                VERIFIED AUTHENTIC
              </div>

              {displayImages.length > 0 ? (
                <>
                  {/* Mobile Swiper */}
                  <div className="md:hidden w-full h-full">
                    <Swiper
                      key={product.id}
                      modules={[Pagination, Navigation]}
                      pagination={{ clickable: true }}
                      navigation={displayImages.length > 1}
                      loop={displayImages.length > 1}
                      className="w-full h-full pb-8"
                      onSlideChange={(swiper) => {
                        setActiveImage(
                          displayImages[swiper.realIndex] || displayImages[0],
                        );
                      }}
                    >
                      {displayImages.map((imgUrl, idx) => (
                        <SwiperSlide key={`${imgUrl}-${idx}`}>
                          <div className="w-full h-full p-6 flex items-center justify-center">
                            <img
                              src={imgUrl}
                              alt={`${product.name || "Product"} ${idx + 1}`}
                              className="max-h-[320px] max-w-full object-contain drop-shadow-2xl"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* Desktop zoomable image */}
                  <div
                    className="hidden md:flex w-full h-full cursor-crosshair items-center justify-center p-8 overflow-hidden"
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={handleMouseMove}
                  >
                    <img
                      src={activeImage || displayImages[0]}
                      alt={product.name || "Product"}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.style.visibility = "hidden";
                      }}
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
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                  <span className="text-5xl">📷</span>
                  <p className="text-sm">No product images available</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Buying details */}
          <div className="lg:col-span-7">
            <ProductCarDisplay product={product} />
          </div>
        </div>

        {/* Product details, reviews and sidebar */}
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
