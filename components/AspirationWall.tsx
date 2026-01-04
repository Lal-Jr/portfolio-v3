"use client";
import React from "react";
import { motion } from "framer-motion";

const ASPIRATIONS = [
	{
		text: "MASTER WEBGL_SHADERS",
		color: "bg-yellow-400",
		shadow: "shadow-yellow-900",
		progress: 40,
	},
	{
		text: "LAUNCH_SAAS_STARTUP",
		color: "bg-sky-400",
		shadow: "shadow-sky-900",
		progress: 15,
	},
	{
		text: "SPEAK_AT_REACT_CONF",
		color: "bg-emerald-400",
		shadow: "shadow-emerald-900",
		progress: 60,
	},
	{
		text: "BUILD_DIGITAL_GARDEN",
		color: "bg-rose-400",
		shadow: "shadow-rose-900",
		progress: 85,
	},
	{
		text: "LEAD_CREATIVE_TEAM",
		color: "bg-purple-400",
		shadow: "shadow-purple-900",
		progress: 30,
	},
	{
		text: "CONTRIBUTE_TO_THREEJS",
		color: "bg-orange-400",
		shadow: "shadow-orange-900",
		progress: 10,
	},
];

export default function PixelAspirationWall() {
	return (
		<section className="relative w-full bg-[#0a0a0a] flex flex-col items-center py-24 px-10 overflow-hidden border-t-8 border-white font-['Press_Start_2P']">
			{/* CRT SCANLINES OVERLAY */}
			<div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />

			{/* HEADER AREA */}
			<div className="relative mb-24 text-center">
				<motion.div
					animate={{ scale: [1, 1.05, 1] }}
					transition={{ duration: 2, repeat: Infinity }}
					className="absolute -inset-4 bg-red-600 border-4 border-black -rotate-2 -z-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
				/>
				<h2 className="text-xl md:text-3xl uppercase px-8 py-4 bg-white text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1">
					SIDE_<span className="text-red-600">QUESTS</span>
				</h2>
				<p className="mt-8 text-[10px] text-zinc-500 tracking-widest">
					-- ACTIVE OBJECTIVES --
				</p>
			</div>

			<div className="max-w-6xl w-full relative">
				{/* Notes Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full justify-items-center">
					{ASPIRATIONS.map((note, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							whileHover={{
								y: -10,
								scale: 1.02,
								transition: { type: "spring", stiffness: 300 },
							}}
							className={`relative w-72 p-6 flex flex-col justify-between cursor-crosshair group border-4 border-black ${note.color} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
						>
							{/* TOP BAR DECORATION */}
							<div className="flex justify-between items-center mb-6">
								<div className="flex gap-1">
									<div className="w-2 h-2 bg-black/20" />
									<div className="w-2 h-2 bg-black/20" />
								</div>
								<span className="text-[8px] font-bold text-black/40">
									TASK_{i + 1}
								</span>
							</div>

							{/* TEXT CONTENT */}
							<p className="relative z-10 font-bold text-[12px] md:text-[14px] leading-relaxed text-black mb-8">
								{note.text}
							</p>

							{/* PROGRESS BAR */}
							<div className="space-y-2">
								<div className="flex justify-between text-[7px] text-black/60 mb-1">
									<span>PROGRESS</span>
									<span>{note.progress}%</span>
								</div>
								<div className="w-full h-4 bg-black/20 border-2 border-black p-[2px]">
									<motion.div
										initial={{ width: 0 }}
										whileInView={{
											width: `${note.progress}%`,
										}}
										transition={{ duration: 1, delay: 0.5 }}
										className="h-full bg-white shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]"
									/>
								</div>
							</div>

							{/* CORNER STAMP */}
							<div className="absolute -top-3 -right-3 w-8 h-8 bg-black text-white flex items-center justify-center text-[10px] border-2 border-white rotate-12 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
								!
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* DECORATIVE TERMINAL ACCENT */}
			<div className="mt-24 w-full max-w-4xl border-t-4 border-dashed border-zinc-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
				<div className="flex gap-4">
					<div className="w-3 h-3 bg-red-600 animate-ping" />
					<span className="text-[10px] text-zinc-500 uppercase tracking-tighter">
						System.Sync: Active
					</span>
				</div>
				<div className="text-[8px] text-zinc-700 max-w-xs text-center md:text-right">
					ALL OBJECTIVES ARE SUBJECT TO PERSISTENT ITERATION AND
					RESOURCE ALLOCATION.
				</div>
			</div>
		</section>
	);
}
