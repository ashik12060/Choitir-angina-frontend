

import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    id: "",
    name: "",
    mobile: "",
  });
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [netPayable, setNetPayable] = useState(0.0);
  const [vatRate, setVatRate] = useState(0); // VAT rate in percentage
  const [discountRate, setDiscountRate] = useState(0); // Discount rate in percentage
  const [vatAmount, setVatAmount] = useState(0.0); // VAT amount
  const [discountAmount, setDiscountAmount] = useState(0.0); // Discount amount

  // Fetch products from the API
  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/api/products/show`)
      .then((response) => {
        setProducts(response.data.products);
        console.log(products);
        console.log(response.data.products);
      });
  }, []);

  // Handle product selection
  const handleProductSelect = (productId) => {
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product);
    setTotalPrice(Number(product.price) * qty);
  };

  // Handle quantity change
  const handleQtyChange = (e) => {
    const newQty = parseInt(e.target.value, 10);
    setQty(newQty);
    if (selectedProduct) {
      setTotalPrice(Number(selectedProduct.price) * newQty);
    }
  };

  // Handle VAT and Discount calculations
  const calculateNetPayable = () => {
    const discount = (totalPrice * discountRate) / 100;
    const vat = (totalPrice * vatRate) / 100;

    setDiscountAmount(discount);
    setVatAmount(vat);
    const finalAmount = totalPrice - discount + vat;
    setNetPayable(finalAmount);
  };

  // Update net payable whenever total price, VAT or discount changes
  useEffect(() => {
    calculateNetPayable();
  }, [totalPrice, vatRate, discountRate]);

  // Handle sale submission
  const handleSubmit = () => {
    const saleData = {
      productId: selectedProduct._id,
      quantity: qty,
      customerInfo,
      totalPrice,
      vatAmount,
      discountAmount,
      netPayable,
    };

    axiosInstance.post("/api/sales/create", saleData).then((response) => {
      alert("Sale submitted successfully!");
      // Reset fields after submission
      setSelectedProduct(null);
      setQty(1);
      setCustomerInfo({ id: "", name: "", mobile: "" });
      setTotalPrice(0.0);
      setNetPayable(0.0);
      setVatAmount(0.0);
      setDiscountAmount(0.0);
      setVatRate(0);
      setDiscountRate(0);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white shadow-md p-4 rounded-md flex justify-between items-center">
        <h1 className="text-lg font-bold">Point Of Sales</h1>
        <p className="font-bold">
          <i>Green Software Technology</i>
        </p>
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
          <div className="grid grid-cols-6 gap-4">
            <div>
              <label className="text-sm text-gray-700">Product</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={(e) => handleProductSelect(e.target.value)}
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700">Barcode</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={selectedProduct?.barcode || ""}
                readOnly
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Qty</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                value={qty}
                onChange={handleQtyChange}
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Customer ID</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={customerInfo.id}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, id: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Customer Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Mobile</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={customerInfo.mobile}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, mobile: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">VAT Rate (%)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                value={vatRate}
                onChange={(e) => setVatRate(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Discount Rate (%)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="mt-4">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 p-2">SL</th>
                  <th className="border border-gray-300 p-2">Product</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Qty</th>
                  <th className="border border-gray-300 p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedProduct && (
                  <tr>
                    <td className="border border-gray-300 p-2">1</td>
                    <td className="border border-gray-300 p-2">
                      {selectedProduct.title}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${Number(selectedProduct?.price).toFixed(2) || "0.00"}
                    </td>
                    <td className="border border-gray-300 p-2">{qty}</td>
                    <td className="border border-gray-300 p-2">
                      ${totalPrice.toFixed(2)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section */}
        {/* <div className="col-span-3 bg-white shadow-md p-4 rounded-md">
          <h2 className="text-xl font-bold">৳ Net Payable</h2>
          <div className="mt-4">
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <p>Discount: -${discountAmount.toFixed(2)}</p>
            <p>VAT: +${vatAmount.toFixed(2)}</p>
            <p>Net Payable: ${netPayable.toFixed(2)}</p>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Print & Submit
          </button>
        </div> */}

<div className="col-span-3 bg-white shadow-md p-4 rounded-md">
  <h2 className="text-xl font-bold">৳ Net Payable</h2>
  <div className="mt-4">
    {/* Display total price */}
    <p>Total Price: ৳ {totalPrice.toFixed(2)}</p>
    
    {/* Display discount amount */}
    <p>Discount: -৳ {discountAmount.toFixed(2)}</p>
    
    {/* Display VAT amount */}
    <p>VAT: +৳ {vatAmount.toFixed(2)}</p>
    
    {/* Display the net payable amount */}
    <p>Net Payable: ৳ {netPayable.toFixed(2)}</p>
  </div>
  
  {/* Submit Button */}
  <button
    onClick={handleSubmit}
    className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md"
  >
    Print & Submit
  </button>
</div>

      </div>
    </div>
  );
};

export default Sales;
