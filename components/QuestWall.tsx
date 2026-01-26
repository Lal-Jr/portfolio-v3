"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ASPIRATION_QUESTS } from "@/constants";
import QuestCard from "./QuestCard";

export default function QuestWall() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"]
	});

	// Map vertical scroll to horizontal movement
	// Adjusted range: Start slightly positive to ensure first item is visible, move slower
	const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

	return (
		<section ref={containerRef} className="relative w-full py-20 overflow-hidden bg-transparent">

			{/* MASK GRADIENTS FOR FADE EFFECT */}
			<div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
			<div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

			{/* SCROLL-DRIVEN STRIP WITH MANUAL DRAG */}
			<div className="flex w-full overflow-visible cursor-grab active:cursor-grabbing">
				<motion.div
					className="w-full"
					style={{ x }}
				>
					<motion.div
						drag="x"
						dragConstraints={{ left: -1000, right: 200 }}
						className="flex gap-10 pl-8 md:pl-32 py-16 w-max" // Added pl-32 for start visibility, py-16 for rotation space
					>
						{ASPIRATION_QUESTS.map((quest, i) => (
							<QuestCard key={`${quest.id}-${i}`} quest={quest} index={i} />
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
