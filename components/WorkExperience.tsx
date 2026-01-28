"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { EXPERIENCE_DATA } from "@/constants";
import ScribbleNode from "@/components/ui/ScribbleNode";
import HandDrawnArrow from "@/components/ui/HandDrawnArrow";
import PixelLabel from "@/components/ui/PixelLabel";

export default function WorkExperience() {
	const [activeNode, setActiveNode] = useState<string | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const activeJob = EXPERIENCE_DATA.find(n => n.id === activeNode);

	return (
		<div
			ref={containerRef}
			className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-20 bg-[#111]"
		>
			{/* HYBRID BACKGROUND: Pixel Grid + Subtle Texture */}
			<div
				className="absolute inset-0 opacity-10 pointer-events-none"
				style={{
					backgroundImage: `
						linear-gradient(to right, #444 1px, transparent 1px),
						linear-gradient(to bottom, #444 1px, transparent 1px)
					`,
					backgroundSize: '40px 40px'
				}}
			/>

			<div className="max-w-7xl w-full px-8 relative z-10">

				{/* HEADLINE: Pixel Font */}
				<div className="absolute top-0 left-8 md:left-12 z-20">
					<h2 className="text-xl md:text-3xl font-['Press_Start_2P'] text-white leading-relaxed drop-shadow-[4px_4px_0_#000]">
						LEVEL UP:<br />
						<span className="text-yellow-400">EXPERIENCE</span>
					</h2>
				</div>

				{/* The Curve Container */}
				<div className="relative w-full h-[600px] mt-12">

					{/* HAND-DRAWN LAYER: The Wave SVG */}
					<svg
						viewBox="0 0 1000 400"
						className="absolute inset-0 w-full h-full pointer-events-none"
						preserveAspectRatio="none"
					>
						{/* Dashed guide line (Pixel/Tech feel) */}
						<motion.path
							d="M0,350 Q100,200 200,280 T400,250 T700,100 T1000,50"
							fill="none"
							stroke="#333"
							strokeWidth="4"
							strokeLinecap="round"
							strokeDasharray="8 8"
						/>
						{/* Actual Hand-drawn White Line */}
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
					{EXPERIENCE_DATA.map((node) => (
						<div
							key={node.id}
							className="absolute transform -translate-x-1/2 -translate-y-1/2"
							style={{ left: node.x, top: node.y }}
						>
							{/* Label and Arrow (Hand-drawn + Pixel Hybrid) */}
							<div className="absolute bottom-full mb-4 flex flex-col items-center">
								{/* Pixel Label specifically for the Title */}
								<div className="mb-2">
									<PixelLabel text={node.label} />
								</div>

								{/* Hand Drawn Arrow pointing down to node */}
								<HandDrawnArrow rotation={node.arrowRotation} color={node.nodeColor} />
							</div>

							{/* Node Clickable Area: Hand Drawn Scribble */}
							<button
								onMouseEnter={() => setActiveNode(node.id)}
								onMouseLeave={() => setActiveNode(null)}
								onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
								className="relative z-20 focus:outline-none group scale-110 hover:scale-125 transition-transform duration-300"
							>
								{/* Using ScribbleNode for the organic feel */}
								<ScribbleNode
									icon={node.icon}
									color={node.nodeColor}
									isActive={activeNode === node.id}
									isSpecial={(node as any).isSpecial}
								/>

								{/* Pixel Selection Marker (The Red Arrow) for active state override */}
								{activeNode === node.id && (
									<motion.div
										layoutId="active-arrow-marker"
										className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none"
										initial={{ y: -5 }}
										animate={{ y: 0 }}
										transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
									>
										<div className="w-0 h-0 
											border-l-[8px] border-l-transparent
											border-r-[8px] border-r-transparent
											border-t-[12px] border-t-red-500"
										/>
									</motion.div>
								)}
							</button>
						</div>
					))}

					{/* UI OVERLAY: Pixel Style Popup Card */}
					<AnimatePresence>
						{activeNode && activeJob && (
							<motion.div
								initial={{ opacity: 0, scale: 0.9, y: 10 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.9, y: 10 }}
								className="absolute top-1/2 left-1/2 md:left-auto md:right-10 md:top-1/3 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 z-[100] w-[320px] pointer-events-none md:pointer-events-auto"
							>
								<div className="bg-zinc-900 border-4 border-white shadow-[8px_8px_0_0_#000] p-1">
									<div className="border-2 border-white/20 p-5 bg-zinc-900">
										{/* Header */}
										<div className="flex justify-between items-start mb-6 border-b-2 border-dashed border-white/20 pb-4">
											<div>
												<h3 className="font-['Press_Start_2P'] text-white text-xs leading-5 uppercase text-yellow-400">
													{activeJob.company}
												</h3>
												<p className="font-['Press_Start_2P'] text-[10px] text-zinc-400 mt-2">
													{activeJob.period}
												</p>
											</div>
											<div className="text-3xl filter grayscale opacity-80">{activeJob.icon}</div>
										</div>

										{/* Content */}
										<div className="space-y-4">
											<div>
												<p className="font-['Press_Start_2P'] text-[10px] text-blue-400 mb-2">
													CLASS:
												</p>
												<p className="font-bold text-white text-lg">
													{activeJob.role}
												</p>
											</div>

											<div className="bg-white/5 p-3 border border-white/10 rounded-sm">
												<p className="font-['Press_Start_2P'] text-[10px] text-green-400 mb-2">
													QUEST LOG:
												</p>
												<p className="font-['var(--font-caveat)'] text-2xl text-zinc-200 leading-tight">
													"{activeJob.desc}"
												</p>
											</div>
										</div>

										{/* Footer Decor */}
										<div className="mt-6 flex justify-between items-end">
											<div className="text-[9px] font-['Press_Start_2P'] text-zinc-600 animate-pulse">
												PRESS START
											</div>
											<div className="flex gap-1">
												<div className="w-2 h-2 bg-red-500 rounded-sm" />
												<div className="w-2 h-2 bg-yellow-500 rounded-sm" />
												<div className="w-2 h-2 bg-green-500 rounded-sm" />
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

				</div>
			</div>
		</div>
	);
}
