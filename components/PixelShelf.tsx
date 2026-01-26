import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// --- ORGANIC COMIC SPARK ---
const SubtleComicSpark = ({ className = "" }: { className?: string }) => (
	<motion.div
		initial={{ scale: 0, opacity: 0 }}
		animate={{ scale: 1, opacity: 1 }}
		exit={{ scale: 0, opacity: 0 }}
		className={`absolute pointer-events-none ${className}`}
		transition={{ duration: 0.3, ease: "easeOut" }}
	>
		<svg viewBox="0 0 100 100" className="w-16 h-16 opacity-30">
			<motion.path
				d="M50,30 Q52,15 50,0 M75,40 Q85,32 100,25 M80,65 Q92,72 100,85 M50,75 Q48,90 50,100 M20,68 Q10,75 0,85 M22,35 Q12,28 0,20"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				initial={{ pathLength: 0 }}
				animate={{ pathLength: 1 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
			/>
		</svg>
	</motion.div>
);

// --- HAND-DRAWN COMIC SCRIBBLE ---
const ComicScribble = ({ className = "" }: { className?: string }) => (
	<motion.div
		initial={{ scale: 0, rotate: -30, opacity: 0 }}
		animate={{ scale: 1, rotate: 0, opacity: 1 }}
		exit={{ scale: 0, rotate: 30, opacity: 0 }}
		className={`absolute pointer-events-none ${className}`}
		transition={{ duration: 0.3, ease: "easeOut" }}
	>
		<svg viewBox="0 0 100 100" className="w-20 h-20 opacity-20">
			<motion.path
				d="M30,50 C30,20 70,20 70,50 C70,80 30,80 30,50 C30,30 60,30 60,50 C60,70 40,70 40,50"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				initial={{ pathLength: 0 }}
				animate={{ pathLength: 1 }}
				transition={{ duration: 0.6, ease: "linear" }}
			/>
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
		problem: "Current AI interfaces often fail to provide visceral feedback, creating a disconnect between abstract data and user perception.",
		thought: "I wanted to create a bridge using high-performance computation that translates latent space into visual artifacts.",
		solving: "Integrated real-time sharders with PyTorch backends, optimizing for low-latency visual updates.",
		result: "Increased user engagement by 45% and reduced cognitive load during data analysis.",
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
		problem: "Static 2D stores lack the depth and interactivity required for luxury digital collectibles.",
		thought: "The goal was to build an immersive 3D environment where products feel like physical objects.",
		solving: "Leveraged Three.js for GLTF rendering and custom physics for 'object weight' simulation.",
		result: "Conversion rates up by 22% with average session duration increasing by 3 minutes.",
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
		problem: "Legacy monitoring tools are heavy and slow, often causing the very performance dips they are meant to track.",
		thought: "I envisioned a lightweight, memory-safe collector that runs near native speed in the browser.",
		solving: "Used Rust's zero-cost abstractions and compiled to Wasm for peak performance.",
		result: "90% reduction in monitoring overhead compared to JS-based alternatives.",
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
		problem: "Collaborative tools often suffer from sync conflicts and high latency in distributed teams.",
		thought: "A state-first architecture was needed to ensure eventual consistency across all nodes.",
		solving: "Implemented OT (Operational Transformation) with a Redis pub/sub backbone.",
		result: "Zero data loss over 100k+ concurrent sync events with <50ms latency.",
	},
];

export default function PixelProjectShelf() {
	const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

	return (
		<div className="w-full bg-transparent pb-14 px-6 overflow-visible">
			<div className="max-w-5xl mx-auto">
				{projects.map((proj, index) => (
					<ProjectItem
						key={proj.id}
						proj={proj}
						index={index}
						onClick={() => setSelectedProject(proj)}
					/>
				))}
			</div>

			<AnimatePresence>
				{selectedProject && (
					<ProjectDetailView
						proj={selectedProject}
						onClose={() => setSelectedProject(null)}
					/>
				)}
			</AnimatePresence>

			{/* MORE IN THE WORKS SECTION - HANDWRITTEN COMIC STYLE */}
			<div className="mt-24 flex flex-col items-center justify-center font-['var(--font-caveat)'] text-white">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="relative flex flex-col items-center group"
				>
					{/* Header: Handwritten Font + Comic Pop Lines Only */}
					<div className="relative mb-12">
						<motion.h4
							className="text-5xl md:text-6xl font-bold tracking-wide relative z-10 transform -rotate-2"
							animate={{
								opacity: [0.8, 1, 0.8],
								y: [0, -4, 0],
								rotate: [-2, -1, -3, -2]
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: "easeInOut"
							}}
							whileHover={{ scale: 1.05, opacity: 1, rotate: 0 }}
						>
							with more in the works...
						</motion.h4>

						{/* Comic 'Stress' Marks - Top Right */}
						<motion.div
							className="absolute -top-12 -right-16 w-24 h-24 pointer-events-none"
							initial={{ scale: 0, opacity: 0 }}
							whileInView={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.5, type: "spring" }}
						>
							<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/80 w-full h-full">
								<path d="M20,80 Q50,50 90,10" strokeLinecap="round" />
								<path d="M50,90 Q65,60 95,40" strokeLinecap="round" />
								<path d="M10,60 Q40,55 90,50" strokeLinecap="round" />
							</svg>
						</motion.div>

						{/* Comic 'Stress' Marks - Bottom Left */}
						<motion.div
							className="absolute -bottom-8 -left-16 w-20 h-20 pointer-events-none"
							initial={{ scale: 0, opacity: 0 }}
							whileInView={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.7, type: "spring" }}
						>
							<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/80 w-full h-full transform rotate-180">
								<path d="M20,80 Q50,50 90,10" strokeLinecap="round" />
								<path d="M50,90 Q65,60 95,40" strokeLinecap="round" />
								<path d="M10,60 Q40,55 90,50" strokeLinecap="round" />
							</svg>
						</motion.div>
					</div>

					{/* Integrated GitHub Link in Speech Bubble */}
					<div className="relative flex flex-col items-center">
						<p className="mb-6 text-xl md:text-2xl text-zinc-400 text-center max-w-sm leading-6 font-['var(--font-caveat)']">
							(only a few can fit on this shelf!)
						</p>

						<a
							href="https://github.com/Lal-Jr"
							target="_blank"
							rel="noopener noreferrer"
							className="group relative inline-flex items-center gap-4 bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-4 border-4 border-black shadow-[4px_4px_0px_0px_#fff] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#fff]"
						>
							<span className="text-[10px] md:text-xs uppercase font-bold font-['Press_Start_2P']">Check out the archives</span>

							{/* Pixel Arrow Icon */}
							<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="transform group-hover:translate-x-1 transition-transform">
								<path d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z" />
							</svg>

							{/* Pixel GitHub Icon */}
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="hidden md:block">
								<path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
							</svg>
						</a>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

function ProjectItem({ proj, index, onClick }: { proj: typeof projects[0]; index: number; onClick: () => void }) {
	const [isHovered, setIsHovered] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const initialRotate = index % 2 === 0 ? 3 : -3;
	const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

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
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onMouseMove={handleMouseMove}
			onClick={onClick}
			className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
				} items-center gap-16 md:gap-24 relative group cursor-pointer py-8`}
		>
			{/* CURSOR FOLLOWING LABEL */}
			<AnimatePresence>
				{isHovered && (
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
					<h3 className="text-xl md:text-2xl lg:text-3xl font-['Press_Start_2P'] leading-tight uppercase text-white">
						{proj.title}
					</h3>
					<div className="flex items-center gap-3 text-emerald-500/60 font-['Press_Start_2P'] text-[10px] md:text-[12px]">
						<span>{proj.year}</span>
						<span className="w-1.5 h-1.5 bg-emerald-500/40 rounded-none transform rotate-45" />
						<span>{proj.category}</span>
					</div>
				</div>
			</div>

			{/* PROJECT IMAGE SECTION */}
			<div className="w-full md:w-1/2 relative">
				{/* Decorative Elements on Hover */}
				<AnimatePresence>
					{isHovered && (
						<>
							<SubtleComicSpark className={`-top-12 ${index % 2 === 0 ? "-right-12" : "-left-12"} z-50 text-white`} />
							<SubtleComicSpark className={`-bottom-12 ${index % 2 === 0 ? "-left-12" : "-right-12"} z-50 text-emerald-500`} />
							<ComicScribble className={`top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 ${index % 2 === 0 ? "text-rose-500" : "text-sky-500"}`} />
						</>
					)}
				</AnimatePresence>

				<motion.div
					style={{ y }}
					className="relative aspect-[4/3] w-full bg-zinc-900 rounded-[2rem] overflow-hidden transition-all duration-500"
					animate={{
						borderColor: isHovered ? proj.color : "#27272a", // zinc-800
						borderWidth: "12px",
						borderStyle: "solid",
						boxShadow: isHovered
							? `12px 12px 0px 0px ${proj.color}`
							: "0px 0px 0px 0px rgba(0,0,0,0)",
						scale: isHovered ? 1.02 : 1,
						rotate: isHovered ? 0 : initialRotate,
					}}
				>
					{/* Static Image / GIF Switch */}
					<Image
						src={isHovered ? proj.gif : proj.image}
						alt={proj.title}
						fill
						className={`object-cover transition-all duration-700 ${isHovered ? 'scale-100' : 'scale-110'}`}
					/>

				</motion.div>
			</div>
		</motion.div>
	);
}

// --- FULLSCREEN PROJECT DETAIL VIEW ---
function ProjectDetailView({ proj, onClose }: { proj: typeof projects[0]; onClose: () => void }) {
	// ESC Key to close & Lock Background Scroll
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		// Prevent background scroll
		document.body.style.overflow = "hidden";

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			// Restore background scroll
			document.body.style.overflow = "unset";
		};
	}, [onClose]);

	return (
		<motion.div
			initial={{ y: "100%" }}
			animate={{ y: 0 }}
			exit={{ y: "100%" }}
			transition={{ type: "spring", damping: 30, stiffness: 200 }}
			className="fixed inset-0 z-[10000] flex flex-col bg-zinc-950/80 backdrop-blur-2xl"
		>
			<style jsx global>{`
				::-webkit-scrollbar {
					display: none;
				}
				.no-scrollbar {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
			`}</style>

			<div className="flex-1 overflow-y-auto no-scrollbar w-full py-16 relative">
				{/* CLOSE BUTTON - TOP LEFT */}
				<button
					onClick={onClose}
					className="fixed top-8 left-8 z-[10001] group flex items-center gap-3 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10 hover:border-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]"
				>
					<div className="w-10 h-10 flex items-center justify-center">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
							<path d="M18 6L6 18M6 6l12 12" />
						</svg>
					</div>
					<span className="font-['Press_Start_2P'] text-[10px] text-zinc-400 group-hover:text-white transition-colors pr-2">ESC / CLOSE</span>
				</button>

				<div className="space-y-16 mt-20 px-6 md:px-12 max-w-7xl mx-auto">
					{/* 1. PROJECT GIF / IMAGE (FIRST) - UNBOXED */}
					<div className="relative aspect-video w-full overflow-hidden">
						<Image
							src={proj.gif || proj.image}
							alt={proj.title}
							fill
							className="object-cover"
						/>
					</div>

					{/* 2. HEADING + TECH + LINKS */}
					<div className="space-y-8 p-8 md:p-12 bg-white/5 border-4 border-white/10 rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(255,255,255,0.05)]">
						<div className="space-y-4">
							<div className="flex items-center gap-4 text-emerald-400 font-['Press_Start_2P'] text-[10px]">
								<span>{proj.year}</span>
								<span className="w-1.5 h-1.5 bg-emerald-400 rounded-none transform rotate-45" />
								<span>{proj.category}</span>
							</div>
							<h2 className="text-3xl md:text-5xl lg:text-6xl font-['Press_Start_2P'] uppercase text-white leading-tight tracking-tighter">
								{proj.title}
							</h2>
						</div>

						<div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
							<div className="space-y-4">
								<h4 className="font-['Press_Start_2P'] text-[10px] text-zinc-500 uppercase">Deployed Tech Stack</h4>
								<div className="flex flex-wrap gap-3">
									{proj.tech.map(t => (
										<PixelLabel key={t} text={t} className="bg-white text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[10px]" />
									))}
								</div>
							</div>
							<div className="flex items-center gap-8">
								<a href={proj.liveUrl} className="group flex items-center gap-2 font-['Press_Start_2P'] text-[12px] text-white hover:text-emerald-400 transition-colors uppercase">
									<span className="underline decoration-2 underline-offset-8">Live Demo</span>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
										<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
									</svg>
								</a>
								<a href={proj.githubUrl} className="group flex items-center gap-2 font-['Press_Start_2P'] text-[12px] text-white hover:text-emerald-400 transition-colors uppercase">
									<span className="underline decoration-2 underline-offset-8">Codebase</span>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
										<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
									</svg>
								</a>
							</div>
						</div>
					</div>

					{/* 3. DETAILED CONTENT SECTIONS - UNBOXED */}
					<div className="grid md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-16 pb-24">
						{/* Problem */}
						<div className="space-y-4 relative group">
							<h4 className="font-['Press_Start_2P'] text-[12px] text-rose-500 uppercase mb-4 flex items-center gap-3">
								<span className="w-2 h-2 bg-rose-500" /> The Problem
							</h4>
							<p className="text-xl md:text-2xl lg:text-3xl text-zinc-300 font-['var(--font-caveat)'] leading-relaxed">
								{proj.problem}
							</p>
						</div>

						{/* Thought Process */}
						<div className="space-y-4 relative group">
							<h4 className="font-['Press_Start_2P'] text-[12px] text-sky-500 uppercase mb-4 flex items-center gap-3">
								<span className="w-2 h-2 bg-sky-500" /> Thought Process
							</h4>
							<p className="text-xl md:text-2xl lg:text-3xl text-zinc-300 font-['var(--font-caveat)'] leading-relaxed">
								{proj.thought}
							</p>
						</div>

						{/* Solving */}
						<div className="space-y-4 relative group">
							<h4 className="font-['Press_Start_2P'] text-[12px] text-emerald-500 uppercase mb-4 flex items-center gap-3">
								<span className="w-2 h-2 bg-emerald-500" /> Solving the Puzzle
							</h4>
							<p className="text-xl md:text-2xl lg:text-3xl text-zinc-300 font-['var(--font-caveat)'] leading-relaxed">
								{proj.solving}
							</p>
						</div>

						{/* Final Result */}
						<div className="space-y-4 relative group">
							<h4 className="font-['Press_Start_2P'] text-[12px] text-yellow-400 uppercase mb-4 flex items-center gap-3">
								<span className="w-2 h-2 bg-yellow-400" /> Final Result
							</h4>
							<p className="text-2xl md:text-3xl lg:text-4xl text-yellow-400/90 font-['var(--font-caveat)'] leading-tight font-bold">
								{proj.result}
							</p>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
