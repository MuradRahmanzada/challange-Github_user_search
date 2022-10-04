/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        NotoSansMono: ["Noto Sans Mono", "monospace"],
      },
    },
  },

  plugins: [],
};
