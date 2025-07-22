/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fredoka': ['Fredoka', 'sans-serif'],
      },
      colors: {
        'unitech-blue': '#5C81A6',
        'unitech-green': '#5CA65C',
        'unitech-purple': '#5C68A6',
        'unitech-teal': '#5CA68D',
      }
    },
  },
  plugins: [],
}