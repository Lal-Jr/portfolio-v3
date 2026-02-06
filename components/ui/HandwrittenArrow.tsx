"use client";
import { motion } from "framer-motion";

interface HandwrittenArrowProps {
    type?: "curved-up" | "curved-down" | "straight" | "loop";
    className?: string;
    color?: string;
    delay?: number;
}

export default function HandwrittenArrow({
    type = "curved-up",
    className = "",
    color = "currentColor",
    delay = 0
}: HandwrittenArrowProps) {

    // Path definitions for different arrow styles
    const paths = {
        "curved-up": "M10,40 Q40,10 80,40",
        "curved-down": "M10,10 Q40,40 80,10",
        "straight": "M10,25 Q45,20 90,30",
        "loop": "M10,40 C30,10 70,10 50,30 C30,50 60,80 90,60"
    };

    // Arrowhead definitions (approximate positions based on path ends)
    const heads = {
        "curved-up": "M75,35 L80,40 L73,43",
        "curved-down": "M73,7 L80,10 L75,15",
        "straight": "M83,25 L90,30 L85,35",
        "loop": "M85,55 L90,60 L83,63"
    };

    return (
        <svg
            width="100"
            height="50"
            viewBox="0 0 100 50"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <motion.path
                d={paths[type]}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: delay, ease: "easeInOut" }}
            />
            <motion.path
                d={heads[type]}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: delay + 0.6 }}
            />
        </svg>
    );
}
