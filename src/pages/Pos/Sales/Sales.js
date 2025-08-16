import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const Sales = () => {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    id: "",
    name: "",
    mobile: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [vatRate, setVatRate] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [netPayable, setNetPayable] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [amountGiven, setAmountGiven] = useState(0);
  const [changeReturned, setChangeReturned] = useState(0);

  // Fetch all shops
  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/api/shops/show`)
      .then((res) => setShops(res.data.shops || res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedShop) {
      setProducts([]);
      return;
    }

    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/api/shops/${selectedShop}`)
      .then((res) => {

        console.log("Raw shop data:", res.data); // 👈 Check what comes from API
        const shopProducts = res.data.products.map((p) => ({
          productId: p.product?._id, // safe check
          title: p.product?.title || "Untitled Product",
          price: p.product?.price || 0,
         

          variants: p.variants.map((v) => ({
            variantId: v.variant?._id || v._id,
            size: v.variant?.size || v.size,
            color: v.variant?.color || v.color,
            assignedQuantity: v.assignedQuantity || v.quantity || 0,
          })),
        }));

        console.log("Normalized shop products:", shopProducts); // 👈 See final products for dropdown
        setProducts(shopProducts);
      })
      .catch((err) => console.error(err));
  }, [selectedShop]);

  const handleProductSelect = (productId) => {
    const product = products.find((p) => p.productId === productId);
    if (!product) return;

    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.productId === productId);
      if (existing) {
        existing.qty += 1;
        return [...prev];
      } else {
        return [
          ...prev,
          {
            ...product,
            qty: 1,
            selectedSize: "",
            selectedColor: "",
            variants: product.variants, // use already normalized variants
          },
        ];
      }
    });
  };

  // Handle size change
 
 const handleSizeChange = (productId, size) => {
  setSelectedProducts((prev) =>
    prev.map((p) => {
      if (p.productId === productId) {
        // Find all variants for this size
        const variantsForSize = p.variants.filter((v) => v.size === size);
        return {
          ...p,
          selectedSize: size,
          selectedColor: "", // reset color
          availableQty: variantsForSize.length ? variantsForSize[0].assignedQuantity : 0,
        };
      }
      return p;
    })
  );
};

  // Handle color change and update price & available qty
 
  // const handleColorChange = (productId, color) => {
  //   setSelectedProducts((prev) =>
  //     prev.map((p) => {
  //       if (p.productId === productId) {
  //         const variant = p.variants.find(
  //           (v) => v.size === p.selectedSize && v.color === color
  //         );
  //         return {
  //           ...p,
  //           selectedColor: color,
  //           price: p.price, // price stays from product
  //           availableQty: variant ? variant.assignedQuantity : 0,
  //         };
  //       }
  //       return p;
  //     })
  //   );
  // };
  const handleColorChange = (productId, color) => {
  setSelectedProducts((prev) =>
    prev.map((p) => {
      if (p.productId === productId) {
        const variant = p.variants.find(
          (v) => v.size === p.selectedSize && v.color === color
        );
        return {
          ...p,
          selectedColor: color,
          availableQty: variant ? variant.assignedQuantity : 0,
        };
      }
      return p;
    })
  );
};


  // Change quantity
  const handleQtyChange = (productId, value) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.productId === productId
          ? { ...p, qty: Math.min(parseInt(value) || 1, p.availableQty) }
          : p
      )
    );
  };

  // Remove product
  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.filter((p) => p.productId !== productId)
    );
  };

  // Calculate totals
  useEffect(() => {
    const total = selectedProducts.reduce((sum, p) => sum + p.price * p.qty, 0);
    const vat = (total * vatRate) / 100;
    const net = total + vat - discountAmount;
    setTotalPrice(total);
    setVatAmount(vat);
    setNetPayable(net);
    setChangeReturned(amountGiven - net);
  }, [selectedProducts, vatRate, discountAmount, amountGiven]);

  // Submit sale
  const handleSubmit = () => {
    if (!selectedShop) return alert("Please select a shop.");
    if (selectedProducts.length === 0) return alert("No products selected.");
    const saleData = {
      customerInfo,
      products: selectedProducts.map((p) => ({
        productId: p.productId,
        title: p.title,
        quantity: p.qty,
        price: p.price,
        size: p.selectedSize,
        color: p.selectedColor,
      })),
      totalPrice,
      discountAmount,
      vatAmount,
      netPayable,
      paymentMethod,
      cardNumber: paymentMethod === "Card" ? cardNumber : undefined,
    };
    axiosInstance
      .post(`${process.env.REACT_APP_API_URL}/api/sales/create`, saleData)
      .then(() => {
        alert("Sale submitted successfully!");
        setSelectedProducts([]);
        setCustomerInfo({ id: "", name: "", mobile: "" });
        setTotalPrice(0);
        setVatAmount(0);
        setNetPayable(0);
        setDiscountAmount(0);
        setVatRate(0);
        setPaymentMethod("");
        setCardNumber("");
        setAmountGiven(0);
        setChangeReturned(0);
      })
      .catch((err) => console.error(err));
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

      <div className="grid grid-cols-12 gap-2 my-2">
        {/* Left */}
        <div className="col-span-9 bg-white shadow-md p-4 rounded-md">
          <div className="grid grid-cols-6 gap-4">
            <div>
              <label>Select Shop</label>
              <select
                className="w-full border p-2"
                value={selectedShop}
                onChange={(e) => setSelectedShop(e.target.value)}
              >
                <option value="">Select a Shop</option>
                {shops.map((shop) => (
                  <option key={shop._id} value={shop._id}>
                    {shop.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Customer Name</label>
              <input
                type="text"
                className="w-full border p-2"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>Mobile</label>
              <input
                type="text"
                className="w-full border p-2"
                value={customerInfo.mobile}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, mobile: e.target.value })
                }
              />
            </div>
          </div>

          {/* Product Selector */}
          <div className="mt-4">
            <label>Add Product</label>

            <select
              className="w-full border p-2 rounded"
              onChange={(e) => handleProductSelect(e.target.value)}
            >
              <option value="">Select a Product</option>
              {products.map((p) => (
                <option key={p.productId} value={p.productId}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Product Table */}
          <div className="mt-4">
            <table className="w-full border text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th>SL</th>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Available</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((p, index) => (
                  <tr key={p.productId}>
                    <td>{index + 1}</td>
                    <td>{p.title}</td>
                    {/* <td>
                      <select
                        value={p.selectedSize}
                        onChange={(e) =>
                          handleSizeChange(p.productId, e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        {[...new Set(p.variants.map((v) => v.size))].map(
                          (size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          )
                        )}
                      </select>
                    </td> */}

                    <td>
  <select
    value={p.selectedSize}
    onChange={(e) => handleSizeChange(p.productId, e.target.value)}
  >
    <option value="">Select</option>
    {[...new Set(p.variants.map((v) => v.size))].map((size) => (
      <option key={size} value={size}>
        {size}
      </option>
    ))}
  </select>
</td>
<td></td>

                    
                    {/* <td>
                      <select
                        value={p.selectedColor}
                        onChange={(e) =>
                          handleColorChange(p.productId, e.target.value)
                        }
                        disabled={!p.selectedSize}
                      >
                        <option value="">Select</option>
                        {[
                          ...new Set(
                            p.variants
                              .filter((v) => v.size === p.selectedSize)
                              .map((v) => v.color)
                          ),
                        ].map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </td> */}
                    <td>
  <select
    value={p.selectedColor}
    onChange={(e) => handleColorChange(p.productId, e.target.value)}
    disabled={!p.selectedSize}
  >
    <option value="">Select</option>
    {[...new Set(p.variants.filter((v) => v.size === p.selectedSize).map((v) => v.color))].map(
      (color) => (
        <option key={color} value={color}>
          {color}
        </option>
      )
    )}
  </select>
</td>


                    <td>{p.price}</td>
                    <td>
                      <input
                        type="number"
                        value={p.qty}
                        onChange={(e) =>
                          handleQtyChange(p.productId, e.target.value)
                        }
                        min={1}
                        max={p.availableQty}
                      />
                    </td>
                    <td>{p.availableQty}</td>
                    <td>{(p.price * p.qty).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveProduct(p.productId)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
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

        {/* Right */}
        <div className="col-span-3 bg-white shadow-md p-4 rounded-md">
          <h2>Billing Summary</h2>
          <div>Total: ৳{totalPrice.toFixed(2)}</div>
          <div>
            Discount:{" "}
            <input
              type="number"
              value={discountAmount}
              onChange={(e) =>
                setDiscountAmount(parseFloat(e.target.value) || 0)
              }
            />
          </div>
          <div>
            VAT (%):{" "}
            <input
              type="number"
              value={vatRate}
              onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>VAT Amount: ৳{vatAmount.toFixed(2)}</div>
          <div>Net Payable: ৳{netPayable.toFixed(2)}</div>
          <div>
            Payment Method:
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>
          </div>
          {paymentMethod === "Card" && (
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          )}
          <div>
            Amount Given:
            <input
              type="number"
              value={amountGiven}
              onChange={(e) => setAmountGiven(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>Change Returned: ৳{changeReturned.toFixed(2)}</div>
          <button
            onClick={handleSubmit}
            className="bg-green-500 w-full text-white py-2 rounded mt-4"
          >
            Submit Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sales;
