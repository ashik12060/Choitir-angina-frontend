

// import React, { useEffect, useState } from "react";
// import axiosInstance from "../pages/axiosInstance";
// import "./OrderSingle.css"; // Import CSS file for styling

// const OrderSingle = () => {
//   const [orderItems, setOrderItems] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8);

//   useEffect(() => {
//     const fetchOrderItems = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `${process.env.REACT_APP_API_URL}/api/orders`
//         );
//         setOrderItems(response.data.orders);
//       } catch (error) {
//         console.error("Error fetching order items:", error);
//       }
//     };

//     fetchOrderItems();
//   }, []);

//   // Calculate index of the first and last item on the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = orderItems.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <h3 className="mb-2 text-center">
//         <span className="py-2 px-4 rounded bg-primary text-white">
//           Total Orders: {orderItems.length}
//         </span>
//       </h3>
//       <h2>Reports</h2>
//       <table className="order-table">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Product ID</th>
//             <th>Quantity</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((order) => (
//             <React.Fragment key={order._id}>
//               <tr>
//                 <td
//                   className="border border-1 px-3 text-center"
//                   rowSpan={order.orderItems.length}
//                 >
//                   {order._id}
//                 </td>
//                 <td className="border border-1 px-3 text-center">
//                   {order.orderItems[0].productId}
//                 </td>
//                 <td className="border border-1 px-3 text-center">
//                   {order.orderItems[0].quantity}
//                 </td>
//                 <td className="border border-1 px-3 text-center">
//                   ${order.orderItems[0].price}
//                 </td>
//               </tr>
//               {order.orderItems.slice(1).map((item, index) => (
//                 <tr key={index} className="border border-1">
//                   <td className="border border-1 px-3 text-center">
//                     {item.productId}
//                   </td>
//                   <td className="border border-1 px-3 text-center">
//                     {item.quantity}
//                   </td>
//                   <td className="border border-1 px-3 text-center">
//                     ${item.price}
//                   </td>
//                 </tr>
//               ))}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination  */}
//       <div className="pagination">
//         {Array.from({ length: Math.ceil(orderItems.length / itemsPerPage) }).map(
//           (_, index) => (
//             <button
//               key={index}
//               className={`pagination-btn ${
//                 currentPage === index + 1 ? "active" : ""
//               }`}
//               onClick={() => paginate(index + 1)}
//             >
//               {index + 1}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderSingle;


import React, { useEffect, useState } from "react";
import axiosInstance from "../pages/axiosInstance"; // Assuming axiosInstance is correctly configured

const OrderSingle = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Calculate index of the first and last order on the current page
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total price for an order
  const calculateTotalPrice = (order) => {
    return order.orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Handle status change
  const handleStatusChange = (orderId, status) => {
    console.log(`Order ${orderId} status changed to ${status}`);
    // Add logic to update status in your backend here
  };

  return (
    <div className="px-4 py-6">
      <h3 className="text-center mb-4">
        <span className="py-2 px-4 rounded bg-blue-500 text-white">
          Total Orders: {orders.length}
        </span>
      </h3>
      <h2 className="text-xl font-semibold mb-4">Reports</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Order ID</th>
            <th className="px-4 py-2 border-b">User Name</th>
            <th className="px-4 py-2 border-b">Order Date</th>
            <th className="px-4 py-2 border-b">Total Price</th>
            <th className="px-4 py-2 border-b">Delivery Method</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => {
            const { customerDetails } = order; // Destructure customerDetails from order
            return (
              <React.Fragment key={order._id}>
                <tr>
                  <td className="px-4 py-2 border-b" rowSpan={order.orderItems.length}>
                    {order._id}
                  </td>
                  <td className="px-4 py-2 border-b" rowSpan={order.orderItems.length}>
                    {customerDetails ? customerDetails.name : "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b" rowSpan={order.orderItems.length}>
                    {new Date(order.orderDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b" rowSpan={order.orderItems.length}>
                    ${calculateTotalPrice(order).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border-b" rowSpan={order.orderItems.length}>
                    {customerDetails ? customerDetails.deliveryMethod : "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      className="p-2 border rounded-lg"
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                      View Details
                    </button>
                  </td>
                </tr>
                {order.orderItems.slice(1).map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{item.productName}</td> {/* Display Product Name */}
                    <td className="px-4 py-2 border-b">{item.quantity}</td>
                    <td className="px-4 py-2 border-b">${item.price}</td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {/* Pagination  */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderSingle;
