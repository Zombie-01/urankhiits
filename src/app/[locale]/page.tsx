"use client";
import { useEffect, useState } from "react";
import TypewriterLoader from "./loader";
import Gallery from "@/components/custom/projects/gallery";
import Hero from "./hero";

import { BannerCards } from "@/components/custom/bannercard/BannerCards";
import OurService from "@/components/custom/service/section/service";
import OurServiceV from "@/components/custom/our-service";
import AboutUs from "@/components/custom/aboutUs";
import { UranAIDemo } from "@/components/custom/UranAI";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  const earchparams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Set a timeout to hide the loader after 4 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4000);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    // Set a timeout to hide the loader after 4 seconds
    if (earchparams.get("code")) router.push("/ai");
  }, [earchparams]);

  return (
    <>
      <div
        className={`fixed top-0 bg-white dark:bg-black ${
          showLoader ? "opacity-100 z-[99999999]" : "opacity-0 z-[-1000]"
        } left-0 right-0 bottom-0 z-10 transition-opacity duration-500 ease-in-out`}>
        <TypewriterLoader />
      </div>
      <Hero />
      <OurServiceV />
      <UranAIDemo />

      {/* <FooterHero title="EXPLORING OUR PRJECTS." word="PROJECTS" id="project" /> */}
      <Gallery />
      <AboutUs />
    </>
  );
}
