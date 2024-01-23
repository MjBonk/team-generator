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
			green: "#889D81",
			orange: "#DA7B00",
			blue: "#3942C5",
			darkGreen: "#0D5747",
			//
			beige: "#D7D2C8",
			offwhite: "#F5F5F5",
			white: "#FFFFFF",

			text: "#676557",
			title: "#0C0C0C",
			bg: "#F5F5F5",
			accent: "#494943",
			accentLight: "#666BC4",
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
