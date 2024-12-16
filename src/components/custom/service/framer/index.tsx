"use client";
import { useRef } from "react";
import styles from "./style.module.scss";
import Picture1 from "../../../../../public/hero_1.png";
import Picture2 from "../../../../../public/hero_2.png";
import Picture3 from "../../../../../public/hero_3.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Framer({
  word,
  title,
  title_2,
}: {
  word: string;
  title: string;
  title_2: string;
}) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const sm = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const md = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const lg = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const images = [
    {
      src: Picture1,
      y: 0,
    },
    {
      src: Picture2,
      y: lg,
    },
    {
      src: Picture3,
      y: md,
    },
  ];

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.body}>
        <motion.h1 style={{ y: sm }}>{title}</motion.h1>
        <h1>{title_2}</h1>
        <div className={styles.word}>
          <p>
            {word.split("").map((letter, i) => {
              const y = useTransform(
                scrollYProgress,
                [0, 1],
                [0, Math.floor(Math.random() * -10) - 5]
              );
              return (
                <motion.span
                  style={{ top: y }}
                  className="max-w-[50vw]"
                  key={`l_${i}`}>
                  {letter}
                </motion.span>
              );
            })}
          </p>
        </div>
      </div>
      <div className={styles.images}>
        {images.map(({ src, y }, i) => {
          return (
            <motion.div
              style={{ y }}
              key={`i_${i}`}
              className={styles.imageContainer}>
              <Image src={src} placeholder="blur" alt="image" fill />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
