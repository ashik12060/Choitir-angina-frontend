import React, { useState } from "react";

const Sales = () => {
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [discountPercent, setDiscountPercent] = useState(0.0);
  const [discountAmount, setDiscountAmount] = useState(0.0);
  const [vatAmount, setVatAmount] = useState(0.0);
  const [exciseAmount, setExciseAmount] = useState(0.0);
  const [rounding, setRounding] = useState(0.0);
  const [netAmount, setNetAmount] = useState(0.0);

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateNetAmount = () => {
    const discount = (totalPrice * discountPercent) / 100;
    const total = totalPrice - discount + vatAmount + exciseAmount + rounding;
    setNetAmount(total);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header Section */}
      <div className="bg-white shadow-md p-4 rounded-md flex justify-between items-center">
        <h1 className="text-lg font-bold">Point Of Sales</h1>
        <p className="font-bold"><i>Green Software Technology</i></p>
        <img
          src="https://via.placeholder.com/150"
          alt="Company Logo"
          className="h-8"
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-2 my-2">
        {/* Left Section */}
        <div className="col-span-9 bg-white shadow-md p-4 rounded-md">
          {/* Input Fields */}
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-2">
              <label className="text-sm text-gray-700">Barcode</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Barcode"
              />
            </div>
            <br />
            <div>
              <label className="text-sm text-gray-700">Qty</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Qty"
              />
            </div>
            <br />
            <div>
              <label className="text-sm text-gray-700">Product</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Product"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-700">Customer ID</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Customer ID"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Customer Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Customer ID"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Mobile</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Mobile"
              />
            </div>
          </div>
<div className="bg-blue-400 text-center text-white my-1">Search Items</div>
          {/* Table Section */}
          <div className="mt-2">
            <div className="flex flex-col mb-96 align-bottom">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 p-2">SL</th>
                    <th className="border border-gray-300 p-2">Barcode</th>
                    <th className="border border-gray-300 p-2">
                      Product Description
                    </th>
                    <th className="border border-gray-300 p-2">Rate</th>
                    <th className="border border-gray-300 p-2">Qty</th>
                    <th className="border border-gray-300 p-2">Disc</th>
                    <th className="border border-gray-300 p-2">Total</th>
                    <th className="border border-gray-300 p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">
                      1
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      123456
                    </td>
                    <td className="border border-gray-300 p-2">
                      Sample Product
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      $10.00
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      1
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      0%
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      $10.00
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      -
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div>
              <div className="flex border my-2">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 border rounded-md w-2/5 sm:w-2/10">
                  Hold
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 border rounded-md w-2/5 sm:w-2/10">
                  Apply Promotion
                </button>
                <button className="bg-green-500 text-white border py-2 rounded-md w-full sm:w-6/10">
                  Print Last Invoice
                </button>
              </div>

              <div className="flex border my-2">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 border rounded-md w-2/5 sm:w-2/10">
                  Hold
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 border rounded-md w-2/5 sm:w-2/10">
                  Apply Promotion
                </button>
                <button className="bg-green-500 text-white border py-2 rounded-md w-full sm:w-6/10">
                  Print & Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-3 bg-white shadow-md p-4 rounded-md ">
          {/* Payment Details */}
          <div>
            <div className="flex justify-between  bg-blue-300 p-4 items-center">
              <span className="text-gray-700 font-bold">Paid Amt</span>
              <span className="text-blue-600 font-bold">0.00</span>
            </div>
            <div className="flex justify-between  p-4 bg-red-500 items-center mt-2">
              <span className="text-white font-bold">Change Amt</span>
              <span className="text-white font-bold">0.00</span>
            </div>
          </div>

          {/* Summary */}

          <div className="p-4 rounded-md shadow-md bg-white">
            <h2 className="text-xl font-bold mb-4">৳ Net Payable</h2>
            <div className="grid grid-cols-1 ">
              {/* Total Price */}
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="totalPrice"
                  className="block text-gray-700 font-bold text-sm w-40"
                >
                  Total Price
                </label>
                <input
                  type="number"
                  id="totalPrice"
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(parseFloat(e.target.value))}
                />
              </div>

              {/* Discount Percent */}
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="discountPercent"
                  className="block text-gray-700 font-bold  text-sm w-40"
                >
                  Disc. %
                </label>
                <input
                  type="number"
                  id="discountPercent"
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={discountPercent}
                  onChange={(e) =>
                    setDiscountPercent(parseFloat(e.target.value))
                  }
                />
              </div>

              {/* Discount Amount */}
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="discountAmount"
                  className="block text-gray-700 text-sm font-bold w-40"
                >
                  Disc Amount
                </label>
                <input
                  type="number"
                  id="discountAmount"
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={discountAmount}
                  onChange={(e) =>
                    setDiscountAmount(parseFloat(e.target.value))
                  }
                />
              </div>

              {/* VAT Amount */}
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="vatAmount"
                  className="block text-gray-700 text-sm font-bold w-40"
                >
                  VAT Amount
                </label>
                <input
                  type="number"
                  id="vatAmount"
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={vatAmount}
                  onChange={(e) => setVatAmount(parseFloat(e.target.value))}
                />
              </div>

              {/* Excise Amount */}
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="exciseAmount"
                  className="block text-gray-700 text-sm font-bold w-40"
                >
                  Excise Amount
                </label>
                <input
                  type="number"
                  id="exciseAmount"
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={exciseAmount}
                  onChange={(e) => setExciseAmount(parseFloat(e.target.value))}
                />
              </div>

              {/* Rounding */}
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="rounding"
                  className="block text-gray-700 text-sm font-bold w-40"
                >
                  Rounding
                </label>
                <input
                  type="number"
                  id="rounding"
                  className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={rounding}
                  onChange={(e) => setRounding(parseFloat(e.target.value))}
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateNetAmount}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Calculate Net Amount
            </button>

            {/* Net Amount Display */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">
                Net Amount: ${netAmount.toFixed(2)}
              </h3>
            </div>
          </div>

          {/* Payment Modes */}
          <div className="mt-4">
            <h3 className="text-lg font-bold text-white bg-blue-500  p-2 ">Mode of Payment</h3>

            <div className="p-4">
      <label htmlFor="paymentMethod" className="block text-gray-700 font-bold mb-2">
        Payment Method
      </label>
      <select
        id="paymentMethod"
        value={paymentMethod}
        onChange={handleChange}
        className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      >
        <option value="">Select Payment Method</option>
        <option value="cash">Cash</option>
        <option value="card">Card</option>
        <option value="bkash">Bkash</option>
        <option value="others">Others</option>
      </select>
      {paymentMethod && (
        <div className="mt-2 text-gray-600">
          Selected Payment Method: <span className="font-semibold">{paymentMethod}</span>
        </div>
      )}
    </div>


            <div className="flex flex-col  mt-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-gray-700 text-sm">Cash Amount</label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md p-1 w-6/12"
                  placeholder="0.00"
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="font-bold text-gray-700 text-sm">Card Amount</label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md p-1 w-6/12"
                  placeholder="0.00"
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="font-bold text-gray-700 text-sm">Pay Amount</label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md p-1 w-6/12"
                  placeholder="0.00"
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="font-bold text-gray-700 text-sm">Return Amount</label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md p-1 w-6/12"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
