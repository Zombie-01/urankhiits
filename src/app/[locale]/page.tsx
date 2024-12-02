"use client";
import ThreeDCardDemo from "@/components/example/3d-card-demo";
import StickyScrollRevealDemo from "@/components/example/sticky-scroll-reveal-demo";
import TextRevealCardPreview from "@/components/example/text-reveal-card-demo";
import AppleCardsCarouselDemo from "@/components/example/apple-cards-carousel-demo";
import { useEffect, useState } from "react";
import TypewriterLoader from "./loader";
import Gallery from "@/components/custom/projects/gallery";
import Hero from "./hero";
import { motion } from "framer-motion";
import Dvider from "@/components/custom/dvider";
import ContactSection from "@/components/custom/contact/ContactSection";
import ZoomParallax from "@/components/custom/zoomparallax";
import FooterHero from "@/components/custom/Footer/FooterHero";
import MaskText from "@/components/custom/mask";
import Aniamted from "@/components/custom/service/section/animated";
import { BannerCards } from "@/components/custom/bannercard/BannerCards";
import OurService from "@/components/custom/service/section/service";
import OurServiceV from "@/components/custom/our-service";
import AboutUs from "@/components/custom/aboutUs";
import { UranAIDemo } from "@/components/custom/UranAI";

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
      {/* <FooterHero
        title="EXPLORING OUR WORLD OF VISUAL AND INTERACTIVE DESIGN."
        word="OUR SERVICE"
        id="ourservice"
      /> */}
      <OurServiceV />
      <UranAIDemo />
      {/* <Aniamted /> */}

      {/* <FooterHero title="EXPLORING OUR PRJECTS." word="PROJECTS" id="project" /> */}
      <Gallery />
      <AboutUs />
    </>
  );
}
