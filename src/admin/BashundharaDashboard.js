import React, { useEffect, useState } from "react";
import axiosInstance from "../pages/axiosInstance";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";
import Header from "../components/Shared/Header/Header";
import ShopStockReport from "./ShopStockReport";

const BashundharaDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/bashundhara-sales/summary`
        );
        setSummary(res.data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!summary)
    return <p className="text-center text-red-500">No data found</p>;

  // Sales Report PDF
  const downloadSalesReport = () => {
    const doc = new jsPDF();
    doc.text("Bashundhara Sales Report", 14, 15);

    const tableColumn = [
      "Title",
      "Size",
      "Color",
      "Price",
      "Quantity",
      "Subtotal",
      "Date",
    ];
    const tableRows = summary.products.map((p) => [
      p.title,
      p.size || "-",
      p.color || "-",
      `৳ ${p.price}`,
      p.quantity,
      `৳ ${p.subtotal}`,
      new Date(p.createdAt).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Sales_Report.pdf");
  };

  // Stock Report PDF
  // const downloadStockReportPDF = () => {
  //   const doc = new jsPDF();
  //   doc.text("Bashundhara Stock Report", 14, 15);

  //   const tableColumn = ["Title", "Size", "Color", "Price", "Quantity", "Subtotal", "Date"];
  //   const tableRows = summary.products.map((p) => [
  //     p.title,
  //     p.size || "-",
  //     p.color || "-",
  //     `৳ ${p.price}`,
  //     p.quantity,
  //     `৳ ${p.subtotal}`,
  //     new Date(p.createdAt).toLocaleDateString(),
  //   ]);

  //   autoTable(doc, {
  //     head: [tableColumn],
  //     body: tableRows,
  //     startY: 20,
  //   });

  //   doc.save("Stock_Report.pdf");
  // };
  // ✅ Stock Report PDF (Only Available Quantity)
  const downloadStockReportPDF = () => {
    const doc = new jsPDF();
    doc.text("Bashundhara Stock Report", 14, 15);

    const tableColumn = ["Title", "Size", "Color", "Available Quantity"];
    const tableRows = summary.products.map((p) => [
      p.title,
      p.size || "-",
      p.color || "-",
      p.quantity, // ✅ Only show available quantity
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Stock_Report.pdf");
  };

  // ✅ Stock Report Excel (Only Available Quantity)
  const downloadStockReport = () => {
    const stockData = summary.products.map((p) => ({
      Title: p.title,
      Size: p.size || "-",
      Color: p.color || "-",
      "Available Quantity": p.quantity, // ✅ Only show available quantity
    }));

    const worksheet = XLSX.utils.json_to_sheet(stockData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "StockReport");
    XLSX.writeFile(workbook, "Stock_Report.xlsx");
  };

  // ✅ Download Stock Report (Excel)
  // const downloadStockReport = () => {
  //   const stockData = summary.products.map((p) => ({
  //     Title: p.title,
  //     Size: p.size || "-",
  //     Color: p.color || "-",
  //     Price: p.price,
  //     Quantity: p.quantity,
  //     Subtotal: p.subtotal,
  //     Date: new Date(p.createdAt).toLocaleDateString(),
  //   }));

  //   const worksheet = XLSX.utils.json_to_sheet(stockData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "StockReport");
  //   XLSX.writeFile(workbook, "Stock_Report.xlsx");
  // };
  // bashundhara-sales-dashboard
  return (
    <>
      <div className="p-6 mb-10 bg-white shadow-lg rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Bashundhara Sales Summary</h2>

          <div className="space-x-2">
            {/* <button
              onClick={downloadStockReport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Download Stock Report (Excel)
            </button> */}
            {/* <button
              onClick={downloadStockReportPDF}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700"
            >
              Download Stock Report (PDF)
            </button> */}
            <button
              onClick={downloadSalesReport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Download Sales Report (PDF)
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-green-100 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-2xl font-bold">{summary.totalSales}</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-2xl font-bold">৳ {summary.totalRevenue}</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Total Quantity</h3>
            <p className="text-2xl font-bold">{summary.totalQuantity}</p>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2">Size</th>
                <th className="border p-2">Color</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Subtotal</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {summary.products.map((p, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{p.title}</td>
                  <td className="border p-2">{p.size || "-"}</td>
                  <td className="border p-2">{p.color || "-"}</td>
                  <td className="border p-2">৳ {p.price}</td>
                  <td className="border p-2">{p.quantity}</td>
                  <td className="border p-2">৳ {p.subtotal}</td>
                  <td className="border p-2">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ShopStockReport />
    </>
  );
};

export default BashundharaDashboard;
