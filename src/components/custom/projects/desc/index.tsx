import { useState } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DESC({ mousePosition, projects }: any) {
  const [index, setIndex] = useState(0);
  const { x, y } = mousePosition;

  return (
    <div className={styles.description}>
      <div className={styles.descriptionContainer}>
        {projects.map(({ name }: any, i: number) => {
          return (
            <p
              onMouseOver={() => {
                setIndex(i);
              }}
              key={`p${i}`}>
              {name}
            </p>
          );
        })}
      </div>
      <motion.div className={styles.vignette} style={{ x, y }}>
        <Image src={`${projects[index].handle}.png`} alt="image" fill />
      </motion.div>
    </div>
  );
}
