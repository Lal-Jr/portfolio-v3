import React from "react";
import { motion } from "framer-motion";

export default function AboutMeSelection() {
	return (
		<div className="relative w-full h-[75vh] flex items-center justify-center overflow-hidden bg-pink-400 font-['Press_Start_2P'] p-4 md:p-12 gap-8">
			{/* --- SCANLINE OVERLAY --- */}
			<div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(0,0,0,0.06),rgba(0,0,0,0.02),rgba(0,0,0,0.06))] bg-[length:100%_2px,3px_100%]" />

			<div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
				{/* --- LEFT SIDE: TEXT CONTENT --- */}
				<motion.div 
					initial={{ x: -100, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					viewport={{ once: false }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="flex-1 w-full max-w-xl"
				>
					<div className="bg-black border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] p-6 md:p-8 relative">
						{/* Decorative pixel corners */}
						<div className="absolute -top-1 -left-1 w-2 h-2 bg-white" />
						<div className="absolute -top-1 -right-1 w-2 h-2 bg-white" />
						<div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white" />
						<div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white" />

						<h2 className="text-xl md:text-2xl text-white mb-6 leading-tight">
							SELECTED_CHARACTER: <br/>
							<span className="text-emerald-400 pt-2 animate-pulse">HARISH_LAL</span>
						</h2>

						<div className="space-y-4 text-[10px] md:text-xs text-zinc-300 leading-relaxed">
							<p>
								&gt; LEVEL: 24 <br/>
								&gt; CLASS: CREATIVE_DEV
							</p>
							<p>
								Passionate about crafting digital experiences that bridge the gap between retro nostalgia and modern performance.
							</p>
							<p>
								Equipped with a diverse arsenal of tech, I build pixel-perfect interfaces and robust systems.
							</p>
						</div>
					</div>
				</motion.div>

				{/* --- RIGHT SIDE: AVATAR --- */}
				<motion.div 
					className="flex-1 flex justify-center md:justify-end"
				>
					<div className="relative group">
						<motion.div
							layoutId="hero-avatar"
							className="relative w-64 h-64 md:w-[500px] md:h-[500px]"
						>
							<img
								src="/avatars/IMG_7733.png"
								alt="Haris Avatar"
								className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
								style={{ imageRendering: "pixelated" }}
							/>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
