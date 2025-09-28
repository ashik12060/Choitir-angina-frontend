import React, { useEffect, useState } from "react";
import axiosInstance from "../pages/axiosInstance";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const ShopStockReport = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchStockReport = async () => {
      try {
        const res = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/shops/stock-report`
        );
        setShops(res.data);
      } catch (error) {
        console.error("Error fetching stock report:", error);
      }
    };
    fetchStockReport();
  }, []);

  // ✅ PDF Export
  const downloadStockReportPDF = () => {
    const doc = new jsPDF();
    doc.text("Shop Stock Report", 14, 15);

    shops.forEach((shop, index) => {
      autoTable(doc, {
        head: [["Title", "Size", "Color", "SubBarcode", "Available Qty"]],
        body: shop.products.flatMap((p) =>
          p.variants.map((v) => [
            p.title,
            v.size || "-",
            v.color || "-",
            v.subBarcode || "-",
            v.assignedQuantity,
          ])
        ),
        startY: index === 0 ? 20 : doc.lastAutoTable.finalY + 10,
        didDrawPage: () => {
          doc.text(`${shop.shopName} (${shop.location || "-"})`, 14, doc.lastAutoTable.finalY - 5);
        },
      });
    });

    doc.save("Shop_Stock_Report.pdf");
  };

  // ✅ Excel Export
  const downloadStockReportExcel = () => {
    let allData = [];

    shops.forEach((shop) => {
      shop.products.forEach((p) => {
        p.variants.forEach((v) => {
          allData.push({
            Shop: shop.shopName,
            Location: shop.location || "-",
            Product: p.title,
            Size: v.size || "-",
            Color: v.color || "-",
            SubBarcode: v.subBarcode || "-",
            "Available Quantity": v.assignedQuantity,
          });
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ShopStockReport");
    XLSX.writeFile(workbook, "Shop_Stock_Report.xlsx");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Shop Stock Report</h2>

      <div className="space-x-2 mb-6">
        <button
          onClick={downloadStockReportExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Download Stock Report (Excel)
        </button>
        <button
          onClick={downloadStockReportPDF}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Download Stock Report (PDF)
        </button>
      </div>

      {shops.map((shop, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-lg font-semibold">{shop.shopName} ({shop.location})</h3>
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Product</th>
                  <th className="border p-2">Size</th>
                  <th className="border p-2">Color</th>
                  <th className="border p-2">SubBarcode</th>
                  <th className="border p-2">Available Qty</th>
                </tr>
              </thead>
              <tbody>
                {shop.products.flatMap((p, pIdx) =>
                  p.variants.map((v, vIdx) => (
                    <tr key={`${pIdx}-${vIdx}`} className="hover:bg-gray-50">
                      <td className="border p-2">{p.title}</td>
                      <td className="border p-2">{v.size || "-"}</td>
                      <td className="border p-2">{v.color || "-"}</td>
                      <td className="border p-2">{v.subBarcode || "-"}</td>
                      <td className="border p-2">{v.assignedQuantity}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopStockReport;



