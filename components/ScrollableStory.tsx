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
import ComicPostBox from "./ComicPostBox";
import AboutMeSelection from "./AboutMeSelection";
import ComicArsenal from "./ComicAresenal";
import { PANELS } from "@/constants";
import ZoomPanel from "./ZoomPanel";

interface ScrollableStoryProps {
	scrollYProgress: MotionValue<number>;
}

export default function ScrollableStory({
	scrollYProgress,
}: ScrollableStoryProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	const storyOpacity = useTransform(scrollYProgress, [0.3, 0.33], [0, 1]);
	const storyScale = useTransform(scrollYProgress, [0.3, 0.32], [0.98, 1]);
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (latest < 0.4) return;
		const normalized = (latest - 0.4) / (1 - 0.4);
		const index = Math.min(
			Math.floor(normalized * PANELS.length),
			PANELS.length - 1
		);
		if (index !== activeIndex) setActiveIndex(index);
	});

	// 1. First, create the sorted array so indices match the visual stack
	const sortedPanels = [...PANELS].sort((a, b) => a.order - b.order);

	// 2. Use sortedPanels to find the current active item
	const activePanel = sortedPanels[activeIndex];

	const activeColor = activePanel.colorCode || "#ffffff";

	return (
		<motion.div
			// 2. Add 'backgroundColor' to the animate prop for smooth transitions
			animate={{
				backgroundColor: activeColor,
			}}
			style={{
				opacity: storyOpacity,
				scale: storyScale,
				display: useTransform(scrollYProgress, (v) =>
					v < 0.4 ? "none" : "flex"
				),
			}}
			transition={{ duration: 0.5 }} // Smooths the color shift
			className="fixed inset-0 z-[90] flex h-screen w-full text-black transition-colors"
		>
			{/* LEFT SIDE: Stacked Panel Deck */}
			<div className="relative w-full md:w-[700px] h-screen flex items-center justify-center">
				<div className="relative w-[380px] md:w-[450px] h-[300px]">
					{sortedPanels.map((panel, index) => {
						const distance = index - activeIndex;
						const isPast = distance < 0;
						const isActive = index === activeIndex;

						return (
							<motion.div
								key={panel.id}
								initial={false}
								animate={{
									y: isPast ? -150 : distance * 14,
									scale: isPast
										? 1.05
										: 1 - Math.min(distance * 0.04, 0.08),
									opacity: isPast
										? 0
										: 1 - Math.min(distance * 0.3, 0.6),
									rotate: isPast ? -5 : 0,
									zIndex: PANELS.length - index,
								}}
								transition={{
									type: "spring",
									stiffness: 250,
									damping: 25,
								}}
								style={{
									pointerEvents: isActive ? "auto" : "none",
								}}
								className={`absolute inset-0 origin-bottom border-4 border-black p-6 flex flex-col justify-between overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${panel.color}`}
							>
								{/* Halftone Texture Overlay */}
								<div className="absolute inset-0 comic-halftone pointer-events-none opacity-30" />

								{/* Card Content */}
								<div className="relative z-10">
									<h3 className="font-black text-2xl uppercase italic leading-none mb-2">
										{panel.title}
									</h3>
									<p className="font-bold text-sm leading-tight text-white/90">
										{panel.desc}
									</p>
								</div>

								{/* Card Image/Avatar */}
								<div className="relative z-10 self-end">
									<div className="relative w-32 h-32 md:w-40 md:h-40">
										<img
											src={panel.avatar}
											alt={panel.title}
											className="w-full h-full object-contain object-right-bottom pixelated"
										/>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>

			{/* RIGHT SIDE: Dynamic Content Detail */}
			<div className="flex-1 relative overflow-hidden flex items-center justify-center h-screen">
				<AnimatePresence mode="wait">
					<motion.div
						key={activePanel.id}
						initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
						animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
						transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
						className="w-full h-full flex items-center justify-center p-20"
					>
						<PanelContent id={activePanel.id} />
					</motion.div>
				</AnimatePresence>
			</div>
		</motion.div>
	);
}

const PanelContent = ({ id }: { id: string }) => {
	switch (id) {
		case "move":
			return <PixelShelf />;
		case "hands":
			return <AspirationWall />;
		case "aresenal":
			return <ComicArsenal />;
		case "peace":
			return <AboutMeSelection />;
		case "jump":
			return <PixelRoadmap />;
		case "signal":
			return <ComicPostBox />;
		default:
			return (
				<div className="text-4xl italic text-zinc-700">
					Select a chapter
				</div>
			);
	}
};
