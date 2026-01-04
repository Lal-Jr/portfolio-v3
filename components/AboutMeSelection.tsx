"use client";
import React from "react";
import { motion } from "framer-motion";

const STRENGTHS = [
	{
		text: "CRITICAL_THINKER",
		color: "bg-yellow-400",
		top: "15%",
		left: "10%",
	},
	{ text: "PIXEL_PERFECT", color: "bg-cyan-400", top: "40%", left: "5%" },
	{ text: "TS_WIZARD", color: "bg-emerald-400", top: "20%", right: "10%" },
	{ text: "COFFEE_ADDICT", color: "bg-red-500", top: "48%", right: "5%" },
	{ text: "NIGHT_OWL", color: "bg-purple-500", top: "5%", left: "40%" },
];

export default function PixelHeroScene() {
	return (
		<div className="relative w-full h-[75vh] flex items-end justify-center overflow-hidden bg-[#0a0a0a] font-['Press_Start_2P']">
			{/* --- SCANLINE OVERLAY --- */}
			<div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />

			{/* --- FLOATING ATTRIBUTES (Pixel Speech Bubbles) --- */}
			<div className="absolute inset-0 max-w-6xl mx-auto pointer-events-none z-20">
				{STRENGTHS.map((item, i) => (
					<motion.div
						key={i}
						initial={{ y: 0 }}
						animate={{ y: [0, -15, 0] }}
						transition={{
							duration: 3,
							repeat: Infinity,
							delay: i * 0.4,
							ease: "easeInOut",
						}}
						className="absolute"
						style={{
							top: item.top,
							left: item.left,
							right: item.right,
						}}
					>
						<div className="relative group">
							{/* The "Pointer" (Pixelated arrow) */}
							<div
								className={`absolute w-4 h-4 bg-white border-2 border-black rotate-45 -bottom-2 left-1/2 -translate-x-1/2 z-0`}
							/>

							{/* Bubble Body */}
							<div
								className={`relative px-4 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${item.color} text-black text-[10px] md:text-[12px] whitespace-nowrap z-10`}
							>
								{item.text}
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* --- HERO IMAGE CONTAINER --- */}
			<div className="relative z-10 w-full max-w-md flex flex-col items-center">
				{/* Level Up Prompt */}
				<motion.div
					animate={{ opacity: [0, 1, 0] }}
					transition={{ duration: 1.5, repeat: Infinity }}
					className="mb-4 text-[10px] text-yellow-400"
				>
					PRESS_START_TO_LEVEL_UP
				</motion.div>

				<div className="relative border-b-8 border-emerald-500 pb-2">
					<img
						src="/avatars/IMG_7739.png" // Ensure this is a pixel-art style or high-contrast image
						alt="Hero Avatar"
						className="w-full h-auto object-contain image-pixelated"
						style={{
							filter: "drop-shadow(0 0 20px rgba(52, 211, 153, 0.2))",
							imageRendering: "pixelated",
						}}
					/>
				</div>

				{/* NAME PLATE */}
				<div className="mt-6 px-6 py-2 bg-black border-4 border-white shadow-[6px_6px_0px_0px_#22c55e]">
					<h1 className="text-white text-sm md:text-lg">
						PLAYER_ONE
					</h1>
				</div>
			</div>

			{/* --- PLATFORM / FLOOR --- */}
			<div className="absolute bottom-0 w-full h-24 bg-[repeating-linear-gradient(90deg,#111_0px,#111_40px,#1a1a1a_40px,#1a1a1a_80px)] opacity-40 border-t-4 border-zinc-800" />

			{/* AMBIENT GLOW */}
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-emerald-500/20 blur-[100px] rounded-full" />
		</div>
	);
}
