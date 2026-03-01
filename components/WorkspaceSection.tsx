"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function WorkspaceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const isMobile = useIsMobile(1024);

    const yDesktop = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const rotateDesktop = useTransform(scrollYProgress, [0, 1], [-2, 2]);

    const y = isMobile ? 0 : yDesktop;
    const rotate = isMobile ? 0 : rotateDesktop;

    return (
        <section ref={containerRef} className="relative pt-32 bg-transparent overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

                {/* Intro Transition */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-8"
                >
                    <p className="text-zinc-500 font-handwriting text-2xl md:text-3xl">
                        I&apos;ve shared the <span className="text-zinc-300 font-bold">how</span> and the <span className="text-zinc-300 font-bold">why</span>.
                    </p>
                </motion.div>

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 sm:mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                        Here is where the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Magic</span> Happens
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-16 md:gap-12 items-center w-full mb-24">

                    {/* Left Text - Evolution */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="col-span-12 lg:col-span-3 text-center lg:text-right order-2 lg:order-1 space-y-4"
                    >
                        <h3 className="text-2xl font-bold text-zinc-200 font-handwriting -rotate-2">The Evolution</h3>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            It didn&apos;t look like this consistently. It iterated, broke, and evolved—just like my code. Now, it&apos;s a space tailored for flow.
                        </p>
                    </motion.div>

                    {/* Centered Image Container - LARGER (spanning 6 cols) */}
                    <motion.div
                        style={{ y, rotate }}
                        className="col-span-12 lg:col-span-6 relative perspective-1000 w-full order-1 lg:order-2 flex justify-center"
                    >
                        {/* Polaroid Frame */}
                        <div className="bg-white p-4 pb-20 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-700 ease-out relative group rounded-sm w-full">

                            {/* Tape */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-12 bg-white/20 backdrop-blur-sm border-l border-r border-white/30 rotate-1 shadow-sm z-30" />

                            <div className="relative aspect-video bg-zinc-100 overflow-hidden border-2 border-zinc-200 transition-all duration-700">
                                <Image
                                    src="/workstation.png"
                                    alt="My Evolved Workspace"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1200px) 100vw, 80vw"
                                    unoptimized
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Text - Happiness/Convenience */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="col-span-12 lg:col-span-3 text-center lg:text-left order-3 lg:order-3 space-y-4"
                    >
                        <h3 className="text-2xl font-bold text-zinc-200 font-handwriting rotate-1">Pure Joy</h3>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Building things makes me happy. Doing it from a command center that works exactly how I think? That&apos;s the ultimate productivity hack.
                        </p>
                    </motion.div>

                </div>

                {/* Concluding Narrative */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mt-20 mb-20"
                >
                    <p className="text-zinc-500 font-handwriting text-2xl md:text-3xl">
                        A curated space to make sense of the mess.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
