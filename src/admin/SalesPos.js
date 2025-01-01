// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import axiosInstance from '../pages/axiosInstance';

// const SalesPos = () => {
//   const [sales, setSales] = useState([]);
//   const [error, setError] = useState(null);

//   // Fetch all sales data
//   useEffect(() => {
//     const fetchSales = async () => {
//       try {
//         const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/sales`);  // Update with your API endpoint
//         setSales(response.data);
//         console.log(response.data)
//       } catch (error) {
//         setError('Failed to fetch sales data');
//       }
//     };

//     fetchSales();
//   }, []);

//   // Handle delete sale
//   const handleDeleteSale = async (saleId) => {
//     try {
//       await axios.delete(`/api/sales/${saleId}`);
//       setSales(sales.filter(sale => sale._id !== saleId)); // Remove the deleted sale from the state
//     } catch (error) {
//       setError('Failed to delete the sale');
//     }
//   };

//   return (
//     <div>
//       <h1>Sales List</h1>

//       {error && <p>{error}</p>}

//       <table>
//         <thead>
//           <tr>
//             <th>Product Name</th>
//             <th>Price</th>
//             <th>Sell Date</th>
//             <th>Quantity Sold</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sales.length > 0 ? (
//             sales.map((sale) => (
//               <tr key={sale._id}>
//                 {sale.products.map((product, index) => (
//                   <React.Fragment key={product.productId}>
//                     <td>{product.title}</td> {/* Assuming 'title' is the product name */}
//                     <td>${product.price}</td>
//                     <td>{new Date(sale.timestamp).toLocaleDateString()}</td> {/* Format the timestamp */}
//                     <td>{product.quantity}</td>
//                     <td>
//                       <button onClick={() => handleDeleteSale(sale._id)}>Delete</button>
//                     </td>
//                   </React.Fragment>
//                 ))}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No sales available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SalesPos;



import React, { useState, useEffect } from 'react';
import axiosInstance from '../pages/axiosInstance';

const SalesPos = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all sales data
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/sales`);
        setSales(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Failed to fetch sales data');
      }
    };

    fetchSales();
  }, []);

  // Handle delete sale
  const handleDeleteSale = async (saleId) => {
    try {
      await axiosInstance.delete(`/api/sales/${saleId}`);
      setSales(sales.filter((sale) => sale._id !== saleId)); // Remove the deleted sale from the state
    } catch (error) {
      setError('Failed to delete the sale');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Sales List</h1>

      {error && <p className="text-red-500 font-semibold">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Sell Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Quantity Sold</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Action</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? (
              sales.map((sale) => (
                <tr key={sale._id} className="border-b hover:bg-gray-50">
                  {sale.products.map((product) => (
                    <React.Fragment key={product.productId}>
                      <td className="px-6 py-4 text-sm text-gray-700">{product.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">${product.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{new Date(sale.timestamp).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{product.quantity}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <button
                          onClick={() => handleDeleteSale(sale._id)}
                          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-sm text-gray-700 text-center">
                  No sales available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesPos;
