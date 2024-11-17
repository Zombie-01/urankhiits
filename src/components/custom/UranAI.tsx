"use client";

import React from "react";
import { motion } from "framer-motion";

export const UranAIDemo = () => {
  return (
    <section className="bg-[#FAF8F5] dark:bg-[#FAF8F5]/10 py-12">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        {/* Left Side: Image with Label */}
        <div className="relative w-full lg:w-1/2">
          <img
            src="/images/bedoutreal.png"
            alt="Interior Renovation"
            className="w-full rounded-lg shadow-lg"
          />
          <div className="absolute bottom-4 left-4 bg-black dark:bg-white bg-opacity-70 text-white dark:text-black px-3 py-1 rounded-md text-sm">
            Interior renovation
          </div>
        </div>

        {/* Right Side: Text and Button */}
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0 flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-4">URAN AI</h2>
          <p className="text-gray-600 mb-6">
            Explore Uran AI. Remodel your home in minutes!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Uran AI DEMO
          </motion.button>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center mt-6">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-black rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
