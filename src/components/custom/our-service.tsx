import React from "react";
import { motion } from "framer-motion";

interface Service {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  type: "title" | "image";
}

const OurServiceV: React.FC = () => {
  const services = [
    {
      title: "Discussion & Analysis of Needs",
      description:
        "The design team collaborates with the client to understand their preferences, goals, budget, and project features.",
      imageUrl: "/hero_1.png",
    },
    {
      title: "Concept & Sketch Development",
      description:
        "Designers create preliminary concepts and sketches that reflect the desired interior style, including color palettes and material selections.",
      imageUrl: "/hero_1.png",
    },
    {
      title: "3D Visualization and Design",
      description:
        "Detailed 3D models and visualizations are developed to help clients visualize the final design.",
      imageUrl: "/hero_1.png",
    },
    {
      title: "Coordination and Approval",
      description:
        "A detailed budget and work schedule are formulated, incorporating project requirements and material costs, and client approval is obtained.",
      imageUrl: "/hero_1.png",
    },
    {
      title: "Interior renovation work",
      description:
        "Commencement of the interior construction, managing all tasks to ensure alignment with the approved design and specifications.",
      imageUrl: "/hero_1.png",
    },
    {
      title: "Handover of the Completed Project",
      description:
        "Final review and handover of the completed project to the client, ensuring it meets all expectations and addressing any final adjustments.",
      imageUrl: "/hero_1.png",
    },
  ];

  return (
    <section id="ourservice" className="py-16 relative min-h-screen w-screen">
      <div className="container mx-auto flex gap-8 justify-between">
        <div className="w-full md:w-1/3 max-w-[380px] flex flex-col">
          <h1 className="font-[800] font-roboto md:text-[64px] text-center">
            Our service
          </h1>
          <div className="flex flex-col  gap-4 md:gap-8">
            <p className=" text-justify ">
              In today’s fast-paced business world, companies recognize the
              strategic importance of well-designed environments that reflect
              their values and identity. Interior design has become essential in
              shaping spaces that foster success and brand alignment.
              <br />
              <br /> As Ulaanbaatar grows, the demand for personalized home
              renovations is on the rise. At Urankhiits LLC, we specialize in
              transforming living spaces into unique sanctuaries that promote
              comfort and well-being. <br />
              <br />
              To meet this growing demand, Uran AI has been launched to provide
              fast, AI-powered interior design solutions. With Uran AI,
              customers can quickly receive customized designs, ensuring
              high-quality results delivered with speed and efficiency.
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
      <div className="absolute z-20 md:left-[150px]">
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
