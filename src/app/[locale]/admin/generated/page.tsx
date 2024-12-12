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
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Index of the current image in the modal
  const LIMIT = 6;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchProjects = async (page: number) => {
    setLoading(true);
    const offset = (page - 1) * LIMIT;

    try {
      const { data, error, count } = await supabase
        .from("generated")
        .select("id, image", { count: "exact" })
        .range(offset, offset + LIMIT - 1);

      if (error) {
        console.error("Error fetching projects:", error.message);
        return;
      }

      const formattedCards = data.map((project: any) => ({
        id: project.id,
        src: project.image || "/placeholder.png"
      }));

      setCards(formattedCards);
      setTotalPages(Math.ceil(count! / LIMIT));
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  const handleNextImage = () => {
    if (selectedIndex !== null && selectedIndex < cards.length - 1) {
      setSelectedIndex((prev) => (prev !== null ? prev + 1 : null));
    }
  };

  const handlePrevImage = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex((prev) => (prev !== null ? prev - 1 : null));
    }
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col w-full justify-center items-center py-12">
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: LIMIT }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : cards.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  index={index}
                  hovered={hovered}
                  setHovered={setHovered}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={currentPage === 1 || loading}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-neutral-800 rounded-md disabled:opacity-50">
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages || loading}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-neutral-800 rounded-md disabled:opacity-50">
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <Modal
          image={cards[selectedIndex]?.src}
          onClose={closeModal}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          disableNext={selectedIndex >= cards.length - 1}
          disablePrev={selectedIndex <= 0}
        />
      )}
    </div>
  );
};

const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onClick
  }: {
    card: Project;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onClick: () => void;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={onClick}
      className={cn(
        "rounded-[10px] relative bg-gray-100 aspect-video dark:bg-neutral-900 overflow-hidden w-full transition-all duration-300 ease-out cursor-pointer",
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

const Modal = ({
  image,
  onClose,
  onNext,
  onPrev,
  disableNext,
  disablePrev
}: {
  image: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  disableNext: boolean;
  disablePrev: boolean;
}) => (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
    <div className="relative w-11/12 md:w-3/4 lg:w-1/2">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white text-black rounded-full p-2">
        ✕
      </button>
      <img
        loading="lazy"
        src={image}
        alt="Modal Image"
        className="w-full rounded-md object-cover"
      />
      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6">
        <button
          disabled={disablePrev}
          onClick={onPrev}
          className="px-4 py-2 bg-gray-200 dark:bg-neutral-800 rounded-md disabled:opacity-50">
          Previous
        </button>
        <button
          disabled={disableNext}
          onClick={onNext}
          className="px-4 py-2 bg-gray-200 dark:bg-neutral-800 rounded-md disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="rounded-[10px] bg-gray-300 dark:bg-neutral-700 aspect-video w-full animate-pulse" />
);

export default FocusCardsDemoPage;
