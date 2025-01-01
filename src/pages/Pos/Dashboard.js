import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const sections = [
    {
      title: 'General',
      items: [
        { name: 'Counter', path: '/counter' },
        // { name: 'Shop In/Out', path: '/shop-in-out' },
        { name: 'User Permission', path: '/user-permission' },
        { name: 'User Management', path: '/user-management' },
        { name: 'Emp. Attendance Done', path: '/attendance' },
        { name: 'Settings', path: '/settings' },
        { name: 'Group Setup Em', path: '/group-setup' },
        { name: 'Brand Setup Em Done', path: '/brand-setup' },
        // { name: 'Product Setup from Admin panel', path: '/product-information' },
        { name: 'Supplier Setup Em Done', path: '/supplier-setup' },
        { name: 'Style Size Em', path: '/style-size' },
        { name: 'Weighing Items', path: '/weighing-items' },
        { name: 'Credit Cards Em', path: '/credit-cards' },
      ],
    },
    {
      title: 'Purchasing',
      items: [
        { name: 'Purchase Order Em', path: '/purchase-order' },
        { name: 'Purchase Receive Em', path: '/purchase-receive' },
        { name: 'Price Change', path: '/price-change' },
        { name: 'Damage/Loss', path: '/damage-loss' },
        { name: 'Supplier Return Em', path: '/supplier-return' },
        { name: 'Promotion', path: '/promotion' },
        { name: 'Package', path: '/package' },
        { name: 'Inventory', path: '/inventory' },
      ],
    },
    {
      title: 'Sales and Reports',
      items: [
        { name: 'Sales Em', path: '/sales' },
        { name: 'Barcode Print Em Done', path: '/barcode-print' },
        { name: 'Sales Cancel', path: '/sales-cancel' },
        { name: 'Sales Report', path: '/sales-report' },
        { name: 'Customer Report Emt Done', path: '/customer-report' },
        { name: 'C. Discount Rpt', path: '/c-discount-rpt' },
        { name: 'P.O. Report', path: '/po-report' },
        { name: 'Promotion', path: '/promotion-report' },
        { name: 'Stock Report Em', path: '/stock-report' },
        { name: 'Vat Report', path: '/vat-report' },
        { name: 'Package Report', path: '/package-report' },
        { name: 'Receive Report', path: '/receive-report' },
        { name: 'Invoice Report', path: '/invoice-report' },
        { name: 'Invoice Reprint', path: '/invoice-reprint' },
      ],
    },
    {
      title: 'Employee Management',
      items: [
        { name: 'Employee Setup Done ', path: '/employee-setup' },
        { name: 'Customers Setup Done', path: '/customer-setup' },
        { name: 'Cust. Category Em', path: '/cust-category' },
        { name: 'Credit Collections Em', path: '/credit-collection' },
      ],
    },
  ];

  return (
    <div className="min-h-screen  bg-gray-50 p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow p-4 rounded-lg mb-4">
        <h1 className="text-lg font-bold">Retail Master</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Welcome Mehedi</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <i className="fas fa-user"></i>
          </div>
          <button className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
            <i className="fas fa-power-off"></i>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 mx-auto  text-center justify-center ">
        {sections.map((section, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-2">
            <h2 className="text-xs font-semibold mb-2">{section.title}</h2>
            <ul className="grid grid-cols-2 gap-1">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="bg-sky-500 text-white text-center font-medium py-2 rounded-lg "
                  style={{ height: '80px' }}
                >
                  <Link to={item.path} className="flex items-center justify-center h-full">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
