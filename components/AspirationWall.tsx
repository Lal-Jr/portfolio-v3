import React from "react";
import { motion } from "framer-motion";

const ASPIRATIONS = [
	{ text: "Master WebGL & Shaders", color: "#fef08a", tilt: "-2deg" },
	{ text: "Launch a SaaS Startup", color: "#bae6fd", tilt: "3deg" },
	{ text: "Speak at React Conf", color: "#bbf7d0", tilt: "-1deg" },
	{ text: "Build a Digital Garden", color: "#fecdd3", tilt: "2deg" },
	{ text: "Lead a Creative Team", color: "#ddd6fe", tilt: "-3deg" },
	{ text: "Contribute to Three.js", color: "#fed7aa", tilt: "1deg" },
];

export default function AspirationWall() {
	return (
		<section className="relative w-full flex items-center justify-center py-20 px-10 overflow-hidden">
			<div className="max-w-6xl w-full relative z-10 flex flex-col items-center">
				{/* Notes Grid - centered within the container */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 w-full justify-items-center">
					{ASPIRATIONS.map((note, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{
								delay: i * 0.1,
								type: "spring",
								stiffness: 100,
							}}
							whileHover={{
								scale: 1.1,
								rotate: 0,
								zIndex: 50,
								transition: { duration: 0.2 },
							}}
							// aspect-square and w-64/h-64 keep the notes uniform
							className="relative w-64 h-64 p-8 flex items-center justify-center text-center cursor-pointer"
							style={{
								backgroundColor: note.color,
								rotate: note.tilt,
								border: "4px solid black",
								boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)",
							}}
						>
							{/* Tape Detail */}
							<div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-10 bg-white/60 border-2 border-black/5 backdrop-blur-sm rotate-1 shadow-sm"></div>

							<p className="font-black text-xl uppercase tracking-tight leading-none text-black">
								{note.text}
							</p>

							{/* Comic Corner Marker */}
							<div className="absolute bottom-3 right-3 text-sm font-black opacity-30 italic">
								OBJ_{i + 1}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
