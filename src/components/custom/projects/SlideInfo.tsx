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
            className=" w-fit border-[#ffffff8f] px-6 py-3 text-[10px] font-thin transition duration-300 
          ease-in-out hover:bg-white sm:text-xl hover:text-black ">
            See more
          </button>
        </Link>
      </motion.div>
    </>
  );
}

export default SlideInfo;
