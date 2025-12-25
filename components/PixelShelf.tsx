"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const books = [
	{
		id: 1,
		title: "The Old Glitch",
		content: "The sky was the color of a crashed OS...",
		color: "#e63946",
		h: "h-96",
		w: "w-16",
		rotate: 5,
	},
	{
		id: 2,
		title: "8-Bit Dreams",
		content: "In a world of squares, he was a circle.",
		color: "#2a9d8f",
		h: "h-64",
		w: "w-18",
		rotate: 0,
	},
	{
		id: 3,
		title: "Root Access",
		content: "Password: ********. Access Denied.",
		color: "#f4a261",
		h: "h-56",
		w: "w-14",
		rotate: 5,
	},
	{
		id: 4,
		title: "Buffer Over",
		content: "Overflowing with pixelated emotions.",
		color: "#8d99ae",
		h: "h-72",
		w: "w-24",
	},
	{
		id: 5,
		title: "The Old Glitch",
		content: "The sky was the color of a crashed OS...",
		color: "#e63946",
		h: "h-96",
		w: "w-16",
		rotate: -5,
	},
	{
		id: 6,
		title: "8-Bit Dreams",
		content: "In a world of squares, he was a circle.",
		color: "#2a9d8f",
		h: "h-64",
		w: "w-18",
		rotate: 0,
	},
	{
		id: 7,
		title: "Root Access",
		content: "Password: ********. Access Denied.",
		color: "#f4a261",
		h: "h-56",
		w: "w-14",
		rotate: 0,
	},
	{
		id: 8,
		title: "Buffer Over",
		content: "Overflowing with pixelated emotions.",
		color: "#8d99ae",
		h: "h-72",
		w: "w-24",
		rotate: 0,
	},
];

export default function PixelShelf() {
	const [selectedBook, setSelectedBook] = useState(null);

	return (
		<div className="flex flex-col items-center justify-center p-4">
			{/* The Shelf - Custom wood texture via shadow */}
			<div className="relative flex items-end px-20 pt-32 pb-4 bg-[#3e2723] border-b-[24px] border-[#2d1b18] shadow-[0_30px_60px_rgba(0,0,0,0.3)] rounded-lg scale-110 gap-1">
				{books.map((book) => (
					<motion.div
						key={book.id}
						layoutId={`book-${book.id}`}
						onClick={() => setSelectedBook(book)}
						className={`relative cursor-pointer border-t-4 border-x-4 border-black/30 ${book.h} ${book.w} mx-0.5`}
						style={{
							backgroundColor: book.color,
							rotate: book.rotate || 0, // Apply the rotation here
							transformOrigin: "bottom center", // Ensure they lean from the base
						}}
						whileHover={{
							y: -12,
							scale: 1.05,
							rotate: 0, // Straighten up when hovered
							zIndex: 10,
						}}
						whileTap={{ scale: 0.95 }}
					>
						{/* Spine Details */}
						<div className="absolute top-2 left-0 right-0 h-1 bg-black/20" />
						<div className="absolute bottom-4 left-0 right-0 h-4 bg-black/10" />
					</motion.div>
				))}
			</div>

			{/* Animation Layer */}
			<AnimatePresence>
				{selectedBook && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setSelectedBook(null)}
							className="absolute inset-0 bg-black/80 backdrop-blur-md"
						/>

						{/* The Open Book Container */}
						<motion.div
							layoutId={`book-${selectedBook.id}`}
							className="relative flex w-full max-w-4xl h-[500px] z-10 shadow-[25px_25px_0px_rgba(0,0,0,0.4)]"
							initial={{ rotateY: -90, opacity: 0 }}
							animate={{ rotateY: 0, opacity: 1 }}
							exit={{ rotateY: 90, opacity: 0 }}
							transition={{
								type: "spring",
								damping: 20,
								stiffness: 100,
							}}
						>
							{/* LEFT PAGE (Cover/Title) */}
							<div className="flex-1 bg-[#fdfaf3] border-y-8 border-l-8 border-black p-10 flex flex-col justify-between items-center text-center relative overflow-hidden">
								<div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent" />
								<div className="border-2 border-black/10 p-4 h-full w-full flex flex-col justify-center items-center">
									<h3 className="text-xs uppercase tracking-[0.2em] mb-4 text-gray-400 font-sans">
										Special Edition
									</h3>
									<h2 className="text-4xl font-black text-gray-900 mb-2 leading-tight">
										{selectedBook.title}
									</h2>
									<div className="w-12 h-1 bg-black my-4" />
									<p className="text-sm italic text-gray-600">
										by {selectedBook.author}
									</p>
								</div>
							</div>

							{/* THE GUTTER (The Fold) */}
							<div className="w-4 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 border-y-8 border-black shadow-inner relative z-20" />

							{/* RIGHT PAGE (Content) */}
							<div className="flex-1 bg-[#fdfaf3] border-y-8 border-r-8 border-black p-12 relative overflow-hidden">
								<div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/10 to-transparent" />

								<button
									onClick={() => setSelectedBook(null)}
									className="absolute top-4 right-4 text-xs font-sans font-bold hover:text-red-600 uppercase tracking-widest"
								>
									Close [×]
								</button>

								<div className="prose prose-sm text-gray-800 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-black">
									<p className="leading-relaxed text-lg">
										{selectedBook.content}
									</p>
									<p className="mt-4 leading-relaxed text-lg">
										The pixels danced across the screen in a
										rhythmic pattern, echoing the sound of
										the cooling fan humming in the
										background.
									</p>
								</div>

								<div className="absolute bottom-6 right-10 text-xs font-mono text-gray-400">
									Pg. 124
								</div>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}
