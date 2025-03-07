"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Link } from "@/i18n/routing";
import { clamp } from "lodash";
import { useTranslations } from "next-intl";
import { supabase } from "../../../utils/supabase/client";

interface SubBanner {
  id: string;
  banner_id: string;
  image_url: string;
}
export const UranAIDemo = () => {
  const constraintsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const t = useTranslations("Uran_ai");

  const [subBanners, setSubBanners] = useState<SubBanner[]>([
    { id: "01", image_url: "/images/sketchout.png", banner_id: "01" }
  ]);

  const [containerWidth, setContainerWidth] = useState(0);
  // useEffect(() => {
  //   const fetchBannerImages = async () => {
  //     const { data: bannerData, error: bannerError } = (await supabase
  //       .from("banner")
  //       .select("id")
  //       .eq("title", "uran_ai")
  //       .single()) as any;

  //     if (bannerError) {
  //       console.error("Error fetching banner:", bannerError.message);
  //       return;
  //     }

  //     const bannerId = bannerData?.id;

  //     const { data: images, error: imagesError } = (await supabase
  //       .from("sub_banner")
  //       .select("id, banner_id, image_url")
  //       .eq("banner_id", bannerId)) as any;

  //     if (imagesError) {
  //       console.error("Error fetching sub-banner images:", imagesError.message);
  //     } else {
  //       setSubBanners(images || []);
  //     }
  //   };

  //   fetchBannerImages();
  // }, []);

  useEffect(() => {
    if (constraintsRef.current) {
      setContainerWidth((constraintsRef.current as any).offsetWidth);
    }
    const handleResize = () => {
      if (constraintsRef.current) {
        setContainerWidth((constraintsRef.current as any).offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dragEndHandler = (_: any, info: { offset: { x: number } }) => {
    const direction = info.offset.x < 0 ? 1 : -1;
    const newIndex = clamp(currentIndex + direction, 0, subBanners.length - 1);
    setCurrentIndex(newIndex);
  };

  return (
    <section className="bg-[#161616] relative flex flex-col justify-center items-center min-h-[750px] py-12">
      <div className="container mx-auto px-4 flex flex-wrap justify-start items-center">
        {/* Left Side: Image with Label */}
        <div
          ref={constraintsRef}
          className="w-full h-full overflow-hidden lg:w-3/5">
          <h2 className="text-[48px] font-bold mb-4 text-white md:text-[64px]">
            URAN AI
          </h2>
          <div ref={constraintsRef} className="w-full overflow-hidden">
            <motion.div
              drag="x"
              onDragEnd={dragEndHandler}
              dragConstraints={{
                left: -containerWidth * (subBanners.length - 1),
                right: 0
              }}
              animate={{ x: -containerWidth * currentIndex }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ x }}
              className="relative flex w-full">
              {subBanners.map((subBanner) => (
                <img
                  key={subBanner.id}
                  src={subBanner.image_url}
                  alt="Sub-Banner Image"
                  className="w-full rounded-lg object-cover aspect-video shadow-lg"
                />
              ))}
            </motion.div>
            {/* Carousel Dots */}
            <div className="flex gap-2 my-4 md:gap-4 justify-center">
              {subBanners.map((_, index) => (
                <button
                  key={index}
                  className={`w-[60px] h-[6px] rounded-full ${
                    currentIndex === index ? "bg-blue-500" : "bg-[#D9D9D9]"
                  }`}
                  onClick={() => setCurrentIndex(index)}></button>
              ))}
            </div>
          </div>
        </div>
        {/* Right Side: Text and Button */}
        <div className="w-full lg:w-2/5 mt-8 lg:mt-0 flex flex-col gap-4 md:gap-6 items-start p-4 md:p-10 justify-end">
          <Link
            href="/ai"
            className="font-bold md:text-[35px] border-white border px-6 py-2 rounded-[12px] z-[21] text-white">
            {t("ai_demo_button")}
          </Link>
          <div>
            <p className="text-gray-600 md:text-[23px]">
              {t("ai_demo_description")}
              <br />
              {t("ai_demo_slogan")}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute z-20 -top-40 sm:-right-[150px]">
        <div className="w-full h-full max-w-[500px] md:max-w-[700px] flex items-center justify-center">
          <img
            src="/svg.png"
            alt={"svg"}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};
