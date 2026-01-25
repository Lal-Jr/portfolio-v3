import type { Metadata } from "next";
import { Press_Start_2P, Inter, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import LoadingProvider from "@/components/LoadingProvider";

const pressStart = Press_Start_2P({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-press-start",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const outfit = Outfit({
	subsets: ["latin"],
	variable: "--font-outfit",
});

const caveat = Caveat({
	subsets: ["latin"],
	variable: "--font-caveat",
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
		<html lang="en" className="h-full">
			<body
				className={`${pressStart.variable} ${inter.variable} ${outfit.variable} ${caveat.variable} 
                bg-rpg-background bg-opacity-20 font-sans antialiased text-rpg-black
                min-h-screen max-w-[100vw] overflow-x-hidden`}
			>
				{/* All client-side loading logic lives inside this provider */}
				<LoadingProvider>
					<main className="relative min-h-screen w-full max-w-full flex flex-col">
						{children}
					</main>
				</LoadingProvider>
			</body>
		</html>
	);
}
