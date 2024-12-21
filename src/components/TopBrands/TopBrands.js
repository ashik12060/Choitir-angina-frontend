
  

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../pages/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

const TopBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopBrands = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/category/Top Brands`
        );
        console.log(response); // Log the full response to inspect structure
        setBrands(response.data.products || []); // Use products here instead of brands
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load top brands");
        setLoading(false);
      }
    };
    fetchTopBrands();
  }, []);

  return (
    <div className="container mx-auto px-10 py-4 my-20 bg-[#f6fcf8]">
      <h2 className="text-2xl font-bold text-center mb-6">Top Brands</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : brands.length === 0 ? (
        <p className="text-center">No brands available in this category.</p>
      ) : (
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
          {brands.map((product) => (
            <SwiperSlide key={product._id} className="flex items-center justify-center">
              <div className="bg-white border-2 border-[#d5c085] rounded-lg shadow-md w-full h-[350px] flex items-center justify-center">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image?.url || "placeholder-image-url.jpg"}
                    alt={product.title}
                    className="h-full w-auto rounded-lg"
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default TopBrands;
