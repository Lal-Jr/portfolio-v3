"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 0 = Blocked, "" = Empty Playable Square
const INITIAL_GRID = [
	["C", "O", "I", "N", 0],
	["O", 0, "N", 0, 0],
	["", "", "T", "", 0], // User can fill these
	["E", 0, "E", 0, 0],
	[0, 0, "", "", "", "", ""],
];

export default function ArcadeCrossword() {
	const [isZoomed, setIsZoomed] = useState(false);
	const [insertingCoin, setInsertingCoin] = useState(false);
	const [grid, setGrid] = useState(INITIAL_GRID);
	const [activeCell, setActiveCell] = useState<{
		r: number;
		c: number;
	} | null>(null);

	// Handle Keyboard Input for the Game
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsZoomed(false);
				setActiveCell(null);
				return;
			}

			if (isZoomed && activeCell && /^[a-zA-Z]$/.test(e.key)) {
				const newGrid = [...grid.map((row) => [...row])];
				newGrid[activeCell.r][activeCell.c] = e.key.toUpperCase();
				setGrid(newGrid);
			}

			if (e.key === "Backspace" && activeCell) {
				const newGrid = [...grid.map((row) => [...row])];
				newGrid[activeCell.r][activeCell.c] = "";
				setGrid(newGrid);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isZoomed, activeCell, grid]);

	const handleCoinInsert = () => {
		if (isZoomed) return;
		setInsertingCoin(true);
		setTimeout(() => {
			setInsertingCoin(false);
			setIsZoomed(true);
		}, 800);
	};

	return (
		<div className="relative flex flex-col items-center justify-center bg-zinc-950 overflow-hidden font-mono">
			{/* 1. Coin Animation */}
			<AnimatePresence>
				{insertingCoin && (
					<motion.div
						initial={{ y: -100, opacity: 0 }}
						animate={{ y: 280, opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute z-[60] w-10 h-10 bg-gradient-to-b from-amber-300 to-amber-600 rounded-full border-2 border-amber-800 shadow-[0_0_30px_rgba(245,158,11,0.8)] flex items-center justify-center font-bold text-amber-900"
					>
						$
					</motion.div>
				)}
			</AnimatePresence>

			{/* 2. The Cabinet */}
			<div className="relative w-80 h-[550px] bg-zinc-900 rounded-t-3xl border-x-[12px] border-zinc-800 shadow-2xl flex flex-col">
				<div className="h-20 bg-zinc-800 border-b-4 border-black p-3">
					<div className="w-full h-full bg-emerald-600 rounded flex items-center justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]">
						<span className="text-white font-black italic tracking-widest text-[10px]">
							WORD-CRUSH 1984
						</span>
					</div>
				</div>

				{/* 3. THE SCREEN AREA */}
				<div className="relative h-64 bg-black overflow-hidden">
					<motion.div
						layout
						className={`
              ${
					isZoomed
						? "fixed inset-0 z-[100] w-screen h-screen flex flex-col items-center justify-center bg-[#111]"
						: "absolute inset-0 w-full h-full border-4 border-zinc-900 shadow-[inset_0_0_60px_rgba(0,0,0,1)]"
				}
            `}
					>
						{isZoomed && (
							<div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
						)}

						<AnimatePresence>
							{isZoomed && (
								<motion.button
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									onClick={() => setIsZoomed(false)}
									className="absolute top-10 right-10 px-6 py-2 bg-red-600 text-white font-bold rounded border-b-4 border-red-900 active:translate-y-1 transition-all"
								>
									QUIT [ESC]
								</motion.button>
							)}
						</AnimatePresence>

						{/* Crossword Board */}
						<div
							className={`grid gap-1 p-2 bg-zinc-700 rounded shadow-2xl transition-all duration-500 ${
								isZoomed
									? "scale-125"
									: "scale-[0.4] opacity-30"
							}`}
						>
							{grid.map((row, rIdx) => (
								<div key={rIdx} className="flex gap-1">
									{row.map((cell, cIdx) => (
										<div
											key={`${rIdx}-${cIdx}`}
											className="relative"
										>
											{cell === 0 ? (
												<div className="w-10 h-10 bg-zinc-900 rounded-sm" />
											) : (
												<motion.button
													whileHover={
														isZoomed
															? { scale: 1.05 }
															: {}
													}
													onClick={() =>
														isZoomed &&
														setActiveCell({
															r: rIdx,
															c: cIdx,
														})
													}
													className={`w-10 h-10 flex items-center justify-center text-lg font-bold rounded-sm transition-colors
                            ${
								activeCell?.r === rIdx && activeCell?.c === cIdx
									? "bg-yellow-400 text-black ring-4 ring-yellow-200"
									: "bg-white text-zinc-900 hover:bg-zinc-100"
							}
                          `}
												>
													{cell}
												</motion.button>
											)}
										</div>
									))}
								</div>
							))}
						</div>

						{isZoomed && (
							<div className="mt-12 text-center">
								<p className="text-emerald-500 text-sm animate-pulse mb-2 tracking-widest">
									{activeCell
										? `EDITING CELL [${activeCell.r}, ${activeCell.c}]`
										: "SELECT A WHITE SQUARE"}
								</p>
								<p className="text-zinc-500 text-xs italic">
									Use your keyboard to type letters
								</p>
							</div>
						)}
					</motion.div>
				</div>

				{/* 4. Controls */}
				<div className="h-20 bg-zinc-800 border-t-2 border-zinc-700 [transform:rotateX(35deg)] origin-top z-10 flex items-center justify-around">
					<div className="w-10 h-10 bg-red-600 rounded-full shadow-[0_6px_0_rgb(153,27,27)]" />
					<div className="flex gap-2">
						<div className="w-6 h-6 bg-blue-500 rounded-full" />
						<div className="w-6 h-6 bg-yellow-500 rounded-full" />
					</div>
				</div>

				{/* 5. Coin Entry */}
				<div className="flex-grow flex items-center justify-center bg-zinc-900 border-t-4 border-black/20">
					<motion.button
						whileTap={{ scale: 0.9 }}
						onClick={handleCoinInsert}
						disabled={isZoomed}
						className="w-12 h-16 bg-zinc-800 border-2 border-zinc-700 rounded flex flex-col items-center py-2 hover:border-amber-500 transition-all"
					>
						<div className="w-1.5 h-8 bg-black rounded-full mb-1" />
						<span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">
							Coin
						</span>
					</motion.button>
				</div>
			</div>

			<p className="mt-6 text-zinc-700 text-[10px] uppercase tracking-widest">
				Insert coin to unlock board
			</p>
		</div>
	);
}
