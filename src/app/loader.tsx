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
      className: "text-[#2e2e2e]",
    },
  ];
  return (
    <div className="flex h-screen bg-black flex-col items-center justify-center   ">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
