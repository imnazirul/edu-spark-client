/* eslint-disable no-dupe-keys */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#1957E0",
        },
        secondary: {
          1: "#DC2871",
        },
      },
      fontFamily: {
        poppins: '"Poppins", sans-serif',
      },
    },
  },
  plugins: [require("daisyui")],
};
