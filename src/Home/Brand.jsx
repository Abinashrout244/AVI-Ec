import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

import s1 from "../assets/images/sponsor/01.png";
import s2 from "../assets/images/sponsor/02.png";
import s3 from "../assets/images/sponsor/03.png";
import s4 from "../assets/images/sponsor/04.png";
import s5 from "../assets/images/sponsor/05.png";
import s6 from "../assets/images/sponsor/06.png";

const sponsorList = [s1, s2, s3, s4, s5, s6];

const Brand = () => {
  return (
    <section className="py-16 px-2 md:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p className="text-white/25 text-[11px] uppercase tracking-[0.4em] font-semibold">
          Trusted by 500+ brands worldwide
        </p>
      </motion.div>

      {/* Divider with text */}
      <div className="flex items-center gap-6 mb-10">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-white/20 text-[11px] uppercase tracking-[0.3em] flex-shrink-0">
          Our Partner Brands
        </span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Swiper */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Swiper
          loop={true}
          autoplay={{ delay: 1800, disableOnInteraction: false }}
          speed={900}
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 24 },
            768: { slidesPerView: 4, spaceBetween: 32 },
            1024: { slidesPerView: 5, spaceBetween: 40 },
            1280: { slidesPerView: 6, spaceBetween: 48 },
          }}
          modules={[Autoplay]}
          className="brand-swiper"
        >
          {sponsorList.map((img, i) => (
            <SwiperSlide key={i} className="flex justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.1, filter: "brightness(1.3)" }}
                transition={{ duration: 0.3 }}
                className="flex justify-center items-center p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Brand ${i + 1}`}
                  className="h-12 md:h-14 lg:h-16 w-auto object-contain opacity-40 hover:opacity-80 transition-opacity duration-300"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default Brand;
