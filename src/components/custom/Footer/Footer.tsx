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
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("Header");

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
    <footer className="py-12 bg-[#E6E6E6] dark:bg-[#E6E6E6]/10" id="contact">
      {/* Top Section */}
      <div className=" flex w-full items-center gap-10 flex-col sm:flex-row">
        {/* Logo and Tagline */}
        <div className="flex flex-col w-full items-end gap-4">
          <div className="flex px-4 md:px-0 flex-col w-full md:w-3/5 max-w-[500px] pr-8 space-y-2">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="h-[80px] w-[1px] bg-black dark:bg-white"></span>
              <div className="ml-3">
                <h3 className="text-lg font-bold uppercase">{t("URAN")}</h3>
                <p className="text-sm">{t("DESIGN")}</p>
              </div>
            </div>
            <p className="text-sm">
              {t("MADEBY")} {t("URAN")}
            </p>
          </div>
          <img
            src="/bg-assets/one.png"
            alt={t("URAN")}
            className="h-[80px] w-full object-cover"
          />
        </div>
        {/* Navigation Links */}
        <div className="w-full justify-start md:max-w-2/5 px-4 md:px-0 flex gap-8">
          <div className="flex flex-col space-y-2 min-w-[100px] text-sm">
            <h4 className="font-semibold">{t("MENU")}</h4>
            <ul className="space-y-1 text-[#727272]">
              <li>
                <a href="#services" className="hover:underline">
                  {t("OURSERVICE")}
                </a>
              </li>
              <li>
                <a href="#uran-ai" className="hover:underline">
                  {t("AI")}
                </a>
              </li>
              <li>
                <a href="#about-us" className="hover:underline">
                  {t("ABOUTUS")}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:underline">
                  {t("PROJECTS")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-2 text-sm">
            <h4 className="font-semibold">{t("CONTACT")}</h4>
            <p className="text-[#727272]">{t("PIN")}</p>
            <p className="text-[#727272]">88943939 , 9901 2105</p>
            <p className="text-[#727272]">info@urankhiits.com</p>
            <div className="flex space-x-4 mt-2 text-[#727272]">
              <a
                href="https://www.facebook.com/profile.php"
                target="_blank"
                aria-label="Facebook">
                <IconBrandFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/urankhiits.llc?"
                target="_blank"
                aria-label="Instagram">
                <IconBrandInstagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/uran-khiits-llc"
                target="_blank"
                aria-label="LinkedIn">
                <IconBrandLinkedin size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/uran-khiits-llc"
                target="_blank"
                aria-label="Twitter">
                <IconBrandTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
