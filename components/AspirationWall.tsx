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
		<section className="relative w-full flex flex-col items-center py-12 px-10 overflow-hidden font-['Press_Start_2P']">

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
		</section>
	);
}
