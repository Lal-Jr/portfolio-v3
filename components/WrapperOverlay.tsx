"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

interface WrapperOverlayProps {
	scrollYProgress: MotionValue<number>;
}

export default function WrapperOverlay({
	scrollYProgress,
}: WrapperOverlayProps) {
	// 1. Mechanical Shutter Slide (Sudden and heavy)
	const leftX = useTransform(
		scrollYProgress,
		[0, 0.05, 0.25],
		["0%", "0%", "-100%"]
	);
	const rightX = useTransform(
		scrollYProgress,
		[0, 0.05, 0.25],
		["0%", "0%", "100%"]
	);

	const contentPointerEvents = useTransform(
		scrollYProgress,
		[0, 0.25],
		["auto", "none"]
	);

	return (
		<div
			style={{ pointerEvents: contentPointerEvents as any }}
			className="fixed inset-0 z-[300] overflow-hidden font-['Press_Start_2P']"
		>
			{/* LEFT BLAST DOOR */}
			<motion.div
				style={{ x: leftX }}
				className="absolute top-0 left-0 w-1/2 h-full bg-[#0a0a0a] border-r-4 border-zinc-800 flex flex-col items-end justify-center shadow-[20px_0px_50px_rgba(0,0,0,0.5)]"
			>
				{/* Warning Stripes */}
				<div className="absolute top-0 right-0 w-8 h-full opacity-20 bg-[repeating-linear-gradient(45deg,#fbbf24,#fbbf24_10px,#000_10px,#000_20px)]" />

				<div className="mr-8 text-right z-10">
					<p className="text-red-600 text-[10px] mb-4 animate-pulse">
						SYSTEM_READY
					</p>
					<h1 className="text-white font-black text-2xl md:text-5xl uppercase leading-tight">
						CHAPTER <br />{" "}
						<span className="text-red-600 text-4xl md:text-7xl">
							01
						</span>
					</h1>
				</div>

				{/* Mechanical Detail */}
				<div className="absolute right-4 top-1/4 w-1 h-32 bg-zinc-800" />
				<div className="absolute right-4 bottom-1/4 w-1 h-32 bg-zinc-800" />
			</motion.div>

			{/* RIGHT BLAST DOOR */}
			<motion.div
				style={{ x: rightX }}
				className="absolute top-0 right-0 w-1/2 h-full bg-[#0a0a0a] border-l-4 border-zinc-800 flex flex-col items-start justify-center shadow-[-20px_0px_50px_rgba(0,0,0,0.5)]"
			>
				{/* Warning Stripes */}
				<div className="absolute top-0 left-0 w-8 h-full opacity-20 bg-[repeating-linear-gradient(45deg,#fbbf24,#fbbf24_10px,#000_10px,#000_20px)]" />

				<div className="ml-8 z-10">
					<p className="text-zinc-500 text-[8px] mb-4 uppercase">
						Initializing_Hero_Protocol
					</p>
					<h1 className="text-white font-black text-2xl md:text-5xl uppercase leading-tight drop-shadow-[4px_4px_0px_#dc2626]">
						THE_HERO'S <br /> JOURNEY
					</h1>
				</div>

				{/* Mechanical Detail */}
				<div className="absolute left-4 top-1/4 w-1 h-32 bg-zinc-800" />
				<div className="absolute left-4 bottom-1/4 w-1 h-32 bg-zinc-800" />
			</motion.div>

			{/* SCROLL INSTRUCTION */}
			<motion.div
				style={{
					opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
				}}
				className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-[310]"
			>
				<div className="text-red-600 text-[10px] tracking-[0.3em] animate-pulse">
					PULL_TO_BOOT
				</div>
				<div className="w-[2px] h-12 bg-gradient-to-b from-red-600 to-transparent animate-bounce" />
			</motion.div>

			{/* CRT OVERLAY (Optional, for consistency) */}
			<div className="absolute inset-0 pointer-events-none z-[320] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />
		</div>
	);
}
