import React from "react";
import { motion } from "framer-motion";

type Props = {
  data: any;
};
const item = {
  hidden: {
    y: "100%",
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 }
  },
  visible: {
    y: 0,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 }
  }
};

function OtherInfo({ data }: Props) {
  return (
    <motion.div initial="hidden" animate={"visible"} className=" flex flex-col">
      <motion.div
        initial="hidden"
        animate={"visible"}
        className=" flex flex-col sm:flex-row items-center gap-8">
        <AnimatedText
          className=" spacing overflow-hidden text-[#D5D5D6]"
          data={data?.location}
        />
        <AnimatedText
          className=" my-1 text-xl font-semibold md:my-3 "
          data={data?.title}
        />
      </motion.div>
      <AnimatedText
        className=" text-xs text-[#D5D5D6]"
        data={data?.description}
      />
    </motion.div>
  );
}

export default OtherInfo;

const AnimatedText = ({
  data,
  className
}: {
  data?: string;
  className?: string;
}) => {
  return (
    <span
      style={{
        overflow: "hidden",
        display: "inline-block"
      }}>
      <motion.p
        className={` ${className} font-sans `}
        variants={item}
        key={data}>
        {data}
      </motion.p>
    </span>
  );
};
