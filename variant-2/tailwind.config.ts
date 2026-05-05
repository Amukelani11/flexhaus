import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        flex: {
          white: "#FFFFFF",
          black: "#1A1A1A",
          yellow: "#FFD600",
          "yellow-dark": "#E6C200",
          gray: "#F0F0F0",
          "mid-gray": "#888888",
          red: "#FF2D00",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        sans: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(4rem, 15vw, 14rem)", { lineHeight: "0.9" }],
        "display": ["clamp(2rem, 8vw, 7rem)", { lineHeight: "0.95" }],
      },
      keyframes: {
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "glitch-1": {
          "0%, 100%": { clip: "rect(0, 9999px, 0, 0)", transform: "translate(0)" },
          "20%": { clip: "rect(10px, 9999px, 30px, 0)", transform: "translate(-2px, 2px)" },
          "40%": { clip: "rect(50px, 9999px, 70px, 0)", transform: "translate(2px, -2px)" },
          "60%": { clip: "rect(30px, 9999px, 50px, 0)", transform: "translate(-3px, 1px)" },
          "80%": { clip: "rect(70px, 9999px, 90px, 0)", transform: "translate(3px, -1px)" },
        },
        "glitch-2": {
          "0%, 100%": { clip: "rect(0, 9999px, 0, 0)", transform: "translate(0)" },
          "25%": { clip: "rect(20px, 9999px, 40px, 0)", transform: "translate(3px, 0)" },
          "50%": { clip: "rect(60px, 9999px, 80px, 0)", transform: "translate(-3px, 2px)" },
          "75%": { clip: "rect(5px, 9999px, 25px, 0)", transform: "translate(2px, -2px)" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateY(60px) rotate(2deg)" },
          "100%": { opacity: "1", transform: "translateY(0) rotate(0)" },
        },
        "border-flash": {
          "0%, 100%": { borderColor: "#FFD600" },
          "50%": { borderColor: "#FF2D00" },
        },
      },
      animation: {
        "marquee": "marquee 20s linear infinite",
        "marquee-slow": "marquee 35s linear infinite",
        "scan": "scan 3s linear infinite",
        "slide-in": "slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "border-flash": "border-flash 1s ease-in-out infinite",
      },
      borderWidth: {
        "3": "3px",
        "5": "5px",
      },
    },
  },
  plugins: [],
};

export default config;
