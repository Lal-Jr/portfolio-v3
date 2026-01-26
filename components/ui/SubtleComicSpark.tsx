"use client";
import { motion } from "framer-motion";

const SubtleComicSpark = ({ className = "" }: { className?: string }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className={`absolute pointer-events-none ${className}`}
        transition={{ duration: 0.3, ease: "easeOut" }}
    >
        <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-30">
            <motion.path
                d="M50,30 Q52,15 50,0 M75,40 Q85,32 100,25 M80,65 Q92,72 100,85 M50,75 Q48,90 50,100 M20,68 Q10,75 0,85 M22,35 Q12,28 0,20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />
        </svg>
    </motion.div>
);

export default SubtleComicSpark;
