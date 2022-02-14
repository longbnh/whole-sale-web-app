module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sfpro: "Source Sans Pro",
      },
      height: {
        "22/25": "88%",
      },
      width: {
        "22%": "22%",
        "1k2px": "1200px"
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
