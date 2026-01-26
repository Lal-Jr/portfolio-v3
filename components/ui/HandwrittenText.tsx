"use client";
import { motion } from "framer-motion";

const HandwrittenText = ({ text, className = "" }: { text: string; className?: string }) => {
    const characters = Array.from(text);

    const containerVariants = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const characterVariants = {
        initial: { opacity: 0, display: "none" },
        animate: {
            opacity: 1,
            display: "inline",
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
