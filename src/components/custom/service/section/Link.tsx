import styles from "./style.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { mountAnim, rotateX } from "./anim";

export default function Li({ data, index }: any) {
  const { title, description, images } = data;
  const outer = useRef(null);
  const inner = useRef(null);

  const manageMouseEnter = (e: any) => {
    const bounds = e.target.getBoundingClientRect();
    if (e.clientY < bounds.top + bounds.height / 2) {
      gsap.set(outer.current, { top: "-100%" });
      gsap.set(inner.current, { top: "100%" });
    } else {
      gsap.set(outer.current, { top: "100%" });
      gsap.set(inner.current, { top: "-100%" });
    }
    gsap.to(outer.current, { top: "0%", duration: 0.3 });
    gsap.to(inner.current, { top: "0%", duration: 0.3 });
  };

  const manageMouseLeave = (e: any) => {
    const bounds = e.target.getBoundingClientRect();
    if (e.clientY < bounds.top + bounds.height / 2) {
      gsap.to(outer.current, { top: "-100%", duration: 0.3 });
      gsap.to(inner.current, { top: "100%", duration: 0.3 });
    } else {
      gsap.to(outer.current, { top: "100%", duration: 0.3 });
      gsap.to(inner.current, { top: "-100%", duration: 0.3 });
    }
  };

  return (
    <motion.div
      onMouseEnter={(e) => {
        manageMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        manageMouseLeave(e);
      }}
      variants={rotateX}
      {...mountAnim}
      custom={index}
      className={`${styles.el} border-b`}>
      <div className="text-[8vw]">{title}</div>
      <div ref={outer} className={styles.outer}>
        <div ref={inner} className={styles.inner}>
          {[...Array(2)].map((_, index) => {
            return (
              <Link key={index} href="/ourservice" className={styles.container}>
                <div className={styles.imageContainer}>
                  <Image src={`${images[0]}`} fill alt="image" />
                </div>
                <p>{description}</p>
                <div className={styles.imageContainer}>
                  <Image src={`${images[1]}`} fill alt="image" />
                </div>
                <p>{description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
