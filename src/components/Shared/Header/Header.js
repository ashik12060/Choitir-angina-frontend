// import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   Box,
//   IconButton,
//   Menu,
//   MenuItem,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../../../hooks";
// import { useAuth } from "../../../AuthContext";
// import { useDispatch, useSelector } from "react-redux";
// import { userLogoutAction } from "../../../redux/actions/userAction";

// const Header = ({ totalServices, name, searchQuery, setSearchQuery }) => {
//   const navigate = useNavigate();
//   const { isAuthenticated, logout } = useAuth();
//   const { cart } = useCart();
//   const dispatch = useDispatch();

//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const [navCollapsed, setNavCollapsed] = useState(false); // State for navbar collapse

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleNavCollapse = () => {
//     setNavCollapsed(!navCollapsed);
//   };

//   const logOutUser = () => {
//     logout(() => {
//       dispatch(userLogoutAction());
//     });
//   };

//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary px-5">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           <h2 className="fs-1 fw-bold text-black">
//             Helper<span className="font-color">Hub</span>
//           </h2>
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           aria-controls="navbarSupportedContent"
//           aria-expanded={navCollapsed}
//           aria-label="Toggle navigation"
//           onClick={handleNavCollapse}
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div
//           className={`collapse navbar-collapse ${navCollapsed ? "show" : ""}`}
//           id="navbarSupportedContent"
//         >
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item fw-bold">
//               <Link className="nav-link" to="/seller-login">
//                 Become a Seller
//               </Link>
//             </li>
//             <li className="nav-item fw-bold">
//               <Link className="nav-link" to="/dashboard">
//                 POS
//               </Link>
//             </li>
//           </ul>
//           <ul className="navbar-nav mb-2 mb-lg-0">
//             {isAuthenticated && (
//               <li className="nav-item me-5">
//                 <Link className="text-decoration-none" to="/user/dashboard">
//                   <p className=" fw-bold text-black" aria-current="page">
//                     User Dashboard
//                   </p>
//                 </Link>
//               </li>
//             )}

//             <li className="nav-item me-3">
//               <Tooltip title="Open settings">
//                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <FontAwesomeIcon className="fs-5 font-color" icon={faUser} />
//                 </IconButton>
//               </Tooltip>
//               <Menu
//                 PaperProps={{
//                   sx: {
//                     "& .MuiMenu-list": {
//                       bgColor: "primary.white",
//                       color: "white",
//                     },
//                   },
//                 }}
//                 sx={{ mt: "45px" }}
//                 id="menu-appbar"
//                 anchorEl={anchorElUser}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 open={Boolean(anchorElUser)}
//                 onClose={handleCloseUserMenu}
//               >
//                 <MenuItem onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">
//                     <Link
//                       className="text-black"
//                       style={{ textDecoration: "none" }}
//                       to="/admin/dashboard"
//                     >
//                       Admin
//                     </Link>
//                   </Typography>
//                 </MenuItem>
//                 <MenuItem onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">
//                     <Link
//                       className="text-black"
//                       style={{ textDecoration: "none" }}
//                       to="/register"
//                     >
//                       Register
//                     </Link>
//                   </Typography>
//                 </MenuItem>
//                 {isAuthenticated ? (
//                   <MenuItem onClick={logOutUser}>
//                     <Typography textAlign="center" color="#8e67b2">
//                       Log Out
//                     </Typography>
//                   </MenuItem>
//                 ) : (
//                   <MenuItem onClick={handleCloseUserMenu}>
//                     <Typography textAlign="center">
//                       <Link
//                         className="text-black"
//                         style={{ textDecoration: "none" }}
//                         to="/login"
//                       >
//                         User Login
//                       </Link>
//                     </Typography>
//                   </MenuItem>
//                 )}
//               </Menu>
//             </li>

//             <li className="nav-item me-3">
//               <Link className="nav-link" to="/cart">
//                 <FontAwesomeIcon
//                   className="fs-5 font-color"
//                   icon={faCartShopping}
//                 />
//                 <span className="ps-1 fw-bold ">{cart?.length}</span>
//               </Link>
//             </li>

//             <li className="nav-item">
//               <div>
//                 {isAuthenticated ? (
//                   <MenuItem onClick={logOutUser}>
//                     <Typography textAlign="center" color="#8e67b2">
//                       Log Out{" "}
//                     </Typography>
//                   </MenuItem>
//                 ) : (
//                   <MenuItem onClick={handleCloseUserMenu}>
//                     <Typography textAlign="center">
//                       <Link
//                         className="text-black bg-color text-white px-3 py-2"
//                         style={{ textDecoration: "none" }}
//                         to="/admin-login"
//                       >
//                         Admin
//                       </Link>
//                     </Typography>
//                   </MenuItem>
//                 )}
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;

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
          Helper<span className="text-green-600">Hub</span>
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








