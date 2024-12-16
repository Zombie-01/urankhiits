import React, { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "./style.module.css";

const phrases = [
  "Los Flamencos National Reserve",
  "is a nature reserve located",
  "in the commune of San Pedro de Atacama",
  "The reserve covers a total area",
  "of 740 square kilometres (290 sq mi)",
];

export default function Desc() {
  return (
    <div className={styles.description}>
      {phrases.map((phrase, index) => (
        <AnimatedText key={index}>{phrase}</AnimatedText>
      ))}
    </div>
  );
}

function AnimatedText({ children }: any) {
  const text = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      text.current,
      {
        opacity: 0,
        x: -100, // Start position (off-screen to the left)
      },
      {
        opacity: 1,
        x: 0, // End position (original position)
        scrollTrigger: {
          trigger: text.current,
          scrub: true,
          start: "top 80%", // Adjust to control when the animation starts
          end: "top 50%", // Adjust to control when the animation ends
          toggleActions: "play none none reverse", // Play animation on scroll down, reverse on scroll up
        },
        ease: "power3.out",
        duration: 1, // Duration of the animation
      }
    );
  }, []);

  return <p ref={text}>{children}</p>;
}
