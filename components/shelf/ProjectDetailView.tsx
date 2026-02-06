"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SHELF_PROJECTS } from "@/constants";
import StickyNote from "@/components/ui/StickyNote";
import HandwrittenArrow from "@/components/ui/HandwrittenArrow";

type Project = typeof SHELF_PROJECTS[number];

interface ProjectDetailViewProps {
    proj: Project;
    onClose: () => void;
}

export default function ProjectDetailView({ proj, onClose }: ProjectDetailViewProps) {
    // ESC Key to close & Lock Background Scroll
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        // Prevent background scroll
        document.body.style.overflow = "hidden";

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            // Restore background scroll
            document.body.style.overflow = "unset";
        };
    }, [onClose]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] flex flex-col bg-zinc-950/95 backdrop-blur-md overflow-y-auto"
        >
            <style jsx global>{`
				::-webkit-scrollbar {
					width: 0px;
					background: transparent;
				}
				* {
					scrollbar-width: none;
				}
			`}</style>

            {/* TOP NAVIGATION BAR - STICKY */}
            <div className="sticky top-0 z-[10001] px-6 py-4 flex justify-between items-center bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
                <button
                    onClick={onClose}
                    className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
                >
                    {/* RESTORED COMIC BUTTON STYLE */}
                    <div className="bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all w-10 h-10 flex items-center justify-center rounded-lg">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </div>
                    <span className="font-['Press_Start_2P'] text-[10px] hidden md:inline font-bold uppercase">Go back</span>
                </button>

                {/* Section Navigation Pills */}
                <div className="hidden md:flex gap-3">
                    {[
                        { label: "The Problem", id: "problem" },
                        { label: "My Thinking", id: "strategy" },
                        { label: "The Solution", id: "solution" },
                        { label: "The Impact", id: "impact" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="px-4 py-2 rounded-full border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-wider bg-zinc-900/50 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* MAIN CONTENT CONTAINER */}
            <div className="w-full max-w-6xl mx-auto pt-10 pb-32 px-4 md:px-8">

                {/* 1. HERO SECTION (Cinematic Top) */}
                <div id="hero" className="flex flex-col space-y-8 mb-32 scroll-mt-32">

                    {/* A. HERO IMAGE / GIF - Original Aspect Ratio */}
                    <div className="w-full relative rounded-[2rem] overflow-hidden border-b-4 border-zinc-800 shadow-2xl group bg-zinc-900">
                        <div className="relative w-full">
                            <Image
                                src={proj.gif || proj.image}
                                alt={proj.title}
                                width={1920}
                                height={1080}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 via-transparent to-transparent pointer-events-none" />

                        {/* Overlay Metadata (Bottom Left) */}
                        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-wrap gap-3">
                            <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase">
                                {proj.year}
                            </span>
                            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
                                {proj.category}
                            </span>
                        </div>
                    </div>

                    {/* B. TITLE & CTA ROW */}
                    <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                        <div className="space-y-4 max-w-3xl">
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                                {proj.title}
                            </h1>
                            <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
                                {proj.shortDesc || "A digital experience crafted for impact."}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0 mt-2">
                            <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-black px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-emerald-400 transition-colors flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none translate-x-0 hover:translate-x-1 hover:translate-y-1 block"
                            >
                                <span>Visit Live</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </a>
                            <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-zinc-900 text-white border border-zinc-800 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center justify-center gap-3"
                            >
                                <span>Codebase</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.597 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* PHASE 1: THE PROBLEM */}
                <div id="problem" className="mb-32 scroll-mt-32 max-w-4xl mx-auto">
                    <div className="relative pl-8 md:pl-12 border-l-4 border-rose-500/30">
                        <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-rose-500 border-4 border-zinc-950 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        </div>

                        <h3 className="font-['Press_Start_2P'] text-xs text-rose-500 uppercase tracking-widest mb-6">
                            Phase 1: The Problem
                        </h3>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            "What was broken?"
                        </h2>

                        {/* Changed font from Caveat to Standard Sans for consistency */}
                        <p className="text-xl md:text-2xl text-zinc-300 font-light leading-loose">
                            {proj.problem}
                        </p>
                    </div>
                </div>


                {/* PHASE 2: THE THINKING (Free-Form Interactable Canvas) */}
                <div id="strategy" className="mb-32 scroll-mt-32">
                    <div className="w-full border-y border-white/10 py-8 bg-zinc-900/20 overflow-hidden relative group cursor-grab active:cursor-grabbing">
                        {/* Label */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-zinc-950/80 px-4 py-2 rounded-full border border-yellow-500/30">
                            <h3 className="font-['Press_Start_2P'] text-[10px] text-yellow-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="text-lg">🖐️</span> Phase 2: Explore Thoughts
                            </h3>
                        </div>

                        {/* Infinite Draggable Canvas (Free Drag) */}
                        <motion.div
                            className="relative min-h-[700px] w-[200%] md:w-[150%] flex items-center justify-center -ml-[25%]"
                            drag
                        >
                            {/* Dot Grid Background */}
                            <div className="absolute inset-0 z-0 opacity-10"
                                style={{ backgroundImage: 'radial-gradient(#888 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
                            />

                            {/* Sticky Notes Cluster */}
                            <div className="relative w-full h-[600px]">
                                {/* Central Concept */}
                                <StickyNote
                                    color="yellow"
                                    rotate={-3}
                                    className="absolute top-[20%] left-[45%] z-30 shadow-2xl scale-125"
                                >
                                    <span className="text-3xl mb-2">💡</span>
                                    <span className="font-bold border-b border-black/20 pb-1">Core Concept</span><br />
                                    {proj.thought}
                                </StickyNote>

                                {/* Supporting Ideas (More Notes!) */}
                                <StickyNote color="cyan" rotate={2} className="absolute top-[10%] left-[25%] z-20 shadow-xl opacity-90">
                                    <span className="font-bold text-sm uppercase mb-2">Requirement</span>
                                    Fast load times.
                                </StickyNote>

                                <StickyNote color="pink" rotate={-5} className="absolute top-[15%] left-[65%] z-20 shadow-xl opacity-90">
                                    <span className="font-bold text-sm uppercase mb-2">Design</span>
                                    Dark mode first.
                                </StickyNote>

                                <StickyNote color="orange" rotate={4} className="absolute bottom-[20%] left-[30%] z-20 shadow-xl opacity-90">
                                    <span className="font-bold text-sm uppercase mb-2">User Goal</span>
                                    "I want to see content fast."
                                </StickyNote>

                                <StickyNote color="lime" rotate={12} className="absolute top-[40%] right-[20%] z-10 shadow-lg opacity-90">
                                    <span className="font-bold text-sm uppercase mb-2">Tech</span>
                                    Next.js for SSR?
                                </StickyNote>

                                <StickyNote color="cyan" rotate={-8} className="absolute bottom-[13%] left-[10%] z-10 shadow-lg opacity-80">
                                    <span className="font-bold text-sm uppercase mb-2">Iterate</span>
                                    Refine animation curves.
                                </StickyNote>

                                <StickyNote color="yellow" rotate={8} className="absolute bottom-[10%] left-[55%] z-10 shadow-lg opacity-80">
                                    <div className="flex gap-2 text-2xl">
                                        <span>📱</span><span>⚡</span><span>🎨</span>
                                    </div>
                                </StickyNote>

                                {/* Connecting Arrows */}
                                <HandwrittenArrow type="curved-up" className="absolute top-[25%] left-[32%] w-32 text-white/20 rotate-12" />
                                <HandwrittenArrow type="straight" className="absolute top-[30%] left-[55%] w-32 text-white/20 -rotate-12" />
                                <HandwrittenArrow type="loop" className="absolute bottom-[30%] left-[40%] w-40 text-white/20 rotate-6" />

                            </div>
                        </motion.div>
                        <div className="absolute bottom-4 w-full text-center text-zinc-600 text-xs uppercase tracking-widest pointer-events-none">
                            ( Drag freely to explore )
                        </div>
                    </div>
                </div>

                {/* PHASE 3: SOLUTION */}
                <div id="solution" className="mb-32 scroll-mt-32 max-w-4xl mx-auto">
                    <div className="relative pl-8 md:pl-12 border-l-4 border-indigo-500/30">
                        <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-indigo-500 border-4 border-zinc-950 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        </div>

                        <h3 className="font-['Press_Start_2P'] text-xs text-indigo-500 uppercase tracking-widest mb-6">
                            Phase 3: The Solution
                        </h3>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 leading-tight">
                            Crafted with precision.
                        </h2>

                        <div className="grid md:grid-cols-5 gap-12">
                            <div className="md:col-span-3 space-y-8">
                                <p className="text-xl text-zinc-300 font-light leading-relaxed">
                                    {proj.solving}
                                </p>
                                {/* Key Features List */}
                                <div className="space-y-4">
                                    <h4 className="text-white font-bold text-lg">Key Features Implemented:</h4>
                                    <ul className="space-y-3">
                                        {["Performance Optimized", "Responsive Layout", "Accessible Design"].map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-zinc-400">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Tech Stack Column - Removed Mono font, using default sans */}
                            <div className="md:col-span-2">
                                <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5 sticky top-32">
                                    <h4 className="font-bold text-xs text-zinc-500 uppercase mb-4">Tech Structure</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {proj.tech.map((t, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-zinc-800 text-zinc-300 text-xs rounded-md border border-zinc-700/50 hover:border-indigo-500/50 transition-colors cursor-default">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-white/5">
                                        <h4 className="font-bold text-xs text-zinc-500 uppercase mb-4">Deliverables</h4>
                                        <div className="space-y-2 text-sm text-zinc-400">
                                            <div className="flex justify-between"><span>Design</span> <span>Figma</span></div>
                                            <div className="flex justify-between"><span>Frontend</span> <span>React</span></div>
                                            <div className="flex justify-between"><span>Deploy</span> <span>Vercel</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PHASE 4: IMPACT */}
                <div id="impact" className="mb-24 scroll-mt-32 max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-8">
                        <div className="flex items-center gap-3 justify-center text-emerald-400 mb-4">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <h3 className="font-['Press_Start_2P'] text-xs uppercase tracking-widest">Phase 4: The Impact</h3>
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                    </div>

                    {/* Removed Serif Font */}
                    <h2 className="text-3xl md:text-5xl font-black italic text-white leading-tight mb-12">
                        "{proj.result}"
                    </h2>

                    {/* Stats / Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/10 to-zinc-900 border border-emerald-500/10">
                            <div className="text-3xl font-bold text-white mb-1">100%</div>
                            <div className="text-xs text-emerald-400/60 uppercase tracking-widest">Completion</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/10 to-zinc-900 border border-emerald-500/10">
                            <div className="text-3xl font-bold text-white mb-1">Fast</div>
                            <div className="text-xs text-emerald-400/60 uppercase tracking-widest">Performance</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/10 to-zinc-900 border border-emerald-500/10">
                            <div className="text-3xl font-bold text-white mb-1">Responsive</div>
                            <div className="text-xs text-emerald-400/60 uppercase tracking-widest">All Devices</div>
                        </div>
                    </div>

                    <div className="flex justify-center opacity-30 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => scrollToSection('hero')}>
                        <div className="flex flex-col items-center gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                            <span className="text-[10px] text-white uppercase tracking-widest">Back to Top</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
