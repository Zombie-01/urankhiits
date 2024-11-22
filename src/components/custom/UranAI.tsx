"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

export const UranAIDemo = () => {
  const slides = [
    {
      image: "/images/bedoutreal.png",
      label: "Interior Renovation",
      heading: "URAN AI",
      description: "Explore Uran AI. Remodel your home in minutes!",
      buttonText: "Uran AI DEMO",
    },
    {
      image: "/images/bedoutreal.png", // Replace with another image
      label: "Living Room Makeover",
      heading: "URAN AI",
      description: "Explore Uran AI. Remodel your home in minutes!",
      buttonText: "Uran AI DEMO",
    },
    {
      image: "/images/bedoutreal.png", // Replace with your next image
      label: "Modern Kitchen Design",
      heading: "URAN AI",
      description: "Explore Uran AI. Remodel your home in minutes!",
      buttonText: "Uran AI DEMO",
    },
  ];
  return (
    <section className=" relative flex flex-col justify-center items-center min-h-[750px] py-12">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        {/* Left Side: Image with Label */}
        <div className="w-full  lg:w-1/2">
          <h2 className="text-[48px] font-bold mb-4">URAN AI</h2>
          <div className="relative flex overflow-hidden gap-4 w-full">
            {slides?.map((slide) => (
              <img
                key={slide.buttonText}
                src={slide.image}
                alt="Interior Renovation"
                className="w-full rounded-lg shadow-lg"
              />
            ))}
            <div className="absolute bottom-4 left-4 bg-black dark:bg-white bg-opacity-70 text-white dark:text-black px-3 py-1 rounded-md text-sm">
              Interior renovation
            </div>
          </div>
        </div>
        {/* Right Side: Text and Button */}
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0 flex flex-col items-start justify-end">
          <Link
            href="/ai"
            className="bg-black text-white px-6 py-3 rounded-full z-[21]">
            Uran AI DEMO
          </Link>
          <p className="text-gray-600 mb-6">
            Explore Uran AI. <br />
            Remodel your home in minutes!
          </p>
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
      <div className="absolute z-20 top-0 md:-right-[150px]">
        <div className="w-full h-full max-w-[500px] md:max-w-[700px] flex items-center justify-center">
          <img
            src="/svg.png"
            alt={"svg"}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};
