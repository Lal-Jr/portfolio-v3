"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

interface BlackOverlayProps {
	scrollYProgress: MotionValue<number>;
}

export default function BlackOverlay({ scrollYProgress }: BlackOverlayProps) {
	// 1. UI Transition Logic
	const barHeight = useTransform(
		scrollYProgress,
		[0.30, 0.34, 0.45, 0.52],
		["0vh", "12vh", "12vh", "0vh"]
	);

	const contentOpacity = useTransform(
		scrollYProgress,
		[0.34, 0.37, 0.45, 0.5],
		[0, 1, 1, 0]
	);

	// Narrative Text for Bottom Bar
	const storyText = useTransform(
		scrollYProgress,
		[0.34, 0.40, 0.44],
		[
			"THE SURFACE ONLY REVEALS SO MUCH...",
			"TO UNDERSTAND THE ARCHITECT...",
			"WE MUST GO DEEPER.",
		]
	);

	return (
		<motion.div
			style={{ opacity: contentOpacity }}
			className="fixed inset-0 z-[200] pointer-events-none font-['Press_Start_2P']"
		>
			{/* TOP BAR - CHAPTER TRACKER */}
			<motion.div
				style={{ height: barHeight }}
				className="absolute top-0 left-0 w-full bg-black/95 border-b border-zinc-800 flex items-center justify-between px-10"
			></motion.div>

			{/* BOTTOM BAR (Dialogue Box) */}
			<motion.div
				style={{ height: barHeight }}
				className="absolute bottom-0 left-0 w-full bg-black/90 border-t border-red-900/30 flex flex-col items-center justify-center px-10"
			>
				{/* Story Text */}
				<motion.p className="text-white text-[10px] md:text-xs text-center max-w-2xl leading-loose uppercase tracking-wide">
					{storyText}
				</motion.p>

				{/* RPG Progress Bar (The Sync) */}
				<div className="mt-4 w-48 h-1 bg-zinc-800 relative">
					<motion.div
						style={{
							width: useTransform(
								scrollYProgress,
								[0.30, 0.48],
								["0%", "100%"]
							),
						}}
						className="h-full bg-red-600"
					/>
				</div>
			</motion.div>

			{/* MINIMAL HUD FRAME (Corners) */}
			<div className="absolute inset-x-10 inset-y-[20vh] border-x border-white/5 flex justify-between">
				<div className="h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
				<div className="h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
			</div>
		</motion.div>
	);
}
