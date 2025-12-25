"use client";
import { motion } from "framer-motion";

const SKILLS = [
	{ id: "01", name: "REACT_OS", power: 92, desc: "FRONTEND_CORE" },
	{ id: "02", name: "TS_STABLE", power: 88, desc: "TYPE_SAFETY" },
	{ id: "03", name: "NEXT_NODE", power: 95, desc: "SERVER_ENV" },
	{ id: "04", name: "TAILWIND", power: 98, desc: "STYLING_SYS" },
];

export default function TacticalArsenal() {
	return (
		<div className="min-h-screen bg-[#0a0a0a] text-[#00ff41] p-10 font-mono overflow-hidden">
			{/* Background Tech Grid */}
			<div className="fixed inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

			<div className="max-w-6xl mx-auto relative z-10">
				{/* Top Header Bar */}
				<div className="flex justify-between items-end border-b border-[#00ff41]/30 pb-4 mb-12">
					<div>
						<p className="text-[10px] opacity-50 tracking-[0.3em]">
							SYSTEM_VERSION_4.0
						</p>
						<h1 className="text-4xl font-light uppercase tracking-widest">
							Loadout_Selection
						</h1>
					</div>
					<div className="text-right">
						<div className="text-xs">
							STATUS:{" "}
							<span className="animate-pulse">ONLINE</span>
						</div>
						<div className="text-[10px] opacity-50">
							LOCATION: 127.0.0.1
						</div>
					</div>
				</div>

				{/* Arsenal Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#00ff41]/20 border border-[#00ff41]/20">
					{SKILLS.map((skill, i) => (
						<motion.div
							key={skill.id}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ delay: i * 0.15 }}
							whileHover={{
								backgroundColor: "rgba(0, 255, 65, 0.05)",
							}}
							className="relative bg-[#0a0a0a] p-8 group cursor-crosshair overflow-hidden"
						>
							{/* Corner Brackets */}
							<div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff41]" />
							<div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ff41]" />

							<div className="flex justify-between items-start mb-6">
								<div>
									<span className="text-[10px] block mb-1 opacity-50">
										MODULE_{skill.id}
									</span>
									<h2 className="text-2xl font-bold tracking-tighter">
										{skill.name}
									</h2>
								</div>
								<div className="text-right italic text-xs">
									{skill.desc}
								</div>
							</div>

							{/* Technical Power Bar */}
							<div className="space-y-2">
								<div className="flex justify-between text-[10px]">
									<span>OUTPUT_LEVEL</span>
									<span>{skill.power}%</span>
								</div>
								<div className="relative h-2 bg-zinc-900 overflow-hidden">
									<motion.div
										initial={{ width: 0 }}
										whileInView={{
											width: `${skill.power}%`,
										}}
										transition={{
											duration: 1,
											ease: "circOut",
										}}
										className="h-full bg-[#00ff41] shadow-[0_0_15px_#00ff41]"
									/>
									{/* Sliding highlight effect */}
									<motion.div
										animate={{ x: ["-100%", "400%"] }}
										transition={{
											repeat: Infinity,
											duration: 2,
											ease: "linear",
										}}
										className="absolute top-0 bottom-0 w-1/4 bg-white/20 skew-x-12"
									/>
								</div>
							</div>

							{/* Hover Details Reveal */}
							<motion.div className="mt-4 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
								{">"} INITIALIZING_COMPONENTS...
								<br />
								{">"} STABILITY_CHECK: OPTIMAL
							</motion.div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
