"use client";
import styles from "./style.module.scss";
import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "../anim";
import Body from "./Body";
import Footer from "./Footer";
import Image from "./Image";

const links = [
  {
    title: "Home",
    href: "/",
    src: "hero_1.png",
  },
  {
    title: "Project",
    href: "/#project",
    src: "hero_2.png",
  },
  {
    title: "About Us",
    href: "/#contact",
    src: "hero_3.png",
  },
  {
    title: "Our Service",
    href: "/#ourservice",
    src: "hero_3.png",
  },
  {
    title: "Ai",
    href: "/ai",
    src: "hero_4.png",
  },
  {
    title: "Contact",
    href: "/#contact",
    src: "pub_1.png",
  },
];

export default function Index() {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  });

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
