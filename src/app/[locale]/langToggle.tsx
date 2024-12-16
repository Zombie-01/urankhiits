"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";

import Link, { LinkProps } from "next/link";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const LanguageToggle: React.FC = () => {
  const pathname = usePathname(); // Get current locale

  // Save the selected language in localStorage and update the locale

  return (
    <div className="flex item gap-2 md:gap-3 justify-center">
      <Link href={pathname.replace("mn", "en")}>
        <span
          role="img"
          className={`${pathname.includes("en") ? "font-[600]" : ""}`}
          aria-label="English Flag">
          EN
        </span>
      </Link>
      <span className="h-[24  px] w-[2px] bg-black dark:bg-white"> </span>
      <Link href={pathname.replace("en", "mn")}>
        <span
          role="img"
          className={`${pathname.includes("mn") ? "font-[600]" : ""}`}
          aria-label="Mongolian Flag">
          MN
        </span>
      </Link>
    </div>
  );
};

export default LanguageToggle;
