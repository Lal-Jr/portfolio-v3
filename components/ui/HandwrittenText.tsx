"use client";
import { motion } from "framer-motion";

interface HandwrittenTextProps {
    text: string;
    className?: string;
    /** seconds before the first character appears (to chain text after another line) */
    delay?: number;
    /** seconds between characters */
    speed?: number;
}

// Characters fade in one by one. They only change opacity, never `display`, so the full
// text takes up its final space from the first frame and surrounding content never shifts.
const HandwrittenText = ({ text, className = "", delay = 0, speed = 0.05 }: HandwrittenTextProps) => {
    const characters = Array.from(text);

    const containerVariants = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: speed,
                delayChildren: delay,
            },
        },
    };

    const characterVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.01,
            },
        },
    };

    return (
        <motion.span
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className={className}
        >
            {characters.map((char, index) => (
                <motion.span key={index} variants={characterVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default HandwrittenText;
