"use client";
import React from "react";
import { motion } from "framer-motion";

const data = [
	{ text: "CRITICAL THINKER", type: "STRENGTH", color: "bg-yellow-400" },
	{ text: "PIXEL PERFECT", type: "STRENGTH", color: "bg-cyan-400" },
	{ text: "TS WIZARD", type: "STRENGTH", color: "bg-green-400" },
	{ text: "COFFEE ADDICT", type: "WEAKNESS", color: "bg-red-500" },
	{ text: "NIGHT OWL", type: "WEAKNESS", color: "bg-purple-500" },
];

const ComicAbout = () => {
	return (
		<div className="relative flex items-center justify-center min-h-screen bg-[#f0f0f0] overflow-hidden font-serif">
			{/* 1. BACKGROUND DOTS (Ben-Day Dots) */}
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage: "radial-gradient(#000 2px, transparent 0)",
					backgroundSize: "24px 24px",
				}}
			/>

			{/* 2. THE 3D COMIC STAGE */}
			<div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center [perspective:1500px]">
				{/* THE PLATFORM (2.5D Disc) */}
				<motion.div
					animate={{ rotateZ: 360 }}
					transition={{
						duration: 30,
						repeat: Infinity,
						ease: "linear",
					}}
					className="absolute w-[500px] h-[500px] [transform-style:preserve-3d] [rotateX:70deg]"
				>
					{/* Top of Platform */}
					<div className="absolute inset-0 rounded-full bg-white border-[8px] border-black shadow-[20px_20px_0px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden">
						{/* Halftone Sunburst Pattern */}
						<div className="absolute inset-0 opacity-10 bg-[conic-gradient(from_0deg,#000_0deg_15deg,transparent_15deg_30deg)]" />
						<div className="w-[80%] h-[80%] rounded-full border-[4px] border-dashed border-black/30" />
					</div>

					{/* 3D Thickness (Side of the coin) */}
					<div className="absolute inset-0 rounded-full border-[10px] border-black translate-z-[-20px] bg-zinc-400" />
				</motion.div>

				{/* 3. CENTRAL CHARACTER (The 'Hero' Cutout) */}
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					className="relative z-10 w-64 h-96 flex flex-col items-center justify-end pointer-events-none"
				>
					{/* Main Hero Shadow on Floor */}
					<div className="absolute bottom-5 w-32 h-8 bg-black/20 rounded-full blur-sm" />

					{/* Hero Body */}
					<div className="relative w-full h-full bg-white border-[6px] border-black shadow-[12px_12px_0px_#000] rounded-2xl flex items-center justify-center overflow-hidden">
						{/* Replace this with your SVG/Image */}
						<div className="text-8xl italic font-black text-black select-none">
							YOU
						</div>
						<div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/10 to-transparent" />
					</div>

					{/* Action Caption */}
					<div className="absolute -bottom-6 bg-black text-white px-6 py-2 text-2xl font-black italic -rotate-2 uppercase tracking-tighter">
						Origin Story
					</div>
				</motion.div>

				{/* 4. COMIC DIALOG BOXES (The orbiting 'Pop-ups') */}
				{data.map((item, i) => {
					const angle = i * (360 / data.length) * (Math.PI / 180);
					const radius = 300;
					const x = Math.cos(angle) * radius;
					const z = Math.sin(angle) * radius;

					return (
						<motion.div
							key={i}
							className="absolute z-20"
							initial={{ scale: 0 }}
							animate={{
								scale: 1,
								x: x,
								y: z * 0.3 - 100, // This creates the 2.5D depth illusion
							}}
							whileHover={{ scale: 1.2, zIndex: 50 }}
						>
							<motion.div
								animate={{ y: [0, -15, 0] }}
								transition={{
									duration: 2 + i,
									repeat: Infinity,
								}}
								className={`${item.color} p-4 border-[4px] border-black shadow-[6px_6px_0px_#000] relative`}
							>
								{/* Comic Style Text */}
								<p className="text-[10px] font-bold text-black/60 uppercase mb-1 border-b border-black/20">
									{item.type}
								</p>
								<p className="text-xl font-black italic uppercase leading-none text-black">
									{item.text}
								</p>

								{/* The "Tail" of the speech bubble */}
								<div className="absolute -bottom-4 left-4 w-6 h-6 bg-inherit border-b-[4px] border-r-[4px] border-black rotate-[35deg]" />
							</motion.div>
						</motion.div>
					);
				})}
			</div>

			{/* 5. OVERLAY ACTION BUBBLES (Static Decor) */}
			<div className="absolute bottom-10 left-10 scale-150 opacity-20 rotate-[-15deg] font-black text-7xl select-none">
				POW!
			</div>
			<div className="absolute top-20 right-20 scale-150 opacity-20 rotate-[15deg] font-black text-7xl select-none">
				BAM!
			</div>
		</div>
	);
};

export default ComicAbout;
