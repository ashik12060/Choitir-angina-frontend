import React, { useState } from 'react';

function EmployeeSetup() {
  const [employees, setEmployees] = useState([
    { id: 1, cardNo: '003', empName: 'Shohel', mobile: '', email: '', address: '', isActive: true },
    { id: 2, cardNo: '004', empName: 'Mehed Hasan Sajal', mobile: '01820099068', email: 'mehedibdad@gmail.com', address: '', isActive: true },
    { id: 3, cardNo: '005', empName: 'Md Kamal Hossain Abir', mobile: '01719182324', email: 'kamal182324@gmail.com', address: '', isActive: true },
  ]);

  const [formData, setFormData] = useState({
    cardNo: '',
    name: '',
    mobile: '',
    email: '',
    address: '',
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      isActive: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: employees.length + 1,
      ...formData,
    };
    setEmployees([...employees, newEmployee]);
    setFormData({
      cardNo: '',
      name: '',
      mobile: '',
      email: '',
      address: '',
      isActive: true,
    });
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Employee Setup</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Card No:</label>
            <input
              type="text"
              name="cardNo"
              value={formData.cardNo}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center text-gray-700 font-medium">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Active
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium rounded px-4 py-2 w-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Add Employee
          </button>
        </form>

        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Employee List</h2>
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Card No</th>
                <th className="border border-gray-300 p-2 text-left">Name</th>
                <th className="border border-gray-300 p-2 text-left">Mobile</th>
                <th className="border border-gray-300 p-2 text-left">Email</th>
                <th className="border border-gray-300 p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 p-2">{employee.cardNo}</td>
                  <td className="border border-gray-300 p-2">{employee.empName}</td>
                  <td className="border border-gray-300 p-2">{employee.mobile}</td>
                  <td className="border border-gray-300 p-2">{employee.email}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeSetup;
