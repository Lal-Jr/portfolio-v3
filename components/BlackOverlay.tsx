"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

interface BlackOverlayProps {
	scrollYProgress: MotionValue<number>;
}

export default function BlackOverlay({ scrollYProgress }: BlackOverlayProps) {
	// 1. Harsh Opacity Switch (Pixel-style pop-in)
	const overlayOpacity = useTransform(
		scrollYProgress,
		[0.3, 0.31, 0.42, 0.43],
		[0, 1, 1, 0]
	);

	// 2. Text Animations (Step-based movement feels more "8-bit")
	const textOpacity = useTransform(
		scrollYProgress,
		[0.32, 0.33, 0.4, 0.41],
		[0, 1, 1, 0]
	);

	// Progress bar for the "Loading Story" feel
	const loadingWidth = useTransform(
		scrollYProgress,
		[0.31, 0.38],
		["0%", "100%"]
	);

	return (
		<motion.div
			style={{
				opacity: overlayOpacity,
				display: useTransform(scrollYProgress, (v) =>
					v > 0.45 || v < 0.28 ? "none" : "flex"
				),
			}}
			className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505] pointer-events-none font-['Press_Start_2P']"
		>
			{/* CRT SCANLINE OVERLAY */}
			<div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />

			<motion.div
				style={{ opacity: textOpacity }}
				className="relative z-10 w-full max-w-4xl px-8 flex flex-col items-center"
			>
				{/* SYSTEM TAG */}
				<div className="text-red-600 text-[10px] mb-8 animate-pulse tracking-[0.2em]">
					[ SYSTEM_INTERRUPTION_ERROR_0x01 ]
				</div>

				<div className="space-y-6 text-center">
					<p className="text-zinc-500 text-xs md:text-sm leading-relaxed uppercase">
						The surface level doesn't do it justice. <br />
						To really get it, you need the full story
					</p>

					<h1 className="text-white text-2xl md:text-5xl leading-tight uppercase drop-shadow-[4px_4px_0px_#dc2626]">
						and it goes <br /> like this
					</h1>
				</div>

				{/* RETRO LOADING BAR */}
				<div className="mt-16 w-64 md:w-96 h-6 border-4 border-zinc-800 p-1 relative">
					<motion.div
						style={{ width: loadingWidth }}
						className="h-full bg-red-600 shadow-[0_0_15px_#dc2626]"
					/>
					<div className="absolute -bottom-6 left-0 text-[8px] text-zinc-600">
						DECRYPTING_TIMELINE...
					</div>
				</div>
			</motion.div>

			{/* DECORATIVE CORNERS */}
			<div className="absolute top-10 left-10 w-8 h-8 border-t-4 border-l-4 border-red-600" />
			<div className="absolute top-10 right-10 w-8 h-8 border-t-4 border-r-4 border-red-600" />
			<div className="absolute bottom-10 left-10 w-8 h-8 border-b-4 border-l-4 border-red-600" />
			<div className="absolute bottom-10 right-10 w-8 h-8 border-b-4 border-r-4 border-red-600" />
		</motion.div>
	);
}
