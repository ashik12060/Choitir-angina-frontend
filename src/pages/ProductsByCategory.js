import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const ProductByCategory = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const categories = ["Top Brands", "New Arrival", "Stitched", "Unstitched"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get(`/api/products/show`);
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleNavigate = (category) => {
    const urlSafeCategory = encodeURIComponent(
      category.toLowerCase().replace(/\s+/g, "-")
    );
    navigate(`/category/${urlSafeCategory}`);
  };

  return (
    <div className="pt-10 px-4 my-14">
      <h2 className="text-2xl font-serif px-8 text-gray-700">
        SHOP BY CATEGORY
      </h2>
      <hr className="mx-8 border-black my-2" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:px-6 md:px-12 lg:px-20 xl:px-32 pt-10">
        {categories.map((category) => {
          const matchedProduct = products.find(
            (p) => p.categories?.includes(category)
          );

          if (!matchedProduct) return null;

          return (
            <div
              key={category}
              className="transition-transform duration-300 cursor-pointer overflow-hidden transform hover:scale-105 text-center"
              onClick={() => handleNavigate(category)}
            >
              <div className="aspect-square w-full rounded-full p-4 sm:p-6 md:p-8">
                <img
                  src={
                    matchedProduct.variants?.[0]?.imageUrl?.startsWith("http")
                      ? matchedProduct.variants[0].imageUrl
                      : "https://via.placeholder.com/200"
                  }
                  alt={category}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="p-2">
                <h3 className="text-lg sm:text-xl font-serif text-gray-800">
                  {category}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductByCategory;
