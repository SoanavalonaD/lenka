import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF7F2",
        linen: {
          DEFAULT: "#F3ECE1",
          deep: "#E7DDD0",
          dark: "#D6C7B2",
        },
        terracotta: {
          DEFAULT: "#C47256",
          light: "#D9927A",
          dark: "#A3563B",
        },
        chocolate: {
          DEFAULT: "#382417",
          light: "#5C3E2B",
          muted: "#6B5647",
        },
        charcoal: "#1C1917",
        botanical: "#2F523A",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        atelier: "0 12px 32px -8px rgba(56, 36, 23, 0.08)",
        elevated: "0 20px 44px -12px rgba(56, 36, 23, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
