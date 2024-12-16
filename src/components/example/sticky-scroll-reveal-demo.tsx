"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";
import { SubTitle } from "../custom/SubTitle";
import Link from "next/link";

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];
export default function StickyScrollRevealDemo() {
  return (
    <div>
      <StickyScroll content={content} />
      <div className="flex mt-xl flex-col justify-center items-center gap-10">
        <div>
          <Link href="/aboutus">
            <span
              id="badge"
              className="ml px-10 py-3 bg-transparent border-2 border-black dark:border-white rounded-3xl text-md">
              See More
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
