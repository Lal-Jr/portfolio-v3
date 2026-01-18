"use client";
import { useRef, useState } from "react";
import { useScroll } from "framer-motion";

import WrapperOverlay from "@/components/WrapperOverlay";
import ContentGrid from "@/components/ContentGrid";
import PacmanLoader from "@/components/Loader";
import GameScene from "@/components/Game/GameScene";
import GameDialogue from "@/components/Game/GameDialogue";

export default function Home() {
	const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	return (
		<div ref={containerRef} className="relative h-[800vh] w-full" style={{ scrollBehavior: 'smooth' }}>
			<PacmanLoader onComplete={() => setIsLoaded(true)} />
            
            {/* Game background layer */}
            <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
                <GameScene scrollYProgress={scrollYProgress} />
            </div>
            
            {/* Content layers */}
			<WrapperOverlay scrollYProgress={scrollYProgress} />
			<ContentGrid scrollYProgress={scrollYProgress} />
            
            {/* Dialogue overlay on top */}
            <GameDialogue scrollYProgress={scrollYProgress} />
		</div>
	);
}
