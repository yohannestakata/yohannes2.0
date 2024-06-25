/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svg}"],
  theme: {
    extend: {
      fontFamily: {
        header: ["General Sans", "sans-serif"],
        sans: ["Clash Grotesk Variable", "sans-serif"],
      },
      colors: {
        background: "#010D00",
        foreground: "#DDEEE1",
        card: "#bdcdc0",
      },
    },
  },
  plugins: [],
};
