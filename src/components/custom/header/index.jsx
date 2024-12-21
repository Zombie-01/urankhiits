"use client";
import { useEffect, useState } from "react";
import Logo from "@/app/[locale]/logo";
import DarkModeToggle from "@/app/[locale]/DarkModeToggle";
import LanguageToggle from "@/app/[locale]/langToggle";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { usePathname, useSearchParams } from "next/navigation";
import { supabase } from "../../../../utils/supabase/client";

export default function Header() {
  const t = useTranslations("Header");
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To control the dropdown
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the logged-in user when the component mounts
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user);
      }
    );
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    setUser(null); // Reset the user state on logout
  };
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
      <div className="flex justify-between items-center">
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
              }  text-[16px]`}>
              {link.title}
              {fullPath.includes(link.href?.replaceAll("/#", "#")) && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full h-[3px] w-[34px] bg-[#dfdfdf]"></span>
              )}
            </Link>
          ))}
          <DarkModeToggle />
          <LanguageToggle />
          {user?.user_metadata?.avatar_url && (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img
                  src={user?.user_metadata?.avatar_url}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-black shadow-lg rounded-md w-[200px]">
                  <Link
                    href="/client"
                    className="block text-black dark:text-white px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-black dark:text-white px-4 py-2 w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col md:hidden dark:bg-black mt-4 gap-2 p-4 ">
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
          {user?.user_metadata?.avatar_url && (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img
                  src={user?.user_metadata?.avatar_url}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-black shadow-lg rounded-md w-[200px]">
                  <Link
                    href="/client"
                    className="block text-black dark:text-white px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-black dark:text-white px-4 py-2 w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
