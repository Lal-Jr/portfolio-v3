"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Instagram, Linkedin, Download, Mail } from "lucide-react";

const socials = [
	{
		icon: <Github size={20} />,
		label: "GITHUB",
		color: "bg-zinc-800",
		url: "https://github.com",
	},
	{
		icon: <Instagram size={20} />,
		label: "INSTA",
		color: "bg-rose-500",
		url: "https://instagram.com",
	},
	{
		icon: <Linkedin size={20} />,
		label: "LINKED",
		color: "bg-blue-600",
		url: "https://linkedin.com",
	},
];

const PixelCTA = () => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center p-8 border-t-8 border-white font-['Press_Start_2P'] text-white">
			{/* 1. CRT SCANLINES (Must have pointer-events-none) */}
			<div className="absolute inset-0 pointer-events-none z-[60] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />

			<div className="z-10 text-center mb-16 max-w-2xl">
				<h2 className="text-2xl md:text-4xl uppercase leading-tight mb-4 drop-shadow-[4px_4px_0px_#dc2626]">
					CONNECT_TO <br />
					<span className="text-red-600">STATION_01</span>
				</h2>
			</div>

			<div className="relative flex flex-col items-center">
				{/* 2. FIXED SOCIAL DROPS (Adjusted position and z-index) */}
				<div className="absolute -top-48 left-1/2 -translate-x-1/2 flex gap-4 z-20 w-max pointer-events-none">
					<AnimatePresence>
						{isActive &&
							socials.map((social, i) => (
								<motion.a
									key={i}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									initial={{ y: -50, opacity: 0, scale: 0 }}
									animate={{ y: 0, opacity: 1, scale: 1 }}
									exit={{ y: -20, opacity: 0, scale: 0 }}
									transition={{
										type: "spring",
										stiffness: 260,
										damping: 20,
										delay: i * 0.1,
									}}
									className={`pointer-events-auto w-24 h-24 md:w-32 md:h-20 ${social.color} border-4 border-black p-2 flex flex-col items-center justify-center shadow-[6px_6px_0px_0px_white] hover:translate-y-[-5px] active:shadow-none active:translate-y-0 transition-all`}
								>
									{social.icon}
									<span className="text-[8px] mt-3">
										{social.label}
									</span>
								</motion.a>
							))}
					</AnimatePresence>
				</div>

				{/* 3. CLICKABLE TERMINAL BODY */}
				<div
					onClick={() => setIsActive(!isActive)}
					className="relative w-64 h-80 z-10 cursor-pointer group"
				>
					{/* TERMINAL SCREEN */}
					<div
						className={`absolute top-0 left-0 w-full h-full border-8 bg-zinc-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center p-6 overflow-hidden transition-all duration-500 ${
							isActive
								? "border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
								: "border-white hover:border-red-500"
						}`}
					>
						<div
							className={`w-full h-32 border-4 transition-colors duration-500 ${
								isActive
									? "border-emerald-500 bg-emerald-500/10"
									: "border-zinc-800 bg-black"
							} flex flex-col items-center justify-center mb-6 overflow-hidden relative`}
						>
							{isActive ? (
								<motion.div
									animate={{ opacity: [0.4, 1, 0.4] }}
									transition={{
										repeat: Infinity,
										duration: 0.15,
									}}
									className="text-emerald-500 text-[10px] text-center px-2"
								>
									UPLINK_ON
									<div className="text-[7px] mt-2 text-emerald-300/50">
										RECIEVING_DATA...
									</div>
								</motion.div>
							) : (
								<Mail
									className="text-zinc-800 group-hover:text-red-500 transition-colors"
									size={48}
								/>
							)}

							{isActive && (
								<div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(16,185,129,0.05)_2px,rgba(16,185,129,0.05)_4px)]" />
							)}
						</div>

						{/* KEYPAD DETAIL */}
						<div className="grid grid-cols-3 gap-2 w-full">
							{[...Array(6)].map((_, i) => (
								<div
									key={i}
									className={`h-4 border-2 transition-colors ${
										isActive
											? "bg-emerald-900 border-emerald-500"
											: "bg-zinc-800 border-zinc-700"
									}`}
								/>
							))}
						</div>

						{/* BOOT TEXT HINT */}
						{!isActive && (
							<motion.div
								animate={{ opacity: [0, 1, 0] }}
								transition={{ repeat: Infinity, duration: 2 }}
								className="mt-4 text-[7px] text-zinc-500"
							>
								[ CLICK_TO_INIT ]
							</motion.div>
						)}
					</div>

					{/* OVERRIDE LEVER (THE FLAG) */}
					<div className="absolute -right-16 top-1/2 -translate-y-1/2">
						<div className="relative">
							<div
								className={`w-10 h-10 bg-zinc-800 border-4 flex items-center justify-center transition-colors ${
									isActive
										? "border-emerald-500"
										: "border-white"
								}`}
							>
								<motion.div
									animate={{ rotate: isActive ? 180 : 0 }}
									className={`w-1 h-10 border-2 border-black origin-center ${
										isActive
											? "bg-emerald-500"
											: "bg-red-600"
									}`}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* THE BASE */}
				<div
					className={`w-48 h-12 bg-zinc-900 border-x-8 border-b-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-colors duration-500 ${
						isActive ? "border-emerald-500" : "border-white"
					}`}
				/>
			</div>

			{/* RESUME LOOT DROP */}
			<div className="mt-20 h-24">
				<AnimatePresence>
					{isActive && (
						<motion.a
							href="/resume.pdf"
							download
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: 20, opacity: 0 }}
							className="flex items-center gap-4 px-8 py-5 bg-emerald-500 border-4 border-black text-black text-xs md:text-sm shadow-[8px_8px_0px_0px_white] hover:bg-emerald-400 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all active:scale-95"
						>
							<Download size={20} />
							GET_RESUME.EXE
						</motion.a>
					)}
				</AnimatePresence>
			</div>

			{/* FOOTER SYMBOLS */}
			<div className="absolute bottom-10 flex gap-10 opacity-20">
				<span className="text-[10px]">VER: 2.0.26</span>
				<span className="text-[10px]">© PLAYER_ONE</span>
				<span className="text-[10px]">STATION: 7739</span>
			</div>
		</div>
	);
};

export default PixelCTA;
