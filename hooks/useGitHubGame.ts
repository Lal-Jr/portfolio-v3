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

    // Active Target - Memoized to prevent frequent effect re-runs if it's an object literal
    const food = useMemo(() => targets[currentTargetIndex] || { x: -1, y: -1 }, [targets, currentTargetIndex]);

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

    const resetGame = () => {
        setSnake([{ x: 10, y: 3 }]);
        setScore(0);
        setGameOver(false);
        setDirection({ x: 1, y: 0 });
        setIsPlaying(true);
        setIsAutoPlaying(false);
        setCurrentTargetIndex(0);
    };

    // Game Loop
    useEffect(() => {
        if (gameOver) return;
        if (!isPlaying && !isAutoPlaying) return;

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
    }, [isPlaying, isAutoPlaying, gameOver, direction, food, targets]);

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

    return {
        snake,
        contributions,
        food,
        score,
        gameOver,
        loading,
        isAutoPlaying,
        isPlaying,

        GRID_ROWS,
        GRID_COLS,
        resetGame
    };
};
