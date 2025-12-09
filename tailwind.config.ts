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
        background: "var(--background)",
        foreground: "var(--foreground)",
        uw: {
          purple: "#4C3182",
          gold: "#B7A57D",
          "gold-metallic": "#857551",
          black: "#0D0D0D",
        },
      },
      fontFamily: {
        sans: ["var(--font-encode-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
