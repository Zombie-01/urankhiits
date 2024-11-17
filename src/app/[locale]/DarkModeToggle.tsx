"use client";
import { motion, Variants } from "framer-motion";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useState, useEffect } from "react";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const containerVariants: Variants = {};

  const iconVariants: Variants = {
    dark: { rotate: 180, color: "#FFD700" },
    light: { rotate: 0, color: "#333" },
  };

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="z-50 flex items-center justify-center  rounded-full "
      animate={isDarkMode ? "dark" : "light"}
      variants={containerVariants}
      transition={{ duration: 0.5 }}>
      <motion.div
        className="flex items-center justify-center"
        variants={iconVariants}
        transition={{ duration: 0.3 }}>
        {isDarkMode ? (
          <IconSun width={20} height={20} />
        ) : (
          <IconMoon width={20} height={20} />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;
