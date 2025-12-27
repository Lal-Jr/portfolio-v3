import { motion } from "framer-motion";

const steps = [
	{
		title: "HTML/CSS",
		desc: "THE QUEST BEGINS!",
		icon: "⚔️",
		color: "bg-red-500",
		offset: "-left-12", // Zig-zag positioning
		bubble: "after:content-[''] after:absolute after:top-1/2 after:-right-4 after:-translate-y-2 after:border-y-[10px] after:border-y-transparent after:border-l-[20px] after:border-l-slate-800",
	},
	{
		title: "JavaScript",
		desc: "MAGIC SPELLS LEARNED",
		icon: "📜",
		color: "bg-yellow-400",
		offset: "left-12",
		bubble: "after:content-[''] after:absolute after:top-1/2 after:-left-4 after:-translate-y-2 after:border-y-[10px] after:border-y-transparent after:border-r-[20px] after:border-r-slate-800",
	},
	{
		title: "React",
		desc: "BUILDING THE PARTY",
		icon: "🛡️",
		color: "bg-blue-400",
		offset: "-left-12",
		bubble: "after:content-[''] after:absolute after:top-1/2 after:-right-4 after:-translate-y-2 after:border-y-[10px] after:border-y-transparent after:border-l-[20px] after:border-l-slate-800",
	},
];

export default function PixelRoadmap() {
	return (
		<div className="w-full flex flex-col items-center py-20 px-10 font-['Press_Start_2P'] text-white overflow-hidden">
			<div className="relative w-full max-w-[800px]">
				{/* THE WINDING ROAD (Visual Path) */}
				<svg
					className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-full -z-0 opacity-20"
					viewBox="0 0 100 1000"
					preserveAspectRatio="none"
				>
					<path
						d="M50 0 Q 80 150 50 300 T 50 600 T 50 900"
						fill="none"
						stroke="white"
						strokeWidth="4"
						strokeDasharray="10 10"
					/>
				</svg>

				{steps.map((step, index) => (
					<div
						key={index}
						className={`relative flex items-center mb-40 ${
							index % 2 === 0 ? "flex-row-reverse" : "flex-row"
						}`}
					>
						{/* COMIC SPEECH BUBBLE */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							className={`w-1/2 px-10 relative z-10`}
						>
							<div
								className={`relative p-5 bg-slate-800 border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${step.bubble}`}
							>
								<h3 className="text-[14px] text-yellow-300 mb-2 italic">
									"{step.title}"
								</h3>
								<p className="text-[9px] leading-relaxed text-slate-200 tracking-tighter">
									{step.desc}
								</p>
							</div>
						</motion.div>

						{/* CENTER NODE (CHARACTER/ITEM) */}
						<div className="relative flex-none w-24 h-24 flex items-center justify-center">
							<motion.div
								whileHover={{
									scale: 1.3,
									rotate: [0, -10, 10, 0],
								}}
								className={`${step.color} w-16 h-16 flex items-center justify-center border-4 border-black text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-20`}
								style={{ imageRendering: "pixelated" }}
							>
								{step.icon}

								{/* Level Badge */}
								<div className="absolute -bottom-2 -right-2 bg-black text-[8px] px-1 py-0.5 border border-white">
									LVL {index + 1}
								</div>
							</motion.div>
						</div>

						{/* SPACER */}
						<div className="w-1/2" />
					</div>
				))}
			</div>
		</div>
	);
}
