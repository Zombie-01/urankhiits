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
  weight: ["400"]
});
export type Data = {
  img: string;
  title: string;
  description: string;
};

export type CurrentSlideData = {
  data: Data;
  index: number;
};

export default function Home() {
  const sliderData = [
    {
      img: "/building/1.png",
      description:
        "A stunning transformation of an industrial space with exposed beams, high ceilings, and sleek finishes.",
      title: "Resistance projects"
    },
    {
      img: "/building/2.png",
      title: "Commercial project",
      description:
        "A clean, clutter-free kitchen featuring neutral colors, hidden storage, and efficient layout."
    },
    {
      img: "/building/3.png",
      title: "Luxury project",
      description:
        "Bright and cozy bedroom with natural wood, soft textures, and calming tones for a serene atmosphere."
    }
  ];
  const [data, setData] = React.useState<Data[]>(sliderData.slice(1));
  const [transitionData, setTransitionData] = React.useState<Data>(
    sliderData[0]
  );
  const [currentSlideData, setCurrentSlideData] =
    React.useState<CurrentSlideData>({
      data: sliderData[0],
      index: 0
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
        <div className="  absolute h-full sm:h-[20%]  bottom-0 py-6 bg-black bg-opacity-40 z-20  w-full">
          <div className=" flex px-4 sm:px-10 h-full container mx-auto justify-center w-full grid-cols-10 flex-col sm:flex-row">
            <div className=" w-full flex justify-end flex-col">
              <SlideInfo
                transitionData={transitionData}
                currentSlideData={currentSlideData}
              />
            </div>
            <div className="w-full sm:w-auto flex justify-center sm:justify-end ">
              {/* <Slides data={data} />/ */}
              <Controls
                currentSlideData={currentSlideData}
                data={data}
                transitionData={transitionData}
                initData={sliderData[0]}
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
