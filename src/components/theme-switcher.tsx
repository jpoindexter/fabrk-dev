"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Palette, Check } from "lucide-react";

export type ColorScheme = "purple" | "blue" | "green" | "orange" | "pink" | "red";

interface ColorSchemeConfig {
  id: ColorScheme;
  name: string;
  preview: string;
  css: {
    primary: string;
    primaryForeground: string;
  };
}

const colorSchemes: ColorSchemeConfig[] = [
  {
    id: "purple",
    name: "Purple (Default)",
    preview: "bg-purple-600",
    css: {
      primary: "oklch(71.5% 0.197 354.23)",
      primaryForeground: "oklch(0% 0 0)",
    },
  },
  {
    id: "blue",
    name: "Ocean Blue",
    preview: "bg-blue-600",
    css: {
      primary: "oklch(65% 0.2 250)",
      primaryForeground: "oklch(0% 0 0)",
    },
  },
  {
    id: "green",
    name: "Forest Green",
    preview: "bg-green-600",
    css: {
      primary: "oklch(70% 0.18 145)",
      primaryForeground: "oklch(0% 0 0)",
    },
  },
  {
    id: "orange",
    name: "Sunset Orange",
    preview: "bg-orange-600",
    css: {
      primary: "oklch(72% 0.19 45)",
      primaryForeground: "oklch(0% 0 0)",
    },
  },
  {
    id: "pink",
    name: "Hot Pink",
    preview: "bg-pink-600",
    css: {
      primary: "oklch(70% 0.22 350)",
      primaryForeground: "oklch(0% 0 0)",
    },
  },
  {
    id: "red",
    name: "Ruby Red",
    preview: "bg-red-600",
    css: {
      primary: "oklch(60% 0.22 25)",
      primaryForeground: "oklch(0% 0 0)",
    },
  },
];

export function ThemeSwitcher() {
  const [currentScheme, setCurrentScheme] = React.useState<ColorScheme>("purple");

  React.useEffect(() => {
    // Load saved scheme from localStorage
    const saved = localStorage.getItem("color-scheme") as ColorScheme | null;
    if (saved && colorSchemes.find((s) => s.id === saved)) {
      setCurrentScheme(saved);
      applyColorScheme(saved);
    }
  }, []);

  const applyColorScheme = (schemeId: ColorScheme) => {
    const scheme = colorSchemes.find((s) => s.id === schemeId);
    if (!scheme) return;

    const root = document.documentElement;
    // Set both --primary and --main (they're aliased in globals.css)
    root.style.setProperty("--primary", scheme.css.primary);
    root.style.setProperty("--main", scheme.css.primary);
    root.style.setProperty("--primary-foreground", scheme.css.primaryForeground);
    root.style.setProperty("--main-foreground", scheme.css.primaryForeground);

    setCurrentScheme(schemeId);
    localStorage.setItem("color-scheme", schemeId);
  };

  const currentSchemeName = colorSchemes.find((s) => s.id === currentScheme)?.name || "Purple";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Theme</span>
          <Badge variant="secondary" className="ml-1 hidden md:inline">
            {currentSchemeName.split(" ")[0]}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Color Scheme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {colorSchemes.map((scheme) => (
          <DropdownMenuItem
            key={scheme.id}
            onClick={() => applyColorScheme(scheme.id)}
            className="flex items-center justify-between gap-2 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`h-6 w-6 rounded-md border-3 border-black dark:border-white ${scheme.preview} shadow-brutal-sm`} />
              <span>{scheme.name}</span>
            </div>
            {currentScheme === scheme.id && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
