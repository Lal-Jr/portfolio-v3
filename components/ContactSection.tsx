"use client";
import React, { useState } from "react";
import { Copy, Check, FileText } from "lucide-react";
import Image from "next/image";
import { AVATARS } from "@/constants";
import HighlighterSpan from "@/components/ui/HighlighterSpan";
import HandDrawnArrow from "@/components/ui/HandDrawnArrow";

const ContactSection = () => {
	const [copied, setCopied] = useState(false);
	const email = "harishlal80@gmail.com";

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
		<div className="relative min-h-[80vh] w-full bg-transparent overflow-hidden flex items-center justify-center p-6 md:p-10 font-['var(--font-caveat)'] text-zinc-800 mb-20">

			<div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">

				{/* LEFT COLUMN: PHILOSOPHY TEXT */}
				<div className="flex flex-col space-y-8 order-2 md:order-1 relative z-10">
					<div className="space-y-4">
						<h3 className="text-2xl text-zinc-400 italic font-medium transform -rotate-2">
							That's how I think
						</h3>

						<div className="text-3xl md:text-5xl leading-tight font-bold tracking-tight text-zinc-900">
							In short, I'm someone who <br />
							<HighlighterSpan delay={0.2} rotation={-1} color="bg-green-300">
								enjoys working in messy,
							</HighlighterSpan>{" "}
							<br />
							<HighlighterSpan delay={0.4} rotation={2} color="bg-green-300">
								complex spaces
							</HighlighterSpan>{" "}
							and making <br />
							them clearer and more human.
						</div>
					</div>

					<div className="text-2xl md:text-4xl leading-tight font-bold text-zinc-700/90">
						I do that by{" "}
						<HighlighterSpan delay={0.6} rotation={-2} color="bg-green-300">
							experimenting to
						</HighlighterSpan>{" "}
						<br />
						learn,{" "}
						<HighlighterSpan delay={0.8} rotation={1} color="bg-green-300">
							shaping clear stories
						</HighlighterSpan>{" "}
						<br />
						that help people align, and <br />
						<HighlighterSpan delay={1.0} rotation={-1} color="bg-green-300">
							designing systems with care
						</HighlighterSpan>{" "}
						<br />
						for the small details that quietly <br />
						shape how something feels.
					</div>
				</div>

				{/* RIGHT COLUMN: AVATAR & ACTIONS */}
				<div className="flex flex-col items-center relative gap-4 order-1 md:order-2">

					{/* Speech Bubble */}
					<div className="relative z-20 translate-y-4 translate-x-12 md:translate-x-20">
						<div className="bg-blue-500 text-white rounded-[2rem] px-6 py-4 text-xl md:text-2xl font-bold shadow-xl relative transform rotate-3 animate-float-slow max-w-[280px] text-center">
							<span className="absolute -top-6 left-0 text-zinc-400 text-lg font-['var(--font-caveat)'] transform -rotate-3">Harish</span>
							If this made sense, let's chat!
							{/* Pointy bit */}
							<div className="absolute -bottom-2 left-6 w-6 h-6 bg-blue-500 transform rotate-45" />
						</div>
					</div>

					{/* Avatar */}
					<div className="relative w-[300px] h-[380px] md:w-[380px] md:h-[450px] z-10">
						<Image
							src={AVATARS.WAVE}
							alt="Harish Waving"
							fill
							className="object-contain"
							priority
						/>
					</div>

					{/* Actions Container */}
					<div className="flex flex-col items-center gap-6 mt-[-20px] relative z-20 w-full pl-8 md:pl-0">

						{/* Connecting Arrows */}
						<div className="flex gap-8 opacity-40 text-zinc-400 mb-2">
							<HandDrawnArrow type="default" width={30} height={40} rotation={170} />
							<HandDrawnArrow type="default" width={30} height={40} rotation={190} />
							<HandDrawnArrow type="default" width={30} height={40} rotation={180} />
						</div>

						<div className="flex flex-col md:flex-row items-center gap-6">
							{/* Email Button - Sketchy Oval */}
							<div className="flex flex-col items-center gap-2">
								<button
									onClick={copyToClipboard}
									className="group relative px-8 py-4 bg-[#1a1a1a] text-white transition-transform hover:scale-105 active:scale-95 flex items-center gap-3 text-2xl font-bold shadow-lg"
									style={{
										borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
										border: "3px solid #1a1a1a"
									}}
								>
									<span className="tracking-wide font-['Press_Start_2P'] text-sm md:text-base mr-2" style={{ fontFamily: 'sans-serif' }}>{email}</span>
									{copied ? <Check size={24} className="text-green-400" /> : <Copy size={24} className="text-zinc-400 group-hover:text-white" />}
								</button>
								<span className="text-sm text-zinc-400 italic font-['var(--font-caveat)']">tap to copy</span>
							</div>

							{/* Resume Button - Boxy Sketch */}
							<a
								href="/resume.pdf"
								download
								className="group relative px-8 py-3 bg-white text-zinc-900 border-[3px] border-zinc-900 hover:bg-zinc-50 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 text-2xl font-bold rounded-lg transform -rotate-2"
							>
								<FileText size={24} />
								My Resume
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactSection;
