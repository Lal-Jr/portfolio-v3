"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Retro Pixel Burst Component
const PixelBurst = ({ x, y, color }: { x: number; y: number; color: string }) => {
    const particles = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        angle: (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.5,
        velocity: 50 + Math.random() * 50,
        size: Math.random() * 8 + 4,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-[500]">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 1, scale: 1, x, y }}
                    animate={{
                        opacity: 0,
                        scale: 0,
                        x: x + Math.cos(p.angle) * p.velocity,
                        y: y + Math.sin(p.angle) * p.velocity
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute bg-white"
                    style={{
                        width: p.size,
                        height: p.size,
                        backgroundColor: color,
                        left: -p.size / 2,
                        top: -p.size / 2,
                        boxShadow: `0 0 12px ${color}, 0 0 4px white`
                    }}
                />
            ))}
        </div>
    );
};

export default function GlobalBackground({ children }: { children: React.ReactNode }) {
    const [drops, setDrops] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

    const handleClick = useCallback((e: React.MouseEvent) => {
        const colors = ["#00f3ff", "#ff00ea", "#00ff41", "#ffae00", "#ffffff"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const newBurst = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
            color: color
        };

        setDrops((prev) => [...prev, newBurst]);

        // Clean up old burst
        setTimeout(() => {
            setDrops((prev) => prev.filter(d => d.id !== newBurst.id));
        }, 800);
    }, []);

    return (
        <div
            onClick={handleClick}
            onMouseDown={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            className="relative min-h-screen w-full bg-[#050505] text-white select-none touch-none"
            style={{
                cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='image-rendering:pixelated'><path d='M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z'/><path d='M13 13l6 6'/></svg>") 3 3, auto`
            }}
        >
            <AnimatePresence>
                {drops.map((burst) => (
                    <PixelBurst key={burst.id} x={burst.x} y={burst.y} color={burst.color} />
                ))}
            </AnimatePresence>

            {/* Global Grid Background */}
            <div
                className="fixed inset-0 opacity-20 pointer-events-none z-0"
                style={{
                    backgroundImage:
                        "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
