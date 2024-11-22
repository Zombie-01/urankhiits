import React, { useState } from "react";
import { useTranslations } from "next-intl";

const OurServiceV: React.FC = () => {
  const t = useTranslations("ServicePage");
  const [currentIndex, setCurrentIndex] = useState(0);

  const services = [
    {
      title: t("service1Title"),
      description: t("service1Description"),
      imageUrl: "/hero_1.png",
      title2: t("service2Title"),
      description2: t("service2Description"),
    },
    {
      title: t("service3Title"),
      description: t("service3Description"),
      imageUrl: "/hero_1.png",
      title2: t("service4Title"),
      description2: t("service4Description"),
    },
    {
      title: t("service5Title"),
      description: t("service5Description"),
      imageUrl: "/hero_1.png",
      title2: t("service6Title"),
      description2: t("service6Description"),
    },
  ];

  return (
    <section
      id="ourservice"
      className="py-16 relative w-screen overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row gap-8 justify-between">
        <div className="w-full sm:w-1/2 flex flex-col gap-6">
          <h1 className="font-[800] font-roboto md:text-[30px] text-start">
            {t("title")}
          </h1>
          <div className="flex flex-col gap-4 md:gap-8">
            <p className="text-justify">{t("description")}</p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 relative flex flex-col gap-8 ">
          <h1 className="font-[800] font-roboto md:text-[30px] text-start">
            {t("title")}
          </h1>
          <div className="flex transition-transform duration-300">
            <div className="flex gap-2 sm:gap-4 w-full">
              <div className="relative border w-1/3 rounded-2xl max-h-[266px] overflow-hidden">
                <div className="px-4 pb-4 pt-4 flex flex-col gap-4">
                  <h3 className="text-[10px] sm:text-base font-semibold ">
                    {services[currentIndex].title}
                  </h3>
                  <p className="text-[10px]">
                    {services[currentIndex].description}
                  </p>
                </div>
              </div>
              <div className="relative border w-1/3 rounded-2xl max-h-[266px] overflow-hidden">
                <img
                  src={services[currentIndex].imageUrl}
                  alt={services[currentIndex].title}
                  className="w-full h-full aspect-video object-cover"
                />
              </div>
              <div className="relative border w-1/3 rounded-2xl max-h-[266px] overflow-hidden">
                <div className="px-4 pb-4 pt-4 flex flex-col gap-4">
                  <h3 className="text-[10px] sm:text-base font-semibold ">
                    {services[currentIndex].title2}
                  </h3>
                  <p className="text-[10px]">
                    {services[currentIndex].description2}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 flex gap-4 -translate-x-1/2">
            <button
              className="left-0 top-1/2 transform -translate-y-1/2 bg-[#D9D9D9] w-[60px] h-[10px]"
              onClick={() => setCurrentIndex(0)}></button>
            <button
              className="top-1/2 transform -translate-y-1/2 bg-[#D9D9D9] w-[60px] h-[10px]"
              onClick={() => setCurrentIndex(1)}></button>
            <button
              className="top-1/2 transform -translate-y-1/2 bg-[#D9D9D9] w-[60px] h-[10px]"
              onClick={() => setCurrentIndex(2)}></button>
          </div>
        </div>
      </div>
      <div className="absolute z-20 top-0 md:-left-[150px]">
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

export default OurServiceV;
