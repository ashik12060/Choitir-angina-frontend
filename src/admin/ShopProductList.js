// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ShopProductList = ({ shopId }) => {
//   const [shopProducts, setShopProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (shopId) {
//       fetchShopProducts(shopId);
//     }
//   }, [shopId]);

//   const fetchShopProducts = async (shopId) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/api/shops/${shopId}/products`
//       );
//       setShopProducts(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching shop products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-6 p-4 bg-white shadow rounded">
//       <h3 className="text-lg font-semibold mb-2">Products in this Shop</h3>

//       {loading ? (
//         <p>Loading products...</p>
//       ) : shopProducts.length === 0 ? (
//         <p>No products assigned to this shop.</p>
//       ) : (
//         <ul>
//           {shopProducts.map(({ product, variants }) => (
//             <li key={product._id} className="border-b py-3">
//               <div className="flex items-center gap-4">
//                 <img
//                   src={product.images[0]?.url || "/default-image.jpg"}
//                   alt={product.title}
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <div>
//                   <h4 className="font-semibold">{product.title}</h4>
//                   <p className="text-sm text-gray-500">
//                     {product.description || "No description available."}
//                   </p>
//                   <p className="text-sm font-medium">Price: ${product.price}</p>
//                   <p className="text-sm">Variants:</p>
//                   <ul className="text-sm pl-4 list-disc">
//                     {variants.map(({ variant, assignedQuantity }) => (
//                       <li key={variant._id}>
//                         {variant.size} - {variant.color}: {assignedQuantity} pcs
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ShopProductList;

import React, { useEffect, useState } from "react";
import axios from "axios";

const ShopProductList = () => {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [shopProducts, setShopProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all shops when the component loads
  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/shops/show`
      );
      setShops(response.data);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  const handleShopClick = async (shopId) => {
    if (selectedShop === shopId) {
      // If the same shop is clicked again, close the products list
      setSelectedShop(null);
      setShopProducts([]);
      return;
    }

    setSelectedShop(shopId);
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/shops/${shopId}/products`
      );
      setShopProducts(response.data);
    } catch (error) {
      console.error("Error fetching shop products:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    console.log("Shop Products Response:", shopProducts);
  }, [shopProducts]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shops</h2>

      {shops.length === 0 ? (
        <p>No shops available.</p>
      ) : (
        <ul className="space-y-4">
          {shops.map((shop) => (
            <li
              key={shop._id}
              onClick={() => handleShopClick(shop._id)}
              className={`p-4 border rounded cursor-pointer transition ${
                selectedShop === shop._id ? "bg-gray-200" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold">{shop.name}</h3>
              <p className="text-sm text-gray-600">{shop.location}</p>

              {/* Show assigned products when shop is clicked */}
              {selectedShop === shop._id && (
                <div className="mt-4 p-4 bg-white shadow rounded">
                  <h4 className="font-semibold">Products in {shop.name}</h4>

                  {loading ? (
                    <p>Loading products...</p>
                  ) : shopProducts.length === 0 ? (
                    <p>No products assigned to this shop.</p>
                  ) : (
                    <ul>
                      {shopProducts.map(({ product, variants }) => (
                        <li
                          key={product._id}
                          className="border-b py-3 flex gap-4"
                        >
                          <img
                            src={product.images[0]?.url || "/default-image.jpg"}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-semibold">{product.title}</h4>
                            <p className="text-sm text-gray-500">
                              {product.description ||
                                "No description available."}
                            </p>
                            <p className="text-sm font-medium">
                              Price: ${product.price}
                            </p>
                            <p className="text-sm">Variants:</p>
                            {/* <ul className="text-sm pl-4 list-disc">
                              {variants.map(({ variant, assignedQuantity }) => (
                                <li key={variant._id}>
                                  {variant.size} - {variant.color}: {assignedQuantity} pcs
                                </li>
                              ))}
                            </ul> */}
                            <ul className="text-sm pl-4 list-disc">
                              {variants.map(({ variant, assignedQuantity }) =>
                                variant ? ( // Only render if variant exists
                                  <li key={variant._id}>
                                    {variant.size ? `${variant.size} - ` : ""}
                                    {variant.color ? `${variant.color}: ` : ""}
                                    {assignedQuantity} pcs
                                  </li>
                                ) : (
                                  <li
                                    key={Math.random()}
                                    className="text-red-500"
                                  >
                                    Invalid variant data
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShopProductList;
