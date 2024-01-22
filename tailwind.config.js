/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			//cards
			black: "#494943",
			pink: "#E578AB",
			yellow: "#F5ED59",
			red: "#AD283A",
			gray: "#494943",
			green: "#889D81",
			orange: "#DA7B00",
			blue: "#3942C5",
			darkGreen: "#0D5747",
			//
			beige: "#D7D2C8",
			offwhite: "#F5F5F5",

			text: "#676557",
			bg: "#F5F5F5",
			accent: "#3942C5",
		},
		extend: {
			fontFamily: {
				bevan: ["'Bevan', serif"],
				monserrat: ["'Montserrat', sans-serif"],
			},
			animation: {
				marquee: "marquee 40s linear infinite",
			},
			keyframes: {
				marquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-50%)" },
				},
			},
		},
	},
	plugins: [],
};
