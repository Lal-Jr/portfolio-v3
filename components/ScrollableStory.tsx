"use client";
import {
	motion,
	useTransform,
	MotionValue,
	useMotionValueEvent,
	AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import PixelShelf from "./PixelShelf";
import AspirationWall from "./AspirationWall";
import PixelRoadmap from "./PixelRoadmap";
import { AVATARS } from "@/constants";

interface ScrollableStoryProps {
	scrollYProgress: MotionValue<number>;
}

export default function ScrollableStory({
	scrollYProgress,
}: ScrollableStoryProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	const panels = [
		{
			id: "peace",

			title: "Main Character Energy",

			desc: "Living in the moment, like the main character—enjoying life and progressing with every step!",

			color: "bg-pink-400",

			avatar: AVATARS.PEACE,

			grid: "md:col-span-1 md:row-span-2",

			isTall: true,
		},

		{
			id: "move",

			title: "On the Move",

			desc: "Speeding through projects, boosting my XP and zooming toward the next big milestone!",

			color: "bg-orange-400",

			avatar: AVATARS.BIKE,

			grid: "md:col-span-2",
		},

		{
			id: "aresenal",

			title: "The Arsenal",

			desc: "Always prepared to take on the dev-verse, whether coding a perfect move or discovering new challenges!",

			color: "bg-blue-400",

			avatar: AVATARS.CELEBRATE,

			grid: "md:col-span-1 md:row-span-2",

			isTall: true,
		},

		{
			id: "hands",

			title: "The Safe Hands",

			desc: "With quick reflexes and a sharp focus, grabbing every chance and ensuring nothing slips through!",

			color: "bg-green-400",

			avatar: AVATARS.FOOTBALL,

			grid: "md:col-span-1 md:row-span-1",
		},

		{
			id: "jump",

			title: "Grind for XP",

			desc: "Climbing the ranks, taking on fresh challenges, and leveling up with every move I make!",

			color: "bg-yellow-400",

			avatar: AVATARS.JUMP,

			grid: "md:col-span-1 md:row-span-1",
		},

		{
			id: "signal",

			title: "Signal Me",

			desc: "Always alert, ready to connect and seize every opportunity that comes my way!",

			color: "bg-purple-500",

			avatar: AVATARS.ME,

			grid: "md:col-span-1 md:row-span-1",
		},
	];

	// 1. Visibility Logic: Start appearing after the overlay fades (0.43+)
	// We map 0.43 -> 1.0 of the total scroll to 0 -> 1 of the story content
	const storyOpacity = useTransform(scrollYProgress, [0.3, 0.35], [0, 1]);
	const storyScale = useTransform(scrollYProgress, [0.3, 0.35], [0.98, 1]);

	// 2. Logic to calculate which panel is active based on the REMAINING scroll space
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (latest < 0.4) return; // Don't calculate if story isn't visible yet

		// Normalize the scroll from 0.43-1.0 to a 0-1 range
		const normalized = (latest - 0.4) / (1 - 0.4);
		const index = Math.min(
			Math.floor(normalized * panels.length),
			panels.length - 1
		);
		if (index !== activeIndex) setActiveIndex(index);
	});

	return (
		<motion.div
			style={{
				opacity: storyOpacity,
				scale: storyScale,
				display: useTransform(scrollYProgress, (v) =>
					v < 0.4 ? "none" : "flex"
				),
			}}
			className="fixed inset-0 z-[90] flex h-screen w-full bg-zinc-950 text-white"
		>
			{/* LEFT SIDE: Fixed Panel Indicators */}
			<div className="flex w-[400px] flex-col justify-center gap-6 p-12 border-r border-white/10 bg-zinc-900/50 backdrop-blur-md">
				{panels.map((panel, index) => (
					<motion.div
						key={panel.id}
						animate={{
							opacity: activeIndex === index ? 1 : 0.2,
							x: activeIndex === index ? 12 : 0,
							scale: activeIndex === index ? 1.02 : 1,
						}}
						// Fixed height based on your 'peace' panel requirement
						className={`p-6 rounded-xl border-l-4 transition-all duration-500 ${
							activeIndex === index
								? `border-current ${panel.color} text-zinc-900`
								: "border-transparent bg-zinc-800/50 text-white"
						}`}
						style={{ height: "180px" }}
					>
						<h3 className="font-black uppercase text-lg tracking-tight">
							{panel.title}
						</h3>
						<p className="text-sm mt-2 font-medium leading-relaxed line-clamp-4">
							{panel.desc}
						</p>
					</motion.div>
				))}
			</div>

			{/* RIGHT SIDE: Component Stage */}
			<div className="flex-1 relative overflow-hidden flex items-center justify-center">
				<AnimatePresence mode="wait">
					<motion.div
						key={panels[activeIndex].id}
						initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
						animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
						transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
						className="w-full h-full flex items-center justify-center p-20"
					>
						<PanelContent id={panels[activeIndex].id} />
					</motion.div>
				</AnimatePresence>
			</div>
		</motion.div>
	);
}

// Helper Component for the Right Side
const PanelContent = ({ id }: { id: string }) => {
	switch (id) {
		case "move":
			return <PixelShelf />;
		case "hands":
			return <AspirationWall />;
		// case "aresenal":
		// 	return <ComicArsenal />;
		// case "peace":
		// 	return <AboutMeSelection />;
		case "jump":
			return <PixelRoadmap />;
		// case "signal":
		// 	return <ComicPostBox />;
		default:
			return (
				<div className="text-4xl italic text-zinc-700">
					Select a chapter
				</div>
			);
	}
};
