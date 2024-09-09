'use client';
import { AnimatePresence, motion } from "framer-motion";

export function HeaderTitle() {
  const text = "Caring for those who care first";
  const gradual = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="flex space-x-1 w-full justify-center">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.h1
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={gradual}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="text-center font-display  text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[3rem]"
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}