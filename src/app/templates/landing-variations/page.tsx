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
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="border-border inline-block border px-4 py-1">
            <span className="text-muted-foreground font-mono text-xs">
              [TEMPLATE]: LANDING_VARIATIONS
            </span>
          </div>
          <h1 className="font-mono text-4xl font-semibold tracking-tight">
            Landing Page Variations
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            Three hero section variations for different use cases
          </p>
        </div>

        {/* Variation Selector */}
        <Tabs value={activeVariation} onValueChange={setActiveVariation}>
          <div className="border-border bg-card border">
            <div className="border-border border-b px-4 py-2">
              <span className="text-muted-foreground font-mono text-xs">
                [ [0x00] VARIATION_SELECTOR ]
              </span>
            </div>
            <TabsList className="h-auto w-full justify-start rounded-none border-0 bg-transparent p-0">
              {heroVariations.map((variation) => (
                <TabsTrigger
                  key={variation.id}
                  value={variation.id}
                  className="border-border data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:border-b-primary data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted/50 data-[state=inactive]:hover:text-foreground flex-1 rounded-none border-r px-4 py-3 font-mono text-xs last:border-r-0 data-[state=active]:border-b-2"
                >
                  [{variation.name.toUpperCase().replace(" ", "_")}]
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="text-muted-foreground border-border border-t p-4 font-mono text-xs">
              [SELECTED]: {heroVariations.find((v) => v.id === activeVariation)?.description}
            </div>
          </div>

          {/* Hero Previews */}
          {/* Centered Hero */}
          <TabsContent value="centered" className="mt-6">
            <div className="border-border bg-card border">
              <div className="border-border border-b px-4 py-2">
                <span className="text-muted-foreground font-mono text-xs">
                  [ [0x01] HERO_CENTERED ]
                </span>
              </div>
              <div className="from-muted/30 bg-gradient-to-b to-transparent p-8">
                <div className="mx-auto max-w-3xl space-y-6 text-center">
                  <Badge variant="secondary" className="rounded-none font-mono text-xs">
                    <Sparkles className="mr-1 h-3 w-3" />
                    NEW: VERSION 2.0 RELEASED
                  </Badge>

                  <h2 className="font-mono text-4xl font-bold tracking-tight md:text-5xl">
                    Build faster with
                    <span className="text-primary"> production-ready </span>
                    components
                  </h2>

                  <p className="text-muted-foreground mx-auto max-w-xl font-mono text-sm">
                    Ship your SaaS in days, not months. 234 components, authentication, payments,
                    and everything you need to launch.
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    <Button className="rounded-none font-mono text-xs">
                      &gt; GET_STARTED
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                    <Button variant="outline" className="rounded-none font-mono text-xs">
                      <Play className="mr-1 h-3 w-3" />
                      &gt; WATCH_DEMO
                    </Button>
                  </div>

                  <div className="text-muted-foreground flex items-center justify-center gap-6 pt-4 font-mono text-xs">
                    <div className="flex items-center gap-1">
                      <Check className="text-success h-3 w-3" />
                      Free trial
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="text-success h-3 w-3" />
                      No credit card
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="text-success h-3 w-3" />
                      Cancel anytime
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Split Hero */}
          <TabsContent value="split" className="mt-6">
            <div className="border-border bg-card border">
              <div className="border-border border-b px-4 py-2">
                <span className="text-muted-foreground font-mono text-xs">
                  [ [0x02] HERO_SPLIT ]
                </span>
              </div>
              <div className="from-muted/30 bg-gradient-to-b to-transparent p-8">
                <div className="grid items-center gap-12 md:grid-cols-2">
                  <div className="space-y-6">
                    <Badge variant="secondary" className="rounded-none font-mono text-xs">
                      <Zap className="mr-1 h-3 w-3" />
                      TRUSTED BY 10,000+ DEVELOPERS
                    </Badge>

                    <h2 className="font-mono text-4xl font-bold tracking-tight">
                      The fastest way to build your
                      <span className="text-primary"> next SaaS</span>
                    </h2>

                    <p className="text-muted-foreground font-mono text-sm">
                      Stop reinventing the wheel. Our boilerplate gives you authentication,
                      payments, emails, and a beautiful UI out of the box.
                    </p>

                    <div className="space-y-4">
                      {[
                        { icon: Shield, text: "Enterprise-grade security" },
                        { icon: Rocket, text: "Deploy in minutes" },
                        { icon: Sparkles, text: "AI-powered features" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 font-mono text-sm">
                          <item.icon className="text-primary h-4 w-4" />
                          {item.text}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <Button className="rounded-none font-mono text-xs">
                        &gt; START_BUILDING
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                      <Button variant="link" className="text-primary font-mono text-xs">
                        View documentation →
                      </Button>
                    </div>
                  </div>

                  <div className="border-border bg-muted/30 flex aspect-video items-center justify-center border">
                    <span className="text-muted-foreground font-mono text-xs">
                      [PRODUCT_SCREENSHOT]
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Minimal Hero */}
          <TabsContent value="minimal" className="mt-6">
            <div className="border-border bg-card border">
              <div className="border-border border-b px-4 py-2">
                <span className="text-muted-foreground font-mono text-xs">
                  [ [0x03] HERO_MINIMAL ]
                </span>
              </div>
              <div className="from-muted/30 bg-gradient-to-b to-transparent p-8">
                <div className="mx-auto max-w-2xl space-y-8">
                  <div className="space-y-4 text-center">
                    <h2 className="font-mono text-4xl font-bold tracking-tight md:text-5xl">
                      Ship your startup
                      <span className="text-primary"> this weekend</span>
                    </h2>

                    <p className="text-muted-foreground font-mono text-sm">
                      Everything you need. Nothing you don&apos;t.
                    </p>
                  </div>

                  <div className="mx-auto flex max-w-md items-center gap-2">
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
                        <Star key={i} className="text-warning fill-warning h-4 w-4" />
                      ))}
                      <span className="text-muted-foreground ml-2 font-mono text-xs">
                        4.9/5 from 200+ reviews
                      </span>
                    </div>
                  </div>

                  <div className="text-muted-foreground flex items-center justify-center gap-6 font-mono text-xs">
                    <span className="border-border border px-2 py-1">VERCEL</span>
                    <span className="border-border border px-2 py-1">STRIPE</span>
                    <span className="border-border border px-2 py-1">PRISMA</span>
                    <span className="border-border border px-2 py-1">NEXT.JS</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Reference Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {heroVariations.map((variation, idx) => (
            <div
              key={variation.id}
              role="button"
              tabIndex={0}
              className={`bg-card cursor-pointer border transition-colors ${
                activeVariation === variation.id
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setActiveVariation(variation.id)}
              onKeyDown={(e) => e.key === "Enter" && setActiveVariation(variation.id)}
            >
              <div className="border-border border-b px-4 py-2">
                <span className="text-muted-foreground font-mono text-xs">
                  [ [0x0{idx + 4}] {variation.id.toUpperCase()} ]
                </span>
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-mono font-semibold">{variation.name}</h3>
                <p className="text-muted-foreground font-mono text-xs">{variation.description}</p>
                <div className="mt-4 font-mono text-xs">
                  [BEST_FOR]: {variation.id === "centered" && "Product launches, SaaS"}
                  {variation.id === "split" && "Feature showcases, B2B"}
                  {variation.id === "minimal" && "Waitlists, early stage"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Card */}
        <div className="border-border bg-card border">
          <div className="border-border border-b px-4 py-2">
            <span className="text-muted-foreground font-mono text-xs">
              [ [0x07] TEMPLATE_FEATURES ]
            </span>
          </div>
          <div className="p-4">
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> 3 hero variations (centered, split,
                minimal)
              </div>
              <div>
                <span className="text-success">&gt;</span> Interactive variation switcher
              </div>
              <div>
                <span className="text-success">&gt;</span> Trust badges and social proof
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
            <div className="text-muted-foreground mt-4 font-mono text-xs">
              [NOTE]: Mix and match elements from each variation to create your perfect landing
              page.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
