import React, { useTransition } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Service {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  type: "title" | "image";
}

const OurServiceV: React.FC = () => {
  const t = useTranslations("ServicePage");
  const services = [
    {
      title: t("service1Title"),
      description: t("service1Description"),
      imageUrl: "/hero_1.png",
    },
    {
      title: t("service2Title"),
      description: t("service2Description"),
      imageUrl: "/hero_1.png",
    },
    {
      title: t("service3Title"),
      description: t("service3Description"),
      imageUrl: "/hero_1.png",
    },
    {
      title: t("service4Title"),
      description: t("service4Description"),
      imageUrl: "/hero_1.png",
    },
    {
      title: t("service5Title"),
      description: t("service5Description"),
      imageUrl: "/hero_1.png",
    },
    {
      title: t("service6Title"),
      description: t("service6Description"),
      imageUrl: "/hero_1.png",
    },
  ];

  return (
    <section id="ourservice" className="py-16 relative min-h-screen w-screen">
      <div className="container mx-auto flex flex-col md:flex-row gap-8 justify-between">
        <div className="w-full md:w-1/3 ms:max-w-[380px] flex flex-col">
          <h1 className="font-[800] font-roboto md:text-[64px] text-center">
            {t("title")}
          </h1>
          <div className="flex flex-col  gap-4 md:gap-8">
            <p className=" text-justify ">
              {t("description")}
              <br />
              <br /> {t("description1")} <br />
              <br />
              {t("description2")}{" "}
            </p>
          </div>
        </div>
        <div className="w-full md:w-2/3 grid grid-cols-1 xl:grid-cols-2  gap-4 sm:gap-8">
          {services.map((service, index) => {
            // Define the specific grid positioning

            return (
              <div
                className={`flex gap-2 sm:gap-4  ${
                  index === 2 || index === 3 ? "flex-row-reverse" : ""
                }`}>
                {" "}
                <motion.div
                  key={service.title}
                  className={`relative border w-1/2 rounded-2xl max-h-[266px] overflow-hidden `}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -50 : 50, // Slide in from left or right based on index
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0, // Slide to original position
                    transition: {
                      duration: 1, // Animation duration
                    },
                  }}
                  viewport={{ once: true }}>
                  <div className="px-2 pb-2 pt-4 flex flex-col gap-4">
                    <h3 className="text-sm sm:text-[21px] font-semibold text-center">
                      {service.title}
                    </h3>
                    <p className="text-center text-sm ">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  key={service.title}
                  className={`relative border w-1/2 rounded-2xl max-h-[266px] overflow-hidden `}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? 50 : -50, // Slide in from left or right based on index
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0, // Slide to original position
                    transition: {
                      duration: 1, // Animation duration
                    },
                  }}
                  viewport={{ once: true }}>
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full aspect-square object-cover"
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute z-20 top-40   md:-left-[150px]">
        {" "}
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
