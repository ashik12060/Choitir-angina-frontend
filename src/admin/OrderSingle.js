// import React, { useEffect, useState } from "react";
// import axiosInstance from "../pages/axiosInstance"; // Assuming axiosInstance is correctly configured

// const OrderSingle = () => {
//   const [orders, setOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `${process.env.REACT_APP_API_URL}/api/orders`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//             },
//           }
//         );
//         setOrders(response.data.orders);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Calculate index of the first and last order on the current page
//   const indexOfLastOrder = currentPage * itemsPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
//   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Calculate total price for an order
//   const calculateTotalPrice = (order) => {
//     return order.orderItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   };

//   // Handle status change
//   const handleStatusChange = (orderId, status) => {
//     console.log(`Order ${orderId} status changed to ${status}`);
//     // Add logic to update status in your backend here
//   };

//   return (
//     <div className="px-4 py-6">
//       <h3 className="text-center mb-4">
//         <span className="py-2 px-4 rounded bg-blue-500 text-white">
//           Total Orders: {orders.length}
//         </span>
//       </h3>
//       <h2 className="text-xl font-semibold mb-4">Reports</h2>
//       <table className="min-w-full table-auto border-collapse">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border-b">Order ID</th>
//             <th className="px-4 py-2 border-b">User Name</th>
//             <th className="px-4 py-2 border-b">Order Date</th>
//             <th className="px-4 py-2 border-b">Total Price</th>
//             <th className="px-4 py-2 border-b">Delivery Method</th>
//             <th className="px-4 py-2 border-b">Status</th>
//             <th className="px-4 py-2 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentOrders.map((order) => {
//             const { customerDetails } = order; // Destructure customerDetails from order
//             return (
//               <React.Fragment key={order._id}>
//                 <tr>
//                   <td className="px-4 py-2 border-b" rowSpan={order.orderItems.length}>
//                     {order._id}
//                   </td>
//                   <td className="px-4 py-2 border-b" rowSpan={order.orderItems.length}>
//                     {customerDetails ? customerDetails.name : "N/A"}
//                   </td>
//                   <td className="px-4 py-2 border-b" rowSpan={order.orderItems.length}>
//                     {new Date(order.orderDate).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-2 border-b" rowSpan={order.orderItems.length}>
//                     ${calculateTotalPrice(order).toFixed(2)}
//                   </td>
//                   <td className="px-4 py-2 border-b" rowSpan={order.orderItems.length}>
//                     {customerDetails ? customerDetails.deliveryMethod : "N/A"}
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     <select
//                       className="p-2 border rounded-lg"
//                       onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Delivered">Delivered</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//                 {order.orderItems.slice(1).map((item, index) => (
//                   <tr key={index}>
//                     <td className="px-4 py-2 border-b">{item.productName}</td> {/* Display Product Name */}
//                     <td className="px-4 py-2 border-b">{item.quantity}</td>
//                     <td className="px-4 py-2 border-b">${item.price}</td>
//                   </tr>
//                 ))}
//               </React.Fragment>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* Pagination  */}
//       <div className="flex justify-center mt-4">
//         {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }).map((_, index) => (
//           <button
//             key={index}
//             className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
//             onClick={() => paginate(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderSingle;

// import React, { useEffect, useState } from "react";
// import axiosInstance from "../pages/axiosInstance"; // Assuming axiosInstance is correctly configured

// const OrderSingle = () => {
//   const [orders, setOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `${process.env.REACT_APP_API_URL}/api/orders`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//             },
//           }
//         );
//         setOrders(response.data.orders);
//         console.log(response.data.orders)
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Pagination logic
//   const indexOfLastOrder = currentPage * itemsPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
//   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Calculate total price for an order
//   const calculateTotalPrice = (order) =>
//     order.orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   // Handle status change
//   const handleStatusChange = (orderId, itemId, status) => {
//     console.log(`Order ${orderId}, Item ${itemId} status changed to ${status}`);
//     // Add logic to update status in your backend here
//   };

//   return (
//     <div className="container mx-auto p-6">
//       {/* Header */}
//       <h3 className="text-center mb-6">
//         <span className="text-lg py-2 px-4 rounded bg-gray-800 text-white">
//           Total Orders: {orders.length}
//         </span>
//       </h3>

//       {/* Reports Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-300 table-fixed">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 border border-gray-300 text-left">Order ID</th>
//               <th className="px-4 py-2 border border-gray-300 text-left">User Name</th>
//               <th className="px-4 py-2 border border-gray-300 text-left">Order Date</th>
//               <th className="px-4 py-2 border border-gray-300 text-left">Total Price</th>
//               <th className="px-4 py-2 border border-gray-300 text-left">Product</th>
//               <th className="px-4 py-2 border border-gray-300 text-left">Quantity</th>
//               <th className="px-4 py-2 border border-gray-300 text-left">Price</th>
//               <th className="px-4 py-2 border border-gray-300 text-left">Status</th>
//               <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentOrders.map((order) => {
//               const { customerDetails, orderItems } = order; // Destructure details and items
//               return (
//                 <React.Fragment key={order._id}>
//                   {orderItems.map((item, index) => (
//                     <tr key={item._id} className="hover:bg-gray-50">
//                       {index === 0 && (
//                         <>
//                           <td className="px-4 py-2 border border-gray-300" rowSpan={orderItems.length}>
//                             {order._id}
//                           </td>
//                           <td className="px-4 py-2 border border-gray-300" rowSpan={orderItems.length}>
//                             {customerDetails ? customerDetails.name : "N/A"}
//                           </td>
//                           <td className="px-4 py-2 border border-gray-300" rowSpan={orderItems.length}>
//                             {new Date(order.orderDate).toLocaleDateString()}
//                           </td>
//                           <td className="px-4 py-2 border border-gray-300" rowSpan={orderItems.length}>
//                             ${calculateTotalPrice(order).toFixed(2)}
//                           </td>
//                         </>
//                       )}
//                       <td className="px-4 py-2 border border-gray-300">{item.title}</td>
//                       <td className="px-4 py-2 border border-gray-300">{item.quantity}</td>
//                       <td className="px-4 py-2 border border-gray-300">${item.price.toFixed(2)}</td>
//                       <td className="px-4 py-2 border border-gray-300">
//                         <select
//                           className="p-2 border border-gray-300 rounded w-full"
//                           onChange={(e) =>
//                             handleStatusChange(order._id, item._id, e.target.value)
//                           }
//                           defaultValue="Pending"
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="Shipped">Shipped</option>
//                           <option value="Delivered">Delivered</option>
//                           <option value="Cancelled">Cancelled</option>
//                         </select>
//                       </td>
//                       <td className="px-4 py-2 border border-gray-300">
//                         <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600">
//                           View Details
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </React.Fragment>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }).map((_, index) => (
//           <button
//             key={index}
//             className={`px-4 py-2 border border-gray-300 rounded ${
//               currentPage === index + 1
//                 ? "bg-gray-800 text-white"
//                 : "bg-white text-gray-800 hover:bg-gray-100"
//             }`}
//             onClick={() => paginate(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
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
  const [selectedOrder, setSelectedOrder] = useState(null); // To store the selected order for details

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setOrders(response.data.orders);
        console.log(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total price for an order
  const calculateTotalPrice = (order) =>
    order.orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  // Handle status change
  const handleStatusChange = (orderId, itemId, status) => {
    console.log(`Order ${orderId}, Item ${itemId} status changed to ${status}`);
    // Add logic to update status in your backend here
  };

  // Open order details in modal
  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set the selected order details
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  // pdf download
  // const handlePrint = () => {
  //   // Create a new window or iframe to print content
  //   const printWindow = window.open("", "_blank", "width=800,height=600");

  //   if (!printWindow) {
  //     alert("Please allow pop-ups for this site");
  //     return;
  //   }

  //   // Write the document structure with print styles
  //   printWindow.document.write(
  //     "<html><head><title>Customer Order Details</title>"
  //   );
  //   printWindow.document.write(`
  //     <style>
  //       body {
  //         font-family: Arial, sans-serif;
  //         margin: 20px;
  //         padding: 0;
  //       }
  //       table {
  //         width: 100%;
  //         border-collapse: collapse;
  //         margin-top: 20px;
  //       }
  //       table, th, td {
  //         border: 1px solid #ccc;
  //       }
  //       th, td {
  //         padding: 8px;
  //         text-align: left;
  //       }
  //       th {
  //         background-color: #f1f1f1;
  //       }
  //       h2 {
  //         text-align: center;
  //         margin-bottom: 20px;
  //       }
  //       @media print {
  //         body {
  //           background: white;
  //           color: black;
  //           font-size: 14px;
  //         }
  //         table {
  //           width: 100%;
  //           page-break-before: always;
  //         }
  //         th, td {
  //           padding: 10px;
  //           text-align: left;
  //           font-size: 12px;
  //         }
  //       }
  //     </style>
  //   `);
  //   printWindow.document.write("</head><body>");
  //   printWindow.document.write("<h2>Customer Order Details</h2>");

  //   // Customer Details Section
  //   printWindow.document.write("<table>");
  //   printWindow.document.write(
  //     "<thead><tr><th>Field</th><th>Details</th></tr></thead>"
  //   );
  //   printWindow.document.write("<tbody>");
  //   printWindow.document.write(
  //     `<tr><td>Name</td><td>${selectedOrder.customerDetails.name}</td></tr>`
  //   );
  //   printWindow.document.write(
  //     `<tr><td>Address</td><td>${selectedOrder.customerDetails.address}</td></tr>`
  //   );
  //   printWindow.document.write(
  //     `<tr><td>Phone</td><td>${selectedOrder.customerDetails.phone}</td></tr>`
  //   );
  //   printWindow.document.write(
  //     `<tr><td>Delivery Method</td><td>${selectedOrder.customerDetails.deliveryMethod}</td></tr>`
  //   );
  //   printWindow.document.write(
  //     `<tr><td>Notes</td><td>${
  //       selectedOrder.customerDetails.notes || "N/A"
  //     }</td></tr>`
  //   );
  //   printWindow.document.write(
  //     `<tr><td>Payment Method</td><td>${selectedOrder.customerDetails.paymentMethod}</td></tr>`
  //   );
  //   printWindow.document.write("</tbody></table>");

  //   // Order Items Section
  //   printWindow.document.write("<h3>Order Items</h3>");
  //   printWindow.document.write("<table>");
  //   printWindow.document.write(
  //     "<thead><tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th></tr></thead>"
  //   );
  //   printWindow.document.write("<tbody>");
  //   selectedOrder.orderItems.forEach((item) => {
  //     printWindow.document.write(
  //       `<tr><td>${item.title}</td><td>${
  //         item.quantity
  //       }</td><td>$${item.price.toFixed(2)}</td><td>$${(
  //         item.price * item.quantity
  //       ).toFixed(2)}</td></tr>`
  //     );
  //   });
  //   printWindow.document.write("</tbody></table>");

  //   printWindow.document.write("</body></html>");
  //   printWindow.document.close();

  //   // Ensure the content is loaded before printing
  //   printWindow.onload = () => {
  //     printWindow.print();
  //   };
  // };

  const handlePrint = () => {
    if (!selectedOrder) {
      alert("No order selected to print.");
      return;
    }
  
    // Open a new print window
    const printWindow = window.open("", "_blank", "width=800,height=600");
  
    if (!printWindow) {
      alert("Please allow pop-ups for this site.");
      return;
    }
  
    // Write HTML content for printing
    printWindow.document.write(
      `
      <html>
        <head>
          <title>Customer Order Details</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            table, th, td {
              border: 1px solid #ccc;
            }
            th, td {
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f1f1f1;
            }
            h2, h3 {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h2>Customer Order Details</h2>
  
          <h3>Customer Information</h3>
          <table>
            <tr>
              <th>Field</th>
              <th>Details</th>
            </tr>
            <tr>
              <td>Name</td>
              <td>${selectedOrder.customerDetails.name}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>${selectedOrder.customerDetails.address}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>${selectedOrder.customerDetails.phone}</td>
            </tr>
            <tr>
              <td>Delivery Method</td>
              <td>${selectedOrder.customerDetails.deliveryMethod}</td>
            </tr>
            <tr>
              <td>Notes</td>
              <td>${selectedOrder.customerDetails.notes || "N/A"}</td>
            </tr>
            <tr>
              <td>Payment Method</td>
              <td>${selectedOrder.customerDetails.paymentMethod}</td>
            </tr>
          </table>
  
          <h3>Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${selectedOrder.orderItems
                .map(
                  (item) => `
                  <tr>
                    <td>${item.title}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
      `
    );
  
    printWindow.document.close();
  
    // Trigger print once the content is loaded
    printWindow.onload = () => {
      printWindow.print();
    };
  };
  

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h3 className="text-center mb-6">
        <span className="text-lg py-2 px-4 rounded bg-gray-800 text-white">
          Total Orders: {orders.length}
        </span>
      </h3>

      {/* Reports Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Order ID
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                User Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Order Date
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Total Price
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Product
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Quantity
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Price
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Status
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => {
              const { customerDetails, orderItems } = order; // Destructure details and items
              return (
                <React.Fragment key={order._id}>
                  {orderItems.map((item, index) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      {index === 0 && (
                        <>
                          <td
                            className="px-4 py-2 border border-gray-300"
                            rowSpan={orderItems.length}
                          >
                            {order._id}
                          </td>
                          <td
                            className="px-4 py-2 border border-gray-300"
                            rowSpan={orderItems.length}
                          >
                            {customerDetails ? customerDetails.name : "N/A"}
                          </td>
                          <td
                            className="px-4 py-2 border border-gray-300"
                            rowSpan={orderItems.length}
                          >
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                          <td
                            className="px-4 py-2 border border-gray-300"
                            rowSpan={orderItems.length}
                          >
                            ${calculateTotalPrice(order).toFixed(2)}
                          </td>
                        </>
                      )}
                      <td className="px-4 py-2 border border-gray-300">
                        {item.title}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        <select
                          className="p-2 border border-gray-300 rounded w-full"
                          onChange={(e) =>
                            handleStatusChange(
                              order._id,
                              item._id,
                              e.target.value
                            )
                          }
                          defaultValue="Pending"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        <button
                          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
                          onClick={() => handleViewDetails(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 border border-gray-300 rounded ${
                currentPage === index + 1
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {/* Modal for Order Details */}
      {/* {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Customer Details
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border text-left">Field</th>
                    <th className="px-4 py-2 border text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">Name</td>
                    <td className="px-4 py-2 border">
                      {selectedOrder.customerDetails.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Address</td>
                    <td className="px-4 py-2 border">
                      {selectedOrder.customerDetails.address}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Phone</td>
                    <td className="px-4 py-2 border">
                      {selectedOrder.customerDetails.phone}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Delivery Method</td>
                    <td className="px-4 py-2 border">
                      {selectedOrder.customerDetails.deliveryMethod}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Notes</td>
                    <td className="px-4 py-2 border">
                      {selectedOrder.customerDetails.notes || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Payment Method</td>
                    <td className="px-4 py-2 border">
                      {selectedOrder.customerDetails.paymentMethod}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                onClick={handlePrint}
              >
                Print Details
              </button>
            </div>
          </div>
        </div>
      )} */}
      {selectedOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
      <h3 className="text-2xl font-semibold mb-4 text-center">
        Customer Details
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Field</th>
              <th className="px-4 py-2 border text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">Name</td>
              <td className="px-4 py-2 border">
                {selectedOrder.customerDetails.name}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Address</td>
              <td className="px-4 py-2 border">
                {selectedOrder.customerDetails.address}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Phone</td>
              <td className="px-4 py-2 border">
                {selectedOrder.customerDetails.phone}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Delivery Method</td>
              <td className="px-4 py-2 border">
                {selectedOrder.customerDetails.deliveryMethod}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Notes</td>
              <td className="px-4 py-2 border">
                {selectedOrder.customerDetails.notes || "N/A"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Payment Method</td>
              <td className="px-4 py-2 border">
                {selectedOrder.customerDetails.paymentMethod}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
          onClick={handleCloseModal}
        >
          Close
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          onClick={handlePrint}
        >
          Print Details
        </button>
      </div>
    </div>
  </div>
)}



    </div>
  );
};

export default OrderSingle;
