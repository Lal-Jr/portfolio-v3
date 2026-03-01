"use client";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { SHELF_PROJECTS } from "@/constants";
import ProjectItem from "@/components/shelf/ProjectItem";

const ProjectDetailView = dynamic(() => import("@/components/shelf/ProjectDetailView"), { ssr: false });
const GitHubGame = dynamic(() => import("./GitHubGame"));

export default function ProjectShelf() {
	const [selectedProject, setSelectedProject] = useState<typeof SHELF_PROJECTS[number] | null>(null);
	const shelfRef = useRef<HTMLDivElement>(null);

	// Track scroll progress through shelf section
	const { scrollYProgress } = useScroll({
		target: shelfRef,
		offset: ["start end", "end start"]
	});

	// Transform values for transition section
	const transitionY = useTransform(scrollYProgress, [0.7, 0.9], [50, 0]);
	const transitionOpacity = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 0.8]);
	const transitionScale = useTransform(scrollYProgress, [0.7, 0.85], [0.9, 1]);

	return (
		<div ref={shelfRef} className="w-full bg-transparent pb-12 pt-12 overflow-visible">
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

			{/* GitHub Game Section - Replaces Archives Button */}
			<div className="mt-24 mb-12">
				<GitHubGame />
			</div>

			{/* MORE IN THE WORKS SECTION - HANDWRITTEN COMIC STYLE */}
			<motion.div
				className="mt-24 flex flex-col items-center justify-center font-['var(--font-caveat)'] text-white"
				style={{ y: transitionY, opacity: transitionOpacity, scale: transitionScale }}
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="relative flex flex-col items-center group"
				>
					{/* Header: Handwritten Font + Comic Pop Lines Only */}
					<div className="relative">
						<motion.h4
							className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide relative z-10 transform -rotate-2 leading-relaxed"
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
							Every project tells a story,<br />
							but the{" "}
							<span className="relative inline-block">
								<span className="relative z-10 font-black italic">real story</span>
								<svg className="absolute -bottom-1 left-0 w-full h-3 z-0" viewBox="0 0 200 10" preserveAspectRatio="none">
									<path d="M0,7 Q10,3 20,7 T40,7 T60,7 T80,7 T100,7 T120,7 T140,7 T160,7 T180,7 T200,7"
										stroke="#2f24fbff" strokeWidth="3" fill="none" strokeLinecap="round" />
								</svg>
							</span>{" "}
							is in how I{" "}
							<span className="relative inline-block">
								<span className="relative z-10 font-black italic">think</span>
								<svg className="absolute -bottom-1 left-0 w-full h-3 z-0" viewBox="0 0 200 10" preserveAspectRatio="none">
									<path d="M0,7 Q10,3 20,7 T40,7 T60,7 T80,7 T100,7 T120,7 T140,7 T160,7 T180,7 T200,7"
										stroke="#ec4899" strokeWidth="3" fill="none" strokeLinecap="round" />
								</svg>
							</span>
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
				</motion.div>
			</motion.div>
		</div>
	);
}
