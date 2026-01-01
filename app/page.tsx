"use client";
import { useRef, useState } from "react";
import {
	AnimatePresence,
	motion,
	useScroll,
	useTransform,
} from "framer-motion";
import ZoomPanel from "../components/ZoomPanel";
import { AVATARS } from "@/constants";
import PixelShelf from "@/components/PixelShelf";
import RetroArsenal from "@/components/RetroArsenal";
import ComicArsenal from "@/components/ComicAresenal";
import PixelRoadmap from "@/components/PixelRoadmap";
import ComicPostBox from "@/components/ComicPostBox";
import AboutMeSelection from "@/components/AboutMeSelection";
import AspirationWall from "@/components/AspirationWall";
import Controller from "@/components/Controller";

export default function Home() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [selectedId, setSelectedId] = useState<string | null>(null);

	// Mock data to map through for easier management
	const panels = [
		{
			id: "move",
			title: "On the Move",
			desc: "Speeding through projects, boosting my XP and zooming toward the next big milestone!",
			color: "bg-orange-400",
			avatar: AVATARS.BIKE,
			grid: "md:col-span-2",
		},
		{
			id: "hands",
			title: "The Safe Hands",
			desc: "With quick reflexes and a sharp focus, grabbing every chance and ensuring nothing slips through!",
			color: "bg-green-400",
			avatar: AVATARS.FOOTBALL,
			grid: "md:col-span-1 md:row-span-2",
		},
		{
			id: "aresenal",
			title: "The Arsenal",
			desc: "Always prepared to take on the dev-verse, whether coding a perfect move or discovering new challenges!",
			color: "bg-blue-400",
			avatar: AVATARS.CELEBRATE,
			grid: "md:col-span-1 md:row-span-1",
		},
		{
			id: "peace",
			title: "Main Character Energy",
			desc: "Living in the moment, like the main character—enjoying life and progressing with every step!",
			color: "bg-pink-400",
			avatar: AVATARS.PEACE,
			grid: "md:col-span-1 md:row-span-2",
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

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	// 1. Tearing Animations with "Resistance"
	const leftX = useTransform(
		scrollYProgress,
		[0, 0.1, 0.5],
		["0%", "-1%", "-100%"]
	);
	const leftY = useTransform(scrollYProgress, [0, 0.5], ["0%", "6%"]);
	const leftRotate = useTransform(scrollYProgress, [0, 0.5], [0, -12]);

	const rightX = useTransform(
		scrollYProgress,
		[0, 0.1, 0.5],
		["0%", "1%", "100%"]
	);
	const rightY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-6%"]);
	const rightRotate = useTransform(scrollYProgress, [0, 0.5], [0, 12]);

	// 1. Create a transform that maps scroll progress to CSS pointer events
	// At 0% to 45% scroll, it's 'auto' (blocking). At 50%, it becomes 'none'.
	const overlayPointerEvents = useTransform(
		scrollYProgress,
		[0, 0.45, 0.5],
		["auto", "auto", "none"]
	);

	// Opposite for the content: clickable only after the rip is wide enough
	const contentPointerEvents = useTransform(
		scrollYProgress,
		[0, 0.45, 0.5],
		["none", "none", "auto"]
	);

	return (
		<div ref={containerRef} className="relative h-[250vh]">
			{/* WRAPPER OVERLAY */}
			<div
				style={{ pointerEvents: overlayPointerEvents }} // Toggle pointer events here
				className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
			>
				{/* LEFT PANEL */}
				<motion.div
					style={{ x: leftX, y: leftY, rotate: leftRotate }}
					className="absolute top-0 left-0 w-1/2 h-full bg-white shadow-2xl flex items-center justify-end"
				>
					{/* TEXT ON LEFT PANEL */}
					<h1 className="text-red-600 font-black text-6xl md:text-8xl uppercase mr-8">
						Chapter 1 :
					</h1>

					{/* Jagged Edge */}
					<div
						className="absolute right-[-20px] top-0 h-full w-[40px] bg-white"
						style={{
							clipPath:
								"polygon(0% 0%, 100% 0%, 80% 5%, 100% 10%, 85% 15%, 100% 20%, 80% 25%, 100% 30%, 85% 35%, 100% 40%, 80% 45%, 100% 50%, 85% 55%, 100% 60%, 80% 65%, 100% 70%, 85% 75%, 100% 80%, 80% 85%, 100% 90%, 85% 95%, 100% 100%, 0% 100%)",
						}}
					/>
				</motion.div>

				{/* RIGHT PANEL */}
				<motion.div
					style={{ x: rightX, y: rightY, rotate: rightRotate }}
					className="absolute top-0 right-0 w-1/2 h-full bg-white shadow-2xl flex items-center justify-start"
				>
					{/* Jagged Edge Detail */}
					<div
						className="absolute left-[-20px] top-0 h-full w-[40px] bg-white"
						style={{
							clipPath:
								"polygon(100% 0%, 0% 0%, 20% 5%, 0% 10%, 15% 15%, 0% 20%, 20% 25%, 0% 30%, 15% 35%, 0% 40%, 20% 45%, 0% 50%, 15% 55%, 0% 60%, 20% 65%, 0% 70%, 15% 75%, 0% 80%, 20% 85%, 0% 90%, 15% 95%, 0% 100%, 100% 100%)",
						}}
					/>

					{/* TEXT ON RIGHT PANEL */}
					<h1 className="text-red-600 font-black text-6xl md:text-8xl uppercase ml-8">
						The Hero’s Journey
					</h1>
				</motion.div>

				{/* ... SCROLL HINT ... */}
				<motion.div
					style={{
						opacity: useTransform(
							scrollYProgress,
							[0, 0.1],
							[1, 0]
						),
					}}
					className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 text-sm font-bold tracking-widest animate-bounce"
				>
					SCROLL TO DIVE IN
				</motion.div>
			</div>

			{/* REVEALED CONTENT GRID */}
			<div className="sticky top-0 h-screen flex items-center justify-center p-4">
				<motion.div
					style={{ pointerEvents: contentPointerEvents }} // Only clickable when visible
					className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px] w-full max-w-7xl"
				>
					{panels.map((panel) => (
						<div key={panel.id} className={panel.grid}>
							<ZoomPanel
								id={panel.id}
								title={panel.title}
								description={panel.desc}
								avatarSrc={panel.avatar}
								color={panel.color}
								onClick={() => setSelectedId(panel.id)}
							/>
						</div>
					))}
				</motion.div>
			</div>

			{/* FULL SCREEN EXPANSION */}
			{/* Expanded Card Overlay */}
			<AnimatePresence>
				{selectedId && (
					<div className="fixed inset-0 z-50 flex items-center justify-center">
						{/* Dark Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2, ease: "linear" }} // Fast and simple
							onClick={() => setSelectedId(null)}
							className="absolute inset-0 bg-black/40" // Lower opacity/no blur = faster
						/>

						{panels
							.filter((p) => p.id === selectedId)
							.map((panel) => (
								<motion.div
									key={panel.id}
									layoutId={`panel-${panel.id}`}
									transition={{
										type: "spring",
										stiffness: 400,
										damping: 40,
									}}
									// REMOVED: max-width and padding from the outer container
									// ADDED: w-screen h-screen and rounded-none for true full screen
									className={`${panel.color} w-screen h-screen relative z-10 shadow-2xl overflow-y-auto flex flex-col p-8 md:p-20`}
								>
									{/* Close Button */}
									<motion.button
										className="absolute top-10 right-10 text-white/50 hover:text-white text-sm font-mono tracking-widest z-20"
										onClick={() => setSelectedId(null)}
									>
										CLOSE [X]
									</motion.button>

									<div className="flex flex-row justify-center min-h-full">
										{/* <div>
											<motion.h2
												layoutId={`title-${panel.id}`}
												className="text-6xl md:text-[12rem] font-black text-white uppercase italic leading-none"
											>
												{panel.title}
											</motion.h2>
											<motion.p
												layoutId={`desc-${panel.id}`}
												className="mt-8 text-white text-2xl md:text-4xl max-w-4xl leading-tight"
											>
												{panel.desc}
											</motion.p>

											<motion.div
												initial={{ opacity: 0, y: 30 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.1 }}
												className="mt-12 text-white/80"
											>
												<h3 className="text-3xl font-bold mb-4">
													Mission Details
												</h3>
												<p className="text-xl max-w-2xl">
													Additional details about
													this specific project or
													skill go here...
												</p>
											</motion.div>
										</div> */}
										{/* <PixelShelf /> */}
										{/* <ComicArsenal /> */}
										{/* <PixelRoadmap /> */}
										{/* <ComicPostBox /> */}
										{/* <AboutMeSelection /> */}
										{/* <AspirationWall /> */}
										<Controller />
									</div>
									{/* ... Inside the expanded motion.div (after the min-h-full div) ... */}

									{/* MINIATURE PANEL PAGINATION */}
									<div className="absolute bottom-8 left-0 w-full flex justify-center px-4 z-50">
										<div className="flex items-end gap-3 p-3 bg-black/20 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl">
											{panels.map((p) => {
												const isActive =
													p.id === selectedId;
												return (
													<button
														key={`nav-${p.id}`}
														onClick={(e) => {
															e.stopPropagation();
															setSelectedId(p.id);
														}}
														className="relative group outline-none"
													>
														{/* Tooltip Label */}
														<span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-white text-black text-[10px] font-black px-2 py-1 rounded-md uppercase whitespace-nowrap shadow-lg">
															{p.title}
														</span>

														{/* The Miniature Card */}
														<motion.div
															animate={{
																height: isActive
																	? 80
																	: 60,
																width: isActive
																	? 60
																	: 45,
																y: isActive
																	? -10
																	: 0,
																scale: isActive
																	? 1.1
																	: 1,
															}}
															whileHover={{
																scale: 1.1,
																y: -5,
															}}
															className={`${p.color} rounded-xl border-2 border-white/40 shadow-inner overflow-hidden flex flex-col items-center justify-center p-1 transition-all`}
														>
															{/* Avatar Miniature */}
															<div className="w-full h-full relative opacity-80 group-hover:opacity-100 transition-opacity">
																<img
																	src={
																		p.avatar
																	}
																	alt=""
																	className="w-full h-full object-contain"
																/>
															</div>

															{/* Active Glow Strip */}
															{isActive && (
																<motion.div
																	layoutId="nav-glow"
																	className="absolute bottom-1 w-1/2 h-1 bg-white rounded-full blur-[2px]"
																/>
															)}
														</motion.div>
													</button>
												);
											})}
										</div>
									</div>
								</motion.div>
							))}
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}
