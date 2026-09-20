"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { HERO_COMIC_PANELS } from "@/constants";
import HandwrittenText from "@/components/ui/HandwrittenText";
import ComicBubble from "@/components/ui/ComicBubble";
import ComicActionLines from "@/components/ui/ComicActionLines";

// Envestnet logo: a transparent, light-on-dark variant of the official SVG, sitting on the
// same green highlighter stroke that is drawn behind "Harish Lal".
function EnvestnetMark({ width }: { width: number }) {
    return (
        <span className="relative inline-block px-2.5 py-1.5">
            <svg
                aria-hidden
                className="absolute -left-1 -top-1 h-[calc(100%+8px)] w-[calc(100%+8px)] -rotate-1 opacity-40 pointer-events-none"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M 2,10 Q 50,8 98,11"
                    stroke="#10b981"
                    strokeWidth="14"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 2 }}
                />
            </svg>
            <Image
                src="/logos/envestnet-on-dark.svg"
                alt="Envestnet"
                width={width}
                height={Math.round((width * 48.2) / 161.5)}
                className="relative h-auto"
                style={{ width }}
            />
        </span>
    );
}

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    // Track scroll progress through hero section
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    // Scroll-based transforms (no opacity fades)
    const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const heroTextScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.9]);
    const comicPanelsY = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const comicPanelsScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.8]);
    const comicPanelRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

    return (
        <section
            ref={heroRef}
            className="relative w-full min-h-screen flex flex-col items-center justify-center bg-transparent text-white overflow-hidden px-4 pt-20 pb-0"
        >

            {/* Main Content */}
            <motion.div
                className="z-20 w-full max-w-7xl flex flex-col items-center text-center space-y-8"
                style={{ y: heroTextY, scale: heroTextScale }}
            >

                {/* Top Text */}
                <div className="space-y-6 relative">

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold leading-tight tracking-tighter max-w-6xl mx-auto mt-8">
                        {/* "I" with Left Annotation */}
                        <div className="relative inline-block mr-3">
                            I
                            <motion.div
                                initial="initial"
                                whileInView="animate"
                                className="absolute -top-16 left-1/2 -translate-x-1/2 w-[160px] sm:w-[180px] flex flex-col items-center transform -rotate-6 opacity-80 flex pointer-events-none scale-75 origin-bottom sm:scale-100"
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
                        bring{" "}
                        <span className="font-pixel text-[1.1rem] min-[400px]:text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#4dff88] uppercase tracking-wider md:tracking-widest drop-shadow-[2px_2px_0_#0d6b35] md:drop-shadow-[4px_4px_0_#0d6b35] mx-1 md:mx-2">
                            engineering
                        </span>
                        depth, <br className="hidden md:block" />
                        <span className="font-pixel text-[1.1rem] min-[400px]:text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#4dff88] uppercase tracking-wider md:tracking-widest drop-shadow-[2px_2px_0_#0d6b35] md:drop-shadow-[4px_4px_0_#0d6b35] mx-1 md:mx-2">
                            architecture
                        </span>
                        thinking and <br className="hidden md:block" /> <span className="md:whitespace-nowrap">imaginative{" "}

                            {/* "design" with Right Annotation */}
                            <div className="relative inline-block mx-2">
                                <span className="font-pixel text-[1.1rem] min-[400px]:text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#4dff88] uppercase tracking-wider md:tracking-widest drop-shadow-[2px_2px_0_#0d6b35] md:drop-shadow-[4px_4px_0_#0d6b35]">
                                    design
                                </span>
                                {/* Role note to the right of "design", with an arrow pointing back at the word.
                                    xl+ only: below that there's no room beside the word, so a plain line is used instead. */}
                                <motion.div
                                    initial="initial"
                                    whileInView="animate"
                                    className="absolute left-full top-1/2 ml-20 w-[240px] -translate-y-1/2 hidden xl:flex flex-col items-start rotate-6 opacity-80 pointer-events-none z-50 origin-left"
                                >
                                    <svg width="72" height="56" viewBox="0 0 72 56" fill="none" className="text-gray-500 absolute -left-[72px] top-0" aria-hidden>
                                        <motion.path
                                            d="M66 14 C 50 10, 28 18, 12 36"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            variants={{
                                                initial: { pathLength: 0 },
                                                animate: { pathLength: 1, transition: { duration: 0.8, delay: 0.5, repeat: Infinity, repeatDelay: 2.2, repeatType: "reverse" } }
                                            }}
                                        />
                                        <motion.path
                                            d="M22.5 32.5 L12 36 L14.2 25.2"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            variants={{
                                                initial: { pathLength: 0 },
                                                animate: { pathLength: 1, transition: { duration: 0.3, delay: 1.3, repeat: Infinity, repeatDelay: 2.7, repeatType: "reverse" } }
                                            }}
                                        />
                                    </svg>
                                    <div className="font-handwriting text-xl text-gray-400 leading-tight text-left ml-0 normal-case tracking-normal font-normal flex flex-col gap-1">
                                        <HandwrittenText text="I'm a Software Engineer" />
                                        <div className="flex items-center gap-2">
                                            <HandwrittenText text="@" className="text-gray-400" />
                                            <EnvestnetMark width={118} />
                                        </div>
                                    </div>
                                </motion.div>
                            </div></span>
                        <br className="hidden md:block" />
                        to craft interfaces people instantly understand.
                    </h1>
                </div>

                {/* Role + employer below xl, where the floating note beside "design" would run off-screen */}
                <div className="xl:hidden -mt-4 flex items-center justify-center gap-2 font-handwriting text-2xl text-gray-400 -rotate-2">
                    <span>I&apos;m a Software Engineer @</span>
                    <EnvestnetMark width={84} />
                </div>

                {/* Quick link to the blog, written like one of the hero's margin notes.
                    Plain <a>: /blog is a proxied separate app. */}
                <a
                    href="/blog"
                    className="group relative z-30 -mt-2 inline-block max-w-xl font-handwriting text-2xl md:text-3xl text-gray-400 hover:text-white transition-colors -rotate-1"
                >
                    <HandwrittenText text="psst... the messier, unfiltered version of me? " speed={0.03} />
                    <span className="relative inline-block px-1 text-emerald-300 font-bold">
                        <HandwrittenText text="It lives on my blog" speed={0.03} delay={1.45} />
                        <motion.span
                            aria-hidden
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.7, delay: 1.5 }}
                            className="absolute inset-x-0 bottom-0 h-2/5 bg-emerald-400/30 origin-left -rotate-1 -z-10"
                        />
                    </span>
                </a>

                {/* COMIC STRIP SECTION */}
                <motion.div
                    className="relative z-[60] w-full overflow-visible pb-16"
                    style={{ y: comicPanelsY, scale: comicPanelsScale, rotate: comicPanelRotate }}
                >
                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 px-4">
                        {HERO_COMIC_PANELS.map((panel, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 1, rotate: panel.rotate }}
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
                                <ComicBubble text={panel.story} />

                                {/* Comic Panel Frame */}
                                <div
                                    className="relative w-32 h-32 md:w-44 md:h-44 bg-zinc-900 border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-shadow duration-300"
                                    style={{
                                        boxShadow: `8px 8px 0px 0px ${panel.color}`,
                                    }}
                                >
                                    {/* Background Color (Reveals on Hover) */}
                                    <div
                                        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white"
                                    />

                                    {/* Image */}
                                    <Image
                                        src={panel.src}
                                        alt={panel.alt}
                                        fill
                                        className="object-cover relative z-10 grayscale group-hover:grayscale-0 transition-all duration-300"
                                        sizes="(max-width: 768px) 128px, 176px"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* "Here's How" Section matching reference */}
                <div className="pt-32 pb-0 flex flex-col items-center relative">
                    {/* Sunburst Lines Removed for minimal comic feel */}

                    {/* Thinking Annotation */}
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        style={{ x: "-50%", rotate: -6 }}
                        className="absolute -top-12 left-1/2 z-20 flex flex-col items-center"
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

                    <div className="relative -mt-16">
                        <ComicActionLines />
                        {/* Avatar Head */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden z-10 shadow-2xl"
                        >
                            {/* Using the "Chill" avatar which looks like a face/headshot */}
                            <Image
                                src="/headshot.png"
                                alt="Me"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>

                    {/* "Here's How" Text */}
                    <h3
                        className="mt-8 text-4xl sm:text-5xl md:text-6xl font-sans font-bold text-white relative z-20 bg-[#050505] px-4"
                    >
                        Here&apos;s <span className="relative inline-block text-white">
                            how
                            {/* Hand-drawn underline: a soft underlay + marker stroke sweep in together, then a
                                quick second scribble underneath. Draws once, when scrolled into view. */}
                            <svg className="absolute left-[-3%] -bottom-3 h-auto w-[106%] overflow-visible pointer-events-none" viewBox="0 0 100 14" aria-hidden>
                                <motion.path
                                    d="M2 6 C 22 1, 40 11, 60 5.5 S 90 3.5, 98 6.5"
                                    stroke="#DD5E25"
                                    strokeOpacity={0.28}
                                    strokeWidth={8}
                                    strokeLinecap="round"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
                                />
                                <motion.path
                                    d="M2 6 C 22 1, 40 11, 60 5.5 S 90 3.5, 98 6.5"
                                    stroke="#DD5E25"
                                    strokeWidth={3.6}
                                    strokeLinecap="round"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
                                />
                                <motion.path
                                    d="M14 11.5 Q 50 8 88 11"
                                    stroke="#DD5E25"
                                    strokeWidth={2.2}
                                    strokeLinecap="round"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
                                />
                            </svg>
                        </span>
                    </h3>
                </div>
            </motion.div>
        </section >
    );
}
