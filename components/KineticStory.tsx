import { motion, AnimatePresence } from "framer-motion";
import PixelShelf from "./PixelShelf";
import AspirationWall from "./AspirationWall";
import PixelRoadmap from "./PixelRoadmap";
import ComicArsenal from "./ComicAresenal";
import AboutMeSelection from "./AboutMeSelection";
import ComicPostBox from "./ComicPostBox";

interface Panel {
	id: string;
	title: string;
	color: string;
	hexColor: string;
	avatar: string;
	desc?: string;
}

// 2. Fix the Interface Props
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
	return (
		<div className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center">
			{/* 1. OPTIMIZED BACKGROUND: Removed blur, used opacity for speed */}
			<motion.div
				initial={false}
				animate={{ backgroundColor: activePanel.hexColor || "#ffffff" }}
				transition={{ duration: 0.5 }}
				className="absolute inset-0 opacity-10 pointer-events-none"
			/>

			<div className="relative flex w-full h-full items-center px-4 md:px-20 gap-8">
				{/* LEFT SIDE: THE DEEP STACK */}
				<div
					className="relative w-[150px] md:w-[320px] h-[450px]"
					style={{ perspective: "2000px" }}
				>
					{sortedPanels.map((panel, index) => {
						const distance = index - activeIndex;

						// We show a glimpse of cards ahead and the deep stack behind
						if (distance < -1 || distance > 5) return null;

						const isActive = index === activeIndex;
						const isBehind = distance > 0;

						return (
							<motion.div
								key={panel.id}
								style={{
									zIndex: 50 - index,
									transformOrigin: "bottom center", // Anchor to bottom for "deck" feel
									willChange: "transform, opacity",
								}}
								animate={{
									// X: Slight horizontal fan
									x: distance < 0 ? -180 : distance * 12,
									// Y: Each card sits slightly higher than the one in front
									y: distance < 0 ? 50 : distance * -18,
									// Z: Deep push into the screen
									z: distance < 0 ? 100 : distance * -140,
									// Rotation: Tilting back slightly to show the face
									rotateX: distance < 0 ? 0 : distance * 2,
									rotateY:
										distance < 0 ? -45 : distance * -10,
									opacity:
										distance < 0 ? 0 : 1 - distance * 0.15,
									scale: isActive ? 1 : 1 - distance * 0.04,
								}}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 30,
									mass: 0.6,
								}}
								className={`absolute inset-0 border-[3px] border-black ${panel.color} shadow-[8px_-4px_0px_rgba(0,0,0,0.2)] p-5 flex flex-col justify-between rounded-sm`}
							>
								{/* Card Content */}
								<div className="border-b-2 border-black/20 pb-2">
									<div className="flex justify-between items-center mb-1">
										<span className="text-[9px] font-mono font-black px-1 bg-black text-white">
											{index + 1 < 10
												? `0${index + 1}`
												: index + 1}
										</span>
										<div className="flex gap-1">
											<div className="w-1 h-1 bg-black/20 rounded-full" />
											<div className="w-1 h-1 bg-black/20 rounded-full" />
										</div>
									</div>
									<h4 className="font-black text-xs uppercase truncate leading-tight">
										{panel.title}
									</h4>
								</div>

								<img
									src={panel.avatar}
									className="w-16 h-16 self-end grayscale contrast-150 brightness-90"
									alt=""
								/>
							</motion.div>
						);
					})}
				</div>

				{/* 3. RIGHT SIDE: THE LENS (Frame stays static, content swaps) */}
				<div className="flex-1 h-[90vh] relative">
					<div className="bg-white border-[6px] border-black w-full h-full shadow-[20px_20px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
						{/* Header */}
						<div className="bg-black text-white p-2 px-6 flex justify-between items-center shrink-0">
							<span className="text-[10px] font-mono text-red-500 animate-pulse">
								● LIVE_VIEW
							</span>
							<span className="text-[10px] font-mono">
								INDEX: 0{activeIndex + 1}
							</span>
						</div>

						{/* Content Area  */}
						<div className="flex-1 relative overflow-hidden flex items-center justify-center">
							<AnimatePresence mode="wait">
								<motion.div
									key={activePanel.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.15 }}
									className="absolute inset-0 p-6 md:p-10 flex items-center justify-center"
								>
									<div className="w-full h-full max-h-full overflow-hidden">
										<PanelContent id={activePanel.id} />
									</div>
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</div>
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
