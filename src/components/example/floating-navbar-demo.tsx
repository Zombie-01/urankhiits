"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import {
  IconBrain,
  IconHome,
  IconMessage,
  IconUser,
} from "@tabler/icons-react";
import { HeartHandshake } from "lucide-react";
import { FlipWords } from "../ui/flip-words";
export default function FloatingNavDemo() {
  const words = ["Our service", "About us"];
  const navItems = [
    {
      name: "Home",
      link: "/#",
      icon: <IconHome className="h-4 w-4 text-white dark:text-black" />,
    },
    {
      name: <FlipWords words={words} />,
      link: "/oursercive",
      icon: <HeartHandshake className="h-4 w-4 text-white dark:text-black" />,
    },
    {
      name: "Projects",
      link: "/#projects",
      icon: <IconUser className="h-4 w-4 text-white dark:text-black" />,
    },
    {
      name: "AI",
      link: "/ai",
      icon: <IconBrain className="h-4 w-4 text-white dark:text-black" />,
    },

    {
      name: "Contact",
      link: "/#contact",
      icon: <IconMessage className="h-4 w-4 text-white dark:text-black" />,
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
