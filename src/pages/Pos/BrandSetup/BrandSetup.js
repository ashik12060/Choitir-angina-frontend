import React, { useState } from 'react';

function BrandSetup() {
  const [brandId, setBrandId] = useState('');
  const [brandName, setBrandName] = useState('');

  const handleBrandIdChange = (event) => {
    setBrandId(event.target.value);
  };

  const handleBrandNameChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Submit brand data
    console.log('Brand ID:', brandId);
    console.log('Brand Name:', brandName);
  };

  return (
    <div className="container mx-auto p-6 md:p-10 bg-gradient-to-r from-blue-50 to-indigo-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Brand Type Setup</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="brandId" className="block text-gray-700 font-semibold mb-2">
              Brand ID
            </label>
            <input
              type="text"
              id="brandId"
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={brandId}
              onChange={handleBrandIdChange}
              placeholder="Enter Brand ID"
            />
          </div>
          <div>
            <label htmlFor="brandName" className="block text-gray-700 font-semibold mb-2">
              Brand Name
            </label>
            <input
              type="text"
              id="brandName"
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={brandName}
              onChange={handleBrandNameChange}
              placeholder="Enter Brand Name"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-4 py-2 text-gray-600 font-semibold">Brand ID</th>
                <th className="text-left px-4 py-2 text-gray-600 font-semibold">Brand Name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">Example ID</td>
                <td className="px-4 py-2 text-gray-700">Example Name</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">Another ID</td>
                <td className="px-4 py-2 text-gray-700">Another Name</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BrandSetup;
