import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Variant 1 — NOIR
        noir: {
          black: "#0A0A0A",
          ivory: "#F5EFE6",
          gold: "#C9A84C",
          "gold-light": "#E8D5A0",
          "warm-gray": "#2A2820",
          muted: "#8A8070",
        },
        // Variant 2 — FLEX
        flex: {
          white: "#FFFFFF",
          black: "#1A1A1A",
          yellow: "#FFD600",
          "yellow-dark": "#E6C200",
          gray: "#F0F0F0",
          "mid-gray": "#888888",
          red: "#FF2D00",
        },
        // Variant 3 — ARCHIVE
        archive: {
          cream: "#F8F4EF",
          charcoal: "#2C2820",
          terracotta: "#C1440E",
          "terracotta-light": "#E8614A",
          stone: "#8C7B6B",
          "warm-white": "#FDFAF6",
          line: "#DDD5C8",
        },
      },
      // Font families resolve from CSS variables set per route group layout
      fontFamily: {
        serif:   ["var(--theme-serif,Georgia)", "Georgia", "serif"],
        sans:    ["var(--theme-sans,system-ui)", "system-ui", "sans-serif"],
        display: ["var(--theme-display,system-ui)", "system-ui", "sans-serif"],
        mono:    ["var(--theme-mono,monospace)", "monospace"],
      },
      fontSize: {
        hero:      ["clamp(3.5rem,10vw,9rem)", { lineHeight: "0.92" }],
        display:   ["clamp(1.8rem,5vw,3.5rem)", { lineHeight: "1.0" }],
        editorial: ["clamp(3rem,10vw,9rem)", { lineHeight: "1.0" }],
      },
      letterSpacing: {
        "ultra-wide": "0.5em",
        "mega-wide":  "0.8em",
      },
      borderWidth: { "3": "3px", "5": "5px" },
      spacing: { "18": "4.5rem", "22": "5.5rem", "30": "7.5rem" },
      transitionTimingFunction: {
        "ease-luxury": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "ease-reveal": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      keyframes: {
        // FLEX
        marquee:       { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-50%)" } },
        "glitch-1":    { "0%,100%": { clip: "rect(0,9999px,0,0)", transform: "translate(0)" }, "20%": { clip: "rect(10px,9999px,30px,0)", transform: "translate(-2px,2px)" }, "60%": { clip: "rect(30px,9999px,50px,0)", transform: "translate(-3px,1px)" } },
        scan:          { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100vh)" } },
        "border-flash":{ "0%,100%": { borderColor: "#FFD600" }, "50%": { borderColor: "#FF2D00" } },
        // NOIR
        "letter-expand":{ "0%": { letterSpacing: "0em", opacity: "0" }, "100%": { letterSpacing: "0.5em", opacity: "1" } },
        "fade-up":      { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "clip-reveal":  { "0%": { clipPath: "inset(0 100% 0 0)" }, "100%": { clipPath: "inset(0 0% 0 0)" } },
        // ARCHIVE
        "word-reveal":  { "0%": { opacity: "0", transform: "translateY(100%)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in":      { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "line-grow":    { "0%": { width: "0%" }, "100%": { width: "100%" } },
        "image-reveal": { "0%": { transform: "scaleX(0)", transformOrigin: "left" }, "100%": { transform: "scaleX(1)", transformOrigin: "left" } },
      },
      animation: {
        marquee:         "marquee 22s linear infinite",
        "marquee-slow":  "marquee 35s linear infinite",
        scan:            "scan 3s linear infinite",
        "border-flash":  "border-flash 1s ease-in-out infinite",
        "letter-expand": "letter-expand 1.4s cubic-bezier(0.76,0,0.24,1) forwards",
        "fade-up":       "fade-up 0.9s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
        "clip-reveal":   "clip-reveal 1.2s cubic-bezier(0.76,0,0.24,1) forwards",
        "word-reveal":   "word-reveal 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":       "fade-in 0.8s ease forwards",
        "line-grow":     "line-grow 0.8s cubic-bezier(0.76,0,0.24,1) forwards",
        "image-reveal":  "image-reveal 1.2s cubic-bezier(0.76,0,0.24,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
