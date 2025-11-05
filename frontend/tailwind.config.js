/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Light blue
        secondary: '#F3F4F6', // Light gray
        accent: '#10B981', // Green
        background: '#FFFFFF', // White
        text: '#1F2937', // Dark gray
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
