"use client";
import { useRef, useState } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

import Hero from "@/components/Hero";

export default function Home() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	return (
		<div ref={containerRef} className="relative h-[900vh] w-full" style={{ scrollBehavior: 'smooth' }}>
			<Hero />
		</div>
	);
}
