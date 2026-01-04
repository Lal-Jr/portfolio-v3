"use client";
import { AVATARS } from "@/constants";
import ZoomPanel from "./ZoomPanel";
import { motion, useTransform, MotionValue } from "framer-motion";

interface ContentGridProps {
	scrollYProgress: MotionValue<number>;
}

export default function ContentGrid({ scrollYProgress }: ContentGridProps) {
	const panels = [
		{
			id: "peace",
			title: "01_CHARACTER_BIO",
			desc: "ENJOYING_LIFE_XP_PROGRESSION",
			color: "bg-pink-500",
			avatar: AVATARS.PEACE,
			grid: "md:col-span-1 md:row-span-2",
			isTall: true,
		},
		{
			id: "move",
			title: "02_TRAVEL_LOGS",
			desc: "ZOOMING_TOWARD_NEXT_MILESTONE",
			color: "bg-orange-500",
			avatar: AVATARS.BIKE,
			grid: "md:col-span-2",
		},
		{
			id: "aresenal",
			title: "03_TECH_ARSENAL",
			desc: "PREPARED_FOR_THE_DEV_VERSE",
			color: "bg-blue-500",
			avatar: AVATARS.CELEBRATE,
			grid: "md:col-span-1 md:row-span-2",
			isTall: true,
		},
		{
			id: "hands",
			title: "04_FOCUS_MODE",
			desc: "ENSURING_STABILITY_AND_CONTROL",
			color: "bg-emerald-500",
			avatar: AVATARS.FOOTBALL,
			grid: "md:col-span-1 md:row-span-1",
		},
		{
			id: "jump",
			title: "05_SKILL_TREE",
			desc: "CLIMBING_RANKS_LEVELING_UP",
			color: "bg-yellow-500",
			avatar: AVATARS.JUMP,
			grid: "md:col-span-1 md:row-span-1",
		},
		{
			id: "signal",
			title: "06_COMM_LINK",
			desc: "READY_TO_SEIZE_OPPORTUNITY",
			color: "bg-purple-600",
			avatar: AVATARS.ME,
			grid: "md:col-span-1 md:row-span-1",
		},
	];

	const contentPointerEvents = useTransform(
		scrollYProgress,
		[0, 0.2, 0.25],
		["none", "none", "auto"]
	);

	const gridOpacity = useTransform(scrollYProgress, [0.2, 0.25], [0, 1]);

	return (
		<div className="sticky top-0 h-screen flex flex-col items-center justify-center p-4 bg-[#050505] font-['Press_Start_2P'] overflow-hidden">
			{/* 1. THE SCANNING LINE (Makes the overview feel active) */}
			<motion.div
				animate={{ top: ["0%", "100%", "0%"] }}
				transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
				className="absolute left-0 right-0 h-[2px] bg-red-600/20 z-20 shadow-[0_0_15px_rgba(220,38,38,0.5)] pointer-events-none"
			/>

			{/* 2. GRID BACKGROUND */}
			<div
				className="absolute inset-0 opacity-10 pointer-events-none"
				style={{
					backgroundImage:
						"linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
					backgroundSize: "60px 60px",
				}}
			/>

			{/* HEADER INTERFACE */}
			<motion.div
				style={{ opacity: gridOpacity }}
				className="relative w-full max-w-7xl mb-6 flex flex-col md:flex-row justify-between items-end border-l-4 border-red-600 pl-4 z-30"
			>
				<div>
					<div className="text-red-600 text-[10px] mb-1 animate-pulse">
						● DATABASE_ACCESS_GRANTED
					</div>
					<h2 className="text-white text-xl md:text-3xl tracking-tighter">
						ARCHIVE_OVERVIEW
					</h2>
				</div>
				<div className="text-[8px] text-zinc-500 mt-2 md:mt-0 font-mono">
					SECTOR_77 // MODE: SELECTION_VIEW
				</div>
			</motion.div>

			{/* THE LEVELS GRID */}
			<motion.div
				style={{
					pointerEvents: contentPointerEvents,
					opacity: gridOpacity,
					scale: useTransform(
						scrollYProgress,
						[0.2, 0.25],
						[0.92, 1]
					),
				}}
				className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[200px] md:auto-rows-[240px] w-full max-w-7xl z-10"
			>
				{panels.map((panel, idx) => (
					<motion.div
						key={panel.id}
						className={`${panel.grid} relative group overflow-hidden border-2 border-transparent hover:border-white/40 transition-colors`}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: idx * 0.05 }}
					>
						{/* INDEX OVERLAY */}
						<div className="absolute top-2 left-2 z-30 bg-black text-white text-[8px] px-1 py-0.5 border border-zinc-700">
							NODE_{idx + 1}
						</div>

						{/* HOVER GLITCH EFFECT COVER */}
						<div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-colors z-20 pointer-events-none" />

						<ZoomPanel
							{...panel}
							avatarSrc={panel.avatar}
							description={panel.desc}
							isTall={panel.isTall}
						/>
					</motion.div>
				))}
			</motion.div>

			{/* FOOTER - INSTRUCTIONS */}
			<motion.div
				style={{ opacity: gridOpacity }}
				className="w-full max-w-7xl mt-8 grid grid-cols-3 items-center z-10"
			>
				<div className="h-[2px] bg-zinc-800 w-full" />
				<div className="text-center">
					<span className="text-[9px] text-red-600 animate-bounce block mb-1">
						▼
					</span>
					<span className="text-[8px] text-zinc-400">
						SCROLL_TO_DIVE_INTO_NODES
					</span>
				</div>
				<div className="h-[2px] bg-zinc-800 w-full" />
			</motion.div>
		</div>
	);
}
