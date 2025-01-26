import React, { useState, useEffect } from 'react';
import axiosInstance from '../pages/axiosInstance';

const ShopProductManager = () => {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/shops/show`);
        setShops(response.data);
      } catch (error) {
        console.error('Failed to fetch shops:', error);
        setError('Failed to fetch shops');
      }
    };

    fetchShops();
  }, []);

  const createShop = async () => {
    if (!shopName || !shopLocation) return alert('Please enter both shop name and location.');

    try {
      const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/shop/create`, {
        name: shopName,
        location: shopLocation,
      });

      setSuccessMessage('Shop created successfully!');
      setShopName('');
      setShopLocation('');

      const updatedShops = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/shops`);
      setShops(updatedShops.data);
    } catch (error) {
      console.error('Failed to create shop:', error);
    }
  };

  const createProduct = async () => {
    if (!selectedShop) return alert('Please select a shop.');
    if (!productName || !productPrice || !productStock) return alert('Please fill all product fields.');

    try {
      setIsLoading(true);
      const productData = {
        name: productName,
        price: parseFloat(productPrice),
        stock: parseInt(productStock),
        shop: selectedShop,
      };

      const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/products/create`, productData);
      console.log(response.data);

      setProductName('');
      setProductPrice('');
      setProductStock('');
      setIsLoading(false);
      setSuccessMessage('Product added successfully!');
    } catch (error) {
      console.error('Failed to create product:', error);
      setIsLoading(false);
      setError('Failed to create product');
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Create Shop</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Shop Name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
          <input
            type="text"
            placeholder="Location"
            value={shopLocation}
            onChange={(e) => setShopLocation(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
          <button
            onClick={createShop}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Shop
          </button>
        </div>
      </div>

      <div>
        <table className='gap-10 p-10 border-1 border-gray-500'>
          <thead className='gap-10 border-1 border-gray-500'>
            <tr className='bg-gray-300 p-3  m-2 gap-x-10'>
              <th className='px-2 py-2 border-1 border-gray-500'>Shops Name</th>
              <th className='px-2 py-2 border-1 border-gray-500'>Location</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((shop) => (
              <tr className='border-1 border-gray-500' key={shop._id}>
                <td className='px-2 border-1 border-gray-500'>{shop.name}</td>
                <td className='px-2 border-1 border-gray-500'>{shop.location}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-xl font-bold mb-4">Create Product</h2>
        <div className="flex flex-col gap-4">
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
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Product Stock"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={createProduct}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isLoading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProductManager;
