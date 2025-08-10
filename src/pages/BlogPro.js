// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import { io } from "socket.io-client";
// import ProductCard from "../components/ProductCard";
// import Loader from "../components/Loader";
// import axiosInstance from "./axiosInstance";

// const socket = io("/", {
//   reconnection: true,
// });

// const BlogPro = ({ searchQuery }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [postAddLike, setPostAddLike] = useState([]);
//   const [postRemoveLike, setPostRemoveLike] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 50;

//   const showProducts = async (page = 1) => {
//     setLoading(true);
//     try {
//       const { data } = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/products/paginated?page=${page}&limit=${itemsPerPage}`
//       );
//       setProducts(data.products);
//       setTotalPages(data.totalPages);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching products", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     showProducts();
//   }, []);

//   //  let uiPosts =
//   //   postAddLike.length > 0
//   //     ? postAddLike
//   //     : postRemoveLike.length > 0
//   //       ? postRemoveLike
//   //       : products;

//   // if (searchQuery) {
//   //   uiPosts = uiPosts.filter((product) =>
//   //     product.title.toLowerCase().includes(searchQuery.toLowerCase())
//   //   );
//   // }

//   let uiPosts = products;
//   if (searchQuery) {
//     uiPosts = products.filter((p) =>
//       p.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }
//   const filteredProducts = searchQuery
//     ? products.filter((product) =>
//         product.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : products;

//   console.log("Filtered products count:", filteredProducts.length);

//   useEffect(() => {
//     showProducts(currentPage);
//   }, [currentPage]);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   // Function to print the barcode
//   const handlePrint = (barcode) => {
//     const printWindow = window.open("", "", "width=600,height=400");
//     printWindow.document.write(
//       `<html><body><img src="${barcode}" alt="Product Barcode" style="width: 100%; max-width: 400px;" /></body></html>`
//     );
//     printWindow.document.close();
//     printWindow.print();
//   };

//   console.log("BlogPro received searchQuery:", searchQuery);
//   console.log("BlogPro products count:", products.length);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <h2 className="text-center text-3xl my-10  font-serif">CATALOGUE</h2>
//       <p className="text-center font-mono px-10 container">
//         Our creative team craft the most innovative and eye-catching designs
//         that provide the customers to select their desired style.
//       </p>

//       <h3 className="mb-4 text-lg font-semibold">
//         Showing {filteredProducts.length} products matching &quot;{searchQuery}
//         &quot;
//       </h3>

//       <div className="container mx-auto px-4 py-6">
//         {/* Products Grid */}
//         {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//           {loading ? (
//             <Loader />
//           ) : (
//             uiPosts.map((product, index) => (
//               <div key={index} className="col-span-1">
//                 <ProductCard
//                   // image={product.image ? product.image.url : ""}

//                   id={product._id}
//                   title={product.title}
//                   content={product.content}
//                   price={product.price}
//                   brand={product.brand}
//                   subheader={moment(product.createdAt).format("MMMM DD, YYYY")}
//                   comments={product.comments.length}
//                   likes={product.likes.length}
//                   likesId={product.likes}
//                   showProducts={showProducts}
//                   variants={product.variants}
//                 />
//               </div>
//             ))
//           )}
//         </div> */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//       {filteredProducts.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         filteredProducts.map((product) => (
//           <div key={product._id} className="col-span-1">
//             <ProductCard
//               id={product._id}
//               title={product.title}
//               content={product.content}
//               price={product.price}
//               brand={product.brand}
//               subheader={moment(product.createdAt).format("MMMM DD, YYYY")}
//               comments={product.comments.length}
//               likes={product.likes.length}
//               likesId={product.likes}
//               variants={product.variants}
//             />
//           </div>
//         ))
//       )}
//     </div>

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

const BlogPro = ({ searchQuery }) => {
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
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Filter products based on searchQuery
  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <h2 className="text-center text-3xl my-10 font-serif">CATALOGUE</h2>
      <p className="text-center font-mono px-10 container">
        Our creative team craft the most innovative and eye-catching designs that
        provide the customers to select their desired style.
      </p>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading ? (
            <Loader />
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNextPage}
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
