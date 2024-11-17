"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  IconChevronUp,
  IconShare,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
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
    <footer className="bg-gray-100 py-12">
      {/* Top Section */}
      <div className="container mx-auto flex flex-wrap justify-between  items-center px-4">
        {/* Logo and Tagline */}
        <div className="flex flex-col w-3/5 pr-8 space-y-2">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="Urankhiits Logo"
              className="h-auto w-[130px] object-contain"
            />
            <span className="h-[80px] w-[1px] bg-black"></span>
            <div className="ml-3">
              <h3 className="text-lg font-bold uppercase">URANKHIITS</h3>
              <p className="text-sm">Interior & Lighting</p>
            </div>
          </div>
          <p className="text-sm">Build Innovative Design with URANKHIITS</p>
          <img
            src="/Bg assets/For ai bg bl 2.png"
            alt="Urankhiits Logo"
            className="h-[80px] w-full  object-cover"
          />
        </div>

        {/* Navigation Links */}
        <div className="sm:w-2/5 flex gap-8">
          <div className="flex flex-col space-y-2 text-sm">
            <h4 className="font-semibold">Холбоосууд</h4>
            <ul className="space-y-1">
              <li>
                <a href="#services" className="hover:underline">
                  Our Service
                </a>
              </li>
              <li>
                <a href="#uran-ai" className="hover:underline">
                  Uran AI
                </a>
              </li>
              <li>
                <a href="#about-us" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:underline">
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-2 text-sm">
            <h4 className="font-semibold">Холбоо барих</h4>
            <p>
              Улаанбаатар хот, Хан уул дүүрэг 11-р хороо, Чингисийн өргөн
              чөлөө-61 Оргил стадион, 1 тоот
            </p>
            <p>+976 9901-7905</p>
            <p>contact@urankhiits.mn</p>
            <div className="flex space-x-4 mt-2">
              <a href="#" aria-label="Facebook">
                <IconBrandFacebook size={20} />
              </a>
              <a href="#" aria-label="Instagram">
                <IconBrandInstagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <IconBrandLinkedin size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <IconBrandTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto mt-8 px-4 text-center">
        <div className="flex justify-between items-center border-t border-gray-300 pt-4">
          <motion.div
            className="flex items-center cursor-pointer"
            onClick={backToTop}
            whileHover={{ scale: 1.1 }}>
            <IconChevronUp size={20} />
            <SlideText text="Back to Top" styleClass={"ml-2 text-sm"} />
          </motion.div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} URANKHIITS. All rights reserved.
          </p>
          <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
            <IconShare size={20} />
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
