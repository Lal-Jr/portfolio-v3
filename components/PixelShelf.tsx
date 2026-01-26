"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SHELF_PROJECTS } from "@/constants";
import ProjectItem from "@/components/shelf/ProjectItem";
import ProjectDetailView from "@/components/shelf/ProjectDetailView";

export default function PixelProjectShelf() {
	const [selectedProject, setSelectedProject] = useState<typeof SHELF_PROJECTS[number] | null>(null);

	return (
		<div className="w-full bg-transparent pb-14 px-6 overflow-visible">
			<div className="max-w-5xl mx-auto">
				{SHELF_PROJECTS.map((proj, index) => (
					<ProjectItem
						key={proj.id}
						proj={proj}
						index={index}
						onClick={() => setSelectedProject(proj)}
					/>
				))}
			</div>

			<AnimatePresence>
				{selectedProject && (
					<ProjectDetailView
						proj={selectedProject}
						onClose={() => setSelectedProject(null)}
					/>
				)}
			</AnimatePresence>

			{/* MORE IN THE WORKS SECTION - HANDWRITTEN COMIC STYLE */}
			<div className="mt-24 flex flex-col items-center justify-center font-['var(--font-caveat)'] text-white">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="relative flex flex-col items-center group"
				>
					{/* Header: Handwritten Font + Comic Pop Lines Only */}
					<div className="relative mb-12">
						<motion.h4
							className="text-5xl md:text-6xl font-bold tracking-wide relative z-10 transform -rotate-2"
							animate={{
								opacity: [0.8, 1, 0.8],
								y: [0, -4, 0],
								rotate: [-2, -1, -3, -2]
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: "easeInOut"
							}}
							whileHover={{ scale: 1.05, opacity: 1, rotate: 0 }}
						>
							with more in the works...
						</motion.h4>

						{/* Comic 'Stress' Marks - Top Right */}
						<motion.div
							className="absolute -top-12 -right-16 w-24 h-24 pointer-events-none"
							initial={{ scale: 0, opacity: 0 }}
							whileInView={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.5, type: "spring" }}
						>
							<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/80 w-full h-full">
								<path d="M20,80 Q50,50 90,10" strokeLinecap="round" />
								<path d="M50,90 Q65,60 95,40" strokeLinecap="round" />
								<path d="M10,60 Q40,55 90,50" strokeLinecap="round" />
							</svg>
						</motion.div>

						{/* Comic 'Stress' Marks - Bottom Left */}
						<motion.div
							className="absolute -bottom-8 -left-16 w-20 h-20 pointer-events-none"
							initial={{ scale: 0, opacity: 0 }}
							whileInView={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.7, type: "spring" }}
						>
							<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/80 w-full h-full transform rotate-180">
								<path d="M20,80 Q50,50 90,10" strokeLinecap="round" />
								<path d="M50,90 Q65,60 95,40" strokeLinecap="round" />
								<path d="M10,60 Q40,55 90,50" strokeLinecap="round" />
							</svg>
						</motion.div>
					</div>

					{/* Integrated GitHub Link in Speech Bubble */}
					<div className="relative flex flex-col items-center">
						<p className="mb-6 text-xl md:text-2xl text-zinc-400 text-center max-w-sm leading-6 font-['var(--font-caveat)']">
							(only a few can fit on this shelf!)
						</p>

						<a
							href="https://github.com/Lal-Jr"
							target="_blank"
							rel="noopener noreferrer"
							className="group relative inline-flex items-center gap-4 bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-4 border-4 border-black shadow-[4px_4px_0px_0px_#fff] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#fff]"
						>
							<span className="text-[10px] md:text-xs uppercase font-bold font-['Press_Start_2P']">Check out the archives</span>

							{/* Pixel Arrow Icon */}
							<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="transform group-hover:translate-x-1 transition-transform">
								<path d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z" />
							</svg>

							{/* Pixel GitHub Icon */}
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="hidden md:block">
								<path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
							</svg>
						</a>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
