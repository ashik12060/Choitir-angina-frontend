// import "./Footer.css";
// import {
//   faLocationDot,
//   faMobileScreen,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React from "react";
// import i1 from "../../../assets/Bkash-logo.png";
// import i2 from "../../../assets/nagad.png";
// import i3 from "../../../assets/rocket.png";
// import i4 from "../../../assets/Dutch_Bangla_Bank.jpg";
// import i5 from "../../../assets/visa-icon.png";
// import i6 from "../../../assets/master-card.png";
// import { Link } from "react-router-dom";

// const Footer = () => {

//   const currentYear = new Date().getFullYear();
//   return (
//     <div className="text-black card2-bg">
//       <div className="d-flex justify-content-around flex-lg-row flex-md-row flex-sm-column flex-column py-5 px-sm-4 px-3 g-4 gap-4">
//         <div>
//           <h2 className="fs-1 fw-bold" aria-current="page">
//           Chaitir<span className="font-color">Angina</span>
//           </h2>
//           <br />
//           <p className="">Chaityr Angina offers stylish and elegant ladies' clothing. Quality and comfort for every woman.</p>
//           <p className="">
//             <FontAwesomeIcon icon={faLocationDot} /> Dhaka, Bangladesh
//           </p>
//           <p className="">
//             <FontAwesomeIcon icon={faMobileScreen} /> Phone: +8801889719728

//           </p>
//         </div>

//         <div>
//           <h6 className="fw-bold">PAYMENT</h6>
//           <div className="d-flex w-100 gap-2 rounded">
//             <img src={i1} className=" logo-sizing rounded " alt="im" />
//             <img src={i2} className=" logo-sizing rounded " alt="im" />
//             <img src={i3} className=" logo-sizing rounded " alt="im" />
//             <img src={i4} className=" logo-sizing rounded " alt="im" />
//             <img src={i5} className=" logo-sizing rounded " alt="im" />
//             <img src={i6} className=" logo-sizing rounded " alt="im" />
//           </div>
//         </div>

//         <div>
//           <h6 className="fw-bold">USER AREA</h6>
//           <ul className="list-unstyled">
//             <li>My Account</li>
//             <li>Cart</li>
//             <li><Link className="text-decoration-none text-black" to='/bloghome'>Blog</Link></li>
//           </ul>
//         </div>

//         <div>
//           <h6 className="fw-bold">INFORMATION</h6>
//           <ul className="list-unstyled">
//             <li>Information</li>
//             <li>Terms & Conditions</li>
//             <li><Link className="text-black text-decoration-none" to='/contact'>Contact Us</Link></li>
//           </ul>
//         </div>

//         <div>
//           <h6 className="fw-bold">GUIDE AND HELP</h6>
//           <ul className="list-unstyled">
//             <li>Career</li>
//             <li>Order Returns</li>
//             <li>FAQs</li>
//           </ul>
//         </div>
//       </div>
//       <hr className=""/>
//       <p className="text-center fw-bold py-3">
//         <i>Copyright ©{currentYear} Chaitir Angina. All Rights Reserved.</i>
//       </p>
//     </div>
//   );
// };

// export default Footer;


import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import i1 from "../../../assets/Bkash-logo.png";
import i2 from "../../../assets/nagad.png";
import i3 from "../../../assets/rocket.png";
import i4 from "../../../assets/Dutch_Bangla_Bank.jpg";
import i5 from "../../../assets/visa-icon.png";
import i6 from "../../../assets/master-card.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const paymentLogos = [i1, i2, i3, i4, i5, i6];

  return (
    <footer className="bg-gray-100 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-10 justify-between">
          {/* About */}
          <div className="flex-1 min-w-[250px]">
            <h2 className="text-3xl font-bold mb-4">
              Chaityr <span className="text-green-600">Angina</span>
            </h2>
            <p className="mb-2">
              Chaityr Angina offers stylish and elegant ladies' clothing. Quality and comfort for every woman.
            </p>
            <p className="flex items-center gap-2 mb-1">
              <FontAwesomeIcon icon={faLocationDot} /> Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faMobileScreen} /> +8801889719728
            </p>
          </div>

          {/* Payment */}
          <div className="flex-1 min-w-[200px]">
            <h6 className="font-bold mb-2">PAYMENT</h6>
            <div className="flex flex-wrap gap-2">
              {paymentLogos.map((logo, idx) => (
                <img key={idx} src={logo} alt="payment-logo" className="h-10 w-auto rounded" />
              ))}
            </div>
          </div>

          {/* User Area */}
          <div className="flex-1 min-w-[150px]">
            <h6 className="font-bold mb-2">USER AREA</h6>
            <ul className="space-y-1">
              <li>My Account</li>
              <li>Cart</li>
              <li>
                <Link to="/bloghome" className="hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="flex-1 min-w-[150px]">
            <h6 className="font-bold mb-2">INFORMATION</h6>
            <ul className="space-y-1">
              <li>Information</li>
              <li>Terms & Conditions</li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Guide & Help */}
          <div className="flex-1 min-w-[150px]">
            <h6 className="font-bold mb-2">GUIDE AND HELP</h6>
            <ul className="space-y-1">
              <li>Career</li>
              <li>Order Returns</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <p className="text-center font-semibold">
          &copy;{currentYear} Chaityr Angina. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
