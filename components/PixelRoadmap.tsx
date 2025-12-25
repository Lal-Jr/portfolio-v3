import { motion } from "framer-motion";

const steps = [
	{
		title: "HTML/CSS",
		desc: "The Quest Begins",
		icon: "⚔️",
		color: "bg-red-500",
	},
	{
		title: "JavaScript",
		desc: "Magic Spells Learned",
		icon: "📜",
		color: "bg-yellow-400",
	},
	{
		title: "React",
		desc: "Building the Party",
		icon: "🛡️",
		color: "bg-blue-400",
	},
];

export default function PixelRoadmap() {
	return (
		/* 1. THE VIEWPORT WRAPPER: min-h-screen + flex items-center provides TOP/BOTTOM centering */
		<div className="w-full flex flex-col items-center justify-center p-10 font-['Press_Start_2P'] text-white">
			{/* 2. THE CONTENT WRAPPER: Max width of 1000px */}
			<div className="relative w-full max-w-[1000px] flex flex-col items-center">
				{/* 3. THE PATH: Perfectly centered behind items */}
				<div className="absolute left-1/2 top-0 w-2 h-full bg-slate-700 -translate-x-1/2 z-0 border-x-2 border-black" />
				{steps.map((step, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.5, type: "spring" }}
						className={`flex items-center mb-24 w-full ${
							index % 2 === 0 ? "flex-row-reverse" : "flex-row"
						}`}
					>
						{/* Content Card */}
						<div className="w-1/2 px-8">
							<div
								className={`pixel-border p-6 bg-slate-800 ${
									index % 2 === 0 ? "text-right" : "text-left"
								}`}
							>
								<h3 className="text-lg text-yellow-300 mb-2">
									{step.title}
								</h3>
								<p className="text-[10px] leading-relaxed text-slate-400">
									{step.desc}
								</p>
							</div>
						</div>

						{/* Icon/Node */}
						<div className="relative z-10 w-16 h-16 flex items-center justify-center">
							<motion.div
								whileHover={{ scale: 1.2, rotate: 5 }}
								className={`${step.color} w-12 h-12 flex items-center justify-center pixel-border text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
							>
								{step.icon}
							</motion.div>
						</div>

						{/* Spacer for the other side */}
						<div className="w-1/2" />
					</motion.div>
				))}
			</div>
		</div>
	);
}
