/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ionian: "#1F2937",
        sand: "#EDE8D0",
        sage: "#A7C4A0",
        terracotta: "#C57F6B",
        cream: "#F9F6EF"
      }
    }
  },
  plugins: []
};
