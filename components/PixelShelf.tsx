"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Update this to your real project data
const projects = [
	{
		id: 1,
		title: "Neural-Link",
		year: "2024",
		tech: ["Next.js", "PyTorch", "Tailwind"],
		color: "#e63946",
		h: "h-64",
		w: "w-14",
		desc: "A deep-learning interface for real-time data visualization.",
	},
	{
		id: 2,
		title: "Pixel-Shop",
		year: "2023",
		tech: ["React", "Stripe", "Three.js"],
		color: "#2a9d8f",
		h: "h-48",
		w: "w-16",
		desc: "An immersive 3D e-commerce experience for digital assets.",
	},
	{
		id: 3,
		title: "Grid-OS",
		year: "2024",
		tech: ["Rust", "Wasm", "Vite"],
		color: "#f4a261",
		h: "h-56",
		w: "w-12",
		desc: "Low-level system monitoring dashboard built for the web.",
	},
	{
		id: 4,
		title: "Echo-Base",
		year: "2022",
		tech: ["Node", "Redis", "Socket.io"],
		color: "#8d99ae",
		h: "h-52",
		w: "w-14",
		desc: "Real-time collaborative workspace for distributed teams.",
	},
	{
		id: 5,
		title: "Lumina-UI",
		year: "2024",
		tech: ["Framer", "CSS", "TypeScript"],
		color: "#457b9d",
		h: "h-60",
		w: "w-10",
		desc: "Design system focusing on micro-interactions and accessibility.",
	},
];

export default function ProjectShelf() {
	const [hoveredProject, setHoveredProject] = useState(null);
	const [selectedProject, setSelectedProject] = useState(null);

	return (
		<div className="relative min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-between p-8 overflow-hidden font-mono">
			{/* --- TOP SECTION: DYNAMIC PROJECT DATA --- */}
			<div className="w-full max-w-6xl flex justify-between items-start z-10">
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-2 text-emerald-500 text-xs">
						<span className="animate-pulse">●</span>
						<span className="tracking-widest uppercase">
							Portfolio Index v4.0
						</span>
					</div>
					<h1 className="text-4xl font-bold tracking-tighter">
						PROJECT_ARCHIVE
					</h1>
				</div>

				{/* Hover State Info: Fills the top empty space meaningfully */}
				<AnimatePresence mode="wait">
					{hoveredProject && (
						<motion.div
							key={hoveredProject.id}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							className="text-right"
						>
							<div className="text-3xl font-black italic">
								{hoveredProject.title}
							</div>
							<div className="flex gap-2 justify-end mt-1">
								{hoveredProject.tech.map((t) => (
									<span
										key={t}
										className="text-[10px] border border-white/20 px-2 py-0.5 rounded-full text-white/60 uppercase"
									>
										{t}
									</span>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* --- MIDDLE SECTION: THE SHELF --- */}
			<div className="relative flex flex-col items-center">
				<div className="relative flex items-end px-12 pb-3 bg-[#3e2723] border-b-[20px] border-[#2d1b18] rounded-sm gap-2 shadow-2xl scale-190">
					{projects.map((proj) => (
						<motion.div
							key={proj.id}
							layoutId={`proj-${proj.id}`}
							onMouseEnter={() => setHoveredProject(proj)}
							onMouseLeave={() => setHoveredProject(null)}
							onClick={() => setSelectedProject(proj)}
							className={`relative cursor-pointer ${proj.h} ${proj.w} origin-bottom border-t-2 border-white/5 transition-colors`}
							style={{ backgroundColor: proj.color }}
							whileHover={{ y: -30, scale: 1.05 }}
						>
							{/* Spine Text: Displays the Year */}
							<div className="absolute inset-0 flex flex-col items-center justify-between py-4 pointer-events-none">
								{/* Optional: Adjust or remove this decorative bar if it's in the way */}
								<div className="absolute top-2 left-0 right-0 h-1 bg-black/20" />

								{/* Changed top-4 to top-24 to move it further down */}
								<span className="absolute bottom-10 rotate-90 left-0 right-0 text-center text-[10px] font-bold tracking-widest text-black/40">
									{proj.year}
								</span>

								<div className="absolute bottom-4 left-0 right-0 h-4 bg-black/10" />
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* --- BOTTOM SECTION: THE TERMINAL / NAV --- */}
			<div className="w-full max-w-6xl border-t border-white/10 pt-6 flex justify-between items-end z-10">
				<div className="text-[10px] text-white/30 max-w-xs">
					[SYSTEM_LOG]: Hover over a volume to retrieve repository
					metadata. Select a volume to initialize full project
					documentation.
				</div>

				<div className="flex gap-8">
					<div className="text-right">
						<div className="text-[10px] text-white/40 uppercase">
							Location
						</div>
						<div className="text-xs">40.7128° N, 74.0060° W</div>
					</div>
					<div className="text-right">
						<div className="text-[10px] text-white/40 uppercase">
							Built With
						</div>
						<div className="text-xs font-bold text-emerald-500 underline underline-offset-4">
							Framer Motion
						</div>
					</div>
				</div>
			</div>

			{/* MODAL: Full Project View */}
			<AnimatePresence>
				{selectedProject && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
						{/* Dimmed Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setSelectedProject(null)}
							className="absolute inset-0 bg-black/95 backdrop-blur-md"
						/>

						<motion.div
							layoutId={`proj-${selectedProject.id}`}
							className="relative flex w-full max-w-7xl h-[85vh] z-10 bg-[#fdfaf3] shadow-[40px_40px_0px_rgba(0,0,0,0.4)] border-l-[1px] border-black/10 overflow-hidden"
						>
							{/* LEFT PAGE: All Content & Details */}
							<div className="relative flex-1 p-10 md:p-20 flex flex-col justify-between bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] overflow-y-auto">
								<div className="space-y-12">
									<header className="flex justify-between items-start">
										<div className="space-y-1">
											<span className="text-[10px] uppercase tracking-[0.5em] text-emerald-700 font-bold block">
												Archive // 00
												{selectedProject.id}
											</span>
											<span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium block">
												Project: {selectedProject.year}
											</span>
										</div>
									</header>

									<section>
										<h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-black">
											{selectedProject.title}
										</h2>

										<div className="mt-12 max-w-lg">
											<p className="text-2xl md:text-3xl leading-relaxed text-gray-800 font-serif italic">
												{/* Drop Cap for that book feel */}
												<span className="text-8xl font-black float-left mr-4 mt-2 leading-[0.6] text-black not-italic">
													{selectedProject.desc.charAt(
														0
													)}
												</span>
												{selectedProject.desc.slice(1)}
											</p>
										</div>

										<div className="mt-12 space-y-4">
											<div className="flex gap-4">
												<button className="bg-black text-white px-8 py-4 text-xs font-bold hover:bg-emerald-800 transition-all uppercase tracking-widest">
													Live Demo
												</button>
												<button className="border-2 border-black px-8 py-4 text-xs font-bold hover:bg-black hover:text-white transition-all uppercase tracking-widest">
													Source Code
												</button>
											</div>
											<p className="text-[10px] font-mono text-gray-400 pt-4 border-t border-black/5 uppercase">
												Stack:{" "}
												{selectedProject.tech.join(
													" • "
												)}
											</p>
										</div>
									</section>
								</div>

								<footer className="mt-20 flex justify-between items-end border-t border-black/10 pt-6">
									<div className="text-lg font-serif italic text-gray-300">
										P. {selectedProject.id + 24}
									</div>
								</footer>
							</div>

							{/* CENTER GUTTER: Realistic Spine Depth */}
							<div className="absolute left-1/2 top-0 bottom-0 w-[60px] -ml-[30px] z-20 pointer-events-none bg-gradient-to-r from-black/20 via-transparent to-black/20" />
							<div className="absolute left-1/2 top-0 bottom-0 w-[1px] -ml-[0.5px] z-30 bg-black/10" />

							{/* RIGHT PAGE: Full Image Plate */}
							<div className="relative flex-1 bg-[#ebe8e0] overflow-hidden group">
								<motion.img
									initial={{ scale: 1.1, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									src={selectedProject.image}
									alt="Project Showcase"
									className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
								/>

								{/* Paper Texture Overlay for Image */}
								<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-30 pointer-events-none" />

								{/* Image Caption - "The Plate Label" */}
								<div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-4 border border-black/10 shadow-xl max-w-xs">
									<p className="text-[9px] font-mono leading-tight text-gray-600 uppercase">
										Fig. 0{selectedProject.id} — Visual
										representation of{" "}
										{selectedProject.title} interface logic
										and aesthetics.
									</p>
								</div>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}
