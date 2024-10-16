"use client";

import Image from "next/image";
import Tabs from "../ui/tabs";
import { CanvasRevealCard } from "./canvas-reveal-effect-demo";

export default function ServiceTab() {
  const tabs = [
      {
      name: "Services",
      value: "services",
      children: (
        <div className="w-full overflow-hidden relative bg-white dark:bg-black h-full rounded-2xl text-xl md:text-4xl font-bold ">
          <p>Services tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      name: "Playground",
      value: "playground",
      children: (
        <div className="w-full overflow-hidden relative bg-white dark:bg-black h-full rounded-2xl text-xl md:text-4xl font-bold ">
          <p>Playground tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      name: "Content",
      value: "children",
      children: (
        <div className="w-full overflow-hidden relative bg-white dark:bg-black h-full rounded-2xl text-xl md:text-4xl font-bold ">
          <p>Content tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      name: "Plan",
      value: "plan",
      children: (
        <div className="w-full overflow-hidden relative bg-white dark:bg-black h-full rounded-2xl text-xl md:text-4xl font-bold ">
          <p>Plan</p>
          <CanvasRevealCard />
        </div>
      ),
    },
  ];

  return (
    <div className=" [perspective:1000px] py-10 md:py-20 h-screen relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start ">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
