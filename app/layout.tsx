import type { Metadata } from "next";
import { Press_Start_2P, Inter, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import LoadingProvider from "@/components/LoadingProvider";
import GlobalBackground from "@/components/GlobalBackground";

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
	title: "The Hero’s Journey",
	description: "Chapter 1 : How he became who he is.",
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
                bg-[#050505] font-sans antialiased text-white
                min-h-screen max-w-[100vw] overflow-x-hidden`}
			>
				{/* All client-side loading logic lives inside this provider */}
				<LoadingProvider>
					<GlobalBackground>
						<main className="relative min-h-screen w-full max-w-full flex flex-col">
							{children}
						</main>
					</GlobalBackground>
				</LoadingProvider>
			</body>
		</html>
	);
}
