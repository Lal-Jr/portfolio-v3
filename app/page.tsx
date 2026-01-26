"use client";
import { useRef, useState } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

import Hero from "@/components/Hero";
import ProjectShelf from "@/components/ProjectShelf";
import WorkExperience from "@/components/WorkExperience";
import QuestWall from "@/components/QuestWall";
import ContactSection from "@/components/ContactSection";

export default function Home() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={containerRef} className="relative w-full" style={{ scrollBehavior: 'smooth' }}>
			<Hero />
			<ProjectShelf />
			<WorkExperience />
			<QuestWall />
			<ContactSection />
		</div>
	);
}
