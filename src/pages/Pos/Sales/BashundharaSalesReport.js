import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const BashundharaSalesReport = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/bashundhara-sales/summary`);
        setSummary(res.data);
      } catch (error) {
        console.error("Error fetching sales summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading summary...</p>;
  }

  if (!summary) {
    return <p className="text-center text-red-500 mt-10">No data available</p>;
  }

  return (
    <div className="p-6">
      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-green-100 p-4 rounded-2xl shadow text-center">
          <h2 className="text-xl font-bold text-green-700">Total Sales</h2>
          <p className="text-2xl font-semibold">{summary.totalSales}</p>
        </div>

        <div className="bg-blue-100 p-4 rounded-2xl shadow text-center">
          <h2 className="text-xl font-bold text-blue-700">Total Revenue</h2>
          <p className="text-2xl font-semibold">৳ {summary.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded-2xl shadow text-center">
          <h2 className="text-xl font-bold text-purple-700">Total Quantity</h2>
          <p className="text-2xl font-semibold">{summary.totalQuantity}</p>
        </div>
      </div>

      {/* ✅ Sales Table */}
      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <h3 className="text-lg font-semibold bg-gray-100 px-4 py-2">Product Sales Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700 border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Size</th>
                <th className="p-2 border">Color</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Subtotal</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {summary.products.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.title}</td>
                  <td className="p-2 border">{item.size || "-"}</td>
                  <td className="p-2 border">{item.color || "-"}</td>
                  <td className="p-2 border">৳ {item.price.toFixed(2)}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">৳ {item.subtotal.toFixed(2)}</td>
                  <td className="p-2 border">{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BashundharaSalesReport;
