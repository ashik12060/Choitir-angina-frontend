// import React, { useState } from 'react';

// function BarcodePrint() {
//   const [items, setItems] = useState([]);
//   const [barcode, setBarcode] = useState('');
//   const [description, setDescription] = useState('');
//   const [qty, setQty] = useState('');

//   const [data, setData] = useState([]);

//   const handleAddRow = () => {
//     setData([...data, { barcode: '', product: '', city: '', rpu: '', delete: '' }]);
//   };
//   const handlePrint = () => {
//     window.print(); // Simple print functionality
//   };
  

//   const handleClose = () => {
//     console.log('Close button clicked'); // You can add navigation or modal close logic here
//   };
  

//   const handleChange = (index, field, value) => {
//     const updatedData = [...data];
//     updatedData[index][field] = value;
//     setData(updatedData);
//   };

//   const handleBarcodeChange = (event) => {
//     setBarcode(event.target.value);
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//   };

//   const handleQtyChange = (event) => {
//     setQty(event.target.value);
//   };

//   const addItem = () => {
//     setItems([
//       ...items,
//       { barcode, description, qty },
//     ]);
//     setBarcode('');
//     setDescription('');
//     setQty('');
//   };

//   const deleteItem = (index) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Barcode Challan Package</h1>
//       <div className="flex flex-col gap-4">
//         <div className="flex flex-col gap-2">
//           <label htmlFor="barcode" className="text-gray-700">Barcode</label>
//           <input
//             type="text"
//             id="barcode"
//             className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={barcode}
//             onChange={handleBarcodeChange}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="description" className="text-gray-700">Description</label>
//           <input
//             type="text"
//             id="description"
//             className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={description}
//             onChange={handleDescriptionChange}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="qty" className="text-gray-7 00">Quantity</label>
//           <input
//             type="number"
//             id="qty"
//             className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={qty}
//             onChange={handleQtyChange}
//           />
//         </div>
//         <button
//           onClick={addItem}
//           className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
//         >
//           Add Item
//         </button>
//       </div>
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold">Items List</h2>
//         <ul className="list-disc pl-5">
//           {items.map((item, index) => (
//             <li key={index} className="flex justify-between items-center">
//               <span>{`${item.barcode} - ${item.description} - ${item.qty}`}</span>
//               <button
//                 onClick={() => deleteItem(index)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="container mx-auto p-4">
//   <div className="flex justify-between items-center mb-4">
//     <h1 className="text-2xl font-bold">Barcode Data</h1>
//     <button
//       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       onClick={handleAddRow}
//     >
//       Add Row
//     </button>
//   </div>

//   <table className="table-auto w-full border border-gray-300 rounded">
//     <thead>
//       <tr className="bg-gray-100">
//         <th className="px-4 py-2 text-left">Barcode</th>
//         <th className="px-4 py-2 text-left">Product</th>
//         <th className="px-4 py-2 text-left">City</th>
//         <th className="px-4 py-2 text-left">RPU</th>
//         <th className="px-4 py-2 text-left">Delete</th>
//       </tr>
//     </thead>
//     <tbody>
//       {data.map((row, index) => (
//         <tr key={index}>
//           <td className="px-4 py-2">
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded px-2 py-1"
//               value={row.barcode}
//               onChange={(e) => handleChange(index, 'barcode', e.target.value)}
//             />
//           </td>
//           <td className="px-4 py-2">
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded px-2 py-1"
//               value={row.product}
//               onChange={(e) => handleChange(index, 'product', e.target.value)}
//             />
//           </td>
//           <td className="px-4 py-2">
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded px-2 py-1"
//               value={row.city}
//               onChange={(e) => handleChange(index, 'city', e.target.value)}
//             />
//           </td>
//           <td className="px-4 py-2">
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded px-2 py-1"
//               value={row.rpu}
//               onChange={(e) => handleChange(index, 'rpu', e.target.value)}
//             />
//           </td>
//           <td className="px-4 py-2">
//             <button
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
//             //   onClick={() => handleDeleteRow(index)}
//             >
//               Delete
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>

//   {/* Print and Close Buttons */}
//   <div className="flex justify-end gap-4 mt-4">
//     <button
//       className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//       onClick={handleClose}
//     >
//       Close
//     </button>
//     <button
//       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//       onClick={handlePrint}
//     >
//       Print
//     </button>
//   </div>
// </div>

//     </div>
//   );
// }

// export default BarcodePrint;

import React, { useState } from "react";
import { Link } from "react-router-dom";

function BarcodePrint() {
  const [items, setItems] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [description, setDescription] = "";
  const [qty, setQty] = useState("");
  const [data, setData] = useState([]);

  const handleAddRow = () => {
    setData([...data, { barcode: "", product: "", city: "", rpu: "" }]);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    console.log("Close button clicked");
  };

  const handleChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const addItem = () => {
    setItems([...items, { barcode, description, qty }]);
    setBarcode("");
    setDescription("");
    setQty("");
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Barcode Challan Package
      </h1>

      {/* Input Form */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="barcode" className="block text-gray-700">
              Barcode
            </label>
            <input
              type="text"
              id="barcode"
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="qty" className="block text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="qty"
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={addItem}
          className="w-full bg-blue-500 text-white rounded-lg py-2 mt-4 hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>

      {/* Items List */}
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Items List</h2>
        {items.length > 0 ? (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm"
              >
                <span className="text-gray-700">
                  {`${item.barcode} - ${item.description} - ${item.qty}`}
                </span>
                <button
                  onClick={() => deleteItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No items added yet.</p>
        )}
      </div>

      {/* Barcode Data Table */}
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-600">Barcode Data</h2>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleAddRow}
          >
            Add Row
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Barcode</th>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">City</th>
                <th className="px-4 py-2 text-left">RPU</th>
                <th className="px-4 py-2 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      value={row.barcode}
                      onChange={(e) =>
                        handleChange(index, "barcode", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      value={row.product}
                      onChange={(e) =>
                        handleChange(index, "product", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      value={row.city}
                      onChange={(e) =>
                        handleChange(index, "city", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      value={row.rpu}
                      onChange={(e) => handleChange(index, "rpu", e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Link
        to='/pos'
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={handleClose}
        >
          Close
        </Link>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
    </div>
  );
}

export default BarcodePrint;
