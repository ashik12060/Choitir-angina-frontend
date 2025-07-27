// import { faHouse, faPrint } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// function SalesReport() {
//   const [fromDate, setFromDate] = useState("2024-12-01");
//   const [toDate, setToDate] = useState("2024-12-08");
//   const [supplier, setSupplier] = useState("ALL");
//   const [group, setGroup] = useState("ALL");
//   const [product, setProduct] = useState("ALL");
//   const [brand, setBrand] = useState("ALL");
//   const [reportData, setReportData] = useState(null); // State to store report data

//   const handleSubmit = () => {
//     // Mock report data generation
//     const report = {
//       fromDate,
//       toDate,
//       supplier,
//       group,
//       product,
//       brand,
//       sales: [
//         { date: "2024-12-01", product: "Product1", quantity: 10, total: 500 },
//         { date: "2024-12-02", product: "Product2", quantity: 5, total: 300 },
//       ],
//     };

//     setReportData(report); // Set the report data for rendering
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
//         Sales Report
//       </h1>

//       {/* Report Type and Filters Section */}
//       {!reportData && (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow rounded-lg p-6">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">
//               Report Type
//             </h2>
//             <ul className="space-y-3">
//               <li className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="reportType"
//                   value="dayWiseSalesSummary"
//                   id="dayWiseSalesSummary"
//                   className="text-blue-500 focus:ring focus:ring-blue-300"
//                 />
//                 <label htmlFor="dayWiseSalesSummary" className="text-gray-700">
//                   Day Wise Sales Summary
//                 </label>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="reportType"
//                   value="shopWiseItemSales"
//                   id="shopWiseItemSales"
//                   className="text-blue-500 focus:ring focus:ring-blue-300"
//                 />
//                 <label htmlFor="shopWiseItemSales" className="text-gray-700">
//                   Shop Wise Item Sales
//                 </label>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">Filters</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-gray-700 mb-1">From Date:</label>
//                 <input
//                   type="date"
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                   className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1">To Date:</label>
//                 <input
//                   type="date"
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                   className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1">Supplier:</label>
//                 <select
//                   value={supplier}
//                   onChange={(e) => setSupplier(e.target.value)}
//                   className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="ALL">All</option>
//                   <option value="Supplier1">Supplier 1</option>
//                   <option value="Supplier2">Supplier 2</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1">Group:</label>
//                 <select
//                   value={group}
//                   onChange={(e) => setGroup(e.target.value)}
//                   className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="ALL">All</option>
//                   <option value="Group1">Group 1</option>
//                   <option value="Group2">Group 2</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1">Product:</label>
//                 <select
//                   value={product}
//                   onChange={(e) => setProduct(e.target.value)}
//                   className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="ALL">All</option>
//                   <option value="Product1">Product 1</option>
//                   <option value="Product2">Product 2</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1">Brand:</label>
//                 <select
//                   value={brand}
//                   onChange={(e) => setBrand(e.target.value)}
//                   className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="ALL">All</option>
//                   <option value="Brand1">Brand 1</option>
//                   <option value="Brand2">Brand 2</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Report View Section */}
//       {reportData && (
//         <div className="bg-white shadow rounded-lg p-6 mt-6">
//           <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
//             Sales Report Summary
//           </h2>
//           <table className="w-full border-collapse border border-gray-300 text-left">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">Date</th>
//                 <th className="border p-2">Product</th>
//                 <th className="border p-2">Quantity</th>
//                 <th className="border p-2">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reportData.sales.map((sale, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="border p-2">{sale.date}</td>
//                   <td className="border p-2">{sale.product}</td>
//                   <td className="border p-2">{sale.quantity}</td>
//                   <td className="border p-2">${sale.total}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="text-center mt-4">
//             <button
//               onClick={handlePrint}
//               className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
//             >
//               Print Report
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Buttons */}
//       <div className="mt-6 text-center gap-4">
//         {!reportData && (
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-500 text-xl mx-2 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
//           >
//             <FontAwesomeIcon icon={faPrint} /> Generate Report
//           </button>
//         )}
//         <Link
//           to="/pos"
//           className="bg-blue-500 text-xl text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
//         >
//           <FontAwesomeIcon icon={faHouse} /> Back
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default SalesReport;




import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../axiosInstance';

const SalesReport = () => {
  const [activeTab, setActiveTab] = useState('Sales');
  const [salesData, setSalesData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const printRef = useRef();

  const fetchData = async (from, to) => {
    setLoading(true);
    try {
      const params = {};
      if (from) params.from = from;
      if (to) params.to = to;

      const salesRes = await axiosInstance.get('/api/sales', { params });
      setSalesData(Array.isArray(salesRes.data) ? salesRes.data : []);

      const ordersRes = await axiosInstance.get('/api/orders', { params });
      setOrderData(Array.isArray(ordersRes.data) ? ordersRes.data : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSalesData([]);
      setOrderData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = () => {
    if (!fromDate || !toDate) {
      alert('Please select both From and To dates');
      return;
    }
    fetchData(fromDate, toDate);
  };

const handlePrint = () => {
  if (!printRef.current) return;

  const content = printRef.current.innerHTML;
  const printWindow = window.open('', '_blank', 'width=800,height=600');

  if (!printWindow) {
    alert('Pop-up blocked! Please allow pop-ups for this site to print.');
    return;
  }

  printWindow.document.open();
  printWindow.document.write(`
    
  <head>
    <title>Print Report</title>
    <style>
      body { 
        font-family: Arial, sans-serif; 
        margin: 20px; 
        text-align: center; /* Center all text inside body */
      }
      table { 
        width: 100%; 
        border-collapse: collapse; 
        margin: 0 auto; /* Center table */
        text-align: left; /* But keep table text left aligned */
      }
      th, td { 
        border: 1px solid #000; 
        padding: 8px; 
        text-align: left; 
      }
      th { 
        background-color: #f0f0f0; 
      }
      div { 
        margin-bottom: 4px; 
        margin-top:10px;
      }
      h4, h3 {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div>
      <h3>Chaityr Angina</h3>
      <h4>Sales and Orders Report</h4>
    </div>
    <div>
      ${content}
    </div>
  </body>
</html>

  `);
  printWindow.document.close();

  printWindow.focus();

  printWindow.onload = () => {
    // Add small delay to ensure rendering before print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };
};


  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sales Report</h2>

      {/* Date filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div>
          <label className="block mb-1 font-semibold" htmlFor="fromDate">
            From Date
          </label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold" htmlFor="toDate">
            To Date
          </label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <button
          onClick={handleFilter}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Loading...' : 'Filter'}
        </button>
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          style={{ marginLeft: '10px' }}
        >
          Print Report
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        {['Sales', 'Orders'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 -mb-px font-semibold ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content to print */}
      <div ref={printRef}>
        {activeTab === 'Sales' ? (
          salesData.length ? (
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Items</th>
                  <th className="p-2 border">Quantity</th>

                   <th className="p-2 border">Total</th>
                  <th className="p-2 border">Payment</th>
                 
                  
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale) => (
                  <tr key={sale._id} className="border-t">
                     <td className="p-2 border">{new Date(sale.timestamp).toLocaleDateString()}</td>
                    <td className="p-2 border">
                      {sale.products.map((p, idx) => (
                        <div key={idx}>
                          {p.title}
                        </div>
                      ))}
                    </td>
                    <td className="p-2 border">
                      {sale.products.map((p, idx) => (
                        <div key={idx}>
                          {p.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="p-2 border">{sale.netPayable}</td>
                   
                    <td className="p-2 border">{sale.paymentMethod}</td>
                    
                    
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No sales data available for this date range.</p>
          )
        ) : orderData.length ? (
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Payment</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Items</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-2 border">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="p-2 border">{order.customerDetails?.name || 'N/A'}</td>
                  <td className="p-2 border">{order.customerDetails?.paymentMethod || 'N/A'}</td>
                  <td className="p-2 border">{order.status}</td>
                  <td className="p-2 border">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx}>
                        {item.title} x {item.quantity}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders data available for this date range.</p>
        )}
      </div>
    </div>
  );
};

export default SalesReport;



