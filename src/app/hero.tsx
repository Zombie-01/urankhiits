"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const items = [
    {
      title: "Innovative",
      thumbnail: "/pub_1.png",
      word: "Innovative",
    },
    {
      title: "Creative",
      thumbnail: "/pub_2.png",
      word: "Creative",
    },

    // {
    //   title: "Elegant",
    //   thumbnail: "/publish_3.png",
    //   word: "Elegant",
    // },
  ];

  const duration = 9000; // Time for each slide and word change

  useEffect(() => {
    // Slide interval for updating the current index
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      setProgress(0); // Reset progress when switching slides
    }, duration);

    // Progress bar update
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 100 / (duration / 100); // Sync with slide interval
        }
        return prevProgress;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [items.length, duration]);

  return (
    <div className="h-screen relative w-screen overflow-hidden flex justify-center py-10 sm:py-20 md:py-28 ">
      {/* Image slider */}
      {items.map((item, index) => (
        <div
          key={item.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}>
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      ))}

      {/* Slide controls */}
      {/* <div className="absolute flex gap-4 max-w-[900px] bottom-10 right-10">
        {items.map((item, index) => (
          <div
            key={item.title}
            onClick={() => setCurrentIndex(index)}
            className={`flex z-20 justify-center items-center transition-all ease-in-out border-b cursor-pointer ${
              currentIndex === index
                ? "border-white md:text-2xl max-w-[250px] font-bold px-4 text-white"
                : "max-w-[200px] md:text-xl text-[#f4f4f4]"
            }`}>
            <span className="">{item.title}</span>
          </div>
        ))}
      </div> */}
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

      {/* Word animation */}
      <div className="absolute inset-0 bg-black opacity-60 z-[10]"></div>
      <div className="w-full container z-10 mx-auto text-white flex flex-col gap-4 md:gap-10">
        <div className=" z-20 pb-8 md:pb-12 left-20 top-20 md:px-4">
          {" "}
          <div className="w-full max-w-[100px] h-auto md:max-w-[150px]  flex items-center justify-center">
            <img
              src="/heo_logo.png"
              alt={"svg"}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        <p className="md:px-4 text-bold text-xl md:text-3xl text-white">
          Urankhiits is launching soon!
          <br /> Stay tuned for something exciting
        </p>
        {/* <div className=" flex justify-start items-center px-4">
          <div className="text-4xl font-normal text-neutral-400">
            Build
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
                exit={{
                  opacity: 0,
                  y: -40,
                  x: 40,
                  filter: "blur(8px)",
                  scale: 2,
                  position: "absolute",
                }}
                className="z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2"
                key={items[currentIndex].word}>
                {items[currentIndex].word.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={word + wordIndex}
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: wordIndex * 0.3,
                      duration: 0.3,
                    }}
                    className="inline-block whitespace-nowrap">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={word + letterIndex}
                        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                          delay: wordIndex * 0.3 + letterIndex * 0.05,
                          duration: 0.2,
                        }}
                        className="inline-block text-white">
                        {letter}
                      </motion.span>
                    ))}
                    <span className="inline-block">&nbsp;</span>
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>{" "}
            <br />
            Design with URANKHIITS
          </div>
        </div> */}
        <Link href="/ai">
          <button className="w-min whitespace-nowrap py-2 px-4 text-xl md:text-3xl font-bold uppercase  rounded-sm bg-white text-black mix-blend-screen md:mx-4 ">
            TRY Uran AI
          </button>
        </Link>
      </div>
      <div className="absolute md:px-4 font-semibold z-20 text-white bottom-8 md:bottom-12 left-0">
        <div className="container mx-auto">
          <p className="text-lg md:text-2xl font-bold">
            <span>Contact us: </span>info@urankhiits.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
