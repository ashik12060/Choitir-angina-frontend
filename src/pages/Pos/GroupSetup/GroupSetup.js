import { useState } from 'react';

function GroupSetup() {
  const [groupData, setGroupData] = useState([
    {
      groupId: '03',
      groupName: 'Inden',
      floorId: '7.5000',
      vat: '0.0000',
      discount: '0.0000',
      costOnSale: '0.0000',
    },
    {
      groupId: '01',
      groupName: 'Pakistani Dress Unatlich',
      floorId: '7.5000',
      vat: '0.0000',
      discount: '0.0000',
      costOnSale: '0.0000',
    },
    {
      groupId: '02',
      groupName: 'Pasthani Stitch',
      floorId: '7.5000',
      vat: '0.0000',
      discount: '0.0000',
      costOnSale: '0.0000',
    },
  ]);

  const [newGroup, setNewGroup] = useState({
    groupId: '',
    groupName: '',
    floorId: '',
    vat: 0.0,
    discount: 0.0,
    costOnSale: 0.0,
  });

  const handleChange = (event) => {
    setNewGroup({
      ...newGroup,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setGroupData([...groupData, newGroup]);
    setNewGroup({
      groupId: '',
      groupName: '',
      floorId: '',
      vat: 0.0,
      discount: 0.0,
      costOnSale: 0.0,
    });
  };

  const handleDelete = (groupId) => {
    setGroupData(groupData.filter((group) => group.groupId !== groupId));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Group Setup</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="groupId"
            value={newGroup.groupId}
            onChange={handleChange}
            placeholder="Group ID"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="groupName"
            value={newGroup.groupName}
            onChange={handleChange}
            placeholder="Group Name"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="floorId"
            value={newGroup.floorId}
            onChange={handleChange}
            placeholder="Floor ID"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="number"
            name="vat"
            value={newGroup.vat}
            onChange={handleChange}
            placeholder="VAT"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="number"
            name="discount"
            value={newGroup.discount}
            onChange={handleChange}
            placeholder="Discount"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="number"
            name="costOnSale"
            value={newGroup.costOnSale}
            onChange={handleChange}
            placeholder="Cost on Sale"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="col-span-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Add Group
          </button>
        </form>

        {/* List of Groups */}
        <ul className="space-y-4">
          {groupData.map((group) => (
            <li
              key={group.groupId}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <h2 className="font-medium text-gray-700">{group.groupName}</h2>
                <p className="text-sm text-gray-500">ID: {group.groupId}</p>
              </div>
              <button
                onClick={() => handleDelete(group.groupId)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GroupSetup;
