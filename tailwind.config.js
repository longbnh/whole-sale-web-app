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
        1200: "1200px",
        "70%": "70%",
        "30%": "30%",
        1000: "1000px",
        "1k2px": "1200px",
      },
      letterSpacing: {
        input: "0.00938em",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
