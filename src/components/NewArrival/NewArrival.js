
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import axiosInstance from "../../pages/axiosInstance";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import { Link } from "react-router-dom";

// const NewArrival = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNewArrivalProducts = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `${process.env.REACT_APP_API_URL}/api/category/New Arrival`
//         );
//         setProducts(response.data.products || []);
//         setLoading(false);
//       } catch (error) {
//         toast.error("Failed to load New Arrival products");
//         setLoading(false);
//       }
//     };
//     fetchNewArrivalProducts();
//   }, []);

//   return (
//     <div className="container mx-auto px-10 py-4 my-20 bg-[#f6fcf8]">
//       <h2 className="text-2xl font-bold text-center mb-6">New Arrival</h2>
//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : products.length === 0 ? (
//         <p className="text-center">No products available in this category.</p>
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
//           {products.map((product) => (
//             <SwiperSlide
//               key={product._id}
//               className="flex items-center justify-center"
//             >
//               <div className="bg-white border-2 border-[#d5c085] rounded-lg shadow-md w-full h-[350px] flex items-center justify-center">
//                 <Link to={`/product/${product._id}`}>
//                   <img
//                     src={
//                       product.images?.[0]?.url || "placeholder-image-url.jpg"
//                     } // Show only the first image
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

// export default NewArrival;


import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../pages/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivalProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/category/New Arrival`
        );
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load New Arrival products");
        setLoading(false);
      }
    };
    fetchNewArrivalProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 my-10 ">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-800">
        New Arrival
      </h2>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No products available in this category.
        </p>
      ) : (
        <Swiper
  modules={[Autoplay]}
  spaceBetween={5} // Minimize gaps on small devices
  slidesPerView={1} // Start with 1 product per view for small screens
  breakpoints={{
    480: { slidesPerView: 2, spaceBetween: 8 }, // Small devices
    640: { slidesPerView: 3, spaceBetween: 10 }, // Tablets
    768: { slidesPerView: 4, spaceBetween: 15 }, // Medium screens
    1024: { slidesPerView: 5, spaceBetween: 20 }, // Large screens
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
  {products.map((product) => (
    <SwiperSlide key={product._id} className="flex items-center justify-center">
      <div className="bg-white border-2 border-[#d5c085] rounded-lg shadow-md w-full max-w-[90%] h-[250px] sm:max-w-[180px] sm:h-[300px] lg:max-w-[220px] lg:h-[350px] flex items-center justify-center overflow-hidden">
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

export default NewArrival;
