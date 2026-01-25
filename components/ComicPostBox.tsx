"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Copy, Check } from "lucide-react";
import Image from "next/image";

const ComicPostBox = () => {
	const [copied, setCopied] = useState(false);
	const email = "arjragh@iu.edu";

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
		<div className="relative min-h-[60vh] w-full bg-transparent overflow-hidden flex items-center justify-center p-6 md:p-10 font-['var(--font-caveat)'] text-white border-t-4 border-white/5">
			<div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

				{/* LEFT COLUMN: PHILOSOPHY */}
				<div className="flex flex-col space-y-8">
					<div className="space-y-2">
						<h3 className="text-2xl text-zinc-500 italic font-medium">My Philosophy</h3>
						<div className="text-3xl md:text-4xl leading-relaxed font-bold tracking-tight">
							In short, I'm someone who <br />
							<span className="relative inline-block px-1">
								<span className="relative z-10">enjoys working in messy,</span>
								<motion.span
									initial={{ scaleX: 0 }}
									whileInView={{ scaleX: 1 }}
									className="absolute inset-y-1 left-0 right-0 bg-green-500 opacity-60 -rotate-1 origin-left -z-0"
									transition={{ duration: 0.8, delay: 0.2 }}
								/>
							</span>{" "}
							<br />
							<span className="relative inline-block px-1">
								<span className="relative z-10">complex spaces</span>
								<motion.span
									initial={{ scaleX: 0 }}
									whileInView={{ scaleX: 1 }}
									className="absolute inset-y-1 left-0 right-0 bg-green-500 opacity-60 rotate-1 origin-left -z-0"
									transition={{ duration: 0.8, delay: 0.4 }}
								/>
							</span>{" "}
							and making <br />
							them clearer and more human.
						</div>
					</div>

					<div className="text-3xl md:text-3xl leading-relaxed font-bold tracking-tight opacity-90">
						I do that by{" "}
						<span className="relative inline-block px-1">
							<span className="relative z-10">experimenting to</span>
							<motion.span
								initial={{ scaleX: 0 }}
								whileInView={{ scaleX: 1 }}
								className="absolute inset-y-1 left-0 right-0 bg-green-500 opacity-60 -rotate-1 origin-left -z-0"
								transition={{ duration: 0.8, delay: 0.6 }}
							/>
						</span>{" "}
						<br />
						learn,{" "}
						<span className="relative inline-block px-1">
							<span className="relative z-10">shaping clear stories</span>
							<motion.span
								initial={{ scaleX: 0 }}
								whileInView={{ scaleX: 1 }}
								className="absolute inset-y-1 left-0 right-0 bg-green-500 opacity-60 rotate-1 origin-left -z-0"
								transition={{ duration: 0.8, delay: 0.8 }}
							/>
						</span>{" "}
						<br />
						that help people align, and <br />
						<span className="relative inline-block px-1">
							<span className="relative z-10">designing systems with care</span>
							<motion.span
								initial={{ scaleX: 0 }}
								whileInView={{ scaleX: 1 }}
								className="absolute inset-y-1 left-0 right-0 bg-green-500 opacity-60 -rotate-1 origin-left -z-0"
								transition={{ duration: 0.8, delay: 1.0 }}
							/>
						</span>{" "}
						<br />
						for the small details that quietly <br />
						shape how something feels.
					</div>
				</div>

				{/* RIGHT COLUMN: AVATAR & ACTIONS */}
				<div className="flex flex-col items-center relative gap-8">
					{/* Speech Bubble */}
					<div className="relative self-end mr-4 md:mr-12 mb-4">
						<div className="absolute -top-6 left-4 text-zinc-500 text-xl font-medium">Arjun</div>
						<div className="bg-blue-600 text-white rounded-[40px] px-8 py-4 text-2xl font-bold shadow-lg relative min-w-[280px] text-center">
							If this made sense, let's chat!
							{/* Bubble point */}
							<div className="absolute -bottom-2 left-8 w-6 h-6 bg-blue-600 rotate-45 rounded-sm" />
						</div>
					</div>

					{/* Avatar */}
					<div className="relative w-full aspect-[4/5] max-w-[400px]">
						<Image
							src="/avatars/IMG_7730.PNG"
							alt="Arjun Avatar"
							fill
							className="object-contain"
							priority
						/>
					</div>

					{/* Buttons Section */}
					<div className="flex flex-col items-center gap-6 mt-4">
						{/* Arrows decoration */}
						<div className="flex gap-4 opacity-30">
							<span className="text-2xl transform rotate-180">↑</span>
							<span className="text-2xl transform rotate-180">↑</span>
							<span className="text-2xl transform rotate-180">↑</span>
						</div>

						{/* Email Button */}
						<div className="flex flex-col items-center gap-2">
							<button
								onClick={copyToClipboard}
								className="group relative px-8 py-3 rounded-full border-2 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all flex items-center gap-3 text-2xl font-bold"
							>
								{email}
								{copied ? <Check className="text-green-500" size={24} /> : <Copy className="text-white/40 group-hover:text-white" size={24} />}
							</button>
							<span className="text-lg text-zinc-500 italic">tap to copy</span>
						</div>

						{/* Resume Button */}
						<a
							href="/resume.pdf"
							download
							className="group px-10 py-4 rounded-full border-2 border-white bg-white text-black hover:bg-zinc-200 transition-all flex items-center gap-4 text-2xl font-bold shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
						>
							<FileText size={28} />
							My Resume
						</a>
					</div>
				</div>
			</div>
		</div>

	);
};

export default ComicPostBox;
