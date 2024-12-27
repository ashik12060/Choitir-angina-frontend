// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
// import {
//   faAward,
//   faLocationDot,
//   faMoneyBills,
//   faTruck,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Header from "../components/Shared/Header/Header";
// import axiosInstance from "./axiosInstance";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { CartProvider, useCart } from "../hooks";

// const CheckOut = () => {
//   const { cart, clearCart } = useCart();

//   const navigate = useNavigate();

//   const search = useParams();
//   console.log(search.totalPrice);
//   console.log(search.id);

//   const deliveryFee = 15;
//   const price = Number(search.totalPrice) + deliveryFee;

//   console.log(price);

//   // sending data to mongodb
//   const handlePlaceOrder = () => {
//     axiosInstance
//       .post(`${process.env.REACT_APP_API_URL}/api/order/place`, cart)
//       .then((response) => {
//         clearCart();
//         console.log("Order placed successfully:", response.data);
//         toast.success("Payment Completed");
//         navigate("/bkash-payment");
//       })
//       .catch((error) => {
//         console.error("Error placing order:", error);
//       });
//   };
//   let totalSum = 0;
//   cart.forEach((itm) => {
//     totalSum += Number(itm.price) * itm.quantity;
//     // totalSum += Number(itm.feature1) * itm.quantity;
//     // console.log(feature1)
//     console.log(price);
//   });
//   return (
//     <div>
//       <CartProvider>
//         <Header />
//       </CartProvider>
      
//       <div className=" m-4 d-flex flex-lg-row flex-md-row flex-sm-column flex-column">
//         <div className="pt-5 card2-bg px-5 w-75">
//           <h3 className="">Checkout</h3>
//           <div>
//             {cart?.map((itm) => (
//               <div
//                 className="border p-3 my-2 d-flex flex-lg-row flex-md-row flex-sm-column flex-column justify-content-between"
//                 key={itm._id}
//               >
//                 <h6>
//                   {itm.title} - {Number(itm.price)} x {itm.quantity}
//                 </h6>
//                 <div>
//                   <span className="fw-bold">
//                     Total: {Number(itm.price) * itm.quantity}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="ps-5 pt-5">
//           <div className="pb-3">
//             <p className="fw-bold fs-5">Promo Code:</p>
//             <input
//               className="border border-1 "
//               type="text"
//               placeholder="Enter Promo Code"
//             />
//           </div>

//           <h5>Order Summary</h5>
//           <hr />
//           <h6>
//             <strong>Product Price:</strong>{" "}
//             <span className="ps-3">BDT {totalSum}</span>
//           </h6>
//           <h6>
//             <strong className="pe-1">Delivery Fee: </strong>
//             <span className="ps-4">BDT 15.00</span>
//           </h6>
//           <h6>
//             <strong>Total Price</strong>{" "}
//             <span className="ps-5">BDT {totalSum + 15}</span>
//           </h6>
//           <>
//             <button
//               onClick={handlePlaceOrder}
//               className="px-5 py-2 rounded bg-color border-0 text-white fw-bold"
//             >
//               Place Order
//             </button>
//           </>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckOut;







import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Shared/Header/Header";
import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";
import { CartProvider, useCart } from "../hooks";

const CheckOut = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const search = useParams();

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    phone: "",
    deliveryMethod: "",
    notes: "",
    paymentMethod: "cash", // Default to cash
  });

  const [deliveryFee, setDeliveryFee] = useState(60); // Default delivery fee
  const price = Number(search.totalPrice) + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // Dynamically update delivery fee
    if (name === "deliveryMethod") {
      if (value === "homeDelivery") {
        setDeliveryFee(60); // Inside Dhaka delivery fee
      } else if (value === "pickup") {
        setDeliveryFee(120); // Outside Dhaka delivery fee
      } else {
        setDeliveryFee(15); // Default delivery fee
      }
    }
  };

  const handlePlaceOrder = () => {
    const tax = totalSum * 0.1; // 10% tax
    const orderData = {
      ...customerDetails,
      cart,
      totalPrice: totalSum + deliveryFee + tax,
    };

    axiosInstance
      .post(`${process.env.REACT_APP_API_URL}/api/order/place`, orderData)
      .then((response) => {
        clearCart();
        toast.success("Payment Completed");
        navigate("/bkash-payment");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  let totalSum = 0;
  cart.forEach((itm) => {
    totalSum += Number(itm.price) * itm.quantity;
  });

  const tax = totalSum * 0.1; // Calculate 10% tax

  return (
    <div className="bg-gray-50">
      <CartProvider>
        <Header />
      </CartProvider>

      <div className="m-10 d-flex flex-lg-row flex-md-row flex-sm-column flex-column gap-16">
        {/* Left Section */}
        <div className="pt-2 w-50 px-5 border rounded bg-white pb-5">
          <h5 className="mt-4 text-2xl text-center">
            To confirm the order, please enter your name, address, and mobile
            number, then click on the <span className="font-color font-bold">Place Order</span> button.
          </h5>
          <form className="mt-3">
            {/* Customer Details */}
            <div className="mb-3">
              <label className="form-label">Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={customerDetails.name}
                onChange={handleInputChange}
                placeholder="Mr. Ashik..."
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={customerDetails.address}
                onChange={handleInputChange}
                placeholder="flat no, house number, street name, Thana, District"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone<span className="text-red-500">*</span></label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={customerDetails.phone}
                onChange={handleInputChange}
                placeholder="01317424004"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Delivery Method<span className="text-red-500">*</span></label>
              <select
                className="form-select"
                name="deliveryMethod"
                value={customerDetails.deliveryMethod}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Delivery Method</option>
                <option value="homeDelivery">Inside Dhaka (60 taka)</option>
                <option value="pickup">Outside Dhaka (120 taka)</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Customer Notes</label>
              <textarea
                className="form-control"
                name="notes"
                value={customerDetails.notes}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={customerDetails.paymentMethod === "cash"}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Cash on Delivery</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={customerDetails.paymentMethod === "online"}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Online Payment</label>
              </div>
            </div>
          </form>

          <button
            onClick={handlePlaceOrder}
            className="px-5 py-2 rounded bg-color border-0 text-white fw-bold mt-3"
          >
            Place Order
          </button>
        </div>

        {/* Right Section */}
        <div className="pt-5 w-50 px-5 border rounded bg-white">
          <h3 className="text-xl font-bold">Checkout</h3>
          <div className="mb-10 px-2">
            {cart?.map((itm) => (
              <div
                className="border p-3 my-2 d-flex flex-lg-row flex-md-row flex-sm-column flex-column justify-content-between"
                key={itm._id}
              >
                 <img
              src={itm.images[0]?.url || "https://via.placeholder.com/150"} // Use the first image or fallback
              alt={itm.title}
              style={{
                maxWidth: "50px",
                maxHeight: "50px",
                objectFit: "cover",
              }}
            />
                <p className="text-xl">
                  {itm.title} - {Number(itm.price)} x {itm.quantity}
                </p>
                <div>
                  <span className="fw-bold">
                    Total: {Number(itm.price) * itm.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <h5 className="font-bold text-xl">Order Summary</h5>
          <hr />
          <p className="py-3">
            <strong>Product Price:</strong> <span className="ps-3">BDT {totalSum}</span>
          </p>
          <p className="pb-3">
            <strong>Delivery Fee:</strong> <span className="ps-3">BDT {deliveryFee}</span>
          </p>
          <p className="pb-3">
            <strong>Tax (10%):</strong> <span className="ps-3">BDT {tax}</span>
          </p>
          <p className="pb-3">
            <strong>Total Price:</strong> <span className="ps-3">BDT {totalSum + deliveryFee + tax}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;




