// import React, { useState, useEffect } from "react";
// import axiosInstance from "../pages/axiosInstance";

// const ShopProductAssigner = () => {
//   const [shops, setShops] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedShop, setSelectedShop] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [quantity, setQuantity] = useState(0);
//   const [successMessage, setSuccessMessage] = useState("");


//   useEffect(() => {
//     const fetchShopsAndProducts = async () => {
//       try {
//         const shopRes = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/shops/show`);
//         const productRes = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/products/show`);
  
//         setShops(shopRes.data);
        
//         // Check if products is inside an object
//         setProducts(Array.isArray(productRes.data.products) ? productRes.data.products : []);
        
//         console.log("Shops:", shopRes.data);
//         console.log("Products:", productRes.data.products); // Log correctly
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
  
//     fetchShopsAndProducts();
//   }, []);
  

//   const assignProduct = async () => {
//     if (!selectedShop || !selectedProduct || quantity <= 0) {
//       return alert("Please select a shop, product, and valid quantity.");
//     }

//     try {
//       const response = await axiosInstance.post(
//         `${process.env.REACT_APP_API_URL}/api/shops/${selectedShop}/assign-product`,
//         { productId: selectedProduct, quantity }
//       );

//       setSuccessMessage("Product assigned successfully!");
//       setQuantity(0);
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
//         {/* shop */}
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

// <select
//   value={selectedProduct}
//   onChange={(e) => setSelectedProduct(e.target.value)}
//   className="border p-2 rounded"
// >
//   <option value="">Select Product</option>
//   {products.length > 0 ? (
//     products.map((product) => (
//       <option key={product._id} value={product._id}>
//         {product.title || "Unnamed Product"}
//       </option>
//     ))
//   ) : (
//     <option disabled>No products available</option>
//   )}
// </select>



//         <input
//           type="number"
//           placeholder="Quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(Number(e.target.value))}
//           className="border p-2 rounded"
//         />

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

const ShopProductAssigner = () => {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [productDetails, setProductDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchShopsAndProducts = async () => {
      try {
        const shopRes = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/shops/show`);
        const productRes = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/products/show`);

        setShops(shopRes.data);
        setProducts(Array.isArray(productRes.data.products) ? productRes.data.products : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchShopsAndProducts();
  }, []);

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);

    const selectedProductData = products.find((product) => product._id === productId);
    if (selectedProductData && selectedProductData.variants.length > 0) {
      const firstVariant = selectedProductData.variants[0]; // Assuming the first variant for now
      setProductDetails({
        quantity: firstVariant.quantity,
        size: firstVariant.size,
        color: firstVariant.color,
      });
    } else {
      setProductDetails(null);
    }
  };

  const assignProduct = async () => {
    if (!selectedShop || !selectedProduct || quantity <= 0) {
      return alert("Please select a shop, product, and valid quantity.");
    }

    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/shops/${selectedShop}/assign-product`,
        
        { productId: selectedProduct, quantity }
      );

      setSuccessMessage("Product assigned successfully!");
      setQuantity(0);
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

        {/* Product Selection */}
        <select
          value={selectedProduct}
          onChange={(e) => handleProductSelect(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Product</option>
          {products.length > 0 ? (
            products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.title || "Unnamed Product"}
              </option>
            ))
          ) : (
            <option disabled>No products available</option>
          )}
        </select>

        {/* Display Product Details */}
        {productDetails && (
          <div className="p-4 bg-white border rounded">
            <p><strong>Quantity Available:</strong> {productDetails.quantity}</p>
            <p><strong>Size:</strong> {productDetails.size}</p>
            <p><strong>Color:</strong> {productDetails.color}</p>
          </div>
        )}

        {/* Quantity Input */}
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 rounded"
        />

        {/* Assign Product Button */}
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
