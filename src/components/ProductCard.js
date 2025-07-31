import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axiosInstance from "../pages/axiosInstance";
import ProductBarcode from "./ProductBarcode/ProductBarcode";

const ProductCard = ({
  productId,
  id,
  title,
  price,
  variants, // Make sure you pass 'variants' to the component
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
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
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
      if (data.success === true) {
        showProducts();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const removeLike = async () => {
    try {
      const { data } = await axiosInstance.put(
        `${process.env.REACT_APP_API_URL}/api/removelike/product/${id}`
      );
      if (data.success === true) {
        showProducts();
      }
    } catch (error) {
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

  // Get the first variant's imageUrl if it exists
  const firstVariantImageUrl = variants && variants.length > 0 ? variants[0].imageUrl : "";

  return (
    <div>
      <div
        id="productInfo"
        className="w-full p-2 shadow-md rounded-lg  bg-white flex flex-col"
        // className="w-full p-2 shadow-md rounded-lg border-2 border-[#d5c085] bg-white flex flex-col"
      >
        <Link to={`/product/${id}`}>
          <img
            className="w-full h-72 object-cover rounded-md"
            src={firstVariantImageUrl || "/default-image.jpg"} // Fallback to a default image if no variant exists
            alt="product"
          />
        </Link>
        <p className="pt-2 text-lg font-serif text-gray-800 truncate">{title}</p>
        <p className="text-gray-600 text-sm">
          {/* <span className="font-bold">Origin:</span> {truncatedContent} */}
        </p>
       
        <p className="text-lg font-mono ">৳ {price}</p>
    
      </div>
    </div>
  );
};

export default ProductCard;
