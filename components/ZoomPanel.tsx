"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ZoomPanel({
	id,
	title,
	description,
	avatarSrc,
	color,
	isTall,
}: any) {
	return (
		<motion.div
			layoutId={`panel-${id}`}
			whileHover={{
				scale: 1.02,
				zIndex: 20,
				boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)",
			}}
			className={`
                ${color} border-4 border-black h-full relative overflow-hidden flex p-5 md:p-6 
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all gap-4
                ${
					isTall
						? "flex-col justify-between" // Stacked for Move and Tall panels
						: "flex-col md:flex-row items-center justify-between" // Side-by-side for others
				}
            `}
		>
			{/* Halftone Texture Overlay */}
			<div className="absolute inset-0 comic-halftone pointer-events-none" />

			{/* Text Content */}
			{/* <div className={`flex flex-col z-10 ${!isTall ? "md:flex-1" : ""}`}>
				<h3 className="font-black text-xl md:text-3xl uppercase italic leading-none mb-2">
					{title}
				</h3>
				<p
					className={`font-bold text-xs md:text-sm leading-tight text-white `}
				>
					{description}
				</p>
			</div> */}

			{/* Avatar Container */}
			<div className={"flex-shrink-0 z-10 flex mt-auto self-end"}>
				<motion.div
					className={`relative ${
						isTall
							? "w-48 h-48 md:w-56 md:h-56"
							: "w-32 h-32 md:w-48 md:h-48"
					}`}
				>
					<Image
						src={avatarSrc}
						alt={title}
						fill
						className="object-contain object-right-bottom"
						style={{ imageRendering: "pixelated" }}
					/>
				</motion.div>
			</div>
		</motion.div>
	);
}
