import React from "react";

// Example brand data (replace with dynamic data if needed)
const brands = [
  { id: 1, name: "Agha Noor", image: require("../../assets/1.jpg") },
  { id: 2, name: "Maria.B.", image: require("../../assets/2.jpg") },
  { id: 3, name: "Iznik", image: require("../../assets/3.jpg") },
  { id: 4, name: "Mushq", image: require("../../assets/4.jpg") },
  { id: 5, name: "Azure", image: require("../../assets/5.jpg") },
  { id: 6, name: "Other Brand", image: require("../../assets/photo.jpg") },
];

const Unstitched = () => {
  return (
    <div className="container mx-auto px-10 py-8 bg-[#f6fcf8]">
      <h2 className="text-2xl font-bold text-center mb-6">UNSTITCHED</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {brands.map((brand) => (
        
        <div className="bg-white border-2 border-[#d5c085] rounded-lg shadow-md w-full h-[350px] flex items-center justify-center">
        <img
          src={brand.image}
          alt={brand.name}
          className="h-full w-auto  rounded-lg"
        />
        
      </div>
        ))}
      </div>
    </div>
  );
};

export default Unstitched;
