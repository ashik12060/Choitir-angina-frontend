// import React, { useState } from 'react';

// function StockReport() {
//   const [supplier, setSupplier] = useState('ALL');
//   const [group, setGroup] = useState('ALL');
//   const [product, setProduct] = useState('ALL');
//   const [brand, setBrand] = useState('ALL');
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [showReport, setShowReport] = useState(false);
//   const [reportData, setReportData] = useState(null);

//   const handleGenerateReport = () => {
//     // Mock data for the report
//     const data = {
//       filters: {
//         supplier,
//         group,
//         product,
//         brand,
//         range: `${fromDate} to ${toDate}`,
//       },
//       items: [
//         { product: 'Product A', stock: 50, supplier: 'Supplier 1', brand: 'Brand X' },
//         { product: 'Product B', stock: 30, supplier: 'Supplier 2', brand: 'Brand Y' },
//       ],
//     };

//     setReportData(data);
//     setShowReport(true);
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 min-h-screen space-y-6">
//       {/* Header */}
//       <h1 className="text-2xl font-bold text-center">Stock Report</h1>

//       {!showReport ? (
//         <>
//           {/* Filters */}
//           <div className="border p-4 bg-white shadow rounded-lg space-y-6">
//             {/* Date Range */}
//             <div className="flex space-x-4">
//               <div className="w-1/2">
//                 <label className="block font-semibold mb-2">From</label>
//                 <input
//                   type="date"
//                   className="border p-2 w-full"
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                 />
//               </div>
//               <div className="w-1/2">
//                 <label className="block font-semibold mb-2">To</label>
//                 <input
//                   type="date"
//                   className="border p-2 w-full"
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Supplier */}
//             <div>
//               <label className="block font-semibold mb-2">Supplier</label>
//               <select
//                 className="border p-2 w-full"
//                 value={supplier}
//                 onChange={(e) => setSupplier(e.target.value)}
//               >
//                 <option value="ALL">All</option>
//                 <option value="Supplier1">Supplier 1</option>
//                 <option value="Supplier2">Supplier 2</option>
//               </select>
//             </div>

//             {/* Group */}
//             <div>
//               <label className="block font-semibold mb-2">Group</label>
//               <select
//                 className="border p-2 w-full"
//                 value={group}
//                 onChange={(e) => setGroup(e.target.value)}
//               >
//                 <option value="ALL">All</option>
//                 <option value="Group1">Group 1</option>
//                 <option value="Group2">Group 2</option>
//               </select>
//             </div>

//             {/* Product */}
//             <div>
//               <label className="block font-semibold mb-2">Product</label>
//               <select
//                 className="border p-2 w-full"
//                 value={product}
//                 onChange={(e) => setProduct(e.target.value)}
//               >
//                 <option value="ALL">All</option>
//                 <option value="Product1">Product 1</option>
//                 <option value="Product2">Product 2</option>
//               </select>
//             </div>

//             {/* Brand */}
//             <div>
//               <label className="block font-semibold mb-2">Brand</label>
//               <select
//                 className="border p-2 w-full"
//                 value={brand}
//                 onChange={(e) => setBrand(e.target.value)}
//               >
//                 <option value="ALL">All</option>
//                 <option value="Brand1">Brand 1</option>
//                 <option value="Brand2">Brand 2</option>
//               </select>
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
//           <h2 className="text-xl font-bold text-center mb-4">Stock Report</h2>
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
//                 <th className="border p-2">Product</th>
//                 <th className="border p-2">Stock</th>
//                 <th className="border p-2">Supplier</th>
//                 <th className="border p-2">Brand</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reportData.items.map((item, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="border p-2">{item.product}</td>
//                   <td className="border p-2">{item.stock}</td>
//                   <td className="border p-2">{item.supplier}</td>
//                   <td className="border p-2">{item.brand}</td>
//                 </tr>
//               ))}
//             </tbody>
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


import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

function StockReport() {
  const [supplier, setSupplier] = useState("ALL");
  const [group, setGroup] = useState("ALL");
  const [product, setProduct] = useState("ALL");
  const [brand, setBrand] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = async () => {
    try {
      const response = await axiosInstance.get("/api/products/show");
      const data = response.data;

      if (data.success) {
        const reportItems = [];
        data.products.forEach((product) => {
          product.variants.forEach((variant) => {
            reportItems.push({
              productName: product.title,
              size: variant.size,
              color: variant.color,
              quantity: variant.quantity,
              price: product.price,
              supplier: product.supplier?.name || "N/A",
              brand: product.brand?.name || "N/A",
              createdAt: product.createdAt,
            });
          });
        });

        setReportData({
          filters: {
            supplier,
            group,
            product,
            brand,
            range: `${fromDate} to ${toDate}`,
          },
          items: reportItems,
        });
        setShowReport(true);
      } else {
        alert("Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching stock report:", error);
      alert("Error fetching stock report. Check console for details.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Inside your StockReport component, after you have reportData:

const totalQuantity = reportData
  ? reportData.items.reduce((sum, item) => sum + item.quantity, 0)
  : 0;

const totalPrice = reportData
  ? reportData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  : 0;


  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}

      {!showReport ? (
        <>
          {/* Filters */}
          <div className="border p-4 bg-white shadow rounded-lg space-y-6">
            {/* Date Range */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block font-semibold mb-2">From</label>
                <input
                  type="date"
                  className="border p-2 w-full"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block font-semibold mb-2">To</label>
                <input
                  type="date"
                  className="border p-2 w-full"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>

            {/* Supplier */}
            <div>
              <label className="block font-semibold mb-2">Supplier</label>
              <select
                className="border p-2 w-full"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="Supplier1">Supplier 1</option>
                <option value="Supplier2">Supplier 2</option>
              </select>
            </div>

            {/* Group */}
            <div>
              <label className="block font-semibold mb-2">Group</label>
              <select
                className="border p-2 w-full"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="Group1">Group 1</option>
                <option value="Group2">Group 2</option>
              </select>
            </div>

            {/* Product */}
            <div>
              <label className="block font-semibold mb-2">Product</label>
              <select
                className="border p-2 w-full"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="Product1">Product 1</option>
                <option value="Product2">Product 2</option>
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block font-semibold mb-2">Brand</label>
              <select
                className="border p-2 w-full"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="Brand1">Brand 1</option>
                <option value="Brand2">Brand 2</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handleGenerateReport}
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              Generate Report
            </button>
          </div>
        </>
      ) : (
        // Report Display
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-center mb-4">STOCK REPORT</h2>
          <h4 className="text-lg font-bold text-center mb-4">CHAITYR ANGINA</h4>
          <p>
            <strong>Supplier:</strong> {reportData.filters.supplier}
          </p>
          <p>
            <strong>Group:</strong> {reportData.filters.group}
          </p>
          <p>
            <strong>Product:</strong> {reportData.filters.product}
          </p>
          <p>
            <strong>Brand:</strong> {reportData.filters.brand}
          </p>
          <p>
            <strong>Date Range:</strong> {reportData.filters.range}
          </p>

          {/* <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Product</th>
                <th className="border p-2">Size</th>
                <th className="border p-2">Color</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Supplier</th>
                <th className="border p-2">Brand</th>
                <th className="border p-2">Added Date</th>
              </tr>
            </thead>
            <tbody>
              {reportData.items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{item.productName}</td>
                  <td className="border p-2">{item.size}</td>
                  <td className="border p-2">{item.color}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">{item.price}</td>
                  <td className="border p-2">{item.supplier}</td>
                  <td className="border p-2">{item.brand}</td>
                  <td className="border p-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <table className="w-full border-collapse border border-gray-300 mt-4">
  <thead>
    <tr className="bg-gray-100">
      <th className="border p-2">Product</th>
      <th className="border p-2">Size</th>
      <th className="border p-2">Color</th>
      <th className="border p-2">Quantity</th>
      <th className="border p-2">Price</th>
      <th className="border p-2">Added Date</th>
    </tr>
  </thead>
  <tbody>
    {reportData.items.map((item, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td className="border p-2">{item.productName}</td>
        <td className="border p-2">{item.size}</td>
        <td className="border p-2">{item.color}</td>
        <td className="border p-2">{item.quantity}</td>
        <td className="border p-2">৳{item.price}</td>
        <td className="border p-2">
          {new Date(item.createdAt).toLocaleDateString()}
        </td>
      </tr>
    ))}
  </tbody>
  <tfoot>
    <tr className="bg-gray-200 font-semibold">
      <td className="border p-2 text-right" colSpan={3}>Totals</td>
      <td className="border p-2">{totalQuantity}</td>
      <td className="border p-2">৳{totalPrice.toFixed(2)}</td>
      <td className="border p-2" colSpan={3}></td>
    </tr>
  </tfoot>
</table>


          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handlePrint}
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              Print
            </button>
            <button
              onClick={() => setShowReport(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockReport;
