"use client";
import React, { useState, useRef } from "react";
import { Copy, Check, FileText } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { AVATARS } from "@/constants";
import HighlighterSpan from "@/components/ui/HighlighterSpan";
import HandDrawnArrow from "@/components/ui/HandDrawnArrow";
import { useIsMobile } from "@/hooks/useIsMobile";

const ContactSection = () => {
	const [copied, setCopied] = useState(false);
	const email = "harishlal80@gmail.com";
	const sectionRef = useRef<HTMLDivElement>(null);

	// Apple-style scroll animations
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"]
	});

	const isMobile = useIsMobile(768);

	// Smooth transforms with Apple-like easing
	const leftColumnYDesktop = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -20]);
	const leftColumnScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.92, 1, 1]);

	const rightColumnYDesktop = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -30]);
	const rightColumnScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.9, 1, 1]);

	const leftColumnY = isMobile ? 0 : leftColumnYDesktop;
	const rightColumnY = isMobile ? 0 : rightColumnYDesktop;

	const avatarScale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
	const avatarRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 2]);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(email);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy!", err);
		}
	};

	return (
		<div ref={sectionRef} className="relative min-h-[80vh] w-full bg-transparent overflow-hidden flex items-center justify-center p-6 md:p-10">

			<div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">

				{/* LEFT COLUMN: PHILOSOPHY TEXT */}
				<motion.div
					className="flex flex-col space-y-8 order-2 md:order-1 relative z-10"
					style={{ y: leftColumnY, scale: leftColumnScale }}
				>
					<div className="space-y-4">

						<div className="text-3xl md:text-5xl leading-tight font-bold tracking-tight text-white font-['var(--font-caveat)']">
							In short, I&apos;m someone who <br className="hidden sm:block" />
							<HighlighterSpan delay={0.2} rotation={-1} color="bg-green-300">
								enjoys working in messy,
							</HighlighterSpan>{" "}
							<br className="hidden sm:block" />
							<HighlighterSpan delay={0.4} rotation={2} color="bg-green-300">
								complex spaces
							</HighlighterSpan>{" "}
							and making <br className="hidden sm:block" />
							them clearer and more human.
						</div>
					</div>

					<div className="text-2xl md:text-4xl leading-tight font-bold text-zinc-300 font-['var(--font-caveat)'] mt-6 md:mt-0">
						I do that by{" "}
						<HighlighterSpan delay={0.6} rotation={-2} color="bg-green-300">
							experimenting to
						</HighlighterSpan>{" "}
						<br className="hidden sm:block" />
						learn,{" "}
						<HighlighterSpan delay={0.8} rotation={1} color="bg-green-300">
							shaping clear stories
						</HighlighterSpan>{" "}
						<br className="hidden sm:block" />
						that help people align, and <br className="hidden sm:block" />
						<HighlighterSpan delay={1.0} rotation={-1} color="bg-green-300">
							designing systems with care
						</HighlighterSpan>{" "}
						<br className="hidden sm:block" />
						for the small details that quietly <br className="hidden sm:block" />
						shape how something feels.
					</div>
				</motion.div>

				{/* RIGHT COLUMN: AVATAR & ACTIONS */}
				<motion.div
					className="flex flex-col items-center relative gap-4 order-1 md:order-2"
					style={{ y: rightColumnY, scale: rightColumnScale }}
				>

					{/* Speech Bubble - Pixel Style */}
					<motion.div
						className="relative z-20 translate-y-4 right-8 sm:right-auto sm:translate-x-12 md:translate-x-20"
						animate={{ y: [0, -6, 0] }}
						transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
					>
						<div className="bg-blue-500 border-4 border-black text-white px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-xl md:text-2xl font-bold shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative transform rotate-3 w-max max-w-[240px] sm:max-w-[280px] text-center font-['Press_Start_2P'] leading-relaxed mx-auto">
							<span className="text-xs sm:text-sm">If this made sense, let&apos;s chat!</span>
							{/* Pointy bit */}
							<div className="absolute -bottom-2 left-1/2 sm:left-6 -translate-x-1/2 sm:translate-x-0 w-6 h-6 bg-blue-500 border-l-4 border-b-4 border-black transform rotate-45" />
						</div>
					</motion.div>

					{/* Avatar */}
					<motion.div
						className="relative w-[300px] h-[380px] md:w-[380px] md:h-[450px] z-10"
						style={{ scale: avatarScale, rotate: avatarRotate }}
					>
						<Image
							src={AVATARS.WAVE}
							alt="Harish Waving"
							fill
							className="object-contain"
							priority
						/>
					</motion.div>

					{/* Actions Container - Pixel Retro Style */}
					<div className="flex flex-col items-center gap-6 mt-[-20px] relative z-20 w-full pl-8 md:pl-0">

						<div className="flex flex-col md:flex-row items-center gap-6">
							{/* Email Button - Arcade Style */}
							<div className="flex flex-col items-center gap-2 relative">
								{/* Arrows pointing at email button */}
								<div className="flex gap-4 mb-2 opacity-60">
									<HandDrawnArrow type="default" width={30} height={40} rotation={0} />
									<HandDrawnArrow type="default" width={30} height={40} rotation={0} />
									<HandDrawnArrow type="default" width={30} height={40} rotation={0} />
								</div>
								<motion.button
									onClick={copyToClipboard}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="group relative px-6 py-4 bg-yellow-400 border-4 border-black text-black transition-all hover:bg-yellow-300 flex items-center gap-3 text-base font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-['Press_Start_2P']"
								>
									<span className="text-xs md:text-sm leading-relaxed">{email}</span>
									{copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} className="text-zinc-800 group-hover:text-black" />}
								</motion.button>
								<span className="text-sm text-zinc-400 italic font-['var(--font-caveat)'] animate-pulse">← tap to copy</span>
							</div>

							{/* Resume Button - Pixel Style */}
							<motion.a
								href="/resume.pdf"
								download
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="group relative px-6 py-4 bg-green-400 border-4 border-black text-black hover:bg-green-300 transition-all flex items-center gap-3 text-base font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-['Press_Start_2P']"
							>
								<FileText size={20} />
								<span className="text-xs md:text-sm leading-relaxed">Resume</span>
							</motion.a>
						</div>

						{/* Pixel Decoration */}
						<div className="flex gap-2 mt-4">
							<div className="w-4 h-4 bg-red-500 border-2 border-black animate-pulse" />
							<div className="w-4 h-4 bg-yellow-500 border-2 border-black animate-pulse" style={{ animationDelay: '200ms' }} />
							<div className="w-4 h-4 bg-green-500 border-2 border-black animate-pulse" style={{ animationDelay: '400ms' }} />
							<div className="w-4 h-4 bg-blue-500 border-2 border-black animate-pulse" style={{ animationDelay: '600ms' }} />
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default ContactSection;
