"use client";
import { useEffect, useRef, useState } from "react";

// Classic Breakout, with my contribution graph as the bricks (a brighter square = tougher brick).
// It plays itself as a demo ("attract mode", like an arcade cabinet). Click / tap to take over:
// move with the mouse, a finger, or the arrow keys.

const GRAPH_USER = "Lal-Jr"; // whose graph to use (just the data source)
const CONTRIBUTIONS_URL = `https://github-contributions-api.jogruber.de/v4/${GRAPH_USER}?y=last`;

const WEEKS = 34; // columns of the graph (~8 months, includes the busy stretch)
const ROWS = 7; // days of the week
const FIELD_ROWS = 18; // total playfield height, in squares
const CELL = 22;
const GAP = 3;
const PITCH = CELL + GAP;
const W = WEEKS * PITCH - GAP;
const H = FIELD_ROWS * PITCH - GAP;

const PADDLE_W = 150;
const PADDLE_H = 9;
const PADDLE_Y = H - 26;
const BALL = 9;
const SPEED = 400; // px per second
const STEP = 1 / 120; // fixed physics step, so the ball can't tunnel through bricks
const START_LIVES = 3;
const DAY = 86_400_000;

// remaining hits -> colour (0 = an empty square)
const COLORS = ["rgba(255,255,255,0.06)", "rgba(6,95,70,0.95)", "rgba(4,120,87,0.98)", "rgba(16,185,129,1)", "rgba(110,231,183,1)"];

type Mode = "attract" | "play" | "over" | "won";
type Source = { levels: Record<string, number>; today: string; live: boolean };

type Game = {
    mode: Mode;
    hp: Uint8Array; // remaining hits, column-major: index = col * ROWS + row
    base: Uint8Array; // starting hits, to rebuild the wall
    future: boolean[]; // squares after today: never bricks, never drawn
    remaining: number;
    ball: { x: number; y: number; vx: number; vy: number };
    paddleX: number;
    targetX: number; // where the player wants the paddle centred
    keys: { left: boolean; right: boolean };
    aiOffset: number; // demo paddle aims slightly off-centre so the ball angle varies
    t: number; // game clock, seconds
    serveAt: number; // 0 = ball in play; otherwise the time it launches
    restartAt: number; // demo only: when to rebuild a cleared wall
    score: number;
    lives: number;
};

// ---------- data ----------

const isoDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// The last WEEKS full weeks (Sun-Sat columns) ending with this week. Look each date up rather
// than trusting the API's array order or length.
function buildLevels(source: Source): { levels: number[]; future: boolean[] } {
    const total = WEEKS * ROWS;
    const [y, m, d] = source.today.split("-").map(Number);
    const todayMs = Date.UTC(y, m - 1, d);
    const endMs = todayMs + (6 - new Date(todayMs).getUTCDay()) * DAY;
    const startMs = endMs - (total - 1) * DAY;
    const levels: number[] = [];
    const future: boolean[] = [];
    for (let k = 0; k < total; k++) {
        const t = startMs + k * DAY;
        future.push(t > todayMs);
        levels.push(source.levels[new Date(t).toISOString().slice(0, 10)] ?? 0);
    }
    return { levels, future };
}

// Used if the graph can't be fetched (or is too empty to make a game): a fixed pseudo-random wall.
function sampleLevels(): number[] {
    let seed = 7;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    return Array.from({ length: WEEKS * ROWS }, () => {
        const r = rand();
        return r < 0.62 ? 0 : r < 0.8 ? 1 : r < 0.91 ? 2 : r < 0.97 ? 3 : 4;
    });
}

// ---------- game logic (plain functions on a mutable object; React only renders the HUD) ----------

function createGame(levels: number[], future: boolean[], mode: Mode): Game {
    const base = Uint8Array.from(levels.map((l, i) => (future[i] ? 0 : Math.max(0, Math.min(4, l)))));
    const g: Game = {
        mode,
        hp: Uint8Array.from(base),
        base,
        future,
        remaining: base.reduce((n, v) => n + (v > 0 ? 1 : 0), 0),
        ball: { x: 0, y: 0, vx: 0, vy: 0 },
        paddleX: (W - PADDLE_W) / 2,
        targetX: W / 2,
        keys: { left: false, right: false },
        aiOffset: 0,
        t: 0,
        serveAt: 0,
        restartAt: 0,
        score: 0,
        lives: START_LIVES,
    };
    serve(g);
    return g;
}

function serve(g: Game) {
    g.ball.vx = 0;
    g.ball.vy = 0;
    g.serveAt = g.t + 0.8;
}

function launch(g: Game) {
    const a = (Math.random() - 0.5) * 0.9; // radians off vertical
    g.ball.vx = SPEED * Math.sin(a);
    g.ball.vy = -SPEED * Math.cos(a);
    g.serveAt = 0;
}

// First brick overlapping the ball, or -1
function brickAt(g: Game, x: number, y: number): number {
    const c0 = Math.floor(x / PITCH);
    const c1 = Math.floor((x + BALL) / PITCH);
    const r0 = Math.floor(y / PITCH);
    const r1 = Math.floor((y + BALL) / PITCH);
    for (let c = Math.max(0, c0); c <= Math.min(WEEKS - 1, c1); c++) {
        for (let r = Math.max(0, r0); r <= Math.min(ROWS - 1, r1); r++) {
            const idx = c * ROWS + r;
            if (g.hp[idx] > 0 && x < c * PITCH + CELL && x + BALL > c * PITCH && y < r * PITCH + CELL && y + BALL > r * PITCH) return idx;
        }
    }
    return -1;
}

function hitBrick(g: Game, idx: number) {
    g.hp[idx] -= 1;
    g.score += 10;
    if (g.hp[idx] === 0) {
        g.remaining -= 1;
        if (g.remaining === 0) {
            if (g.mode === "play") g.mode = "won";
            else g.restartAt = g.t + 1.4;
        }
    }
}

function update(g: Game, dt: number) {
    g.t += dt;

    // paddle
    if (g.mode === "attract") {
        const target = g.ball.x + BALL / 2 - PADDLE_W / 2 + g.aiOffset;
        const step = Math.max(-650 * dt, Math.min(650 * dt, target - g.paddleX));
        g.paddleX += step;
    } else if (g.mode === "play") {
        const dir = (g.keys.right ? 1 : 0) - (g.keys.left ? 1 : 0);
        if (dir) {
            g.paddleX += dir * 650 * dt;
            g.targetX = g.paddleX + PADDLE_W / 2;
        } else {
            g.paddleX += (g.targetX - PADDLE_W / 2 - g.paddleX) * Math.min(1, dt * 30);
        }
    }
    g.paddleX = Math.max(0, Math.min(W - PADDLE_W, g.paddleX));
    if (g.mode === "over" || g.mode === "won") return;

    // demo: rebuild a cleared wall
    if (g.mode === "attract" && g.remaining === 0) {
        if (g.t >= g.restartAt) {
            g.hp = Uint8Array.from(g.base);
            g.remaining = g.base.reduce((n, v) => n + (v > 0 ? 1 : 0), 0);
            serve(g);
        }
        return;
    }

    const b = g.ball;

    // waiting to serve: ball rides the paddle
    if (g.serveAt) {
        b.x = g.paddleX + PADDLE_W / 2 - BALL / 2;
        b.y = PADDLE_Y - BALL;
        if (g.t >= g.serveAt) launch(g);
        return;
    }

    // horizontal move, then resolve (keeping the axes separate makes bounces predictable)
    b.x += b.vx * dt;
    if (b.x < 0) {
        b.x = 0;
        b.vx = Math.abs(b.vx);
    } else if (b.x + BALL > W) {
        b.x = W - BALL;
        b.vx = -Math.abs(b.vx);
    }
    let hit = brickAt(g, b.x, b.y);
    if (hit >= 0) {
        b.x -= b.vx * dt;
        b.vx = -b.vx;
        hitBrick(g, hit);
    }

    // vertical
    b.y += b.vy * dt;
    if (b.y < 0) {
        b.y = 0;
        b.vy = Math.abs(b.vy);
    }
    hit = brickAt(g, b.x, b.y);
    if (hit >= 0) {
        b.y -= b.vy * dt;
        b.vy = -b.vy;
        hitBrick(g, hit);
    }

    // paddle: where it lands decides the angle
    if (b.vy > 0 && b.y + BALL >= PADDLE_Y && b.y + BALL <= PADDLE_Y + PADDLE_H + 12 && b.x + BALL >= g.paddleX && b.x <= g.paddleX + PADDLE_W) {
        const offset = (b.x + BALL / 2 - (g.paddleX + PADDLE_W / 2)) / (PADDLE_W / 2); // -1..1
        const angle = Math.max(-1, Math.min(1, offset)) * 1.05; // up to ~60 degrees
        b.vx = SPEED * Math.sin(angle);
        b.vy = -SPEED * Math.cos(angle);
        b.y = PADDLE_Y - BALL;
        g.aiOffset = (Math.random() - 0.5) * PADDLE_W * 0.7;
    }

    // dropped it
    if (b.y > H) {
        if (g.mode === "play") {
            g.lives -= 1;
            if (g.lives <= 0) {
                g.mode = "over";
                return;
            }
        }
        serve(g);
    }
}

function draw(ctx: CanvasRenderingContext2D, g: Game) {
    ctx.clearRect(0, 0, W, H);
    for (let c = 0; c < WEEKS; c++) {
        for (let r = 0; r < ROWS; r++) {
            const idx = c * ROWS + r;
            if (g.future[idx]) continue;
            ctx.fillStyle = COLORS[g.hp[idx]];
            ctx.fillRect(c * PITCH, r * PITCH, CELL, CELL);
        }
    }
    ctx.fillStyle = "#22d3ee";
    ctx.fillRect(g.paddleX, PADDLE_Y, PADDLE_W, PADDLE_H);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(g.ball.x, g.ball.y, BALL, BALL);
}

// ---------- component ----------

export default function GraphBreakout() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameRef = useRef<Game | null>(null);
    const wallRef = useRef<{ levels: number[]; future: boolean[] } | null>(null);
    const startLoopRef = useRef<() => void>(() => {});

    const [source, setSource] = useState<Source | null>(null);
    const [mode, setMode] = useState<Mode>("attract");
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(START_LIVES);

    // Fetch the graph. If it fails, the demo still runs on a sample wall.
    useEffect(() => {
        let cancelled = false;
        const today = isoDate(new Date());
        fetch(CONTRIBUTIONS_URL)
            .then((r) => r.json())
            .then((data: { contributions?: { date: string; level: number }[] }) => {
                const levels: Record<string, number> = {};
                for (const day of data.contributions ?? []) levels[day.date] = day.level;
                if (!cancelled) setSource({ levels, today, live: true });
            })
            .catch(() => {
                if (!cancelled) setSource({ levels: {}, today, live: false });
            });
        return () => {
            cancelled = true;
        };
    }, []);

    // Set up the wall and run the loop (only while the game is on screen)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !source) return;

        let wall = buildLevels(source);
        if (wall.levels.filter((l, i) => l > 0 && !wall.future[i]).length < 15) {
            wall = { levels: sampleLevels(), future: wall.future }; // too empty to be a game
        }
        wallRef.current = wall;
        gameRef.current = createGame(wall.levels, wall.future, "attract");

        const dpr = Math.min(2, window.devicePixelRatio || 1);
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let raf = 0;
        let last = 0;
        let acc = 0;
        const shown = { score: -1, lives: -1, mode: "attract" as Mode };

        const frame = (now: number) => {
            const g = gameRef.current;
            if (!g) return;
            const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
            last = now;
            acc += dt;
            while (acc >= STEP) {
                update(g, STEP);
                acc -= STEP;
            }
            draw(ctx, g);
            // React only hears about changes to the HUD
            if (g.score !== shown.score) setScore((shown.score = g.score));
            if (g.lives !== shown.lives) setLives((shown.lives = g.lives));
            if (g.mode !== shown.mode) setMode((shown.mode = g.mode));
            raf = requestAnimationFrame(frame);
        };
        const run = () => {
            if (raf || (reduceMotion && gameRef.current?.mode === "attract")) return;
            last = 0;
            raf = requestAnimationFrame(frame);
        };
        const stop = () => {
            cancelAnimationFrame(raf);
            raf = 0;
        };
        startLoopRef.current = run;

        draw(ctx, gameRef.current);
        const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? run() : stop()), { threshold: 0.15 });
        observer.observe(canvas);
        return () => {
            observer.disconnect();
            stop();
        };
    }, [source]);

    const startGame = () => {
        const wall = wallRef.current;
        if (!wall) return;
        gameRef.current = createGame(wall.levels, wall.future, "play");
        setScore(0);
        setLives(START_LIVES);
        setMode("play");
        startLoopRef.current();
        canvasRef.current?.focus({ preventScroll: true });
    };

    const toGameX = (e: React.PointerEvent) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        return ((e.clientX - rect.left) / rect.width) * W;
    };

    const onPointerMove = (e: React.PointerEvent) => {
        const g = gameRef.current;
        if (g && g.mode === "play") g.targetX = toGameX(e);
    };

    const onPointerDown = (e: React.PointerEvent) => {
        const g = gameRef.current;
        if (!g) return;
        if (g.mode === "attract") startGame();
        if (gameRef.current?.mode === "play") gameRef.current.targetX = toGameX(e);
    };

    const onKey = (down: boolean) => (e: React.KeyboardEvent) => {
        const g = gameRef.current;
        if (!g) return;
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            if (g.mode === "attract" && down) startGame();
            const cur = gameRef.current;
            if (cur?.mode === "play") cur.keys[e.key === "ArrowLeft" ? "left" : "right"] = down;
        } else if (down && (e.key === " " || e.key === "Enter") && g.mode === "attract") {
            e.preventDefault();
            startGame();
        }
    };

    const ended = mode === "over" || mode === "won";

    return (
        <section className="relative z-10 flex w-full flex-col items-center px-4 py-12 sm:px-6" aria-labelledby="breakout-title">
            <div className="mb-8 text-center">
                <p className="font-pixel text-[10px] tracking-widest text-emerald-400">INSERT COIN</p>
                <h3 id="breakout-title" className="mt-4 font-handwriting text-4xl font-bold text-white md:text-5xl">
                    Take a break, play a round
                </h3>
                <p className="mt-2 font-handwriting text-2xl text-zinc-400">
                    My contribution graph, turned into bricks. Move with ← → or drag.
                </p>
            </div>

            {/* Arcade cabinet */}
            <div className="relative w-full max-w-[900px] -rotate-1 rounded-xl border-4 border-black bg-zinc-950 p-3 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-transform hover:rotate-0 md:p-6 md:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]">
                <div className="mb-3 flex items-center justify-between font-pixel text-[9px] text-white md:text-xs">
                    <span>
                        SCORE <span className="text-emerald-300">{mode === "attract" ? "---" : score}</span>
                    </span>
                    <span className="text-zinc-500">{mode === "attract" ? "DEMO" : ""}</span>
                    <span className="flex items-center gap-1.5">
                        LIVES
                        {Array.from({ length: START_LIVES }, (_, i) => (
                            <span key={i} className={`h-2.5 w-2.5 ${mode !== "attract" && i < lives ? "bg-red-500" : "bg-zinc-800"}`} />
                        ))}
                    </span>
                </div>

                <div className="relative overflow-hidden rounded-md">
                    {source === null && (
                        <div className="flex aspect-[847/447] w-full items-center justify-center font-pixel text-[10px] text-zinc-500 animate-pulse md:text-xs">
                            CALCULATING CONTRIBUTIONS...
                        </div>
                    )}
                    <canvas
                        ref={canvasRef}
                        tabIndex={0}
                        aria-label="Breakout game played on my contribution graph. Click to play; use the left and right arrow keys or drag to move."
                        onPointerMove={onPointerMove}
                        onPointerDown={onPointerDown}
                        onKeyDown={onKey(true)}
                        onKeyUp={onKey(false)}
                        className={`w-full touch-none select-none outline-none [image-rendering:pixelated] ${source ? "cursor-crosshair" : "hidden"}`}
                        style={{ aspectRatio: `${W} / ${H}` }}
                    />

                    {mode === "attract" && source && (
                        <p className="pointer-events-none absolute bottom-3 left-0 right-0 animate-pulse text-center font-pixel text-[9px] text-white md:text-xs">
                            CLICK OR TAP TO PLAY
                        </p>
                    )}

                    {ended && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 px-4 text-center">
                            <h4 className="font-pixel text-base text-white md:text-xl">{mode === "won" ? "YOU WIN!" : "GAME OVER"}</h4>
                            <p className="mt-2 font-handwriting text-2xl text-emerald-300 md:text-3xl">Score: {score}</p>
                            <button
                                type="button"
                                onClick={startGame}
                                className="mt-4 border-4 border-black bg-emerald-400 px-5 py-2.5 font-pixel text-xs text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.35)] transition hover:bg-emerald-300 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                            >
                                PLAY AGAIN
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <p className="mt-8 text-center font-handwriting text-2xl text-zinc-300 md:text-3xl">
                Those bricks are my real contributions.{" "}
                <a
                    href={`https://github.com/${GRAPH_USER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-emerald-300 underline decoration-emerald-300/40 decoration-2 underline-offset-4 transition-colors hover:decoration-emerald-300"
                >
                    See the real work on GitHub
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </a>
            </p>
        </section>
    );
}
