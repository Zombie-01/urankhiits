"use client";
import { useEffect, useState } from "react";
import { FocusCards } from "@/components/ui/focus-cards";
import { supabase } from "../../../utils/supabase/client";
import { useTranslations } from "next-intl";

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

export default function FocusCardsDemo() {
  const t = useTranslations("Projects");
  const [cards, setCards] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTab, setSelectedTab] = useState("Show All");
  const [loading, setLoading] = useState<boolean>(true);

  const tabs = [
    { key: "Show All", name: t("show_all") },
    { key: "Commercial", name: t("commercial") },
    { key: "Luxury House", name: t("lux_house") },
    { key: "Residential", name: t("residential") }
  ];
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
          // Filter by selectedTab key instead of name
          query = query.eq("category", selectedTab.toLowerCase());
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
            {t("Projects")}
          </h1>
        </div>
      </div>
      <div className="flex space-x-4 justify-center py-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`${
              selectedTab === tab.key
                ? "bg-gray-300 text-black"
                : "bg-transparent text-gray-600"
            } py-2 px-6 rounded-lg font-bold transition duration-300 hover:bg-gray-200`}>
            {tab.name}
          </button>
        ))}
      </div>
      {cards.length === 0 && !loading && (
        <div className="text-center text-xl text-gray-600 dark:text-gray-300 py-8">
          No projects available
        </div>
      )}
      {loading ? (
        <div className="grid container mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
