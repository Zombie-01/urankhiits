"use client";
import React, { useLayoutEffect, useRef } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Index() {
  const background = useRef(null);
  const introImage = useRef(null);
  const homeHeader = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: "top",
        end: "+=500px",
      },
    });

    timeline
      .fromTo(
        background.current,
        { scale: 1 }, // Initial scale
        { scale: 1.2, ease: "power3.out" } // Zoom to scale 1.2
      )
      .to(introImage.current, { height: "200px" }, 0);
  }, []);

  return (
    <div ref={homeHeader} className={styles.homeHeader}>
      <div
        className={"w-screen h-[50vh] md:h-[140vh] absolute"}
        ref={background}>
        <Image
          src={"/publish_2.png"}
          layout="fill"
          objectFit="cover"
          alt="background image"
          priority={true}
        />
      </div>
      <div className={styles.intro}>
        <div
          ref={introImage}
          data-scroll
          data-scroll-speed="0.3"
          className={styles.introImage}>
          <Image
            src={"/publish_2.png"}
            alt="intro image"
            layout="fill"
            objectFit="contain"
            priority={true}
          />
        </div>
        <h1 data-scroll data-scroll-speed="0.7" className="text-white">
          ABOUT US
        </h1>
      </div>
    </div>
  );
}
