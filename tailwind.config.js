/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports =withMT( {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],   
  theme: { // Some useful comment
    fontFamily: {
      'nunito': ['nunito', 'sans-serif'],
      'MyFont': ['"My Font"', 'serif'] // Ensure fonts with spaces have " " surrounding it.
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#fff',
      'purple': '#3f3cbb',
      'midnight': '#012970',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#A5A9AB',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
    extend: {},
  },
  plugins: [],
})

