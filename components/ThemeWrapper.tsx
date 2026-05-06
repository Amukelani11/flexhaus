"use client";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

function ThemeInner({ children, themeClass, fontClass }: { children: React.ReactNode; themeClass: string; fontClass: string }) {
  const { theme } = useTheme();
  return (
    <div className={`${themeClass} mode-${theme} min-h-screen ${fontClass} transition-colors duration-300`}>
      {children}
    </div>
  );
}

export default function ThemeWrapper({ children, themeClass, fontClass }: { children: React.ReactNode; themeClass: string; fontClass: string }) {
  return (
    <ThemeProvider>
      <ThemeInner themeClass={themeClass} fontClass={fontClass}>
        {children}
      </ThemeInner>
    </ThemeProvider>
  );
}
