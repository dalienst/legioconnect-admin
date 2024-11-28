/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: ["corporate"],
  },
  theme: {
    extend: {
      colors: {
        background: "#f7f7f7",
      },
    },
  },
  plugins: [require("daisyui")],
};
