"use client";
import { motion } from "framer-motion";

const ARSENAL = [
	{
		id: "R",
		name: "React",
		level: "90",
		suit: "◈",
		color: "text-rose-600",
		border: "border-rose-600",
		bg: "bg-rose-50",
	},
	{
		id: "N",
		name: "Next.js",
		level: "85",
		suit: "▲",
		color: "text-blue-600",
		border: "border-blue-600",
		bg: "bg-blue-50",
	},
	{
		id: "T",
		name: "Tailwind",
		level: "95",
		suit: "◆",
		color: "text-emerald-600",
		border: "border-emerald-600",
		bg: "bg-emerald-50",
	},
	{
		id: "F",
		name: "Framer",
		level: "80",
		suit: "⬢",
		color: "text-amber-600",
		border: "border-amber-600",
		bg: "bg-amber-50",
	},
];

export default function CardDeckArsenal() {
	return (
		<div className="w-full p-10 font-serif flex items-center justify-center overflow-hidden">
			<div className="relative flex flex-wrap justify-center gap-6 max-w-5xl">
				{ARSENAL.map((card, index) => (
					<motion.div
						key={card.id}
						initial={{ y: 1000, rotate: 45, opacity: 0 }}
						animate={{
							y: 0,
							rotate: (index - 1.5) * 8, // Fanned out rotation
							x: (index - 1.5) * 20,
						}}
						whileInView={{ opacity: 1 }}
						transition={{
							type: "spring",
							stiffness: 50,
							delay: index * 0.1,
						}}
						whileHover={{
							y: -40,
							rotate: 0,
							scale: 1.1,
							zIndex: 50,
							transition: { duration: 0.2 },
						}}
						className={`relative w-56 h-80 bg-white rounded-xl border-[8px] border-white shadow-2xl cursor-pointer overflow-hidden select-none`}
					>
						{/* Inner Border / Frame */}
						<div
							className={`absolute inset-2 border-2 ${card.border} rounded-lg flex flex-col justify-between p-4`}
						>
							{/* Top Corner Suit */}
							<div
								className={`flex flex-col items-center w-fit ${card.color}`}
							>
								<span className="text-2xl font-bold leading-none">
									{card.id}
								</span>
								<span className="text-xl leading-none">
									{card.suit}
								</span>
							</div>

							{/* Center Illustration Area */}
							<div className="flex-1 flex flex-col items-center justify-center text-center px-2">
								<div className={`text-6xl mb-2 ${card.color}`}>
									{card.suit}
								</div>
								<h2
									className={`text-3xl font-black uppercase tracking-tighter ${card.color}`}
								>
									{card.name}
								</h2>
								<div className="h-[1px] w-12 bg-zinc-300 my-2" />
							</div>

							{/* Bottom Corner Suit (Inverted) */}
							<div
								className={`flex flex-col items-center w-fit self-end rotate-180 ${card.color}`}
							>
								<span className="text-2xl font-bold leading-none">
									{card.id}
								</span>
								<span className="text-xl leading-none">
									{card.suit}
								</span>
							</div>

							{/* Fine Print / Serial */}
							<div className="absolute bottom-1 right-8 rotate-90 origin-right text-[8px] text-zinc-300 font-sans uppercase tracking-[0.3em]">
								Arsenal_Collection_2025
							</div>
						</div>

						{/* Card Gloss Effect */}
						<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
					</motion.div>
				))}
			</div>
		</div>
	);
}
