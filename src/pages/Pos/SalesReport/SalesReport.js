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

//   const handleSubmit = () => {
//     console.log("Form submitted with data:", {
//       fromDate,
//       toDate,
//       supplier,
//       group,
//       product,
//       brand,
//     });
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
//         Sales Report
//       </h1>

//       {/* Report Type Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow rounded-lg p-6">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Report Type</h2>
//           <ul className="space-y-3">
//             <li className="flex items-center space-x-2">
//               <input
//                 type="radio"
//                 name="reportType"
//                 value="dayWiseSalesSummary"
//                 id="dayWiseSalesSummary"
//                 className="text-blue-500 focus:ring focus:ring-blue-300"
//               />
//               <label htmlFor="dayWiseSalesSummary" className="text-gray-700">
//                 Day Wise Sales Summary
//               </label>
//             </li>
//             <li className="flex items-center space-x-2">
//               <input
//                 type="radio"
//                 name="reportType"
//                 value="shopWiseItemSales"
//                 id="shopWiseItemSales"
//                 className="text-blue-500 focus:ring focus:ring-blue-300"
//               />
//               <label htmlFor="shopWiseItemSales" className="text-gray-700">
//                 Shop Wise Item Sales
//               </label>
//             </li>
//           </ul>
//         </div>

//         {/* Filters Section */}
//         <div>
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Filters</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-gray-700 mb-1">From Date:</label>
//               <input
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//                 className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">To Date:</label>
//               <input
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//                 className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">Supplier:</label>
//               <select
//                 value={supplier}
//                 onChange={(e) => setSupplier(e.target.value)}
//                 className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="ALL">All</option>
//                 <option value="Supplier1">Supplier 1</option>
//                 <option value="Supplier2">Supplier 2</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">Group:</label>
//               <select
//                 value={group}
//                 onChange={(e) => setGroup(e.target.value)}
//                 className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="ALL">All</option>
//                 <option value="Group1">Group 1</option>
//                 <option value="Group2">Group 2</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">Product:</label>
//               <select
//                 value={product}
//                 onChange={(e) => setProduct(e.target.value)}
//                 className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="ALL">All</option>
//                 <option value="Product1">Product 1</option>
//                 <option value="Product2">Product 2</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">Brand:</label>
//               <select
//                 value={brand}
//                 onChange={(e) => setBrand(e.target.value)}
//                 className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="ALL">All</option>
//                 <option value="Brand1">Brand 1</option>
//                 <option value="Brand2">Brand 2</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="mt-6 text-center  gap-4">
//         <button
//           onClick={handleSubmit}
//           className="bg-blue-500 text-xl mx-2 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
//         >
//           <FontAwesomeIcon icon={faPrint} /> Report
//         </button>
//         <Link to='/pos'
//         //   onClick={handleSubmit}
//           className="bg-blue-500 text-xl text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
//         >
//           <FontAwesomeIcon icon={faHouse} /> Back
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default SalesReport;




import { faHouse, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function SalesReport() {
  const [fromDate, setFromDate] = useState("2024-12-01");
  const [toDate, setToDate] = useState("2024-12-08");
  const [supplier, setSupplier] = useState("ALL");
  const [group, setGroup] = useState("ALL");
  const [product, setProduct] = useState("ALL");
  const [brand, setBrand] = useState("ALL");
  const [reportData, setReportData] = useState(null); // State to store report data

  const handleSubmit = () => {
    // Mock report data generation
    const report = {
      fromDate,
      toDate,
      supplier,
      group,
      product,
      brand,
      sales: [
        { date: "2024-12-01", product: "Product1", quantity: 10, total: 500 },
        { date: "2024-12-02", product: "Product2", quantity: 5, total: 300 },
      ],
    };

    setReportData(report); // Set the report data for rendering
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Sales Report
      </h1>

      {/* Report Type and Filters Section */}
      {!reportData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow rounded-lg p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Report Type
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="reportType"
                  value="dayWiseSalesSummary"
                  id="dayWiseSalesSummary"
                  className="text-blue-500 focus:ring focus:ring-blue-300"
                />
                <label htmlFor="dayWiseSalesSummary" className="text-gray-700">
                  Day Wise Sales Summary
                </label>
              </li>
              <li className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="reportType"
                  value="shopWiseItemSales"
                  id="shopWiseItemSales"
                  className="text-blue-500 focus:ring focus:ring-blue-300"
                />
                <label htmlFor="shopWiseItemSales" className="text-gray-700">
                  Shop Wise Item Sales
                </label>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">From Date:</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">To Date:</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Supplier:</label>
                <select
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All</option>
                  <option value="Supplier1">Supplier 1</option>
                  <option value="Supplier2">Supplier 2</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Group:</label>
                <select
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All</option>
                  <option value="Group1">Group 1</option>
                  <option value="Group2">Group 2</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Product:</label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All</option>
                  <option value="Product1">Product 1</option>
                  <option value="Product2">Product 2</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Brand:</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All</option>
                  <option value="Brand1">Brand 1</option>
                  <option value="Brand2">Brand 2</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report View Section */}
      {reportData && (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
            Sales Report Summary
          </h2>
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Date</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {reportData.sales.map((sale, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{sale.date}</td>
                  <td className="border p-2">{sale.product}</td>
                  <td className="border p-2">{sale.quantity}</td>
                  <td className="border p-2">${sale.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center mt-4">
            <button
              onClick={handlePrint}
              className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
            >
              Print Report
            </button>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-6 text-center gap-4">
        {!reportData && (
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-xl mx-2 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faPrint} /> Generate Report
          </button>
        )}
        <Link
          to="/pos"
          className="bg-blue-500 text-xl text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          <FontAwesomeIcon icon={faHouse} /> Back
        </Link>
      </div>
    </div>
  );
}

export default SalesReport;
