/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
	  colors: {
	  	"grey": "#676767",
		"black": "#000000",
		"red": "#f43841",
		"green": "#73c936",
		"yellow": "#ffdd33",
		"blue": "#96a6c8",
		"magenta": "#9e95c7",
		"cyan": "#95a99f",
		"white": "#ffffff",
	  },
    extend: {},
  },
  plugins: [],
}
