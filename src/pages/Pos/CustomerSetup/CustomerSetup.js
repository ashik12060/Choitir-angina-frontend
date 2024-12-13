

import React, { useState } from 'react';

function CustomerSetup() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      category: 'Silver',
      cusName: 'Alam Dastagr',
      address: '',
      phone: '01717707848',
      email: '',
      profession: '',
      birthDt: '01/01/1985',
    },
    {
      id: 2,
      category: 'Silver',
      cusName: 'Ava Islam',
      address: 'hatipur pakupa.dhaka',
      phone: '01716903435',
      email: '',
      profession: '',
      birthDt: '04/01/1990',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    category: '',
    cusName: '',
    address: '',
    phone: '',
    email: '',
    profession: '',
    birthDt: '',
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const customerWithId = { id: customers.length + 1, ...newCustomer };
    setCustomers((prev) => [...prev, customerWithId]);
    setNewCustomer({
      category: '',
      cusName: '',
      address: '',
      phone: '',
      email: '',
      profession: '',
      birthDt: '',
    });
    setIsFormVisible(false);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.cusName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Customer Setup</h1>

      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNewButtonClick}
        >
          {isFormVisible ? 'Cancel' : '+ New'}
        </button>
        <div className="relative">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {isFormVisible && (
        <form className="bg-gray-100 p-4 rounded mb-4" onSubmit={handleAddCustomer}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Category:</label>
              <input
                type="text"
                name="category"
                value={newCustomer.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Customer Name:</label>
              <input
                type="text"
                name="cusName"
                value={newCustomer.cusName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Address:</label>
              <input
                type="text"
                name="address"
                value={newCustomer.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone:</label>
              <input
                type="text"
                name="phone"
                value={newCustomer.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={newCustomer.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Profession:</label>
              <input
                type="text"
                name="profession"
                value={newCustomer.profession}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Birth Date:</label>
              <input
                type="date"
                name="birthDt"
                value={newCustomer.birthDt}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Customer
          </button>
        </form>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">ID</th>
            <th className="px-4 py-2 border-b text-left">Category</th>
            <th className="px-4 py-2 border-b text-left">Customer Name</th>
            <th className="px-4 py-2 border-b text-left">Address</th>
            <th className="px-4 py-2 border-b text-left">Phone</th>
            <th className="px-4 py-2 border-b text-left">Email</th>
            <th className="px-4 py-2 border-b text-left">Profession</th>
            <th className="px-4 py-2 border-b text-left">Birth Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-4 py-2 border-b">{customer.id}</td>
              <td className="px-4 py-2 border-b">{customer.category}</td>
              <td className="px-4 py-2 border-b">{customer.cusName}</td>
              <td className="px-4 py-2 border-b">{customer.address}</td>
              <td className="px-4 py-2 border-b">{customer.phone}</td>
              <td className="px-4 py-2 border-b">{customer.email}</td>
              <td className="px-4 py-2 border-b">{customer.profession}</td>
              <td className="px-4 py-2 border-b">{customer.birthDt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerSetup;
