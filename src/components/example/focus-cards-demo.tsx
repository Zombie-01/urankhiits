"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase/client";
import { useTranslations } from "next-intl";
import { Grid, List } from "lucide-react";
import { Link } from "@/i18n/routing";

interface Project {
  id: string;
  title: string;
  src: string; // Assuming `src` stores the image URL
  category?: string;
  orientation?: "square" | "landscape";
}

export default function FocusCardsDemo() {
  const t = useTranslations("Projects");
  const [cards, setCards] = useState<Project[]>([]);
  const [selectedTab, setSelectedTab] = useState("Show All");
  const [isSquare, setIsSquare] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const tabs = [
    { key: "Show All", name: t("show_all") },
    { key: "Commercial", name: t("commercial") },
    { key: "Luxury House", name: t("lux_house") },
    { key: "Residential", name: t("residential") }
  ];

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
  }, [selectedTab]); //

  return (
    <div className="py-[100px]">
      <div
        className="text-center mb-8 py-4 sm:py-8 lg:py-10"
        style={{
          backgroundImage: 'url("/bg-assets/one.png")',
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}>
        <h1 className="text-[#5A5A5A] text-center font-aeonikBold uppercase text-3xl sm:text-[85px] font-[900] tracking-[20px] sm:tracking-[27px] leading-[121%]">
          {t("Projects")}
        </h1>
      </div>

      <div className="flex px-4 flex-col sm:flex-row space-x-2 sm:space-x-4 justify-center py-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`${
              selectedTab === tab.key
                ? "bg-gray-300 text-black"
                : "bg-transparent text-gray-600"
            } py-2 px-2 sm:px-6 rounded-lg font-bold transition duration-300 hover:bg-gray-200`}>
            {tab.name}
          </button>
        ))}
      </div>
      <div className=" container mx-auto py-4 md:py-8 flex justify-end w-full">
        <button
          onClick={() => setIsSquare(!isSquare)}
          className={`${
            isSquare ? "bg-gray-300 text-black" : "bg-transparent text-gray-600"
          } py-2 px-2 sm:px-6 rounded-lg font-bold transition duration-300 hover:bg-gray-200`}>
          {!isSquare ? <Grid /> : <List />}
        </button>
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
        <FocusCards cards={cards} isSquare={isSquare} />
      )}
    </div>
  );
}

const SkeletonCard = () => (
  <div className="rounded-[10px] bg-gray-300 dark:bg-neutral-700 aspect-video w-full animate-pulse" />
);

export function FocusCards({
  cards,
  isSquare
}: {
  cards: Project[];
  isSquare: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${
          isSquare ? "sm:grid-cols-4" : ""
        }`}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            isSquare={isSquare}
          />
        ))}
      </div>
    </div>
  );
}

export const Card = ({
  card,
  index,
  hovered,
  setHovered,
  isSquare
}: {
  card: Project;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  isSquare: boolean;
}) => (
  <Link href={`/project/${card.id}`}>
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={`rounded-[10px] relative bg-gray-100 overflow-hidden w-full ${
        isSquare ? "aspect-square" : "aspect-video"
      } transition-all duration-300 ease-out ${
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      }`}>
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0"
      />
      <div
        className={`absolute inset-0 bg-black/50 flex items-end p-4 transition-opacity duration-300 ${
          hovered === index ? "opacity-100" : "opacity-0"
        }`}>
        <div className="text-lg md:text-xl font-medium text-white">
          {card.title}
        </div>
      </div>
    </div>
  </Link>
);
