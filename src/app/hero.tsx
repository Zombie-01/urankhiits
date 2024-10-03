"use client";
import FlipWordsDemo from "@/components/example/flip-words-demo";
import { useEffect, useState } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Moonbeam",
      thumbnail: "/hero_1.png",
    },
    {
      title: "Cursor",
      thumbnail: "/hero_2.png",
    },
    {
      title: "Rogue",
      thumbnail: "/hero_3.png",
    },

    {
      title: "Editorially",
      thumbnail: "/hero_4.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 9000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);
  return (
    <div className="h-screen  relative w-screen flex justify-center items-center max-h-[1140px]">
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}>
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={slide.thumbnail}
              alt={slide.title}
              className="object-cover  w-full h-full"
            />
          </div>
        </div>
      ))}
      <div className="absolute inset-0 bg-black opacity-60 z-[10]"></div>
      <div className="w-full container z-10 mx-auto  ">
        <FlipWordsDemo />
      </div>
    </div>
  );
};

export default Hero;
