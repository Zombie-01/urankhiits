"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../utils/supabase/client";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  src: string; // Assuming `src` stores the image URL
}

const FocusCardsDemoPage = () => {
  const [cards, setCards] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false); // State to check client-side rendering

  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("generated")
          .select("id, image");
        if (error) {
          console.error("Error fetching projects:", error.message);
          return;
        }

        console.log(data);

        // Map the projects into the desired structure
        const formattedCards = data.map((project: any) => ({
          id: project.id,
          src: project.image || "/placeholder.png" // Use the first image or a placeholder
        }));

        setCards(formattedCards);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (!isClient) return null; // Prevents rendering on the server side

  return (
    <div className="flex w-full justify-center items-center py-12">
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8  ">
        {/* Card Grid */}
        <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards?.length > 0 &&
            cards.map((card, index) => (
              <Card
                key={index}
                card={card}
                index={index}
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const Card = React.memo(
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
        alt={card.src}
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end p-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}></div>
    </div>
  )
);

const SkeletonCard = () => (
  <div className="rounded-[10px] bg-gray-300 dark:bg-neutral-700 aspect-video w-full animate-pulse" />
);

export default FocusCardsDemoPage;
