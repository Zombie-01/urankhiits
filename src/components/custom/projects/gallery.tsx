"use client";
import { Righteous } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import React from "react";
import BackgroundImage from "./BackgroundImage";
import SlideInfo from "./SlideInfo";
import Slides from "./Slides";
import Controls from "./Controls";

const inter = Righteous({
  subsets: ["latin"],
  weight: ["400"],
});
export type Data = {
  img: string;
  title: string;
  description: string;
  location: string;
};

export type CurrentSlideData = {
  data: Data;
  index: number;
};

export default function Home() {
  const [data, setData] = React.useState<Data[]>(sliderData.slice(1));
  const [transitionData, setTransitionData] = React.useState<Data>(
    sliderData[0]
  );
  const [currentSlideData, setCurrentSlideData] =
    React.useState<CurrentSlideData>({
      data: initData,
      index: 0,
    });

  return (
    <main
      className={`
       ${inter.className}
        relative min-h-screen select-n  one overflow-hidden text-white antialiased`}>
      <AnimatePresence>
        <BackgroundImage
          transitionData={transitionData}
          currentSlideData={currentSlideData}
        />
        <div className="  absolute z-20  h-full w-full">
          <div className=" flex h-full w-full grid-cols-10 flex-col md:grid">
            <div className=" col-span-4 mb-3 flex h-full flex-1 flex-col justify-end px-5 md:mb-0 md:justify-center md:px-10">
              <SlideInfo
                transitionData={transitionData}
                currentSlideData={currentSlideData}
              />
            </div>
            <div className=" col-span-6 flex h-full flex-1 flex-col justify-start p-4 md:justify-center md:p-10">
              <Slides data={data} />
              <Controls
                currentSlideData={currentSlideData}
                data={data}
                transitionData={transitionData}
                initData={initData}
                handleData={setData}
                handleTransitionData={setTransitionData}
                handleCurrentSlideData={setCurrentSlideData}
                sliderData={sliderData}
              />
            </div>
          </div>
        </div>
      </AnimatePresence>
    </main>
  );
}

const sliderData = [
  {
    img: "/hero_1.png",
    location: "Modern Loft",
    description:
      "A stunning transformation of an industrial space with exposed beams, high ceilings, and sleek finishes.",
    title: "Urban Living Room",
  },
  {
    img: "/hero_2.png",
    title: "Minimalist Kitchen",
    description:
      "A clean, clutter-free kitchen featuring neutral colors, hidden storage, and efficient layout.",
    location: "New York Apartment",
  },
  {
    img: "/hero_3.png",
    title: "Scandinavian Bedroom",
    description:
      "Bright and cozy bedroom with natural wood, soft textures, and calming tones for a serene atmosphere.",
    location: "Stockholm Flat",
  },
  {
    img: "/hero_4.png",
    title: "Industrial Office Space",
    description:
      "An open-concept workspace with concrete finishes, metal fixtures, and modern furniture.",
    location: "London Studio",
  },
  {
    img: "/pub_1.png",
    title: "Luxury Home Library",
    description:
      "A sophisticated library with floor-to-ceiling shelves, rich wood paneling, and comfortable seating.",
    location: "Paris Residence",
  },
];

const initData = sliderData[0];
