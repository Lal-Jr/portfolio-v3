"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SHELF_PROJECTS } from "@/constants";
import PixelLabel from "@/components/ui/PixelLabel";

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

    return (
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[10000] flex flex-col bg-zinc-950/80 backdrop-blur-2xl"
        >
            <style jsx global>{`
				::-webkit-scrollbar {
					display: none;
				}
				.no-scrollbar {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
			`}</style>

            <div className="flex-1 overflow-y-auto no-scrollbar w-full py-16 relative">
                {/* CLOSE BUTTON - TOP LEFT */}
                <button
                    onClick={onClose}
                    className="fixed top-8 left-8 z-[10001] group flex items-center gap-3 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10 hover:border-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]"
                >
                    <div className="w-10 h-10 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </div>
                    <span className="font-['Press_Start_2P'] text-[10px] text-zinc-400 group-hover:text-white transition-colors pr-2">ESC / CLOSE</span>
                </button>

                <div className="space-y-16 mt-20 px-6 md:px-12 max-w-7xl mx-auto">
                    {/* 1. PROJECT GIF / IMAGE (FIRST) - UNBOXED */}
                    <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                            src={proj.gif || proj.image}
                            alt={proj.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* 2. HEADING + TECH + LINKS */}
                    <div className="space-y-8 p-8 md:p-12 bg-white/5 border-4 border-white/10 rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(255,255,255,0.05)]">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-emerald-400 font-['Press_Start_2P'] text-[10px]">
                                <span>{proj.year}</span>
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-none transform rotate-45" />
                                <span>{proj.category}</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-['Press_Start_2P'] uppercase text-white leading-tight tracking-tighter">
                                {proj.title}
                            </h2>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="space-y-4">
                                <h4 className="font-['Press_Start_2P'] text-[10px] text-zinc-500 uppercase">Deployed Tech Stack</h4>
                                <div className="flex flex-wrap gap-3">
                                    {proj.tech.map(t => (
                                        <PixelLabel key={t} text={t} className="bg-white text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[10px]" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <a href={proj.liveUrl} className="group flex items-center gap-2 font-['Press_Start_2P'] text-[12px] text-white hover:text-emerald-400 transition-colors uppercase">
                                    <span className="underline decoration-2 underline-offset-8">Live Demo</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                                    </svg>
                                </a>
                                <a href={proj.githubUrl} className="group flex items-center gap-2 font-['Press_Start_2P'] text-[12px] text-white hover:text-emerald-400 transition-colors uppercase">
                                    <span className="underline decoration-2 underline-offset-8">Codebase</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 3. DETAILED CONTENT SECTIONS - UNBOXED */}
                    <div className="grid md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-16 pb-24">
                        {/* Problem */}
                        <div className="space-y-4 relative group">
                            <h4 className="font-['Press_Start_2P'] text-[12px] text-rose-500 uppercase mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-rose-500" /> The Problem
                            </h4>
                            <p className="text-xl md:text-2xl lg:text-3xl text-zinc-300 font-['var(--font-caveat)'] leading-relaxed">
                                {proj.problem}
                            </p>
                        </div>

                        {/* Thought Process */}
                        <div className="space-y-4 relative group">
                            <h4 className="font-['Press_Start_2P'] text-[12px] text-sky-500 uppercase mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-sky-500" /> Thought Process
                            </h4>
                            <p className="text-xl md:text-2xl lg:text-3xl text-zinc-300 font-['var(--font-caveat)'] leading-relaxed">
                                {proj.thought}
                            </p>
                        </div>

                        {/* Solving */}
                        <div className="space-y-4 relative group">
                            <h4 className="font-['Press_Start_2P'] text-[12px] text-emerald-500 uppercase mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-emerald-500" /> Solving the Puzzle
                            </h4>
                            <p className="text-xl md:text-2xl lg:text-3xl text-zinc-300 font-['var(--font-caveat)'] leading-relaxed">
                                {proj.solving}
                            </p>
                        </div>

                        {/* Final Result */}
                        <div className="space-y-4 relative group">
                            <h4 className="font-['Press_Start_2P'] text-[12px] text-yellow-400 uppercase mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-yellow-400" /> Final Result
                            </h4>
                            <p className="text-2xl md:text-3xl lg:text-4xl text-yellow-400/90 font-['var(--font-caveat)'] leading-tight font-bold">
                                {proj.result}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
