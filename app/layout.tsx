import type { Metadata } from "next";
import { Press_Start_2P, Inter } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-press-start",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Chapter 1 : The Hero’s Journey",
	description: "The Hero's Journey till now.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${pressStart.variable} ${inter.variable} bg-rpg-background bg-opacity-20 font-sans antialiased text-rpg-black`}
			>
				{/* Background Texture Overlay */}
				<div
					className="fixed inset-0 opacity-5 pointer-events-none z-[-1]"
					style={{
						backgroundImage:
							"radial-gradient(#2D2D2D 1px, transparent 1px)",
						backgroundSize: "20px 20px",
					}}
				/>
				<main className="max-w-7xl mx-auto space-y-12">{children}</main>
			</body>
		</html>
	);
}
