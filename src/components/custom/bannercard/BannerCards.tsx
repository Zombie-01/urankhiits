import React from "react";
import Card from "./Card";
import { SubTitle } from "../SubTitle";
import Link from "next/link";

export const bannerCards = [
  { title: "WHITE LINERS", image: "/hero_1.png" },
  { title: "GREEN AUDIO", image: "/hero_2.png" },
  { title: "NANOTECH", image: "/hero_3.png" },
  { title: "COOL DUDE", image: "/hero_4.png" },
  { title: "SPHERE DIGITAL", image: "/hero_1.png" },
];

export const BannerCards = () => {
  return (
    <main className="container mx-auto">
      <section
        id="bannercards"
        className="flex flex-col gap-[10vh] relative py-[5vh]">
        {bannerCards?.map((item, i) => (
          <Card
            key={item.title}
            imgUrl={`${item.image}`}
            title={item.title}
            video={i === 3 ? true : false}
          />
        ))}
      </section>
      <div className="flex mt-xl flex-col justify-center items-center gap-10">
        <SubTitle
          text={
            "CRAFTING WEBSITES WHERE THE ELEGANCE <br/> OF DESIGN INTERSECTS WITH THE SCIENCE OF SELLING PRODUCTS."
          }
        />
        <div>
          <Link href="/project">
            <span
              id="badge"
              className="ml px-10 py-3 bg-transparent border-2 border-black dark:border-white rounded-3xl text-md">
              See All works
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};
