import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

// --- DECORATIVE STARBURST ---
const Starburst = ({ className = "", color = "#DD5E25" }: { className?: string; color?: string }) => (
	<motion.div
		initial={{ scale: 0, rotate: -45 }}
		animate={{ scale: 1, rotate: 0 }}
		exit={{ scale: 0, rotate: 45 }}
		className={`absolute pointer-events-none ${className}`}
	>
		<svg viewBox="0 0 100 100" className="w-16 h-16 md:w-24 md:h-24">
			<motion.path
				d="M50 0 L60 35 L95 25 L75 55 L100 80 L65 75 L50 100 L35 75 L0 80 L25 55 L5 25 L40 35 Z"
				fill={color}
				stroke="white"
				strokeWidth="2"
				strokeLinejoin="round"
				animate={{ scale: [1, 1.1, 1] }}
				transition={{ duration: 2, repeat: Infinity }}
			/>
			<text x="50" y="55" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle" className="font-['Press_Start_2P'] uppercase">POP!</text>
		</svg>
	</motion.div>
);

// --- PIXEL GAME LABEL ---
const PixelLabel = ({ text, className = "" }: { text: string; className?: string }) => (
	<motion.div
		initial={{ y: 20, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: -20, opacity: 0 }}
		className={`bg-white text-black px-2 py-1 font-['Press_Start_2P'] text-[8px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}
	>
		{text}
	</motion.div>
);

const projects = [
	{
		id: 1,
		title: "THE INTERFACE THAT SEES BEYOND THE VOID",
		year: "2024",
		category: "AI & Data Science",
		tech: ["Next.js", "PyTorch"],
		color: "#DD5E25",
		image: "/Placeholder.jpg",
		gif: "/PlaceholderGIF.webp",
		time: "10m read",
		liveUrl: "#",
		githubUrl: "#",
	},
	{
		id: 2,
		title: "A GATEWAY TO DIMENSIONAL ARTIFACTS",
		year: "2023",
		category: "E-Commerce & 3D",
		tech: ["React", "Three.js"],
		color: "#10b981",
		image: "/Placeholder.jpg",
		gif: "/PlaceholderGIF.webp",
		time: "5m read",
		liveUrl: "#",
		githubUrl: "#",
	},
	{
		id: 3,
		title: "HARNESSING THE PULSE OF THE MACHINE",
		year: "2024",
		category: "Systems & Monitoring",
		tech: ["Rust", "Wasm"],
		color: "#3b82f6",
		image: "/Placeholder.jpg",
		gif: "/PlaceholderGIF.webp",
		time: "8m read",
		liveUrl: "#",
		githubUrl: "#",
	},
	{
		id: 4,
		title: "WHERE FRAGMENTS OF THOUGHT ALIGN",
		year: "2022",
		category: "Collaboration Tool",
		tech: ["Node", "Redis"],
		color: "#a855f7",
		image: "/Placeholder.jpg",
		gif: "/PlaceholderGIF.webp",
		time: "6m read",
		liveUrl: "#",
		githubUrl: "#",
	},
];

export default function PixelProjectShelf() {
	return (
		<div className="w-full bg-transparent py-14 px-6 overflow-visible">
			<div className="max-w-4xl mx-auto space-y-20">
				{projects.map((proj, index) => (
					<ProjectItem key={proj.id} proj={proj} index={index} />
				))}
			</div>

			{/* MORE IN THE WORKS SECTION */}
			<div className="mt-24 flex flex-col items-center justify-center font-['var(--font-caveat)'] text-white">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="relative flex flex-col items-center group"
				>
					{/* Hand-drawn Pencil Icon */}
					<div className="relative mb-4">
						<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
							<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
							<path d="M15 5l4 4" />
						</svg>
						{/* Wavy line underneath based on reference */}
						<motion.svg
							width="80" height="20" viewBox="0 0 80 20"
							className="absolute -bottom-2 -left-8 text-white/20"
						>
							<motion.path
								d="M0 10 Q 20 0, 40 10 T 80 10"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								initial={{ pathLength: 0 }}
								whileInView={{ pathLength: 1 }}
								transition={{ duration: 1, delay: 0.5 }}
							/>
						</motion.svg>
					</div>

					<h4 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
						with more in the works
					</h4>

					{/* Action Lines (Speed lines from ref) */}
					<div className="absolute -left-16 top-1/2 -translate-y-1/2 flex flex-col gap-3 opacity-10">
						<div className="w-10 h-0.5 bg-white transform -rotate-12" />
						<div className="w-12 h-0.5 bg-white transform rotate-6" />
						<div className="w-8 h-0.5 bg-white transform -rotate-3" />
					</div>

					<a
						href="https://github.com/Lal-Jr"
						target="_blank"
						rel="noopener noreferrer"
						className="group/link relative px-8 py-3 rounded-full border-2 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all flex items-center gap-3 text-2xl font-bold overflow-hidden"
					>
						<span className="relative z-10 text-white/60 group-hover/link:text-white transition-colors">
							see all projects on github
						</span>
						<motion.div
							className="absolute inset-0 bg-emerald-500/20 translate-y-full group-hover/link:translate-y-0 transition-transform duration-300"
						/>
					</a>
				</motion.div>
			</div>
		</div>
	);
}

function ProjectItem({ proj, index }: { proj: typeof projects[0]; index: number }) {
	const [isHovered, setIsHovered] = useState(false);
	const [isRead, setIsRead] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
	const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -2 : 2, index % 2 === 0 ? 2 : -2]);

	const handleMouseMove = (e: React.MouseEvent) => {
		setMousePos({ x: e.clientX, y: e.clientY });
	};

	return (
		<motion.div
			ref={containerRef}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ duration: 0.8 }}
			onClick={() => setIsRead(true)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onMouseMove={handleMouseMove}
			className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
				} items-center gap-16 md:gap-24 relative group cursor-pointer py-10`}
		>
			{/* CURSOR FOLLOWING LABEL */}
			<AnimatePresence>
				{isHovered && !isRead && (
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }}
						className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
						style={{
							x: mousePos.x + 20,
							y: mousePos.y + 20
						}}
					>
						<PixelLabel text={proj.time} className="bg-yellow-400 text-black border-black whitespace-nowrap" />
					</motion.div>
				)}
			</AnimatePresence>

			{/* PROJECT CONTENT SECTION */}
			<div className="w-full md:w-1/2 space-y-6 z-10 transition-opacity duration-300">
				<div className="space-y-3">
					<h3 className={`text-xl md:text-2xl lg:text-3xl font-['Press_Start_2P'] leading-tight uppercase transition-colors duration-300 ${isRead ? 'text-zinc-700' : 'text-white'}`}>
						{proj.title}
					</h3>
					<div className="flex items-center gap-3 text-emerald-500/60 font-['Press_Start_2P'] text-[10px] md:text-[12px]">
						<span>{proj.year}</span>
						<span className="w-1.5 h-1.5 bg-emerald-500/40 rounded-none transform rotate-45" />
						<span>{proj.category}</span>
					</div>
				</div>

				<AnimatePresence>
					{isRead && (
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							className="text-emerald-500 font-['Press_Start_2P'] text-[10px] flex items-center gap-2"
						>
							<span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
							MEMORY_STOCKED
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* PROJECT IMAGE SECTION */}
			<div className="w-full md:w-1/2 relative">
				{/* Decorative Elements on Hover */}
				<AnimatePresence>
					{isHovered && !isRead && (
						<>
							<Starburst className={`-top-12 ${index % 2 === 0 ? "-right-12" : "-left-12"} z-50`} color={proj.color} />

							<motion.div
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0 }}
								className={`absolute ${index % 2 === 0 ? "-top-12 -left-8" : "-top-12 -right-8"} z-50`}
							>
								<PixelLabel text={`LEVEL ${proj.id}`} className="bg-emerald-500 text-white" />
							</motion.div>
						</>
					)}
				</AnimatePresence>

				<motion.div
					style={{ y, rotate }}
					className={`relative aspect-[4/3] w-full bg-zinc-900 border-[12px] ${isHovered && !isRead ? 'border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.2)]' : 'border-zinc-800'} rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 ${isRead ? 'opacity-20 grayscale scale-95' : ''}`}
				>
					{/* Static Image / GIF Switch */}
					<Image
						src={isHovered && !isRead ? proj.gif : proj.image}
						alt={proj.title}
						fill
						className={`object-cover transition-all duration-700 ${isHovered && !isRead ? 'scale-100' : 'scale-110'}`}
					/>

					{/* Hover Overlay */}
					<AnimatePresence>
						{isHovered && !isRead && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent flex flex-col justify-end p-8"
							>
								<span className="font-['Press_Start_2P'] text-[10px] text-white opacity-80 animate-pulse">EXTRACTING_DATA...</span>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</motion.div>
	);
}
