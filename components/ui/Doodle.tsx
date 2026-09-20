"use client";
import { motion } from "framer-motion";

const SHAPES = {
	squiggle: "M4,20 C14,4 22,36 32,20 S50,4 60,20 S78,36 88,20",
	star: "M25,3 L29,20 L46,22 L32,32 L37,47 L25,38 L13,47 L18,32 L4,22 L21,20 Z",
	spiral: "M28,28 C28,22 36,22 36,28 C36,38 20,38 20,26 C20,12 44,12 44,28 C44,46 12,46 12,24",
	zigzag: "M4,30 L16,8 L28,30 L40,8 L52,30 L64,8",
	cross: "M8,8 L40,40 M40,8 L8,40",
	loop: "M4,40 C20,40 28,10 40,14 C52,18 40,38 30,28 C22,20 40,6 70,10",
	circle: "M30,4 C50,2 58,24 44,40 C30,54 4,44 4,26 C4,10 22,2 40,6",
	burst: "M24,4 L24,16 M24,32 L24,44 M4,24 L16,24 M32,24 L44,24 M10,10 L18,18 M30,30 L38,38 M38,10 L30,18 M18,30 L10,38",
} as const;

export type DoodleShape = keyof typeof SHAPES;

/** A faint hand-drawn mark that draws itself in when scrolled into view. Decorative only. */
export default function Doodle({
	shape,
	className = "",
	color = "currentColor",
	size = 56,
	rotate = 0,
	delay = 0,
}: {
	shape: DoodleShape;
	className?: string;
	color?: string;
	size?: number;
	rotate?: number;
	delay?: number;
}) {
	return (
		<svg
			aria-hidden
			viewBox={shape === "squiggle" || shape === "zigzag" || shape === "loop" ? "0 0 92 48" : "0 0 50 50"}
			width={size}
			height={size * (shape === "squiggle" || shape === "zigzag" || shape === "loop" ? 0.52 : 1)}
			fill="none"
			className={`pointer-events-none absolute hidden select-none md:block ${className}`}
			style={{ transform: `rotate(${rotate}deg)`, color }}
		>
			<motion.path
				d={SHAPES[shape]}
				stroke="currentColor"
				strokeWidth={2.5}
				strokeLinecap="round"
				strokeLinejoin="round"
				initial={{ pathLength: 0, opacity: 0 }}
				whileInView={{ pathLength: 1, opacity: 0.55 }}
				viewport={{ once: true, margin: "-10%" }}
				transition={{ duration: 1.1, delay, ease: "easeOut" }}
			/>
		</svg>
	);
}
