// import Card from "@mui/material/Card";
// import "./ProductCard.css";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";
// import { Box } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import IconButton from "@mui/material/IconButton";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import CommentIcon from "@mui/icons-material/Comment";

// import axios from "axios";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import am from "../assets/333.png";
// import axiosInstance from "../pages/axiosInstance";
// import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
// import { faStar } from "@fortawesome/free-regular-svg-icons";

// const ProductCard = ({
//   id,
//   title,
//   price,
//   image,
//   content,
//   subheader,
//   comments,
//   likes,
//   showProducts,
//   likesId,
// }) => {
//   const { userInfo } = useSelector((state) => state.signIn);

//   const [truncatedContent, setTruncatedContent] = useState("");
//   const history = useNavigate();
//   const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);

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
//       if (data.success == true) {
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
//       if (data.success == true) {
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
//   return (
//     <div className="overflow-hidden ">
//       <div className="row row-cols-1 row-cols-md-4 row-cols-lg-6  ">
//         <div id="productInfo" className="   w-100  shadow">
//           <div className="mb-2 pb-3 rounded px-2 py-2 border border-1 ">
//             <Link to={`/product/${id}`}>
//               <img
//                 className="advisor-img w-100 img-height border rounded"
//                 src={image}
//                 alt="advisor_team"
//               />
//             </Link>
//             <p className="pt-2 px-1 fw-bold">{title}</p>

//             <p>
//               <span className="fw-bold">Origin:</span> {truncatedContent}
//             </p>
//             <br />
//             <span>
//               <FontAwesomeIcon icon={faStar} className="text-warning " />
//               <FontAwesomeIcon icon={faStar} className="text-warning " />
//               <FontAwesomeIcon icon={faStar} className="text-warning " />
//               <FontAwesomeIcon icon={faStar} className="text-warning " />
//               <FontAwesomeIcon icon={faStar} className="text-warning " />
//             </span>
//             <br />
//             <span className="fw-bold font-color">${price}</span>
//             <br />
//             <Link to={`/product/${id}`}>
//               <button className="bg-color  text-white border-0 px-2 py-1">
//                 Buy Now
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;




// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-regular-svg-icons";
// import { useEffect, useState } from "react";
// import axiosInstance from "../pages/axiosInstance";

// const ProductCard = ({
//   id,
//   title,
//   price,
//   image,
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

//   return (
//     <div className="overflow-hidden">
//       <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         <div
//           id="productInfo"
//           className="w-full shadow rounded-lg border border-gray-300 p-4 bg-white"
//         >
//           <Link to={`/product/${id}`}>
//             <img
//               className="w-full h-64 object-cover rounded-md"
//               src={image}
//               alt="product"
//             />
//           </Link>
//           <p className="pt-2 text-lg font-bold text-gray-800 truncate">
//             {title}
//           </p>
//           <p className="text-gray-600 text-sm mt-2">
//             <span className="font-bold">Origin:</span> {truncatedContent}
//           </p>
//           <div className="flex items-center mt-3 space-x-1">
//             <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//             <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//             <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//             <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//             <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//           </div>
//           <p className="mt-3 text-lg font-bold text-green-600">${price}</p>
//           <Link to={`/product/${id}`}>
//             <button className="bg-blue-600 text-white text-sm px-4 py-2 mt-4 rounded-md hover:bg-blue-700 transition">
//               Buy Now
//             </button>
//           </Link>
//         </div>
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

const ProductCard = ({
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
      </div>
    </div>
  );
};

export default ProductCard;
