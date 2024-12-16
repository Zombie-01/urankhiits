"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useMotionValue, motion } from "framer-motion";
import { clamp } from "lodash";
import { supabase } from "../../../utils/supabase/client";

interface SubBanner {
  id: string;
  banner_id: string;
  image_url: string;
}

const AboutUs = () => {
  const t = useTranslations("AboutPage");
  const constraintsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const x = useMotionValue(0);

  const [subBanners, setSubBanners] = useState<SubBanner[]>([]);

  // Fetch images for the "about_us" banner
  useEffect(() => {
    const fetchBannerImages = async () => {
      const { data: bannerData, error: bannerError } = (await supabase
        .from("banner")
        .select("id")
        .eq("title", "about_us")
        .single()) as any;

      if (bannerError) {
        console.error("Error fetching banner:", bannerError.message);
        return;
      }

      const bannerId = bannerData?.id;

      const { data: images, error: imagesError } = (await supabase
        .from("sub_banner")
        .select("id, banner_id, image_url")
        .eq("banner_id", bannerId)) as any;

      if (imagesError) {
        console.error("Error fetching sub-banner images:", imagesError.message);
      } else {
        setSubBanners(images || []);
      }
    };

    fetchBannerImages();
  }, []);

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
    <section
      id="aboutus"
      className="py-12 px-6 flex justify-center items-start sm:px-12 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section: Statistics */}
        <div className="space-y-6 my-auto">
          <h2 className="text-3xl font-bold mb-6">{t("aboutUs")}</h2>
          <p className="mb-8 max-w-4xl">{t("aboutDescription")}</p>
          <div className="flex gap-8">
            <div className="border-l border-gray-300 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-2">
                {t("experience-title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("experience-description")}
              </p>
            </div>
            <div className="border-l border-gray-300 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-2">
                {t("sustainableProjects-title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("sustainableProjects-description")}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Images */}
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
              <div
                key={subBanner.id}
                className="flex justify-center items-center w-full">
                <img
                  src={subBanner.image_url}
                  alt="Sub-Banner Image"
                  className="w-full rounded-lg max-h-[320px] object-cover max-w-[637px] aspect-video shadow-lg"
                />
              </div>
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
    </section>
  );
};

export default AboutUs;
