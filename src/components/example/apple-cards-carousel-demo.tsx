"use client";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div id="projects" className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Our Projects
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
const DummyContent = () => {
  const contentArray = [...new Array(3).fill(1)];

  return (
    <motion.div
      className="flex overflow-x-scroll gap-4 space-x-4 p-4"
      drag="x"
      dragConstraints={{ right: 0, left: -1000 }} // Adjust depending on content size
      whileTap={{ cursor: "grabbing" }}
      whileDrag={{ cursor: "grabbing" }}>
      {contentArray.map((_, index) => (
        <motion.div
          key={"dummy-content" + index}
          className="flex-col w-full rounded-3xl  p-4"
          whileHover={{ scale: 1.05 }} // Add a subtle hover effect
        >
          <div className="relative h-[300px]">
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              fill
              className=" min-h-[200px]  h-full w-full aspect-video object-cover"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const data = [
  {
    //category: "Artificial Intelligence",
    title: "KOHLER",
    src: "https://drive.google.com/file/d/1K9EqQ3bbQYCgvOYSKy_QqTds7k8KS_Tc/view?usp=sharing",
    content: <DummyContent />,
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },

  {
    category: "Product",
    title: "Maps for your iPhone 15 Pro Max.",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "iOS",
    title: "Photography just got better.",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Hiring",
    title: "Hiring for a Staff Software Engineer",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
];
