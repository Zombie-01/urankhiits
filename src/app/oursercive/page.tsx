"use client";

import { useEffect, useState } from "react";
import { CanvasRevealCard } from "@/components/example/canvas-reveal-effect-demo";
import ServiceTab from "@/components/example/service-tab";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loader after 4 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4000);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="pt-10  container mx-auto">
        <ServiceTab />
      </div>
    </>
  );
}
