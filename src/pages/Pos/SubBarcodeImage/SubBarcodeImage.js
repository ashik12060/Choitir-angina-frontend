import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../axiosInstance";
import { Link } from "react-router-dom";

const SubBarcodeImage = () => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubBarcode, setSelectedSubBarcode] = useState("");
  const printRef = useRef(null);

  const fetchVariants = async () => {
    try {
      const res = await axiosInstance.get("/api/products/show");

      const productsArray = Array.isArray(res.data)
        ? res.data
        : res.data.products || res.data.data || [];

      const allVariants = productsArray.flatMap((product) =>
        (product.variants || []).map((variant) => ({
          ...variant,
          productTitle: product.title,
          productPrice: product.price,
          brand: product.brandName,
        }))
      );

      setVariants(allVariants);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, []);

  const handlePrint = () => {
    if (!selectedVariant) return;
    window.print();
  };

  const uniqueSubBarcodes = [...new Set(variants.map((v) => v.subBarcode))];
  const selectedVariant = variants.find(
    (v) => v.subBarcode === selectedSubBarcode
  );

  if (loading)
    return <p className="text-center mt-10">Loading variant barcodes...</p>;

  return (
    <>
  
    
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {/* <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #print-area, #print-area * {
              visibility: visible;
            }
            #print-area {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              padding: 20px;
            }
          }
        `}
      </style> */}
      <style>
  {`
    @media print {
      body * {
        visibility: hidden;
      }
      #print-area, #print-area * {
        visibility: visible;
      }
      #print-area {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 20px;
      }

      /* ✅ Make barcode image exactly 1in x 1.5in when printing */
      #print-area img {
        height: 1in !important;
        width: 1.5in !important;
        object-fit: contain;
      }
    }
  `}
</style>


      <div className="w-full max-w-xl space-y-6 bg-white shadow-md rounded-lg p-6">
        <Link to='/' className="bg-black text-white p-2 rounded">Home</Link>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Print Variant Barcode
        </h2>

        {/* 🔍 Searchable dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center">
          <input
            list="subbarcode-options"
            value={selectedSubBarcode}
            onChange={(e) => setSelectedSubBarcode(e.target.value)}
            placeholder="Type or select a sub-barcode"
            className="px-4 py-2 border border-gray-300 rounded w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <datalist id="subbarcode-options">
            {uniqueSubBarcodes.map((sub, idx) => (
              <option key={idx} value={sub} />
            ))}
          </datalist>

          <button
            onClick={handlePrint}
            className={`px-4 py-2 rounded text-white font-semibold transition ${
              selectedVariant
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedVariant}
          >
            Print
          </button>
        </div>

        {/* 🖨️ Barcode Preview */}
        {selectedVariant && (
          <div
            ref={printRef}
            id="print-area"
            className="barcode-box border border-gray-300 p-4 rounded text-center mx-auto bg-white w-full max-w-sm"
          >
            <p className="font-bold text-lg">CHAITYR ANGINA</p>
            <p className="font-semibold">
              {selectedVariant.productTitle} | {selectedVariant.size || "N/A"} |{" "}
              {selectedVariant.color || "N/A"}
            </p>

            {selectedVariant.subBarcodeSvg ? (
              <img
                src={selectedVariant.subBarcodeSvg}
                alt={`Barcode ${selectedVariant.subBarcode}`}
                className="mx-auto my-2"
              />
            ) : (
              <p>No barcode image</p>
            )}
            <p className="font-bold">Price: ৳{selectedVariant.productPrice}</p>
          </div>
        )}
      </div>
    </div>
    
    </>
  );
};

export default SubBarcodeImage;
