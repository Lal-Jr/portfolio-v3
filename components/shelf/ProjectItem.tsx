"use client";
import React, { useRef, useState } from "react";
import { Lock } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import Image from "next/image";
import { SHELF_PROJECTS } from "@/constants";
import PixelLabel from "@/components/ui/PixelLabel";
import SubtleComicSpark from "@/components/ui/SubtleComicSpark";
import ComicScribble from "@/components/ui/ComicScribble";

type Project = typeof SHELF_PROJECTS[number] & { isComingSoon?: boolean };

interface ProjectItemProps {
    proj: Project;
    index: number;
    onClick: () => void;
}

export default function ProjectItem({ proj, index, onClick }: ProjectItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Optimized mouse tracking with useMotionValue to prevent re-renders
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Create derived values for the offset position
    const labelX = useTransform(mouseX, (x) => x + 20);
    const labelY = useTransform(mouseY, (y) => y + 20);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const initialRotate = index % 2 === 0 ? 3 : -3;
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Update motion values directly without triggering component re-render
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            onMouseEnter={(e) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
                setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={() => {
                if (!proj.isComingSoon) {
                    onClick();
                }
            }}
            className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-16 md:gap-24 relative group ${proj.isComingSoon ? "cursor-none" : "cursor-pointer"} py-8`}
        >
            {/* CURSOR FOLLOWING LABEL */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
                        style={{
                            x: labelX,
                            y: labelY
                        }}
                    >
                        {proj.isComingSoon ? (
                            <div className="flex items-center gap-3">
                                {/* The 'Cursor' Lock */}
                                <Lock className="w-8 h-8 text-white drop-shadow-md" />

                                {/* The Label */}
                                <div className="bg-yellow-400 text-black px-4 py-2 font-handwriting text-xl font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-3 whitespace-nowrap">
                                    COMING SOON!!!
                                </div>
                            </div>
                        ) : (
                            <PixelLabel
                                text={proj.time}
                                className="bg-yellow-400 text-black border-black whitespace-nowrap"
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PROJECT CONTENT SECTION */}
            <div className="w-full md:w-1/2 space-y-6 z-10 transition-opacity duration-300">
                <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-['Press_Start_2P'] leading-tight uppercase text-white">
                        {proj.title}
                    </h3>
                    <div className="flex items-center gap-3 text-emerald-500/60 font-['Press_Start_2P'] text-[10px] md:text-[12px]">
                        <span>{proj.year}</span>
                        <span className="w-1.5 h-1.5 bg-emerald-500/40 rounded-none transform rotate-45" />
                        <span>{proj.category}</span>
                    </div>
                </div>
            </div>

            {/* PROJECT IMAGE SECTION */}
            <div className="w-full md:w-1/2 relative">
                {/* Decorative Elements on Hover - Only for active projects */}
                <AnimatePresence>
                    {isHovered && (
                        <>
                            <SubtleComicSpark className={`-top-12 ${index % 2 === 0 ? "-right-12" : "-left-12"} z-50 text-white`} />
                            <SubtleComicSpark className={`-bottom-12 ${index % 2 === 0 ? "-left-12" : "-right-12"} z-50 text-emerald-500`} />
                            <ComicScribble className={`top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 ${index % 2 === 0 ? "text-rose-500" : "text-sky-500"}`} />
                        </>
                    )}
                </AnimatePresence>

                <motion.div
                    style={{ y }}
                    className="relative aspect-[4/3] w-full bg-zinc-900 rounded-[2rem] overflow-hidden transition-all duration-500"
                    animate={{
                        borderColor: isHovered ? proj.color : "#27272a", // zinc-800
                        borderWidth: "12px",
                        borderStyle: "solid",
                        boxShadow: isHovered
                            ? `12px 12px 0px 0px ${proj.color}`
                            : "0px 0px 0px 0px rgba(0,0,0,0)",
                        scale: isHovered ? 1.02 : 1,
                        rotate: isHovered ? 0 : initialRotate,
                    }}
                >
                    {/* Static Image / GIF Switch */}
                    <Image
                        src={proj.isComingSoon ? proj.image : (isHovered ? proj.gif : proj.image)}
                        alt={proj.title}
                        fill
                        className={`object-cover transition-all duration-700 ${isHovered ? 'scale-100' : 'scale-110'}`}
                    />

                </motion.div>
            </div>
        </motion.div>
    );
}
