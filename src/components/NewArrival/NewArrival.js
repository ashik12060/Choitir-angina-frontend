import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../pages/axiosInstance";
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10">
      <h2 className="text-2xl sm:text-3xl font-serif text-center mb-8 text-gray-800">
        New Arrival
      </h2>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No products available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="overflow-hidden flex flex-col items-center justify-center w-full h-[350px] sm:h-[380px] md:h-[400px] lg:h-[450px] xl:h-[480px] ">
                <img
                  src={product.variants?.[0]?.imageUrl || "placeholder-image-url.jpg"}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-lg"
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

export default NewArrival;
