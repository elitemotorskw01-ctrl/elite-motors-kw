import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4AF37",
          dark: "#B8960C",
          light: "#F0D060",
        },
        black: "#0A0A0A",
        surface: {
          dark: "#141414",
          card: "#1A1A1A",
          border: "#2A2A2A",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A0A0A0",
        },
      },
    },
  },
  plugins: [],
};
export default config;
