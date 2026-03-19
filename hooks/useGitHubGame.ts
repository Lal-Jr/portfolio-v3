import { useState, useEffect, useMemo } from "react";

// Game Constants
const GRID_ROWS = 7; // Days in a week
const GRID_COLS = 52; // Weeks in a year
const SPEED = 100;

type Point = { x: number; y: number };
type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
    date: string;
    count: number;
    level: ContributionLevel;
    x: number;
    y: number;
}

export const useGitHubGame = () => {
    // Game State (Breakout)
    const PADDLE_WIDTH = 6;
    const [game, setGame] = useState({
        ball: { x: 26, y: 3 },
        ballDir: { dx: 1, dy: -1 },
        paddleX: 23,
        brokenBlocks: [] as string[],
        score: 0
    });

    const [isPlaying, setIsPlaying] = useState(false); // User controlling?
    const [isAutoPlaying, setIsAutoPlaying] = useState(true); // AI controlling?
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
                // Add timestamp to auto-update daily and bypass cache
                const timestamp = new Date().toISOString().split('T')[0];
                const res = await fetch(`https://github-contributions-api.jogruber.de/v4/Lal-Jr?t=${timestamp}`, {
                    cache: "no-store"
                });
                const data = await res.json();

                const allContribs = data.contributions || [];
                const lastYear = allContribs.slice(-364); // Get last ~year

                while (lastYear.length < 364) {
                    lastYear.unshift({ date: "", count: 0, level: 0 });
                }

                // augment with coordinates
                const mappedContribs = lastYear.map((day: { date: string; count: number; level: number }, index: number) => ({
                    ...day,
                    level: day.level as ContributionLevel,
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

    const resetGame = () => {
        setGame({
            ball: { x: 26, y: 3 },
            ballDir: { dx: 1, dy: -1 },
            paddleX: 23,
            brokenBlocks: [],
            score: 0
        });
        setGameOver(false);
        setIsPlaying(true);
        setIsAutoPlaying(false);
    };

    // Game Loop
    useEffect(() => {
        if (gameOver) return;
        if (!isPlaying && !isAutoPlaying) return;

        const interval = setInterval(() => {
            setGame(prev => {
                let { ball, ballDir, paddleX, brokenBlocks, score } = prev;
                let newDx = ballDir.dx;
                let newDy = ballDir.dy;
                let nextX = ball.x + newDx;
                let nextY = ball.y + newDy;

                // Wall Bounds X
                if (nextX < 0 || nextX >= GRID_COLS) {
                    newDx = -newDx;
                    nextX = ball.x + newDx;
                }

                // Wall Bounds Y (Top)
                if (nextY < 0) {
                    newDy = -newDy;
                    nextY = ball.y + newDy;
                }

                // AI Paddle logic
                let nextPaddleX = paddleX;
                if (isAutoPlaying) {
                    const paddleCenter = paddleX + Math.floor(PADDLE_WIDTH / 2);
                    // Match paddle to ball X
                    if (paddleCenter < ball.x && paddleX + PADDLE_WIDTH < GRID_COLS) {
                        nextPaddleX += 1;
                    } else if (paddleCenter > ball.x && paddleX > 0) {
                        nextPaddleX -= 1;
                    }
                }

                // Paddle Collision (Bottom)
                if (nextY === GRID_ROWS - 1) {
                    if (nextX >= nextPaddleX - 1 && nextX <= nextPaddleX + PADDLE_WIDTH) {
                        newDy = -1; // Bounce up!
                        nextY = ball.y + newDy;
                        // Slight angle adjustment based on hit location
                        if (nextX <= nextPaddleX + 1) newDx = -1;
                        if (nextX >= nextPaddleX + PADDLE_WIDTH - 2) newDx = 1;
                    }
                }

                // Drop Out of Bounds
                if (nextY >= GRID_ROWS) {
                    if (!isAutoPlaying) {
                        setGameOver(true);
                        return prev; // Freezes state
                    } else {
                        // AI Respawn
                        return {
                            ball: { x: 26, y: 3 },
                            ballDir: { dx: 1, dy: -1 },
                            paddleX: 23,
                            brokenBlocks: [],
                            score: 0
                        };
                    }
                }

                // Brick (Contribution) Collision
                const blockKey = `${nextX},${nextY}`;
                if (nextY < GRID_ROWS - 1 && !brokenBlocks.includes(blockKey)) {
                    const dataIndex = nextX * GRID_ROWS + nextY;
                    const cellData = contributions[dataIndex];
                    if (cellData && cellData.level > 0) {
                        // Break the block!
                        brokenBlocks = [...brokenBlocks, blockKey];
                        score += 1;
                        newDy = -newDy; // simple bounce
                        nextY = ball.y + newDy;
                    }
                }

                return {
                    ball: { x: nextX, y: nextY },
                    ballDir: { dx: newDx, dy: newDy },
                    paddleX: nextPaddleX,
                    brokenBlocks,
                    score
                };
            });
        }, SPEED);

        return () => clearInterval(interval);
    }, [isPlaying, isAutoPlaying, gameOver, contributions]);

    // Keyboard Controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault(); // prevent scrolling
            }

            // User takes control!
            if (isAutoPlaying && ["ArrowLeft", "ArrowRight"].includes(e.key)) {
                setIsAutoPlaying(false);
                setIsPlaying(true);
                setGame(g => ({ ...g, score: 0, brokenBlocks: [], ball: { x: 26, y: 3 }, ballDir: { dx: 1, dy: -1 } }));
            }

            if (isPlaying && !gameOver) {
                if (e.key === "ArrowLeft") {
                    setGame(g => ({ ...g, paddleX: Math.max(0, g.paddleX - 2) }));
                } else if (e.key === "ArrowRight") {
                    setGame(g => ({ ...g, paddleX: Math.min(GRID_COLS - PADDLE_WIDTH, g.paddleX + 2) }));
                }
            }

            if (gameOver && e.code === "Space") {
                e.preventDefault();
                resetGame();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isPlaying, isAutoPlaying, gameOver]);

    return {
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
    };
};
