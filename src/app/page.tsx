"use client";
import ThreeDCardDemo from "@/components/example/3d-card-demo";
import StickyScrollRevealDemo from "@/components/example/sticky-scroll-reveal-demo";
import TextRevealCardPreview from "@/components/example/text-reveal-card-demo";
import InfiniteMovingCardsDemo from "@/components/example/infinite-moving-cards-demo";
import AppleCardsCarouselDemo from "@/components/example/apple-cards-carousel-demo";
import { useEffect, useState } from "react";
import TypewriterLoader from "./loader";
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

      <Hero />
      {/* <div className="container mx-auto">
        <AppleCardsCarouselDemo />
        <InfiniteMovingCardsDemo />
        <TextRevealCardPreview />
        <div id="contact" className="flex  flex-col md:flex-row items-center">
          <StickyScrollRevealDemo />
          <ThreeDCardDemo />
        </div>
      </div> */}
    </>
  );
}
