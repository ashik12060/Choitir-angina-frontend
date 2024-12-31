import React, { useEffect, useState } from "react";
import moment from "moment";
import { io } from "socket.io-client";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import axiosInstance from "./axiosInstance";

const socket = io("/", {
  reconnection: true,
});

const BlogPro = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postAddLike, setPostAddLike] = useState([]);
  const [postRemoveLike, setPostRemoveLike] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  const showProducts = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/products/paginated?page=${page}&limit=${itemsPerPage}`
      );
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    showProducts();
  }, []);

  // useEffect(() => {
  //   socket.on("add-like", (newPosts) => {
  //     setPostAddLike(newPosts);
  //     setPostRemoveLike("");
  //   });
  //   socket.on("remove-like", (newPosts) => {
  //     setPostRemoveLike(newPosts);
  //     setPostAddLike("");
  //   });
  // }, []);

  let uiPosts =
    postAddLike.length > 0
      ? postAddLike
      : postRemoveLike.length > 0
      ? postRemoveLike
      : products;

  if (searchQuery) {
    uiPosts = uiPosts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  useEffect(() => {
    showProducts(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Function to print the barcode
  const handlePrint = (barcode) => {
    const printWindow = window.open("", "", "width=600,height=400");
    printWindow.document.write(
      `<html><body><img src="${barcode}" alt="Product Barcode" style="width: 100%; max-width: 400px;" /></body></html>`
    );
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <h2 className="text-center text-3xl font-bold">Main Catalog</h2>
      <div className="container mx-auto px-4 py-6">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {loading ? (
            <Loader />
          ) : (
            uiPosts.map((product, index) => (
              <div key={index} className="col-span-1">
                <ProductCard
                  // image={product.image ? product.image.url : ""}
                  images={product.images} // Pass the images array
                  id={product._id}
                  title={product.title}
                  content={product.content}
                  price={product.price}
                  brand={product.brand}
                  subheader={moment(product.createdAt).format("MMMM DD, YYYY")}
                  comments={product.comments.length}
                  likes={product.likes.length}
                  likesId={product.likes}
                  showProducts={showProducts}
                />
               
              </div>
            ))
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
