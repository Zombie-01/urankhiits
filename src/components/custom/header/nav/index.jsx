"use client";
import styles from "./style.module.scss";
import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "../anim";
import Body from "./Body";
import Footer from "./Footer";
import Image from "./Image";
import { useTranslations } from "next-intl";

export default function Index() {
  const t = useTranslations("Header");
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  });
  const links = [
    {
      title: t("HOME"),
      href: "/",
      src: "hero_1.png",
    },
    {
      title: t("PROJECTS"),
      href: "/#project",
      src: "hero_2.png",
    },
    {
      title: t("ABOUTUS"),
      href: "/#contact",
      src: "hero_3.png",
    },
    {
      title: t("OURSERVICE"),
      href: "/#ourservice",
      src: "hero_3.png",
    },
    {
      title: t("AI"),
      href: "/ai",
      src: "hero_4.png",
    },
    {
      title: t("CONTACT"),
      href: "/#contact",
      src: "pub_1.png",
    },
  ];

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
          />
          <Footer />
        </div>
        <Image
          src={links[selectedLink.index].src}
          isActive={selectedLink.isActive}
        />
      </div>
    </motion.div>
  );
}
