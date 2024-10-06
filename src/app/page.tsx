"use client";
import FloatingNavDemo from "@/components/example/floating-navbar-demo";
import HeroParallaxDemo from "@/components/example/hero-parallax-demo";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";
import DarkModeToggle from "./DarkModeToggle";
import FloatingDockDemo from "@/components/example/floating-dock-demo";
import ParallaxScrollDemo from "@/components/example/parallax-scroll-demo";
import ThreeDCardDemo from "@/components/example/3d-card-demo";
import StickyScrollRevealDemo from "@/components/example/sticky-scroll-reveal-demo";
import TextRevealCardPreview from "@/components/example/text-reveal-card-demo";
import InfiniteMovingCardsDemo from "@/components/example/infinite-moving-cards-demo";
import AppleCardsCarouselDemo from "@/components/example/apple-cards-carousel-demo";
import { useEffect, useState } from "react";
import TypewriterLoader from "./loader";
import Logo from "./logo";
import ExpandableCardDemo from "@/components/blocks/expandable-card-demo-standard";
import AnimatedModalDemo from "@/components/example/animated-modal-demo";
import Hero from "./hero";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loader after 4 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4000);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div
        className={`fixed top-0 bg-white dark:bg-black ${
          showLoader ? "opacity-100 z-[99999999]" : "opacity-0 z-[-1000]"
        } left-0 right-0 bottom-0 z-10 transition-opacity duration-500 ease-in-out`}>
        <TypewriterLoader />
      </div>
      <DarkModeToggle />
      <Logo />
      <FloatingNavDemo />
      <Hero />
      <AnimatedModalDemo />
      <div className="container mx-auto">
        <AppleCardsCarouselDemo />
        <TextRevealCardPreview />
        <div id="contact" className="flex  flex-col md:flex-row items-center">
          <StickyScrollRevealDemo />
          <ThreeDCardDemo />
        </div>
      </div>
    </>
  );
}
