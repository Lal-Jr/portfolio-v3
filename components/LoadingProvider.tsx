"use client";

import React, { useState, useSyncExternalStore } from "react";
import PacmanLoader from "./Loader";
import HeroSkeleton from "./HeroSkeleton";
import { INTRO_SEEN_KEY } from "@/constants";

const INTRO_SEEN_EVENT = "intro-seen-change";

// The blog is a separate app, so leaving to /blog and coming back is a full
// document load. The intro is a first-impression device, so it plays once per
// tab session; later loads (e.g. returning from the blog) go straight to content.
const subscribe = (cb: () => void) => {
	window.addEventListener(INTRO_SEEN_EVENT, cb);
	return () => window.removeEventListener(INTRO_SEEN_EVENT, cb);
};

const getSnapshot = () => {
	try {
		return sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
	} catch {
		return false; // storage blocked (private mode etc.): just play the intro
	}
};

// null on the server / during hydration so first client render matches the server.
const getServerSnapshot = () => null;

const markIntroSeen = () => {
	try {
		sessionStorage.setItem(INTRO_SEEN_KEY, "1");
	} catch {}
	window.dispatchEvent(new Event(INTRO_SEEN_EVENT));
};

export default function LoadingProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const introSeen = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	// Only ease in slowly when the intro just played; a repeat load should feel instant.
	const [introPlayed, setIntroPlayed] = useState(false);

	if (introSeen) {
		// Returning visit: no fade from opacity 0 (that reads as a black flash).
		return introPlayed ? (
			<div className="animate-in fade-in duration-1000">{children}</div>
		) : (
			<>{children}</>
		);
	}

	if (introSeen === null) {
		// Server HTML / pre-hydration. The inline script in layout.tsx sets
		// <html data-intro="seen"> before first paint for returning visitors, so
		// they see the skeleton while first-timers keep the black intro backdrop.
		return (
			<>
				<div className="fixed inset-0 z-[9999] bg-black [html[data-intro=seen]_&]:hidden" />
				<div className="hidden [html[data-intro=seen]_&]:block">
					<HeroSkeleton />
				</div>
			</>
		);
	}

	return (
		<div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
			<PacmanLoader
				onComplete={() => {
					setIntroPlayed(true);
					markIntroSeen();
				}}
			/>
		</div>
	);
}
