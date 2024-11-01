"use client";
import styles from "./style.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { opacity, background } from "./anim";
import Nav from "./nav";
import Logo from "@/app/logo";
import DarkModeToggle from "@/app/DarkModeToggle";
import { useParams, usePathname } from "next/navigation";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const path = usePathname();
  useEffect(() => {
    console.log(path);
    setIsActive(false);
  }, [path]);

  return (
    <div
      className={`${styles.header} relative z-[9999999999] bg-[#f4f0ea] dark:bg-black`}>
      <Logo />
      <div className={styles.bar}>
        <div
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={styles.el}>
          <div
            onClick={() => {
              setIsActive(!isActive);
            }}
            className={`${
              styles.burger
            } before:bg-black after:bg-black before:dark:bg-white after:dark:bg-white ${
              isActive ? styles.burgerActive : ""
            }`}></div>
          <div className={styles.label}>
            <motion.p
              variants={opacity}
              animate={!isActive ? "open" : "closed"}>
              Menu
            </motion.p>
            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>
              Close
            </motion.p>
          </div>
        </div>
        <motion.div
          variants={opacity}
          animate={!isActive ? "open" : "closed"}
          className={styles.shopContainer}>
          <DarkModeToggle />
        </motion.div>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className={styles.background}></motion.div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </div>
  );
}
