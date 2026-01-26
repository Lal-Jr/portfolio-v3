"use client";
import { motion } from "framer-motion";

const ComicScribble = ({ className = "" }: { className?: string }) => (
    <motion.div
        initial={{ scale: 0, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0, rotate: 30, opacity: 0 }}
        className={`absolute pointer-events-none ${className}`}
        transition={{ duration: 0.3, ease: "easeOut" }}
    >
        <svg viewBox="0 0 100 100" className="w-20 h-20 opacity-20">
            <motion.path
                d="M30,50 C30,20 70,20 70,50 C70,80 30,80 30,50 C30,30 60,30 60,50 C60,70 40,70 40,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "linear" }}
            />
        </svg>
    </motion.div>
);

export default ComicScribble;
