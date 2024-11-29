"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Link } from "@/i18n/routing";
import { clamp } from "lodash";

export const UranAIDemo = () => {
  const constraintsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);

  const [containerWidth, setContainerWidth] = useState(0);
  const slides = [
    {
      image: "/images/bedoutreal.png",
      label: "Interior Renovation",
      heading: "URAN AI",
      description: "Explore Uran AI. Remodel your home in minutes!",
      buttonText: "Uran AI DEMO"
    },
    {
      image: "/images/bedoutreal.png", // Replace with another image
      label: "Living Room Makeover",
      heading: "URAN AI",
      description: "Explore Uran AI. Remodel your home in minutes!",
      buttonText: "Uran AI DEMO"
    },
    {
      image: "/images/bedoutreal.png", // Replace with your next image
      label: "Modern Kitchen Design",
      heading: "URAN AI",
      description: "Explore Uran AI. Remodel your home in minutes!",
      buttonText: "Uran AI DEMO"
    }
  ];

  useEffect(() => {
    if (constraintsRef.current) {
      setContainerWidth((constraintsRef.current as any).offsetWidth);
    }
    const handleResize = () => {
      if (constraintsRef.current) {
        setContainerWidth((constraintsRef.current as any).offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dragEndHandler = (_: any, info: { offset: { x: number } }) => {
    const direction = info.offset.x < 0 ? 1 : -1;
    const newIndex = clamp(currentIndex + direction, 0, slides.length - 1);
    setCurrentIndex(newIndex);
  };

  return (
    <section className=" relative flex flex-col justify-center items-center min-h-[750px] py-12">
      <div className="container mx-auto px-4 flex flex-wrap justify-start gap-4  items-center">
        {/* Left Side: Image with Label */}
        <div
          ref={constraintsRef}
          className="w-full h-full overflow-hidden lg:w-1/2">
          <h2 className="text-[48px] font-bold mb-4">URAN AI</h2>
          <motion.div
            drag="x"
            onDragEnd={dragEndHandler}
            dragConstraints={{
              left: -containerWidth * (slides.length - 1),
              right: 0
            }}
            animate={{ x: -containerWidth * currentIndex }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ x }}
            className="relative flex w-full">
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
          </motion.div>
          {/* Carousel Dots */}
          <div className="flex gap-2 my-4 md:gap-4 justify-center">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-[60px] h-[6px] rounded-full ${
                  currentIndex === index ? "bg-blue-500" : "bg-[#D9D9D9]"
                }`}
                onClick={() => setCurrentIndex(index)}></button>
            ))}
          </div>
        </div>
        {/* Right Side: Text and Button */}
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0 flex flex-col gap-4 md:gap-6 items-start justify-end">
          <Link
            href="/ai"
            className="border-black font-bold dark:border-white border px-6 py-3 rounded-[12px] z-[21]">
            Uran AI DEMO
          </Link>
          <div>
            <p className="text-gray-600 ">
              Explore{" "}
              <span className="text-black dark:text-white"> Uran AI.</span>
            </p>
            <p className="text-gray-600 ">Remodel your home in minutes!</p>
          </div>
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
