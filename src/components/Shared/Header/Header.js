import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks";
import { useAuth } from "../../../AuthContext";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../../../redux/actions/userAction";

const Header = ({ totalServices, name, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const dispatch = useDispatch();

  const [navCollapsed, setNavCollapsed] = useState(false); // State for navbar collapse

  const handleNavCollapse = () => {
    setNavCollapsed(!navCollapsed);
  };

  const logOutUser = () => {
    logout(() => {
      dispatch(userLogoutAction());
    });
  };

  return (
    <nav className="bg-gray-100 shadow-md px-5 py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-black">
          Chaitir<span className="text-green-600">Angina</span>
        </Link>
        <button
          className="text-gray-700 focus:outline-none md:hidden"
          aria-controls="navbarSupportedContent"
          aria-expanded={navCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div
          className={`w-full md:flex md:w-auto ${navCollapsed ? "block" : "hidden"}`}
          id="navbarSupportedContent"
        >
          <ul className="flex flex-col md:flex-row md:items-center md:gap-6">
            <li className="font-bold">
              <Link className="hover:text-green-600" to="/seller-login">
                Become a Seller
              </Link>
            </li>
            <li className="font-bold">
              <Link className="hover:text-green-600" to="/dashboard">
                POS
              </Link>
            </li>
            {isAuthenticated && (
              <li className="font-bold">
                <Link className="hover:text-green-600" to="/user/dashboard">
                  User Dashboard
                </Link>
              </li>
            )}
          </ul>
          <div className="flex flex-col md:flex-row md:items-center md:gap-6 mt-4 md:mt-0">
            <div className="relative group">
              <button className="focus:outline-none">
                <FontAwesomeIcon className="text-gray-600 text-xl" icon={faUser} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg hidden group-hover:block">
                <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin</Link>
                <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</Link>
                {isAuthenticated ? (
                  <button
                    onClick={logOutUser}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                ) : (
                  <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    User Login
                  </Link>
                )}
              </div>
            </div>
            <div className="relative">
              <Link to="/cart" className="flex items-center">
                <FontAwesomeIcon className="text-gray-600 text-xl" icon={faCartShopping} />
                <span className="ml-1 text-sm font-bold text-gray-800">{cart?.length}</span>
              </Link>
            </div>
            <div>
              {isAuthenticated ? (
                <button
                  onClick={logOutUser}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Log Out
                </button>
              ) : (
                <Link
                  to="/admin-login"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;








