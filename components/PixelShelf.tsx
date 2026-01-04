"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
	{
		id: 1,
		title: "Neural-Link",
		year: "2024",
		tech: ["Next.js", "PyTorch"],
		color: "bg-red-600",
		icon: "🧠",
		desc: "A DEEP-LEARNING INTERFACE FOR REAL-TIME DATA VISUALIZATION.",
	},
	{
		id: 2,
		title: "Pixel-Shop",
		year: "2023",
		tech: ["React", "Three.js"],
		color: "bg-emerald-500",
		icon: "🛒",
		desc: "IMMERSIVE 3D E-COMMERCE EXPERIENCE FOR DIGITAL ASSETS.",
	},
	{
		id: 3,
		title: "Grid-OS",
		year: "2024",
		tech: ["Rust", "Wasm"],
		color: "bg-orange-500",
		icon: "📟",
		desc: "LOW-LEVEL SYSTEM MONITORING DASHBOARD BUILT FOR WEB.",
	},
	{
		id: 4,
		title: "Echo-Base",
		year: "2022",
		tech: ["Node", "Redis"],
		color: "bg-blue-500",
		icon: "📡",
		desc: "REAL-TIME COLLABORATIVE WORKSPACE FOR TEAMS.",
	},
];

export default function PixelProjectShelf() {
	const [selectedProject, setSelectedProject] = useState(null);

	return (
		<div className="w-full min-h-screen bg-[#0a0a0a] py-20 px-4 font-['Press_Start_2P'] text-white">
			<div className="max-w-6xl mx-auto">
				{/* --- HEADER (Matches Roadmap Style) --- */}
				<div className="text-center mb-20">
					<h2 className="text-2xl md:text-4xl mb-4 text-emerald-400 drop-shadow-[4px_4px_0px_#065f46]">
						PROJECT_ARCHIVE
					</h2>
					<p className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
						-- Select a quest to view details --
					</p>
				</div>

				{/* --- THE SHELF (Gamified Grid) --- */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{projects.map((proj) => (
						<motion.div
							key={proj.id}
							whileHover={{ y: -10 }}
							onClick={() => setSelectedProject(proj)}
							className="group cursor-pointer"
						>
							{/* PROJECT CARD */}
							<div className="relative p-4 bg-zinc-900 border-4 border-zinc-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:border-emerald-400 transition-colors">
								{/* ICON BOX */}
								<div
									className={`${proj.color} w-full h-32 flex items-center justify-center border-4 border-black text-5xl mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
								>
									{proj.icon}
								</div>

								<div className="text-[12px] text-emerald-400 mb-2 uppercase">
									{proj.title}
								</div>

								<div className="flex justify-between items-center text-[8px] text-zinc-500 border-t border-zinc-800 pt-3">
									<span>{proj.year}</span>
									<span>LVL {proj.id}</span>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* --- MODAL (Retro Dialogue Box Style) --- */}
				<AnimatePresence>
					{selectedProject && (
						<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={() => setSelectedProject(null)}
								className="absolute inset-0 bg-black/90 backdrop-blur-sm"
							/>

							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.8, opacity: 0 }}
								className="relative w-full max-w-2xl bg-slate-900 border-4 border-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] z-10"
							>
								{/* CLOSE BUTTON */}
								<button
									onClick={() => setSelectedProject(null)}
									className="absolute -top-4 -right-4 bg-red-600 border-4 border-black px-2 py-1 text-[10px]"
								>
									X
								</button>

								<div className="flex flex-col md:flex-row gap-8">
									{/* MODAL LEFT: ICON */}
									<div
										className={`${selectedProject.color} w-32 h-32 shrink-0 flex items-center justify-center border-4 border-black text-6xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
									>
										{selectedProject.icon}
									</div>

									{/* MODAL RIGHT: INFO */}
									<div className="flex-1">
										<h3 className="text-xl text-yellow-400 mb-4 uppercase italic">
											{selectedProject.title}
										</h3>
										<p className="text-[10px] leading-loose text-zinc-300 mb-6">
											{selectedProject.desc}
										</p>

										<div className="flex flex-wrap gap-3 mb-8">
											{selectedProject.tech.map((t) => (
												<span
													key={t}
													className="text-[8px] bg-black border border-zinc-600 px-2 py-1 text-emerald-400"
												>
													{t}
												</span>
											))}
										</div>

										<div className="flex gap-4">
											<button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black border-4 border-black px-4 py-3 text-[10px] transition-colors">
												START_MISSION
											</button>
											<button className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white border-4 border-black px-4 py-3 text-[10px] transition-colors">
												VIEW_CODE
											</button>
										</div>
									</div>
								</div>

								{/* FOOTER DECORATION */}
								<div className="mt-8 pt-4 border-t-2 border-dashed border-zinc-700 flex justify-between text-[8px] text-zinc-500">
									<span>ID: 00{selectedProject.id}</span>
									<span>STATUS: COMPLETED</span>
								</div>
							</motion.div>
						</div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
