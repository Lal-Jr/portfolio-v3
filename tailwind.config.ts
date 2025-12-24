/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			boxShadow: {
				// The thick, offset black shadow common in comics
				comic: "8px 8px 0px 0px rgba(0,0,0,1)",
				"comic-hover": "12px 12px 0px 0px rgba(0,0,0,1)",
			},
			borderWidth: {
				"3": "3px",
			},
		},
	},
	plugins: [],
};
