"use client";
import React from "react";

const STRENGTHS = [
	{
		text: "CRITICAL THINKER",
		color: "#facc15",
		top: "20%",
		left: "12%",
		trailPos: "bottom-[-20px] right-0",
	},
	{
		text: "PIXEL PERFECT",
		color: "#22d3ee",
		top: "45%",
		left: "8%",
		trailPos: "top-[-10px] right-[-10px]",
	},
	{
		text: "TS WIZARD",
		color: "#4ade80",
		top: "25%",
		right: "12%",
		trailPos: "bottom-[-20px] left-0",
	},
	{
		text: "COFFEE ADDICT",
		color: "#ef4444",
		top: "52%",
		right: "8%",
		trailPos: "top-[-10px] left-[-10px]",
	},
	{
		text: "NIGHT OWL",
		color: "#a855f7",
		top: "10%",
		left: "42%",
		trailPos: "bottom-[-30px] left-1/2",
	},
];

export default function ComicHeroScene() {
	return (
		<div className="relative w-full h-[65vh] flex items-end justify-center overflow-hidden">
			{/* --- THOUGHT BUBBLES --- */}
			<div className="absolute inset-0 max-w-6xl mx-auto pointer-events-none">
				{STRENGTHS.map((item, i) => (
					<div
						key={i}
						className="absolute animate-bounce"
						style={{
							top: item.top,
							left: item.left,
							right: item.right,
							animationDelay: `${i * 0.15}s`,
							animationDuration: "4s",
						}}
					>
						<div className="relative">
							{/* Thought Trail (The little circles) */}
							<div
								className={`absolute ${item.trailPos} flex flex-col items-center gap-1`}
							>
								<div
									className="w-4 h-4 rounded-full border-[3px] border-black shadow-[2px_2px_0px_#000]"
									style={{ backgroundColor: item.color }}
								/>
								<div
									className="w-2 h-2 rounded-full border-[2px] border-black shadow-[1px_1px_0px_#000]"
									style={{ backgroundColor: item.color }}
								/>
							</div>

							{/* Bubble Body */}
							<div
								className="px-8 py-3 border-[4px] border-black shadow-[6px_6px_0px_#000] font-black italic uppercase whitespace-nowrap"
								style={{
									backgroundColor: item.color,
									borderRadius: "100px", // Cloud-like rounded shape
									fontSize: "1.1rem",
									transform: "skewX(-5deg)",
								}}
							>
								{item.text}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* --- THE HERO IMAGE --- */}
			<div className="relative z-10 w-full max-w-md mb-[-10px]">
				<img
					src="/avatars/IMG_7739.png"
					alt="Hero Avatar"
					className="w-full h-auto object-contain"
					style={{
						filter: "drop-shadow(0 20px 15px rgba(0, 0, 0, 0.3))",
					}}
				/>
			</div>

			{/* --- COMIC FLOOR SHADOW --- */}
			<div className="absolute bottom-6 w-72 h-8 bg-black/20 rounded-[100%] blur-xl" />
		</div>
	);
}
