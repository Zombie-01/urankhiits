import styles from "./style.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Etail({ mousePosition, handle }: any) {
  const { x, y } = mousePosition;

  return (
    <div className={styles.gallery}>
      <div className={styles.imageContainer}>
        <Image src={`${handle}.png`} alt="image" fill />
      </div>
      <motion.div className={styles.vignette} style={{ x, y }}>
        <Image src={`${handle}.png`} alt="image" fill />
      </motion.div>
    </div>
  );
}
