"use client";
import { useRef } from "react";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const ProjectShelf = dynamic(() => import("@/components/ProjectShelf"));
const StorySection = dynamic(() => import("@/components/StorySection"));
const ThoughtProcessSection = dynamic(() => import("@/components/ThoughtProcessSection"));
const ContactSection = dynamic(() => import("@/components/ContactSection"));
const WorkspaceSection = dynamic(() => import("@/components/WorkspaceSection"));

export default function Home() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={containerRef} className="relative w-full" style={{ scrollBehavior: 'smooth' }}>
			<Hero />
			<ProjectShelf />
			<ThoughtProcessSection />
			<StorySection />
			<WorkspaceSection />
			<ContactSection />
		</div>
	);
}
