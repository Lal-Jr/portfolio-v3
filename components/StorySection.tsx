"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { HERO_COMIC_PANELS, EXPERIENCE_DATA } from "@/constants";
import HandDrawnArrow from "@/components/ui/HandDrawnArrow";
import ComicScribble from "@/components/ui/ComicScribble";
import ScribbleNode from "@/components/ui/ScribbleNode";
import PixelLabel from "@/components/ui/PixelLabel";
import Paperclip from "@/components/ui/Paperclip";
import { Globe, Shield, Zap, Bot } from "lucide-react";

const getIcon = (id: string) => {
    switch (id) {
        case "daily-planet": return <Globe className="w-10 h-10 text-sky-400" />;
        case "wayne": return <Shield className="w-10 h-10 text-slate-400" />;
        case "stark": return <Zap className="w-10 h-10 text-rose-400" />;
        case "ai": return <Bot className="w-10 h-10 text-green-400" />;
        default: return null;
    }
};

const StorySection = () => {
    // --- Work Experience Logic ---
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // We still use EXPERIENCE_DATA for the popup details
    const activeJob = EXPERIENCE_DATA.find(n => n.id === activeNode);

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden z-10 bg-transparent pb-16">

            {/* Background Scribbles (Global Decor) */}
            <div className="absolute top-20 right-10 opacity-30 animate-pulse pointer-events-none">
                <ComicScribble type="zigzag" width={150} color="#facc15" />
            </div>
            <div className="absolute bottom-20 left-10 opacity-30 pointer-events-none">
                <ComicScribble type="loop" width={120} color="#ef4444" />
            </div>

            <div className="max-w-7xl w-full px-6 relative z-10 flex flex-col items-center">

                {/* 1. HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 relative"
                >
                    <h2 className="text-3xl md:text-5xl font-['var(--font-caveat)'] text-zinc-300 font-bold transform -rotate-1">
                        ...and this is how my story unwinds
                    </h2>
                    <div className="absolute -right-8 -bottom-4 hidden md:block opacity-60">
                        <HandDrawnArrow type="curved-down" width={40} height={40} color="#a1a1aa" rotation={-10} />
                    </div>
                </motion.div>

                {/* 2. THE CURVE OF LIFE (Timeline container) */}
                <div ref={containerRef} className="relative w-full h-[1600px] mt-0">

                    {/* SVG PATH */}
                    <svg
                        viewBox="0 0 1000 1600"
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        preserveAspectRatio="none"
                    >
                        {/* Dashed guide line */}
                        <motion.path
                            d="M50,100 C200,100 800,300 900,500 C1000,700 800,900 200,1100 C-100,1300 200,1500 900,1500"
                            fill="none"
                            stroke="#333"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray="12 12"
                        />
                        {/* Actual Path */}
                        <motion.path
                            d="M50,100 C200,100 800,300 900,500 C1000,700 800,900 200,1100 C-100,1300 200,1500 900,1500"
                            fill="none"
                            stroke="white"
                            strokeWidth="6"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                        />
                    </svg>

                    {/* INTERLEAVED CONTENT (Nodes + Text + Photos) - CLUSTERED LAYOUT */}

                    {/* --- CLUSTER 1: START (Left - Vertical: Photo Top, Text Bottom) --- 
                        Photo at top-[2%].
                    */}

                    {/* Photo 1: Fun/Chaos - Left side */}
                    <motion.div
                        className="absolute top-[2%] left-[5%] md:left-[5%] w-40 rotate-[6deg] z-10 origin-top"
                        whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                    >
                        {/* Paperclip */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                            <Paperclip width={40} height={40} color="#38bdf8" className="rotate-[15deg] drop-shadow-md" />
                        </div>
                        <div className="bg-white p-2 pb-6 shadow-xl transform transition-transform">
                            <div className="relative aspect-square bg-zinc-200 overflow-hidden filter grayscale hover:grayscale-0 transition-all duration-300">
                                <Image src="/avatars/IMG_7740.PNG" alt="Fun" fill className="object-cover" />
                            </div>
                            <p className="font-['var(--font-caveat)'] text-zinc-800 text-center text-sm font-bold pt-2 leading-none">Originals</p>
                        </div>
                    </motion.div>

                    {/* Text 1: Positioned BELOW the photo */}
                    <div className="absolute top-[16%] left-[2%] md:left-[2%] w-full max-w-[250px] z-20 text-center md:text-left">
                        <div className="mb-4">
                            <h3 className="font-['Press_Start_2P'] text-[10px] text-sky-400 mb-2">CHAPTER 1: START</h3>
                            <p className="font-['var(--font-caveat)'] text-xl text-zinc-300">
                                This is how everything started... late night coding sessions in college dorms, finding joy in fixing that one broken div.
                            </p>
                        </div>
                        {/* Button near text */}
                        <button
                            className="absolute -right-4 top-0 translate-x-1/2 scale-100 hover:scale-125 transition-transform"
                            onClick={() => setActiveNode(activeNode === 'daily-planet' ? null : 'daily-planet')}
                        >
                            <ScribbleNode color="#38bdf8" isActive={activeNode === 'daily-planet'} />
                        </button>
                    </div>


                    {/* --- CLUSTER 2: PLACEMENT (Right - Horizontal: Text Left, Photo Right) --- 
                        Peak: 900, 500
                    */}

                    {/* Text 2 */}
                    <div className="absolute top-[30%] right-[25%] md:right-[22%] w-full max-w-[250px] z-20 text-right">
                        <div className="mt-4 md:mr-6">
                            <h3 className="font-['Press_Start_2P'] text-[10px] text-yellow-400 mb-2">CHAPTER 2: BREAKTHROUGH</h3>
                            <p className="font-['var(--font-caveat)'] text-xl text-zinc-300">
                                The placement journey. Landing my first role at Wayne Enterprises wasn't luck—it was grinding data structures until they made sense.
                            </p>
                        </div>
                        <button
                            className="absolute -right-10 top-2 translate-x-1/2 scale-100 hover:scale-125 transition-transform"
                            onClick={() => setActiveNode(activeNode === 'wayne' ? null : 'wayne')}
                        >
                            <ScribbleNode color="#fbbf24" isActive={activeNode === 'wayne'} />
                        </button>
                    </div>

                    {/* Photo 2 */}
                    <motion.div
                        className="absolute top-[28%] right-[5%] md:right-[5%] w-44 rotate-[-4deg] z-30 origin-top"
                        whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                    >
                        {/* Paperclip */}
                        <div className="absolute -top-4 right-10 z-20">
                            <Paperclip width={40} height={40} color="#facc15" className="-rotate-12 drop-shadow-md" />
                        </div>
                        <div className="bg-white p-2 pb-6 shadow-xl">
                            <div className="relative aspect-square bg-zinc-200 overflow-hidden filter grayscale hover:grayscale-0 transition-all duration-300">
                                <Image src="/avatars/IMG_7741.PNG" alt="Travel" fill className="object-cover" />
                            </div>
                        </div>
                    </motion.div>


                    {/* --- CLUSTER 3: CORPORATE EVOLUTION (Left - Horizontal: Photo Left, Text Right) --- 
                        Loop: 200, 1100
                    */}

                    {/* Photo 3 */}
                    <motion.div
                        className="absolute top-[65%] left-[8%] md:left-[15%] w-36 rotate-[3deg] z-10 origin-top"
                        whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                    >
                        {/* Paperclip */}
                        <div className="absolute -top-3 left-6 z-20">
                            <Paperclip width={36} height={36} color="#f472b6" className="rotate-[45deg] drop-shadow-md" />
                        </div>
                        <div className="bg-white p-2 pb-5 shadow-xl">
                            <div className="relative aspect-square bg-zinc-200 overflow-hidden filter grayscale hover:grayscale-0 transition-all duration-300">
                                <Image src="/avatars/IMG_7743.PNG" alt="Bike" fill className="object-cover" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Text 3 */}
                    <div className="absolute top-[67%] left-[28%] md:left-[35%] w-full max-w-[250px] z-20 text-left">
                        <div className="mr-6">
                            <h3 className="font-['Press_Start_2P'] text-[10px] text-pink-400 mb-2">CHAPTER 3: EVOLUTION</h3>
                            <p className="font-['var(--font-caveat)'] text-xl text-zinc-300">
                                2.5 years in the corporate trenches. Evolving from "make it work" to "make it scalable". Designing systems that survive the test of time.
                            </p>
                        </div>
                        <button
                            className="absolute -left-12 top-2 translate-x-1/2 scale-100 hover:scale-125 transition-transform"
                            onClick={() => setActiveNode(activeNode === 'stark' ? null : 'stark')}
                        >
                            <ScribbleNode color="#f472b6" isActive={activeNode === 'stark'} />
                        </button>
                    </div>


                    {/* --- CLUSTER 4: FUTURE (Right - Vertical: Text Top, Photo Bottom) --- 
                        End: 900, 1500
                    */}

                    {/* Text 4: Positioned ABOVE the Photo */}
                    <div className="absolute top-[75%] right-[5%] md:right-[5%] w-full max-w-[250px] z-20 text-center md:text-right">
                        <div className="mb-4">
                            <h3 className="font-['Press_Start_2P'] text-[10px] text-green-400 mb-2">CHAPTER 4: HORIZON</h3>
                            <p className="font-['var(--font-caveat)'] text-xl text-zinc-300">
                                And now? Building for the future. AI, Agents, and whatever comes next. The story is just getting started. 🚀
                            </p>
                        </div>
                        {/* Button near text */}
                        <button
                            className="absolute -left-10 md:left-auto md:-right-4 top-2 translate-x-1/2 scale-100 hover:scale-125 transition-transform"
                            onClick={() => setActiveNode(activeNode === 'ai' ? null : 'ai')}
                        >
                            <ScribbleNode color="#4ade80" isSpecial={true} isActive={activeNode === 'ai'} />
                        </button>
                    </div>

                    {/* Photo 4: Growth - Right side */}
                    <motion.div
                        className="absolute top-[88%] right-[5%] md:right-[5%] w-48 rotate-[-5deg] z-10 origin-top"
                        whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                    >
                        {/* Paperclip */}
                        <div className="absolute -top-4 right-1/2 translate-x-1/2 z-20">
                            <Paperclip width={40} height={40} color="#4ade80" className="-rotate-6 drop-shadow-md" />
                        </div>
                        <div className="bg-white p-3 pb-8 shadow-xl">
                            <div className="relative aspect-square bg-zinc-200 overflow-hidden filter grayscale hover:grayscale-0 transition-all duration-300">
                                <Image src="/avatars/IMG_7742.PNG" alt="Growth" fill className="object-cover" />
                            </div>
                            <p className="font-['var(--font-caveat)'] text-zinc-800 text-center text-lg font-bold pt-2 rotate-1">LFG!</p>
                        </div>
                    </motion.div>


                    {/* UI OVERLAY: Pixel Style Popup Card */}
                    <AnimatePresence>
                        {activeNode && activeJob && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
                            >
                                {/* Backdrop for focus */}
                                <div className="absolute inset-0 bg-black/60 pointer-events-auto" onClick={() => setActiveNode(null)} />

                                <div className="bg-zinc-900 border-4 border-white shadow-[12px_12px_0_0_#000] p-1 relative z-10 max-w-sm pointer-events-auto">
                                    {/* Comic Spike Burst behind title */}
                                    <div className="absolute -top-6 -left-6 z-0 pointer-events-none">
                                        <svg width="60" height="60" viewBox="0 0 100 100" className="text-yellow-400 fill-current animate-spin-slow">
                                            <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
                                        </svg>
                                    </div>

                                    <div className="border-2 border-white/20 p-5 bg-zinc-900 relative z-10">
                                        {/* Header */}
                                        <div className="flex justify-between items-start mb-6 border-b-2 border-dashed border-white/20 pb-4">
                                            <div>
                                                <h3 className="font-['Press_Start_2P'] text-white text-sm leading-6 uppercase text-yellow-400 shadow-black drop-shadow-md">
                                                    {activeJob.company}
                                                </h3>
                                                <p className="font-['Press_Start_2P'] text-[10px] text-zinc-400 mt-2">
                                                    {activeJob.period}
                                                </p>
                                            </div>
                                            <div className="text-4xl filter drop-shadow-lg grayscale-0">{getIcon(activeJob.id)}</div>
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-4">
                                            <div>
                                                <p className="font-['Press_Start_2P'] text-[10px] text-blue-400 mb-2">
                                                    CLASS:
                                                </p>
                                                <p className="font-bold text-white text-xl font-['var(--font-caveat)']">
                                                    {activeJob.role}
                                                </p>
                                            </div>

                                            <div className="bg-white/5 p-4 border border-white/10 rounded-sm">
                                                <p className="font-['Press_Start_2P'] text-[10px] text-green-400 mb-2">
                                                    QUEST LOG:
                                                </p>
                                                <p className="font-['var(--font-caveat)'] text-2xl text-white leading-tight">
                                                    "{activeJob.desc}"
                                                </p>
                                            </div>
                                        </div>

                                        {/* Footer Decor */}
                                        <div className="mt-6 flex justify-between items-end">
                                            <div className="text-[9px] font-['Press_Start_2P'] text-zinc-600 animate-pulse">
                                                PRESS START
                                            </div>
                                            <div className="flex gap-1">
                                                <div className="w-3 h-3 bg-red-500 border border-black" />
                                                <div className="w-3 h-3 bg-yellow-500 border border-black" />
                                                <div className="w-3 h-3 bg-green-500 border border-black" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

            </div>
        </section>
    );
};

export default StorySection;
