"use client";
import React, { useState } from "react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	rectSortingStrategy,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AVATARS } from "@/constants";
import ZoomPanel from "./ZoomPanel";
import { motion, MotionValue, useTransform } from "framer-motion";
import AboutMeSelection from "./AboutMeSelection";
import GameCTA from "./Game/GameCTA";
import PixelRoadmap from "./PixelRoadmap";
import ComicAresenal from "./ComicAresenal";
import PixelShelf from "./PixelShelf";
import AspirationWall from "./AspirationWall";

// --- SORTABLE ITEM COMPONENT ---
function SortablePanel({
	id,
	item,
	index,
	isFirst,
	zoomProps,
	fadeProps,
	scale,
}: {
	id: string;
	item: any;
	index: number;
	isFirst: boolean;
	zoomProps?: { scale: MotionValue<number>; x: MotionValue<string>; y: MotionValue<string>; contentOpacity?: MotionValue<number> };
	fadeProps?: { opacity: MotionValue<number> };
	scale?: MotionValue<number>;
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const slotConfigs = [
		{ grid: "md:col-span-1 md:row-span-2", isTall: true },
		{ grid: "md:col-span-2 md:row-span-1", isTall: false },
		{ grid: "md:col-span-1 md:row-span-2", isTall: true },
		{ grid: "md:col-span-1 md:row-span-1", isTall: false },
		{ grid: "md:col-span-1 md:row-span-1", isTall: false },
		{ grid: "md:col-span-1 md:row-span-1", isTall: false },
	];

	const config = slotConfigs[index] || slotConfigs[5];

	// dnd-kit transform for the container
	const dndStyle = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 50 : isFirst ? 30 : 1, // Higher z-index for zooming panel
	};

	return (
		<div
			ref={setNodeRef}
			style={dndStyle}
			className={`${config.grid} relative`}
			{...attributes}
			{...listeners}
		>
			<motion.div
				style={
					isFirst && zoomProps
						? { scale: zoomProps.scale, x: zoomProps.x, y: zoomProps.y }
						: fadeProps
						? { opacity: fadeProps.opacity }
						: {}
				}
				className={`
					w-full h-full
					${isDragging ? "opacity-50" : "opacity-100"}
					group relative border-2 border-zinc-800 bg-black overflow-hidden hover:border-white/40
				`}
			>
			{/* --- TITLE & LABEL OVERLAY --- */}
			<motion.div style={{ opacity: zoomProps?.contentOpacity || 1 }} className="absolute top-0 left-0 z-20 p-3 flex flex-col gap-1 pointer-events-none">
				<span className="text-[10px] md:text-[12px] text-white bg-black/60 px-2 py-1 backdrop-blur-sm border-l-2 border-white/30">
					{item.title}
				</span>
				<span className="text-[8px] md:text-[10px] text-zinc-400 bg-black/60 px-2 py-0.5 backdrop-blur-sm">
					{item.desc}
				</span>
			</motion.div>

			<ZoomPanel
				{...item}
				avatarSrc={item.avatar}
				description={item.desc}
				isTall={config.isTall}
				contentOpacity={zoomProps?.contentOpacity}
				scale={scale}
			/>

				{/* Visual drag handle hint */}
				<div className="absolute top-2 right-2 text-[10px] text-zinc-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
					⁝⁝
				</div>
			</motion.div>
		</div>
	);
}

// --- MAIN GRID COMPONENT ---
export default function ContentGrid({
	scrollYProgress,
}: {
	scrollYProgress: MotionValue<number>;
}) {
	const [items, setItems] = useState([
		{
			id: "peace",
			title: "01_BIO",
			desc: "PROGRESSION",
			color: "bg-pink-500",
			avatar: AVATARS.PEACE,
		},
		{
			id: "move",
			title: "02_LOGS",
			desc: "MILESTONES",
			color: "bg-orange-500",
			avatar: AVATARS.BIKE,
		},
		{
			id: "arsenal",
			title: "03_TECH",
			desc: "DEV_VERSE",
			color: "bg-blue-500",
			avatar: AVATARS.CELEBRATE,
		},
		{
			id: "hands",
			title: "04_FOCUS",
			desc: "STABILITY",
			color: "bg-emerald-500",
			avatar: AVATARS.FOOTBALL,
		},
		{
			id: "jump",
			title: "05_SKILLS",
			desc: "LEVELING_UP",
			color: "bg-yellow-500",
			avatar: AVATARS.JUMP,
		},
		{
			id: "signal",
			title: "06_COMM",
			desc: "OPPORTUNITY",
			color: "bg-purple-600",
			avatar: AVATARS.ME,
		},
	]);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	// Grid appearance - 10-20%
	const gridOpacity = useTransform(scrollYProgress, [0.08, 0.12, 0.18, 0.22], [0, 1, 1, 0]);

	// Zoom interaction for the first panel - 20-25%
	const zoomStart = 0.20;
	const zoomEnd = 0.25;

	// Drastically increased scale to ensure it covers the viewport
	const firstPanelScale = useTransform(scrollYProgress, [zoomStart, zoomEnd], [1, 25]);
	
	// Center the panel
	const firstPanelX = useTransform(scrollYProgress, [zoomStart, zoomEnd], ["0%", "50%"]);
	const firstPanelY = useTransform(scrollYProgress, [zoomStart, zoomEnd], ["0%", "15%"]);

	// Fade out other panels
	const otherPanelsOpacity = useTransform(scrollYProgress, [zoomStart, 0.45], [1, 0]);

	// AboutMe Selection - 25-40% (15% space)
	const aboutMeOpacity = useTransform(scrollYProgress, [0.23, 0.27, 0.38, 0.42], [0, 1, 1, 0]);
	const aboutMePointerEvents = useTransform(scrollYProgress, (v) => (v > 0.25 && v < 0.40 ? "auto" : "none"));
	
	// Fade out ZoomPanel content as the AboutMe section appears
	const contentOpacity = useTransform(scrollYProgress, [0.55, 0.65], [1, 0]);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.findIndex((i) => i.id === active.id);
				const newIndex = items.findIndex((i) => i.id === over.id);
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	return (
		<div className="sticky top-0 h-screen flex flex-col items-center justify-center p-4 bg-[#050505] font-['Press_Start_2P'] overflow-hidden">
			<div
				className="absolute inset-0 opacity-10 pointer-events-none"
				style={{
					backgroundImage:
						"linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",

					backgroundSize: "60px 60px",
				}}
			/>
			
			<motion.div
				style={{ opacity: gridOpacity }}
				className="w-full max-w-7xl relative"
			>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={items}
						strategy={rectSortingStrategy}
					>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[200px] md:auto-rows-[240px]">
							{items.map((item, index) => (
								<SortablePanel
									key={item.id}
									id={item.id}
									item={item}
									index={index}
									isFirst={index === 0}
									zoomProps={
										index === 0
											? { scale: firstPanelScale, x: firstPanelX, y: firstPanelY, contentOpacity }
											: undefined
									}
									fadeProps={index !== 0 ? { opacity: otherPanelsOpacity } : undefined}
									scale={index === 0 ? firstPanelScale : undefined}
								/>
							))}
						</div>
					</SortableContext>
				</DndContext>
			</motion.div>

			{/* About Me Selection Overlay */}
			<motion.div 
				style={{ opacity: aboutMeOpacity, pointerEvents: aboutMePointerEvents as any }}
				className="absolute inset-0 z-50 flex items-center justify-center"
			>
				{/* Import dynamically or use standard import if available at top */}
				{/* Since I cannot see the top, I will assume I need to add the import at the top in a separate step if it's missing, 
                   but I will try to use the component directly assuming I add the import.
                   Wait, I am in replace_file_content for the bottom half. I need to make sure I add the import. 
                   I will use the full file content replacement in a subsequent step or try to add import now?
                   Actually I can adding the Import in a separate MultiReplace or just assume I'll do it next.
                   I will add the component usage here.
                */}
				<AboutMeSelection />
			</motion.div>

			{/* Roadmap Overlay - 40-55% (15% space) */}
			<motion.div 
				style={{ 
					opacity: useTransform(scrollYProgress, [0.38, 0.42, 0.53, 0.57], [0, 1, 1, 0]),
					pointerEvents: useTransform(scrollYProgress, (v) => (v > 0.40 && v < 0.55 ? "auto" : "none")) as any
				}}
				className="absolute inset-0 z-50 flex items-center justify-center overflow-y-auto"
			>
				<PixelRoadmap />
			</motion.div>

			{/* Arsenal Overlay - 55-70% (15% space) */}
			<motion.div 
				style={{ 
					opacity: useTransform(scrollYProgress, [0.53, 0.57, 0.68, 0.72], [0, 1, 1, 0]),
					pointerEvents: useTransform(scrollYProgress, (v) => (v > 0.55 && v < 0.70 ? "auto" : "none")) as any
				}}
				className="absolute inset-0 z-50 flex items-center justify-center overflow-y-auto"
			>
				<ComicAresenal />
			</motion.div>

			{/* Shelf Overlay - 70-85% (15% space) */}
			<motion.div 
				style={{ 
					opacity: useTransform(scrollYProgress, [0.68, 0.72, 0.83, 0.87], [0, 1, 1, 0]),
					pointerEvents: useTransform(scrollYProgress, (v) => (v > 0.70 && v < 0.85 ? "auto" : "none")) as any
				}}
				className="absolute inset-0 z-50 flex items-center justify-center overflow-y-auto"
			>
				<PixelShelf />
			</motion.div>

			{/* Aspiration Wall Overlay - 85-100% (15% space) */}
			<motion.div 
				style={{ 
					opacity: useTransform(scrollYProgress, [0.83, 0.87, 0.98, 1.0], [0, 1, 1, 0]),
					pointerEvents: useTransform(scrollYProgress, (v) => (v > 0.85 && v < 1.0 ? "auto" : "none")) as any
				}}
				className="absolute inset-0 z-50 flex items-center justify-center overflow-y-auto"
			>
				<AspirationWall />
			</motion.div>

			{/* CTA Selection Overlay - Always visible at 100% */}
			<motion.div 
				style={{ 
					opacity: useTransform(scrollYProgress, [0.98, 1.0], [0, 1]),
					pointerEvents: useTransform(scrollYProgress, (v) => (v >= 0.99 ? "auto" : "none")) as any
				}}
				className="absolute inset-0 z-50 flex items-center justify-center"
			>
				<GameCTA />
			</motion.div>
		</div>
	);
}
