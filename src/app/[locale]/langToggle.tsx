"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";

import Link, { LinkProps } from "next/link";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const LanguageToggle: React.FC = () => {
  const locale = useLocale(); // Get current locale
  const pathname = usePathname(); // Get current locale
  const [currentLocale, setCurrentLocale] = useState<string>(locale || "en");

  // Save the selected language in localStorage and update the locale
  const changeLanguage = (newLocale: string) => {
    setCurrentLocale(newLocale);
    localStorage.setItem("language", newLocale);
  };

  useEffect(() => {
    const savedLocale = localStorage.getItem("language");
    if (savedLocale && savedLocale !== locale) {
      changeLanguage(savedLocale);
    }
  }, [locale]);

  const containerVariants: Variants = {};

  const iconVariants: Variants = {
    en: { rotate: 180, color: "#FFD700" },
    mn: { rotate: 0, color: "#333" },
  };

  return (
    <motion.button
      onClick={() => changeLanguage(currentLocale === "en" ? "mn" : "en")}
      className="z-50 flex items-center justify-center rounded-full"
      aria-label={`Switch to ${
        currentLocale === "en" ? "Mongolian" : "English"
      }`}
      animate={currentLocale === "en" ? "dark" : "light"}
      variants={containerVariants}
      transition={{ duration: 0.5 }}>
      <motion.div
        className="flex items-center justify-center"
        variants={iconVariants}
        transition={{ duration: 0.3 }}>
        <Link
          href={pathname.replace(
            currentLocale,
            currentLocale === "en" ? "mn" : "en"
          )}>
          {currentLocale === "en" ? (
            <span role="img" aria-label="English Flag">
              EN
            </span>
          ) : (
            <span role="img" aria-label="Mongolian Flag">
              🇲🇳
            </span>
          )}
        </Link>
      </motion.div>
    </motion.button>
  );
};

export default LanguageToggle;
