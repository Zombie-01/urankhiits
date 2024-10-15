import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { Compare } from "../ui/compare";
import Image from "next/image";
import { Modal } from "../ui/animated-modal";
import { divMode } from "@tsparticles/engine";
import AnimatedModalDemo from "./animated-modal-demo";
import Link from "next/link";

const images = [
  {
    id: 1,
    src: "/images/images.jpg",
    out: "/images/output.png",
    alt: "Image 1",
  },
  {
    id: 2,
    src: "/images/bedroom.jpg",
    out: "/images/bedoutreal.png",
    alt: "Image of a bedroom",
  },
  {
    id: 3,
    src: "/images/kitchen.jpg",
    out: "/images/kitchenout.png",
    alt: "Image of a kitchen",
  },
  {
    id: 4,
    src: "/images/bathroom.jpg",
    out: "/images/bathout.png",
    alt: "Image of a bathroom",
  },
  {
    id: 5,
    src: "/images/sketch.jpg",
    out: "/images/sketchout.png",
    alt: "Sketch image",
  },
  {
    id: 6,
    src: "/images/hand.jpg",
    out: "/images/handout.png",
    alt: "Image of a hand",
  },
];

export default function InfiniteMovingCardsDemo() {
  return (
    <Modal>
      <div className="">
        <div className="w-full flex justify-between items-center container mx-auto">
          <div className="flex flex-col gap-4">
            <h2 className="text-black dark:text-white font-bold md:text-[26px]">
              URAN AI
            </h2>
            <p className="text-black whitespace-nowrap w-min dark:text-white px-4 py-2 bg-[#f4f4f4] rounded-xl dark:bg-white/10">
              Generated images
            </p>
          </div>

          <Link
            href="/ai"
            className="bg-black px-4 py-2 rounded-md text-center relative overflow-hidden  dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
            <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 text-sm sm:text-xl">
              Try it URAN AI
            </span>
            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white ">
              🤖
            </div>
          </Link>
        </div>
        <InfiniteMovingCards
          items={images.map((image) => ({
            id: image.id,
            item: image,
            content: (
              <div>
                <Image
                  fill
                  src={image.out}
                  alt={"generated" + image.alt}
                  className=" aspect-video object-contain "
                />
              </div>
            ),
          }))}
          direction="right"
          speed="normal"
        />
        <InfiniteMovingCards
          items={images.map((image) => ({
            id: image.id,
            item: image,
            content: (
              <Image
                src={image.out}
                fill
                alt="generated"
                className=" aspect-video object-contain "
              />
            ),
          }))}
          direction="left"
          speed="normal"
        />
      </div>
    </Modal>
  );
}
