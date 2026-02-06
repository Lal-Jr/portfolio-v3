"use client";
import React from "react";
import { motion } from "framer-motion";

interface StickyNoteProps {
    color?: "yellow" | "cyan" | "pink" | "orange";
    rotate?: number;
    className?: string;
    children: React.ReactNode;
    delay?: number;
}

const COLORS = {
    yellow: "bg-[#fff740]",
    cyan: "bg-[#40ffdc]",
    pink: "bg-[#ff7eb6]",
    orange: "bg-[#ffb340]"
};

export default function StickyNote({
    color = "yellow",
    rotate = 0,
    className = "",
    children,
    delay = 0
}: StickyNoteProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: rotate + 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: rotate }}
            viewport={{ once: true }}
            transition={{
                type: "spring",
                damping: 20,
                stiffness: 200,
                delay: delay
            }}
            className={`
                relative p-4 md:p-6 w-[180px] md:w-[220px] aspect-square 
                shadow-[4px_4px_10px_rgba(0,0,0,0.3)] 
                text-black font-['var(--font-caveat)'] text-lg md:text-xl leading-tight
                ${COLORS[color]} ${className}
                flex flex-col items-center justify-center text-center
            `}
        >
            {/* Top Tape Effect (Optional visual detail) */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/20 rotate-1 backdrop-blur-[1px]" />

            {children}
        </motion.div>
    );
}
