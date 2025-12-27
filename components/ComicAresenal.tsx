"use client";
import { motion } from "framer-motion";

const ARSENAL = [
	{
		id: "M-01",
		name: "React",
		level: 90,
		accent: "bg-[#e11d48]",
		text: "text-[#e11d48]",
		label: "PRIMARY_FRAME",
	},
	{
		id: "M-02",
		name: "Next.js",
		level: 85,
		accent: "bg-[#2563eb]",
		text: "text-[#2563eb]",
		label: "PROPULSION",
	},
	{
		id: "M-03",
		name: "Tailwind",
		level: 95,
		accent: "bg-[#059669]",
		text: "text-[#059669]",
		label: "SURFACE_SHIELD",
	},
	{
		id: "M-04",
		name: "Framer",
		level: 80,
		accent: "bg-[#d97706]",
		text: "text-[#d97706]",
		label: "KINETIC_DRIVE",
	},
];

export default function SolidArsenal() {
	return (
		<div className="p-10 font-mono text-black">
			{/* Heavy Construction Background Grid */}
			<div className="fixed inset-0 bg-[radial-gradient(#d1d1d1_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

			<div className="max-w-6xl mx-auto relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{ARSENAL.map((item) => (
						<motion.div
							key={item.id}
							whileHover={{ y: -8 }}
							className="relative bg-white border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group"
						>
							{/* Tool Category Vertical Bar */}
							<div
								className={`absolute top-0 left-0 bottom-0 w-3 ${item.accent} border-r-[3px] border-black`}
							/>

							<div className="p-8 pl-10">
								<div className="flex justify-between items-start mb-6">
									<div>
										<span className="text-xs font-black uppercase tracking-widest text-zinc-400">
											Inventory_ID
										</span>
										<h3 className="text-2xl font-black tracking-tighter leading-none">
											{item.id}
										</h3>
									</div>
									<div
										className={`w-12 h-12 border-4 border-black flex items-center justify-center font-black text-xl group-hover:bg-black group-hover:text-white transition-colors`}
									>
										+
									</div>
								</div>

								<h2 className="text-5xl font-black uppercase tracking-tighter mb-2 italic">
									{item.name}
								</h2>
								<div className="flex items-center gap-2 mb-8">
									<span
										className={`px-2 py-0.5 text-[10px] font-black text-white uppercase ${item.accent}`}
									>
										{item.label}
									</span>
									<div className="h-[2px] flex-1 bg-black" />
								</div>

								{/* Mechanical Gauge */}
								<div className="space-y-3">
									<div className="flex justify-between font-black text-xs uppercase tracking-widest">
										<span>Performance Output</span>
										<span>{item.level}%</span>
									</div>

									<div className="h-10 border-4 border-black p-1 bg-zinc-100 relative">
										<motion.div
											initial={{ width: 0 }}
											whileInView={{
												width: `${item.level}%`,
											}}
											transition={{
												duration: 1,
												ease: "easeOut",
											}}
											className={`h-full ${item.accent} border-r-4 border-black relative`}
										>
											{/* Diagonal Caution Stripes */}
											<div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]" />
										</motion.div>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
