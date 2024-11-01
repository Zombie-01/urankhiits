"use client";
import React from "react";
import { motion } from "framer-motion";
import { IconChevronUp, IconShare } from "@tabler/icons-react";
import SlideText from "../UI/SlideText";

export const Footer = () => {
  const backToTop = () => {
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className="min-h-[4rem] container flex items-center justify-between 
    sm:mt-[2rem]  md:mt-[2rem]   lg:mt-[12rem] xl:mt-[12rem] 
    bottom-0 left-0 right-0  w-full 
    box-border cursor-pointer  z-10 ">
      <div
        //    className="flex items-center text-[1rem] min-w-[10rem]"
        className="flex items-center 
            xs:text-sm sm:text-sm md:text-base lg:text-lg xl:text-[1rem] 
            min-w-[5rem] sm:min-w-[7rem] md:min-w-[9rem] lg:min-w-[10rem]"
        onClick={backToTop}>
        <motion.div
          className="w-full h-full pointer-events-auto scale: hover:scale-130 transition-transform"
          whileHover={{ scale: 1.3 }}>
          <IconChevronUp />
        </motion.div>
        <SlideText text="Back Top" styleClass={"footer"} />
      </div>

      <div className="text-center text-[10px] sm:text-[0.9rem]  mt-1 tracking-tighter ">
        {new Date().getFullYear()} &copy; &nbsp;
        <motion.span
          initial="initial"
          whileHover="hovered"
          variants={{
            initial: { textDecoration: "none" },
            hovered: { textDecoration: "underline" },
          }}>
          URANKHIITS
        </motion.span>
        . All rights reserved.
      </div>

      {/* <motion.div >ClatPat
      <motion.span
        className="w-full h-0.5 bg-white"
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.5 }}
      >
      
      </motion.span>
    </motion.div> */}

      <motion.div
        initial="initial"
        whileHover="hovered"
        className="sm:flex hidden flex-col items-center text-sm -mr-12">
        <motion.div
          variants={{
            initial: { translateY: 0 },
            hovered: { translateX: 50, translateY: -30 },
          }}
          className="flex items-center justify-end">
          <span className="mr-6 text-[1rem] mt-1 tracking-tight ">
            Follow Us
          </span>

          <motion.span
            variants={{
              initial: { opacity: 1 },
              hovered: { opacity: 0 },
            }}>
            <IconShare />
          </motion.span>
        </motion.div>

        <motion.div
          variants={{
            initial: { opacity: 0, height: 0 },
            hovered: { opacity: 1, height: "auto", translateY: -20 },
          }}
          className="flex mt-2">
          {["In", "Fb", "Be", "Tw", "Db"].map((e) => (
            <motion.p
              whileHover={{ scale: 1.3, y: -3 }}
              key={e}
              className="mr-8 text-[0.9rem] mt-1 tracking-tight ">
              {e}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
