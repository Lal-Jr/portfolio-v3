"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
	onComplete: () => void;
}

const PacmanLoader: React.FC<Props> = ({ onComplete }) => {
	const [progress, setProgress] = useState(0);
	const [cherryEaten, setCherryEaten] = useState(false);

	useEffect(() => {
		let fastForward = false;

		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					return 100;
				}

				const nextValue = prev + (fastForward ? 5 : 0.5);

				// Trigger cherry eaten slightly before reaching the very end for better visual sync
				if (nextValue >= 98 && !cherryEaten) {
					setCherryEaten(true);
					setTimeout(() => {
						if (typeof onComplete === "function") onComplete();
					}, 500);
				}

				return Math.min(nextValue, 100);
			});
		}, 30);

		const handleLoad = () => {
			fastForward = true;
		};

		if (document.readyState === "complete") {
			handleLoad();
		} else {
			window.addEventListener("load", handleLoad);
			return () => {
				window.removeEventListener("load", handleLoad);
				clearInterval(interval);
			};
		}

		return () => clearInterval(interval);
	}, [onComplete, cherryEaten]);

	return (
		<div className="flex flex-col items-center justify-center w-full max-w-2xl px-8">
			{/* THE TRACK */}
			<div className="relative w-full h-32 mb-8 flex items-center">
				{/* Pellets - Classic Small Dots */}
				<div className="absolute inset-0 flex items-center justify-between px-8">
					{[...Array(12)].map((_, i) => (
						<motion.div
							key={i}
							className="w-2 h-2 rounded-full bg-[#ffb8ff] opacity-80"
							initial={{ opacity: 0.8 }}
							animate={{
								opacity: progress > (i + 1) * (100 / 13) ? 0 : 0.8,
								scale: progress > (i + 1) * (100 / 13) ? 0 : 1
							}}
						/>
					))}
				</div>

				{/* Classic Pac-Man */}
				<motion.div
					className="absolute z-10"
					style={{
						left: `${progress}%`,
						x: "-50%"
					}}
				>
					<div className="relative w-16 h-16">
						<svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,0,0.3)]">
							{/* Top Jaw */}
							<motion.path
								d="M50,50 L95,20 A45,45 0 1,0 5,50 L50,50"
								fill="#FFFF00"
								animate={{
									d: [
										"M50,50 L95,15 A45,45 0 1,0 5,50 L50,50",
										"M50,50 L95,50 A45,45 1 1,0 5,50 L50,50",
										"M50,50 L95,15 A45,45 0 1,0 5,50 L50,50"
									]
								}}
								transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
							/>
							{/* Bottom Jaw */}
							<motion.path
								d="M50,50 L95,80 A45,45 0 0,1 5,50 L50,50"
								fill="#FFFF00"
								animate={{
									d: [
										"M50,50 L95,85 A45,45 0 0,1 5,50 L50,50",
										"M50,50 L95,50 A45,45 1 0,1 5,50 L50,50",
										"M50,50 L95,85 A45,45 0 0,1 5,50 L50,50"
									]
								}}
								transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
							/>
						</svg>
					</div>
				</motion.div>

				{/* The Goal / Cherry */}
				<div
					className={`absolute right-0 transition-all duration-200 ${cherryEaten ? "scale-0 opacity-0" : "scale-110 opacity-100"
						}`}
				>
					<span className="text-4xl filter drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]">🍒</span>
				</div>
			</div>

			{/* Progress Text */}
			<div className="text-center space-y-4">
				<div className="flex items-baseline justify-center gap-2">
					<span className="text-6xl md:text-8xl font-['Press_Start_2P'] text-white tracking-tighter">
						{Math.floor(progress)}
					</span>
					<span className="text-2xl font-['Press_Start_2P'] text-yellow-400">%</span>
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						key={progress === 100 ? "ready" : "loading"}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="text-3xl md:text-4xl font-['var(--font-caveat)'] text-zinc-400"
					>
						{progress === 100 ? (
							<span className="text-green-400">ready to play!</span>
						) : (
							<span>preparing level one...</span>
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default PacmanLoader;
