// import React, { useState } from "react";

// function InvoiceReprint() {
//   const [fromDate, setFromDate] = useState("12/01/2024");
//   const [toDate, setToDate] = useState("12/08/2024");
//   const [invoiceNumber, setInvoiceNumber] = useState("12012024CA01040001");

//   const handleFromDateChange = (e) => {
//     setFromDate(e.target.value);
//   };

//   const handleToDateChange = (e) => {
//     setToDate(e.target.value);
//   };

//   const handleInvoiceNumberChange = (e) => {
//     setInvoiceNumber(e.target.value);
//   };

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-4">Invoice Reprint</h1>

//       <div className="flex flex-col space-y-4">
//         <div className="flex items-center">
//           <label htmlFor="from-date" className="mr-2">
//             From:
//           </label>
//           <input
//             type="text"
//             id="from-date"
//             className="border rounded px-3 py-2"
//             value={fromDate}
//             onChange={handleFromDateChange}
//           />
//         </div>

//         <div className="flex items-center">
//           <label htmlFor="to-date" className="mr-2">
//             To:
//           </label>
//           <input
//             type="text"
//             id="to-date"
//             className="border rounded px-3 py-2"
//             value={toDate}
//             onChange={handleToDateChange}
//           />
//         </div>

//         <div className="flex items-center">
//           <label htmlFor="invoice-number" className="mr-2">
//             To:
//           </label>
//           <input
//             type="text"
//             id="invoice-number"
//             className="border rounded px-3 py-2"
//             value={invoiceNumber}
//             onChange={handleInvoiceNumberChange}
//           />
//         </div>

//         <div className="flex justify-center mt-4">
//           <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
//             Reprint Invoice
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InvoiceReprint;


import React, { useState } from "react";

function InvoiceReprint() {
  const [fromDate, setFromDate] = useState("2024-12-01"); // Use ISO date format for compatibility
  const [toDate, setToDate] = useState("2024-12-08");
  const [invoiceNumber, setInvoiceNumber] = useState("12012024CA01040001");

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleInvoiceNumberChange = (e) => {
    setInvoiceNumber(e.target.value);
  };

  return (
    <div className="container mx-auto p-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Invoice Reprint</h1>

      <div className="flex flex-col space-y-6">
        <div className="flex flex-col">
          <label htmlFor="from-date" className="text-sm font-medium mb-2">
            From Date:
          </label>
          <input
            type="date"
            id="from-date"
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={fromDate}
            onChange={handleFromDateChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="to-date" className="text-sm font-medium mb-2">
            To Date:
          </label>
          <input
            type="date"
            id="to-date"
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={toDate}
            onChange={handleToDateChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="invoice-number" className="text-sm font-medium mb-2">
            Invoice Number:
          </label>
          <input
            type="text"
            id="invoice-number"
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={invoiceNumber}
            onChange={handleInvoiceNumberChange}
            placeholder="Enter Invoice Number"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white rounded px-6 py-2 hover:bg-blue-600 transition-all"
            onClick={() => alert("Invoice reprint feature coming soon!")}
          >
            Reprint Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceReprint;