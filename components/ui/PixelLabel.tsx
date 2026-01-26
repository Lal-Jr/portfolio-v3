"use client";
import { motion } from "framer-motion";

const PixelLabel = ({ text, className = "" }: { text: string; className?: string }) => (
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className={`bg-white text-black px-2 py-1 font-['Press_Start_2P'] text-[8px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}
    >
        {text}
    </motion.div>
);

export default PixelLabel;
