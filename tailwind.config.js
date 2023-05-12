/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "bnw-blue": {
        accent: "#5573ae",
        accentLight: "#6fa6d3",
        gray: "#404040",
        white: "#f2f2f2",
        black: "#0d0d0d",
      },
      "graphic-grayscale": {
        100: "#d9d9d9",
        200: "#88898c",
        300: "#404040",
        400: "#1c1f26",
        500: "#999999",
      },
      "paint-grayscale": {
        100: "#f2f2f2",
        200: "#a6a6a6",
        300: "#595959",
        400: "#262626",
        500: "#0d0d0d",
      },
      "world-grayscale": {
        100: "#d8d9d7",
        200: "#a6a6a4",
        300: "#8c8c88",
        400: "#595958",
        500: "#0d0d0d",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
