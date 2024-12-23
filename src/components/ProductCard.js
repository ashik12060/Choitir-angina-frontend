import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axiosInstance from "../pages/axiosInstance";
import ProductBarcode from "./ProductBarcode/ProductBarcode";

const ProductCard = ({
  productId ,
  id,
  title,
  price,
  image,
  content,
  comments,
  likes,
  showProducts,
  likesId,
}) => {
  const { userInfo } = useSelector((state) => state.signIn);

  const [truncatedContent, setTruncatedContent] = useState("");
  const history = useNavigate();
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);


  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/products/${productId}`
        );
        console.log("Product Data:", response.data); // Check the response here
        setProduct(response.data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        // setLoading(false);
      }
    };
  
    fetchProduct();
  }, [productId]);
  


  useEffect(() => {
    const contentArray = content.split("\n");
    const truncated = contentArray.slice(0, 8).join("\n");
    setTruncatedContent(truncated);
  }, [content]);

  const addLike = async () => {
    try {
      const { data } = await axiosInstance.put(
        `${process.env.REACT_APP_API_URL}/api/addlike/product/${id}`
      );
      console.log("likes", data.product);
      if (data.success === true) {
        showProducts();
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const removeLike = async () => {
    try {
      const { data } = await axiosInstance.put(
        `${process.env.REACT_APP_API_URL}/api/removelike/product/${id}`
      );
      console.log("remove likes", data.product);
      if (data.success === true) {
        showProducts();
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const addToCart = () => {
    if (isAuthenticated) {
      history("/singlepro");
    } else {
      history("/login");
    }
  };

  return (
    <div className="">
      <div
        id="productInfo"
        className="w-full p-2 shadow-md rounded-lg border border-gray-300  bg-white flex flex-col"
      >
        <Link to={`/product/${id}`}>
          <img
            className="w-full h-36 object-cover rounded-md"
            src={image}
            alt="product"
          />
        </Link>
        <p className="pt-2 text-lg font-bold text-gray-800 truncate">
          {title}
        </p>
        <p className="text-gray-600 text-sm mt-2">
          <span className="font-bold">Origin:</span> {truncatedContent}
        </p>
        <div className="flex items-center mt-3 space-x-1">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
        </div>
        <p className="mt-3 text-lg font-bold text-green-600">${price}</p>
        <Link to={`/product/${id}`}>
          <button className="bg-blue-600 text-white text-sm px-4 py-2 mt-4 rounded-md hover:bg-blue-700 transition">
            Buy Now
          </button>
        </Link>
        
      <ProductBarcode product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
