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
    screens: {
      'sm': '300px',   // small screens, 640px and up
      'md': '768px',   // medium screens, 768px and up
      'lg': '1024px',  // large screens, 1024px and up
      'xl': '1280px',  // extra large screens, 1280px and up
    },
    extend: {
      fontFamily: {
        poppins: "Poppins",
      }
    },
  },
  plugins: [],
}