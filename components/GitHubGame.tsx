"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComicScribble from "@/components/ui/ComicScribble";

// Game Constants
const GRID_ROWS = 7; // Days in a week
const GRID_COLS = 52; // Weeks in a year
const CELL_SIZE = 12; // Base size for calculation, but we'll use responsive CSS
const SPEED = 100;

type Point = { x: number; y: number };
type ContributionLevel = 0 | 1 | 2 | 3 | 4;

interface ContributionDay {
    date: string;
    count: number;
    level: ContributionLevel;
    x: number;
    y: number;
}

export default function GitHubGame() {
    // Game State
    const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 3 }]);
    const [direction, setDirection] = useState<Point>({ x: 1, y: 0 }); // Moving right
    const [isPlaying, setIsPlaying] = useState(false); // User controlling?
    const [isAutoPlaying, setIsAutoPlaying] = useState(true); // AI controlling?
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // Data State
    const [contributions, setContributions] = useState<ContributionDay[]>([]);
    const [targets, setTargets] = useState<Point[]>([]); // Queue of targets to eat
    const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // Fetch GitHub Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://github-contributions-api.jogruber.de/v4/Lal-Jr");
                const data = await res.json();

                const allContribs = data.contributions || [];
                const lastYear = allContribs.slice(-364); // Get last ~year

                while (lastYear.length < 364) {
                    lastYear.unshift({ date: "", count: 0, level: 0 });
                }

                // augment with coordinates
                const mappedContribs = lastYear.map((day: any, index: number) => ({
                    ...day,
                    x: Math.floor(index / 7),
                    y: index % 7
                }));

                setContributions(mappedContribs);

                // Create Target Queue: Filter > 0, Sort by Level ASC, then Date ASC
                const itemsToEat = mappedContribs.filter((d: ContributionDay) => d.level > 0);
                itemsToEat.sort((a: ContributionDay, b: ContributionDay) => {
                    if (a.level !== b.level) return a.level - b.level; // Level Asc
                    return 0; // Keep date order implicit or add date compare if needed
                });

                setTargets(itemsToEat.map((d: ContributionDay) => ({ x: d.x, y: d.y })));

            } catch (error) {
                console.error("Failed to fetch GitHub data", error);
                setContributions(Array(364).fill({ date: "", count: 0, level: 0, x: 0, y: 0 }));
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Active Target
    const food = targets[currentTargetIndex] || { x: -1, y: -1 }; // Hide if finished

    // AI MOVE LOGIC (Weighted "Wander" + Greedy)
    const getNextAutoMove = (currentSnake: Point[], currentHead: Point, currentFood: Point, currentDir: Point): Point => {
        const moves = [
            { x: 0, y: -1 }, // Up
            { x: 0, y: 1 },  // Down
            { x: -1, y: 0 }, // Left
            { x: 1, y: 0 }   // Right
        ];

        // 1. Filter Safe Moves
        const validMoves = moves.filter(move => {
            const nextX = currentHead.x + move.x;
            const nextY = currentHead.y + move.y;

            // Check Wall
            if (nextX < 0 || nextX >= GRID_COLS || nextY < 0 || nextY >= GRID_ROWS) return false;

            // Check Self
            if (currentSnake.some(s => s.x === nextX && s.y === nextY)) return false;

            // Don't reverse
            if (move.x === -currentDir.x && move.y === -currentDir.y && currentSnake.length > 1) return false;

            return true;
        });

        if (validMoves.length === 0) return currentDir; // Die or stall

        // 2. Score Moves
        // Priority: Safety > Momentum > Target (if close) > Exploration

        let bestMove = validMoves[0];
        let maxScore = -Infinity;

        // Is food valid?
        const hasFood = currentFood.x !== -1;

        validMoves.forEach(move => {
            let score = 0;
            const nextX = currentHead.x + move.x;
            const nextY = currentHead.y + move.y;

            // A. Momentum Bonus (Keep going straight is visually smoother)
            if (move.x === currentDir.x && move.y === currentDir.y) {
                score += 5;
            }

            // B. Target Attraction (but don't be obsessive)
            if (hasFood) {
                const currentDist = Math.abs(currentHead.x - currentFood.x) + Math.abs(currentHead.y - currentFood.y);
                const nextDist = Math.abs(nextX - currentFood.x) + Math.abs(nextY - currentFood.y);

                if (nextDist < currentDist) {
                    score += 8; // Move towards food
                } else {
                    score -= 2; // Move away
                }
            } else {
                score += Math.random() * 5; // Wander
            }

            score += Math.random() * 2; // Random noise

            if (score > maxScore) {
                maxScore = score;
                bestMove = move;
            }
        });

        return bestMove;
    };

    // Game Loop
    useEffect(() => {
        if (gameOver) return;
        if (!isPlaying && !isAutoPlaying) return;

        // Slower interval for Autoplay
        const currentSpeed = (isAutoPlaying && !isPlaying) ? SPEED * 1.5 : SPEED;

        const interval = setInterval(() => {
            setSnake((prevSnake) => {
                const head = prevSnake[0];
                let moveDir = direction;

                // Adjust AI direction
                if (isAutoPlaying && !isPlaying) {
                    // Pass current direction for momentum logic
                    moveDir = getNextAutoMove(prevSnake, head, food, direction);
                    setDirection(moveDir);
                }

                const newHead = { x: head.x + moveDir.x, y: head.y + moveDir.y };

                // Collision
                if (
                    newHead.x < 0 ||
                    newHead.x >= GRID_COLS ||
                    newHead.y < 0 ||
                    newHead.y >= GRID_ROWS ||
                    prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
                ) {
                    if (isAutoPlaying) {
                        setScore(0); // Reset score on auto-crash
                        return [{ x: 10, y: 3 }]; // Respawn AI
                    }
                    setGameOver(true);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                // Check Food (Target)
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore((s) => s + 1);
                    // Advance Target
                    setCurrentTargetIndex(i => (i + 1) % targets.length);
                    // Grow snake? Maybe limited growth for visual clarity
                    // if (score % 5 !== 0) newSnake.pop(); // Grow every 5?
                    // Standard growth
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, SPEED);

        return () => clearInterval(interval);
    }, [isPlaying, isAutoPlaying, gameOver, direction, food, targets]); // removed generateFood dep

    // Keyboard Controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }

            // User takes control!
            if (isAutoPlaying && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                setIsAutoPlaying(false);
                setIsPlaying(true);
                setScore(0);
                setSnake([{ x: 10, y: 3 }]);
                return;
            }

            if (isPlaying && !gameOver) {
                switch (e.key) {
                    case "ArrowUp": if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
                    case "ArrowDown": if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
                    case "ArrowLeft": if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
                    case "ArrowRight": if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
                }
            }

            if (gameOver && e.code === "Space") {
                resetGame();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [direction, isPlaying, isAutoPlaying, gameOver]);

    const resetGame = () => {
        setSnake([{ x: 10, y: 3 }]);
        setScore(0);
        setGameOver(false);
        setDirection({ x: 1, y: 0 });
        setIsPlaying(true);
        setIsAutoPlaying(false);
        setCurrentTargetIndex(0);
    };

    // Helper to get color based on contribution level
    const getCellColor = (level: number, isSnake: boolean, isFood: boolean) => {
        if (isSnake) return "bg-white/60 backdrop-invert"; // Translucent snake
        if (isFood) return "bg-yellow-400 animate-pulse ring-2 ring-yellow-200"; // Highlight target

        // GitHub Contribution Colors (Dark Modeish)
        // Level 0: bg-zinc-900 (empty)
        // Level 1: bg-emerald-900
        // Level 2: bg-emerald-700
        // Level 3: bg-emerald-500
        // Level 4: bg-emerald-300

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
                                    <span className="border border-zinc-700 px-2 rounded">TAKE THE WHEEL? PRESS ARROWS</span>
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

                                        // Check Game Objects
                                        const isSnake = snake.some(s => s.x === colIndex && s.y === rowIndex);
                                        const isFood = food.x === colIndex && food.y === rowIndex;

                                        return (
                                            <div
                                                key={`${colIndex}-${rowIndex}`}
                                                className={`
                                                    w-2 h-2 md:w-3 md:h-3 rounded-[1px] transition-colors duration-200
                                                    ${getCellColor(cellData.level as number, isSnake, isFood)}
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
                                <h3 className="font-['Press_Start_2P'] text-xl mb-4">CRASHED!</h3>
                                <p className="font-handwriting text-2xl font-bold mb-4">Commits Eaten: {score}</p>
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
                        COMMITS: {score}
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
                        IT'S REAL, CHECK IT OUT FOR YOURSELF
                    </span>

                    {/* Decor corners */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>

            </div>

        </section>
    );
}
