"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const experience = [
	{
		company: "Stark Industries",
		role: "Lead Frontend Engineer",
		period: "2023 - PRESENT",
		desc: "Architected reactive HUD interfaces using Next.js. Optimized performance for low-latency combat data streams.",
		icon: "🛡️",
		color: "bg-rose-500",
		skills: ["Next.js", "TypeScript", "Tailwind"],
	},
	{
		company: "Wayne Enterprises",
		role: "UI/UX Developer",
		period: "2021 - 2023",
		desc: "Developed dark-mode specialized dashboards. Implemented stealth-first accessibility features.",
		icon: "🦇",
		color: "bg-slate-700",
		skills: ["React", "Framer Motion", "Three.js"],
	},
	{
		company: "Daily Planet",
		role: "Junior Developer",
		period: "2019 - 2021",
		desc: "Modernized legacy CMS systems. Automated global news reporting pipelines.",
		icon: "🗞️",
		color: "bg-sky-500",
		skills: ["JavaScript", "Node.js", "PostgreSQL"],
	},
];

export default function WorkRoadmap() {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start center", "end center"],
	});

	const scaleY = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<div
			ref={containerRef}
			className="w-full bg-[#0a0a0a] py-32 px-4 font-['Press_Start_2P'] text-white"
		>
			<div className="max-w-4xl mx-auto relative">
				{/* SECTION HEADER */}
				<div className="text-center mb-32">
					<h2 className="text-2xl md:text-4xl mb-4 text-yellow-400 drop-shadow-[4px_4px_0px_#7a5c00]">
						EXPERIENCE_LOG
					</h2>
					<p className="text-[10px] text-zinc-500 animate-pulse uppercase tracking-[0.2em]">
						-- Scrolling to synchronize timeline --
					</p>
				</div>

				{/* THE PROGRESS LINE */}
				<div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-2 bg-zinc-800 border-x border-zinc-700">
					<motion.div
						style={{ scaleY, originY: 0 }}
						className="w-full h-full bg-yellow-400 shadow-[0_0_15px_#facc15]"
					/>
				</div>

				{experience.map((job, index) => {
					const isEven = index % 2 === 0;
					return (
						<div
							key={index}
							className={`relative flex items-center mb-32 w-full ${
								isEven ? "flex-row" : "flex-row-reverse"
							}`}
						>
							{/* CONTENT BOX */}
							<motion.div
								initial={{ opacity: 0, x: isEven ? -50 : 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								className={`w-[45%] ${
									isEven ? "text-right" : "text-left"
								}`}
							>
								<div className="relative p-6 bg-zinc-900 border-4 border-zinc-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:border-yellow-400 transition-colors group">
									<span className="text-[10px] text-yellow-500 mb-2 block tracking-tighter">
										{job.period}
									</span>
									<h3 className="text-[14px] mb-2 leading-tight uppercase group-hover:text-yellow-400">
										{job.company}
									</h3>
									<p className="text-[11px] text-zinc-400 mb-4 leading-relaxed font-sans font-bold">
										{job.role}
									</p>
									<p className="text-[9px] leading-relaxed text-zinc-500 mb-4 lowercase italic">
										{job.desc}
									</p>

									{/* SKILL TAGS */}
									<div
										className={`flex flex-wrap gap-2 ${
											isEven
												? "justify-end"
												: "justify-start"
										}`}
									>
										{job.skills.map((skill) => (
											<span
												key={skill}
												className="text-[7px] bg-black border border-zinc-700 px-2 py-1 text-zinc-400"
											>
												{skill}
											</span>
										))}
									</div>

									{/* SPEECH BUBBLE POINTER */}
									<div
										className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent 
                                        ${
											isEven
												? "-right-[24px] border-l-[20px] border-l-zinc-700"
												: "-left-[24px] border-r-[20px] border-r-zinc-700"
										}`}
									/>
								</div>
							</motion.div>

							{/* CENTER NODE */}
							<div className="relative z-10 w-[10%] flex justify-center">
								<motion.div
									whileInView={{
										scale: [0, 1.2, 1],
										rotate: [0, 90, 0],
									}}
									viewport={{ once: true }}
									className={`${job.color} w-14 h-14 flex items-center justify-center border-4 border-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative`}
								>
									{job.icon}
									{/* Achievement Glow */}
									<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
								</motion.div>
							</div>

							{/* EMPTY SIDE */}
							<div className="w-[45%]" />
						</div>
					);
				})}

				{/* FINAL GOAL NODE */}
				<div className="relative flex justify-center mt-20">
					<motion.div
						initial={{ y: 0 }}
						animate={{ y: [0, -10, 0] }}
						transition={{ repeat: Infinity, duration: 2 }}
						className="bg-yellow-400 text-black px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_#7a5c00] text-xs"
					>
						BOSS_LEVEL_AWAITS
					</motion.div>
				</div>
			</div>
		</div>
	);
}
