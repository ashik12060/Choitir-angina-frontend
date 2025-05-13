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
  const [selectedLength, setSelectedLength] = useState(null);

  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const displaySingleProduct = async () => {
    //   setLoading(true);
    //   try {
    //     const { data } = await axiosInstance.get(
    //       `${process.env.REACT_APP_API_URL}/api/product/${id}`
    //     );
    //     setProduct(data.product);

    //     setMainImage(data.product.images[0]?.url); // Set the first image as the main image
    //     setLoading(false);
    //     console.log(product);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/product/${id}`
      );
      setProduct(data.product);

      // Set the first variant's image as the main image
      const firstVariantImage = data.product.variants[0]?.imageUrl;
      setMainImage(firstVariantImage);
      setLoading(false);
      console.log(data.product);
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
    console.log(product.variants);
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

  //   const productLength = product.variants[1].productLength;
  // console.log(productLength); // Outputs: 10

  const handleBuyNow = () => {
    navigate("/cart");
  };

  // const handleImageClick = (color, imageUrl) => {
  //   setMainImage(imageUrl);
  //   setSelectedColor(color); // Set the color when image is clicked
  // };
  const handleImageClick = (color, imageUrl) => {
    setMainImage(imageUrl);
    setSelectedColor(color); // Set the color when image is clicked
  };

  const uniqueColors = [
    ...new Set(product?.variants.map((variant) => variant.color)),
  ];

  const [zoomStyle, setZoomStyle] = useState({});
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
    });
  };
  const resetZoom = () => {
    setZoomStyle({});
  };

  if (!product) {
    return <div>Loading...</div>; // You can show a loading state or a fallback message
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-8">
        {loading || !product ? (
          <Loader />
        ) : (
          <div className="flex flex-col lg:flex-row bg-gray-50 p-6 shadow-md rounded-md">
            <div className="lg:w-1/3 p-4">
              {product.variants && product.variants.length > 0 ? (
                <div className="relative">
                
                  <div
                    className="border rounded-md mb-4 overflow-hidden group relative"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={resetZoom}
                  >
                   
                    <img
                      src={mainImage} // Show the selected image from the variant
                      alt={product.title}
                      className="w-full h-96 object-cover rounded-md transition-transform duration-300"
                      style={{
                        ...zoomStyle,
                        transform: zoomStyle.transformOrigin
                          ? "scale(2)" // Adjust the zoom level as needed
                          : "scale(1)",
                      }}
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-sm font-semibold text-gray-700">
                      Color: {selectedColor || "N/A"}
                    </p>
                  </div>

                  <div className="flex space-x-2 overflow-x-auto">
                    
                    {product.variants.map((variant, index) => (
                      <div key={index} className="text-center">
                        <img
                          src={variant.imageUrl} // Get image from variant
                          className={`w-16 h-16 object-cover rounded-md border cursor-pointer hover:shadow-lg transition ${mainImage === variant.imageUrl ? "border-blue-500" : ""}`}
                          alt={`Thumbnail ${index + 1}`}
                          onClick={() => handleImageClick(variant.color, variant.imageUrl)} // Update selected image and color
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No images available</p>
              )}

              <div className="py-10">
                <h4 className="font-bold pb--3">Product Description</h4>
                <p>{product.description}</p>
              </div>
            </div>
            {/* </div> */}

            {/* Product Details */}
            <div className="lg:w-2/3 p-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h2>

              <p className="text-lg">
                <span className="text-sm">Quantity available:</span>{" "}
                {product.variants.reduce(
                  (total, variant) => total + variant.quantity,
                  0
                )}
              </p>

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

              {selectedColor && (
                <div className="mt-4">
                  {product.variants
                    .filter((variant) => variant.color === selectedColor)
                    .map((variant, index) => (
                      <p key={index} className="text-lg">
                        <span className="font-bold">Length:</span>{" "}
                        {variant.productLength}
                      </p>
                    ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  onClick={addToCart}
                  // disabled={product.quantity <= 0}
                  disabled={product.variants.some(
                    (variant) => variant.quantity <= 0
                  )}
                >
                  Add to Cart
                </button>
                <button
                  className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                  onClick={handleBuyNow}
                  // disabled={product.quantity <= 0}
                  disabled={product.variants.some(
                    (variant) => variant.quantity <= 0
                  )}
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
