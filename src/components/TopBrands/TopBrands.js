
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import axiosInstance from "../../pages/axiosInstance";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import { Link } from "react-router-dom";

// const TopBrands = () => {
//   const [brands, setBrands] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTopBrands = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `${process.env.REACT_APP_API_URL}/api/category/Top Brands`
//         );
//         console.log(response); // Log the full response to inspect structure
//         setBrands(response.data.products || []); // Use products here instead of brands
//         setLoading(false);
//       } catch (error) {
//         toast.error("Failed to load top brands");
//         setLoading(false);
//       }
//     };
//     fetchTopBrands();
//   }, []);

//   return (
//     <div className="container mx-auto px-10 py-4 my-20 bg-[#f6fcf8]">
//       <h2 className="text-2xl font-bold text-center mb-6">Top Brands</h2>
//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : brands.length === 0 ? (
//         <p className="text-center">No brands available in this category.</p>
//       ) : (
//         <Swiper
//           modules={[Autoplay]}
//           spaceBetween={20}
//           slidesPerView={5}
//           loop={true}
//           autoplay={{
//             delay: 0,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: false,
//           }}
//           speed={5000}
//           className="relative"
//         >
//           {brands.map((product) => (
//             <SwiperSlide key={product._id} className="flex items-center justify-center">
//               <div className="bg-white border-2 border-[#d5c085] rounded-lg shadow-md w-full h-[350px] flex items-center justify-center">
//                 <Link to={`/product/${product._id}`}>
//                   <img
//                     src={product.images?.[0]?.url || "placeholder-image-url.jpg"} // Show only the first image
//                     alt={product.title}
//                     className="h-full w-auto rounded-lg object-cover"
//                   />
//                 </Link>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )}
//     </div>
//   );
// };

// export default TopBrands;

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
        setBrands(response.data.products || []);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load top brands");
        setLoading(false);
      }
    };
    fetchTopBrands();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 my-10 ">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-800">
        Top Brands
      </h2>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : brands.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No brands available in this category.
        </p>
      ) : (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={5} // Minimize space for small devices
          slidesPerView={1} // Default for small screens
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 8 }, // Small phones
            640: { slidesPerView: 2, spaceBetween: 10 }, // Tablets
            768: { slidesPerView: 3, spaceBetween: 15 }, // Medium screens
            1024: { slidesPerView: 4, spaceBetween: 20 }, // Large screens
            1280: { slidesPerView: 5, spaceBetween: 25 }, // Extra-large screens
          }}
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
            <SwiperSlide
              key={product._id}
              className="flex items-center justify-center"
            >
              <div className="bg-white border-2 border-[#d5c085] rounded-lg shadow-md w-full max-w-[90%] h-[200px] sm:max-w-[200px] sm:h-[250px] lg:max-w-[250px] lg:h-[300px] flex items-center justify-center overflow-hidden">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.images?.[0]?.url || "placeholder-image-url.jpg"}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg"
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
