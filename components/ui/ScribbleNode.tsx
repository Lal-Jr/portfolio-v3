"use client";
import { motion } from "framer-motion";

interface ScribbleNodeProps {
    color?: string;
    isSpecial?: boolean;
    className?: string;
}

const ScribbleNode = ({ color = "white", isSpecial = false, className = "" }: ScribbleNodeProps) => (
    <div className={`relative w-16 h-16 flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <motion.path
                d="M30,50 C30,30 70,30 70,50 C70,70 30,70 30,50 M35,45 C35,25 75,25 75,45 C75,65 35,65 35,45 M25,55 C25,35 65,35 65,55 C65,75 25,75 25,55"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
        </svg>
        {isSpecial && (
            <motion.div
                className="absolute inset-0 rounded-full bg-green-500/10 blur-xl"
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ repeat: Infinity, duration: 2 }}
            />
        )}
    </div>
);

export default ScribbleNode;
