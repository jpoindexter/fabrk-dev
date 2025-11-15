/**
 * Modern Minimal Landing Page Variation
 * Vercel-inspired minimal aesthetic with soft shadows and subtle interactions
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, Check, Zap, Shield, Rocket,
  ArrowLeft, Star, Users
} from "lucide-react";

export default function ModernVariation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-6 py-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-semibold">Fabrk</h1>
              <div className="hidden md:flex gap-6">
                <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
                <Link href="/components" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Components</Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="rounded-lg" asChild>
                <Link href="/#pricing">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="outline" className="rounded-md border-border">
              <Star className="h-3 w-3 mr-1.5" />
              Modern Design System
            </Badge>

            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight">
              Ship Your SaaS
              <span className="text-primary"> Faster</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Production-ready Next.js boilerplate with authentication, payments,
              and a beautiful component library. Start building today.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
              <Button size="lg" className="rounded-lg hover:opacity-90 transition-opacity" asChild>
                <Link href="/#pricing">
                  Get Started - $79
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-lg" asChild>
                <Link href="/variations">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  View All Styles
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="font-medium">No subscription</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="font-medium">Lifetime updates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="font-medium">Full source code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-accent/20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16 space-y-3">
            <Badge variant="outline" className="rounded-md border-border mb-2">Features</Badge>
            <h2 className="text-4xl font-semibold mb-3">Everything you need to ship</h2>
            <p className="text-muted-foreground text-base">
              All the tools and components to build your SaaS product
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Next.js 15",
                description: "Built on the latest Next.js with App Router, Server Components, and Turbopack."
              },
              {
                icon: Shield,
                title: "Secure Auth",
                description: "NextAuth v5 with email/password, OAuth, and session management built-in."
              },
              {
                icon: Rocket,
                title: "Stripe Payments",
                description: "Complete payment flow with one-time and subscription support."
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors shadow-sm hover:shadow-md"
              >
                <feature.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <p className="text-muted-foreground text-sm font-medium">
                Trusted by 500+ developers to ship their SaaS products
              </p>
            </div>
            <div className="flex items-center justify-center gap-1">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
              <span className="ml-2 text-sm text-muted-foreground font-medium">
                (4.9/5 from 127 reviews)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
              Ready to ship your SaaS?
            </h2>
            <p className="text-lg md:text-xl opacity-90">
              Join hundreds of developers who chose Fabrk to launch faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button size="lg" variant="secondary" className="rounded-lg hover:opacity-90 transition-opacity" asChild>
                <Link href="/#pricing">
                  Get Started - $79
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-lg border-white/20 text-white hover:bg-white/10" asChild>
                <Link href="/components">View Components</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background/50">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-medium">
              © 2024 Fabrk Boilerplate. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/variations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                All Variations
              </Link>
              <Link href="/components" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Components
              </Link>
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Default Style
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Style Note Banner */}
      <div className="fixed bottom-4 right-4 max-w-sm">
        <div className="bg-card border border-border rounded-lg p-4 shadow-md">
          <p className="text-sm font-semibold mb-1">Modern Minimal Style</p>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Vercel-inspired minimal aesthetic with soft shadows
          </p>
          <Button size="sm" variant="outline" className="w-full rounded-md" asChild>
            <Link href="/variations">
              View All 4 Styles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
