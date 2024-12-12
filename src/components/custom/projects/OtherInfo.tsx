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
          className="  text-2xl md:text-5xl font-semibold  "
          data={data?.title}
        />
      </motion.div>
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
        className={` ${className} font-aeonikLight `}
        variants={item}
        key={data}>
        {data}
      </motion.p>
    </span>
  );
};
