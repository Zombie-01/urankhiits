"use client";
import React, { ReactNode, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string | ReactNode;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={
          {
            // opacity: 1,
            // y: -100,
          }
        }
        animate={
          {
            // y: visible ? 0 : -100,
            // opacity: visible ? 1 : 0,
          }
        }
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit  fixed bg-black/80 px-4 dark:bg-white/80 top-5 inset-x-0 mx-auto border border-transparent  rounded-full z-[5000]  py-2  items-center justify-center space-x-4",
          className
        )}>
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative  items-center flex space-x-1 text-white dark:text-black hover:scale-110 transition-all"
            )}>
            <span className="block text-white dark:text-black sm:hidden">
              {navItem.icon}
            </span>
            <span className="hidden sm:block font-semibold text-sm">
              {navItem.name}
            </span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
