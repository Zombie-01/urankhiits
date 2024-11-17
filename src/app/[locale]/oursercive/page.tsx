"use client";

import { useEffect, useState } from "react";
import { CanvasRevealCard } from "@/components/example/canvas-reveal-effect-demo";
import ServiceTab from "@/components/example/service-tab";
import Framer from "@/components/custom/service/framer";

export default function Home() {
  return (
    <>
      <div className="pt-10  container mx-auto">
        <Framer
          title="Interior"
          title_2="design"
          word="The brand’s design brings the customer’s vision to life."
        />
        <Framer
          title="Architecture"
          title_2="design"
          word="Realizing the customer's vision through unique brand interior design solutions."
        />
        <Framer
          title="Interior"
          title_2="performance"
          word="Interior and working drawings with practical solutions will support installations and repairs."
        />
      </div>
    </>
  );
}
