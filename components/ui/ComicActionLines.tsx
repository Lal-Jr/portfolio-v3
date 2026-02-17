"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Line = {
    id: number;
    angle: number;
    length: number;
    delay: number;
};


interface ComicActionLinesProps {
    className?: string;
}

const ComicActionLines = ({ className = "" }: ComicActionLinesProps) => {
    const [lines, setLines] = useState<Line[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLines(Array.from({ length: 10 }).map((_, i) => ({
                id: i,
                angle: (i / 10) * 360 + (Math.random() - 0.5) * 30,
                length: 80 + Math.random() * 40,
                delay: Math.random() * 5,
            })));
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`absolute inset-0 pointer-events-none z-0 overflow-visible flex items-center justify-center ${className}`}>
            <svg className="w-[500px] h-[500px] absolute opacity-30" viewBox="0 0 100 100">
                {lines.map((line) => (
                    <motion.line
                        key={line.id}
                        x1="50"
                        y1="50"
                        x2={50 + Math.cos((line.angle * Math.PI) / 180) * line.length}
                        y2={50 + Math.sin((line.angle * Math.PI) / 180) * line.length}
                        stroke="#666666"
                        strokeWidth="1"
                        strokeDasharray="1 3"
                        strokeLinecap="square"
                        initial={{ pathLength: 1, opacity: 0 }}
                        animate={{
                            opacity: [0.1, 0.4, 0.1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: line.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};

export default ComicActionLines;
