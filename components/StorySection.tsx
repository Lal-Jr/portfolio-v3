"use client";
import Doodle from "@/components/ui/Doodle";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { EXPERIENCE_DATA } from "@/constants";
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

    // Photos turn from grayscale to color as the line reaches them. Toggled at a
    // threshold with a CSS transition instead of scrubbing `filter` every scroll
    // frame (a per-frame filter forces a repaint of each photo).
    const PHOTO_COLOR_AT = [0.075, 0.275, 0.6, 0.825];
    const [colored, setColored] = useState<boolean[]>(PHOTO_COLOR_AT.map(() => false));
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        setColored((prev) => {
            const next = PHOTO_COLOR_AT.map((t) => v >= t);
            return next.every((c, i) => c === prev[i]) ? prev : next;
        });
    });

    // We still use EXPERIENCE_DATA for the popup details
    const activeJob = EXPERIENCE_DATA.find(n => n.id === activeNode);

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-clip z-10 bg-transparent pb-12 md:pb-16">
            <Doodle shape="spiral" size={52} color="#f9a8d4" className="left-[6%] top-24" rotate={10} />
            <Doodle shape="burst" size={44} color="#fde047" className="right-[8%] top-40" />
            <Doodle shape="zigzag" size={70} color="#86efac" className="right-[5%] bottom-40" rotate={-8} />

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
                    <h2 className="text-3xl md:text-5xl font-handwriting text-zinc-300 font-bold transform -rotate-1">
                        But all this comes from the <br className="hidden md:block" />
                        <span className="relative inline-block px-3 py-1">
                            <span className="absolute inset-0 bg-blue-500 rounded-full transform -rotate-1 opacity-90"></span>
                            <span className="relative text-white">journey</span>
                        </span>{" "}
                        <span className="relative inline-block">
                            that shaped how I think...
                            {/* Hand-drawn arrow: leaves the end of the sentence and curls down toward the journey */}
                            <svg
                                width="120"
                                height="110"
                                viewBox="0 0 120 110"
                                fill="none"
                                className="pointer-events-none absolute left-full top-1/2 ml-2 hidden text-zinc-400 md:block"
                                aria-hidden
                            >
                                <motion.path
                                    d="M6 16 C 60 10, 100 30, 92 62 C 88 78, 70 90, 52 100"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
                                />
                                <motion.path
                                    d="M64 100.2 L52 100 L58.2 89.7"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 1.7 }}
                                />
                            </svg>
                        </span>
                    </h2>
                </motion.div>

                {/* 2. THE CURVE OF LIFE (Timeline container) - Compacted Height: 1400px (was 1600px) */}
                <div ref={containerRef} className="relative w-full h-[1400px] mt-0 mb-32">

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
                            <div
                                className={`relative aspect-square bg-zinc-200 overflow-hidden transition-[filter] duration-700 ${colored[0] ? "grayscale-0" : "grayscale"}`}
                            >
                                <Image src="/avatars/IMG_7740.PNG" alt="Fun" fill sizes="256px" className="object-cover" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Text 1: Positioned BELOW the photo - Pushed down to top-[25%] to fix overlap */}
                    <div className="absolute top-[21%] md:top-[25%] left-[2%] md:left-[2%] w-full max-w-[250px] z-20 text-center md:text-left mx-auto right-[2%] md:right-auto md:mx-0">
                        <div className="mb-4">
                            <h3 className="font-['Press_Start_2P'] text-[10px] text-sky-400 mb-2">CHAPTER 1: LEARNING</h3>
                            <p className="font-handwriting text-xl text-zinc-300">
                                It started during COVID, with just me, my laptop and a lot of boredom. I built everything from scratch: HTML, then CSS, then JavaScript, until React finally clicked.
                            </p>
                        </div>
                    </div>


                    {/* --- CLUSTER 2: PLACEMENT (Right - Horizontal: Text Left, Photo Right) --- 
                        Peak: 900, 420 (approx top-[30%])
                    */}

                    {/* Text 2 */}
                    <div className="absolute top-[52%] md:top-[32%] right-[2%] md:right-[28%] w-full max-w-[250px] z-20 text-center md:text-right mx-auto left-[2%] md:left-auto md:mx-0">
                        <div className="mt-4 md:mr-6">
                            <h3 className="font-['Press_Start_2P'] text-[10px] text-yellow-400 mb-2">CHAPTER 2: DISCOVERY</h3>
                            <p className="font-handwriting text-xl text-zinc-300">
                                Somewhere in the building, I fell in love with it. I ground through DSA, OOPS and DBMS until they made sense, and that love became my first role at Envestnet.
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
                            <div
                                className={`relative aspect-square bg-zinc-200 overflow-hidden transition-[filter] duration-700 ${colored[1] ? "grayscale-0" : "grayscale"}`}
                            >
                                <Image src="/avatars/IMG_7743.PNG" alt="Travel" fill sizes="256px" className="object-cover" />
                            </div>
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
                            <div
                                className={`relative aspect-square bg-zinc-200 overflow-hidden transition-[filter] duration-700 ${colored[2] ? "grayscale-0" : "grayscale"}`}
                            >
                                <Image src="/avatars/IMG_7741.PNG" alt="Bike" fill sizes="256px" className="object-cover" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Text 3 */}
                    <div className="absolute top-[82%] md:top-[67%] left-[2%] md:left-[35%] w-full max-w-[250px] z-20 text-center md:text-left mx-auto right-[2%] md:right-auto md:mx-0">
                        <div className="mr-0 md:mr-6">
                            <h3 className="font-['Press_Start_2P'] text-[10px] text-pink-400 mb-2">CHAPTER 3: SUSTENANCE</h3>
                            <p className="font-handwriting text-xl text-zinc-300">
                                Three years in, I&apos;m still learning: upskilling, building on the side and learning from the people around me. &quot;Make it work&quot; became &quot;make it scale&quot;.
                            </p>
                        </div>
                    </div>


                    {/* --- CLUSTER 4: FUTURE (Right - Vertical: Text Top, Photo Bottom) --- 
                        End: 900, 1350
                    */}

                    {/* Text 4: Positioned ABOVE the Photo - Compacted position top-[80%] */}
                    <div className="hidden md:block absolute top-[78%] right-[3%] md:right-[5%] w-full max-w-[300px] z-20 text-center md:text-right">
                        <div className="mb-4">
                            <h3 className="font-['Press_Start_2P'] text-[10px] text-green-400 mb-2">CHAPTER 4: WHAT&apos;S NEXT</h3>
                            <p className="font-handwriting text-xl text-zinc-300">
                                The future looks like AI and agents in everyday work, deeper architecture and interfaces that feel human. I&apos;m building toward that, one chapter at a time.
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
                            <div
                                className={`relative aspect-square bg-zinc-200 overflow-hidden transition-[filter] duration-700 ${colored[3] ? "grayscale-0" : "grayscale"}`}
                            >
                                <Image src="/avatars/IMG_7742.PNG" alt="Growth" fill sizes="256px" className="object-cover" />
                            </div>
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
                                                <p className="font-bold text-white text-xl font-handwriting">
                                                    {activeJob.role}
                                                </p>
                                            </div>

                                            <div className="bg-white/5 p-4 border border-white/10 rounded-sm">
                                                <p className="font-['Press_Start_2P'] text-[10px] text-green-400 mb-2">
                                                    QUEST LOG:
                                                </p>
                                                <p className="font-handwriting text-2xl text-white leading-tight">
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
