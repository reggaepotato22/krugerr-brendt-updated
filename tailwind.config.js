/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C5A059', // Gold
          dark: '#B08D45',
          light: '#D4B87E',
        },
        secondary: {
          DEFAULT: '#0A0A0A', // Deep Black
          light: '#1A1A1A',
        },
        accent: '#004225', // British Racing Green (Optional deep accent)
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.25em',
      }
    },
  },
  plugins: [],
}
