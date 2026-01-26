"use client";
import { motion } from "framer-motion";

interface HighlighterSpanProps {
    children: React.ReactNode;
    color?: string;
    delay?: number;
    rotation?: number;
    className?: string; // wrapper class
}

const HighlighterSpan = ({ children, color = "bg-green-500", delay = 0, rotation = -1, className = "" }: HighlighterSpanProps) => {
    return (
        <span className={`relative inline-block px-1 ${className}`}>
            <span className="relative z-10">{children}</span>
            <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                className={`absolute inset-y-1 left-0 right-0 ${color} opacity-60 origin-left -z-0`}
                style={{ rotate: rotation }}
                transition={{ duration: 0.8, delay }}
            />
        </span>
    );
};

export default HighlighterSpan;
