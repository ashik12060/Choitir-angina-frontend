// // everything is working fine in this code
// import React, { useState, useEffect } from "react";
// import axiosInstance from "../pages/axiosInstance";

// const ShopProductAssigner = () => {
//   const [shops, setShops] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedShop, setSelectedShop] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [variants, setVariants] = useState([]);
//   const [variantAssignments, setVariantAssignments] = useState([]);
//   const [successMessage, setSuccessMessage] = useState("");

//  useEffect(() => {
//   const fetchShopsAndProducts = async (pageNumber = 1) => {
//     try {
//       const shopRes = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/shops/show`
//       );
//       const productRes = await axiosInstance.get(
//         // `${process.env.REACT_APP_API_URL}/api/products/show`
//         `${process.env.REACT_APP_API_URL}/api/products/show?page=${pageNumber}&limit=300`
//       );

//       console.log("Raw Shop Response:", shopRes.data);

//       // If your backend returns shops inside shopRes.data.shops
//       const shopList = Array.isArray(shopRes.data.shops)
//         ? shopRes.data.shops
//         : shopRes.data;

//       setShops(shopList);
//       setProducts(
//         Array.isArray(productRes.data.products) ? productRes.data.products : []
//       );

//       // 👇 This will print the shop list after setting it
//       console.log("Final Shops List:", shopList);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   fetchShopsAndProducts();
// }, []);


//   const handleProductSelect = (productId) => {
//     setSelectedProduct(productId);
//     const selectedProductData = products.find((product) => product._id === productId);
//     setVariants(selectedProductData ? selectedProductData.variants : []);
//     setVariantAssignments([]);
//   };

//   const handleVariantChange = (variantId, quantity) => {
//     setVariantAssignments((prevAssignments) => {
//       const existingIndex = prevAssignments.findIndex((v) => v.variantId === variantId);
//       if (existingIndex !== -1) {
//         const updatedAssignments = [...prevAssignments];
//         updatedAssignments[existingIndex].quantity = quantity;
//         return updatedAssignments;
//       } else {
//         return [...prevAssignments, { variantId, quantity }];
//       }
//     });
//   };

//   const assignProduct = async () => {
//     if (!selectedShop || !selectedProduct || variantAssignments.length === 0) {
//       return alert("Please select a shop, product, and assign at least one variant.");
//     }

//     try {
//       await axiosInstance.post(
//         `${process.env.REACT_APP_API_URL}/api/shops/${selectedShop}/assign-product`,
//         { productId: selectedProduct, variantAssignments }
//       );
//       setSuccessMessage("Product assigned successfully!");
//       setVariantAssignments([]);
//     } catch (error) {
//       console.error("Failed to assign product:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

//       <h2 className="text-xl font-bold mb-4">Assign Product to Shop</h2>

//       <div className="flex flex-col gap-4">
//         {/* Shop Selection */}
//         <select
//           value={selectedShop}
//           onChange={(e) => setSelectedShop(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">Select Shop</option>
//           {shops.map((shop) => (
//             <option key={shop._id} value={shop._id}>
//               {shop.name}
//             </option>
//           ))}
//         </select>

//         {/* Product Selection */}
//         <select
//           value={selectedProduct}
//           onChange={(e) => handleProductSelect(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">Select Product</option>
//           {products.map((product) => (
//             <option key={product._id} value={product._id}>
//               {product.title || "Unnamed Product"}
//             </option>
//           ))}
//         </select>

//         {/* Variants Selection with Quantity */}
//         {variants.length > 0 && (
//           <div className="border p-4 rounded bg-white">
//             <h3 className="font-semibold mb-2">Select Variants & Assign Quantity</h3>
//             {variants.map((variant) => (
//               <div key={variant._id} className="flex items-center gap-4 mb-2">
//                 <label className="w-2/3">
//                   {`${variant.size} - ${variant.color} (Stock: ${variant.quantity})`}
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   max={variant.quantity}
//                   placeholder="Quantity"
//                   onChange={(e) => handleVariantChange(variant._id, Number(e.target.value))}
//                   className="border p-2 rounded w-1/3"
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Assign Product Button */}
//         <button
//           onClick={assignProduct}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Assign Product
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShopProductAssigner;





import React, { useState, useEffect } from "react";
import axiosInstance from "../pages/axiosInstance";
import Select from "react-select";

const ShopProductAssigner = () => {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [variantAssignments, setVariantAssignments] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchShopsAndProducts = async () => {
      try {
        const shopRes = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/shops/show`
        );
        const productRes = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/products/show`
        );
  console.log("Raw Shop Response:", shopRes.data);
        console.log("Raw Product Response:", productRes.data);
        
        const shopList = Array.isArray(shopRes.data.shops)
          ? shopRes.data.shops
          : shopRes.data;

        setShops(shopList);
        setProducts(
          Array.isArray(productRes.data.products) ? productRes.data.products : []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchShopsAndProducts();
  }, []);

  const handleProductSelect = (selectedOption) => {
    setSelectedProduct(selectedOption);

    const selectedProductData = products.find(
      (p) => p._id === selectedOption.value
    );

    setVariants(selectedProductData?.variants || []);
    setVariantAssignments([]);
  };

  const handleVariantChange = (variantId, quantity) => {
    setVariantAssignments((prevAssignments) => {
      const existingIndex = prevAssignments.findIndex((v) => v.variantId === variantId);
      if (existingIndex !== -1) {
        const updatedAssignments = [...prevAssignments];
        updatedAssignments[existingIndex].quantity = quantity;
        return updatedAssignments;
      } else {
        return [...prevAssignments, { variantId, quantity }];
      }
    });
  };

  const assignProduct = async () => {
    if (!selectedShop || !selectedProduct || variantAssignments.length === 0) {
      return alert("Please select a shop, product, and assign at least one variant.");
    }

    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/shops/${selectedShop}/assign-product`,
        { productId: selectedProduct.value, variantAssignments }
      );
      setSuccessMessage("Product assigned successfully!");
      setVariantAssignments([]);
      setSelectedProduct(null);
      setVariants([]);
    } catch (error) {
      console.error("Failed to assign product:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

      <h2 className="text-xl font-bold mb-4">Assign Product to Shop</h2>

      <div className="flex flex-col gap-4">
        {/* Shop Selection */}
        <select
          value={selectedShop}
          onChange={(e) => setSelectedShop(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Shop</option>
          {shops.map((shop) => (
            <option key={shop._id} value={shop._id}>
              {shop.name}
            </option>
          ))}
        </select>

        {/* Searchable Product Selection */}
        <Select
          options={products.map((p) => ({
            value: p._id,
            label: p.title || "Unnamed Product",
          }))}
          value={selectedProduct}
          onChange={handleProductSelect}
          placeholder="Select Product..."
          isSearchable
        />

        {/* Variants */}
        {variants.length > 0 && (
          <div className="border p-4 rounded bg-white">
            <h3 className="font-semibold mb-2">Select Variants & Assign Quantity</h3>
            {variants.map((variant) => (
              <div key={variant._id} className="flex items-center gap-4 mb-2">
                <label className="w-2/3">
                  {`${variant.size || "N/A"} - ${variant.color || "N/A"} (Stock: ${variant.quantity ?? 0})`}
                </label>
                <input
                  type="number"
                  min="0"
                  max={variant.quantity ?? 0}
                  placeholder="Quantity"
                  onChange={(e) => handleVariantChange(variant._id, Number(e.target.value))}
                  className="border p-2 rounded w-1/3"
                />
              </div>
            ))}
          </div>
        )}

        {/* Assign Button */}
        <button
          onClick={assignProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Assign Product
        </button>
      </div>
    </div>
  );
};

export default ShopProductAssigner;



// working the search 
// import React, { useState, useEffect } from "react";
// import axiosInstance from "../pages/axiosInstance";
// import Select from "react-select";

// const ShopProductAssigner = () => {
//   const [shops, setShops] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedShop, setSelectedShop] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [variants, setVariants] = useState([]);
//   const [variantAssignments, setVariantAssignments] = useState([]);
//   const [successMessage, setSuccessMessage] = useState("");

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // Fetch shops
//   const fetchShops = async () => {
//     try {
//       const shopRes = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/shops/show`
//       );
//       const shopList = Array.isArray(shopRes.data.shops)
//         ? shopRes.data.shops
//         : shopRes.data;
//       setShops(shopList);
//     } catch (error) {
//       console.error("Error fetching shops:", error);
//     }
//   };

//   // Fetch products
//   const fetchProducts = async (pageNumber = 1) => {
//     try {
//       const res = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/products/pages?page=${pageNumber}&limit=300`
//       );
//       setProducts(res.data.products || []);
//       setPage(res.data.pagination.currentPage);
//       setTotalPages(res.data.pagination.totalPages);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchShops();
//     fetchProducts(1);
//   }, []);

//   const handleProductSelect = (selectedOption) => {
//     setSelectedProduct(selectedOption);
//     const selectedProductData = products.find(
//       (p) => p._id === selectedOption.value
//     );
//     setVariants(selectedProductData ? selectedProductData.variants : []);
//     setVariantAssignments([]);
//   };

//   const handleVariantChange = (variantId, quantity) => {
//     setVariantAssignments((prevAssignments) => {
//       const existingIndex = prevAssignments.findIndex(
//         (v) => v.variantId === variantId
//       );
//       if (existingIndex !== -1) {
//         const updatedAssignments = [...prevAssignments];
//         updatedAssignments[existingIndex].quantity = quantity;
//         return updatedAssignments;
//       } else {
//         return [...prevAssignments, { variantId, quantity }];
//       }
//     });
//   };

//   const assignProduct = async () => {
//     if (!selectedShop || !selectedProduct || variantAssignments.length === 0) {
//       return alert(
//         "Please select a shop, product, and assign at least one variant."
//       );
//     }

//     try {
//       await axiosInstance.post(
//         `${process.env.REACT_APP_API_URL}/api/shops/${selectedShop}/assign-product`,
//         { productId: selectedProduct.value, variantAssignments }
//       );
//       setSuccessMessage("Product assigned successfully!");
//       setVariantAssignments([]);
//     } catch (error) {
//       console.error("Failed to assign product:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       {successMessage && (
//         <div className="text-green-500 mb-4">{successMessage}</div>
//       )}

//       <h2 className="text-xl font-bold mb-4">Assign Product to Shop</h2>

//       <div className="flex flex-col gap-4">
//         {/* Shop Selection */}
//         <select
//           value={selectedShop}
//           onChange={(e) => setSelectedShop(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">Select Shop</option>
//           {shops.map((shop) => (
//             <option key={shop._id} value={shop._id}>
//               {shop.name}
//             </option>
//           ))}
//         </select>

//         {/* Product Selection with Search */}
//         <Select
//           options={products.map((p) => ({
//             value: p._id,
//             label: p.title || "Unnamed Product",
//           }))}
//           value={selectedProduct}
//           onChange={handleProductSelect}
//           placeholder="Select Product..."
//           isSearchable
//         />

//         {/* Pagination Controls */}
//         <div className="flex items-center gap-3">
//           <button
//             disabled={page <= 1}
//             onClick={() => fetchProducts(page - 1)}
//             className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span>
//             Page {page} of {totalPages}
//           </span>
//           <button
//             disabled={page >= totalPages}
//             onClick={() => fetchProducts(page + 1)}
//             className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>

//         {/* Variants */}
//         {variants.length > 0 && (
//           <div className="border p-4 rounded bg-white">
//             <h3 className="font-semibold mb-2">
//               Select Variants & Assign Quantity
//             </h3>
//             {variants.map((variant) => (
//               <div key={variant._id} className="flex items-center gap-4 mb-2">
//                 <label className="w-2/3">
//                   {`${variant.size} - ${variant.color} (Stock: ${variant.quantity})`}
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   max={variant.quantity}
//                   placeholder="Quantity"
//                   onChange={(e) =>
//                     handleVariantChange(variant._id, Number(e.target.value))
//                   }
//                   className="border p-2 rounded w-1/3"
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Assign Button */}
//         <button
//           onClick={assignProduct}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Assign Product
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShopProductAssigner;
