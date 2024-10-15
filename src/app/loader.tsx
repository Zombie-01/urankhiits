"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import SVGAnimation from "./svg";

export default function TypewriterLoader() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "modern",
    },
    {
      text: "design",
    },
    {
      text: "with",
    },
    {
      text: "URANKHIITS.",
      className: " text-[#FFFFFF
] ",
    },
  ];
  return (
    <div className="flex h-screen   bg-black flex-col items-center justify-center   ">
      <SVGAnimation />
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
