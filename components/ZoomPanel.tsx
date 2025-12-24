"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ZoomPanel({
	id,
	title,
	description,
	avatarSrc,
	color,
	onClick,
}: any) {
	return (
		<motion.div
			layoutId={`panel-${id}`}
			onClick={onClick}
			whileHover={{
				scale: 1.03,
				rotate: -1,
				zIndex: 20,
				boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)",
			}}
			className={`${color} border-4 border-black h-full relative overflow-hidden flex flex-col p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all`}
		>
			{/* Halftone Texture Overlay */}
			<div className="absolute inset-0 comic-halftone pointer-events-none" />

			<h3 className="font-black text-3xl uppercase italic z-10">
				{title}
			</h3>

			{/* NEW: Flex container to hold description and avatar side-by-side */}
			<div className="flex flex-1 items-end gap-4 z-10">
				<p className="font-bold text-sm leading-tight text-white mb-8 flex-1">
					{description}
				</p>

				<div className="flex-shrink-0">
					<motion.div className="relative w-32 h-32 md:w-48 md:h-48">
						<Image
							src={avatarSrc}
							alt={title}
							fill
							className="object-contain"
							style={{ imageRendering: "pixelated" }}
						/>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}
