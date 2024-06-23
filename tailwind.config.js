/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["General Sans", "sans-serif"],
      },
      colors: {
        background: "#010D00",
        foreground: "#DDEEE1",
      },
    },
  },
  plugins: [],
};
