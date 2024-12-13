// import React, { useState } from 'react';

// function SalesCancel() {
//   const [invoice, setInvoice] = useState('');
//   const [barcode, setBarcode] = useState('');
//   const [item, setItem] = useState('');
//   const [customer, setCustomer] = useState('');
//   const [inStock, setInStock] = useState(0);
//   const [rate, setRate] = useState(0);
//   const [allendent, setAllendent] = useState('');
//   const [productDescription, setProductDescription] = useState('');
//   const [qty, setQty] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [totalQty, setTotalQty] = useState(0);
//   const [totalItems, setTotalItems] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [discPercent, setDiscPercent] = useState(0);
//   const [discAmount, setDiscAmount] = useState(0);
//   const [vatAmount, setVatAmount] = useState(0);
//   const [netAmount, setNetAmount] = useState(0);
//   const [numberOfCopies, setNumberOfCopies] = useState(1);

//   const handleInvoiceChange = (e) => {
//     setInvoice(e.target.value);
//   };

//   const handleBarcodeChange = (e) => {
//     setBarcode(e.target.value);
//   };

//   const handleItemChange = (e) => {
//     setItem(e.target.value);
//   };

//   const handleCustomerChange = (e) => {
//     setCustomer(e.target.value);
//   };

//   const handleInStockChange = (e) => {
//     setInStock(parseInt(e.target.value, 10));
//   };

//   const handleRateChange = (e) => {
//     setRate(parseFloat(e.target.value));
//   };

//   const handleAllendentChange = (e) => {
//     setAllendent(e.target.value);
//   };

//   const handleProductDescriptionChange = (e) => {
//     setProductDescription(e.target.value);
//   };

//   const handleQtyChange = (e) => {
//     setQty(parseInt(e. target.value, 10));
//   };

//   const handleTotalChange = (e) => {
//     setTotal(parseFloat(e.target.value));
//   };

//   const handleTotalQtyChange = (e) => {
//     setTotalQty(parseInt(e.target.value, 10));
//   };

//   const handleTotalItemsChange = (e) => {
//     setTotalItems(parseInt(e.target.value, 10));
//   };

//   const handleTotalPriceChange = (e) => {
//     setTotalPrice(parseFloat(e.target.value));
//   };

//   const handleDiscPercentChange = (e) => {
//     setDiscPercent(parseFloat(e.target.value));
//   };

//   const handleDiscAmountChange = (e) => {
//     setDiscAmount(parseFloat(e.target.value));
//   };

//   const handleVatAmountChange = (e) => {
//     setVatAmount(parseFloat(e.target.value));
//   };

//   const handleNetAmountChange = (e) => {
//     setNetAmount(parseFloat(e.target.value));
//   };

//   const handleNumberOfCopiesChange = (e) => {
//     setNumberOfCopies(parseInt(e.target.value, 10));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Invoice Generator</h1>
//       <form className="space-y-4">
//         <input
//           type="text"
//           value={invoice}
//           onChange={handleInvoiceChange}
//           placeholder="Invoice Number"
//           className="border p-2 w-full"
//         />
//         <input
//           type="text"
//           value={barcode}
//           onChange={handleBarcodeChange}
//           placeholder="Barcode"
//           className="border p-2 w-full"
//         />
//         <input
//           type="text"
//           value={item}
//           onChange={handleItemChange}
//           placeholder="Item"
//           className="border p-2 w-full"
//         />
//         <input
//           type="text"
//           value={customer}
//           onChange={handleCustomerChange}
//           placeholder="Customer Name"
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           value={inStock}
//           onChange={handleInStockChange}
//           placeholder="In Stock"
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           value={rate}
//           onChange={handleRateChange}
//           placeholder="Rate"
//           className="border p-2 w-full"
//         />
//         <input
//           type="text"
//           value={allendent}
//           onChange={handleAllendentChange}
//           placeholder="Allendent"
//           className="border p-2 w-full"
//         />
//         <input
//           type="text"
//           value={productDescription}
//           onChange={handleProductDescriptionChange}
//           placeholder="Product Description"
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           value={qty}
//           onChange={handleQtyChange}
//           placeholder="Quantity"
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           value={total}
//           onChange={handleTotalChange}
//           placeholder="Total"
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           value={totalQty}
//           onChange={handleTotalQtyChange}
//           placeholder="Total Quantity"
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           value={totalItems}
//           onChange={handleTotalItemsChange}
//           placeholder="Total Items"
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           value={totalPrice}
//           onChange={handleTotalPriceChange}
//           placeholder="Total Price"
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           value={discPercent}
//           onChange={handleDiscPercentChange}
//           placeholder="Discount Percentage"
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           value={discAmount}
//           onChange={handleDiscAmountChange}
//           placeholder="Discount Amount"
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           value={vatAmount}
//           onChange={handleVatAmountChange}
//           placeholder="VAT Amount"
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           value={netAmount}
//           onChange={handleNetAmountChange}
//           placeholder="Net Amount"
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           value={numberOfCopies}
//           onChange={handleNumberOfCopiesChange}
//           placeholder="Number of Copies"
//           className="border p-2 w-full"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">Generate Invoice</button>
//       </form>
//     </div>
//   );
// }

// export default SalesCancel;

// App.js
import React from 'react';

function App() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="border p-4">
        <div className="flex items-center space-x-4">
          <label>
            <input type="radio" name="mode" className="mr-2" /> By Invoice
          </label>
          <label>
            <input type="radio" name="mode" className="mr-2" /> By Barcode
          </label>
        </div>
        <div className="grid grid-cols-6 gap-2 mt-4">
          <input type="text" placeholder="Invoice" className="border p-2 col-span-1" />
          <input type="text" placeholder="Barcode" className="border p-2 col-span-1" />
          <input type="text" placeholder="Item" className="border p-2 col-span-1" />
          <input type="text" placeholder="Customer" className="border p-2 col-span-2" />
          <button className="bg-blue-500 text-white px-4 py-2 col-span-1">Search</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 border p-4">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Barcode</th>
                <th className="border p-2">Product Description</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">123456</td>
                <td className="border p-2">Sample Product</td>
                <td className="border p-2">10.00</td>
                <td className="border p-2">2</td>
                <td className="border p-2">20.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border p-4 space-y-2">
          <div className="flex justify-between">
            <span>Total Qty:</span>
            <span>0</span>
          </div>
          <div className="flex justify-between">
            <span>Total Items:</span>
            <span>0</span>
          </div>
          <div className="flex justify-between">
            <span>Total Price:</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between">
            <span>Disc %:</span>
            <input type="text" className="border p-1 w-16" />
          </div>
          <div className="flex justify-between">
            <span>Net Amount:</span>
            <span className="font-bold text-yellow-500">0.00</span>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 w-full">Refresh</button>
        </div>
      </div>

      <div className="p-4 border-t mt-4 flex justify-between items-center">
        <div>
          <label>No. of Copies:</label>
          <input type="number" className="border p-1 ml-2 w-16" />
        </div>
        <button className="bg-green-500 text-white px-4 py-2">Print & Submit</button>
      </div>
    </div>
  );
}

export default App;
