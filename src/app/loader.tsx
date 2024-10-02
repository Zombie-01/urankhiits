"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function TypewriterLoader() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "home",
    },
    {
      text: "with",
    },
    {
      text: "URANKHIITS.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
