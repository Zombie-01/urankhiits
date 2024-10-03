import React from "react";
import { FlipWords } from "../ui/flip-words";

export default function FlipWordsDemo() {
  const words = [
    "Timeless",
    "Elegant",
    "Innovative",
    "Sophisticated",
    "Modern",
  ];

  return (
    <div className=" flex justify-start items-center px-4">
      <div className="text-4xl font-normal text-neutral-400">
        Build
        <FlipWords words={words} /> <br />
        Design with URANKHIITS
      </div>
    </div>
  );
}
