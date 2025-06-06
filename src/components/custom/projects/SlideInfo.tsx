import React from "react";
import { motion } from "framer-motion";
import OtherInfo from "./OtherInfo";
import { IoMdBookmark } from "react-icons/io";
import { CurrentSlideData, Data } from "./gallery";
import { Link } from "@/i18n/routing";

type Props = {
  transitionData: Data;
  currentSlideData: CurrentSlideData;
};

function SlideInfo({ transitionData, currentSlideData }: Props) {
  return (
    <>
      <OtherInfo
        data={transitionData ? transitionData : currentSlideData.data}
      />
      <motion.div layout className=" mt-5 flex items-center gap-3">
        <Link href={`/project`}>
          <button
            className=" w-fit border-[#ffffff8f] py-3 text-[10px] font-aeonikLight transition duration-300 
          ease-in-out hover:scale-110 underline underline-offset-4 sm:text-lg  ">
            See more
          </button>
        </Link>
      </motion.div>
    </>
  );
}

export default SlideInfo;
