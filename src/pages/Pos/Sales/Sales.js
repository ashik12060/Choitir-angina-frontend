// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axiosInstance from "../../axiosInstance";

// const Sales = () => {
//   const [shops, setShops] = useState([]);
//   const [selectedShop, setSelectedShop] = useState("");
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [customerInfo, setCustomerInfo] = useState({
//     id: "",
//     name: "",
//     mobile: "",
//   });
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [vatRate, setVatRate] = useState(0);
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [vatAmount, setVatAmount] = useState(0);
//   const [netPayable, setNetPayable] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [amountGiven, setAmountGiven] = useState(0);
//   const [changeReturned, setChangeReturned] = useState(0);

//   // Fetch all shops
//   useEffect(() => {
//     axiosInstance
//       .get(`${process.env.REACT_APP_API_URL}/api/shops/show`)
//       .then((res) => setShops(res.data.shops || res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   useEffect(() => {
//     if (!selectedShop) {
//       setProducts([]);
//       return;
//     }

//     axiosInstance
//       .get(`${process.env.REACT_APP_API_URL}/api/shops/${selectedShop}`)
//       .then((res) => {

//         console.log("Raw shop data:", res.data); // 👈 Check what comes from API
//         const shopProducts = res.data.products.map((p) => ({
//           productId: p.product?._id, // safe check
//           title: p.product?.title || "Untitled Product",
//           price: p.product?.price || 0,
         

//           variants: p.variants.map((v) => ({
//             variantId: v.variant?._id || v._id,
//             size: v.variant?.size || v.size,
//             color: v.variant?.color || v.color,
//             assignedQuantity: v.assignedQuantity || v.quantity || 0,
//           })),
//         }));

//         console.log("Normalized shop products:", shopProducts); // 👈 See final products for dropdown
//         setProducts(shopProducts);
//       })
//       .catch((err) => console.error(err));
//   }, [selectedShop]);

//   const handleProductSelect = (productId) => {
//     const product = products.find((p) => p.productId === productId);
//     if (!product) return;

//     setSelectedProducts((prev) => {
//       const existing = prev.find((p) => p.productId === productId);
//       if (existing) {
//         existing.qty += 1;
//         return [...prev];
//       } else {
//         return [
//           ...prev,
//           {
//             ...product,
//             qty: 1,
//             selectedSize: "",
//             selectedColor: "",
//             variants: product.variants, // use already normalized variants
//           },
//         ];
//       }
//     });
//   };

//   // Handle size change
 
//  const handleSizeChange = (productId, size) => {
//   setSelectedProducts((prev) =>
//     prev.map((p) => {
//       if (p.productId === productId) {
//         // Find all variants for this size
//         const variantsForSize = p.variants.filter((v) => v.size === size);
//         return {
//           ...p,
//           selectedSize: size,
//           selectedColor: "", // reset color
//           availableQty: variantsForSize.length ? variantsForSize[0].assignedQuantity : 0,
//         };
//       }
//       return p;
//     })
//   );
// };

//   // Handle color change and update price & available qty
 
//   // const handleColorChange = (productId, color) => {
//   //   setSelectedProducts((prev) =>
//   //     prev.map((p) => {
//   //       if (p.productId === productId) {
//   //         const variant = p.variants.find(
//   //           (v) => v.size === p.selectedSize && v.color === color
//   //         );
//   //         return {
//   //           ...p,
//   //           selectedColor: color,
//   //           price: p.price, // price stays from product
//   //           availableQty: variant ? variant.assignedQuantity : 0,
//   //         };
//   //       }
//   //       return p;
//   //     })
//   //   );
//   // };
//   const handleColorChange = (productId, color) => {
//   setSelectedProducts((prev) =>
//     prev.map((p) => {
//       if (p.productId === productId) {
//         const variant = p.variants.find(
//           (v) => v.size === p.selectedSize && v.color === color
//         );
//         return {
//           ...p,
//           selectedColor: color,
//           availableQty: variant ? variant.assignedQuantity : 0,
//         };
//       }
//       return p;
//     })
//   );
// };


//   // Change quantity
//   const handleQtyChange = (productId, value) => {
//     setSelectedProducts((prev) =>
//       prev.map((p) =>
//         p.productId === productId
//           ? { ...p, qty: Math.min(parseInt(value) || 1, p.availableQty) }
//           : p
//       )
//     );
//   };

//   // Remove product
//   const handleRemoveProduct = (productId) => {
//     setSelectedProducts((prev) =>
//       prev.filter((p) => p.productId !== productId)
//     );
//   };

//   // Calculate totals
//   useEffect(() => {
//     const total = selectedProducts.reduce((sum, p) => sum + p.price * p.qty, 0);
//     const vat = (total * vatRate) / 100;
//     const net = total + vat - discountAmount;
//     setTotalPrice(total);
//     setVatAmount(vat);
//     setNetPayable(net);
//     setChangeReturned(amountGiven - net);
//   }, [selectedProducts, vatRate, discountAmount, amountGiven]);

//   // Submit sale
//   const handleSubmit = () => {
//     if (!selectedShop) return alert("Please select a shop.");
//     if (selectedProducts.length === 0) return alert("No products selected.");
//     const saleData = {
//       customerInfo,
//       products: selectedProducts.map((p) => ({
//         productId: p.productId,
//         title: p.title,
//         quantity: p.qty,
//         price: p.price,
//         size: p.selectedSize,
//         color: p.selectedColor,
//       })),
//       totalPrice,
//       discountAmount,
//       vatAmount,
//       netPayable,
//       paymentMethod,
//       cardNumber: paymentMethod === "Card" ? cardNumber : undefined,
//     };
//     axiosInstance
//       .post(`${process.env.REACT_APP_API_URL}/api/sales/create`, saleData)
//       .then(() => {
//         alert("Sale submitted successfully!");
//         setSelectedProducts([]);
//         setCustomerInfo({ id: "", name: "", mobile: "" });
//         setTotalPrice(0);
//         setVatAmount(0);
//         setNetPayable(0);
//         setDiscountAmount(0);
//         setVatRate(0);
//         setPaymentMethod("");
//         setCardNumber("");
//         setAmountGiven(0);
//         setChangeReturned(0);
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       {/* Header */}
//       <div className="bg-white shadow-md p-4 rounded-md flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold">
//           Chaityr Angina
//         </Link>
//         <p className="font-bold">
//           <i>Green Software Technology</i>
//         </p>
//         <img
//           src="https://via.placeholder.com/150"
//           alt="Company Logo"
//           className="h-8"
//         />
//       </div>

//       <div className="grid grid-cols-12 gap-2 my-2">
//         {/* Left */}
//         <div className="col-span-9 bg-white shadow-md p-4 rounded-md">
//           <div className="grid grid-cols-6 gap-4">
//             <div>
//               <label>Select Shop</label>
//               <select
//                 className="w-full border p-2"
//                 value={selectedShop}
//                 onChange={(e) => setSelectedShop(e.target.value)}
//               >
//                 <option value="">Select a Shop</option>
//                 {shops.map((shop) => (
//                   <option key={shop._id} value={shop._id}>
//                     {shop.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label>Customer Name</label>
//               <input
//                 type="text"
//                 className="w-full border p-2"
//                 value={customerInfo.name}
//                 onChange={(e) =>
//                   setCustomerInfo({ ...customerInfo, name: e.target.value })
//                 }
//               />
//             </div>
//             <div>
//               <label>Mobile</label>
//               <input
//                 type="text"
//                 className="w-full border p-2"
//                 value={customerInfo.mobile}
//                 onChange={(e) =>
//                   setCustomerInfo({ ...customerInfo, mobile: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           {/* Product Selector */}
//           <div className="mt-4">
//             <label>Add Product</label>

//             <select
//               className="w-full border p-2 rounded"
//               onChange={(e) => handleProductSelect(e.target.value)}
//             >
//               <option value="">Select a Product</option>
//               {products.map((p) => (
//                 <option key={p.productId} value={p.productId}>
//                   {p.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Product Table */}
//           <div className="mt-4">
//             <table className="w-full border text-sm">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th>SL</th>
//                   <th>Product</th>
//                   <th>Size</th>
//                   <th>Color</th>
//                   <th>Price</th>
//                   <th>Qty</th>
//                   <th>Available</th>
//                   <th>Total</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedProducts.map((p, index) => (
//                   <tr key={p.productId}>
//                     <td>{index + 1}</td>
//                     <td>{p.title}</td>
//                     {/* <td>
//                       <select
//                         value={p.selectedSize}
//                         onChange={(e) =>
//                           handleSizeChange(p.productId, e.target.value)
//                         }
//                       >
//                         <option value="">Select</option>
//                         {[...new Set(p.variants.map((v) => v.size))].map(
//                           (size) => (
//                             <option key={size} value={size}>
//                               {size}
//                             </option>
//                           )
//                         )}
//                       </select>
//                     </td> */}

//                     <td>
//   <select
//     value={p.selectedSize}
//     onChange={(e) => handleSizeChange(p.productId, e.target.value)}
//   >
//     <option value="">Select</option>
//     {[...new Set(p.variants.map((v) => v.size))].map((size) => (
//       <option key={size} value={size}>
//         {size}
//       </option>
//     ))}
//   </select>
// </td>
// <td></td>

                    
//                     {/* <td>
//                       <select
//                         value={p.selectedColor}
//                         onChange={(e) =>
//                           handleColorChange(p.productId, e.target.value)
//                         }
//                         disabled={!p.selectedSize}
//                       >
//                         <option value="">Select</option>
//                         {[
//                           ...new Set(
//                             p.variants
//                               .filter((v) => v.size === p.selectedSize)
//                               .map((v) => v.color)
//                           ),
//                         ].map((color) => (
//                           <option key={color} value={color}>
//                             {color}
//                           </option>
//                         ))}
//                       </select>
//                     </td> */}
//                     <td>
//   <select
//     value={p.selectedColor}
//     onChange={(e) => handleColorChange(p.productId, e.target.value)}
//     disabled={!p.selectedSize}
//   >
//     <option value="">Select</option>
//     {[...new Set(p.variants.filter((v) => v.size === p.selectedSize).map((v) => v.color))].map(
//       (color) => (
//         <option key={color} value={color}>
//           {color}
//         </option>
//       )
//     )}
//   </select>
// </td>


//                     <td>{p.price}</td>
//                     <td>
//                       <input
//                         type="number"
//                         value={p.qty}
//                         onChange={(e) =>
//                           handleQtyChange(p.productId, e.target.value)
//                         }
//                         min={1}
//                         max={p.availableQty}
//                       />
//                     </td>
//                     <td>{p.availableQty}</td>
//                     <td>{(p.price * p.qty).toFixed(2)}</td>
//                     <td>
//                       <button
//                         onClick={() => handleRemoveProduct(p.productId)}
//                         className="bg-red-500 text-white px-2 py-1 rounded"
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Right */}
//         <div className="col-span-3 bg-white shadow-md p-4 rounded-md">
//           <h2>Billing Summary</h2>
//           <div>Total: ৳{totalPrice.toFixed(2)}</div>
//           <div>
//             Discount:{" "}
//             <input
//               type="number"
//               value={discountAmount}
//               onChange={(e) =>
//                 setDiscountAmount(parseFloat(e.target.value) || 0)
//               }
//             />
//           </div>
//           <div>
//             VAT (%):{" "}
//             <input
//               type="number"
//               value={vatRate}
//               onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
//             />
//           </div>
//           <div>VAT Amount: ৳{vatAmount.toFixed(2)}</div>
//           <div>Net Payable: ৳{netPayable.toFixed(2)}</div>
//           <div>
//             Payment Method:
//             <select
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             >
//               <option value="">Select</option>
//               <option value="Cash">Cash</option>
//               <option value="Card">Card</option>
//             </select>
//           </div>
//           {paymentMethod === "Card" && (
//             <input
//               type="text"
//               placeholder="Card Number"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//             />
//           )}
//           <div>
//             Amount Given:
//             <input
//               type="number"
//               value={amountGiven}
//               onChange={(e) => setAmountGiven(parseFloat(e.target.value) || 0)}
//             />
//           </div>
//           <div>Change Returned: ৳{changeReturned.toFixed(2)}</div>
//           <button
//             onClick={handleSubmit}
//             className="bg-green-500 w-full text-white py-2 rounded mt-4"
//           >
//             Submit Sale
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sales;



import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { Link } from "react-router-dom";
import logo from '../../../assets/chaityr-angina-logo.png'

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // Array to store selected products
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
  // const [discountAmount, setDiscountAmount] = useState(0.0); 
  const [discountAmount, setDiscountAmount] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState(""); // New state for payment method
  const [amountGiven, setAmountGiven] = useState(0.0); // Amount customer gave
  const [changeReturned, setChangeReturned] = useState(0.0); // Change to return
  // const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  // Fetch products from the API
  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/api/products/show`)
      .then((response) => {
        setProducts(response.data.products);
      });
  }, []);

  // Handle product selection
  const handleProductSelect = (productId) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;

    setSelectedProducts((prevSelected) => {
      const updatedProducts = [...prevSelected];
      const existingProduct = updatedProducts.find((p) => p._id === productId);
      if (existingProduct) {
        existingProduct.qty = existingProduct.qty + 1; // Add 1 to qty
      } else {
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
  // const handleQtyChange = (productId, newQty) => {
  //   setSelectedProducts((prevSelected) =>
  //     prevSelected.map((product) =>
  //       product._id === productId ? { ...product, qty: newQty } : product
  //     )
  //   );
  // };
  const handleQtyChange = (productId, newQty) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((product) =>
        product._id === productId ? { ...product, qty: newQty } : product
      )
    );
  };

  // Handle VAT and Discount calculations
  // const calculateNetPayable = () => {
  //   let subtotal = 0;
  //   let vat = 0;
  //   let discount = 0;

  //   selectedProducts.forEach((product) => {
  //     const productTotal = parseFloat(product.price) * product.qty;
  //     subtotal += productTotal;
  //     vat += (productTotal * vatRate) / 100;
  //     discount += (productTotal * discountRate) / 100;
  //   });

  //   const finalAmount = subtotal - discount + vat;
  //   setTotalPrice(subtotal);
  //   setVatAmount(vat);
  //   setDiscountAmount(discount);
  //   setNetPayable(finalAmount);
  // };
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

  // Update net payable whenever total price, VAT or discount changes
  useEffect(() => {
    calculateNetPayable();
  }, [selectedProducts, vatRate, discountAmount]);

  const handleSubmit = () => {
    const saleData = {
      products: selectedProducts.map((product) => ({
        productId: product._id,
        title: product.title,
        quantity: product.qty, // Change `qty` to `quantity`
        price: product.price,
        size: product.selectedSize, // Add size
        color: product.selectedColor, // Add color
      })),
      customerInfo:
        customerInfo.id || customerInfo.name || customerInfo.mobile
          ? customerInfo
          : undefined,
      totalPrice, // Change `totalPrice` to `totalAmount`
      vatAmount,
      discountAmount,
      netPayable,
      paymentMethod,
      ...(paymentMethod === "Card" && { cardNumber }),
    };

    axiosInstance
      .post(`${process.env.REACT_APP_API_URL}/api/sales/create`, saleData)
      .then((response) => {
        alert("Sale submitted successfully!");
        // Reset fields after submission
        setSelectedProducts([]);
        setQty(1);
        setCustomerInfo({ id: "", name: "", mobile: "" });
        setTotalPrice(0.0);
        setNetPayable(0.0);
        setVatAmount(0.0);
        setDiscountAmount(0);
        setVatRate(0);
        setDiscountRate(0);
      });
  };

  // Remove product from selected products
  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.filter((product) => product._id !== productId)
    );
  };

  // handler for dropdown menu for size and colors
  const updateAvailableQty = (product, selectedSize, selectedColor) => {
    const matchedVariant = product.variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor
    );
    return matchedVariant ? matchedVariant.quantity : 0;
  };

  // barcode number based
  const handleBarcodeInput = (e) => {
    if (e.key === "Enter") {
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
        alert("❌ Product with this barcode was not found.");
        e.target.value = "";
        return;
      }

      setSelectedProducts((prevSelected) => {
        const updatedProducts = [...prevSelected];
        const existingProduct = updatedProducts.find(
          (p) =>
            p._id === foundProduct._id &&
            p.selectedSize === matchedVariant.size &&
            p.selectedColor === matchedVariant.color
        );

        if (existingProduct) {
          existingProduct.qty = existingProduct.qty + 1;
        } else {
          updatedProducts.push({
            ...foundProduct,
            qty: 1,
            selectedSize: matchedVariant.size,
            selectedColor: matchedVariant.color,
            availableQty: matchedVariant.quantity,
          });
        }

        return updatedProducts;
      });

      e.target.value = "";
    }
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
          return {
            ...product,
            selectedSize,
            availableQty: newAvailableQty,
          };
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
          return {
            ...product,
            selectedColor,
            availableQty: newAvailableQty,
          };
        }
        return product;
      })
    );
  };

  return (
    // <div className="min-h-screen bg-gray-100 p-4">
    //   {/* Header */}
    //   <div className="bg-white shadow-md p-4 rounded-md flex justify-between items-center">
    //     <Link to="/" className="text-xl font-bold">
    //       Chaityr Angina
    //     </Link>
    //     <p className="font-bold">
    //      <img
    //       src={logo}
    //       alt="Company Logo"
    //       className="h-10"
    //     />
    //     </p>
    //     <p></p>
    //   </div>

    //   {/* Main Layout */}
    //   <div className="grid grid-cols-12 gap-2 my-2">
    //     {/* Left Section */}
    //     <div className="col-span-9 bg-white shadow-md p-4 rounded-md">
    //       {/* Input Fields */}
    //       <div className="grid grid-cols-6 gap-4">
          
    //         <div>
    //           <label className="text-sm text-gray-700">
    //             Scan or Enter Barcode
    //           </label>
    //           <input
    //             type="text"
    //             className="w-full border border-gray-300 rounded-md p-2"
    //             placeholder="Enter or scan barcode and press Enter"
    //             onKeyDown={handleBarcodeInput}
    //           />
    //         </div>

    //         {/* Customer Details */}
    //         <div>
    //           <label className="text-sm text-gray-700">
    //             Customer ID(Optional)
    //           </label>
    //           <input
    //             type="text"
    //             className="w-full border border-gray-300 rounded-md p-2"
    //             value={customerInfo.id}
    //             onChange={(e) =>
    //               setCustomerInfo({ ...customerInfo, id: e.target.value })
    //             }
    //           />
    //         </div>
    //         <div>
    //           <label className="text-sm text-gray-700">
    //             Customer Name(Optional)
    //           </label>
    //           <input
    //             type="text"
    //             className="w-full border border-gray-300 rounded-md p-2"
    //             value={customerInfo.name}
    //             onChange={(e) =>
    //               setCustomerInfo({ ...customerInfo, name: e.target.value })
    //             }
    //           />
    //         </div>
    //         <div>
    //           <label className="text-sm text-gray-700">Mobile(Optional)</label>
    //           <input
    //             type="text"
    //             className="w-full border border-gray-300 rounded-md p-2"
    //             value={customerInfo.mobile}
    //             onChange={(e) =>
    //               setCustomerInfo({ ...customerInfo, mobile: e.target.value })
    //             }
    //           />
    //         </div>

    //         <div>
    //           <label className="text-sm text-gray-700">VAT Rate (%)</label>
    //           <input
    //             type="number"
    //             className="w-full border border-gray-300 rounded-md p-2"
    //             value={vatRate}
    //             onChange={(e) => setVatRate(e.target.value)}
    //           />
    //         </div>

           
    //         <div>
    //           <label className="text-sm text-gray-700">Discount (৳)</label>
    //           <input
    //             type="number"
    //             className="w-full border border-gray-300 rounded-md p-2"
    //             value={discountAmount}
    //             onChange={(e) =>
    //               setDiscountAmount(parseFloat(e.target.value) || 0)
    //             }
    //           />
    //         </div>
    //       </div>

    //       <div className="mt-4">
    //         <table className="w-full border border-gray-300 text-sm">
    //           <thead className="bg-gray-200">
    //             <tr>
    //               <th className="border border-gray-300 p-2">SL</th>
    //               <th className="border border-gray-300 p-2">Product</th>
    //               <th className="border border-gray-300 p-2">Price</th>
    //               <th className="border border-gray-300 p-2">Available</th>{" "}
    //               {/* New column */}
    //               <th className="border border-gray-300 p-2">Qty</th>
    //               <th className="border border-gray-300 p-2">Total</th>
    //               <th className="border border-gray-300 p-2">Action</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {selectedProducts.map((product, index) => {
    //               const invalidQty =
    //                 product.qty <= 0 || product.qty > product.availableQty;

    //               return (
    //                 <tr key={product._id}>
    //                   <td className="border border-gray-300 p-2">
    //                     {index + 1}
    //                   </td>
    //                   <td className="border border-gray-300 p-2">
    //                     {product.title}
    //                   </td>
    //                   <td className="border border-gray-300 p-2">
    //                     ${parseFloat(product.price).toFixed(2) || "0.00"}
    //                   </td>

    //                   <td className="border border-gray-300 p-2">
    //                     <div>
    //                       <strong>Total:</strong>{" "}
    //                       {product.variants?.reduce(
    //                         (sum, v) => sum + v.quantity,
    //                         0
    //                       )}
    //                     </div>

    //                     <div className="mt-1">
    //                       <label className="text-xs mr-1">Size:</label>
    //                       <select
    //                         className="text-xs border p-1"
    //                         value={product.selectedSize || ""}
    //                         onChange={(e) =>
    //                           handleSizeChange(product._id, e.target.value)
    //                         }
    //                       >
    //                         <option value="">Select Size</option>
    //                         {[
    //                           ...new Set(product.variants?.map((v) => v.size)),
    //                         ].map((size) => (
    //                           <option key={size} value={size}>
    //                             {size}
    //                           </option>
    //                         ))}
    //                       </select>
    //                     </div>

    //                     <div className="mt-1">
    //                       <label className="text-xs mr-1">Color:</label>
    //                       <select
    //                         className="text-xs border p-1"
    //                         value={product.selectedColor || ""}
    //                         onChange={(e) =>
    //                           handleColorChange(product._id, e.target.value)
    //                         }
    //                       >
    //                         <option value="">Select Color</option>
    //                         {[
    //                           ...new Set(product.variants?.map((v) => v.color)),
    //                         ].map((color) => (
    //                           <option key={color} value={color}>
    //                             {color}
    //                           </option>
    //                         ))}
    //                       </select>
    //                     </div>
    //                   </td>

    //                   <input
    //                     type="number"
    //                     min={1}
    //                     max={product.availableQty || 1}
    //                     value={product.qty}
    //                     className={`w-full px-1 py-0.5 border rounded ${
    //                       invalidQty ? "border-red-500" : "border-gray-300"
    //                     }`}
    //                     onChange={(e) => {
    //                       // Let user type freely
    //                       handleQtyChange(product._id, e.target.value);
    //                     }}
    //                     onBlur={(e) => {
    //                       const value = parseInt(e.target.value, 10);

    //                       if (isNaN(value) || value < 1) {
    //                         alert("Quantity must be at least 1.");
    //                         handleQtyChange(product._id, 1);
    //                       } else if (value > product.availableQty) {
    //                         alert(
    //                           `Only ${product.availableQty} item(s) available for Size "${product.selectedSize}" and Color "${product.selectedColor}".`
    //                         );
    //                         handleQtyChange(product._id, product.availableQty);
    //                       } else {
    //                         // Set the valid parsed number back
    //                         handleQtyChange(product._id, value);
    //                       }
    //                     }}
    //                     disabled={
    //                       !product.selectedSize || !product.selectedColor
    //                     }
    //                   />

    //                   <td className="border border-gray-300 p-2">
    //                     $
    //                     {parseFloat(product.price * product.qty).toFixed(2) ||
    //                       "0.00"}
    //                   </td>
    //                   <td className="border border-gray-300 p-2">
    //                     <button
    //                       onClick={() => handleRemoveProduct(product._id)}
    //                       className="bg-red-500 text-white px-2 py-1"
    //                     >
    //                       Remove
    //                     </button>
    //                   </td>
    //                 </tr>
    //               );
    //             })}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>

    //     {/* Right Section */}
    //     <div className="col-span-3 bg-white shadow-md p-4 rounded-md">
    //       <div className="col-span-3 bg-white  p-4 rounded-md">
    //         <h1 className="bg-green-600 text-white text-left text-lg font-bold p-4">
    //           Payable Amount: {`৳ ${netPayable.toFixed(2)}`}
    //         </h1>
    //         <h2 className="text-xl font-bold">৳ Net Payable</h2>
    //         <div className="mt-4">
    //           {/* Total Price input */}
    //           <div className="flex items-center">
    //             <label className="text-sm py-2 w-1/5 text-gray-700">
    //               Total Price
    //             </label>
    //             <input
    //               type="text"
    //               value={`৳ ${totalPrice.toFixed(2)}`}
    //               readOnly
    //               className="w-2/3 border border-gray-300 rounded-md p-2"
    //             />
    //           </div>

    //           {/* Discount input */}
    //           <div className="mt-2 flex items-center">
    //             <label className="text-sm py-2 w-1/5 text-gray-700">
    //               Discount
    //             </label>
    //             <input
    //               type="text"
    //               value={`-৳ ${discountAmount.toFixed(2)}`}
    //               readOnly
    //               className="w-2/3 border border-gray-300 rounded-md p-2"
    //             />
    //           </div>

    //           {/* VAT input */}
    //           <div className="mt-2 flex items-center">
    //             <label className="text-sm py-2 w-1/5 text-gray-700">VAT</label>
    //             <input
    //               type="text"
    //               value={`+৳ ${vatAmount.toFixed(2)}`}
    //               readOnly
    //               className="w-2/3 border border-gray-300 rounded-md p-2"
    //             />
    //           </div>

    //           {/* Net Payable input */}
    //           <div className="mt-2 flex items-center">
    //             <label className="text-sm py-2 w-1/5 text-gray-700 font-bold">
    //               Net Payable
    //             </label>
    //             <input
    //               type="text"
    //               value={`৳ ${netPayable.toFixed(2)}`}
    //               readOnly
    //               className="w-2/3 border border-gray-300 font-bold rounded-md p-2"
    //             />
    //           </div>

    //           {/* Amount Given input */}
    //           <div className="mt-2 flex items-center">
    //             <label className="text-sm py-2 w-1/5 text-gray-700">
    //               Amount Given
    //             </label>
    //             <input
    //               type="number"
    //               value={amountGiven}
    //               onChange={(e) =>
    //                 setAmountGiven(parseFloat(e.target.value) || 0.0)
    //               }
    //               className="w-2/3 border border-gray-300 rounded-md p-2"
    //             />
    //           </div>

    //           {/* Change to Return input */}
    //           <div className="mt-2 flex items-center">
    //             <label className="text-sm py-2 w-1/5 text-gray-700 font-bold">
    //               Change to Return
    //             </label>
    //             <input
    //               type="text"
    //               value={`৳ ${changeReturned.toFixed(2)}`}
    //               readOnly
    //               className="w-2/3 border border-gray-300 rounded-md p-2"
    //             />
    //           </div>
    //         </div>

    //         {/* Payment Method Dropdown */}
    //         <div className="mt-4">
    //           <label className="text-sm text-gray-700">Payment Method</label>
    //           <select
    //             className="w-full border border-gray-300 rounded-md p-2"
    //             value={paymentMethod}
    //             onChange={(e) => setPaymentMethod(e.target.value)}
    //           >
    //             <option value="">Select Payment Method</option>
    //             <option value="Cash">Cash</option>
    //             <option value="Card">Card</option>
    //           </select>
    //           {paymentMethod === "Card" && (
    //             <div className="mt-4">
    //               <label className="text-sm text-gray-700">Card Number</label>
    //               <input
    //                 type="text"
    //                 className="w-full border border-gray-300 rounded-md p-2"
    //                 placeholder="Enter Card Number"
    //                 value={cardNumber}
    //                 onChange={(e) => setCardNumber(e.target.value)}
    //               />
    //             </div>
    //           )}
    //         </div>

    //         {/* Submit Button */}
    //         <button
    //           onClick={handleSubmit}
    //           className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md"
    //         >
    //           Print & Submit
    //         </button>
    //       </div>
    //     </div>
    //     {/* </div> */}
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-100 p-4">
  {/* Header */}
  <div className="bg-white shadow-md p-4 rounded-md flex flex-col sm:flex-row justify-between items-center gap-2">
    <Link to="/" className="text-2xl font-bold text-green-700">
      Chaityr Angina
    </Link>
    <img src={logo} alt="Company Logo" className="h-12 sm:h-10" />
    <p></p>
  </div>

  {/* Main Layout */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-4">
    {/* Left Section */}
    <div className="lg:col-span-9 bg-white shadow-md p-4 rounded-md">
      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div>
          <label className="text-sm text-gray-700 font-medium">Scan or Enter Barcode</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
            placeholder="Enter or scan barcode"
            onKeyDown={handleBarcodeInput}
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 font-medium">Customer ID (Optional)</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
            value={customerInfo.id}
            onChange={(e) => setCustomerInfo({ ...customerInfo, id: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 font-medium">Customer Name (Optional)</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 font-medium">Mobile (Optional)</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
            value={customerInfo.mobile}
            onChange={(e) => setCustomerInfo({ ...customerInfo, mobile: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 font-medium">VAT Rate (%)</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
            value={vatRate}
            onChange={(e) => setVatRate(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 font-medium">Discount (৳)</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm min-w-[700px]">
          <thead className="bg-green-100">
            <tr>
              <th className="border border-gray-300 p-2">SL</th>
              <th className="border border-gray-300 p-2">Product</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Available</th>
              <th className="border border-gray-300 p-2">Qty</th>
              <th className="border border-gray-300 p-2">Total</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product, index) => {
              const invalidQty = product.qty <= 0 || product.qty > product.availableQty;
              return (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2 font-medium">{product.title}</td>
                  <td className="border border-gray-300 p-2">৳{parseFloat(product.price).toFixed(2)}</td>

                  {/* Available + Variants */}
                  <td className="border border-gray-300 p-2 space-y-1">
                    <div><strong>Total:</strong>{" "}
                      {product.variants?.reduce((sum, v) => sum + v.quantity, 0)}
                    </div>

                    <div>
                      <label className="text-xs mr-1">Size:</label>
                      <select
                        className="text-xs border rounded p-1"
                        value={product.selectedSize || ""}
                        onChange={(e) => handleSizeChange(product._id, e.target.value)}
                      >
                        <option value="">Select Size</option>
                        {[...new Set(product.variants?.map((v) => v.size))].map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs mr-1">Color:</label>
                      <select
                        className="text-xs border rounded p-1"
                        value={product.selectedColor || ""}
                        onChange={(e) => handleColorChange(product._id, e.target.value)}
                      >
                        <option value="">Select Color</option>
                        {[...new Set(product.variants?.map((v) => v.color))].map((color) => (
                          <option key={color} value={color}>{color}</option>
                        ))}
                      </select>
                    </div>
                  </td>

                  {/* Quantity */}
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      min={1}
                      max={product.availableQty || 1}
                      value={product.qty}
                      className={`w-20 px-2 py-1 border rounded ${
                        invalidQty ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-green-500`}
                      onChange={(e) => handleQtyChange(product._id, e.target.value)}
                      onBlur={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (isNaN(value) || value < 1) {
                          alert("Quantity must be at least 1.");
                          handleQtyChange(product._id, 1);
                        } else if (value > product.availableQty) {
                          alert(`Only ${product.availableQty} item(s) available.`);
                          handleQtyChange(product._id, product.availableQty);
                        } else {
                          handleQtyChange(product._id, value);
                        }
                      }}
                      disabled={!product.selectedSize || !product.selectedColor}
                    />
                  </td>

                  <td className="border border-gray-300 p-2 font-semibold">
                    ৳{parseFloat(product.price * product.qty).toFixed(2)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleRemoveProduct(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

    {/* Right Section */}
    <div className="lg:col-span-3 bg-white shadow-md p-4 rounded-md">
      <h1 className="bg-green-600 text-white text-left text-lg font-bold p-3 rounded-md">
        Payable Amount: ৳ {netPayable.toFixed(2)}
      </h1>

      <div className="space-y-3 mt-4">
        {/* Total Price */}
        <div className="flex justify-between">
          <span className="text-gray-700">Total Price</span>
          <span className="font-medium">৳ {totalPrice.toFixed(2)}</span>
        </div>

        {/* Discount */}
        <div className="flex justify-between text-red-600">
          <span>Discount</span>
          <span>-৳ {discountAmount.toFixed(2)}</span>
        </div>

        {/* VAT */}
        <div className="flex justify-between text-blue-600">
          <span>VAT</span>
          <span>+৳ {vatAmount.toFixed(2)}</span>
        </div>

        {/* Net Payable */}
        <div className="flex justify-between font-bold text-lg text-green-700">
          <span>Net Payable</span>
          <span>৳ {netPayable.toFixed(2)}</span>
        </div>

        {/* Amount Given */}
        <div>
          <label className="text-sm text-gray-700">Amount Given</label>
          <input
            type="number"
            value={amountGiven}
            onChange={(e) => setAmountGiven(parseFloat(e.target.value) || 0.0)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Change */}
        <div className="flex justify-between font-bold text-gray-800">
          <span>Change to Return</span>
          <span>৳ {changeReturned.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-6">
        <label className="text-sm text-gray-700">Payment Method</label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select>
        {paymentMethod === "Card" && (
          <div className="mt-3">
            <label className="text-sm text-gray-700">Card Number</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
              placeholder="Enter Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold shadow-md transition"
      >
        Print & Submit
      </button>
    </div>
  </div>
</div>

  );
};

export default Sales;
