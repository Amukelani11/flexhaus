"use client";

import { motion } from "framer-motion";

type LogoProps = {
  variant?: "light" | "dark";
  align?: "center" | "start";
  className?: string;
};

export default function Logo({ variant = "light", align = "center", className = "" }: LogoProps) {
  const isDark = variant === "dark";
  const hausGradient = isDark
    ? "bg-gradient-to-r from-amber-100 via-orange-300 to-rose-200 bg-[length:220%_auto] animate-gradient-shift bg-clip-text text-transparent"
    : "bg-gradient-to-r from-flex-yellow via-amber-600 to-flex-yellow-bright bg-[length:220%_auto] animate-gradient-shift bg-clip-text text-transparent";

  const alignCls = align === "start" ? "items-start text-left" : "items-center text-center";

  return (
    <motion.div
      className={`inline-flex flex-col ${alignCls} ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      <div className="font-logo flex items-baseline gap-0.5">
        <span
          className={`text-[1.05rem] font-semibold tracking-[-0.07em] sm:text-[1.15rem] ${isDark ? "text-white" : "text-flex-black"}`}
        >
          flex
        </span>
        <span className={`text-[0.65rem] font-light tracking-[-0.02em] ${isDark ? "text-white/35" : "text-flex-black/35"}`}>
          /
        </span>
        <span className={`text-[1.05rem] font-bold tracking-[-0.055em] sm:text-[1.15rem] ${hausGradient}`}>haus</span>
      </div>
      <span
        className={`font-mono text-[6px] uppercase tracking-[0.42em] sm:text-[7px] ${isDark ? "text-flex-yellow-bright/75" : "text-flex-black/40"}`}
      >
        Curated · South Africa
      </span>
    </motion.div>
  );
}
