import React from 'react';

const SubBarcodeImage = ({ variants }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Variant Barcodes</h2>
      {variants?.length > 0 ? (
        variants.map((variant, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-md shadow-sm bg-white flex items-center justify-between"
          >
            <div>
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

            {variant.subBarcodeSvg && (
              <img
                src={variant.subBarcodeSvg}
                alt={`Barcode for ${variant.subBarcode}`}
                className="h-20 ml-4"
              />
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
