"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const experience = [
	{
		id: "daily-planet",
		company: "Daily Planet",
		role: "Junior Developer",
		period: "2019 - 2021",
		desc: "Modernized legacy CMS systems. Automated global news reporting pipelines.",
		icon: "🗞️",
		color: "text-sky-400",
		nodeColor: "#38bdf8",
		x: "15%",
		y: "65%",
		arrowRotation: -15,
		label: "Start",
	},
	{
		id: "wayne",
		company: "Wayne Enterprises",
		role: "UI/UX Developer",
		period: "2021 - 2023",
		desc: "Developed dark-mode specialized dashboards. Implemented stealth-first accessibility features.",
		icon: "🦇",
		color: "text-slate-400",
		nodeColor: "#94a3b8",
		x: "40%",
		y: "75%",
		arrowRotation: 10,
		label: "Growth",
	},
	{
		id: "stark",
		company: "Stark Industries",
		role: "Lead Frontend Engineer",
		period: "2023 - PRESENT",
		desc: "Architected reactive HUD interfaces using Next.js. Optimized performance for low-latency combat data streams.",
		icon: "🛡️",
		color: "text-rose-400",
		nodeColor: "#fb7185",
		x: "65%",
		y: "45%",
		arrowRotation: -20,
		label: "Lead",
	},
	{
		id: "ai",
		company: "Future Path",
		role: "AI Integration Specialty",
		period: "ONGOING",
		desc: "Leveraging machine learning to solve complex architectural problems and crafting intelligent interfaces.",
		icon: "🤖",
		color: "text-green-400",
		nodeColor: "#4ade80",
		x: "90%",
		y: "55%",
		arrowRotation: -10,
		label: "Focus: AI",
		isSpecial: true,
	},
];

const ScribbleNode = ({ icon, color = "white", isActive = false, isSpecial = false }: { icon: string, color?: string, isActive?: boolean, isSpecial?: boolean }) => (
	<div className="relative w-16 h-16 flex items-center justify-center">
		<svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
			<motion.path
				d="M30,50 C30,30 70,30 70,50 C70,70 30,70 30,50 M35,45 C35,25 75,25 75,45 C75,65 35,65 35,45 M25,55 C25,35 65,35 65,55 C65,75 25,75 25,55"
				fill="none"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				initial={{ pathLength: 0 }}
				whileInView={{ pathLength: 1 }}
				transition={{ duration: 1.5, ease: "easeInOut" }}
			/>
		</svg>
		<div className={`relative z-10 text-2xl transition-transform duration-300 ${isActive ? 'scale-125' : 'scale-100'}`}>
			{icon}
		</div>
		{isSpecial && (
			<motion.div
				className="absolute inset-0 rounded-full bg-green-500/10 blur-xl"
				animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
				transition={{ repeat: Infinity, duration: 2 }}
			/>
		)}
	</div>
);

const HandDrawnArrow = ({ rotation = 0, color = "white" }: { rotation?: number, color?: string }) => (
	<motion.svg
		width="30" height="30" viewBox="0 0 40 40"
		style={{ rotate: rotation }}
		className="pointer-events-none"
	>
		<motion.path
			d="M20,5 Q25,20 20,35 M12,28 L20,35 L28,28"
			fill="none"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			initial={{ pathLength: 0 }}
			whileInView={{ pathLength: 1 }}
			transition={{ duration: 0.8, delay: 0.5 }}
		/>
	</motion.svg>
);

export default function WorkRoadmap() {
	const [activeNode, setActiveNode] = useState<string | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const activeJob = experience.find(n => n.id === activeNode);

	return (
		<div
			ref={containerRef}
			className="relative w-full min-h-[60vh] flex flex-col items-center justify-center overflow-hidden py-10"
		>
			<div className="max-w-7xl w-full px-8 relative">

				{/* The Curve Container */}
				<div className="relative w-full h-[500px] mt-12">
					{/* The Wave SVG */}
					<svg
						viewBox="0 0 1000 400"
						className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
						preserveAspectRatio="none"
					>
						<motion.path
							d="M0,350 Q100,200 200,280 T400,250 T700,100 T1000,50"
							fill="none"
							stroke="white"
							strokeWidth="3"
							strokeLinecap="round"
							initial={{ pathLength: 0 }}
							whileInView={{ pathLength: 1 }}
							transition={{ duration: 2, ease: "easeInOut" }}
						/>
					</svg>

					{/* Nodes and Labels */}
					{experience.map((node) => (
						<div
							key={node.id}
							className="absolute transform -translate-x-1/2 -translate-y-1/2"
							style={{ left: node.x, top: node.y }}
						>
							{/* Label and Arrow */}
							<div className="absolute bottom-full mb-2 flex flex-col items-center font-['var(--font-caveat)']">
								<span className={`text-3xl font-bold mb-1 ${node.color}`}>
									{node.label}
								</span>
								<HandDrawnArrow rotation={node.arrowRotation} color={node.nodeColor} />
							</div>

							{/* Node clickable area */}
							<button
								onMouseEnter={() => setActiveNode(node.id)}
								onMouseLeave={() => setActiveNode(null)}
								onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
								className="relative z-20 focus:outline-none group"
							>
								<ScribbleNode
									icon={node.icon}
									color={node.nodeColor}
									isActive={activeNode === node.id}
									isSpecial={node.isSpecial}
								/>

								{/* Hint for mobile or just flavor */}
								{node.isSpecial && (
									<motion.span
										className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-zinc-500 whitespace-nowrap font-['var(--font-caveat)']"
										animate={{ opacity: [0.4, 1, 0.4] }}
										transition={{ repeat: Infinity, duration: 2 }}
									>
										Current Focus
									</motion.span>
								)}
							</button>
						</div>
					))}

					{/* Detailed Description (Static UI from ref image) */}
					<div className="absolute bottom-10 right-0 md:right-10 max-w-lg text-right pointer-events-none font-['var(--font-caveat)']">
						<div className="text-2xl md:text-3xl font-medium text-zinc-500 leading-tight">
							I focus on understanding... {" "}
							<span className="text-white">who I'm helping</span>,
							<br />
							<span className="text-white">what they're struggling with</span>, and
							<br />
							<span className="text-white">why this problem matters now</span>.
						</div>
					</div>

					{/* Pop-up info box for experience data */}
					<AnimatePresence>
						{activeNode && activeJob && (
							<motion.div
								initial={{ opacity: 0, scale: 0.9, y: 10 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.9, y: 10 }}
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-zinc-950/90 backdrop-blur-xl border-2 border-white/10 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-sm pointer-events-none"
							>
								<div className="space-y-4">
									<div className="space-y-1">
										<p className="font-['var(--font-press-start)'] text-[10px] text-zinc-500 italic">
											{activeJob.period}
										</p>
										<h5 className="font-['var(--font-press-start)'] text-xl font-bold text-white uppercase tracking-tight">
											{activeJob.company}
										</h5>
									</div>
									<p className="font-['var(--font-press-start)'] text-[12px] text-zinc-300 font-bold">
										{activeJob.role}
									</p>
									<p className="font-['var(--font-caveat)'] text-2xl text-zinc-400 leading-snug">
										{activeJob.desc}
									</p>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
