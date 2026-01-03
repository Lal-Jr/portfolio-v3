"use client";
import { useRef } from "react";
import { useScroll } from "framer-motion";

import WrapperOverlay from "@/components/WrapperOverlay";
import ContentGrid from "@/components/ContentGrid";

export default function Home() {
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});
	return (
		<div ref={containerRef} className="relative h-[600vh]">
			<WrapperOverlay scrollYProgress={scrollYProgress} />
			<ContentGrid scrollYProgress={scrollYProgress} />
		</div>
	);
}
