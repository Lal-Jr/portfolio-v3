import { AVATARS } from "@/constants";
import ZoomPanel from "./ZoomPanel";

import { motion, useTransform, MotionValue } from "framer-motion";

// Defined the interface for the props
interface ContentGridProps {
	scrollYProgress: MotionValue<number>;
}

export default function ContentGrid({ scrollYProgress }: ContentGridProps) {
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

	const contentPointerEvents = useTransform(
		scrollYProgress,
		[0, 0.45, 0.5],
		["none", "none", "auto"]
	);

	return (
		<div className="sticky top-0 h-screen flex items-center justify-center p-4">
			<motion.div
				style={{
					pointerEvents: contentPointerEvents,
					// Add a subtle scale-up as we reach the auto-expand point
					scale: useTransform(scrollYProgress, [0.5, 0.95], [0.9, 1]),
				}}
				className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px] w-full max-w-7xl"
			>
				{panels.map((panel) => (
					<div key={panel.id} className={panel.grid}>
						<ZoomPanel
							{...panel}
							avatarSrc={panel.avatar}
							description={panel.desc}
							isTall={panel.isTall}
						/>
					</div>
				))}
			</motion.div>
		</div>
	);
}
