/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
	// purge: [],
	darkMode: false, // or 'media' or 'class'
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#202225',
				secondary: '#5865f2',
				gray: colors.trueGray,
			},
		},
	},
	plugins: [],
};
