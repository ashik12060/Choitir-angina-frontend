// import React from "react";

// // Example brand data (replace with dynamic data if needed)
// const brands = [
//   { id: 1, name: "Agha Noor", image: require("../../assets/1.jpg") },
//   { id: 2, name: "Maria.B.", image: require("../../assets/2.jpg") },
//   { id: 3, name: "Iznik", image: require("../../assets/3.jpg") },
//   { id: 4, name: "Mushq", image: require("../../assets/4.jpg") },
//   { id: 5, name: "Azure", image: require("../../assets/5.jpg") },
//   { id: 6, name: "Other Brand", image: require("../../assets/photo.jpg") },
// ];

// const Unstitched = () => {
//   return (
//     <div className="container mx-auto px-10 py-8 bg-[#f6fcf8]">
//       <h2 className="text-2xl font-bold text-center mb-6">UNSTITCHED</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//         {brands.map((brand) => (
        
//         <div className="bg-white border-2 border-[#d5c085] rounded-lg shadow-md w-full h-[350px] flex items-center justify-center">
//         <img
//           src={brand.image}
//           alt={brand.name}
//           className="h-full w-auto  rounded-lg"
//         />
        
//       </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Unstitched;


import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../pages/axiosInstance"; // Make sure to import your axios instance
import { Link } from "react-router-dom"; // In case you want to add a link for each product

const Unstitched = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnstitchedProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/category/Unstitched`
        );
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load Unstitched products");
        setLoading(false);
      }
    };

    fetchUnstitchedProducts();
  }, []);

  return (
    <div className="container mx-auto px-10 py-8 bg-[#f6fcf8]">
      <h2 className="text-2xl font-bold text-center mb-6">UNSTITCHED</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center">No unstitched products available in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border-2 border-[#d5c085] rounded-lg shadow-md w-full h-[350px] flex items-center justify-center"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image?.url || "placeholder-image-url.jpg"} // Default image if not available
                  alt={product.title}
                  className="h-full w-auto rounded-lg"
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Unstitched;
