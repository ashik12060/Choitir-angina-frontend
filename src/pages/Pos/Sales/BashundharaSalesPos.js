import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { Link } from "react-router-dom";
import logo from "../../../assets/chaityr-angina-logo.png";

const BashundharaSalesPos = () => {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    id: "",
    name: "",
    mobile: "",
  });
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [netPayable, setNetPayable] = useState(0.0);
  const [vatRate, setVatRate] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [vatAmount, setVatAmount] = useState(0.0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amountGiven, setAmountGiven] = useState(0.0);
  const [changeReturned, setChangeReturned] = useState(0.0);
  const [cardNumber, setCardNumber] = useState("");

  // Fetch all shops
  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/api/shops/show`)
      .then((res) => setShops(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch products for selected shop

  useEffect(() => {
    if (!selectedShop) {
      setProducts([]);
      setSelectedProducts([]);
      return;
    }

    axiosInstance
      .get(
        `${process.env.REACT_APP_API_URL}/api/shops/${selectedShop}/products`
      )
      .then((res) => {
        console.log("Products under selected shop:", res.data); // <-- res.data is the array
        setProducts(res.data || []);
      })
      .catch((err) => console.error(err));
  }, [selectedShop]);

  // Barcode scanning restricted to selected shop products
  const handleBarcodeInput = (e) => {
    if (e.key !== "Enter") return;
    const barcode = e.target.value.trim();
    if (!barcode) return;

    let foundProduct = null;
    let matchedVariant = null;

    for (const product of products) {
      const variant = product.variants.find((v) => v.subBarcode === barcode);
      if (variant) {
        foundProduct = product;
        matchedVariant = variant;
        break;
      }
    }

    if (!foundProduct || !matchedVariant) {
      alert("❌ Product with this barcode was not found in selected shop.");
      e.target.value = "";
      return;
    }

    // setSelectedProducts((prevSelected) => {
    //   const updatedProducts = [...prevSelected];
    //   const existingProduct = updatedProducts.find(
    //     (p) =>
    //       p._id === foundProduct._id &&
    //       p.selectedSize === matchedVariant.size &&
    //       p.selectedColor === matchedVariant.color
    //   );

    //   if (existingProduct) {
    //     existingProduct.qty += 1;
    //   } else {
    //     updatedProducts.push({
    //       ...foundProduct,
    //       qty: 1,
    //       selectedSize: matchedVariant.size,
    //       selectedColor: matchedVariant.color,
    //       availableQty: matchedVariant.quantity,
    //     });
    //   }

    //   return updatedProducts;
    // });
   
   setSelectedProducts((prevSelected) => {
  const updatedProducts = [...prevSelected];
  const existingProduct = updatedProducts.find(
    (p) => p.productId === foundProduct._id && p.variantId === matchedVariant.variantId
  );

  if (existingProduct) {
    existingProduct.qty += 1;
  } else {
    updatedProducts.push({
      productId: foundProduct._id,
      variantId: matchedVariant.variantId,
      title: foundProduct.title,
      price: foundProduct.price,
      qty: 1,
      selectedSize: matchedVariant.size,
      selectedColor: matchedVariant.color,
      availableQty: matchedVariant.assignedQuantity,
    //   availableQty: matchedVariant.quantity,
      variants: foundProduct.variants, // <-- Add this
    });
  }

  return updatedProducts;
});

   
    // setSelectedProducts((prevSelected) => {
    //   const updatedProducts = [...prevSelected];
    //   const existingProduct = updatedProducts.find(
    //     (p) =>
    //       p.productId === foundProduct._id &&
    //       p.variantId === matchedVariant.variantId
    //   );

    //   if (existingProduct) {
    //     existingProduct.qty += 1;
    //   } else {
    //     updatedProducts.push({
    //       productId: foundProduct._id,
    //       variantId: matchedVariant.variantId,
    //       title: foundProduct.title,
    //       price: foundProduct.price,
    //       qty: 1,
    //       selectedSize: matchedVariant.size,
    //       selectedColor: matchedVariant.color,
    //       availableQty: matchedVariant.quantity,
    //     });
    //   }

    //   return updatedProducts;
    // });

    e.target.value = "";
  };

  const handleQtyChange = (productId, newQty) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((product) =>
        product._id === productId
          ? { ...product, qty: Number(newQty) }
          : product
      )
    );
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.filter((product) => product._id !== productId)
    );
  };

  const updateAvailableQty = (product, selectedSize, selectedColor) => {
    const matchedVariant = product.variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor
    );
    return matchedVariant ? matchedVariant.quantity : 0;
  };

  const handleSizeChange = (productId, selectedSize) => {
    setSelectedProducts((prev) =>
      prev.map((product) => {
        if (product._id === productId) {
          const newAvailableQty = updateAvailableQty(
            product,
            selectedSize,
            product.selectedColor
          );
          return { ...product, selectedSize, availableQty: newAvailableQty };
        }
        return product;
      })
    );
  };

  const handleColorChange = (productId, selectedColor) => {
    setSelectedProducts((prev) =>
      prev.map((product) => {
        if (product._id === productId) {
          const newAvailableQty = updateAvailableQty(
            product,
            product.selectedSize,
            selectedColor
          );
          return { ...product, selectedColor, availableQty: newAvailableQty };
        }
        return product;
      })
    );
  };

  const calculateNetPayable = () => {
    let subtotal = 0;
    let vat = 0;
    selectedProducts.forEach((product) => {
      const productTotal = parseFloat(product.price) * product.qty;
      subtotal += productTotal;
      vat += (productTotal * vatRate) / 100;
    });
    const finalAmount = subtotal - discountAmount + vat;
    setTotalPrice(subtotal);
    setVatAmount(vat);
    setNetPayable(finalAmount);
  };

  useEffect(
    () => calculateNetPayable(),
    [selectedProducts, vatRate, discountAmount]
  );

  useEffect(() => {
    setChangeReturned(
      amountGiven >= netPayable ? amountGiven - netPayable : 0.0
    );
  }, [amountGiven, netPayable]);


const handleSubmit = () => {
  const saleData = {
    shopId: selectedShop,   // <--- You need this
    items: selectedProducts.map(p => ({
      productId: p.productId,
      variantId: p.variantId,
      subBarcode: p.subBarcode || "",
      title: p.title,
      size: p.selectedSize,
      color: p.selectedColor,
      price: p.price,
      quantity: p.qty,
      subtotal: p.price * p.qty
    })),
    customerInfo: customerInfo.id || customerInfo.name || customerInfo.mobile ? customerInfo : undefined,
    discountAmount,
    vatRate,
    paymentMethod,
    ...(paymentMethod === "Card" && { cardNumber })
  };

  axiosInstance
    .post(`${process.env.REACT_APP_API_URL}/api/bashundhara-sales/create`,
  saleData)
    .then(() => {
      alert("Sale submitted successfully!");
      setSelectedProducts([]);
      setQty(1);
      setCustomerInfo({ id: "", name: "", mobile: "" });
      setTotalPrice(0);
      setNetPayable(0);
      setVatAmount(0);
      setDiscountAmount(0);
      setVatRate(0);
      setAmountGiven(0);
      setChangeReturned(0);
      setPaymentMethod("");
      setCardNumber("");
    })
    .catch(err => {
      console.error("Sale error:", err);
      alert("Error submitting sale. Check console.");
    });
};


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white shadow-md p-4 rounded-md flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Chaityr Angina
        </Link>
        <img src={logo} alt="Company Logo" className="h-10" />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-2 my-2">
        {/* Left Section */}
        <div className="col-span-9 bg-white shadow-md p-4 rounded-md">
          {/* Shop Selection */}
          <div className="mb-4">
            <label className="text-sm text-gray-700">Select Shop</label>
            <select
              value={selectedShop}
              onChange={(e) => setSelectedShop(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">-- Select Shop --</option>
              {shops.map((shop) => (
                <option key={shop._id} value={shop._id}>
                  {shop.name}
                </option>
              ))}
            </select>
          </div>

          {/* Barcode Input */}
         
          {/* Barcode Input */}
          <div className="mb-4">
            <label className="text-sm text-gray-700">
              Scan or Enter Barcode
            </label>
            <input
              type="text"
              autoFocus
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter or scan barcode and press Enter"
              onKeyDown={handleBarcodeInput}
              disabled={!selectedShop} // Disable if no shop selected
            />
          </div>

          {/* Selected Products Table */}
          {selectedProducts.length > 0 && (
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">SL</th>
                  <th className="border p-2">Product</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Available</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product, idx) => (
                  <tr key={product._id}>
                    <td className="border p-2">{idx + 1}</td>
                    <td className="border p-2">{product.title}</td>
                    <td className="border p-2">
                      {parseFloat(product.price).toFixed(2)}
                    </td>
                    <td className="border p-2">
                      {product.availableQty ||
                        product.variants?.reduce(
                          (sum, v) => sum + v.quantity,
                          0
                        )}
                      <div className="mt-1">
                        <select
                          className="text-xs border p-1"
                          value={product.selectedSize || ""}
                          onChange={(e) =>
                            handleSizeChange(product._id, e.target.value)
                          }
                        >
                          <option value="">Select Size</option>
                          {[
                            ...new Set(product.variants?.map((v) => v.size)),
                          ].map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                        <select
                          className="text-xs border p-1 ml-1"
                          value={product.selectedColor || ""}
                          onChange={(e) =>
                            handleColorChange(product._id, e.target.value)
                          }
                        >
                          <option value="">Select Color</option>
                          {[
                            ...new Set(product.variants?.map((v) => v.color)),
                          ].map((color) => (
                            <option key={color} value={color}>
                              {color}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        min={1}
                        max={product.availableQty || 1}
                        value={product.qty}
                        className="w-full border rounded px-1 py-0.5"
                        onChange={(e) =>
                          handleQtyChange(product._id, e.target.value)
                        }
                      />
                    </td>
                    <td className="border p-2">
                      {(product.price * product.qty).toFixed(2)}
                    </td>
                    <td className="border p-2">
                      <button
                        className="bg-red-500 text-white px-2 py-1"
                        onClick={() => handleRemoveProduct(product._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Right Section */}

        {/* Right Section */}
<div className="col-span-3 bg-white shadow-md p-4 rounded-md">
  <h1 className="bg-green-600 text-white text-left text-lg font-bold p-4">
    Payable Amount: ৳ {netPayable.toFixed(2)}
  </h1>

  <div className="mt-4 space-y-2">
    {/* Total Price */}
    <div className="flex items-center">
      <label className="text-sm py-2 w-1/3 text-gray-700">Total Price</label>
      <input
        type="text"
        value={`৳ ${totalPrice.toFixed(2)}`}
        readOnly
        className="w-2/3 border rounded p-2"
      />
    </div>

    {/* Discount Input */}
    <div className="flex items-center">
      <label className="text-sm py-2 w-1/3 text-gray-700">Discount</label>
      <input
        type="number"
        value={discountAmount}
        onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
        className="w-2/3 border rounded p-2"
        placeholder="Enter discount amount"
      />
    </div>

    {/* VAT Rate Input */}
    <div className="flex items-center">
      <label className="text-sm py-2 w-1/3 text-gray-700">VAT (%)</label>
      <input
        type="number"
        value={vatRate}
        onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
        className="w-2/3 border rounded p-2"
        placeholder="Enter VAT rate"
      />
    </div>

    {/* VAT Amount Display */}
    <div className="flex items-center">
      <label className="text-sm py-2 w-1/3 text-gray-700">VAT Amount</label>
      <input
        type="text"
        value={`+৳ ${vatAmount.toFixed(2)}`}
        readOnly
        className="w-2/3 border rounded p-2"
      />
    </div>

    {/* Net Payable */}
    <div className="flex items-center">
      <label className="text-sm py-2 w-1/3 font-bold text-gray-700">
        Net Payable
      </label>
      <input
        type="text"
        value={`৳ ${netPayable.toFixed(2)}`}
        readOnly
        className="w-2/3 border rounded p-2 font-bold"
      />
    </div>

    {/* Amount Given */}
    <div className="flex items-center">
      <label className="text-sm py-2 w-1/3 text-gray-700">Amount Given</label>
      <input
        type="number"
        value={amountGiven}
        onChange={(e) =>
          setAmountGiven(parseFloat(e.target.value) || 0)
        }
        className="w-2/3 border rounded p-2"
      />
    </div>

    {/* Change */}
    <div className="flex items-center">
      <label className="text-sm py-2 w-1/3 font-bold text-gray-700">
        Change
      </label>
      <input
        type="text"
        value={`৳ ${changeReturned.toFixed(2)}`}
        readOnly
        className="w-2/3 border rounded p-2"
      />
    </div>
  </div>

  {/* Payment */}
  <div className="mt-4">
    <label className="text-sm text-gray-700">Payment Method</label>
    <select
      value={paymentMethod}
      onChange={(e) => setPaymentMethod(e.target.value)}
      className="w-full border rounded p-2"
    >
      <option value="">Select Payment Method</option>
      <option value="Cash">Cash</option>
      <option value="Card">Card</option>
    </select>
    {paymentMethod === "Card" && (
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className="w-full border rounded p-2 mt-2"
      />
    )}
  </div>

  <button
    onClick={handleSubmit}
    className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md"
  >
    Print & Submit
  </button>
</div>

        {/* <div className="col-span-3 bg-white shadow-md p-4 rounded-md">
          <h1 className="bg-green-600 text-white text-left text-lg font-bold p-4">
            Payable Amount: ৳ {netPayable.toFixed(2)}
          </h1>

          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <label className="text-sm py-2 w-1/3 text-gray-700">
                Total Price
              </label>
              <input
                type="text"
                value={`৳ ${totalPrice.toFixed(2)}`}
                readOnly
                className="w-2/3 border rounded p-2"
              />
            </div>
            <div className="flex items-center">
              <label className="text-sm py-2 w-1/3 text-gray-700">
                Discount
              </label>
              <input
                type="text"
                value={`-৳ ${discountAmount.toFixed(2)}`}
                readOnly
                className="w-2/3 border rounded p-2"
              />
            </div>
            <div className="flex items-center">
              <label className="text-sm py-2 w-1/3 text-gray-700">VAT</label>
              <input
                type="text"
                value={`+৳ ${vatAmount.toFixed(2)}`}
                readOnly
                className="w-2/3 border rounded p-2"
              />
            </div>
            <div className="flex items-center">
              <label className="text-sm py-2 w-1/3 font-bold text-gray-700">
                Net Payable
              </label>
              <input
                type="text"
                value={`৳ ${netPayable.toFixed(2)}`}
                readOnly
                className="w-2/3 border rounded p-2 font-bold"
              />
            </div>
            <div className="flex items-center">
              <label className="text-sm py-2 w-1/3 text-gray-700">
                Amount Given
              </label>
              <input
                type="number"
                value={amountGiven}
                onChange={(e) =>
                  setAmountGiven(parseFloat(e.target.value) || 0)
                }
                className="w-2/3 border rounded p-2"
              />
            </div>
            <div className="flex items-center">
              <label className="text-sm py-2 w-1/3 font-bold text-gray-700">
                Change
              </label>
              <input
                type="text"
                value={`৳ ${changeReturned.toFixed(2)}`}
                readOnly
                className="w-2/3 border rounded p-2"
              />
            </div>
          </div>

          
          <div className="mt-4">
            <label className="text-sm text-gray-700">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>
            {paymentMethod === "Card" && (
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full border rounded p-2 mt-2"
              />
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Print & Submit
          </button>
        </div> */}

      </div>
    </div>
  );
};

export default BashundharaSalesPos;
