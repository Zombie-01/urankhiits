import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";
import { useState } from "react";
import { mountAnim, opacity, slideLeft } from "./anim";
import Li from "./Link";

const menu = [
  {
    title: "Interior Design",
    description: "Transforming spaces with personalized designs",
    images: ["/pub_1.png", "/pub_2.png"],
  },
  {
    title: "Architectural Planning",
    description: "Crafting functional and innovative structures",
    images: ["/pub_2.png", "/pub_1.png"],
  },
  {
    title: "Consultation",
    description: "Expert advice for your design and construction needs",
    images: ["/pub_1.png", "/pub_2.png"],
  },
];

export default function Menu({ closeMenu }: any) {
  const [menuIsOpen, setMenuIsOpen] = useState(true);

  return (
    <AnimatePresence>
      {menuIsOpen && (
        <motion.div
          className={`${styles.menu} `}
          variants={opacity}
          initial="initial"
          animate="enter"
          exit="exit">
          <div className={styles.body}>
            {menu.map((el, index) => (
              <Li data={el} index={index} key={index} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
