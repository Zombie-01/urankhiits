"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Logo from "@/app/[locale]/logo";
import DarkModeToggle from "@/app/[locale]/DarkModeToggle";
import LanguageToggle from "@/app/[locale]/langToggle";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { usePathname, useSearchParams } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const t = useTranslations("Header");
  const path = usePathname();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { title: t("ABOUTUS"), href: "/#aboutus", src: "hero_3.png" },
    { title: t("OURSERVICE"), href: "/#ourservice", src: "hero_3.png" },
    { title: t("PROJECTS"), href: "/project", src: "hero_2.png" },
    { title: t("AI"), href: "/ai", src: "hero_4.png", className: true },
    { title: t("CONTACT"), href: "/#contact", src: "pub_1.png" }
  ];

  const fullPath = `${path}${
    searchParams.toString() ? "?" + searchParams.toString() : ""
  }`;

  return (
    <div className="fixed w-full bg-white opacity-[91%] dark:bg-black p-4 z-[99999999] shadow-md">
      <div className="flex justify-between items-center ">
        <Logo />
        {/* Burger Menu */}
        <button
          className="md:hidden text-black dark:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="space-y-1">
            <span
              className={`block h-1 w-6 bg-black dark:bg-white transition-transform ${
                isMenuOpen ? "rotate-45 translate-y-[0.50rem]" : ""
              }`}></span>
            <span
              className={`block h-1 w-6 bg-black dark:bg-white transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}></span>
            <span
              className={`block h-1 w-6 bg-black dark:bg-white transition-transform ${
                isMenuOpen ? "-rotate-45 -translate-y-[0.50rem]" : ""
              }`}></span>
          </div>
        </button>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link, index) => (
            <Link
              key={`l_${index}`}
              href={link.href}
              className={`text-black relative dark:text-white ${
                link.className ? " font-aeonikBold font-bold" : "font-aeonik"
              }  text-[16px]  `}>
              {link.title}
              {fullPath.includes(link.href?.replaceAll("/#", "#")) && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full h-[3px] w-[34px] bg-[#dfdfdf]"></span>
              )}
            </Link>
          ))}
          <DarkModeToggle />
          <LanguageToggle />
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt="User Profile"
              className="w-8 h-8 rounded-full"
            />
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col md:hidden  dark:bg-black mt-4 gap-2 p-4 ">
          {links.map((link, index) => (
            <Link
              key={`m_${index}`}
              href={link.href}
              className={`text-black dark:text-white text-[14px] ${
                link.className ? " font-aeonikBold font-bold" : "font-aeonik"
              } hover:underline ${path.includes(link.href) && ""}`}
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              {link.title}
            </Link>
          ))}
          <div className="flex gap-4 mt-4">
            <DarkModeToggle />
            <LanguageToggle />
          </div>
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt="User Profile"
              className="w-8 h-8 rounded-full"
            />
          )}
        </div>
      )}
    </div>
  );
}
