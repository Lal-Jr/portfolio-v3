"use client";
import React, { useState, useEffect } from "react";

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

				const nextValue = prev + (fastForward ? 4 : 0.4);

				// Logical "Trigger Point" inside the setter
				// This avoids the cascading render error
				if (nextValue >= 98 && !cherryEaten) {
					setCherryEaten(true);
					// Call the completion callback after a small delay
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
	}, [onComplete, cherryEaten]); // cherryEaten dependency ensures we don't trigger the timeout twice

	return (
		<div className="flex flex-col items-center justify-center w-full max-w-2xl p-12 bg-black rounded-3xl">
			<style>
				{`
          @keyframes chomp-top {
            0%, 100% { transform: rotate(-45deg); }
            50% { transform: rotate(0deg); }
          }
          @keyframes chomp-bottom {
            0%, 100% { transform: rotate(45deg); }
            50% { transform: rotate(0deg); }
          }
        `}
			</style>

			{/* The Track */}
			<div className="relative w-full h-24 mb-6 flex items-center bg-gray-900/40 rounded-full px-4 border border-blue-900/50 overflow-hidden">
				{/* Pellets - disappearing based on progress */}
				<div className="absolute inset-0 flex items-center justify-around px-12">
					{[...Array(12)].map((_, i) => (
						<div
							key={i}
							className="w-2 h-2 bg-pink-100 rounded-full transition-opacity duration-75"
							style={{ opacity: progress > (i + 1) * 8 ? 0 : 1 }}
						/>
					))}
				</div>

				{/* The Cherry 🍒 */}
				<div
					className={`absolute right-6 text-3xl transition-all duration-150 ${
						cherryEaten
							? "scale-0 opacity-0 translate-x-4"
							: "scale-110 opacity-100"
					}`}
				>
					🍒
				</div>

				{/* Pac-Man Body */}
				<div
					className="absolute transition-all duration-150 ease-out"
					style={{ left: `${progress * 0.85}%` }}
				>
					<div className="relative w-16 h-16">
						<div
							className="absolute top-0 left-0 w-16 h-8 bg-yellow-400 rounded-t-full origin-bottom"
							style={{
								animation: "chomp-top 0.2s infinite linear",
							}}
						/>
						<div
							className="absolute bottom-0 left-0 w-16 h-8 bg-yellow-400 rounded-b-full origin-top"
							style={{
								animation: "chomp-bottom 0.2s infinite linear",
							}}
						/>
						<div className="absolute top-3 left-9 w-2 h-2 bg-black rounded-full z-10" />
					</div>
				</div>
			</div>

			{/* Percentage Display with Yellow Glow */}
			<div className="mt-6 text-center">
				<div
					className="text-6xl font-mono font-black text-yellow-400 italic tracking-tighter"
					style={{
						textShadow:
							"0 0 10px rgba(250, 204, 21, 0.8), 0 0 20px rgba(250, 204, 21, 0.4)",
					}}
				>
					{Math.floor(progress)}
					<span className="text-2xl not-italic ml-1">%</span>
				</div>

				{/* Status Text with Blue Glow */}
				<div
					className="mt-3 text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse"
					style={{
						textShadow: "0 0 8px rgba(59, 130, 246, 0.6)",
					}}
				>
					{progress === 100 ? "Ready to Play!" : "Loading Level 1..."}
				</div>
			</div>
		</div>
	);
};

export default PacmanLoader;
