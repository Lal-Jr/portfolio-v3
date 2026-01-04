"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";

const ARSENAL = [
	{
		id: "01",
		name: "React",
		description: "LEGENDARY COMPONENT ENGINE",
		icon: "⚛️",
		color: "bg-rose-600",
		border: "border-rose-900",
		text: "text-rose-400",
		stats: { atk: 95, def: 80, spd: 85 },
	},
	{
		id: "02",
		name: "Next.js",
		description: "MYTHIC FULLSTACK SCROLL",
		icon: "▲",
		color: "bg-blue-600",
		border: "border-blue-900",
		text: "text-blue-400",
		stats: { atk: 99, def: 90, spd: 70 },
	},
	{
		id: "03",
		name: "Tailwind",
		description: "RARE DESIGN SHIELD",
		icon: "🎨",
		color: "bg-emerald-600",
		border: "border-emerald-900",
		text: "text-emerald-400",
		stats: { atk: 60, def: 95, spd: 99 },
	},
	{
		id: "04",
		name: "Framer",
		description: "ENCHANTED MOTION SPELL",
		icon: "✨",
		color: "bg-amber-500",
		border: "border-amber-900",
		text: "text-amber-400",
		stats: { atk: 75, def: 50, spd: 95 },
	},
];

const Card = ({ card, index }) => {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const rotateX = useTransform(y, [-100, 100], [10, -10]);
	const rotateY = useTransform(x, [-100, 100], [-10, 10]);

	function handleMouse(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		x.set(event.clientX - (rect.left + rect.width / 2));
		y.set(event.clientY - (rect.top + rect.height / 2));
	}

	return (
		<motion.div
			onMouseMove={handleMouse}
			onMouseLeave={() => {
				x.set(0);
				y.set(0);
			}}
			initial={{ y: 200, opacity: 0 }}
			whileInView={{ y: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ type: "spring", stiffness: 50, delay: index * 0.1 }}
			whileHover={{ y: -50, scale: 1.05, zIndex: 50 }}
			style={{ rotateX, rotateY, perspective: 1000 }}
			className="relative w-64 h-[400px] bg-zinc-900 border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer p-2 font-['Press_Start_2P']"
		>
			{/* INNER BORDER */}
			<div
				className={`relative h-full w-full border-4 border-dashed ${card.border} p-3 flex flex-col`}
			>
				{/* HEADER */}
				<div className="flex justify-between items-center mb-4">
					<span className="text-[8px] text-white">ID:{card.id}</span>
					<div className="w-2 h-2 bg-red-500 animate-pulse" />
				</div>

				{/* ARTWORK BOX */}
				<div
					className={`${card.color} w-full h-32 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-5xl mb-4`}
				>
					{card.icon}
				</div>

				{/* TITLE & DESC */}
				<h3 className={`text-[12px] ${card.text} mb-2 uppercase`}>
					{card.name}
				</h3>
				<p className="text-[7px] leading-relaxed text-zinc-400 mb-4 h-10 uppercase">
					{card.description}
				</p>

				{/* STATS BAR (Gamified) */}
				<div className="mt-auto space-y-2">
					{Object.entries(card.stats).map(([label, val]) => (
						<div key={label} className="flex items-center gap-2">
							<span className="text-[6px] text-zinc-500 w-6">
								{label.toUpperCase()}
							</span>
							<div className="flex-1 h-2 bg-black border border-zinc-700 p-[1px]">
								<motion.div
									initial={{ width: 0 }}
									whileInView={{ width: `${val}%` }}
									className={`h-full ${card.color}`}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default function CardDeckArsenal() {
	return (
		<section className="relative w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-20 overflow-hidden font-['Press_Start_2P'] text-white">
			{/* CRT SCANLINES */}
			<div className="absolute inset-0 pointer-events-none z-50 opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />

			<div className="z-10 text-center mb-24 px-4">
				<motion.div
					initial={{ scale: 0.8 }}
					whileInView={{ scale: 1 }}
					className="inline-block px-4 py-2 bg-emerald-500 text-black font-black uppercase text-[10px] mb-6 shadow-[4px_4px_0px_0px_#065f46]"
				>
					EQUIPMENT_SELECT
				</motion.div>
				<h2 className="text-2xl md:text-4xl font-black uppercase leading-tight text-white drop-shadow-[4px_4px_0px_#3f3f46]">
					THE_TECHNICAL <br />
					<span className="text-yellow-400 underline decoration-double">
						ARSENAL
					</span>
				</h2>
			</div>

			{/* THE DECK CONTAINER */}
			<div className="relative w-full max-w-6xl flex flex-wrap items-center justify-center gap-8 px-10">
				{ARSENAL.map((card, index) => (
					<Card key={card.id} card={card} index={index} />
				))}
			</div>

			{/* DECORATIVE FOOTER */}
			<div className="mt-20 flex flex-col items-center gap-4">
				<div className="text-[8px] text-zinc-500 tracking-[0.3em] animate-pulse">
					-- [ HOVER_TO_EQUIP ] --
				</div>
				<div className="flex gap-2">
					{[...Array(5)].map((_, i) => (
						<div
							key={i}
							className="w-2 h-2 bg-zinc-800 border border-zinc-600"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
