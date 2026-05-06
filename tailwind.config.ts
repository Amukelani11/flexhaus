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
          black: "var(--noir-black)",
          ivory: "var(--noir-ivory)",
          gold: "var(--noir-gold)",
          "gold-light": "var(--noir-gold-light)",
          "warm-gray": "var(--noir-warm-gray)",
          muted: "var(--noir-muted)",
        },
        flex: {
          white: "var(--flex-white)",
          black: "var(--flex-black)",
          yellow: "var(--flex-yellow)",
          "yellow-dark": "var(--flex-yellow-dark)",
          "yellow-bright": "var(--flex-yellow-bright)",
          gray: "var(--flex-gray)",
          "mid-gray": "var(--flex-mid-gray)",
          red: "var(--flex-red)",
        },
        archive: {
          cream: "var(--archive-cream)",
          charcoal: "var(--archive-charcoal)",
          terracotta: "var(--archive-terracotta)",
          "terracotta-light": "var(--archive-terracotta-light)",
          stone: "var(--archive-stone)",
          "warm-white": "var(--archive-warm-white)",
          line: "var(--archive-line)",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(4rem, 15vw, 14rem)", { lineHeight: "0.9" }],
        "display": ["clamp(2rem, 8vw, 7rem)", { lineHeight: "0.95" }],
        "editorial": ["clamp(3rem, 10vw, 9rem)", { lineHeight: "1.0" }],
      },
      letterSpacing: {
        "ultra-wide": "0.5em",
        "mega-wide": "0.8em",
      },
      transitionTimingFunction: {
        "ease-luxury": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "ease-reveal": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      borderWidth: {
        "3": "3px",
        "5": "5px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
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
          "0%, 100%": { borderColor: "#E5B80F" },
          "50%": { borderColor: "#FF2D00" },
        },
        "word-reveal": {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "tilt-hover": {
          "0%, 100%": { transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" },
        },
        "line-grow": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "image-reveal": {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
      },
      animation: {
        "letter-expand": "letter-expand 1.4s cubic-bezier(0.76, 0, 0.24, 1) forwards",
        "fade-up": "fade-up 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "clip-reveal": "clip-reveal 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards",
        "cursor-pulse": "cursor-pulse 2s ease-in-out infinite",
        "marquee": "marquee 20s linear infinite",
        "marquee-slow": "marquee 35s linear infinite",
        "scan": "scan 3s linear infinite",
        "slide-in": "slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "border-flash": "border-flash 1s ease-in-out infinite",
        "word-reveal": "word-reveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.8s ease forwards",
        "line-grow": "line-grow 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards",
        "image-reveal": "image-reveal 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
