"use client";
import { motion } from "framer-motion";

const SKILLS = [
	{ name: "React", level: "90", color: "bg-cyan-400", label: "CORE" },
	{ name: "Next.js", level: "85", color: "bg-white", label: "ENGINE" },
	{ name: "Tailwind", level: "95", color: "bg-teal-300", label: "STYLING" },
	{ name: "Framer", level: "80", color: "bg-fuchsia-500", label: "MOTION" },
];

export default function ComicArsenal() {
	return (
		<div className="bg-yellow-400 p-8 font-black">
			<div className="max-w-5xl mx-auto">
				{/* The Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
					{SKILLS.map((skill, i) => (
						<motion.div
							key={skill.name}
							whileHover={{ y: -5, x: -5 }}
							className="relative w-64 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group"
						>
							{/* Category Label */}
							<div className="absolute -top-4 -right-2 bg-red-500 text-white px-2 py-1 border-2 border-black text-xs rotate-12 group-hover:rotate-0 transition-transform">
								{skill.label}
							</div>

							{/* Title */}
							<h3 className="text-2xl uppercase mb-4 mt-2">
								{skill.name}
							</h3>

							{/* Comic Progress Bar (Segmented) */}
							<div className="flex gap-1 h-8 border-2 border-black p-1 bg-zinc-100">
								{[...Array(10)].map((_, step) => (
									<motion.div
										key={step}
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										transition={{
											delay: i * 0.1 + step * 0.05,
										}}
										className={`h-full flex-1 ${
											step < parseInt(skill.level) / 10
												? skill.color
												: "bg-zinc-300"
										} border-r border-black last:border-0`}
									/>
								))}
							</div>

							{/* Halftone Texture Overlay (Pure CSS) */}
							<div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#000_1px,transparent_0)] [background-size:4px_4px] group-hover:opacity-20 transition-opacity" />
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
