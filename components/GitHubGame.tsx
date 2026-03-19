"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComicScribble from "@/components/ui/ComicScribble";
import { useGitHubGame } from "@/hooks/useGitHubGame";

export default function GitHubGame() {
    const {
        game,
        contributions,
        gameOver,
        loading,
        isAutoPlaying,
        isPlaying,
        PADDLE_WIDTH,
        GRID_ROWS,
        GRID_COLS,
        resetGame
    } = useGitHubGame();

    // Helper to get color based on contribution level and ball/paddle position
    const getCellColor = (level: number, colIndex: number, rowIndex: number) => {
        // Ball
        if (game.ball.x === colIndex && game.ball.y === rowIndex) return "bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20 relative";

        // Paddle
        if (rowIndex === GRID_ROWS - 1 && colIndex >= game.paddleX && colIndex < game.paddleX + PADDLE_WIDTH) {
            return "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] z-10 relative";
        }

        // Broken Contribution Block
        if (game.brokenBlocks.includes(`${colIndex},${rowIndex}`)) return "bg-white/5";

        switch (level) {
            case 1: return "bg-emerald-900/60";
            case 2: return "bg-emerald-700/60";
            case 3: return "bg-emerald-500/80";
            case 4: return "bg-emerald-300/90";
            default: return "bg-white/5";
        }
    };

    return (
        <section className="relative w-full flex flex-col items-center justify-center overflow-hidden z-10 px-8 py-12">
            {/* Decor */}
            <div className="absolute top-10 left-10 opacity-40 pointer-events-none rotate-12">
                <ComicScribble type="loop" width={100} color="#34d399" />
            </div>

            <div className="max-w-7xl w-full px-6 relative z-10 flex flex-col items-center">

                {/* Header Section */}
                <div className="text-center mb-8 relative">
                    {/* Instructions */}
                    <AnimatePresence>
                        {isAutoPlaying && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="mt-4 flex gap-4 justify-center text-zinc-500 font-handwriting text-xl animate-pulse"
                            >
                                <span className="flex items-center gap-2">
                                    <span className="border border-zinc-700 px-2 rounded">PRESS LEFT / RIGHT TO PLAY</span>
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* GAME CONTAINER */}
                <div
                    className="relative bg-zinc-950/50 p-4 md:p-8 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] md:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)] backdrop-blur-sm transform rotate-1 transition-all hover:rotate-0 hover:scale-[1.01]"
                >
                    {loading ? (
                        <div className="h-64 w-full md:w-[800px] flex items-center justify-center font-['Press_Start_2P'] text-zinc-500 animate-pulse">
                            CALCULATING CONTRIBUTIONS...
                        </div>
                    ) : (
                        <div className="flex gap-[2px] md:gap-[3px] overflow-x-auto max-w-full">
                            {/* Render Columns */}
                            {Array.from({ length: GRID_COLS }).map((_, colIndex) => (
                                <div key={colIndex} className="flex flex-col gap-[2px] md:gap-[3px]">
                                    {Array.from({ length: GRID_ROWS }).map((_, rowIndex) => {
                                        // Calculate linear index for data retrieval
                                        const dataIndex = colIndex * GRID_ROWS + rowIndex;
                                        const cellData = contributions[dataIndex] || { level: 0 };
                                        return (
                                            <div
                                                key={`${colIndex}-${rowIndex}`}
                                                className={`
                                                    w-2 h-2 md:w-3 md:h-3 rounded-[1px] transition-colors duration-200
                                                    ${getCellColor(cellData.level as number, colIndex, rowIndex)}
                                                `}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* OVERLAYS */}

                    {/* GAME OVER OVERLAY */}
                    {gameOver && (
                        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
                            <div className="bg-red-500 text-white p-6 -rotate-2 border-4 border-white shadow-[8px_8px_0px_0px_#fff] text-center">
                                <h3 className="font-['Press_Start_2P'] text-xl mb-4">MISSED!</h3>
                                <p className="font-handwriting text-2xl font-bold mb-4">Blocks Broken: {game.score}</p>
                                <button
                                    onClick={resetGame}
                                    className="bg-white text-red-500 py-2 px-4 font-['Press_Start_2P'] text-xs hover:bg-zinc-100"
                                >
                                    HIT SPACE TO REBOOT
                                </button>
                            </div>
                        </div>
                    )}

                    {/* SCORE DISPLAY */}
                    <div className="absolute top-4 right-4 md:right-8 font-['Press_Start_2P'] text-white text-xs md:text-sm bg-black/50 p-2 rounded border border-white/20">
                        SCORE: {game.score}
                    </div>

                </div>

                {/* PROFILE LINK (Thematic Rough Button) */}
                <motion.a
                    href="https://github.com/Lal-Jr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 group relative inline-block px-8 py-3 bg-zinc-900/50 backdrop-blur-md border-2 border-zinc-500 hover:border-white transition-colors rotate-1 hover:-rotate-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="font-['Press_Start_2P'] text-xs md:text-sm text-zinc-300 group-hover:text-white uppercase tracking-widest">
                        IT&apos;S REAL, CHECK IT OUT FOR YOURSELF
                    </span>

                    {/* Decor corners */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>

            </div>

        </section>
    );
}
