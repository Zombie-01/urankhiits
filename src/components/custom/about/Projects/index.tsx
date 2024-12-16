import React, { useState, useLayoutEffect, useRef } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    title: "Salar de Atacama",
    src: "/hero_1.png",
  },
  {
    title: "Valle de la luna",
    src: "/hero_2.png",
  },
  {
    title: "Miscanti Lake",
    src: "/hero_3.png",
  },
  {
    title: "Miniques Lagoons",
    src: "/hero_4.png",
  },
];

export default function Project() {
  return (
    <div className={styles.projects}>
      <div className={"flex flex-col md:flex-row  gap-4 md:gap-10"}>
        <div className={"h-full min-h-[400px] relative md:min-w-[40vw]"}>
          <Image
            src={projects[0].src}
            layout="fill"
            objectFit="cover"
            alt="project image"
            className="min-h-[400px]"
            priority={true}
          />
        </div>
        <div className={"flex h-full w-full md:w-1/4 pb-4"}>
          <p className="">
            The flora is characterized by the presence of high elevation
            wetland, as well as yellow straw, broom sedge, tola de agua, and
            tola amaia.
          </p>
        </div>
        <div className={"flex h-full w-full md:w-1/4"}>
          <p className="w-full text-end">
            Some, like the southern viscacha, vicuña, and Darwin's rhea, are
            classified as endangered species. Others, such as Andean goose,
            horned coot, Andean gull, puna tinamou, and the three flamingo
            species inhabiting Chile (Andean flamingo, Chilean flamingo, and
            James's flamingo) are considered vulnerable.
          </p>
        </div>
      </div>

      <div className={styles.projectList}>
        {projects.map((project, index) => (
          <div key={index} className={`${styles.projectEl} border-b`}>
            <h2>{project.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
