import React, { useState } from "react";
import {
	Github,
	Instagram,
	Linkedin,
	Download,
	ArrowBigRight,
} from "lucide-react";

const RealisticComicMailbox = () => {
	const [isOpen, setIsOpen] = useState(false);

	const socials = [
		{
			icon: <Github size={20} />,
			label: "Github",
			color: "bg-zinc-800",
			url: "#",
		},
		{
			icon: <Instagram size={20} />,
			label: "Insta",
			color: "bg-rose-500",
			url: "#",
		},
		{
			icon: <Linkedin size={20} />,
			label: "Linked",
			color: "bg-blue-600",
			url: "#",
		},
	];

	return (
		<div className="flex flex-col items-center justify-center p-12">
			<div className="relative group">
				{/* SOCIAL LINKS - Emerging from behind */}
				<div
					className={`absolute left-64 top-12 flex flex-col gap-2 transition-all duration-500 ease-out ${
						isOpen
							? "opacity-100 translate-x-12"
							: "opacity-0 translate-x-0 pointer-events-none"
					}`}
				>
					{socials.map((social, i) => (
						<a
							key={i}
							href={social.url}
							className={`${social.color} flex items-center gap-3 px-4 py-2 border-[3px] border-black text-white font-black italic uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform`}
						>
							{social.icon} {social.label}
						</a>
					))}
				</div>

				{/* MAILBOX BODY (3D Perspective) */}
				<div className="relative w-64 h-72">
					{/* Side Panel (Provides depth) */}
					<div className="absolute right-[-15px] top-[10px] w-[30px] h-[95%] bg-red-700 border-[5px] border-black rounded-tr-[100px] skew-y-[10deg] -z-10" />

					{/* Top Curve (Highlight) */}
					<div className="absolute top-0 left-0 w-full h-full bg-red-600 border-[6px] border-black rounded-t-[120px] shadow-[inset_-15px_15px_0px_rgba(255,255,255,0.2)]">
						{/* Front Face "Door" */}
						<div className="mt-[20%] mx-auto w-[85%] h-[70%] border-[4px] border-black rounded-t-[100px] bg-red-500 shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)] flex flex-col items-center">
							{/* Mail Slot */}
							<div className="mt-8 w-[70%] h-4 bg-black rounded-full" />

							{/* Handle */}
							<div className="mt-auto mb-6 w-12 h-6 bg-zinc-800 border-4 border-black rounded-t-lg shadow-[0px_4px_0px_black]" />
						</div>
					</div>

					{/* THE LEVER (Flag) - Highly Detailed */}
					<div
						onClick={() => setIsOpen(!isOpen)}
						className="absolute -right-8 top-28 cursor-pointer z-30"
					>
						{/* Pivot Point */}
						<div className="w-8 h-8 bg-zinc-900 border-4 border-black rounded-full absolute -left-4 -top-2 z-10" />

						{/* The Arm */}
						<div
							className={`w-24 h-4 bg-zinc-700 border-4 border-black transition-all duration-500 origin-left ${
								isOpen
									? "-rotate-90 shadow-[-4px_0px_0px_black]"
									: "rotate-0 shadow-[0px_4px_0px_black]"
							}`}
						/>

						{/* The Metal Flag */}
						<div
							className={`w-12 h-14 bg-orange-500 border-4 border-black absolute right-[-10px] top-[-44px] transition-all duration-500 ${
								isOpen ? "translate-y-[-40px]" : "translate-y-0"
							}`}
						>
							<div className="w-full h-1/2 bg-orange-400" />{" "}
							{/* Highlight */}
							<ArrowBigRight
								className={`absolute top-2 left-1 transition-transform ${
									isOpen ? "rotate-90" : ""
								}`}
								size={24}
							/>
						</div>
					</div>
				</div>

				{/* THE POST (Base) */}
				<div className="relative w-16 h-32 mx-auto">
					{/* Main Pillar */}
					<div className="w-full h-full bg-zinc-800 border-[6px] border-black shadow-[10px_0px_0px_rgba(0,0,0,0.2)]" />
					{/* Ground Shadow */}
					<div className="absolute -bottom-4 -left-12 w-40 h-6 bg-black/20 rounded-[100%] blur-sm -z-20" />
				</div>
			</div>

			{/* RESUME BUTTON */}
			<div className="mt-12 overflow-hidden h-20">
				<a
					href="/resume.pdf"
					download
					className={`group flex items-center gap-4 px-10 py-5 bg-emerald-400 border-[5px] border-black font-black text-2xl italic uppercase transition-all duration-500 transform ${
						isOpen
							? "translate-y-0 opacity-100"
							: "translate-y-20 opacity-0"
					} shadow-[8px_8px_0px_black] hover:bg-emerald-300 active:shadow-none active:translate-x-1 active:translate-y-1`}
				>
					<Download size={32} strokeWidth={3} />
					Get Resume
				</a>
			</div>

			{!isOpen && (
				<p className="mt-4 font-black uppercase text-zinc-500 tracking-widest animate-pulse">
					Pull Flag to Access
				</p>
			)}
		</div>
	);
};

export default RealisticComicMailbox;
