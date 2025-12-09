// import CenterImage from "./CenterImage";
// import MainImage from "./MainImage";
// import { products } from "../data/products";
// import Maincard from "./Maincard";
// function Home() {
//   return (
//     <div className="w-full h-full bg-black">
//       <MainImage />
//       <hr className="border-2 border-white ml-10 mr-10 mt-10" />
//       <h1 className="m-10 text-center text-5xl font-extrabold">Food Items</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
//         {products.map((val, i) => (
//           // console.log(val)

//           <Maincard key={i} product={val} />
//         ))}
//       </div>
//       <CenterImage />
//     </div>
//   );
// }

// export default Home;

// ===========

import React from "react";
import CenterImage from "./CenterImage";
import MainImage from "./MainImage";
import { products } from "../data/products";
import Maincard from "./Maincard";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pb-20">
      {/* Hero Section */}
      <div className="relative w-full">
        <MainImage />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end pb-10 pl-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-xl">
            Welcome to Snackify
          </h1>
        </div>
      </div>

      {/* Divider */}
      <div className="flex justify-center mt-16 mb-10">
        <div className="w-3/4 border-t-2 border-orange-500"></div>
      </div>

      {/* Section Title */}
      <h2 className="text-center text-4xl md:text-5xl font-extrabold text-orange-400 mb-10">
        Our Food Items
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-8 md:px-16">
        {products.map((val, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:border-orange-500 hover:shadow-orange-500/20 transition duration-300 hover:-translate-y-1"
          >
            <Maincard product={val} />
          </div>
        ))}
      </div>

      {/* Center Promo Image Section */}
      <div className="mt-20 px-10">
        <CenterImage />
      </div>
    </div>
  );
}
