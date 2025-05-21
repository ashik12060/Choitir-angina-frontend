import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../axiosInstance";

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

  const svgContent = selectedVariant.subBarcodeSvg; // Could be inline SVG string or base64 image URL

  // Decide how to embed the barcode in print window:
  // If svgContent starts with '<svg', embed inline.
  // Else if it starts with 'data:image', embed as <img src="..."/>
  let barcodeHtml = "";
  if (svgContent?.startsWith("<svg")) {
    barcodeHtml = svgContent;
  } else if (svgContent?.startsWith("data:image")) {
    barcodeHtml = `<img src="${svgContent}" alt="Barcode Image" style="max-width:100%; max-height:50px;" />`;
  } else {
    barcodeHtml = "<p>No barcode image available</p>";
  }

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Barcode</title>
        <style>
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .barcode-box {
              width: 1.5in;
              height: 1.2in;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-family: Arial, sans-serif;
              font-size: 10px;
              text-align: center;
              border: 1px solid #000;
              box-sizing: border-box;
              page-break-after: always;
              padding: 8px;
            }
            svg {
              width: 100%;
              height: auto;
              max-height: 50px;
            }
            img {
              max-width: 100%;
              max-height: 50px;
            }
          }
        </style>
      </head>
      <body>
        <div class="barcode-box">
          <div><strong>CHAITYR ANGINA</strong></div>
          <div>${selectedVariant.productTitle}</div>
          <div>Size: ${selectedVariant.size || "N/A"} | Color: ${selectedVariant.color || "N/A"}</div>
          ${barcodeHtml}
          <div>Price: ${selectedVariant.productPrice}</div>
        </div>
        <script>
          window.onload = function() {
            window.print();
            window.close();
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};

  const uniqueSubBarcodes = [...new Set(variants.map((v) => v.subBarcode))];
  const selectedVariant = variants.find((v) => v.subBarcode === selectedSubBarcode);

  if (loading) return <p className="text-center mt-10">Loading variant barcodes...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-xl space-y-6 bg-white shadow-md rounded-lg p-6">
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
            className="barcode-box border border-gray-300 p-4 rounded text-center mx-auto bg-white w-full max-w-sm"
          >
            <p className="font-bold text-lg">CHAITYR ANGINA</p>
            <p className="font-semibold">{selectedVariant.productTitle} | {selectedVariant.size || "N/A"} | {selectedVariant.color || "N/A"} </p>
            
            {selectedVariant.subBarcodeSvg ? (
              <img
                src={selectedVariant.subBarcodeSvg}
                alt={`Barcode ${selectedVariant.subBarcode}`}
                className="mx-auto h-20 my-2"
              />
            ) : (
              <p>No barcode image</p>
            )}
            <p className="font-semibold">Price: {selectedVariant.productPrice}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubBarcodeImage;
