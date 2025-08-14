// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import axiosInstance from "./axiosInstance";
// import Loader from "../components/Loader";
// import ProductCard from "../components/ProductCard";

// const BlogPro = ({ searchQuery, setSearchQuery }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 50;

//   const fetchProducts = async (page = 1) => {
//     setLoading(true);
//     try {
//       const { data } = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/products/paginated?page=${page}&limit=${itemsPerPage}`
//       );
//       setProducts(data.products);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   // Filter products based on searchQuery
//   const filteredProducts = searchQuery
//     ? products.filter((product) =>
//         product.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : products;

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <h2 className="text-center text-3xl my-10 font-serif">CATALOGUE</h2>

//       {/* Centered search input with margin */}
//       <div className="flex justify-end mr-10 mb-8">
//         <p className="text-center font-mono px-20 w-2/3 container">
//           Our creative team craft the most innovative and eye-catching designs
//           that provide the customers to select their desired style.
//         </p>
//         <input
//           type="text"
//           placeholder="🔍 Search products..."
//           aria-label="Search products"
//           value={searchQuery}
//           onChange={(e) => {
//             console.log("BlogPro input changed:", e.target.value);
//             setSearchQuery(e.target.value);
//           }}
//           autoComplete="off"
//           className="w-64 max-w-full border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
//         />
//       </div>

//       <div className="container mx-auto px-4 py-6">
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//           {loading ? (
//             <Loader />
//           ) : filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <div key={product._id} className="col-span-1">
//                 <ProductCard
//                   id={product._id}
//                   title={product.title}
//                   content={product.content}
//                   price={product.price}
//                   brand={product.brand}
//                   subheader={moment(product.createdAt).format("MMMM DD, YYYY")}
//                   comments={product.comments.length}
//                   likes={product.likes.length}
//                   likesId={product.likes}
//                   variants={product.variants}
//                 />
//               </div>
//             ))
//           ) : (
//             <p className="text-center col-span-full text-gray-600">
//               No products found.
//             </p>
//           )}
//         </div>

//         {/* Pagination */}
//         <div className="mt-6 text-center">
//           <button
//             className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 mr-2 ${
//               currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           <button
//             className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 ${
//               currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPro;


import React, { useEffect, useState } from "react";
import moment from "moment";
import axiosInstance from "./axiosInstance";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

const BlogPro = ({ searchQuery, setSearchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 50;

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/products/paginated?page=${page}&limit=${itemsPerPage}`
      );
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Only filter the products that are currently fetched
  const displayedProducts = searchQuery
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="bg-gray-50 min-h-screen">
      <h2 className="text-center text-3xl my-10 font-serif">CATALOGUE</h2>

      <div className="flex justify-end mr-10 mb-8">
        <p className="text-center font-mono px-20 w-2/3 container">
          Our creative team craft the most innovative and eye-catching designs
          that provide the customers to select their desired style.
        </p>
        <input
          type="text"
          placeholder="🔍 Search products..."
          aria-label="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
          className="w-64 max-w-full border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
        />
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading ? (
            <Loader />
          ) : displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <div key={product._id} className="col-span-1">
                <ProductCard
                  id={product._id}
                  title={product.title}
                  content={product.content}
                  price={product.price}
                  brand={product.brand}
                  subheader={moment(product.createdAt).format("MMMM DD, YYYY")}
                  comments={product.comments.length}
                  likes={product.likes.length}
                  likesId={product.likes}
                  variants={product.variants}
                />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No products found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 text-center">
          <button
            className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 mr-2 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPro;
