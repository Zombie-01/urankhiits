"use client";

import Image from "next/image";
import Tabs from "../ui/tabs";
import { CanvasRevealCard } from "./canvas-reveal-effect-demo";
import BentoGridSecondDemo from "./bento-grid-demo-2";
import BentoGridThirdDemo from "./bento-grid-demo-3";
import TimelineDemo from "./timeline-demo";
import FeaturesSectionDemo from "../blocks/features-section-demo-3";

export default function ServiceTab() {
  const tabs = [
    {
      name: "Services",
      value: "services",
      children: (
        <div className="w-full overflow-hidden relative bg-white dark:bg-black h-full rounded-2xl text-xl md:text-4xl font-bold ">
          <BentoGridThirdDemo />
        </div>
      ),
    },
    {
      name: "About us",
      value: "aboutus",
      children: (
        <div className="w-full overflow-hidden relative bg-white dark:bg-black h-full rounded-2xl text-xl md:text-4xl font-bold ">
          <TimelineDemo />
        </div>
      ),
    },
    // {
    //   name: "Feature",
    //   value: "feature",
    //   children: (
    //     <div className=" w-full overflow-hidden relative bg-white dark:bg-black h-full rounded-2xl text-xl md:text-4xl font-bold ">
    //       <FeaturesSectionDemo />
    //     </div>
    //   ),
    // },
    // {
    //   name: "Plan",
    //   value: "plan",
    //   children: (
    //     <div className="w-full overflow-hidden relative bg-white dark:bg-black h-full rounded-2xl text-xl md:text-4xl font-bold ">
    //       <CanvasRevealCard />
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="  py-10 md:py-20 h-screen relative  mx-auto w-full  items-start justify-start ">
      <Tabs tabs={tabs} />
    </div>
  );
}
