"use client";
import {
	motion,
	useTransform,
	MotionValue,
	useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import { PANELS } from "@/constants";
import KineticStory from "./KineticStory";

interface ScrollableStoryProps {
	scrollYProgress: MotionValue<number>;
}

export default function ScrollableStory({
	scrollYProgress,
}: ScrollableStoryProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	const storyOpacity = useTransform(scrollYProgress, [0.36, 0.39], [0, 1]);
	const storyScale = useTransform(scrollYProgress, [0.36, 0.39], [0.98, 1]);
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
			<KineticStory
				activePanel={activePanel}
				sortedPanels={sortedPanels}
				activeIndex={activeIndex}
			/>
		</motion.div>
	);
}
