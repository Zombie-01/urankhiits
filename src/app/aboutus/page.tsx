"use client";
import Desc from "@/components/custom/about/Description";
import Intro from "@/components/custom/about/Intro";
import Project from "@/components/custom/about/Projects";
import { useEffect } from "react";

export default function AboutUs() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <main className=" relative ">
      <Intro />
      <Desc />
      <Project />
    </main>
  );
}
