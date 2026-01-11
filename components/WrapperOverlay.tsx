"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

interface WrapperOverlayProps {
	scrollYProgress: MotionValue<number>;
}

export default function WrapperOverlay({
	scrollYProgress,
}: WrapperOverlayProps) {
	// 1. Cinematic "Curtain" Lift - Softer and more theatrical than heavy doors
	const topY = useTransform(
		scrollYProgress,
		[0, 0.15, 0.3],
		["0%", "0%", "-100%"]
	);
	const bottomY = useTransform(
		scrollYProgress,
		[0, 0.15, 0.3],
		["0%", "0%", "100%"]
	);

	// Smoothly fade out the text elements before the panels finish moving
	const contentOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

	return (
		<div className="fixed inset-0 z-[300] pointer-events-none overflow-hidden font-['Press_Start_2P']">
			{/* TOP PANEL - Elegant RPG Header Style */}
			<motion.div
				style={{ y: topY }}
				className="absolute top-0 left-0 w-full h-1/2 bg-[#0d0d0f] border-b-2 border-[#2a2a2e] flex flex-col items-center justify-end pb-12"
			>
				<motion.div
					style={{ opacity: contentOpacity }}
					className="text-center"
				>
					<p className="text-[#8b8b8f] text-[9px] tracking-[0.4em] mb-6 uppercase">
						The Chronicle Begins
					</p>
					<h1 className="text-[#f0f0f0] text-2xl md:text-4xl tracking-tighter">
						CHAPTER <span className="text-amber-500">I</span>
					</h1>
				</motion.div>

				{/* Subtle Corner Accents */}
				<div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-zinc-700" />
				<div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-zinc-700" />
			</motion.div>

			{/* BOTTOM PANEL */}
			<motion.div
				style={{ y: bottomY }}
				className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0d0d0f] border-t-2 border-[#2a2a2e] flex flex-col items-center justify-start pt-12"
			>
				<motion.div
					style={{ opacity: contentOpacity }}
					className="text-center"
				>
					<h2 className="text-[#f0f0f0] text-xl md:text-3xl uppercase tracking-widest italic opacity-90">
						The Hero's Journey
					</h2>
					<div className="mt-4 w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto" />
				</motion.div>

				{/* Subtle Corner Accents */}
				<div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-zinc-700" />
				<div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-zinc-700" />
			</motion.div>

			{/* REFINED SCROLL INDICATOR */}
			<motion.div
				style={{
					opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
				}}
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[310] flex flex-col items-center"
			>
				<div className="px-4 py-2 border border-zinc-800 bg-black/50 backdrop-blur-sm">
					<span className="text-amber-500/80 text-[8px] tracking-[0.2em]">
						SCROLL TO START
					</span>
				</div>
				{/* A more "Final Fantasy" style diamond cursor */}
				<div className="mt-4 w-2 h-2 bg-amber-500 rotate-45 animate-pulse shadow-[0_0_10px_#f59e0b]" />
			</motion.div>

			{/* VIGNETTE (Softer than CRT) */}
			<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
		</div>
	);
}
