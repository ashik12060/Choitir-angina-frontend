import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  faAward,
  faCalendarDays,
  faLocationDot,
  faMoneyBills,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import DOMPurify from "dompurify";
import axiosInstance from "./axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Shared/Footer/Footer";
import CommentList from "../components/CommentList";
import { toast } from "react-toastify";
import { useCart } from "../hooks";
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [comment, setComment] = useState("");
  const [commentsRealTime, setCommentsRealTime] = useState([]);
  const [selectedImage, setSelectedImage] = useState(""); // New state for main image

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const { id } = useParams();

  const displaySingleProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/product/${id}`
      );
      setProduct(data.product);
      setSelectedImage(data.product?.images[0]?.url); // Set initial main image
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

  let uiCommentUpdate =
    commentsRealTime.length > 0 ? commentsRealTime : product?.comments;

  useEffect(() => {
    if (product) {
      const totalPrices = Number(product.price) * quantity;
      setTotalPrice(totalPrices);
    }
  }, [product, quantity]);

  const incrementQuantity = () => {
    console.log(product);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    addCartItem(product);
  };

  const handleBuyNow = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-8">
        {loading || !product ? (
          <Loader />
        ) : (
          <div className="flex flex-col lg:flex-row bg-gray-50 p-6 shadow-md rounded-md">
            {/* Product Images */}
            {/* Product Images */}
            <div className="lg:w-1/3 p-4">
              {product.images && product.images.length > 0 ? (
                <div className="relative">
                  {/* Main Image Display */}
                  <div className="border rounded-md mb-4">
                    <img
                      src={selectedImage} // Show the selected image
                      alt={product.title}
                      // className="w-full h-auto object-cover rounded-md"
                      className="w-full h-96 object-cover rounded-md" // Fixed height for square aspect ratio
                      style={{ aspectRatio: "1 / 1" }} // Ensures a perfect square
                    />
                  </div>

                  {/* Thumbnail Slider */}
                  <div className="flex space-x-2 overflow-x-auto">
                    {product.images.map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        className={`w-16 h-16 object-cover rounded-md border cursor-pointer hover:shadow-lg transition ${
                          selectedImage === img.url ? "border-blue-500" : ""
                        }`}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={() => setSelectedImage(img.url)} // Update selected image
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No images available</p>
              )}
            </div>

            {/* Product Details */}
            <div className="lg:w-2/3 p-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h2>
              <div className="flex items-center space-x-2 my-2">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className="text-yellow-500"
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-2">
                <span className="font-bold">Origin:</span> {product.content}
              </p>
              <div className="mt-4">
                <p className="text-xl font-semibold text-green-600">
                  ${product.price}
                </p>
                <p className="line-through text-gray-400">$30</p>
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Comments Section */}
        {/* <div className="mt-8">
          {userInfo ? (
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-bold text-gray-800">Add Your Comment</h2>
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
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <p className="text-center text-gray-600">
              <Link to="/login" className="text-blue-600 underline">
                Log in
              </Link>{" "}
              to add a comment.
            </p>
          )}

          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800">Comments</h2>
            <div className="space-y-4 mt-4">
              {uiCommentUpdate.map((comment) => (
                <CommentList
                  key={comment._id}
                  name={comment.postedBy.name}
                  text={comment.text}
                />
              ))}
            </div>
          </div>
        </div> */}

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
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <p className="text-center text-gray-600">
              <Link to="/login" className="text-blue-600 underline">
                Log in
              </Link>{" "}
              to add a comment.
            </p>
          )}

          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800">Comments</h2>
            <div className="space-y-4 mt-4">
              {uiCommentUpdate && uiCommentUpdate.length > 0 ? (
                uiCommentUpdate.map((comment) => (
                  <CommentList
                    key={comment._id}
                    name={comment.postedBy.name}
                    text={comment.text}
                  />
                ))
              ) : (
                <p className="text-gray-500">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SinglePro;
