"use client";
import ThreeDCardDemo from "@/components/example/3d-card-demo";
import StickyScrollRevealDemo from "@/components/example/sticky-scroll-reveal-demo";
import TextRevealCardPreview from "@/components/example/text-reveal-card-demo";
import InfiniteMovingCardsDemo from "@/components/example/infinite-moving-cards-demo";
import AppleCardsCarouselDemo from "@/components/example/apple-cards-carousel-demo";
import { useEffect, useState } from "react";
import TypewriterLoader from "./loader";
import Hero from "./hero";
import { motion } from "framer-motion";
import Dvider from "@/components/custom/dvider";
import ContactSection from "@/components/custom/contact/ContactSection";
import ZoomParallax from "@/components/custom/zoomparallax";
import FooterHero from "@/components/custom/Footer/FooterHero";
import MaskText from "@/components/custom/mask";
import Aniamted from "@/components/custom/service/section/animated";
import { BannerCards } from "@/components/custom/bannercard/BannerCards";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  // useEffect(() => {
  //   // Set a timeout to hide the loader after 4 seconds
  //   const timer = setTimeout(() => {
  //     setShowLoader(false);
  //   }, 4000);

  //   // Cleanup the timer when the component is unmounted
  //   return () => clearTimeout(timer);
  // }, []);
  const components = [
    { component: <StickyScrollRevealDemo /> },
    { component: <ThreeDCardDemo /> },
  ];
  return (
    <>
      {/* <div
        className={`fixed top-0 bg-white dark:bg-black ${
          showLoader ? "opacity-100 z-[99999999]" : "opacity-0 z-[-1000]"
        } left-0 right-0 bottom-0 z-10 transition-opacity duration-500 ease-in-out`}>
        <TypewriterLoader />
      </div> */}

      <Hero />
      {/* <OurService /> */}
      <MaskText />
      <FooterHero
        title="EXPLORING OUR WORLD OF VISUAL AND INTERACTIVE DESIGN."
        word="OUR SERVICE"
        id="ourservice"
      />
      <Aniamted />

      <FooterHero title="EXPLORING OUR PRJECTS." word="PROJECTS" id="project" />
      <BannerCards />
      <FooterHero
        title="EXPLORING OUR WORLD OF VISUAL AND INTERACTIVE DESIGN."
        word="ABOUT US"
        id="contact"
      />
      <ZoomParallax />
      <div className="flex container w-full mx-auto flex-col md:flex-row items-center justify-between">
        {components.map((item, index) => (
          <motion.div
            key={index}
            className={`md:w-1/2 w-full md:h-1/2 flex items-center justify-center my-5 ${
              index % 2 !== 0 ? "self-start " : "self-end "
            }`}
            initial={{
              opacity: 0,
              x: index % 2 !== 0 ? 50 : -50, // Slide in from left or right based on index
            }}
            whileInView={{
              opacity: 1,
              x: 0, // Slide in to original position
              transition: {
                duration: 1, // Animation duration
              },
            }}
            viewport={{ once: true }}>
            {item.component}
          </motion.div>
        ))}
      </div>

      <ContactSection />
    </>
  );
}
