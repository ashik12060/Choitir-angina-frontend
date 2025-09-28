// import React, { useState } from "react";
// import axios from "axios";
// import axiosInstance from "../../axiosInstance";

// function StockReport() {
//   const [supplier, setSupplier] = useState("ALL");
//   const [group, setGroup] = useState("ALL");
//   const [product, setProduct] = useState("ALL");
//   const [brand, setBrand] = useState("ALL");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [showReport, setShowReport] = useState(false);
//   const [reportData, setReportData] = useState(null);

 
//   const handleGenerateReport = async () => {
//     try {
//       const response = await axiosInstance.get("/api/products/stock");
//       const data = response.data;

//       if (data.success) {
//         const reportItems = [];

//         data.products.forEach((product) => {
//           const createdAtDate = new Date(product.createdAt);

//           const isWithinDateRange =
//             (!fromDate || createdAtDate >= new Date(fromDate)) &&
//             (!toDate || createdAtDate <= new Date(toDate));

//           if (isWithinDateRange) {
//             product.variants.forEach((variant) => {
//               reportItems.push({
//                 productName: product.title,
//                 size: variant.size,
//                 color: variant.color,
//                 quantity: variant.quantity,
//                 price: product.price,
//                 supplier: product.supplier?.name || "N/A",
//                 brand: product.brand?.name || "N/A",
//                 createdAt: product.createdAt,
//               });
//             });
//           }
//         });

//         setReportData({
//           filters: {
//             supplier,
//             group,
//             product,
//             brand,
//             range: `${fromDate} to ${toDate}`,
//           },
//           items: reportItems,
//         });
//         setShowReport(true);
//       } else {
//         alert("Failed to load products");
//       }
//     } catch (error) {
//       console.error("Error fetching stock report:", error);
//       alert("Error fetching stock report. Check console for details.");
//     }
//   };

//   const handlePrint = () => {
//     window.print();
//   };


//   const totalQuantity = reportData
//     ? reportData.items.reduce((sum, item) => sum + item.quantity, 0)
//     : 0;

//   const totalPrice = reportData
//     ? reportData.items.reduce((sum, item) => sum + item.price, 0)
//     : 0;

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 min-h-screen space-y-6">
//       {/* Header */}

//       {!showReport ? (
//         <>
//           <div className="border p-3 bg-white shadow rounded-lg space-y-4 text-sm">
//             {/* Date Range */}
//             <div className="flex space-x-3">
//               <div className="w-1/2">
//                 <label className="block font-medium mb-1">From</label>
//                 <input
//                   type="date"
//                   className="border p-1.5 w-full text-sm"
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                 />
//               </div>
//               <div className="w-1/2">
//                 <label className="block font-medium mb-1">To</label>
//                 <input
//                   type="date"
//                   className="border p-1.5 w-full text-sm"
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Supplier and Group row */}
//             <div className="flex space-x-3">
//               <div className="w-1/2">
//                 <label className="block font-medium mb-1">Supplier</label>
//                 <select
//                   className="border p-1.5 w-full text-sm"
//                   value={supplier}
//                   onChange={(e) => setSupplier(e.target.value)}
//                 >
//                   <option value="ALL">All</option>
//                   <option value="Supplier1">Supplier 1</option>
//                   <option value="Supplier2">Supplier 2</option>
//                 </select>
//               </div>

//               <div className="w-1/2">
//                 <label className="block font-medium mb-1">Group</label>
//                 <select
//                   className="border p-1.5 w-full text-sm"
//                   value={group}
//                   onChange={(e) => setGroup(e.target.value)}
//                 >
//                   <option value="ALL">All</option>
//                   <option value="Group1">Group 1</option>
//                   <option value="Group2">Group 2</option>
//                 </select>
//               </div>
//             </div>

//             {/* Product and Brand row */}
//             <div className="flex space-x-3">
//               <div className="w-1/2">
//                 <label className="block font-medium mb-1">Product</label>
//                 <select
//                   className="border p-1.5 w-full text-sm"
//                   value={product}
//                   onChange={(e) => setProduct(e.target.value)}
//                 >
//                   <option value="ALL">All</option>
//                   <option value="Product1">Product 1</option>
//                   <option value="Product2">Product 2</option>
//                 </select>
//               </div>

//               <div className="w-1/2">
//                 <label className="block font-medium mb-1">Brand</label>
//                 <select
//                   className="border p-1.5 w-full text-sm"
//                   value={brand}
//                   onChange={(e) => setBrand(e.target.value)}
//                 >
//                   <option value="ALL">All</option>
//                   <option value="Brand1">Brand 1</option>
//                   <option value="Brand2">Brand 2</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex justify-center space-x-4 mt-6">
//             <button
//               onClick={handleGenerateReport}
//               className="bg-blue-500 text-white px-6 py-2 rounded"
//             >
//               Generate Report
//             </button>
//           </div>
//         </>
//       ) : (
//         // Report Display
//         <div className="bg-white shadow rounded-lg p-6">
//         <div className="text-center mb-6">
//   <h2 className="text-2xl font-extrabold tracking-wide text-gray-800 uppercase">Stock Report</h2>
//   <h4 className="text-lg font-semibold text-gray-600 mt-1">Chaityr Angina</h4>
// </div>

//           <p>
//             <strong>Supplier:</strong> {reportData.filters.supplier}
//           </p>
//           <p>
//             <strong>Group:</strong> {reportData.filters.group}
//           </p>
//           <p>
//             <strong>Product:</strong> {reportData.filters.product}
//           </p>
//           <p>
//             <strong>Brand:</strong> {reportData.filters.brand}
//           </p>
//           <p>
//             <strong>Date Range:</strong> {reportData.filters.range}
//           </p>

//           <table className="w-full border-collapse border border-gray-300 mt-4">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">#</th>
//                 <th className="border p-2">Added Date</th>
//                 <th className="border p-2">Product</th>
//                 <th className="border p-2">Size</th>
//                 <th className="border p-2">Color</th>
//                 <th className="border p-2">Quantity</th>
//                 <th className="border p-2">Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reportData.items.map((item, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="border p-2 text-center">{index + 1}</td>
//                   <td className="border p-2">
//                     {new Date(item.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="border  p-2">{item.productName}</td>
//                   <td className="border p-2">{item.size}</td>
//                   <td className="border p-2">{item.color}</td>
//                   <td className="border p-2">{item.quantity}</td>
//                   <td className="border p-2">৳{item.price}</td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot className="table-auto w-full border">
//               <tr className="bg-gray-200 border  font-semibold">
//                 <td className="border p-2 text-right" colSpan={5}>
//                   Totals =
//                 </td>
//                 <td className="border p-2">{totalQuantity}</td>
//                 <td className="border  p-2">
//                   ৳{totalPrice.toFixed(2)}
//                 </td>
//                 <td className="border p-2" colSpan={3}></td>
//               </tr>
//             </tfoot>
//           </table>

//           <div className="flex justify-center space-x-4 mt-6">
//             <button
//               onClick={handlePrint}
//               className="bg-green-500 text-white px-6 py-2 rounded"
//             >
//               Print
//             </button>
//             <button
//               onClick={() => setShowReport(false)}
//               className="bg-gray-500 text-white px-6 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StockReport;



// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../axiosInstance";

// function StockReport() {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch stock report from backend
//   const fetchStockReport = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/products/stock`);
//       if (response.data.success) {
//         setReportData(response.data.products);
//       } else {
//         alert("Failed to load stock report");
//       }
//     } catch (error) {
//       console.error("Error fetching stock report:", error);
//       alert("Error fetching stock report. Check console for details.");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchStockReport();
//   }, []);

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-center">Stock Report</h2>

//       {loading ? (
//         <p className="text-center text-lg">Loading...</p>
//       ) : reportData.length === 0 ? (
//         <p className="text-center text-lg">No products available</p>
//       ) : (
//         <div className="bg-white shadow rounded-lg p-6">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">#</th>
//                 <th className="border p-2">Product Name</th>
//                 <th className="border p-2">Available Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reportData.map((item, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="border p-2 text-center">{index + 1}</td>
//                   <td className="border p-2">{item.productName}</td>
//                   <td className="border p-2 text-center">{item.totalQuantity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="flex justify-center mt-6">
//             <button
//               onClick={handlePrint}
//               className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//             >
//               Print
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StockReport;




import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const StockReport = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/products/stock`);
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          alert("Failed to load stock report");
        }
      } catch (error) {
        console.error("Error fetching stock report:", error);
        alert("Error fetching stock report. Check console for details.");
      }
      setLoading(false);
    };

    fetchStock();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Stock Report</h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{product.productName}</td>
                <td className="border p-2 text-center">{product.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockReport;

