import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

import s1 from "../assets/images/sponsor/01.png";
import s2 from "../assets/images/sponsor/02.png";
import s3 from "../assets/images/sponsor/03.png";
import s4 from "../assets/images/sponsor/04.png";
import s5 from "../assets/images/sponsor/05.png";
import s6 from "../assets/images/sponsor/06.png";

const sponsorList = [s1, s2, s3, s4, s5, s6];

const Brand = () => {
  return (
    <div className="py-2 px-10 md:px-28 bg-yellow-100/50">
      <Swiper
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        speed={800}
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 5 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 50 },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {sponsorList.map((img, i) => (
          <SwiperSlide key={i} className="flex justify-center">
            <img
              src={img}
              alt="logo"
              className="
                w-20 h-20 
                sm:w-24 sm:h-24
                md:w-28 md:h-28
                lg:w-32 lg:h-32
                object-contain
                transition duration-300
              "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brand;
