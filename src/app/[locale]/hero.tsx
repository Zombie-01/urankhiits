"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const t = useTranslations("Hero");

  const items = [
    {
      title: t("innovative"),
      thumbnail: "/pub_1.png"
    },
    {
      title: t("creative"),
      thumbnail: "/pub_2.png"
    }
  ];

  const duration = 9000; // Time for each slide

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, duration);
    return () => clearInterval(interval);
  }, [items.length, duration]);

  return (
    <div
      id="home"
      className="relative h-screen  w-screen overflow-hidden flex items-center bg-black">
      {/* Background Image Slider */}
      {items.map((item, index) => (
        <div
          key={item.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentIndex === index ? "opacity-100 z-10" : "opacity-0"
          }`}>
          <img
            src={item.thumbnail}
            alt={item.title}
            className="object-cover w-full h-full"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-[5]"></div>

      {/* Text Content */}
      <div className="relative container mx-auto w-full z-10 text-start text-white px-4 ">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          {t("headlinePrefix")} <br />
          {t("headlineSuffix")}
        </h1>

        <Link href="/ai">
          <button className="mt-6 py-2 px-8 font-bold border-[2px] border-white text-white rounded-xl  text-xl hover:scale-105 transition-transform">
            {t("buttonText")}
          </button>
        </Link>
      </div>

      <div className="absolute z-20 md:-right-[150px]">
        {" "}
        <div className="w-full h-full max-w-[500px] md:max-w-[700px] flex items-center justify-center">
          <img
            src="/svg.png"
            alt={"svg"}
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-8 flex left-1/2 -translate-x-1/2 space-x-2 z-10">
        {items.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
