import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { Link } from "react-router-dom";

const WarehouseSale = () => {
  
  const [warehouseProducts, setWarehouseProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // Array to store selected products
  const [qty, setQty] = useState(1);

  const [totalPrice, setTotalPrice] = useState(0.0);
  const [netPayable, setNetPayable] = useState(0.0);
  const [vatRate, setVatRate] = useState(0); // VAT rate in percentage
  const [discountRate, setDiscountRate] = useState(0); // Discount rate in percentage
  const [vatAmount, setVatAmount] = useState(0.0); // VAT amount
  const [discountAmount, setDiscountAmount] = useState(0.0); // Discount amount
  const [paymentMethod, setPaymentMethod] = useState(""); // New state for payment method
  const [amountGiven, setAmountGiven] = useState(0.0); // Amount customer gave
  const [changeReturned, setChangeReturned] = useState(0.0); // Change to return


  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");



useEffect(() => {
    const fetchWarehouseProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/warehouse-products/show");
        console.log(response.data.warehouseProducts)
        if (response.data && Array.isArray(response.data.warehouseProducts)) {
            setWarehouseProducts(response.data.warehouseProducts);
        } else {
            setWarehouseProducts([]); // Set empty array if data is missing
        }
      } catch (error) {
        console.error("Error fetching warehouseProducts:", error);
        setWarehouseProducts([]); // Prevent crash on error
      }
    };
  
    fetchWarehouseProducts();
  }, []);

  // Handle product selection
  const handleProductSelect = (productId) => {
    const product = warehouseProducts.find((p) => p._id === productId);
    if (!product) return;

    // Add product to selectedProducts array
    setSelectedProducts((prevSelected) => {
      const updatedProducts = [...prevSelected];
      const existingProduct = updatedProducts.find((p) => p._id === productId);
      if (existingProduct) {
        // If product already exists, update quantity
        existingProduct.qty = existingProduct.qty + 1; // Add 1 to qty
      } else {
        // Add the product with quantity 1
        updatedProducts.push({ ...product, qty: 1 });
      }
      return updatedProducts;
    });
  };

  // new
  useEffect(() => {
    if (amountGiven >= netPayable) {
      setChangeReturned(amountGiven - netPayable);
    } else {
      setChangeReturned(0.0); // If the amount given is less than net payable, no change
    }
  }, [amountGiven, netPayable]);

  // Handle quantity change for a specific product
  const handleQtyChange = (productId, newQty) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((product) =>
        product._id === productId ? { ...product, qty: newQty } : product
      )
    );
  };


  // Handle VAT and Discount calculations
  const calculateNetPayable = () => {
    let subtotal = 0;
    let vat = 0;
    let discount = 0;

    selectedProducts.forEach((product) => {
      const productTotal = parseFloat(product.price) * product.qty;
      subtotal += productTotal;
      vat += (productTotal * vatRate) / 100;
      discount += (productTotal * discountRate) / 100;
    });

    const finalAmount = subtotal - discount + vat;
    setTotalPrice(subtotal);
    setVatAmount(vat);
    setDiscountAmount(discount);
    setNetPayable(finalAmount);
  };

  // Update net payable whenever total price, VAT or discount changes
  useEffect(() => {
    calculateNetPayable();
  }, [selectedProducts, vatRate, discountRate]);

  const handleSubmit = () => {
    const saleData = {
      warehouseProducts: selectedProducts.map((product) => ({
        productId: product._id,
        title: product.title,
        quantity: product.qty, // Change `qty` to `quantity`
        price: product.price,
        type: product.type || "defaultType",
      })),
      
  
      totalPrice, // Change `totalPrice` to `totalAmount`
      vatAmount,
      discountAmount,
      netPayable,
      paymentMethod,

      customerName,  // Added customer name
      customerPhone, // Added customer phone
      customerAddress, // Added customer address
    };
    console.log(saleData)

    axiosInstance
      .post(`${process.env.REACT_APP_API_URL}/api/warehouse-sales/create`, saleData)
      .then((response) => {
        alert("Sale submitted successfully!");
        // Reset fields after submission
        setSelectedProducts([]);
        setQty(1);
        // setCustomerInfo({ id: "", name: "", mobile: "" });
        setTotalPrice(0.0);
        setNetPayable(0.0);
        setVatAmount(0.0);
        setDiscountAmount(0.0);
        setVatRate(0);
        setDiscountRate(0);
        setCustomerName("");
        setCustomerPhone("");
        setCustomerAddress("");
        
      });
  };

  // Remove product from selected products
  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.filter((product) => product._id !== productId)
    );
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white shadow-md p-4 rounded-md flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Chaityr Angina
        </Link>
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
                {Array.isArray(warehouseProducts) &&
                warehouseProducts.length > 0 ? (
                  warehouseProducts.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.title}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No products available
                  </option>
                )}
              </select>
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
                  <th className="border border-gray-300 p-2">Available</th>
                  <th className="border border-gray-300 p-2">Total</th>
                  <th className="border border-gray-300 p-2">Action</th>{" "}
                
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      {product.title}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${parseFloat(product.price).toFixed(2) || "0.00"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={product.qty}
                        onChange={(e) =>
                          handleQtyChange(
                            product._id,
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
            {product.quantity} {/* Show available quantity */}
          </td>
                    <td className="border border-gray-300 p-2">
                      $
                      {parseFloat(product.price * product.qty).toFixed(2) ||
                        "0.00"}
                    </td>
                  
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleRemoveProduct(product._id)}
                        className="bg-red-500 text-white px-2 py-1 "
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>




        

          
        </div>

        {/* Right Section */}
        <div className="col-span-3 bg-white shadow-md p-4 rounded-md">
          <div className="col-span-3 bg-white  p-4 rounded-md">
            <h1 className="bg-green-600 text-white text-left text-lg font-bold p-4">
              Payable Amount: {`৳ ${netPayable.toFixed(2)}`}
            </h1>
            <h2 className="text-xl font-bold">৳ Net Payable</h2>
            <div className="mt-4">
              {/* Total Price input */}
              <div className="flex items-center">
                <label className="text-sm py-2 w-1/5 text-gray-700">
                  Total Price
                </label>
                <input
                  type="text"
                  value={`৳ ${totalPrice.toFixed(2)}`}
                  readOnly
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Discount input */}
              <div className="mt-2 flex items-center">
                <label className="text-sm py-2 w-1/5 text-gray-700">
                  Discount
                </label>
                <input
                  type="text"
                  value={`-৳ ${discountAmount.toFixed(2)}`}
                  readOnly
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* VAT input */}
              <div className="mt-2 flex items-center">
                <label className="text-sm py-2 w-1/5 text-gray-700">VAT</label>
                <input
                  type="text"
                  value={`+৳ ${vatAmount.toFixed(2)}`}
                  readOnly
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Net Payable input */}
              <div className="mt-2 flex items-center">
                <label className="text-sm py-2 w-1/5 text-gray-700 font-bold">
                  Net Payable
                </label>
                <input
                  type="text"
                  value={`৳ ${netPayable.toFixed(2)}`}
                  readOnly
                  className="w-2/3 border border-gray-300 font-bold rounded-md p-2"
                />
              </div>

              {/* Amount Given input */}
              <div className="mt-2 flex items-center">
                <label className="text-sm py-2 w-1/5 text-gray-700">
                  Amount Given
                </label>
                <input
                  type="number"
                  value={amountGiven}
                  onChange={(e) =>
                    setAmountGiven(parseFloat(e.target.value) || 0.0)
                  }
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Change to Return input */}
              <div className="mt-2 flex items-center">
                <label className="text-sm py-2 w-1/5 text-gray-700 font-bold">
                  Change to Return
                </label>
                <input
                  type="text"
                  value={`৳ ${changeReturned.toFixed(2)}`}
                  readOnly
                  className="w-2/3 border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-700">Customer Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Customer Phone</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Customer Address</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </div>
          </div>

            {/* Payment Method Dropdown */}
            <div className="mt-4">
              <label className="text-sm text-gray-700">Payment Method</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </select>
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
        {/* </div> */}
      </div>
    </div>
  );
};

export default WarehouseSale;
