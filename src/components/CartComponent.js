import React from "react";
import { useCart } from "../hooks";
import { Link } from "react-router-dom";
import Footer from "./Shared/Footer/Footer";

const CartComponent = () => {
  const {
    cart,
    addCartItem,
    incrementItem,
    decrementItem,
    removeItemFromCart,
  } = useCart();
  //   console.log({ cart });
  let totalSum = 0;
  cart.forEach((itm) => {
    totalSum += Number(itm.price) * itm.quantity;
    // totalSum += Number(itm.feature1) * itm.quantity;
  });
  console.log(cart);
  return (
    <>
      <div className="p-5 mb-5">
        {cart?.map((itm) => (
          <div
            className="border border-1 p-3 my-2 d-flex flex-lg-row flex-md-row flex-sm-column flex-column justify-content-between"
            key={itm._id}
          >
            <img
              src={itm.images[0]?.url || "https://via.placeholder.com/150"} // Use the first image or fallback
              alt={itm.title}
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                objectFit: "cover",
              }}
            />

            <div>
              <p className="text-xl">Item Name: <span className="font-bold"> {itm.title}</span></p> 
              <p className="text-base">Size: <span className="font-bold">{itm.size}</span></p>  {/* Access and display the size */}
              <p className="text-base">Color: <span className="font-bold">{itm.color}</span></p>  {/* Access and display the size */}

              <br />
              <p className="text-xl">Price: <span className="font-bold">{Number(itm.price)}</span></p>
              {/* {itm.title} - {Number(itm.feature1)} */}
            </div>
            
            <div>
            <span className="text-xl font-bold pb-2">Total: {Number(itm.price) * itm.quantity}</span> <br />
              {/* <span>Total: {Number(itm.feature1) * itm.quantity}</span> */}
              <button
                className="mx-2 mt-3 px-3 bg-primary text-white border-0 py-1 rounded fw-bold fs-5"
                onClick={() => decrementItem(itm._id)}
              >
                -
              </button>
              <span className="mx-2 px-3 fw-bold fs-5">{itm.quantity}</span>
              <button
                className="mx-2 px-3 bg-primary text-white border-0 py-1 rounded fw-bold fs-5"
                onClick={() => incrementItem(itm._id)}
              >
                +
              </button>
              <button
                className="mx-2 px-3 bg-danger text-white border-0 py-1 rounded"
                onClick={() => removeItemFromCart(itm._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <h4 className="text-end m-3">Subtotal : {totalSum} BDT</h4>
        <div className="text-end m-3">
          <Link to={"/checkout"}>
            <button className="bg-color text-white border-0 rounded px-3 py-2">
              Proceed to checkout
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartComponent;
