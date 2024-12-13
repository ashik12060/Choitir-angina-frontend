

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Example brand data (replace with dynamic data if needed)
const brands = [
  { id: 1, name: "Agha Noor", image: require("../../assets/1.jpg") },
  { id: 2, name: "Maria.B.", image: require("../../assets/2.jpg") },
  { id: 3, name: "Iznik", image: require("../../assets/3.jpg") },
  { id: 4, name: "Mushq", image: require("../../assets/4.jpg") },
  { id: 5, name: "Azure", image: require("../../assets/5.jpg") },
  { id: 6, name: "Other Brand", image: require("../../assets/photo.jpg") },
];

const NewArrival = () => {
  return (
    <div className="container mx-auto px-10 py-4 my-20 bg-[#f6fcf8]">
      <h2 className="text-2xl font-bold text-center mb-6">New Arrival</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={5000} 
        className="relative"
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id} className="flex items-center justify-center">
            <div className="bg-white border-2 border-[#d5c085] rounded-lg shadow-md w-full h-[350px] flex items-center justify-center">
              <img
                src={brand.image}
                alt={brand.name}
                className="h-full w-auto  rounded-lg"
              />
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewArrival;
