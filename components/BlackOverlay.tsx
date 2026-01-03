"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

interface BlackOverlayProps {
	scrollYProgress: MotionValue<number>;
}

export default function BlackOverlay({ scrollYProgress }: BlackOverlayProps) {
	// 1. Fade in (0.3 to 0.33), stay solid, then fade out (0.55 to 0.6)
	const overlayOpacity = useTransform(
		scrollYProgress,
		[0.3, 0.33, 0.4, 0.43],
		[0, 1, 1, 0]
	);

	// 2. Text slide-up & Fade-in
	const textOpacity = useTransform(
		scrollYProgress,
		[0.33, 0.35, 0.37, 0.4],
		[0, 1, 1, 0]
	);

	const textY = useTransform(
		scrollYProgress,
		[0.33, 0.35, 0.37, 0.4],
		[40, 0, 0, -40]
	);

	return (
		<motion.div
			style={{
				opacity: overlayOpacity,
				// Ensure it doesn't block clicks when invisible
				display: useTransform(scrollYProgress, (v) =>
					v > 0.6 || v < 0.3 ? "none" : "flex"
				),
			}}
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black pointer-events-none"
		>
			<motion.div
				style={{ y: textY, opacity: textOpacity }}
				className="text-center px-4"
			>
				<h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter">
					The Next Chapter
				</h1>
				<p className="text-zinc-500 mt-4 text-2xl font-light">
					You've passed the grid. Welcome to the deep dive.
				</p>
			</motion.div>
		</motion.div>
	);
}
