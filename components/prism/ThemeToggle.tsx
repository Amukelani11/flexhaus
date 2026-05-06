"use client";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-sm text-prism-fg/50 hover:text-prism-fg hover:bg-prism-accent transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={14} strokeWidth={2} /> : <Sun size={14} strokeWidth={2} />}
    </button>
  );
}
