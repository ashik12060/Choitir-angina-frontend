import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const ProductsShow = () => {
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get(`/api/products/show`);
        const products = res.data.products;

        const titleMap = new Map();
        products.forEach((product) => {
          const title = product.title?.toLowerCase();
          if (title && !titleMap.has(title)) {
            titleMap.set(title, product);
          }
        });

        const uniqueByTitle = Array.from(titleMap.values());
        setUniqueProducts(uniqueByTitle);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleNavigate = (title) => {
    const urlSafeTitle = encodeURIComponent(
      title.toLowerCase().replace(/\s+/g, "-")
    );
    navigate(`/products-gallery/${urlSafeTitle}`);
  };

  return (
   
    <div className="pt-10 px-4 my-14">
  <h2 className="text-2xl font-serif px-32 text-gray-700">
    NEW ARRIVAL
  </h2>
 <span> <hr className="mx-20 text-center font-bold  border-black"/></span>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  xl:px-32 gap-4  sm:px-6 md:px-12 lg:px-20 pt-10">
    {uniqueProducts.length === 0 ? (
      <p className="col-span-full text-center text-gray-500">
        No products to show.
      </p>
    ) : (
      uniqueProducts.map((product) => (
        <div
          key={product._id}
          className="transition-transform duration-300 cursor-pointer overflow-hidden transform hover:scale-105"
          onClick={() => handleNavigate(product.title)}
        >
          <div className="aspect-square w-full rounded-full p-4 sm:p-6 md:p-8">
            <img
              src={
                product.variants?.[0]?.imageUrl?.startsWith("http")
                  ? product.variants[0].imageUrl
                  : "https://via.placeholder.com/200"
              }
              alt={product.title}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="p-2 text-center">
            <h3 className="text-lg sm:text-xl font-serif text-gray-800 truncate">
              {product.title || "No Title"}
            </h3>
          </div>
        </div>
      ))
    )}
  </div>
</div>

  );
};

export default ProductsShow;
