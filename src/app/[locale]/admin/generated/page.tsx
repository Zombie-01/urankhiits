"use client";
import { useEffect, useState } from "react";
import { FocusCards } from "@/components/ui/focus-cards";
import { supabase } from "../../../../../utils/supabase/client";

interface Project {
  id: string;
  title: string;
  src: string; // Assuming `src` stores the image URL
}

const FocusCardsDemoPage = () => {
  const [cards, setCards] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("generated")
          .select("id, prompt, image");
        if (error) {
          console.error("Error fetching projects:", error.message);
          return;
        }

        // Map the projects into the desired structure
        const formattedCards = data.map((project: any) => ({
          id: project.id,
          title: project.prompt,
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

  if (loading) {
    return (
      <div className="text-center py-12">Loading generated projects...</div>
    );
  }

  if (cards.length === 0) {
    return <div className="text-center py-12">No generated project found.</div>;
  }

  return (
    <div className="flex w-full justify-center items-center py-12">
      <FocusCards cards={cards} />
    </div>
  );
};

const SkeletonCard = () => (
  <div className="rounded-[10px] bg-gray-300 dark:bg-neutral-700 aspect-video w-full animate-pulse" />
);

export default FocusCardsDemoPage;
