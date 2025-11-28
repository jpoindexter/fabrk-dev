"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
  className?: string;
}

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
  const oklchToHex = (oklchValue: string): string => {
    if (!oklchValue) return "#ec4899"; // fallback pink
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "#ec4899";
      ctx.fillStyle = oklchValue;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    } catch {
      return "#ec4899";
    }
  };

  const primary = oklchToHex(getCssVar("--primary") || "");
  const background = oklchToHex(getCssVar("--background") || "");
  const card = oklchToHex(getCssVar("--card") || "");
  const foreground = oklchToHex(getCssVar("--foreground") || "");
  const muted = oklchToHex(getCssVar("--muted") || "");

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

    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: {
        primaryColor: colors?.primary || "#ec4899",
        primaryTextColor: colors?.foreground || "#fff",
        primaryBorderColor: colors?.primary || "#ec4899",
        lineColor: colors?.primary || "#ec4899",
        secondaryColor: colors?.muted || "#1e1e2e",
        tertiaryColor: colors?.muted || "#1e1e2e",
        background: colors?.background || "#0d0d0d",
        mainBkg: colors?.card || "#1e1e2e",
        secondBkg: colors?.card || "#1e1e2e",
        nodeBorder: colors?.primary || "#ec4899",
        clusterBkg: colors?.card || "#1e1e2e",
        clusterBorder: colors?.primary || "#ec4899",
        edgeLabelBackground: colors?.card || "#1e1e2e",
        textColor: colors?.foreground || "#fff",
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
