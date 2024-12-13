import React from "react";
import SideNav from "../SideNav/SideNav";
import Products from "../Products/Products";
import HomeCarousel from "../SideNav/HomeCarousel/HomeCarousel";
import BlogPro from "../../pages/BlogPro";
import TopCarousel from "../Carousel/TopCarousel";
import ComingSoon from "../ComingSoon/ComingSoon";
import TopBrands from "../TopBrands/TopBrands";
import NewArrival from "../NewArrival/NewArrival";
import Unstitched from "../Unstitched/Unstitched";
// import Carousel from "../Carousel/Carousel";

const ProductsLists = ({ searchQuery }) => {
  return (
    <div>
      <div className="">
        {/* <Carousel /> */}
        {/* <HomeCarousel className="pb-2" /> */}
        <TopCarousel />
        <ComingSoon />
        <TopBrands />
        <NewArrival />
        <Unstitched />
        <BlogPro searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default ProductsLists;
