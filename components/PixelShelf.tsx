"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Ultra-snappy physics
const snapTransition = {
	type: "spring",
	stiffness: 500,
	damping: 38,
	mass: 0.6,
};

const books = [
	{
		id: 1,
		title: "The Old Glitch",
		content: "The sky was the color of a crashed OS...",
		color: "#e63946",
		h: "h-64",
		w: "w-12",
		rotate: 5,
		author: "A. Kernel",
	},
	{
		id: 2,
		title: "8-Bit Dreams",
		content: "In a world of squares, he was a circle.",
		color: "#2a9d8f",
		h: "h-48",
		w: "w-14",
		rotate: 0,
		author: "Pixel Pete",
	},
	{
		id: 3,
		title: "Root Access",
		content: "Password: ********. Access Denied.",
		color: "#f4a261",
		h: "h-40",
		w: "w-10",
		rotate: -4,
		author: "Sudo",
	},
	{
		id: 4,
		title: "Buffer Over",
		content: "Overflowing with pixelated emotions.",
		color: "#8d99ae",
		h: "h-56",
		w: "w-16",
		rotate: 2,
		author: "Stack",
	},
	{
		id: 5,
		title: "Logic Gate",
		content: "If true then heart, else null.",
		color: "#457b9d",
		h: "h-60",
		w: "w-12",
		rotate: -3,
		author: "Boolean",
	},
	{
		id: 6,
		title: "Hard Drive",
		content: "Deep storage for shallow memories.",
		color: "#1d3557",
		h: "h-52",
		w: "w-14",
		rotate: 0,
		author: "SATA",
	},
];

export default function PixelShelf() {
	const [selectedBook, setSelectedBook] = useState(null);

	// Close on Escape key
	useEffect(() => {
		const handleKeyDown = (e) =>
			e.key === "Escape" && setSelectedBook(null);
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-[#f0f0f0] p-4 font-serif">
			{/* The Shelf */}
			<div className="relative flex items-end px-12 pb-3 bg-[#3e2723] border-b-[20px] border-[#2d1b18] rounded-sm gap-2 shadow-2xl scale-190">
				{books.map((book) => (
					<motion.div
						key={book.id}
						layoutId={`book-${book.id}`}
						onClick={() => setSelectedBook(book)}
						className={`relative cursor-pointer ${book.h} ${book.w} origin-bottom border-t-2 border-black/10`}
						style={{
							backgroundColor: book.color,
							rotate: book.rotate,
						}}
						whileHover={{
							y: -15,
							rotate: 0,
							scale: 1.05,
							transition: { duration: 0.1 },
						}}
					>
						<div className="absolute top-2 left-0 right-0 h-1 bg-black/20" />
						<div className="absolute bottom-4 left-0 right-0 h-4 bg-black/10" />
					</motion.div>
				))}
			</div>

			<AnimatePresence>
				{selectedBook && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
						{/* Overlay */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{
								duration: 0.05, // Only 3-5 frames of animation
								ease: "linear",
							}}
							onClick={() => setSelectedBook(null)}
							className="absolute inset-0 bg-black/80"
							style={{ pointerEvents: "auto" }} // Ensures immediate click capture
						/>

						{/* The Open Book - Massive Size */}
						<motion.div
							layoutId={`book-${selectedBook.id}`}
							transition={snapTransition}
							className="relative flex w-full max-w-6xl h-[80vh] z-10 shadow-[40px_40px_0px_rgba(0,0,0,0.3)] bg-white border-[12px] border-black overflow-hidden"
						>
							{/* LEFT PAGE */}
							<div className="flex-1 bg-[#fdfaf3] p-8 md:p-16 flex flex-col justify-center items-center text-center border-r-2 border-black/20">
								<h3 className="text-xs uppercase tracking-[0.3em] mb-6 text-gray-400 font-sans">
									Special Edition
								</h3>
								<h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-none mb-6 italic tracking-tight">
									{selectedBook.title}
								</h2>
								<div className="w-20 h-2 bg-black mb-6" />
								<p className="text-xl text-gray-600 uppercase tracking-widest font-sans">
									{selectedBook.author}
								</p>
							</div>

							{/* CENTER GUTTER */}
							<div className="w-6 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 shadow-inner z-20" />

							{/* RIGHT PAGE */}
							<div className="flex-1 bg-[#fdfaf3] p-8 md:p-16 relative overflow-y-auto">
								<button
									onClick={() => setSelectedBook(null)}
									className="absolute top-6 right-8 text-sm font-black font-sans hover:text-red-500 transition-colors"
								>
									CLOSE [X]
								</button>

								<div className="max-w-prose">
									<p className="text-2xl md:text-3xl leading-relaxed text-gray-800 first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left">
										{selectedBook.content}
									</p>
									<p className="mt-8 text-xl md:text-2xl leading-relaxed text-gray-700">
										The pixels danced across the screen in a
										rhythmic pattern, echoing the sound of
										the cooling fan humming in the
										background. Every frame was a memory,
										every glitch a story untold.
									</p>
								</div>

								<div className="mt-12 text-sm font-mono text-gray-400">
									SECTION II • PAGE 124
								</div>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}
