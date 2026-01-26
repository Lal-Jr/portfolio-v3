"use client";
import React from "react";
import { motion } from "framer-motion";
import { ASPIRATION_QUESTS } from "@/constants";

type Quest = typeof ASPIRATION_QUESTS[number];

interface QuestCardProps {
    quest: Quest;
    index: number;
}

const QuestCard = ({ quest, index }: QuestCardProps) => {
    return (
        <motion.div
            onClick={(e) => e.stopPropagation()} // Prevent drag click propagation
            whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 100,
                boxShadow: `12px 12px 0px 0px #000`
            }}
            className={`
                relative flex-shrink-0 w-[240px] md:w-[260px] 
                bg-zinc-900 border-4 ${quest.borderColor} 
                p-5 flex flex-col justify-between 
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                group cursor-pointer
            `}
            style={{ rotate: quest.rotate }}
        >
            {/* BUBBLE STATUS TAG */}
            <div className="-mt-8 -mr-6 self-end mb-2 relative z-20">
                <div className={`
                    relative px-3 py-1 bg-white text-black font-['Press_Start_2P'] text-[8px] 
                    border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]
                    transform rotate-3 group-hover:rotate-6 transition-transform
                `}>
                    {quest.status}
                    {/* Bubble Tail */}
                    <div className="absolute bottom-0 left-2 w-2 h-2 bg-white border-r-2 border-b-2 border-black transform translate-y-1/2 rotate-45" />
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                <h3 className="text-xl font-['Press_Start_2P'] text-white leading-tight mt-2">
                    {quest.title}
                </h3>
                <div className="w-full h-0.5 bg-white/10 my-2" />
                <p className="text-lg text-zinc-300 font-['var(--font-caveat)'] leading-tight">
                    {quest.desc}
                </p>
            </div>

            {/* COMIC HALFTONE BG PATTERN */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
                    backgroundSize: '8px 8px',
                    color: 'white'
                }}
            />
        </motion.div>
    );
};

export default QuestCard;
