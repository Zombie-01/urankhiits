"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-[10px] relative bg-gray-100 aspect-video dark:bg-neutral-900 overflow-hidden w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}>
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end p-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}>
        <div className="text-lg md:text-xl font-medium text-white">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  id: string;
};
const tabs = ["Show All", "Commercial", "Luxury House", "Residential"];

export function FocusCards({
  cards,
  title
}: {
  cards: Card[];
  title?: string;
}) {
  const [selectedTab, setSelectedTab] = useState("Show All");
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="max-w-7xl py-[100px] mx-auto px-4 md:px-8">
      {/* Title and Description */}
      <div className="text-center mb-8">
        <div
          className="w-full "
          style={{
            background:
              "url(/Bg%20assets/For%20ai%20bg%20bl%202.png) center center/cover"
          }}>
          <h1 className="text-[#5A5A5A] text-[85px] font-[900] tracking-[27px] leading-[121%]">
            {title ? title : "PROJECTS"}
          </h1>
        </div>
        <div className="flex space-x-4 justify-center py-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`${
                selectedTab === tab
                  ? "bg-gray-300 text-black"
                  : "bg-transparent text-gray-600"
              } py-2 px-6 rounded-lg font-bold transition duration-300 hover:bg-gray-200`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Link key={card.title} href={`/project/${card.id}`}>
            <Card
              card={card}
              index={index}
              hovered={hovered}
              setHovered={setHovered}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
