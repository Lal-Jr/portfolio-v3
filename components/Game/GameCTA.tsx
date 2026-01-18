import React from "react";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Download, Trophy } from "lucide-react";
import { AVATARS } from "@/constants";

const socials = [
  { icon: Github, label: "GITHUB", color: "bg-zinc-800", url: "https://github.com" },
  { icon: Instagram, label: "INSTA", color: "bg-rose-500", url: "https://instagram.com" },
  { icon: Linkedin, label: "LINKED", color: "bg-blue-600", url: "https://linkedin.com" },
];

export default function GameCTA() {
	return (
		<div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-purple-950 to-black font-['Press_Start_2P'] p-8">
			{/* Subtle grid */}
			<div className="absolute inset-0 opacity-5" style={{
				backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
				backgroundSize: "60px 60px"
			}} />

			<div className="relative z-10 max-w-7xl w-full">
				{/* Victory Title */}
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ type: "spring", duration: 0.8 }}
					className="text-center mb-12"
				>
					<div className="flex items-center justify-center gap-4 mb-4">
						<Trophy className="text-yellow-400" size={48} />
						<h1 className="text-5xl md:text-7xl text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]">
							VICTORY!
						</h1>
						<Trophy className="text-yellow-400" size={48} />
					</div>
					<p className="text-sm md:text-base text-cyan-400 mb-3">JOURNEY_COMPLETE</p>
					<div className="h-1 w-48 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />
				</motion.div>

				{/* Main Content - Horizontal Layout */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					{/* Left: Avatar */}
					<motion.div
						initial={{ x: -50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="flex justify-center"
					>
						<div className="relative w-full max-w-md aspect-square">
							<div className="absolute inset-0 bg-cyan-400/20 blur-3xl" />
							<img
								src={AVATARS.ME}
								alt="Player"
								className="relative w-full h-full object-contain"
								style={{ imageRendering: "pixelated" }}
							/>
						</div>
					</motion.div>

					{/* Right: Stats & CTA */}
					<motion.div
						initial={{ x: 50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="space-y-8"
					>
						{/* Stats */}
						<div className="grid grid-cols-3 gap-4 text-center">
							<div className="border-4 border-cyan-400 p-6 bg-black shadow-[6px_6px_0px_0px_rgba(6,182,212,0.5)]">
								<div className="text-cyan-400 text-4xl md:text-5xl mb-2 font-bold">6</div>
								<div className="text-white text-[10px]">CHAPTERS</div>
							</div>
							<div className="border-4 border-emerald-400 p-6 bg-black shadow-[6px_6px_0px_0px_rgba(16,185,129,0.5)]">
								<div className="text-emerald-400 text-4xl md:text-5xl mb-2 font-bold">S</div>
								<div className="text-white text-[10px]">RANK</div>
							</div>
							<div className="border-4 border-yellow-400 p-6 bg-black shadow-[6px_6px_0px_0px_rgba(250,204,21,0.5)]">
								<div className="text-yellow-400 text-4xl md:text-5xl mb-2">★</div>
								<div className="text-white text-[10px]">COMPLETE</div>
							</div>
						</div>

						{/* Social Links */}
						<div className="flex gap-4 justify-center">
							{socials.map((social, i) => {
								const Icon = social.icon;
								return (
									<motion.a
										key={i}
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										initial={{ y: 20, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.7 + i * 0.1 }}
										whileHover={{ y: -4 }}
										className={`${social.color} border-4 border-black px-6 py-4 flex flex-col items-center gap-2 shadow-[6px_6px_0px_0px_white] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_white] transition-all flex-1`}
									>
										<Icon size={24} className="text-white" />
										<span className="text-white text-[9px]">{social.label}</span>
									</motion.a>
								);
							})}
						</div>

						{/* Resume Button */}
						<motion.a
							href="/resume.pdf"
							download
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 1 }}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="flex items-center justify-center gap-3 w-full py-5 bg-white text-black text-sm border-4 border-black shadow-[6px_6px_0px_0px_black] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_black] transition-all"
						>
							<Download size={20} />
							DOWNLOAD_RESUME
						</motion.a>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
