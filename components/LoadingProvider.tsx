"use client";

import React, { useState } from "react";
import PacmanLoader from "./Loader";

export default function LoadingProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [showContent, setShowContent] = useState(false);

	return (
		<>
			{!showContent ? (
				<div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
					{/* We pass a callback to the loader */}
					<PacmanLoader onComplete={() => setShowContent(true)} />
				</div>
			) : (
				<div className="animate-in fade-in duration-1000">
					{children}
				</div>
			)}
		</>
	);
}
