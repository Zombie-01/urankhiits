import React from "react";
import { FlipWords } from "../ui/flip-words";

export default function FlipWordsDemo() {
  const words = ["better", "cute", "beautiful", "modern"];

  return (
    <div className=" flex justify-start items-center px-4">
      <div className="text-4xl font-normal text-neutral-400">
        Build
        <FlipWords words={words} /> <br />
        home with urankhiits
      </div>
    </div>
  );
}
