"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Helper component for handwriting effect
const HandwrittenText = ({ text, className = "" }: { text: string; className?: string }) => {
    const characters = Array.from(text);

    const containerVariants = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const characterVariants = {
        initial: { opacity: 0, display: "none" },
        animate: {
            opacity: 1,
            display: "inline",
            transition: {
                duration: 0.01,
            },
        },
    };

    return (
        <motion.span
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className={className}
        >
            {characters.map((char, index) => (
                <motion.span key={index} variants={characterVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

// Comic Panel Data
const COMIC_PANELS = [
    {
        src: "/avatars/IMG_7735.PNG",
        alt: "Coding",
        color: "#FFD700", // Gold
        story: "Engineering the future, one bug at a time.",
        rotate: -3,
    },
    {
        src: "/avatars/IMG_7733.PNG",
        alt: "Creative",
        color: "#FF69B4", // Hot Pink
        story: "Dreaming up designs that actually work.",
        rotate: 2,
    },
    {
        src: "/avatars/IMG_7734.PNG",
        alt: "Chill",
        color: "#8842ebff", // Violet
        story: "Staying chill while the servers visualizing.",
        rotate: -2,
    },
    {
        src: "/avatars/IMG_7737.PNG",
        alt: "Adventure",
        color: "#4ade80", // Light Green
        story: "Exploring new tech frontiers daily.",
        rotate: 3,
    },
];

export default function Hero() {
    return (
        <section
            className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden px-4 py-20"
            style={{
                cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w7.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'></path><path d='m15 5 4 4'></path></svg>") 0 22, auto`
            }}
        >
            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Main Content */}
            <div className="z-20 w-full max-w-7xl flex flex-col items-center text-center space-y-8">

                {/* Top Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 relative"
                >




                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold leading-tight tracking-tighter max-w-6xl mx-auto mt-8">
                        {/* "I" with Left Annotation */}
                        <div className="relative inline-block mr-3">
                            I
                            <motion.div
                                initial="initial"
                                whileInView="animate"
                                className="absolute -top-16 left-1/2 -translate-x-1/2 w-[180px] flex flex-col items-center transform -rotate-6 opacity-80 flex pointer-events-none"
                            >
                                <div className="font-handwriting text-2xl text-gray-400 whitespace-nowrap mr-2 normal-case tracking-normal font-normal flex items-center">
                                    <HandwrittenText text="Hi, I'm " />
                                    <span className="relative inline-block ml-1">
                                        <HandwrittenText text="Harish Lal" />
                                        {/* Highlighter Stroke */}
                                        <svg className="absolute -inset-1 w-full h-full -rotate-1 opacity-30 pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none">
                                            <motion.path
                                                d="M 0,10 Q 50,8 100,12"
                                                stroke="#10b981"
                                                strokeWidth="15"
                                                strokeLinecap="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{
                                                    duration: 1.2,
                                                    delay: 1.5
                                                }}
                                            />
                                        </svg>
                                    </span>
                                </div>
                                <svg width="50" height="40" viewBox="0 0 50 40" fill="none" className="text-gray-500 -mt-1">
                                    <motion.path
                                        d="M15 5 Q 30 5 25 35"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        variants={{
                                            initial: { pathLength: 0 },
                                            animate: { pathLength: 1, transition: { duration: 0.8, delay: 0.5, repeat: Infinity, repeatDelay: 2, repeatType: "reverse" } }
                                        }}
                                    />
                                    <motion.path
                                        d="M20 30 L25 35 L32 30"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        variants={{
                                            initial: { pathLength: 0 },
                                            animate: { pathLength: 1, transition: { duration: 0.3, delay: 1.3, repeat: Infinity, repeatDelay: 2.5, repeatType: "reverse" } }
                                        }}
                                    />
                                </svg>
                            </motion.div>
                        </div>
                        mix{" "}
                        <span className="font-['Press_Start_2P'] text-2xl md:text-4xl lg:text-5xl text-emerald-400 uppercase tracking-widest drop-shadow-[4px_4px_0_#065f46] mx-2">
                            engineering
                        </span>
                        thinking <br className="hidden md:block" /> with <span className="whitespace-nowrap">imaginative{" "}

                            {/* "design" with Right Annotation */}
                            <div className="relative inline-block mx-2">
                                <span className="font-['Press_Start_2P'] text-2xl md:text-4xl lg:text-5xl text-emerald-400 uppercase tracking-widest drop-shadow-[4px_4px_0_#065f46]">
                                    design
                                </span>
                                {/* Right Annotation anchored to 'N' in Design */}
                                <motion.div
                                    initial="initial"
                                    whileInView="animate"
                                    className="absolute -bottom-36 -right-[20px] md:-right-[310px] w-[280px] flex flex-col items-start transform rotate-6 opacity-80 hidden md:flex pointer-events-none z-50"
                                >
                                    <svg width="150" height="100" viewBox="0 0 150 100" fill="none" className="text-gray-500 absolute -top-20 -left-32">
                                        <motion.path
                                            d="M140 70 Q 90 10 20 20"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            variants={{
                                                initial: { pathLength: 0 },
                                                animate: { pathLength: 1, transition: { duration: 0.8, delay: 0.5, repeat: Infinity, repeatDelay: 2.2, repeatType: "reverse" } }
                                            }}
                                        />
                                        <motion.path
                                            d="M30 15 L20 20 L25 32"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            variants={{
                                                initial: { pathLength: 0 },
                                                animate: { pathLength: 1, transition: { duration: 0.3, delay: 1.3, repeat: Infinity, repeatDelay: 2.7, repeatType: "reverse" } }
                                            }}
                                        />
                                    </svg>
                                    <div className="font-handwriting text-xl text-gray-400 leading-tight text-left mt-2 ml-0 normal-case tracking-normal font-normal flex flex-col gap-1">
                                        <HandwrittenText text="I'm working on Frontend" />
                                        <div className="flex items-center justify-start">
                                            <span className="relative inline-block">
                                                <HandwrittenText text="@ ENVESTNET" className="text-blue-400" />
                                                {/* Highlighter Stroke */}
                                                <svg className="absolute -inset-1 w-full h-full rotate-1 opacity-20 pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none">
                                                    <motion.path
                                                        d="M 5,12 Q 50,15 95,10"
                                                        stroke="#dddaddff"
                                                        strokeWidth="18"
                                                        strokeLinecap="round"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{
                                                            duration: 1.0,
                                                            delay: 2.0
                                                        }}
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div></span>
                        <br className="hidden md:block" />
                        to craft interfaces people instantly understand.
                    </h1>
                </motion.div>

                {/* COMIC STRIP SECTION */}
                <div className="relative w-full overflow-visible pb-16">
                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 px-4">
                        {COMIC_PANELS.map((panel, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0, rotate: panel.rotate }}
                                animate={{ opacity: 1, scale: 1, rotate: panel.rotate }}
                                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                                whileHover={{
                                    scale: 1.15,
                                    rotate: 0,
                                    zIndex: 50,
                                    transition: { type: "spring", stiffness: 400 }
                                }}
                                className="relative group cursor-pointer"
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={0.2}
                            >
                                {/* Dialogue Bubble (Reveals on Hover) */}
                                <div
                                    className={`absolute -top-24 left-1/2 -translate-x-1/2 w-48 bg-white text-black p-3 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 transform scale-75 group-hover:scale-100 origin-bottom`}
                                >
                                    <p className="font-handwriting font-bold text-lg leading-tight">
                                        {panel.story}
                                    </p>
                                    {/* Tail */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
                                </div>

                                {/* Comic Panel Frame */}
                                <div
                                    className="relative w-32 h-32 md:w-44 md:h-44 bg-zinc-900 border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-shadow duration-300"
                                    style={{
                                        boxShadow: `8px 8px 0px 0px ${panel.color}`,
                                    }}
                                >
                                    {/* Background Pop Color (Reveals on Hover) */}
                                    <div
                                        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ backgroundColor: panel.color }}
                                    />

                                    {/* Image */}
                                    <Image
                                        src={panel.src}
                                        alt={panel.alt}
                                        fill
                                        className="object-cover relative z-10 grayscale group-hover:grayscale-0 mix-blend-normal group-hover:mix-blend-multiply transition-all duration-300"
                                        sizes="(max-width: 768px) 128px, 176px"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>



                {/* "Here's How" Section matching reference */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="pt-32 pb-10 flex flex-col items-center relative"
                >
                    {/* Sunburst Lines */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] h-[400px] pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 0.5, scale: 1 }}
                                transition={{ delay: 1.8 + i * 0.1, duration: 0.5 }}
                                className="absolute top-1/2 left-1/2 w-[2px] h-[100px] bg-gray-600 origin-bottom"
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-80px)`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Thinking Annotation */}
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        style={{ x: "-50%", rotate: -6 }}
                        className="absolute -top-16 left-1/2 z-20 flex flex-col items-center"
                    >
                        <HandwrittenText
                            text="Okay so... how do i do that?"
                            className="font-handwriting text-xl text-gray-400 mb-1 whitespace-nowrap"
                        />
                        <svg width="30" height="30" viewBox="0 0 50 50" fill="none" className="text-gray-500">
                            <motion.path
                                d="M10 5 Q 15 25 25 40"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                variants={{
                                    initial: { pathLength: 0 },
                                    animate: { pathLength: 1, transition: { duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 2, repeatType: "reverse" } }
                                }}
                            />
                            <motion.path
                                d="M18 35 L25 40 L32 32"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                variants={{
                                    initial: { pathLength: 0 },
                                    animate: { pathLength: 1, transition: { duration: 0.2, delay: 1.0, repeat: Infinity, repeatDelay: 2.3, repeatType: "reverse" } }
                                }}
                            />
                        </svg>
                    </motion.div>

                    {/* Avatar Head */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 2, type: "spring" }}
                        className="relative w-32 h-32 rounded-full border-4 border-white bg-zinc-800 overflow-hidden z-10 shadow-2xl"
                    >
                        {/* Using the "Chill" avatar which looks like a face/headshot */}
                        <Image
                            src="/avatars/IMG_7729.PNG"
                            alt="Me"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* "Here's How" Text */}
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2 }}
                        className="mt-8 text-5xl md:text-6xl font-sans font-bold text-white relative z-20 bg-[#050505] px-4"
                    >
                        Here&apos;s <span className="relative inline-block text-white">
                            how
                            {/* Thick Orange Underline */}
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#DD5E25]" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                            </svg>
                        </span>
                    </motion.h3>

                    {/* Down Arrow Indicator */}
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 3 }}
                        className="mt-8 text-gray-500"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
