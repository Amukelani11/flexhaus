"use client";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ overHero = false }: { overHero?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={
        overHero
          ? "p-2 rounded-sm text-white/55 hover:text-white hover:bg-white/10 transition-colors duration-200"
          : "p-2 rounded-sm text-flex-black/50 hover:text-flex-black hover:bg-flex-yellow-bright transition-colors duration-200"
      }
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={14} strokeWidth={2} /> : <Sun size={14} strokeWidth={2} />}
    </button>
  );
}
