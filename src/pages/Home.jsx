import React from "react";
import CenterImage from "./CenterImage";
import MainImage from "./MainImage";
import { products } from "../data/products";
import Maincard from "./Maincard";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pb-20">
      <div className="relative w-full">
        <div className="relative z-10">
          <MainImage />
        </div>

        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 to-transparent flex items-end pb-10 pl-10">
          <motion.h1
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-xl"
          >
            Welcome to Snackify
          </motion.h1>
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
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-8 md:px-16"
      >
        {products.map((val, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:border-orange-500 hover:shadow-orange-500/20 transition duration-300 hover:-translate-y-1"
          >
            <Maincard product={val} />
          </div>
        ))}
      </motion.div>

      {/* Center Promo Image Section */}
      <div className="mt-20 px-10">
        <CenterImage />
      </div>
    </div>
  );
}
