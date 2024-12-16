"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "down",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    id: number;
    imageSrc: string;
    altText: string;
  }[];
  direction?: "up" | "down";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate all items for seamless infinite scrolling
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      setStart(true);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative max-h-[600px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      style={
        {
          "--animation-duration":
            speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s",
          "--animation-direction": direction === "down" ? "normal" : "reverse",
        } as React.CSSProperties
      }>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex flex-col min-h-full gap-4 py-4 animate-scroll",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}>
        {items.map((item) => (
          <li
            key={item.id}
            className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
            <Image
              src={item.imageSrc}
              alt={item.altText}
              layout="fill"
              objectFit="cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
