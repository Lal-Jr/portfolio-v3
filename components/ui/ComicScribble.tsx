"use client";
import { motion } from "framer-motion";

interface ComicScribbleProps {
    className?: string;
    type?: "default" | "zigzag" | "loop";
    width?: number;
    color?: string;
}

const ComicScribble = ({ className = "", type = "default", width = 80, color }: ComicScribbleProps) => {

    // Different SVG paths for variety
    const paths = {
        default: "M30,50 C30,20 70,20 70,50 C70,80 30,80 30,50 C30,30 60,30 60,50 C60,70 40,70 40,50",
        zigzag: "M10,50 L30,20 L50,80 L70,20 L90,50",
        loop: "M10,50 Q30,0 50,50 T90,50"
    };

    return (
        <motion.div
            initial={{ scale: 0, rotate: -30, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 30, opacity: 0 }}
            className={`absolute pointer-events-none ${className}`}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ width: width, height: width }} // Aspect ratio maintenance or just container size
        >
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-60" style={{ color: color }}>
                <motion.path
                    d={paths[type]}
                    fill="none"
                    stroke={color || "currentColor"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "linear" }}
                />
            </svg>
        </motion.div>
    );
};

export default ComicScribble;
