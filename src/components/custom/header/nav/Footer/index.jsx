import styles from "./style.module.scss";
import { translate } from "../../anim";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Header");
  return (
    <div className={styles.footer}>
      <ul>
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit">
          <span>{t("MADEBY")}:</span>
          {t("URAN")}
        </motion.li>
      </ul>
      <ul>
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit">
          <span>{t("DESIGN")}:</span> {t("URAN")}
        </motion.li>
      </ul>
      <ul>
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit">
          <span>{t("DEVELOPER")}:</span> {t("ZOMBIE")}
        </motion.li>
      </ul>
      <ul>
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit">
          {t("POLICY")}
        </motion.li>
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit">
          {t("TERMS")}
        </motion.li>
      </ul>
    </div>
  );
}
