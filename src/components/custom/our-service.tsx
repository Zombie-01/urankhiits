import React from "react";
import { motion } from "framer-motion";

interface Service {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  type: "title" | "image";
}

const services: Service[] = [
  {
    id: 1,
    title: "Discussion & analysis of needs",
    type: "title",
    description:
      "The studio team meets with the client to understand in more detail his preferences, goals, budget and project features. It is important to determine the style, functional requirements and aesthetic preferences of the customer.",
  },
  {
    id: 2,
    title: "Concept & sketch development",
    type: "title",
    description:
      "Designers create concepts and sketches which reflect the visual representation of the future interior. This stage includes the choice of color palette, materials, furniture, and basic style elements.",
  },
  {
    id: 3,
    title: "Discussion & analysis of needs",
    type: "image",
    imageUrl: "/hero_1.png",
    description:
      "The studio team meets with the client to understand in more detail his preferences, goals, budget and project features. It is important to determine the style, functional requirements and aesthetic preferences of the customer.",
  },
  {
    id: 4,
    title: "3D visualisation and design",
    type: "title",
    description:
      "We develop detailed 3D models and visualization so that you can see how the interiors and exteriors will look after the completion of the project. This allows changes and refinements to be made before the actual implementation begins.",
  },
];

const OurServiceV: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-8">
        {services.map((service, index) => {
          // Define the specific grid positioning
          let gridPosition = "";
          if (index === 0) gridPosition = "md:col-start-2 md:col-span-1"; // 1st row, 2nd column
          if (index === 1) gridPosition = "md:row-start-2 md:col-start-1"; // 2nd row, 1st column
          if (index === 2) gridPosition = "md:row-start-2 md:col-start-2"; // 2nd row, 2nd column
          if (index === 3) gridPosition = "md:row-start-2 md:col-start-3"; // 2nd row, last column

          return (
            <motion.div
              key={service.id}
              className={`relative border rounded-2xl overflow-hidden ${gridPosition}`}
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
              {service.type === "image" ? (
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="p-8 flex flex-col gap-8">
                  <div className="top-4 left-4 text-*+lg font-bold">
                    {service.id < 10 ? `0${service.id}` : service.id}
                  </div>
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default OurServiceV;
