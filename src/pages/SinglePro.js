// old component
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import {
//   faAward,
//   faCalendarDays,
//   faLocationDot,
//   faMoneyBills,
//   faTruck,
// } from "@fortawesome/free-solid-svg-icons";
// import Loader from "../components/Loader";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";
// import DOMPurify from "dompurify";
// import axiosInstance from "./axiosInstance";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import Footer from "../components/Shared/Footer/Footer";
// import CommentList from "../components/CommentList";
// import { toast } from "react-toastify";
// import { useCart } from "../hooks";
// const socket = io("/", {
//   reconnection: true,
// });

// const SinglePro = () => {
//   const { userInfo } = useSelector((state) => state.signIn);
//   const {
//     cart,
//     addCartItem,
//     incrementItem,
//     decrementItem,
//     removeItemFromCart,
//   } = useCart();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [comment, setComment] = useState("");
//   const [commentsRealTime, setCommentsRealTime] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(""); // New state for main image
//   const [selectedSize, setSelectedSize] = useState(null); // New state for size

//   const navigate = useNavigate();
//   const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
//   const { id } = useParams();

//   const displaySingleProduct = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/product/${id}`
//       );
//       setProduct(data.product);
//       setSelectedImage(data.product?.images[0]?.url); // Set initial main image
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     displaySingleProduct();
//   }, []);

//   useEffect(() => {
//     socket.on("new-comment", (newComment) => {
//       setCommentsRealTime(newComment);
//     });
//   }, []);

//   const addComment = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axiosInstance.put(
//         `${process.env.REACT_APP_API_URL}/api/comment/product/${id}`,
//         { comment }
//       );
//       if (data.success === true) {
//         setComment("");
//         toast.success("Comment added");
//         socket.emit("comment", data.product?.comments);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error);
//     }
//   };

//   let uiCommentUpdate =
//     commentsRealTime.length > 0 ? commentsRealTime : product?.comments;

//   useEffect(() => {
//     if (product) {
//       const totalPrices = Number(product.price) * quantity;
//       setTotalPrice(totalPrices);
//     }
//   }, [product, quantity]);

//   const incrementQuantity = () => {
//     console.log(product);
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const addToCart = () => {
//     if (!selectedSize) {
//       toast.error("Please select a size before adding to cart");
//       return;
//     }

//     const selectedProduct = {
//       ...product,
//       size: selectedSize, // Add selected size to the product object
//     };

//     addCartItem(selectedProduct);
//   };

//   const handleBuyNow = () => {
//     navigate("/checkout");
//   };

//   const handleSizeSelect = (size) => {
//     setSelectedSize(size); // Update selected size
//   };

//   return (
//     <div className="bg-white min-h-screen">
//       <div className="container mx-auto py-8">
//         {loading || !product ? (
//           <Loader />
//         ) : (
//           <div className="flex flex-col lg:flex-row bg-gray-50 p-6 shadow-md rounded-md">
//             {/* Product Images */}
//             {/* Product Images */}
//             <div className="lg:w-1/3 p-4">
//               {product.images && product.images.length > 0 ? (
//                 <div className="relative">
//                   {/* Main Image Display */}
//                   <div className="border rounded-md mb-4">
//                     <img
//                       src={selectedImage} // Show the selected image
//                       alt={product.title}
//                       className="w-full h-96 object-cover rounded-md"
//                       style={{ aspectRatio: "1 / 1" }} // Ensures a perfect square
//                     />
//                   </div>

//                   {/* Display Color Name */}
//                   <div className="mt-4 text-center">
//                     {product.images.map(
//                       (img) =>
//                         selectedImage === img.url && (
//                           <p
//                             key={img._id}
//                             className="text-sm font-semibold text-gray-700"
//                           >
//                             Color: {img.color || "N/A"}
//                           </p>
//                         )
//                     )}
//                   </div>
//                   {/* Thumbnail Slider */}
//                   <div className="flex space-x-2 overflow-x-auto">
//                     {product.images.map((img, index) => (
//                       <img
//                         key={index}
//                         src={img.url}
//                         className={`w-16 h-16 object-cover rounded-md border cursor-pointer hover:shadow-lg transition ${
//                           selectedImage === img.url ? "border-blue-500" : ""
//                         }`}
//                         alt={`Thumbnail ${index + 1}`}
//                         onClick={() => setSelectedImage(img.url)} // Update selected image
//                       />
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No images available</p>
//               )}
//             </div>

//             {/* Product Details */}
//             <div className="lg:w-2/3 p-4">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {product.title}
//               </h2>
//               <div className="flex items-center space-x-2 my-2">
//                 {[...Array(5)].map((_, i) => (
//                   <FontAwesomeIcon
//                     key={i}
//                     icon={faStar}
//                     className="text-yellow-500"
//                   />
//                 ))}
//               </div>
//               <p className="text-gray-600 text-sm mt-2">
//                 <span className="font-bold">Origin:</span> {product.content}
//               </p>

//               <p
//                 className={`mt-4 font-semibold ${
//                   product.quantity > 0 ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {product.quantity > 0
//                   ? `In Stock: ${product.quantity}`
//                   : `Out of Stock: ${product.quantity}`}
//               </p>

//               <div className="mt-4">
//                 <p className="text-xl font-semibold text-green-600">
//                   ${product.price}
//                 </p>
//                 <p className="line-through text-gray-400">$30</p>
//               </div>

//               {/* Size Selector */}
//               <div className="mt-4">
//                 <h3 className="text-lg font-bold text-gray-700 mb-2">Sizes</h3>
//                 <div className="flex space-x-2">
//                   {[36, 38, 40, 42, 44].map((size) => (
//                     <button
//                       key={size}
//                       className={`px-4 py-2 rounded-md border transition ${
//                         selectedSize === size
//                           ? "bg-blue-600 text-white"
//                           : "bg-gray-200 text-gray-800"
//                       }`}
//                       onClick={() => handleSizeSelect(size)}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//                 {selectedSize && (
//                   <p className="mt-2 text-sm text-gray-600">
//                     Selected Size:{" "}
//                     <span className="font-bold">{selectedSize}</span>
//                   </p>
//                 )}
//               </div>

//               <div className="mt-4">
//                 <button
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//                   onClick={addToCart}
//                   disabled={product.quantity <= 0} // Disable if product is out of stock
//                 >
//                   Add to Cart
//                 </button>
//                 <button
//                   className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
//                   onClick={handleBuyNow}
//                   disabled={product.quantity <= 0} // Disable if product is out of stock
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Comments Section */}
//         <div className="mt-8">
//           {userInfo ? (
//             <div className="bg-white p-4 rounded-md shadow-md">
//               <h2 className="text-lg font-bold text-gray-800">
//                 Add Your Comment
//               </h2>
//               <form onSubmit={addComment} className="mt-4">
//                 <textarea
//                   className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   rows="4"
//                   placeholder="Write your comment here..."
//                   onChange={(e) => setComment(e.target.value)}
//                   value={comment}
//                 ></textarea>
//                 <button
//                   type="submit"
//                   className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//                 >
//                   Submit
//                 </button>
//               </form>
//             </div>
//           ) : (
//             <p className="text-center text-gray-600">
//               <Link to="/login" className="text-blue-600 underline">
//                 Log in
//               </Link>{" "}
//               to add a comment.
//             </p>
//           )}

//           <div className="mt-6">
//             <h2 className="text-lg font-bold text-gray-800">Comments</h2>
//             <div className="space-y-4 mt-4">
//               {uiCommentUpdate && uiCommentUpdate.length > 0 ? (
//                 uiCommentUpdate.map((comment) => (
//                   <CommentList
//                     key={comment._id}
//                     name={comment.postedBy.name}
//                     text={comment.text}
//                   />
//                 ))
//               ) : (
//                 <p className="text-gray-500">
//                   No comments yet. Be the first to comment!
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default SinglePro;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";
import Loader from "../components/Loader";
import Footer from "../components/Shared/Footer/Footer";
import CommentList from "../components/CommentList";
import { useCart } from "../hooks/CartProvider";

const socket = io("/", {
  reconnection: true,
});

const SinglePro = () => {
  const { userInfo } = useSelector((state) => state.signIn);
  const {
        cart,
        addCartItem,
        incrementItem,
        decrementItem,
        removeItemFromCart,
      } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [commentsRealTime, setCommentsRealTime] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const displaySingleProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/product/${id}`
      );
      setProduct(data.product);
      setMainImage(data.product.images[0]?.url); // Set the first image as the main image
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displaySingleProduct();
  }, []);

  useEffect(() => {
    socket.on("new-comment", (newComment) => {
      setCommentsRealTime(newComment);
    });
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put(
        `${process.env.REACT_APP_API_URL}/api/comment/product/${id}`,
        { comment }
      );
      if (data.success === true) {
        setComment("");
        toast.success("Comment added");
        socket.emit("comment", data.product?.comments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const uiCommentUpdate =
    commentsRealTime.length > 0 ? commentsRealTime : product?.comments;

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const sizesForColor = product.variants
      .filter((variant) => variant.color === color)
      .map((variant) => variant.size);
    setAvailableSizes(sizesForColor);
    setSelectedSize(null); 
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select both size and color before adding to cart");
      return;
    }

    const selectedProduct = {
      ...product,
      size: selectedSize,
      color: selectedColor,
    };

    console.log("Added to cart:", selectedProduct);
    addCartItem(selectedProduct);
  };

  const handleBuyNow = () => {
    navigate("/checkout");
  };

  const handleImageClick = (color, imageUrl) => {
    setMainImage(imageUrl);
    setSelectedColor(color); // Set the color when image is clicked
  };

  const uniqueColors = [
    ...new Set(product?.variants.map((variant) => variant.color)),
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-8">
        {loading || !product ? (
          <Loader />
        ) : (
          <div className="flex flex-col lg:flex-row bg-gray-50 p-6 shadow-md rounded-md">
            {/* Product Images */}
            {/* <div className="lg:w-1/3 p-4"> */}
              {/* Main Image */}
              {/* <div className="relative">
                <img
                  src={mainImage}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-md"
                />
              </div> */}

              {/* Thumbnails */}
              {/* {product.images && product.images.length > 1 && (
                <div className="flex mt-4 space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => {
                    const color = product.variants.find(
                      (variant) => variant.image === image.url
                    )?.color;
                    return (
                      <div key={index} className="text-center">
                        <img
                          src={image.url}
                          alt={`Thumbnail ${index + 1}`}
                          className={`w-16 h-16 object-cover rounded-md cursor-pointer border ${
                            mainImage === image.url
                              ? "border-blue-500"
                              : "border-gray-300"
                          }`}
                          onClick={() => handleImageClick(color, image.url)}
                        />
                        <p className="text-sm mt-1 text-gray-600">
                          Color: {img.color || "N/A"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )} */}



<div className="lg:w-1/3 p-4">
      {product.images && product.images.length > 0 ? (
        <div className="relative">
          {/* Main Image Display */}
          <div className="border rounded-md mb-4">
            <img
              src={mainImage} // Show the selected image
              alt={product.title}
              className="w-full h-96 object-cover rounded-md"
              style={{ aspectRatio: "1 / 1" }} // Ensures a perfect square
            />
          </div>

          {/* Display Color Name */}
          <div className="mt-4 text-center">
            <p className="text-sm font-semibold text-gray-700">
              Color: {selectedColor || "N/A"}
            </p>
          </div>

          {/* Thumbnail Slider */}
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((img, index) => (
              <div key={index} className="text-center">
                <img
                  src={img.url}
                  className={`w-16 h-16 object-cover rounded-md border cursor-pointer hover:shadow-lg transition ${
                    mainImage === img.url ? "border-blue-500" : ""
                  }`}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleImageClick(img.color, img.url)} // Update selected image and color
                />
                {/* <p className="text-sm mt-1 text-gray-600">
                  Color: {img.color || "N/A"}
                </p> */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No images available</p>
      )}
    </div>
            {/* </div> */}

            {/* Product Details */}
            <div className="lg:w-2/3 p-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h2>
              <div className="mt-4">
                <p className="text-xl  font-semibold text-black">
                ৳{product.price}
                </p>
                {/* <p className="line-through text-gray-400">$30</p> */}
              </div>

             

              {/* Color Selector */}
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-700 mb-2">Colors</h3>
                <div className="flex space-x-2">
                  {uniqueColors.map((color, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-md border transition ${
                        selectedColor === color
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                      onClick={() => handleColorSelect(color)}
                    >
                      {color}
                    </button>
                  ))}
                  
                </div>
                {/* Selected Color Display */}
              {selectedColor && (
                <div className="mt-4">
                  <p className="text-sm text-gray-700">
                    Selected Color:{" "}
                    <span className="font-bold">{selectedColor}</span>
                  </p>
                </div>
              )}
              </div>


              {/* Size Selector */}
              {selectedColor && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-700 mb-2">
                    Sizes
                  </h3>
                  <div className="flex space-x-2">
                    {availableSizes.map((size, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-md border transition ${
                          selectedSize === size
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                        onClick={() => handleSizeSelect(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {selectedSize && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected Size:{" "}
                      <span className="font-bold">{selectedSize}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  onClick={addToCart}
                  disabled={product.quantity <= 0}
                >
                  Add to Cart
                </button>
                <button
                  className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                  onClick={handleBuyNow}
                  disabled={product.quantity <= 0}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-8">
          {userInfo ? (
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-bold text-gray-800">
                Add Your Comment
              </h2>
              <form onSubmit={addComment} className="mt-4">
                <textarea
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Write your comment here..."
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                ></textarea>
                <button
                  type="submit"
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-bold text-gray-800">
                Please sign in to add a comment.
              </h2>
            </div>
          )}

          <CommentList comments={uiCommentUpdate} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SinglePro;
