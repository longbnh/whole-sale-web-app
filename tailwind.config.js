module.exports = {
  // important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        middle: ["0.75rem", "0.75rem"],
      },
      fontFamily: {
        sfpro: "Source Sans Pro",
      },
      height: {
        "22/25": "88%",
        155: "155px",
        "all-but-header": "calc(100vh - 6.25rem)",
      },
      width: {
        "22%": "22%",
        1200: "1200px",
        "70%": "70%",
        "30%": "30%",
        1000: "1000px",
      },
      letterSpacing: {
        input: "0.00938em",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
