module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          DEFAULT: "#002E84",
          50: "#B8D0FF",
          100: "#8FB6FF",
          200: "#669BFF",
          300: "#3D81FF",
          400: "#1466FF",
          500: "#0052EB",
          600: "#0047CC",
          700: "#0039A3",
          800: "#002B7A",
          900: "#001C52",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
