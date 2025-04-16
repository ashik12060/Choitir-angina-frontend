import React, { useEffect, useState } from 'react';

import axiosInstance from '../../axiosInstance';

const SubBarcodeImage = () => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVariants = async () => {
    try {
      const res = await axiosInstance.get('/api/products/show');

      // Handle the response safely
      const productsArray = Array.isArray(res.data)
        ? res.data
        : res.data.products || res.data.data || [];

      const allVariants = productsArray.flatMap((product) =>
        (product.variants || []).map((variant) => ({
          ...variant,
          productTitle: product.title,
        }))
      );

      setVariants(allVariants);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, []);

  if (loading) return <p>Loading variant barcodes...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Variant Barcodes</h2>
      {variants.length > 0 ? (
        variants.map((variant, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-md shadow-sm bg-white flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-600">
                <strong>Product:</strong> {variant.productTitle}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Size:</strong> {variant.size}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Color:</strong> {variant.color}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Quantity:</strong> {variant.quantity}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Sub Barcode:</strong> {variant.subBarcode}
              </p>
            </div>

            {variant.subBarcodeSvg ? (
              <img
                src={variant.subBarcodeSvg}
                alt={`Barcode for ${variant.subBarcode}`}
                className="h-20 ml-4"
              />
            ) : (
              <p className="text-gray-400 ml-4">No barcode image</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No variant barcodes available.</p>
      )}
    </div>
  );
};

export default SubBarcodeImage;
