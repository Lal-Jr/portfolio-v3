"use client";
import { motion } from "framer-motion";

interface HandDrawnArrowProps {
    rotation?: number;
    color?: string;
}

const HandDrawnArrow = ({ rotation = 0, color = "white" }: HandDrawnArrowProps) => (
    <motion.svg
        width="30" height="30" viewBox="0 0 40 40"
        style={{ rotate: rotation }}
        className="pointer-events-none"
    >
        <motion.path
            d="M20,5 Q25,20 20,35 M12,28 L20,35 L28,28"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        />
    </motion.svg>
);

export default HandDrawnArrow;
