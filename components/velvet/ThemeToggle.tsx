"use client";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-sm text-velvet-fg/50 hover:text-velvet-fg hover:bg-velvet-gold transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={14} strokeWidth={2} /> : <Sun size={14} strokeWidth={2} />}
    </button>
  );
}
