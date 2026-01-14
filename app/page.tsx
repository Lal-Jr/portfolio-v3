"use client";
import { useRef } from "react";
import { useScroll } from "framer-motion";

import WrapperOverlay from "@/components/WrapperOverlay";
import ContentGrid from "@/components/ContentGrid";
import BlackOverlay from "@/components/BlackOverlay";
import PacmanLoader from "@/components/Loader";

export default function Home() {
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	return (
		<div ref={containerRef} className="relative h-[1200vh] w-full">
			<PacmanLoader />
			<WrapperOverlay scrollYProgress={scrollYProgress} />
			<ContentGrid scrollYProgress={scrollYProgress} />
			{/* <BlackOverlay scrollYProgress={scrollYProgress} /> */}
		</div>
	);
}
