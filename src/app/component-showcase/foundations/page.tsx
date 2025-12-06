/**
 * Design System Foundations Showcase
 * Visual inspection of all design tokens: colors, typography, spacing, radius, shadows
 */

"use client";

import * as React from "react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Section Header Component
function SectionHeader({ code, title }: { code: string; title: string }) {
  return (
    <div className="border-border bg-card border-b px-6 py-4">
      <span className={cn("text-muted-foreground text-sm", mode.font)}>
        [ [{code}] {title} ]
      </span>
    </div>
  );
}

// Color Swatch Component
function ColorSwatch({
  name,
  className,
  cssVar,
}: {
  name: string;
  className: string;
  cssVar: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className={cn("h-16 w-full border border-border", className, mode.radius)} />
      <div className="space-y-0.5">
        <p className={cn("text-foreground text-xs font-medium", mode.font)}>{name}</p>
        <p className={cn("text-muted-foreground text-xs", mode.font)}>{cssVar}</p>
      </div>
    </div>
  );
}

export default function FoundationsShowcasePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <span className={cn("text-muted-foreground text-sm", mode.font)}>
            [ [0x00] DESIGN_SYSTEM_FOUNDATIONS ] foundations.tsx
          </span>
          <Link href="/component-showcase">
            <Button variant="outline" size="sm">
              <ChevronLeft className="mr-1 size-4" />
              &gt; BACK_TO_SHOWCASE
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl space-y-12 px-6 py-12">
        {/* ============================================ */}
        {/* SECTION 1: COLORS */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x01" title="COLORS" />
          <div className="space-y-8 p-6">
            {/* Background Colors */}
            <div>
              <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>
                [BACKGROUND]:
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
                <ColorSwatch name="background" className="bg-background" cssVar="--background" />
                <ColorSwatch name="card" className="bg-card" cssVar="--card" />
                <ColorSwatch name="muted" className="bg-muted" cssVar="--muted" />
                <ColorSwatch name="popover" className="bg-popover" cssVar="--popover" />
                <ColorSwatch name="primary" className="bg-primary" cssVar="--primary" />
                <ColorSwatch name="secondary" className="bg-secondary" cssVar="--secondary" />
              </div>
            </div>

            {/* Semantic Colors */}
            <div>
              <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>
                [SEMANTIC]:
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
                <ColorSwatch name="destructive" className="bg-destructive" cssVar="--destructive" />
                <ColorSwatch name="success" className="bg-success" cssVar="--success" />
                <ColorSwatch name="warning" className="bg-warning" cssVar="--warning" />
                <ColorSwatch name="info" className="bg-info" cssVar="--info" />
                <ColorSwatch name="accent" className="bg-accent" cssVar="--accent" />
                <ColorSwatch name="ring" className="bg-ring" cssVar="--ring" />
              </div>
            </div>

            {/* Text Colors */}
            <div>
              <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>[TEXT]:</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
                <div className="space-y-2">
                  <div
                    className={cn(
                      "bg-card border-border flex h-16 items-center justify-center border",
                      mode.radius
                    )}
                  >
                    <span className={cn("text-foreground text-sm font-medium", mode.font)}>Aa</span>
                  </div>
                  <p className={cn("text-foreground text-xs font-medium", mode.font)}>foreground</p>
                  <p className={cn("text-muted-foreground text-xs", mode.font)}>--foreground</p>
                </div>
                <div className="space-y-2">
                  <div
                    className={cn(
                      "bg-card border-border flex h-16 items-center justify-center border",
                      mode.radius
                    )}
                  >
                    <span className={cn("text-muted-foreground text-sm font-medium", mode.font)}>
                      Aa
                    </span>
                  </div>
                  <p className={cn("text-foreground text-xs font-medium", mode.font)}>
                    muted-foreground
                  </p>
                  <p className={cn("text-muted-foreground text-xs", mode.font)}>
                    --muted-foreground
                  </p>
                </div>
                <div className="space-y-2">
                  <div
                    className={cn(
                      "bg-card border-border flex h-16 items-center justify-center border",
                      mode.radius
                    )}
                  >
                    <span className={cn("text-primary text-sm font-medium", mode.font)}>Aa</span>
                  </div>
                  <p className={cn("text-foreground text-xs font-medium", mode.font)}>primary</p>
                  <p className={cn("text-muted-foreground text-xs", mode.font)}>
                    --primary-foreground
                  </p>
                </div>
                <div className="space-y-2">
                  <div
                    className={cn(
                      "bg-card border-border flex h-16 items-center justify-center border",
                      mode.radius
                    )}
                  >
                    <span className={cn("text-destructive text-sm font-medium", mode.font)}>
                      Aa
                    </span>
                  </div>
                  <p className={cn("text-foreground text-xs font-medium", mode.font)}>
                    destructive
                  </p>
                  <p className={cn("text-muted-foreground text-xs", mode.font)}>--destructive</p>
                </div>
                <div className="space-y-2">
                  <div
                    className={cn(
                      "bg-card border-border flex h-16 items-center justify-center border",
                      mode.radius
                    )}
                  >
                    <span className={cn("text-success text-sm font-medium", mode.font)}>Aa</span>
                  </div>
                  <p className={cn("text-foreground text-xs font-medium", mode.font)}>success</p>
                  <p className={cn("text-muted-foreground text-xs", mode.font)}>--success</p>
                </div>
                <div className="space-y-2">
                  <div
                    className={cn(
                      "bg-card border-border flex h-16 items-center justify-center border",
                      mode.radius
                    )}
                  >
                    <span className={cn("text-warning text-sm font-medium", mode.font)}>Aa</span>
                  </div>
                  <p className={cn("text-foreground text-xs font-medium", mode.font)}>warning</p>
                  <p className={cn("text-muted-foreground text-xs", mode.font)}>--warning</p>
                </div>
              </div>
            </div>

            {/* Border Colors */}
            <div>
              <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>
                [BORDER]:
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="space-y-2">
                  <div className={cn("h-16 border-2 border-border bg-transparent", mode.radius)} />
                  <p className={cn("text-foreground text-xs font-medium", mode.font)}>border</p>
                  <p className={cn("text-muted-foreground text-xs", mode.font)}>--border</p>
                </div>
                <div className="space-y-2">
                  <div className={cn("h-16 border-2 border-input bg-transparent", mode.radius)} />
                  <p className={cn("text-foreground text-xs font-medium", mode.font)}>input</p>
                  <p className={cn("text-muted-foreground text-xs", mode.font)}>--input</p>
                </div>
                <div className="space-y-2">
                  <div className={cn("h-16 border-2 border-primary bg-transparent", mode.radius)} />
                  <p className={cn("text-foreground text-xs font-medium", mode.font)}>
                    border-primary
                  </p>
                  <p className={cn("text-muted-foreground text-xs", mode.font)}>--primary</p>
                </div>
                <div className="space-y-2">
                  <div
                    className={cn("h-16 border-2 border-destructive bg-transparent", mode.radius)}
                  />
                  <p className={cn("text-foreground text-xs font-medium", mode.font)}>
                    border-destructive
                  </p>
                  <p className={cn("text-muted-foreground text-xs", mode.font)}>--destructive</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 2: TYPOGRAPHY */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x02" title="TYPOGRAPHY" />
          <div className="space-y-8 p-6">
            {/* Font Families */}
            <div>
              <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>
                [FONT_FAMILY]:
              </p>
              <div className="space-y-4">
                <div className="border-border bg-card border p-4">
                  <p className="text-muted-foreground mb-2 font-mono text-xs">[MONO]:</p>
                  <p className="font-mono text-lg">The quick brown fox jumps over the lazy dog</p>
                  <p className="text-muted-foreground mt-2 font-mono text-xs">
                    font-mono | JetBrains Mono, Fira Code
                  </p>
                </div>
                <div className="border-border bg-card border p-4">
                  <p className="text-muted-foreground mb-2 font-mono text-xs">[SANS]:</p>
                  <p className="font-sans text-lg">The quick brown fox jumps over the lazy dog</p>
                  <p className="text-muted-foreground mt-2 font-mono text-xs">
                    font-sans | Inter, system-ui
                  </p>
                </div>
              </div>
            </div>

            {/* Font Sizes */}
            <div>
              <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>
                [FONT_SIZE]:
              </p>
              <div className="space-y-3">
                {[
                  { name: "text-xs", size: "12px", class: "text-xs" },
                  { name: "text-sm", size: "14px", class: "text-sm" },
                  { name: "text-base", size: "16px", class: "text-base" },
                  { name: "text-lg", size: "18px", class: "text-lg" },
                  { name: "text-xl", size: "20px", class: "text-xl" },
                  { name: "text-2xl", size: "24px", class: "text-2xl" },
                  { name: "text-3xl", size: "30px", class: "text-3xl" },
                  { name: "text-4xl", size: "36px", class: "text-4xl" },
                ].map((item) => (
                  <div key={item.name} className="flex items-baseline gap-4">
                    <span className={cn("text-muted-foreground w-20 text-xs", mode.font)}>
                      {item.name}
                    </span>
                    <span className={cn("text-muted-foreground w-12 text-xs", mode.font)}>
                      {item.size}
                    </span>
                    <span className={cn(item.class, mode.font)}>Typography</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Font Weights */}
            <div>
              <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>
                [FONT_WEIGHT]:
              </p>
              <div className="space-y-3">
                {[
                  { name: "font-normal", weight: "400", class: "font-normal" },
                  { name: "font-medium", weight: "500", class: "font-medium" },
                  { name: "font-semibold", weight: "600", class: "font-semibold" },
                  { name: "font-bold", weight: "700", class: "font-bold" },
                ].map((item) => (
                  <div key={item.name} className="flex items-baseline gap-4">
                    <span className={cn("text-muted-foreground w-28 text-xs", mode.font)}>
                      {item.name}
                    </span>
                    <span className={cn("text-muted-foreground w-8 text-xs", mode.font)}>
                      {item.weight}
                    </span>
                    <span className={cn("text-lg", item.class, mode.font)}>Typography</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 3: SPACING */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x03" title="SPACING" />
          <div className="space-y-8 p-6">
            <div>
              <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>
                [8-POINT_GRID]:
              </p>
              <div className="space-y-4">
                {[
                  { name: "space-1", value: "4px", class: "w-1" },
                  { name: "space-2", value: "8px", class: "w-2" },
                  { name: "space-4", value: "16px", class: "w-4" },
                  { name: "space-6", value: "24px", class: "w-6" },
                  { name: "space-8", value: "32px", class: "w-8" },
                  { name: "space-12", value: "48px", class: "w-12" },
                  { name: "space-16", value: "64px", class: "w-16" },
                  { name: "space-24", value: "96px", class: "w-24" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <span className={cn("text-muted-foreground w-20 text-xs", mode.font)}>
                      {item.name}
                    </span>
                    <span className={cn("text-muted-foreground w-12 text-xs", mode.font)}>
                      {item.value}
                    </span>
                    <div className={cn("bg-primary h-4", item.class, mode.radius)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Gap Examples */}
            <div>
              <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>[GAP]:</p>
              <div className="space-y-4">
                {[
                  { name: "gap-1", value: "4px" },
                  { name: "gap-2", value: "8px" },
                  { name: "gap-4", value: "16px" },
                  { name: "gap-6", value: "24px" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <span className={cn("text-muted-foreground w-20 text-xs", mode.font)}>
                      {item.name}
                    </span>
                    <span className={cn("text-muted-foreground w-12 text-xs", mode.font)}>
                      {item.value}
                    </span>
                    <div className={cn("flex", item.name.replace("gap-", "gap-"))}>
                      <div className={cn("bg-primary/50 h-8 w-8", mode.radius)} />
                      <div className={cn("bg-primary/50 h-8 w-8", mode.radius)} />
                      <div className={cn("bg-primary/50 h-8 w-8", mode.radius)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 4: RADIUS */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x04" title="RADIUS" />
          <div className="space-y-8 p-6">
            <div>
              <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>
                [BORDER_RADIUS]:
              </p>
              <p className={cn("text-muted-foreground mb-6 text-xs", mode.font)}>
                Terminal theme uses rounded-none. Other values shown for reference.
              </p>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-7">
                {[
                  { name: "none", value: "0px", class: "rounded-none", active: true },
                  { name: "sm", value: "2px", class: "rounded-sm", active: false },
                  { name: "md", value: "6px", class: "rounded-md", active: false },
                  { name: "lg", value: "8px", class: "rounded-lg", active: false },
                  { name: "xl", value: "12px", class: "rounded-xl", active: false },
                  { name: "2xl", value: "16px", class: "rounded-2xl", active: false },
                  { name: "full", value: "9999px", class: "rounded-full", active: false },
                ].map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div
                      className={cn(
                        "border-2 bg-primary/20 h-16 w-full",
                        item.class,
                        item.active ? "border-primary" : "border-border"
                      )}
                    />
                    <p
                      className={cn(
                        "text-xs font-medium",
                        item.active ? "text-primary" : "text-foreground",
                        mode.font
                      )}
                    >
                      {item.name}
                      {item.active && " *"}
                    </p>
                    <p className={cn("text-muted-foreground text-xs", mode.font)}>{item.value}</p>
                  </div>
                ))}
              </div>
              <p className={cn("text-muted-foreground mt-4 text-xs", mode.font)}>
                * Currently active in terminal theme
              </p>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 5: SHADOWS */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x05" title="SHADOWS" />
          <div className="space-y-8 p-6">
            <div>
              <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>
                [BOX_SHADOW]:
              </p>
              <p className={cn("text-muted-foreground mb-6 text-xs", mode.font)}>
                Terminal theme uses minimal shadows. Border-based elevation preferred.
              </p>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
                {[
                  { name: "none", class: "shadow-none", active: true },
                  { name: "sm", class: "shadow-sm", active: false },
                  { name: "md", class: "shadow-md", active: false },
                  { name: "lg", class: "shadow-lg", active: false },
                  { name: "xl", class: "shadow-xl", active: false },
                  { name: "2xl", class: "shadow-2xl", active: false },
                ].map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div
                      className={cn(
                        "bg-card border-border h-16 w-full border",
                        item.class,
                        mode.radius
                      )}
                    />
                    <p
                      className={cn(
                        "text-xs font-medium",
                        item.active ? "text-primary" : "text-foreground",
                        mode.font
                      )}
                    >
                      {item.name}
                      {item.active && " *"}
                    </p>
                  </div>
                ))}
              </div>
              <p className={cn("text-muted-foreground mt-4 text-xs", mode.font)}>
                * Preferred in terminal theme (no shadow)
              </p>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 6: MOTION */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x06" title="MOTION" />
          <div className="space-y-8 p-6">
            <div>
              <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>
                [DURATION]:
              </p>
              <div className="space-y-3">
                {[
                  { name: "instant", value: "0ms" },
                  { name: "fast", value: "100ms" },
                  { name: "normal", value: "200ms" },
                  { name: "slow", value: "300ms" },
                  { name: "slower", value: "500ms" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <span className={cn("text-muted-foreground w-20 text-xs", mode.font)}>
                      {item.name}
                    </span>
                    <span className={cn("text-muted-foreground w-16 text-xs", mode.font)}>
                      {item.value}
                    </span>
                    <div className={cn("text-foreground text-xs", mode.font)}>
                      transition-all duration-{item.value.replace("ms", "")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>
                [EASING]:
              </p>
              <div className="space-y-3">
                {[
                  { name: "linear", value: "linear" },
                  { name: "in", value: "ease-in" },
                  { name: "out", value: "ease-out" },
                  { name: "in-out", value: "ease-in-out" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <span className={cn("text-muted-foreground w-20 text-xs", mode.font)}>
                      {item.name}
                    </span>
                    <span className={cn("text-foreground text-xs", mode.font)}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 7: Z-INDEX */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x07" title="Z_INDEX" />
          <div className="p-6">
            <p className={cn("text-foreground mb-4 text-xs font-semibold", mode.font)}>
              [LAYER_SCALE]:
            </p>
            <div className="space-y-3">
              {[
                { name: "base", value: "0" },
                { name: "raised", value: "10" },
                { name: "dropdown", value: "20" },
                { name: "sticky", value: "30" },
                { name: "overlay", value: "40" },
                { name: "modal", value: "50" },
                { name: "popover", value: "60" },
                { name: "toast", value: "70" },
                { name: "tooltip", value: "80" },
                { name: "max", value: "9999" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <span className={cn("text-muted-foreground w-20 text-xs", mode.font)}>
                    {item.name}
                  </span>
                  <span className={cn("text-foreground w-12 text-xs", mode.font)}>{item.value}</span>
                  <div className="bg-muted h-1 flex-1">
                    <div
                      className="bg-primary h-1"
                      style={{ width: `${Math.min((parseInt(item.value) / 100) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
