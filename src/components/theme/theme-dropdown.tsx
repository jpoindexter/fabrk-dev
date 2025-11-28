/**
 * ✅ FABRK COMPONENT
 * DaisyUI theme picker dropdown for navbar with 20+ themes
 * Production-ready ✓
 */

"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const themes = [
    { id: "light", name: "Light", preview: "#ffffff" },
    { id: "dark", name: "Dark", preview: "#1d232a" },
    { id: "cupcake", name: "Cupcake", preview: "#65c3c8" },
    { id: "bumblebee", name: "Bumblebee", preview: "#e0a82e" },
    { id: "emerald", name: "Emerald", preview: "#66cc8a" },
    { id: "corporate", name: "Corporate", preview: "#4b6bfb" },
    { id: "synthwave", name: "Synthwave", preview: "#e779c1" },
    { id: "retro", name: "Retro", preview: "#ef9995" },
    { id: "cyberpunk", name: "Cyberpunk", preview: "#ff7598" },
    { id: "valentine", name: "Valentine", preview: "#e96d7b" },
    { id: "halloween", name: "Halloween", preview: "#ff7700" },
    { id: "forest", name: "Forest", preview: "#1eb854" },
    { id: "aqua", name: "Aqua", preview: "#09ecf3" },
    { id: "lofi", name: "Lo-Fi", preview: "#0d0d0d" },
    { id: "pastel", name: "Pastel", preview: "#d1c1d7" },
    { id: "fantasy", name: "Fantasy", preview: "#6e0b75" },
    { id: "luxury", name: "Luxury", preview: "#ffffff" },
    { id: "dracula", name: "Dracula", preview: "#ff79c6" },
    { id: "autumn", name: "Autumn", preview: "#8c0327" },
    { id: "business", name: "Business", preview: "#1c4e80" },
] as const;

export type ColorTheme = (typeof themes)[number]["id"];

export function ThemeDropdown() {
    const [currentTheme, setCurrentTheme] = useState<ColorTheme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: Hydration pattern for SSR compatibility
        setMounted(true);

        // Remove any leftover dark mode class and localStorage from old theme system
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.remove("light");

        // Clear old next-themes localStorage keys
        localStorage.removeItem("theme-mode"); // Old key if it exists

        // Set DaisyUI theme (force light as default if no valid theme)
        const saved = (localStorage.getItem("theme") as ColorTheme) || "light";
        setCurrentTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);

        // Force remove dark class if it somehow persists (safe cleanup)
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            // Only remove theme-related keys, not auth tokens or other data
            localStorage.removeItem("theme");
            localStorage.removeItem("theme-mode");
            localStorage.removeItem("color-theme");
        }
    }, []);

    const handleChange = (themeId: ColorTheme) => {
        setCurrentTheme(themeId);
        localStorage.setItem("theme", themeId);
        document.documentElement.setAttribute("data-theme", themeId);
    };

    if (!mounted) {
        return (
            <Button variant="ghost" size="sm" className="rounded-none" disabled>
                <Palette className="h-4 w-4" />
            </Button>
        );
    }

    const currentThemeName = themes.find((t) => t.id === currentTheme)?.name || "Light";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-none gap-2">
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:inline">{currentThemeName}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-none w-48">
                {themes.map((theme) => (
                    <DropdownMenuItem
                        key={theme.id}
                        onClick={() => handleChange(theme.id)}
                        className={cn("font-semibold", currentTheme === theme.id && "bg-accent")}
                    >
                        <div
                            className="mr-2 h-4 w-4 rounded-full border"
                            style={{ backgroundColor: theme.preview }}
                        />
                        {theme.name}
                        {currentTheme === theme.id && (
                            <span className="ml-auto text-xs">✓</span>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
