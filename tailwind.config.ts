import type { Config } from "tailwindcss";

const config: Config = {
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-outfit)", "var(--font-inter)", "sans-serif"],
				handwriting: ["var(--font-caveat)", "cursive"],
				pixel: ["var(--font-press-start)", "monospace"],
			},
			keyframes: {
				"pacman-top": {
					"0%, 100%": { transform: "rotate(-45deg)" },
					"50%": { transform: "rotate(0deg)" },
				},
				"pacman-bottom": {
					"0%, 100%": { transform: "rotate(45deg)" },
					"50%": { transform: "rotate(0deg)" },
				},
			},
			animation: {
				"pacman-top": "pacman-top 0.25s ease-in-out infinite",
				"pacman-bottom": "pacman-bottom 0.25s ease-in-out infinite",
			},
		},
	},
};
export default config;
