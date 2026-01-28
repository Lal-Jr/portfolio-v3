"use client";
import React from "react";
import { motion } from "framer-motion";

interface PixelLevelNodeProps {
    icon: string;
    isLocked?: boolean;
    isActive?: boolean;
    isSpecial?: boolean;
    color?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

const PixelLevelNode = ({
    icon,
    isLocked = false,
    isActive = false,
    isSpecial = false,
    color = "bg-sky-500",
    onClick,
    onMouseEnter,
    onMouseLeave
}: PixelLevelNodeProps) => {

    // Base styles for the pixel box
    const baseClasses = `
        relative w-16 h-16 flex items-center justify-center
        border-4 border-black box-border
        transition-transform duration-100 ease-steps-2
        cursor-pointer select-none
    `;

    // Active state scales it up slightly
    const activeClasses = isActive ? "scale-110 z-30" : "hover:scale-105 z-20";

    // Locked vs Unlocked appearances
    const bgClass = isLocked ? "bg-zinc-800" : (isActive ? "bg-white" : "bg-zinc-900");
    const shadowClass = isActive
        ? "shadow-[6px_6px_0px_0px_#000]"
        : "shadow-[4px_4px_0px_0px_#000]";

    return (
        <motion.div
            className={`${baseClasses} ${activeClasses} ${bgClass} ${shadowClass}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            whileTap={{ scale: 0.95, translateY: 2 }}
        >
            {/* Inner border for depth */}
            <div className="absolute inset-0 border-2 border-white/10 pointer-events-none" />

            {/* Icon */}
            <div className={`text-2xl ${isLocked ? "grayscale opacity-50" : ""}`}>
                {icon}
            </div>

            {/* "Completed" or "Star" indicator for special nodes */}
            {isSpecial && !isLocked && (
                <div className="absolute -top-3 -right-3">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 bg-yellow-400 border-2 border-black flex items-center justify-center text-[10px]"
                    >
                        ★
                    </motion.div>
                </div>
            )}

            {/* Selection Triangle (Like a quest marker) */}
            {isActive && (
                <motion.div
                    layoutId="active-arrow"
                    className="absolute -top-8 left-1/2 -translate-x-1/2"
                    initial={{ y: -5 }}
                    animate={{ y: 0 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
                >
                    <div className="w-0 h-0 
                        border-l-[8px] border-l-transparent
                        border-r-[8px] border-r-transparent
                        border-t-[12px] border-t-red-500"
                    />
                </motion.div>
            )}
        </motion.div>
    );
};

export default PixelLevelNode;
