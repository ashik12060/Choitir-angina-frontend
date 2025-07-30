import React from "react";
import SideNav from "../SideNav/SideNav";
import Products from "../Products/Products";
import HomeCarousel from "../SideNav/HomeCarousel/HomeCarousel";
import BlogPro from "../../pages/BlogPro";
import TopCarousel from "../Carousel/TopCarousel";
import ProductsShow from "../../pages/ProductsShow";
import ProductByCategory from "../../pages/ProductsByCategory";
import InfoSection from "../InfoSection/InfoSection";
// import ComingSoon from "../ComingSoon/ComingSoon";
// import TopBrands from "../TopBrands/TopBrands";
// import NewArrival from "../NewArrival/NewArrival";
// import Unstitched from "../Unstitched/Unstitched";
// import Stitched from "../Stitched/Stitched";
// import Carousel from "../Carousel/Carousel";

const ProductsLists = ({ searchQuery }) => {
  return (
    <div>
      <div className="">
        
        <TopCarousel />
        
        <ProductByCategory />
        <InfoSection />
        <ProductsShow />
        {/* <ComingSoon /> */}
        {/* <TopBrands />
        <NewArrival />
        <Stitched />
        <Unstitched /> */}
        
    

        <BlogPro searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default ProductsLists;
