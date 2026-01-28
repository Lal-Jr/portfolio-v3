"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Copy, Plus, Minus, MoveHorizontal, Type, MousePointer2 } from "lucide-react";
import HighlighterSpan from "@/components/ui/HighlighterSpan";
import HandDrawnArrow from "@/components/ui/HandDrawnArrow";
import ComicScribble from "@/components/ui/ComicScribble";

// --- WIDGETS ---

const ChatBubbleWidget = () => {
    const [variant, setVariant] = useState<"Left" | "Right">("Left");

    return (
        <div className="relative bg-white rounded-xl shadow-lg border border-zinc-200 p-4 w-[280px] select-none transform transition-transform hover:scale-105 duration-300">
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

// --- MAIN SECTION ---

const PhilosophySection = () => {
    return (
        <section className="relative w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-center p-6 md:p-20 overflow-visible z-10 mb-20">

            {/* Background elements (subtle grid or noise could go here) */}

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative">

                {/* LEFT: The Text */}
                <div className="relative z-20 order-2 lg:order-1">
                    <div className="relative">
                        <h3 className="text-2xl text-zinc-400 italic font-medium mb-6 font-['var(--font-caveat)']">My Philosophy</h3>

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
                            I think in systems, <br />
                            not just one off screens
                        </h2>

                        <div className="mt-8 text-xl md:text-2xl leading-relaxed text-zinc-600 max-w-xl">
                            My eng background makes me see{" "}
                            <HighlighterSpan delay={0.2} rotation={-1} color="bg-green-300/80">
                                patterns, edge cases, and
                            </HighlighterSpan>{" "}
                            <br className="hidden md:block" />
                            <HighlighterSpan delay={0.4} rotation={1} color="bg-green-300/80">
                                long-term maintenance
                            </HighlighterSpan>{" "}
                            ... plus, it makes things consistent
                        </div>
                    </div>

                    {/* Decorative Arrow connecting text to widgets */}
                    <div className="absolute -bottom-12 right-0 hidden md:block opacity-60">
                        <HandDrawnArrow
                            type="curved-down"
                            width={100}
                            height={80}
                            color="#52525b"
                            className="transform rotate-12"
                        />
                    </div>
                </div>

                {/* RIGHT: The Visuals (Floating Widgets) */}
                <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center order-1 lg:order-2 perspective-1000">

                    {/* Widget 1: Chat Bubble (Left, floating) */}
                    <div className="absolute top-10 left-0 md:-left-8 z-20 animate-float-slow">
                        <ChatBubbleWidget />
                        {/* Connecting line/arrow hint */}
                        <div className="absolute -left-12 top-12 opacity-40 hidden md:block">
                            <span className="font-['var(--font-caveat)'] text-2xl text-zinc-400 -rotate-12 block">Components</span>
                        </div>
                    </div>

                    {/* Widget 2: Typography (Right, floating) */}
                    <div className="absolute bottom-20 right-0 md:-right-4 z-30 animate-float-medium">
                        <TypographyWidget />
                    </div>

                    {/* Widget 3: Spacing (Center/Bottom, layered) */}
                    <div className="absolute bottom-40 left-1/2 -translate-x-1/2 md:translate-x-12 z-10 scale-90 opacity-80 blur-[0.5px] hover:blur-0 transition-all duration-300">
                        <SpacingWidget />
                    </div>

                    {/* Background doodles/decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                        <div className="absolute top-0 right-20 opacity-20 rotate-45">
                            <ComicScribble type="zigzag" width={100} color="#a1a1aa" />
                        </div>
                        <div className="absolute bottom-10 left-10 opacity-20 -rotate-12">
                            <ComicScribble type="loop" width={80} color="#a1a1aa" />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default PhilosophySection;
