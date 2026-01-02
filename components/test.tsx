"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

import ZoomPanel from "@/components/ZoomPanel";
import { AVATARS } from "@/constants";

/* -------------------------------
   STORY DATA (SCRIPT)
-------------------------------- */

const SCENES = [
	{
		id: "intro",
		range: [0.0, 0.12],
		title: "Let me tell you a story.",
	},
	{
		id: "identity",
		range: [0.12, 0.28],
		title: "A character in motion.",
		focusId: "peace",
	},
	{
		id: "skills",
		range: [0.28, 0.44],
		title: "Skills shaped by repetition.",
		focusId: "hands",
	},
	{
		id: "tools",
		range: [0.44, 0.6],
		title: "Tools built for momentum.",
		focusId: "aresenal",
	},
	{
		id: "motion",
		range: [0.6, 0.76],
		title: "Movement creates progress.",
		focusId: "move",
	},
	{
		id: "signal",
		range: [0.76, 0.92],
		title: "Direction. Clarity. Signal.",
		focusId: "signal",
	},
];

const PANELS = [
	{
		id: "peace",
		title: "Main Character Energy",
		color: "bg-orange-400",
		avatar: AVATARS.PEACE,
	},
	{
		id: "hands",
		title: "The Safe Hands",
		color: "bg-green-400",
		avatar: AVATARS.FOOTBALL,
	},
	{
		id: "aresenal",
		title: "The Arsenal",
		color: "bg-blue-400",
		avatar: AVATARS.CELEBRATE,
	},
	{
		id: "move",
		title: "On the Move",
		color: "bg-pink-400",
		avatar: AVATARS.BIKE,
	},
	{
		id: "jump",
		title: "Grind for XP",
		color: "bg-yellow-400",
		avatar: AVATARS.JUMP,
	},
	{
		id: "signal",
		title: "Signal Me",
		color: "bg-purple-500",
		avatar: AVATARS.ME,
	},
];

/* -------------------------------
   HELPERS
-------------------------------- */

function useSceneProgress(
	scroll: MotionValue<number>,
	range: [number, number]
) {
	return useTransform(scroll, range, [0, 1], { clamp: true });
}

/* -------------------------------
   TYPOGRAPHY MORPH
-------------------------------- */

function SceneTypography({
	scene,
	scroll,
}: {
	scene: (typeof SCENES)[number];
	scroll: MotionValue<number>;
}) {
	const p = useSceneProgress(scroll, scene.range);

	const opacity = useTransform(p, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
	const y = useTransform(p, [0, 1], [40, -40]);
	const scale = useTransform(p, [0, 0.5, 1], [0.96, 1, 1.04]);
	const letterSpacing = useTransform(p, [0, 1], ["0.04em", "-0.01em"]);

	return (
		<motion.h1
			style={{
				opacity,
				y,
				scale,
				letterSpacing,
			}}
			className="absolute text-center font-serif text-5xl md:text-7xl leading-tight tracking-tight"
		>
			{scene.title}
		</motion.h1>
	);
}

/* -------------------------------
   MAIN PAGE
-------------------------------- */

export default function Home() {
	const ref = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end end"],
	});

	/* Camera feel */
	const cameraScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
	const cameraBlur = useTransform(
		scrollYProgress,
		[0.7, 1],
		["blur(0px)", "blur(6px)"]
	);

	return (
		<div ref={ref} className="relative h-[1500vh] bg-black text-white">
			{/* CAMERA */}
			<motion.div
				style={{ scale: cameraScale, filter: cameraBlur }}
				className="sticky top-0 h-screen overflow-hidden"
			>
				{/* TYPOGRAPHY LAYER */}
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
					{SCENES.map((scene) => (
						<SceneTypography
							key={scene.id}
							scene={scene}
							scroll={scrollYProgress}
						/>
					))}
				</div>

				{/* PANEL FIELD */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl p-10">
						{PANELS.map((panel, index) => {
							const scene = SCENES.find(
								(s) => s.focusId === panel.id
							);

							const focusProgress = scene
								? useSceneProgress(scrollYProgress, scene.range)
								: null;

							const scale = focusProgress
								? useTransform(
										focusProgress,
										[0, 1],
										[0.9, 1.15]
								  )
								: 1;

							const opacity = focusProgress
								? useTransform(focusProgress, [0, 1], [0.25, 1])
								: useTransform(
										scrollYProgress,
										[0.1, 0.9],
										[1, 0.25]
								  );

							const y = useTransform(
								scrollYProgress,
								[0.15 + index * 0.05, 0.55],
								[200, 0]
							);

							return (
								<motion.div
									key={panel.id}
									style={{
										scale,
										opacity,
										y,
									}}
									className="relative"
								>
									<ZoomPanel
										id={panel.id}
										title={panel.title}
										avatarSrc={panel.avatar}
										color={panel.color}
									/>
								</motion.div>
							);
						})}
					</div>
				</div>
			</motion.div>
		</div>
	);
}
