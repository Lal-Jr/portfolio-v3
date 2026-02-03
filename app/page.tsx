"use client";
import { useRef } from "react";

import Hero from "@/components/Hero";
import ProjectShelf from "@/components/ProjectShelf";
import StorySection from "@/components/StorySection";
import ThoughtProcessSection from "@/components/ThoughtProcessSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={containerRef} className="relative w-full" style={{ scrollBehavior: 'smooth' }}>
			<Hero />
			<ProjectShelf />
			<ThoughtProcessSection />
			<StorySection />
			<ContactSection />
		</div>
	);
}
