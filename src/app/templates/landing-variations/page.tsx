/**
 * FABRK COMPONENT
 * Landing Page Variations Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  Shield,
  Rocket,
  Check,
  Star,
  ChevronRight,
} from "lucide-react";

const heroVariations = [
  {
    id: "centered",
    name: "Centered Hero",
    description: "Classic centered layout with headline, subtext, and CTAs",
  },
  {
    id: "split",
    name: "Split Hero",
    description: "Two-column layout with text and visual side by side",
  },
  {
    id: "minimal",
    name: "Minimal Hero",
    description: "Clean, focused hero with single CTA and trust badges",
  },
];

export default function LandingVariationsTemplate() {
  const [activeVariation, setActiveVariation] = useState("centered");

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block border border-border px-4 py-1">
            <span className="font-mono text-xs text-muted-foreground">
              [TEMPLATE]: LANDING_VARIATIONS
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Landing Page Variations
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            Three hero section variations for different use cases
          </p>
        </div>

        {/* Variation Selector */}
        <Tabs value={activeVariation} onValueChange={setActiveVariation}>
          <div className="border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-2">
                <div className="size-2 rounded-none bg-destructive/50" />
                <div className="size-2 rounded-none bg-warning/50" />
                <div className="size-2 rounded-none bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                variation_selector.tsx
              </span>
            </div>
            <TabsList className="w-full justify-start rounded-none border-0 bg-transparent p-0 h-auto">
              {heroVariations.map((variation) => (
                <TabsTrigger
                  key={variation.id}
                  value={variation.id}
                  className="flex-1 px-4 py-4 border-r border-border last:border-r-0 rounded-none font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground"
                >
                  [{variation.name.toUpperCase().replace(" ", "_")}]
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="p-4 font-mono text-xs text-muted-foreground border-t border-border">
              [SELECTED]: {heroVariations.find((v) => v.id === activeVariation)?.description}
            </div>
          </div>

          {/* Hero Previews */}
          {/* Centered Hero */}
          <TabsContent value="centered" className="mt-6">
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-2">
                  <div className="size-2 rounded-none bg-destructive/50" />
                  <div className="size-2 rounded-none bg-warning/50" />
                  <div className="size-2 rounded-none bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  hero_centered.tsx
                </span>
              </div>
              <div className="p-8 bg-gradient-to-b from-muted/30 to-transparent">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <Badge variant="secondary" className="rounded-none font-mono text-xs">
                    <Sparkles className="mr-1 h-3 w-3" />
                    NEW: VERSION 2.0 RELEASED
                  </Badge>

                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Build faster with
                    <span className="text-primary"> production-ready </span>
                    components
                  </h2>

                  <p className="font-mono text-sm text-muted-foreground max-w-xl mx-auto">
                    Ship your SaaS in days, not months. 234 components, authentication,
                    payments, and everything you need to launch.
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    <Button className="rounded-none font-mono text-xs">
                      &gt; GET_STARTED
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-none font-mono text-xs"
                    >
                      <Play className="mr-1 h-3 w-3" />
                      &gt; WATCH_DEMO
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-6 pt-4 font-mono text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-success" />
                      Free trial
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-success" />
                      No credit card
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-success" />
                      Cancel anytime
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Split Hero */}
          <TabsContent value="split" className="mt-6">
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-2">
                  <div className="size-2 rounded-none bg-destructive/50" />
                  <div className="size-2 rounded-none bg-warning/50" />
                  <div className="size-2 rounded-none bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  hero_split.tsx
                </span>
              </div>
              <div className="p-8 bg-gradient-to-b from-muted/30 to-transparent">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <Badge variant="secondary" className="rounded-none font-mono text-xs">
                      <Zap className="mr-1 h-3 w-3" />
                      TRUSTED BY 10,000+ DEVELOPERS
                    </Badge>

                    <h2 className="text-4xl font-bold tracking-tight">
                      The fastest way to build your
                      <span className="text-primary"> next SaaS</span>
                    </h2>

                    <p className="font-mono text-sm text-muted-foreground">
                      Stop reinventing the wheel. Our boilerplate gives you
                      authentication, payments, emails, and a beautiful UI out of
                      the box.
                    </p>

                    <div className="space-y-4">
                      {[
                        { icon: Shield, text: "Enterprise-grade security" },
                        { icon: Rocket, text: "Deploy in minutes" },
                        { icon: Sparkles, text: "AI-powered features" },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 font-mono text-sm"
                        >
                          <item.icon className="h-4 w-4 text-primary" />
                          {item.text}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <Button className="rounded-none font-mono text-xs">
                        &gt; START_BUILDING
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                      <Button
                        variant="link"
                        className="font-mono text-xs text-primary"
                      >
                        View documentation →
                      </Button>
                    </div>
                  </div>

                  <div className="border border-border bg-muted/30 aspect-video flex items-center justify-center">
                    <span className="font-mono text-xs text-muted-foreground">
                      [PRODUCT_SCREENSHOT]
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Minimal Hero */}
          <TabsContent value="minimal" className="mt-6">
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-2">
                  <div className="size-2 rounded-none bg-destructive/50" />
                  <div className="size-2 rounded-none bg-warning/50" />
                  <div className="size-2 rounded-none bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  hero_minimal.tsx
                </span>
              </div>
              <div className="p-8 bg-gradient-to-b from-muted/30 to-transparent">
                <div className="max-w-2xl mx-auto space-y-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                      Ship your startup
                      <span className="text-primary"> this weekend</span>
                    </h2>

                    <p className="font-mono text-sm text-muted-foreground">
                      Everything you need. Nothing you don&apos;t.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 max-w-md mx-auto">
                    <Input
                      placeholder="Enter your email"
                      className="rounded-none font-mono text-sm"
                    />
                    <Button className="rounded-none font-mono text-xs whitespace-nowrap">
                      &gt; GET_ACCESS
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-8 pt-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-warning fill-warning"
                        />
                      ))}
                      <span className="ml-2 font-mono text-xs text-muted-foreground">
                        4.9/5 from 200+ reviews
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-6 font-mono text-xs text-muted-foreground">
                    <span className="border border-border px-2 py-1">VERCEL</span>
                    <span className="border border-border px-2 py-1">STRIPE</span>
                    <span className="border border-border px-2 py-1">PRISMA</span>
                    <span className="border border-border px-2 py-1">
                      NEXT.JS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Reference Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {heroVariations.map((variation) => (
            <div
              key={variation.id}
              className={`border bg-card cursor-pointer transition-colors ${
                activeVariation === variation.id
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setActiveVariation(variation.id)}
            >
              <div className="flex items-center gap-2 border-b border-border px-4 py-1.5">
                <div className="flex gap-1">
                  <div className="size-1.5 rounded-none bg-destructive/50" />
                  <div className="size-1.5 rounded-none bg-warning/50" />
                  <div className="size-1.5 rounded-none bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {variation.id}.tsx
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{variation.name}</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  {variation.description}
                </p>
                <div className="mt-4 font-mono text-xs">
                  [BEST_FOR]:{" "}
                  {variation.id === "centered" && "Product launches, SaaS"}
                  {variation.id === "split" && "Feature showcases, B2B"}
                  {variation.id === "minimal" && "Waitlists, early stage"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Card */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-2">
              <div className="size-2 rounded-none bg-destructive/50" />
              <div className="size-2 rounded-none bg-warning/50" />
              <div className="size-2 rounded-none bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              features.md
            </span>
          </div>
          <div className="p-4">
            <div className="mb-4 font-mono text-xs text-muted-foreground">
              [TEMPLATE_FEATURES]:
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> 3 hero variations
                (centered, split, minimal)
              </div>
              <div>
                <span className="text-success">&gt;</span> Interactive variation
                switcher
              </div>
              <div>
                <span className="text-success">&gt;</span> Trust badges and
                social proof
              </div>
              <div>
                <span className="text-success">&gt;</span> Email capture form
              </div>
              <div>
                <span className="text-success">&gt;</span> Feature highlights
              </div>
              <div>
                <span className="text-success">&gt;</span> Responsive layouts
              </div>
            </div>
            <div className="mt-4 font-mono text-xs text-muted-foreground">
              [NOTE]: Mix and match elements from each variation to create your
              perfect landing page.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
