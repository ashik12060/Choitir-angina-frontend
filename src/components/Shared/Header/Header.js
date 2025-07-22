// import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../../../hooks";
// import { useAuth } from "../../../AuthContext";
// import { useDispatch } from "react-redux";
// import { userLogoutAction } from "../../../redux/actions/userAction";
// import { Search, User, ShoppingBag, ChevronDown } from "lucide-react";

// const Header = ({ totalServices, name, searchQuery, setSearchQuery }) => {
//   const navigate = useNavigate();
//   const { isAuthenticated, logout } = useAuth();
//   const { cart } = useCart();
//   const dispatch = useDispatch();


//     const navItems = [
//     { label: "SALE" },
//     { label: "NEW ARRIVALS", dropdown: ["Summer Collection", "Winter Collection"] },
//     { label: "READY TO WEAR", dropdown: ["Casual", "Formal"] },
//     { label: "UNSTITCHED" },
//     { label: "SEMI STITCHED" },
//     { label: "KURTI" },
//     { label: "TAWAKKAL KHAAS" },
//     { label: "KID'S COLLECTION", dropdown: ["Boys", "Girls"] },
//     { label: "FRAGRANCES" },
//   ];


//   const [navCollapsed, setNavCollapsed] = useState(false); // State for navbar collapse

//   const handleNavCollapse = () => {
//     setNavCollapsed(!navCollapsed);
//   };

//   const logOutUser = () => {
//     logout(() => {
//       dispatch(userLogoutAction());
//       navigate('/')
//     });
//   };

//   return (
//     <nav className="bg-gray-100 shadow-md px-5 py-4">
//       <div className="container mx-auto flex flex-wrap items-center justify-between">
//         <Search className="w-5 h-5 cursor-pointer" />
// <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <h1 className="text-2xl font-semibold tracking-wide text-center">
//           CHAITYR ANGINA
//         </h1>
//       </div>
//         <button
//           className="text-gray-700 focus:outline-none md:hidden"
//           aria-controls="navbarSupportedContent"
//           aria-expanded={navCollapsed}
//           aria-label="Toggle navigation"
//           onClick={handleNavCollapse}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//           </svg>
//         </button>

        
//         <div
//           className={`w-full md:flex md:w-auto ${navCollapsed ? "block" : "hidden"}`}
//           id="navbarSupportedContent"
//         >
//           <ul className="flex flex-col md:flex-row md:items-center md:gap-6 pt-4 me-3">
            
//             <li className="font-bold">
//               <Link className="hover:text-green-600" to="/dashboard">
//                 POS
//               </Link>
//             </li>
//             {isAuthenticated && (
//               <li className="font-bold">
//                 <Link className="hover:text-green-600" to="/user/dashboard">
//                   User Dashboard
//                 </Link>
//               </li>
//             )}
//           </ul>
//           <div className="flex flex-col md:flex-row md:items-center md:gap-6 mt-4 md:mt-0">
//             <div className="relative group">
//               <button className="focus:outline-none">
//                 <FontAwesomeIcon className="text-gray-600 text-xl" icon={faUser} />
//               </button>
//               <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg hidden group-hover:block">
//                 <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin</Link>
//                 <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</Link>
//                 {isAuthenticated ? (
//                   <button
//                     onClick={logOutUser}
//                     className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                   >
//                     Log Out
//                   </button>
//                 ) : (
//                   <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     User Login
//                   </Link>
//                 )}
//               </div>
//             </div>
//             <div className="relative">
//               <Link to="/cart" className="flex items-center">
//                 <FontAwesomeIcon className="text-gray-600 text-xl" icon={faCartShopping} />
//                 <span className="ml-1 my-2 text-sm font-bold text-gray-800">{cart?.length}</span>
//               </Link>
//             </div>
//             <div>
//               {isAuthenticated ? (
//                 <button
//                   onClick={logOutUser}
//                   className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700"
//                 >
//                   Log Out
//                 </button>
//               ) : (
//                 <Link
//                   to="/admin-login"
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 >
//                   Admin
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>


//         <nav className="border-t text-sm">
//         <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 px-4 py-2">
//           {navItems.map((item, idx) => (
//             <div key={idx} className="relative group cursor-pointer">
//               <div className="flex items-center gap-1 hover:text-gray-600">
//                 {item.label}
//                 {item.dropdown && <ChevronDown className="w-4 h-4" />}
//               </div>
//               {item.dropdown && (
//                 <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-md hidden group-hover:block z-10">
//                   {item.dropdown.map((subItem, subIdx) => (
//                     <div
//                       key={subIdx}
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     >
//                       {subItem}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </nav>
//       </div>
//     </nav>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../../../hooks";
import { useAuth } from "../../../AuthContext";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../../../redux/actions/userAction";
import { ChevronDown, Search } from "lucide-react";

const Header = ({ totalServices, name, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const dispatch = useDispatch();

  const [navCollapsed, setNavCollapsed] = useState(false);

  const navItems = [
    { label: "SALE" },
    { label: "NEW ARRIVALS", dropdown: ["Summer Collection", "Winter Collection"] },
    { label: "READY TO WEAR", dropdown: ["Casual", "Formal"] },
    { label: "UNSTITCHED" },
    { label: "KID'S COLLECTION", dropdown: ["Boys", "Girls"] },
   
  ];

  const logOutUser = () => {
    logout(() => {
      dispatch(userLogoutAction());
      navigate("/");
    });
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Left: Search */}
        <Search className="w-5 h-5 cursor-pointer" />

        {/* Center: Logo */}
        <h1 className="text-xl sm:text-2xl  tracking-wide text-center font-serif">
          <Link to='/'>CHAITYR ANGINA</Link> <span className="font-light text-sm align-top">fabrics</span>
        </h1>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          <Link to="/wishlist">
            <FontAwesomeIcon icon={faHeart} className="text-gray-600 text-lg" />
          </Link>
          <Link to="/cart" className="relative">
            <FontAwesomeIcon icon={faCartShopping} className="text-gray-600 text-lg" />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1">
              {cart?.length || 0}
            </span>
          </Link>
          <div className="relative group">
            <FontAwesomeIcon icon={faUser} className="text-gray-600 text-lg cursor-pointer" />
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md hidden group-hover:block z-20">
              {isAuthenticated ? (
                <>
                  <Link to="/user/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    User Dashboard
                  </Link>
                  <button
                    onClick={logOutUser}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    User Login
                  </Link>
                  <Link to="/register" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Register
                  </Link>
                </>
              )}
              <Link to="/admin-login" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Hamburger button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setNavCollapsed(!navCollapsed)}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav
        className={`bg-gray-50 md:bg-white md:border-t transition-all duration-300 ${
          navCollapsed ? "block" : "hidden md:block"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center  items-center gap-4 px-4 py-2">
          <div className="flex flex-wrap justify-center  gap-4 md:gap-6">
            {navItems.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="flex items-center gap-1 cursor-pointer hover:text-green-700">
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </div>
                {item.dropdown && (
                  <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-md hidden group-hover:block z-20">
                    {item.dropdown.map((subItem, subIdx) => (
                      <div
                        key={subIdx}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {subItem}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              to="/dashboard"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
            >
              POS
            </Link>
            {isAuthenticated ? (
              <button
                onClick={logOutUser}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/admin-login"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;







