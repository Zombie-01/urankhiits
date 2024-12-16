"use client";
import { useRef, useEffect } from "react";

export default function Dvider() {
  const path = useRef(null);
  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId: number | null = null;

  useEffect(() => {
    setPath(progress);
  }, []);

  const setPath = (progress: any) => {
    const width = window.innerWidth * 0.7;
    if (path.current)
      (path.current as any).setAttributeNS(
        null,
        "d",
        `M0 250 Q${width * x} ${250 + progress}, ${width} 250`
      );
  };

  const lerp = (x: any, y: any, a: any) => x * (1 - a) + y * a;

  const manageMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  const manageMouseMove = (e: any) => {
    const { movementY, clientX } = e;
    const pathBound = (path.current as any).getBoundingClientRect();
    x = (clientX - pathBound.left) / pathBound.width;
    progress += movementY;
    setPath(progress);
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    progress = lerp(progress, 0, 0.025);
    time += 0.2;
    setPath(newProgress);
    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  return (
    <div className=" py-10 w-screen  relative">
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="relative top-[-10px] h-[40px] w-screen z-10 hover:h-[500px] hover:top-[-250px]"></div>
      <svg className="absolute top-[-250px] w-full h-[500px]">
        <path ref={path} className="stroke-white stroke-[1px] "></path>
      </svg>
    </div>
  );
}
