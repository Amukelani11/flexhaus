import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          black: "#0A0A0A",
          ivory: "#F5EFE6",
          gold: "#C9A84C",
          "gold-light": "#E8D5A0",
          "warm-gray": "#2A2820",
          muted: "#8A8070",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-haas)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "ultra-wide": "0.5em",
        "mega-wide": "0.8em",
      },
      transitionTimingFunction: {
        "ease-luxury": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "ease-reveal": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      keyframes: {
        "letter-expand": {
          "0%": { letterSpacing: "0em", opacity: "0" },
          "100%": { letterSpacing: "0.5em", opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "clip-reveal": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
        "cursor-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
        },
      },
      animation: {
        "letter-expand": "letter-expand 1.4s cubic-bezier(0.76, 0, 0.24, 1) forwards",
        "fade-up": "fade-up 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "clip-reveal": "clip-reveal 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards",
        "cursor-pulse": "cursor-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
