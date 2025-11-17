/**
 * ✅ FABRK COMPONENT
 * Theme toggle using next-themes
 * Production-ready ✓
 */

"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, startTransition } from "react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return null;
  }

  // Determine the actual theme being displayed
  const actualTheme = theme === "system" ? systemTheme : theme;
  const isDark = actualTheme === "dark";

  const toggleTheme = () => {
    if (theme === "system") {
      // If currently on system, toggle to the opposite of what system shows
      setTheme(isDark ? "light" : "dark");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      // If currently on dark, go back to system
      setTheme("system");
    }
  };

  // Always show the icon based on what's actually displayed
  // When in system mode, show a small dot indicator
  const getIcon = () => {
    return (
      <div className="relative">
        {isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
        {theme === "system" && (
          <div className="absolute -bottom-0.5 -right-0.5 size-1.5 rounded-full bg-primary/100"></div>
        )}
      </div>
    );
  };

  const getAriaLabel = () => {
    if (theme === "system") {
      return `Currently auto (${isDark ? "dark" : "light"}), click to switch to ${isDark ? "light" : "dark"}`;
    }
    return `Switch to ${isDark ? "light" : theme === "light" ? "dark" : "auto"}`;
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-6 w-6 px-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={getAriaLabel()}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
