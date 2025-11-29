"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
  className?: string;
}

// Mermaid.js requires hex colors - these are fallbacks when CSS variables can't be read
// They match the design system's dark theme colors
const MERMAID_FALLBACK_COLORS = {
  primary: "hsl(259 60% 60%)", // --primary
  foreground: "hsl(0 0% 98%)", // --foreground (dark)
  background: "hsl(254 15% 8%)", // --background (dark)
  card: "hsl(254 20% 10%)", // --card (dark)
  muted: "hsl(254 15% 20%)", // --muted (dark)
} as const;

function getThemeColors() {
  if (typeof window === "undefined") return null;

  const style = getComputedStyle(document.documentElement);

  // Get CSS variable and convert OKLCH to a usable format
  const getCssVar = (name: string) => {
    const value = style.getPropertyValue(name).trim();
    if (!value) return null;
    // Return the oklch value wrapped for CSS usage
    return `oklch(${value})`;
  };

  // For mermaid, we need hex colors, so we'll read from a canvas
  const oklchToHex = (oklchValue: string, fallback: string): string => {
    if (!oklchValue) return hslToHex(fallback);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return hslToHex(fallback);
      ctx.fillStyle = oklchValue;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    } catch {
      return hslToHex(fallback);
    }
  };

  // Convert HSL string to hex
  function hslToHex(hsl: string): string {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "#6366f1"; // fallback primary
      ctx.fillStyle = hsl;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    } catch {
      return "#6366f1"; // fallback primary
    }
  }

  const primary = oklchToHex(getCssVar("--primary") || "", MERMAID_FALLBACK_COLORS.primary);
  const background = oklchToHex(getCssVar("--background") || "", MERMAID_FALLBACK_COLORS.background);
  const card = oklchToHex(getCssVar("--card") || "", MERMAID_FALLBACK_COLORS.card);
  const foreground = oklchToHex(getCssVar("--foreground") || "", MERMAID_FALLBACK_COLORS.foreground);
  const muted = oklchToHex(getCssVar("--muted") || "", MERMAID_FALLBACK_COLORS.muted);

  return { primary, background, card, foreground, muted };
}

export function Mermaid({ chart, className }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<string | null>(null);

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme");
      setTheme(newTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Set initial theme
    setTheme(document.documentElement.getAttribute("data-theme"));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const colors = getThemeColors();

    // Default colors when running on server or colors not available
    const defaultPrimary = "#6366f1";
    const defaultForeground = "#fafafa";
    const defaultBackground = "#0a0a0a";
    const defaultCard = "#171717";
    const defaultMuted = "#262626";

    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: {
        primaryColor: colors?.primary || defaultPrimary,
        primaryTextColor: colors?.foreground || defaultForeground,
        primaryBorderColor: colors?.primary || defaultPrimary,
        lineColor: colors?.primary || defaultPrimary,
        secondaryColor: colors?.muted || defaultMuted,
        tertiaryColor: colors?.muted || defaultMuted,
        background: colors?.background || defaultBackground,
        mainBkg: colors?.card || defaultCard,
        secondBkg: colors?.card || defaultCard,
        nodeBorder: colors?.primary || defaultPrimary,
        clusterBkg: colors?.card || defaultCard,
        clusterBorder: colors?.primary || defaultPrimary,
        edgeLabelBackground: colors?.card || defaultCard,
        textColor: colors?.foreground || defaultForeground,
      },
      flowchart: {
        htmlLabels: true,
        curve: "basis",
      },
    });

    const renderChart = async () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        try {
          const { svg } = await mermaid.render(id, chart);
          containerRef.current.innerHTML = svg;
        } catch (error) {
          console.error("Mermaid rendering error:", error);
          containerRef.current.innerHTML = `<pre class="text-destructive">Error rendering diagram</pre>`;
        }
      }
    };

    renderChart();
  }, [chart, theme]);

  return (
    <div
      ref={containerRef}
      className={`overflow-x-auto rounded-lg border bg-card p-6 ${className || ""}`}
    />
  );
}
