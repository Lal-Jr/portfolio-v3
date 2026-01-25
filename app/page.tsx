"use client";
import { useRef, useState } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

import Hero from "@/components/Hero";
import PixelProjectShelf from "@/components/PixelShelf";
import WorkRoadmap from "@/components/PixelRoadmap";
import PixelAspirationWall from "@/components/AspirationWall";
import ComicPostBox from "@/components/ComicPostBox";

export default function Home() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={containerRef} className="relative w-full" style={{ scrollBehavior: 'smooth' }}>
			<Hero />
			<PixelProjectShelf />
			<WorkRoadmap />
			<PixelAspirationWall />
			<ComicPostBox />
		</div>
	);
}
