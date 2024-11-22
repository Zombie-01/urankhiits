"use client";
import { useEffect, useState } from "react";
import { FocusCards } from "@/components/ui/focus-cards";
import { supabase } from "../../../utils/supabase/client";

interface Project {
  id: string;
  title: string;
  src: string; // Assuming `src` stores the image URL
}

export default function FocusCardsDemo() {
  const [cards, setCards] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("id, title, imgs");
        if (error) {
          console.error("Error fetching projects:", error.message);
          return;
        }

        // Map the projects into the desired structure
        const formattedCards = data.map((project: any) => ({
          id: project.id,
          title: project.title,
          src: project.imgs?.[0] || "/placeholder.png", // Use the first image or a placeholder
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
    return <div className="text-center">Loading projects...</div>;
  }

  if (cards.length === 0) {
    return <div className="text-center">No projects found.</div>;
  }

  return <FocusCards cards={cards} />;
}
