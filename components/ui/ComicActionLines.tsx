"use client";
import { motion } from "framer-motion";

// A hand-placed burst of rays in the spirit of a sparkle/starburst mark: uneven angles,
// uneven lengths, round caps, and only a handful so it stays airy. The values are fixed
// (not Math.random) so it looks the same on every load and can't cause a hydration mismatch.
// Units are the svg viewBox (100x100, centre 50,50); rays start behind the avatar and
// only the part beyond its edge shows. The two rays pointing down stay short so they end
// before the "Here's how" heading, which has a solid background.
const RAYS = [
    { angle: -90, from: 20, to: 35, width: 1.1 },
    { angle: -60, from: 19, to: 37, width: 0.8 },
    { angle: -28, from: 20, to: 46, width: 1.2 },
    { angle: 4, from: 21, to: 42, width: 0.8 },
    { angle: 38, from: 19, to: 47, width: 1.1 },
    { angle: 70, from: 21, to: 29, width: 0.8 },
    { angle: 103, from: 20, to: 28, width: 1.2 },
    { angle: 137, from: 19, to: 43, width: 0.9 },
    { angle: 169, from: 21, to: 49, width: 1.1 },
    { angle: 203, from: 20, to: 39, width: 0.8 },
    { angle: 237, from: 19, to: 36, width: 0.9 },
];

const polar = (angle: number, r: number) => ({
    x: 50 + Math.cos((angle * Math.PI) / 180) * r,
    y: 50 + Math.sin((angle * Math.PI) / 180) * r,
});

interface ComicActionLinesProps {
    className?: string;
}

const ComicActionLines = ({ className = "" }: ComicActionLinesProps) => (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-visible flex items-center justify-center ${className}`}>
        <svg className="absolute h-[560px] w-[560px] md:h-[720px] md:w-[720px] overflow-visible" viewBox="0 0 100 100" aria-hidden>
            {RAYS.map((ray, i) => {
                const a = polar(ray.angle, ray.from);
                const b = polar(ray.angle, ray.to);
                return (
                    <motion.line
                        key={ray.angle}
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke="#DD5E25"
                        strokeWidth={ray.width}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.8 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease: "easeOut" }}
                    />
                );
            })}
        </svg>
    </div>
);

export default ComicActionLines;
