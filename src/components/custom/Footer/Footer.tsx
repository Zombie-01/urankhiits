"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  IconChevronUp,
  IconShare,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTwitter
} from "@tabler/icons-react";
import SlideText from "../UI/SlideText";
import Logo from "@/app/[locale]/logo";

export const Footer = () => {
  const backToTop = () => {
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <footer className=" py-12 bg-[#E6E6E6] dark:bg-[#E6E6E6]/10" id="contact">
      {/* Top Section */}
      <div className="container mx-auto flex flex-wrap justify-between  items-center px-4">
        {/* Logo and Tagline */}
        <div className="flex flex-col w-full md:w-3/5 pr-8 space-y-2">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="h-[80px] w-[1px] bg-black dark:bg-white"></span>
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
        <div className="w-full md:w-2/5 flex gap-8">
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
    </footer>
  );
};
