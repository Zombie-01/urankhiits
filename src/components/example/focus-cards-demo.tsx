"use client";
import { useEffect, useState } from "react";
import { FocusCards } from "@/components/ui/focus-cards";
import { supabase } from "../../../utils/supabase/client";

interface Project {
  id: string;
  title: string;
  src: string; // Assuming `src` stores the image URL
  category?: string;
}

interface Category {
  id: string;
  category_name: string;
}

const tabs = ["Show All", "Commercial", "Luxury House", "Residential"];

export default function FocusCardsDemo() {
  const [cards, setCards] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTab, setSelectedTab] = useState("Show All");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("category")
          .select("id, category_name");
        if (error) {
          console.error("Error fetching categories:", error.message);
          return;
        }
        setCategories(data as any);
      } catch (err) {
        console.error("Unexpected error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); // Start loading
      setCards([]);

      try {
        let query = supabase
          .from("projects")
          .select("id, title, imgs, category");

        if (selectedTab !== "Show All") {
          // Get the categoryId for the selected tab

          query = query.eq("category", selectedTab.toLowerCase()); // Filter by categoryId
        }

        const { data, error } = await query;
        if (error) {
          console.error("Error fetching projects:", error.message);
          return;
        }

        const formattedCards = data.map((project: any) => ({
          id: project.id,
          title: project.title,
          src: project.imgs?.[0] || "/placeholder.png" // Use the first image or a placeholder
        }));

        setCards(formattedCards);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedTab, categories]); // Rerun effect when selectedTab or categories change

  return (
    <div className="py-[100px]">
      <div className="text-center mb-8">
        <div
          className="w-full "
          style={{
            background:
              "url(/Bg%20assets/For%20ai%20bg%20bl%202.png) center center/cover"
          }}>
          <h1 className="text-[#5A5A5A] text-[85px] font-[900] tracking-[27px] leading-[121%]">
            {"PROJECTS"}
          </h1>
        </div>
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
      {cards.length === 0 && !loading && (
        <div className="text-center text-xl text-gray-600 dark:text-gray-300 py-8">
          No projects available
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      ) : (
        <FocusCards cards={cards} />
      )}
    </div>
  );
}

const SkeletonCard = () => (
  <div className="rounded-[10px] bg-gray-300 dark:bg-neutral-700 aspect-video w-full animate-pulse" />
);
