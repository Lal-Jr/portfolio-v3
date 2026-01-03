import { motion, useTransform } from "framer-motion";
// Defined the interface for the props
interface WrapperOverlayProps {
	scrollYProgress: MotionValue<number>;
}

export default function WrapperOverlay({
	scrollYProgress,
}: WrapperOverlayProps) {
	// 1. Tearing Animations with "Resistance"
	const leftX = useTransform(
		scrollYProgress,
		[0, 0.1, 0.5],
		["0%", "-1%", "-100%"]
	);
	const leftY = useTransform(scrollYProgress, [0, 0.5], ["0%", "6%"]);
	const leftRotate = useTransform(scrollYProgress, [0, 0.5], [0, -12]);

	const rightX = useTransform(
		scrollYProgress,
		[0, 0.1, 0.5],
		["0%", "1%", "100%"]
	);
	const rightY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-6%"]);
	const rightRotate = useTransform(scrollYProgress, [0, 0.5], [0, 12]);

	// 1. Create a transform that maps scroll progress to CSS pointer events
	// At 0% to 45% scroll, it's 'auto' (blocking). At 50%, it becomes 'none'.
	const overlayPointerEvents = useTransform(
		scrollYProgress,
		[0, 0.45, 0.5],
		["auto", "auto", "none"]
	);
	return (
		<div
			style={{ pointerEvents: overlayPointerEvents }} // Toggle pointer events here
			className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
		>
			{/* LEFT PANEL */}
			<motion.div
				style={{ x: leftX, y: leftY, rotate: leftRotate }}
				className="absolute top-0 left-0 w-1/2 h-full bg-white shadow-2xl flex items-center justify-end"
			>
				{/* TEXT ON LEFT PANEL */}
				<h1 className="text-red-600 font-black text-6xl md:text-8xl uppercase mr-8">
					Chapter 1 :
				</h1>

				{/* Jagged Edge */}
				<div
					className="absolute right-[-20px] top-0 h-full w-[40px] bg-white"
					style={{
						clipPath:
							"polygon(0% 0%, 100% 0%, 80% 5%, 100% 10%, 85% 15%, 100% 20%, 80% 25%, 100% 30%, 85% 35%, 100% 40%, 80% 45%, 100% 50%, 85% 55%, 100% 60%, 80% 65%, 100% 70%, 85% 75%, 100% 80%, 80% 85%, 100% 90%, 85% 95%, 100% 100%, 0% 100%)",
					}}
				/>
			</motion.div>

			{/* RIGHT PANEL */}
			<motion.div
				style={{ x: rightX, y: rightY, rotate: rightRotate }}
				className="absolute top-0 right-0 w-1/2 h-full bg-white shadow-2xl flex items-center justify-start"
			>
				{/* Jagged Edge Detail */}
				<div
					className="absolute left-[-20px] top-0 h-full w-[40px] bg-white"
					style={{
						clipPath:
							"polygon(100% 0%, 0% 0%, 20% 5%, 0% 10%, 15% 15%, 0% 20%, 20% 25%, 0% 30%, 15% 35%, 0% 40%, 20% 45%, 0% 50%, 15% 55%, 0% 60%, 20% 65%, 0% 70%, 15% 75%, 0% 80%, 20% 85%, 0% 90%, 15% 95%, 0% 100%, 100% 100%)",
					}}
				/>

				{/* TEXT ON RIGHT PANEL */}
				<h1 className="text-red-600 font-black text-6xl md:text-8xl uppercase ml-8">
					The Hero’s Journey
				</h1>
			</motion.div>

			{/* ... SCROLL HINT ... */}
			<motion.div
				style={{
					opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
				}}
				className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 text-sm font-bold tracking-widest animate-bounce"
			>
				SCROLL TO DIVE IN
			</motion.div>
		</div>
	);
}
