/** @type {import('tailwindcss').Config} */
module.exports = {
  //content
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      }
    },
  },
  plugins: [],
}