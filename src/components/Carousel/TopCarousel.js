import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import aghaNoor from '../../assets/1.jpg';
import mariaB from '../../assets/1.jpg';
import iznik from '../../assets/1.jpg';
import mushq from '../../assets/1.jpg';
import azure from '../../assets/1.jpg';

const TopCarousel = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = [
        { id: 1, name: 'Agha Noor', image: aghaNoor },
        { id: 2, name: 'Maria.B.', image: mariaB },
        { id: 3, name: 'Iznik', image: iznik },
        { id: 4, name: 'Mushq', image: mushq },
        { id: 5, name: 'Azure', image: azure },
      ];
      setBrands(data);
    };

    fetchBrands();
  }, []);

  return (
    <div className="container mx-auto px-32 py-6">
      <h2 className="text-2xl font-bold text-center mb-4">Top Brands</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1} // Always show 1 slide
        navigation
        autoplay={{
          delay: 3000, // Auto-slide every 3 seconds
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <img
                src={brand.image}
                alt={brand.name}
                className="mx-auto w-full h-96 object-contain"
              />
              {/* <h3 className="text-center mt-4 text-lg font-medium">{brand.name}</h3> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopCarousel;
