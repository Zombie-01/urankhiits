"use client";
import React from "react";
import Title from "../Title";
import { motion } from "framer-motion";
import { SubTitle } from "../SubTitle";

const FooterHero = ({
  word,
  title,
  id,
}: {
  word: string;
  title: string;
  id?: string;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0.2,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        margin: "0% 0% -50% 0%",
      }}
      className="lg:py-[12rem]"
      id={id}>
      <SubTitle text={title} />

      <div>
        <Title text={word} scalePivot={"top center"} />
      </div>
    </motion.div>
  );
};

export default FooterHero;
