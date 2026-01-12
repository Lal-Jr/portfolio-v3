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

// --- SORTABLE ITEM COMPONENT ---
function SortablePanel({
	id,
	item,
	index,
}: {
	id: string;
	item: any;
	index: number;
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

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 50 : 1,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`${config.grid} ${
				isDragging ? "opacity-50" : "opacity-100"
			} group relative border-2 border-zinc-800 bg-black overflow-hidden transition-colors hover:border-white/40`}
			{...attributes}
			{...listeners}
		>
			{/* --- NEW TITLE & LABEL OVERLAY --- */}
			<div className="absolute top-0 left-0 z-20 p-3 flex flex-col gap-1 pointer-events-none">
				<span className="text-[10px] md:text-[12px] text-white bg-black/60 px-2 py-1 backdrop-blur-sm border-l-2 border-white/30">
					{item.title}
				</span>
				<span className="text-[8px] md:text-[10px] text-zinc-400 bg-black/60 px-2 py-0.5 backdrop-blur-sm">
					{item.desc}
				</span>
			</div>

			<ZoomPanel
				{...item}
				avatarSrc={item.avatar}
				description={item.desc}
				isTall={config.isTall}
			/>

			{/* Visual drag handle hint */}
			<div className="absolute top-2 right-2 text-[10px] text-zinc-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
				⁝⁝
			</div>
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

	const gridOpacity = useTransform(scrollYProgress, [0.2, 0.25], [0, 1]);

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
				className="w-full max-w-7xl"
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
								/>
							))}
						</div>
					</SortableContext>
				</DndContext>
			</motion.div>
		</div>
	);
}
