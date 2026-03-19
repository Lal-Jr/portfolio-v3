"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { EXPERIENCE_DATA } from "@/constants";
import HandDrawnArrow from "@/components/ui/HandDrawnArrow";
import ComicScribble from "@/components/ui/ComicScribble";
import Paperclip from "@/components/ui/Paperclip";
import { Globe, Shield, Zap, Bot } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

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
    const sectionRef = useRef<HTMLElement>(null);
    const isMobile = useIsMobile(768);

    // Track scroll progress through the story section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // Apple-style parallax for photos and text - flat on mobile to prevent overlaps
    const photo1YDesktop = useTransform(scrollYProgress, [0, 0.3], [40, -20]);
    const photo1Scale = useTransform(scrollYProgress, [0, 0.2], [0.92, 1]);

    const photo2YDesktop = useTransform(scrollYProgress, [0.2, 0.5], [60, -30]);
    const photo2Rotate = useTransform(scrollYProgress, [0.2, 0.4], [-8, -4]);

    const photo3YDesktop = useTransform(scrollYProgress, [0.5, 0.7], [50, -25]);
    const photo3Scale = useTransform(scrollYProgress, [0.5, 0.65], [0.9, 1]);

    const photo4YDesktop = useTransform(scrollYProgress, [0.7, 1], [70, -35]);
    const photo4Rotate = useTransform(scrollYProgress, [0.7, 0.9], [-10, -5]);

    const photo1Y = isMobile ? 0 : photo1YDesktop;
    const photo2Y = isMobile ? 0 : photo2YDesktop;
    const photo3Y = isMobile ? 0 : photo3YDesktop;
    const photo4Y = isMobile ? 0 : photo4YDesktop;

    // Filters for when the line reaches them
    const photo1Filter = useTransform(scrollYProgress, [0, 0.15], ["grayscale(100%)", "grayscale(0%)"]);
    const photo2Filter = useTransform(scrollYProgress, [0.2, 0.35], ["grayscale(100%)", "grayscale(0%)"]);
    const photo3Filter = useTransform(scrollYProgress, [0.55, 0.65], ["grayscale(100%)", "grayscale(0%)"]);
    const photo4Filter = useTransform(scrollYProgress, [0.75, 0.9], ["grayscale(100%)", "grayscale(0%)"]);

    // We still use EXPERIENCE_DATA for the popup details
    const activeJob = EXPERIENCE_DATA.find(n => n.id === activeNode);

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden z-10 bg-transparent pb-32 md:pb-48">

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
                    className="text-center mb-32 relative"
                >
                    <h2 className="text-3xl md:text-5xl font-['var(--font-caveat)'] text-zinc-300 font-bold transform -rotate-1">
                        But all this comes from the <br className="hidden md:block" />
                        <span className="relative inline-block px-3 py-1">
                            <span className="absolute inset-0 bg-blue-500 rounded-full transform -rotate-1 opacity-90"></span>
                            <span className="relative text-white">journey</span>
                        </span> that shaped how I think...
                    </h2>
                    <div className="absolute -right-8 -bottom-4 hidden md:block opacity-60">
                        <HandDrawnArrow type="curved-down" width={40} height={40} color="#a1a1aa" rotation={-10} />
                    </div>
                </motion.div>

                {/* 2. THE CURVE OF LIFE (Timeline container) - Compacted Height: 1400px (was 1600px) */}
                <div ref={containerRef} className="relative w-full h-[1400px] mt-0 mb-48">

                    {/* SVG PATH - Recalculated for 1400px height */}
                    <svg
                        viewBox="0 0 1000 1400"
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        preserveAspectRatio="none"
                    >
                        {/* Dashed guide line */}
                        <motion.path
                            d="M50,50 C150,50 800,250 900,420 C1000,600 800,800 200,950 C-50,1100 200,1250 900,1350"
                            fill="none"
                            stroke="#333"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray="12 12"
                        />
                        {/* Actual Path - Animated based on scroll */}
                        <motion.path
                            d="M50,50 C150,50 800,250 900,420 C1000,600 800,800 200,950 C-50,1100 200,1250 900,1350"
                            fill="none"
                            stroke="white"
                            strokeWidth="6"
                            strokeLinecap="round"
                            style={{ pathLength }}
                        />
                    </svg>

                    {/* INTERLEAVED CONTENT (Nodes + Text + Photos) - COMPACT CLUSTERS */}

                    {/* --- CLUSTER 1: START (Left - Vertical: Photo Top, Text Bottom) --- 
                        Photo at top-[1%].
                    */}

                    {/* Photo 1: Fun/Chaos - Left side - w-64 */}
                    <motion.div
                        className="absolute top-[1%] left-1/2 -translate-x-1/2 md:left-[5%] md:translate-x-0 w-64 rotate-[6deg] z-10 origin-top"
                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                        style={{ y: photo1Y, scale: photo1Scale }}
                    >
                        {/* Paperclip */}
                        <motion.div
                            className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                            animate={{ rotate: [-2, 2, -2] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Paperclip width={50} height={50} color="#38bdf8" className="rotate-[15deg] drop-shadow-md" />
                        </motion.div>
                        <div className="bg-white p-3 pb-8 shadow-xl transform transition-transform">
                            <motion.div
                                className="relative aspect-square bg-zinc-200 overflow-hidden"
                                style={{ filter: photo1Filter }}
                            >
                                <Image src="/avatars/IMG_7740.PNG" alt="Fun" fill className="object-cover" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Text 1: Positioned BELOW the photo - Pushed down to top-[25%] to fix overlap */}
                    <div className="absolute top-[21%] md:top-[25%] left-[2%] md:left-[2%] w-full max-w-[250px] z-20 text-center md:text-left mx-auto right-[2%] md:right-auto md:mx-0">
                        <div className="mb-4">
                            <h3 className="font-['Press_Start_2P'] text-[10px] text-sky-400 mb-2">CHAPTER 1: START</h3>
                            <p className="font-['var(--font-caveat)'] text-xl text-zinc-300">
                                Everything started during COVID—just me, my laptop, and a lot of boredom. I began with HTML, which led me to CSS, JavaScript, and eventually React.
                            </p>
                        </div>
                    </div>


                    {/* --- CLUSTER 2: PLACEMENT (Right - Horizontal: Text Left, Photo Right) --- 
                        Peak: 900, 420 (approx top-[30%])
                    */}

                    {/* Text 2 */}
                    <div className="absolute top-[52%] md:top-[32%] right-[2%] md:right-[28%] w-full max-w-[250px] z-20 text-center md:text-right mx-auto left-[2%] md:left-auto md:mx-0">
                        <div className="mt-4 md:mr-6">
                            <h3 className="font-['Press_Start_2P'] text-[10px] text-yellow-400 mb-2">CHAPTER 2: BREAKTHROUGH</h3>
                            <p className="font-['var(--font-caveat)'] text-xl text-zinc-300">
                                The placement journey. Landing my first role at Envestnet wasn&apos;t luck—it was grinding DSA, OOPS, DBMS until they made sense.
                            </p>
                        </div>
                    </div>

                    {/* Photo 2 - w-64 */}
                    <motion.div
                        className="absolute top-[32%] left-1/2 -translate-x-1/2 md:top-[30%] md:right-[5%] md:left-auto md:translate-x-0 w-64 rotate-[-4deg] z-30 origin-top"
                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                        style={{ y: photo2Y, rotate: photo2Rotate }}
                    >
                        {/* Paperclip */}
                        <motion.div
                            className="absolute -top-4 right-10 z-20"
                            animate={{ rotate: [-2, 2, -2] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Paperclip width={50} height={50} color="#facc15" className="-rotate-12 drop-shadow-md" />
                        </motion.div>
                        <div className="bg-white p-3 pb-8 shadow-xl">
                            <motion.div
                                className="relative aspect-square bg-zinc-200 overflow-hidden"
                                style={{ filter: photo2Filter }}
                            >
                                <Image src="/avatars/IMG_7743.PNG" alt="Travel" fill className="object-cover" />
                            </motion.div>
                        </div>
                    </motion.div>


                    {/* --- CLUSTER 3: CORPORATE EVOLUTION (Left - Horizontal: Photo Left, Text Right) --- 
                        Loop: 200, 950 (approx top-[60-65%])
                    */}

                    {/* Photo 3 - w-64 */}
                    <motion.div
                        className="absolute top-[65%] md:top-[62%] left-1/2 -translate-x-1/2 md:left-[10%] md:translate-x-0 w-64 rotate-[3deg] z-10 origin-top"
                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                        style={{ y: photo3Y, scale: photo3Scale }}
                    >
                        {/* Paperclip */}
                        <motion.div
                            className="absolute -top-3 left-10 z-20"
                            animate={{ rotate: [-2, 2, -2] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Paperclip width={50} height={50} color="#f472b6" className="rotate-[45deg] drop-shadow-md" />
                        </motion.div>
                        <div className="bg-white p-3 pb-8 shadow-xl">
                            <motion.div
                                className="relative aspect-square bg-zinc-200 overflow-hidden"
                                style={{ filter: photo3Filter }}
                            >
                                <Image src="/avatars/IMG_7741.PNG" alt="Bike" fill className="object-cover" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Text 3 */}
                    <div className="absolute top-[82%] md:top-[67%] left-[2%] md:left-[35%] w-full max-w-[250px] z-20 text-center md:text-left mx-auto right-[2%] md:right-auto md:mx-0">
                        <div className="mr-0 md:mr-6">
                            <h3 className="font-['Press_Start_2P'] text-[10px] text-pink-400 mb-2">CHAPTER 3: EVOLUTION</h3>
                            <p className="font-['var(--font-caveat)'] text-xl text-zinc-300">
                                3 years in the corporate trenches. Evolving from &quot;make it work&quot; to &quot;make it scalable&quot;. Designing systems that survive the test of time.
                            </p>
                        </div>
                    </div>


                    {/* --- CLUSTER 4: FUTURE (Right - Vertical: Text Top, Photo Bottom) --- 
                        End: 900, 1350
                    */}

                    {/* Text 4: Positioned ABOVE the Photo - Compacted position top-[80%] */}
                    <div className="hidden md:block absolute top-[78%] right-[3%] md:right-[5%] w-full max-w-[300px] z-20 text-center md:text-right">
                        <div className="mb-4">
                            <h3 className="font-['Press_Start_2P'] text-[10px] text-green-400 mb-2">CHAPTER 4: HORIZON</h3>
                            <p className="font-['var(--font-caveat)'] text-xl text-zinc-300">
                                And now? Building for the future. AI, Agents, and whatever comes next. The story is just getting started.
                            </p>
                        </div>
                    </div>

                    {/* Photo 4: Growth - Right side - w-64 - Compacted position top-[90%] (almost at end) */}
                    <motion.div
                        className="hidden md:block absolute top-[89%] right-[5%] md:right-[5%] w-64 rotate-[-5deg] z-10 origin-top"
                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                        style={{ y: photo4Y, rotate: photo4Rotate }}
                    >
                        {/* Paperclip */}
                        <motion.div
                            className="absolute -top-4 right-1/2 translate-x-1/2 z-20"
                            animate={{ rotate: [-2, 2, -2] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Paperclip width={50} height={50} color="#4ade80" className="-rotate-6 drop-shadow-md" />
                        </motion.div>
                        <div className="bg-white p-3 pb-8 shadow-xl">
                            <motion.div
                                className="relative aspect-square bg-zinc-200 overflow-hidden"
                                style={{ filter: photo4Filter }}
                            >
                                <Image src="/avatars/IMG_7742.PNG" alt="Growth" fill className="object-cover" />
                            </motion.div>
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
                                                    &quot;{activeJob.desc}&quot;
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
