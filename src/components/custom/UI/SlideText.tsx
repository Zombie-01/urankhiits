import React from 'react';
import { motion } from 'framer-motion';

interface SlideTextProps {
    text: string;  
    styleClass?:string
}

const SlideText: React.FC<SlideTextProps> = ({ text, styleClass }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`h-fit relative overflow-hidden cursor-pointer ${styleClass === 'footer' && 'min-w-[6rem]'}   ${styleClass === 'hero' && 'font-medium'} `}
      >
      <motion.div
        variants={{
          initial: { y: 0 },
          hovered: { y: -30 },
        }}
      >
        {text}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        variants={{
          initial: { y: 30, opacity: 0 },
          hovered: { y: 0, opacity: 1 },
        }}
      >
        {text}
      </motion.div>
    </motion.div>
  );
};

export default SlideText;
