"use client";
import { useEffect } from "react";
import { useSpring } from "framer-motion";
import Etail from "@/components/custom/projects/etail";
import DESC from "@/components/custom/projects/desc";

const projects = [
  { name: "Dyal Thak", handle: "/hero_1" },
  { name: "Leidinger Matthias", handle: "/hero_2" },
  { name: "Mark Rammers", handle: "/hero_3" },
  { name: "Landon Speers", handle: "/hero_4" },
];

export default function Home() {
  const spring = { stiffness: 150, damping: 15, mass: 0.1 };

  const mousePosition = {
    x: useSpring(0, spring),
    y: useSpring(0, spring),
  };

  const mouseMove = (e: any) => {
    const { clientX, clientY } = e;
    const targetX = clientX - (window.innerWidth / 2) * 0.25;
    const targetY = clientY - (window.innerHeight / 2) * 0.3;
    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);
  };

  return (
    <main onMouseMove={mouseMove} className="relative">
      {projects.map(({ handle }, i) => (
        <Etail mousePosition={mousePosition} handle={handle} key={i} />
      ))}
      <DESC mousePosition={mousePosition} projects={projects} />
    </main>
  );
}
