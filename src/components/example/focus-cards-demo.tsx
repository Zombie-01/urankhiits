import { FocusCards } from "@/components/ui/focus-cards";

export default function FocusCardsDemo() {
  const cards = [
    {
      title: "Forest Adventure",
      src: "/hero_1.png",
    },
    {
      title: "Valley of life",
      src: "/hero_1.png",
    },
    {
      title: "Sala behta hi jayega",
      src: "/hero_1.png",
    },
    {
      title: "Camping is for pros",
      src: "/hero_1.png",
    },
    {
      title: "The road not taken",
      src: "/hero_1.png",
    },
    {
      title: "The First Rule",
      src: "/hero_1.png",
    },
  ];

  return <FocusCards cards={cards} />;
}
