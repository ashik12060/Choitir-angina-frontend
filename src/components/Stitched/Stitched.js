// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import axiosInstance from "../../pages/axiosInstance"; // Make sure to import your axios instance
// import { Link } from "react-router-dom"; // In case you want to add a link for each product

// const Stitched = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStitchedProducts = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `${process.env.REACT_APP_API_URL}/api/category/Stitched`
//         );
//         setProducts(response.data.products || []);
//         setLoading(false);
//         console.log(response)
//       } catch (error) {
//         toast.error("Failed to load Stitched products");
//         setLoading(false);
//       }
//     };

//     fetchStitchedProducts();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 sm:px-6 py-8">
//       <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
//         Stitched
//       </h2>
//       {loading ? (
//         <p className="text-center text-lg text-gray-600">Loading...</p>
//       ) : products.length === 0 ? (
//         <p className="text-center text-lg text-gray-600">
//           No Stitched products available in this category.
//         </p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="bg-white border-2 border-[#d5c085] rounded-lg shadow-md flex items-center justify-center overflow-hidden"
//               style={{
//                 height: "auto",
//                 maxHeight: "300px",
//                 aspectRatio: "3 / 4", // Ensures consistent ratio
//               }}
//             >
//               <Link to={`/product/${product._id}`}>
              

//                 <img
//                   src={product.variants?.[0]?.imageUrl || "placeholder-image-url.jpg"}
//                   alt={product.title}
//                   className="w-full h-full object-cover"
//                 />
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Stitched;


import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../pages/axiosInstance";
import { Link } from "react-router-dom";

const Stitched = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStitchedProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/category/Stitched`
        );
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load Stitched products");
        setLoading(false);
      }
    };

    fetchStitchedProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-serif text-center text-gray-800 mb-8">
        Stitched
      </h2>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No Stitched products available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="overflow-hidden flex flex-col items-center justify-center w-full h-[350px] sm:h-[380px] md:h-[400px] lg:h-[450px] xl:h-[480px]"
            >
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={product.variants?.[0]?.imageUrl || "placeholder.jpg"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 text-center">
            <h3 className="text-lg sm:text-xl font-serif text-gray-800 truncate">
              {product.title || "No Title"}
            </h3>
          </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stitched;
