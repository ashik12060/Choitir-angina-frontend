// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import axiosInstance from "../../pages/axiosInstance"; // Make sure to import your axios instance
// import { Link } from "react-router-dom"; // In case you want to add a link for each product

// const Unstitched = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUnstitchedProducts = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `${process.env.REACT_APP_API_URL}/api/category/Unstitched`
//         );
//         setProducts(response.data.products || []);
//         setLoading(false);
//       } catch (error) {
//         toast.error("Failed to load Unstitched products");
//         setLoading(false);
//       }
//     };

//     fetchUnstitchedProducts();
//   }, []);

//   return (
//     <div className="container mx-auto px-10 py-8 bg-[#f6fcf8]">
//       <h2 className="text-2xl font-bold text-center mb-6">UNSTITCHED</h2>
//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : products.length === 0 ? (
//         <p className="text-center">No unstitched products available in this category.</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="bg-white border-2 border-[#d5c085] rounded-lg shadow-md w-full h-[380px] flex items-center justify-center"
//             >
//               <Link to={`/product/${product._id}`}>
//                 <img
//                   src={product.images?.[0]?.url || "placeholder-image-url.jpg"} // Display the first image only
//                   alt={product.title}
//                   className="h-full w-auto rounded-lg object-cover"
//                 />
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
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
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
        UNSTITCHED
      </h2>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No unstitched products available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border-2 border-[#d5c085] rounded-lg shadow-md flex items-center justify-center overflow-hidden"
              style={{
                height: "auto",
                maxHeight: "300px",
                aspectRatio: "3 / 4", // Ensures consistent ratio
              }}
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.images?.[0]?.url || "placeholder-image-url.jpg"} // Display the first image only
                  alt={product.title}
                  className="w-full h-full object-cover"
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
