// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-regular-svg-icons";
// import { useEffect, useState } from "react";
// import axiosInstance from "../pages/axiosInstance";
// import ProductBarcode from "./ProductBarcode/ProductBarcode";




// const ProductCard = ({
//   productId,
//   id,
//   title,
//   price,
//   images, // Changed field from 'image' to 'images'
//   // image,
//   content,
//   comments,
//   likes,
//   showProducts,
//   likesId,
// }) => {
//   const { userInfo } = useSelector((state) => state.signIn);

//   const [truncatedContent, setTruncatedContent] = useState("");
//   const history = useNavigate();
//   const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);

//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `${process.env.REACT_APP_API_URL}/api/products/${productId}`
//         );
//         console.log("Product Data:", response.data); // Check the response here
//         setProduct(response.data);
//         // setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         // setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   useEffect(() => {
//     const contentArray = content.split("\n");
//     const truncated = contentArray.slice(0, 8).join("\n");
//     setTruncatedContent(truncated);
//   }, [content]);

//   const addLike = async () => {
//     try {
//       const { data } = await axiosInstance.put(
//         `${process.env.REACT_APP_API_URL}/api/addlike/product/${id}`
//       );
//       console.log("likes", data.product);
//       if (data.success === true) {
//         showProducts();
//       }
//     } catch (error) {
//       console.log(error.response.data.error);
//       toast.error(error.response.data.error);
//     }
//   };

//   const removeLike = async () => {
//     try {
//       const { data } = await axiosInstance.put(
//         `${process.env.REACT_APP_API_URL}/api/removelike/product/${id}`
//       );
//       console.log("remove likes", data.product);
//       if (data.success === true) {
//         showProducts();
//       }
//     } catch (error) {
//       console.log(error.response.data.error);
//       toast.error(error.response.data.error);
//     }
//   };

//   const addToCart = () => {
//     if (isAuthenticated) {
//       history("/singlepro");
//     } else {
//       history("/login");
//     }
//   };

//   // Get the first image from the images array
//   const firstImage = images && images.length > 0 ? images[0].url : "";
//   // const image = product.variants.find(v => v.image)?.image || "";


//   return (
//     <div className="">
//       <div
//         id="productInfo"
//         className="w-full p-2 shadow-md rounded-lg border-2 border-[#d5c085] bg-white flex flex-col"
//       >
//         <Link to={`/product/${id}`}>
//           <img
//             className="w-full h-44  object-cover rounded-md"
//             src={firstImage}
//             // {...image || "/default-image.jpg"}
//             alt="product"
//           />
//         </Link>
//         <p className="pt-2 text-lg font-bold text-gray-800 truncate">
//           {title}
//         </p>
//         <p className="text-gray-600 text-sm">
//           <span className="font-bold">Origin:</span> {truncatedContent}
//         </p>
//         <div className="flex items-center mt-1 space-x-1">
//           <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//           <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//           <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//           <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//           <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//         </div>
//         <p className=" text-lg font-bold text-green-600">${price}</p>
//         <Link to={`/product/${id}`}>
//           <button className="bg-blue-600 text-white text-sm px-4 py-2 mt-4 rounded-md hover:bg-blue-700 transition">
//             Buy Now
//           </button>
//         </Link>

      
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



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
            className="w-full h-52 object-cover rounded-md"
            src={firstVariantImageUrl || "/default-image.jpg"} // Fallback to a default image if no variant exists
            alt="product"
          />
        </Link>
        <p className="pt-2 text-lg font-serif text-gray-800 truncate">{title}</p>
        <p className="text-gray-600 text-sm">
          {/* <span className="font-bold">Origin:</span> {truncatedContent} */}
        </p>
        {/* <div className="flex items-center mt-1 space-x-1">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
        </div> */}
        <p className="text-lg font-mono ">৳ {price}</p>
        {/* <Link to={`/product/${id}`}>
          <button className="bg-blue-600 text-white text-sm px-4 py-2 mt-4 rounded-md hover:bg-blue-700 transition">
            Buy Now
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default ProductCard;
