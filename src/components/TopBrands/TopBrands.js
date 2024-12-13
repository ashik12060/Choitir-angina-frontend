
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

const TopBrands = () => {
  return (
    <div className="container mx-auto py-4 my-10 bg-[#f6fcf8]">
      <h2 className="text-2xl font-bold text-center mb-6">Top Brands</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={15}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={3000} // Smooth right-to-left scrolling
        className="relative"
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id} className="flex items-center justify-center">
            <div className="bg-white border-2 border-[#d5c085] rounded-lg shadow-md p-4 w-full">
              <img
                src={brand.image}
                alt={brand.name}
                className=""
              />
              {/* <h3 className="text-center mt-2 text-sm font-medium">{brand.name}</h3> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopBrands;
