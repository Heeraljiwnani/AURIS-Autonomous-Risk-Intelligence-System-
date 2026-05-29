/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        auris: {
          dark: '#000a1e',
          light: '#f8f9fa',
          blue: '#00658d',
          accent: '#0084B4',
        }
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        public: ['"Public Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
