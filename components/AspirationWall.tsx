"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const QUESTS = [
	{
		id: "Q-01",
		title: "ENTER THE 3D REALM",
		desc: "Unlocking WebGL secrets.",
		status: "IN_PROGRESS",
		borderColor: "border-sky-500",
		bg: "bg-sky-500/10",
		rotate: -1
	},
	{
		id: "Q-02",
		title: "FORGE THE GUILD",
		desc: "Assembling elite creatives.",
		status: "LOCKED",
		borderColor: "border-purple-500",
		bg: "bg-purple-500/10",
		rotate: 2
	},
	{
		id: "Q-03",
		title: "NEURAL LINKAGE",
		desc: "Integrating AI agents.",
		status: "OPEN",
		borderColor: "border-emerald-500",
		bg: "bg-emerald-500/10",
		rotate: -2
	},
	{
		id: "Q-04",
		title: "ARCHITECT'S BLUEPRINT",
		desc: "Drafting scalable SaaS.",
		status: "LOCKED",
		borderColor: "border-orange-500",
		bg: "bg-orange-500/10",
		rotate: 1
	},
	{
		id: "Q-05",
		title: "MASTER OF VOID",
		desc: "Studying low-level systems.",
		status: "LOCKED",
		borderColor: "border-rose-500",
		bg: "bg-rose-500/10",
		rotate: -1
	},
	// Duplicates for length
	{
		id: "Q-06",
		title: "QUANTUM LEAP",
		desc: "Exploring quantum computing.",
		status: "LOCKED",
		borderColor: "border-yellow-500",
		bg: "bg-yellow-500/10",
		rotate: 2
	},
	{
		id: "Q-07",
		title: "SYNTHETIC MINDS",
		desc: "Building AGI prototypes.",
		status: "LOCKED",
		borderColor: "border-pink-500",
		bg: "bg-pink-500/10",
		rotate: -2
	}
];

export default function PixelAspirationWall() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"]
	});

	// Map vertical scroll to horizontal movement
	// Adjusted range: Start slightly positive to ensure first item is visible, move slower
	const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

	return (
		<section ref={containerRef} className="relative w-full py-20 overflow-hidden bg-transparent">

			{/* MASK GRADIENTS FOR FADE EFFECT */}
			<div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
			<div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

			{/* SCROLL-DRIVEN STRIP WITH MANUAL DRAG */}
			<div className="flex w-full overflow-visible cursor-grab active:cursor-grabbing">
				<motion.div
					className="w-full"
					style={{ x }}
				>
					<motion.div
						drag="x"
						dragConstraints={{ left: -1000, right: 200 }}
						className="flex gap-10 pl-8 md:pl-32 py-16 w-max" // Added pl-32 for start visibility, py-16 for rotation space
					>
						{QUESTS.map((quest, i) => (
							<motion.div
								key={`${quest.id}-${i}`}
								onClick={(e) => e.stopPropagation()} // Prevent drag click propagation
								whileHover={{
									scale: 1.05,
									rotate: 0,
									zIndex: 100,
									boxShadow: `12px 12px 0px 0px #000`
								}}
								className={`
								relative flex-shrink-0 w-[240px] md:w-[260px] 
								bg-zinc-900 border-4 ${quest.borderColor} 
								p-5 flex flex-col justify-between 
								shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
								group cursor-pointer
							`}
								style={{ rotate: quest.rotate }}
							>
								{/* BUBBLE STATUS TAG */}
								<div className="-mt-8 -mr-6 self-end mb-2 relative z-20">
									<div className={`
									relative px-3 py-1 bg-white text-black font-['Press_Start_2P'] text-[8px] 
									border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]
									transform rotate-3 group-hover:rotate-6 transition-transform
								`}>
										{quest.status}
										{/* Bubble Tail */}
										<div className="absolute bottom-0 left-2 w-2 h-2 bg-white border-r-2 border-b-2 border-black transform translate-y-1/2 rotate-45" />
									</div>
								</div>

								<div className="space-y-3 relative z-10">
									<h3 className="text-xl font-['Press_Start_2P'] text-white leading-tight mt-2">
										{quest.title}
									</h3>
									<div className="w-full h-0.5 bg-white/10 my-2" />
									<p className="text-lg text-zinc-300 font-['var(--font-caveat)'] leading-tight">
										{quest.desc}
									</p>
								</div>

								{/* COMIC HALFTONE BG PATTERN */}
								<div
									className="absolute inset-0 opacity-10 pointer-events-none"
									style={{
										backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
										backgroundSize: '8px 8px',
										color: 'white'
									}}
								/>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
