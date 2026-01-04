"use client";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import PixelShelf from "./PixelShelf";
import AspirationWall from "./AspirationWall";
import PixelRoadmap from "./PixelRoadmap";
import ComicArsenal from "./ComicAresenal";
import AboutMeSelection from "./AboutMeSelection";
import ComicPostBox from "./ComicPostBox";
import { useEffect, useMemo, useState } from "react";

interface Panel {
	id: string;
	title: string;
	color: string;
	hexColor: string;
	avatar: string;
	desc?: string;
}

interface KineticStoryProps {
	activePanel: Panel;
	sortedPanels: Panel[];
	activeIndex: number;
}

export default function KineticStory({
	activePanel,
	sortedPanels,
	activeIndex,
}: KineticStoryProps) {
	const [displayedText, setDisplayedText] = useState("");

	useEffect(() => {
		let i = 0;
		const text = MY_STORY[activePanel.id as keyof typeof MY_STORY] || "";
		setDisplayedText("");
		const timer = setInterval(() => {
			setDisplayedText(text.slice(0, i));
			i++;
			if (i > text.length) clearInterval(timer);
		}, 20);
		return () => clearInterval(timer);
	}, [activePanel.id]);

	return (
		// Added cursor-default to ensure the mouse is visible
		<div className="relative h-screen w-full bg-[#020202] text-white overflow-hidden font-['Press_Start_2P'] cursor-default">
			{/* 1. THE WORLD LAYER (Z-INDEX 10) */}
			{/* This is the base layer. Everything here is clickable. */}
			<main className="absolute inset-0 z-10 overflow-y-auto custom-pixel-scrollbar pointer-events-auto">
				<AnimatePresence mode="wait">
					<motion.div
						key={activePanel.id}
						initial={{ opacity: 0, scale: 1.05 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.5 }}
						className="min-h-full w-full flex items-center justify-center p-10 md:p-32"
					>
						<div className="w-full max-w-6xl relative">
							<PanelContent id={activePanel.id} />
						</div>
					</motion.div>
				</AnimatePresence>
			</main>

			{/* 2. THE HUD LAYER (Z-INDEX 50) */}
			{/* CRITICAL: pointer-events-none makes this layer "invisible" to the mouse */}
			<div className="absolute inset-0 pointer-events-none z-50 flex flex-col justify-between p-6 md:p-10">
				{/* TOP SECTION */}
				<div className="flex justify-between items-start">
					<div className="bg-black/40 backdrop-blur-sm p-4 border-l-2 border-red-600">
						<div className="text-[7px] text-red-500 mb-1">
							LOG_NODE_0{activeIndex + 1}
						</div>
						<h2 className="text-[10px] text-white/60 uppercase">
							{activePanel.title}
						</h2>
					</div>

					{/* Navigation - We use pointer-events-auto here so these buttons work */}
					<div className="flex gap-2 pointer-events-auto">
						{sortedPanels.map((_, i) => (
							<div
								key={i}
								className={`w-2 h-8 transition-colors ${
									i === activeIndex
										? "bg-red-600"
										: "bg-zinc-900"
								}`}
							/>
						))}
					</div>
				</div>

				{/* BOTTOM SECTION: Dialogue box */}
				<div className="w-full flex justify-center">
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						// pointer-events-auto allows the user to click the text box if needed
						className="w-full max-w-4xl bg-black/80 backdrop-blur-md border border-white/10 p-6 relative pointer-events-auto cursor-text"
					>
						<div className="absolute top-0 left-0 w-full h-[2px] bg-red-600" />

						<div className="flex gap-4 items-start">
							<div className="w-10 h-10 bg-zinc-800 shrink-0 border border-white/20 hidden md:block" />
							<div className="space-y-2">
								<span className="text-[7px] text-zinc-500 uppercase tracking-widest">
									Dev_Comms:
								</span>
								<p className="text-[9px] md:text-xs leading-relaxed text-zinc-100 uppercase italic">
									"{displayedText}"
									<span className="inline-block w-2 h-4 bg-red-600 animate-pulse ml-2" />
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>

			{/* 3. ATMOSPHERIC SCANLINES (Z-INDEX 100) */}
			<div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
		</div>
	);
}

const MY_STORY = {
	move: "I started with a simple shelf. I thought if I could organize my physical world, my code would follow.",
	hands: "These aren't just goals; they are the things I reach for when I'm failing.",
	aresenal:
		"Everyone calls it a 'tech stack.' To me, these are heavy tools used to break through limits.",
	peace: "If you strip away the pixels, this is who is left. No code—just the person behind the machine.",
	jump: "The roadmap isn't a plan; it's a leap of faith. Documenting the jump before the landing.",
	signal: "I’m sending this out into the void. If you’re reading this, the signal reached you.",
};

const PanelContent = ({ id }: { id: string }) => {
	// Wrap components in a motion wrapper to stagger their children
	return (
		<motion.div
			initial="initial"
			animate="animate"
			variants={{
				initial: { opacity: 0 },
				animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
			}}
		>
			{(() => {
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
						return null;
				}
			})()}
		</motion.div>
	);
};
