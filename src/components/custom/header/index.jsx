"use client";
import styles from "./style.module.scss";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { opacity, background } from "./anim";
import Nav from "./nav";
import Logo from "@/app/[locale]/logo";
import DarkModeToggle from "@/app/[locale]/DarkModeToggle";
import { useParams, usePathname } from "next/navigation";
import LanguageToggle from "@/app/[locale]/langToggle";
import { useTranslations } from "next-intl";

export default function Header() {
  const { data: session, status } = useSession();
  const t = useTranslations("Header");
  const [isActive, setIsActive] = useState(false);
  const path = usePathname();
  useEffect(() => {
    setIsActive(false);
  }, [path]);

  console.log(session?.user?.image);
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
              {t("MENU")}
            </motion.p>
            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>
              {t("CLOSE")}
            </motion.p>
          </div>
        </div>
        <motion.div
          variants={opacity}
          animate={!isActive ? "open" : "closed"}
          className={styles.shopContainer}>
          <DarkModeToggle />
          <LanguageToggle />
          {session?.user?.image && (
            <motion.div
              variants={opacity}
              animate={!isActive ? "open" : "closed"}
              className={""}>
              <img
                src={session?.user?.image}
                alt
                className=" w-6 h-6 sm:w-8 sm:h-8 rounded-full"
              />
            </motion.div>
          )}
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