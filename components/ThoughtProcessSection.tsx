"use client";
import React, { useState, useRef } from "react";
import { Type } from "lucide-react";
import HighlighterSpan from "@/components/ui/HighlighterSpan";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

// --- WIDGETS ---

const ChatBubbleWidget = () => {
    const [variant, setVariant] = useState<"Left" | "Right">("Left");

    return (
        <div className="relative bg-white rounded-xl shadow-lg border border-zinc-200 w-[280px] select-none transform transition-transform hover:scale-105 duration-300">
            {/* Header / Controls */}
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2 mb-3">
                <span className="text-xs font-semibold text-zinc-500">Chat bubble</span>
                <span className="text-[10px] text-zinc-300">Component</span>
            </div>

            {/* Controls */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Variant</span>
                    <div className="bg-zinc-100 rounded-md p-1 flex text-[10px]">
                        <button
                            onClick={() => setVariant("Left")}
                            className={`px-2 py-0.5 rounded ${variant === "Left" ? "bg-white shadow-sm text-zinc-800" : "text-zinc-400"}`}
                        >
                            Left
                        </button>
                        <button
                            onClick={() => setVariant("Right")}
                            className={`px-2 py-0.5 rounded ${variant === "Right" ? "bg-white shadow-sm text-zinc-800" : "text-zinc-400"}`}
                        >
                            Right
                        </button>
                    </div>
                </div>

                {/* Simulated Input */}
                <div className="bg-zinc-50 p-2 rounded border border-zinc-100">
                    <div className={`bg-blue-500 text-white text-xs px-3 py-2 rounded-2xl rounded-tl-sm w-fit max-w-full ${variant === "Right" ? "ml-auto rounded-tr-sm rounded-tl-2xl bg-zinc-800" : ""}`}>
                        But, the real story comes from 🤣
                    </div>
                </div>

                <div className="space-y-2 pt-1">
                    <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full w-[40%] bg-blue-500/20" />
                    </div>
                    <div className="h-8 w-full bg-blue-50 rounded text-center flex items-center justify-center text-blue-500 text-xs font-medium cursor-pointer hover:bg-blue-100 transition-colors">
                        Edit Component
                    </div>
                </div>
            </div>

            {/* Selection indicators */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 border border-white" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 border border-white" />
            <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none rounded-xl opacity-0 hover:opacity-100 transition-opacity" />

            {/* Floating Label */}
            <div className="absolute top-8 -right-12 z-10 hidden md:block">
                <div className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-md transform rotate-12">
                    Inputs
                </div>
                <div className="absolute top-1/2 -left-1 w-2 h-2 bg-blue-500 transform rotate-45 -translate-y-1/2" />
            </div>
        </div>
    );
};

const SpacingWidget = () => {
    return (
        <div className="relative bg-white/40 backdrop-blur-sm p-4 rounded-xl border border-pink-200/50 transform hover:-rotate-2 transition-transform duration-300">
            <div className="flex items-end gap-2 h-16">
                {/* Pink bars */}
                <div className="w-16 h-8 bg-pink-400/20 border border-pink-400/50 relative group">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[10px] px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">40</span>
                </div>
                <div className="flex-1 flex flex-col gap-1 justify-end">
                    <div className="h-4 w-full bg-pink-500/10 border-b border-pink-500/30"></div>
                    <div className="h-4 w-4/5 bg-pink-500/10 border-b border-pink-500/30"></div>
                </div>
                <div className="w-8 h-12 bg-pink-400/20 border border-pink-400/50 relative group">
                    <span className="absolute -right-6 top-1/2 -translate-y-1/2 bg-pink-500 text-white text-[10px] px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">24</span>
                </div>
            </div>

            {/* Floating Label */}
            <div className="absolute -bottom-3 left-8 z-10">
                <div className="bg-fuchsia-500 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-md">
                    Spacing
                </div>
            </div>
        </div>
    );
};

const TypographyWidget = () => {
    return (
        <div className="relative bg-white rounded-lg shadow-sm border border-orange-200 p-4 w-[240px] transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="flex justify-between items-center mb-4 border-b border-orange-100 pb-2">
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-orange-300" />
                    <div className="w-2 h-2 rounded-full bg-orange-200" />
                </div>
                <Type size={14} className="text-orange-400" />
            </div>

            <div className="space-y-3 font-sans">
                <div className="flex justify-between items-baseline group cursor-default">
                    <span className="text-xs font-bold text-zinc-800">H1 Hero big</span>
                    <span className="text-[10px] text-zinc-400 font-mono group-hover:text-orange-500">64px / 1.0</span>
                </div>
                <div className="flex justify-between items-baseline group cursor-default">
                    <span className="text-xs font-semibold text-zinc-700">H2 Project titles</span>
                    <span className="text-[10px] text-zinc-400 font-mono group-hover:text-orange-500">40px / 1.0</span>
                </div>
                <div className="flex justify-between items-baseline group cursor-default">
                    <span className="text-xs text-zinc-600">P Body copy</span>
                    <span className="text-[10px] text-zinc-400 font-mono group-hover:text-orange-500">16px / 1.6</span>
                </div>
            </div>

            {/* Highlight box */}
            <div className="absolute inset-0 border-2 border-orange-500/0 hover:border-orange-500/100 pointer-events-none rounded-lg transition-colors duration-200">
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-orange-500 opacity-0 group-hover:opacity-100" />
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-orange-500 opacity-0 group-hover:opacity-100" />
            </div>

            {/* Floating Label */}
            <div className="absolute -bottom-4 right-4 z-10">
                <div className="bg-orange-500 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-md transform -rotate-2">
                    Typography
                </div>
            </div>
        </div>
    );
}

const ColorPaletteWidget = () => {
    return (
        <div className="relative bg-white rounded-lg shadow-sm border border-indigo-200 p-3 w-[180px] h-[180px] rotate-6 hover:rotate-0 transition-transform duration-300 flex flex-col gap-2">

            {/* Header */}
            <div className="flex justify-between items-center border-b border-indigo-100 pb-2">
                <span className="text-xs font-bold text-zinc-600">Palette.json</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                </div>
            </div>

            {/* Colors Grid */}
            <div className="grid grid-cols-2 gap-2 flex-1">
                <div className="bg-indigo-500 rounded-md relative group overflow-hidden">
                    <span className="absolute bottom-1 left-1 text-[8px] text-white/80 font-mono opacity-0 group-hover:opacity-100">#6366f1</span>
                </div>
                <div className="bg-rose-400 rounded-md relative group overflow-hidden">
                    <span className="absolute bottom-1 left-1 text-[8px] text-white/80 font-mono opacity-0 group-hover:opacity-100">#fb7185</span>
                </div>
                <div className="bg-emerald-400 rounded-md relative group overflow-hidden">
                    <span className="absolute bottom-1 left-1 text-[8px] text-white/80 font-mono opacity-0 group-hover:opacity-100">#34d399</span>
                </div>
                <div className="bg-amber-400 rounded-md relative group overflow-hidden">
                    <span className="absolute bottom-1 left-1 text-[8px] text-white/80 font-mono opacity-0 group-hover:opacity-100">#fbbf24</span>
                </div>
            </div>

            {/* Floating Label */}
            <div className="absolute -top-2 -left-4 z-10">
                <div className="bg-indigo-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-md transform -rotate-12">
                    Colors
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

const ThoughtProcessSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isMobile = useIsMobile(1024); // using lg breakpoint to be safe

    // Track scroll progress through this section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Transform values based on scroll progress
    const widgetScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
    const widgetOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);

    const textScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

    // Individual widget animations with stagger effect
    const topWidgetYDesktop = useTransform(scrollYProgress, [0, 0.3, 0.7], [-100, 0, 0]);
    const rightWidgetXDesktop = useTransform(scrollYProgress, [0, 0.35, 0.7], [100, 0, 0]);
    const bottomWidgetYDesktop = useTransform(scrollYProgress, [0, 0.4, 0.7], [100, 0, 0]);
    const leftWidgetXDesktop = useTransform(scrollYProgress, [0, 0.45, 0.7], [-100, 0, 0]);

    // Use a flat transform for mobile or desktop dynamic
    const topWidgetY = isMobile ? 0 : topWidgetYDesktop;
    const rightWidgetX = isMobile ? 0 : rightWidgetXDesktop;
    const bottomWidgetY = isMobile ? 0 : bottomWidgetYDesktop;
    const leftWidgetX = isMobile ? 0 : leftWidgetXDesktop;

    // SVG path animations
    const pathLength = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
    const diamondPathLength = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

    return (
        <section ref={sectionRef} className="relative w-full flex flex-col items-center justify-center pt-32 pb-32 overflow-visible z-20">

            {/* ================= THOUGHT PROCESS (DIAMOND LAYOUT) ================= */}
            <div className="relative w-full max-w-6xl min-h-[800px] flex items-center justify-center mb-0">

                {/* CENTER: The Philosophy Text (The Core) */}
                <motion.div
                    className="absolute z-30 text-center max-w-2xl px-4 pointer-events-none"
                    style={{ scale: textScale, opacity: textOpacity }}
                >
                    {/* Intro text about thought process */}
                    <p className="text-xl md:text-2xl font-['var(--font-caveat)'] text-zinc-500 mb-4 italic">
                        Here&apos;s how I think, how I work...
                    </p>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.9] mb-6 drop-shadow-2xl">
                        I THINK IN <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">SYSTEMS.</span>
                    </h2>
                    <div className="text-base sm:text-lg md:text-xl text-zinc-400 font-medium leading-relaxed max-w-sm mx-auto">
                        Not just screens. <br />
                        <HighlighterSpan delay={0.2} rotation={-1} color="bg-indigo-500/30">
                            Scalable patterns.
                        </HighlighterSpan>{" "}
                        <HighlighterSpan delay={0.4} rotation={1} color="bg-rose-500/30">
                            Edge cases.
                        </HighlighterSpan>{" "}
                        <br />
                        Built for the long haul.
                    </div>

                    {/* Connector Lines (SVG) from Center to Widgets */}
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20" viewBox="0 0 800 800">
                        {/* Lines radiating out with scroll-based animation */}
                        <motion.path
                            d="M400,400 L400,100"
                            stroke="white"
                            strokeWidth="2"
                            strokeDasharray="10,5"
                            style={{ pathLength }}
                        />
                        <motion.path
                            d="M400,400 L700,400"
                            stroke="white"
                            strokeWidth="2"
                            strokeDasharray="10,5"
                            style={{ pathLength }}
                        />
                        <motion.path
                            d="M400,400 L400,700"
                            stroke="white"
                            strokeWidth="2"
                            strokeDasharray="10,5"
                            style={{ pathLength }}
                        />
                        <motion.path
                            d="M400,400 L100,400"
                            stroke="white"
                            strokeWidth="2"
                            strokeDasharray="10,5"
                            style={{ pathLength }}
                        />

                        {/* Diamond Outline with scroll-based animation */}
                        <motion.path
                            d="M400,100 L700,400 L400,700 L100,400 Z"
                            stroke="white"
                            strokeWidth="1"
                            strokeOpacity="0.5"
                            fill="none"
                            style={{ pathLength: diamondPathLength }}
                        />
                    </svg>
                </motion.div>

                {/* ORBITING WIDGETS (Diamond Points) - Adjusted for mobile */}

                {/* TOP: Spacing (Structure) */}
                <motion.div
                    className="absolute top-0 md:top-10 left-1/2 -translate-x-1/2 lg:-translate-y-1/2 z-20 hover:z-40 transition-all duration-300 scale-75 md:scale-100"
                    style={{ scale: widgetScale, opacity: widgetOpacity, y: topWidgetY }}
                >
                    <SpacingWidget />
                </motion.div>

                {/* RIGHT: Typography (Style) */}
                <motion.div
                    className="absolute top-1/4 lg:top-1/2 right-4 md:right-20 lg:-translate-y-1/2 z-20 hover:z-40 transition-all duration-300 scale-75 md:scale-100"
                    style={{ scale: widgetScale, opacity: widgetOpacity, x: rightWidgetX }}
                >
                    <TypographyWidget />
                </motion.div>

                {/* BOTTOM: Chat Bubble (Component/Func) */}
                <motion.div
                    className="absolute bottom-20 md:bottom-20 left-1/2 -translate-x-1/2 lg:translate-y-1/2 z-20 hover:z-40 transition-all duration-300 scale-75 md:scale-100"
                    style={{ scale: widgetScale, opacity: widgetOpacity, y: bottomWidgetY }}
                >
                    <ChatBubbleWidget />
                </motion.div>

                {/* LEFT: Color Palette (Theme) */}
                <motion.div
                    className="absolute top-3/4 lg:top-1/2 left-4 md:left-20 lg:-translate-y-1/2 z-20 hover:z-40 transition-all duration-300 scale-75 md:scale-100"
                    style={{ scale: widgetScale, opacity: widgetOpacity, x: leftWidgetX }}
                >
                    <ColorPaletteWidget />
                </motion.div>

            </div>

        </section>
    );
};

export default ThoughtProcessSection;
