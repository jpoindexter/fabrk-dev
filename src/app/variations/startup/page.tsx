/**
 * Startup Bold Landing Page Variation
 * Attention-grabbing design with bold typography, gradients, and high contrast
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Rocket, Zap, Target, TrendingUp, Sparkles, ArrowRight,
  Check, Globe, Code, Layers, ArrowLeft, ChevronRight
} from "lucide-react";

export default function StartupVariation() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500" />
              <span className="text-2xl font-black">FABRK</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold border-0 shadow-lg shadow-purple-500/50"
                asChild
              >
                <Link href="/#pricing">
                  Start Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-blue-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3),transparent_50%)]" />

        <div className="container mx-auto max-w-7xl px-6 relative">
          <div className="text-center max-w-5xl mx-auto space-y-10">
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 px-4 py-2 text-sm font-bold">
              <Sparkles className="h-4 w-4 mr-2" />
              SHIP YOUR MVP IN DAYS, NOT MONTHS
            </Badge>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
              BUILD THE
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                FUTURE FASTER
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-white/80 font-bold max-w-3xl mx-auto leading-tight">
              Stop wasting time on boilerplate. Start with auth, payments, and
              a stunning UI. Launch your startup TODAY.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
              <Button
                size="xl"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black text-xl px-12 py-8 border-0 shadow-2xl shadow-purple-500/50 hover:scale-105 transition-all"
                asChild
              >
                <Link href="/#pricing">
                  GET STARTED NOW
                  <Rocket className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-xl px-12 py-8 backdrop-blur"
                asChild
              >
                <Link href="/variations">
                  <ArrowLeft className="mr-3 h-6 w-6" />
                  OTHER STYLES
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
              {[
                { icon: Zap, text: "Deploy in 5 min" },
                { icon: Target, text: "100% customizable" },
                { icon: TrendingUp, text: "Built to scale" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-pink-400" />
                  </div>
                  <p className="text-sm font-bold text-white/80">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-black">
              EVERYTHING YOU NEED
            </h2>
            <p className="text-2xl text-white/60 font-bold">
              No compromises. Just results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Rocket,
                title: "LAUNCH FAST",
                description: "Go from idea to production in hours. Pre-built auth, payments, and UI components.",
                gradient: "from-pink-500 to-rose-500"
              },
              {
                icon: Code,
                title: "CLEAN CODE",
                description: "TypeScript, Next.js 15, Tailwind. Modern stack, zero technical debt.",
                gradient: "from-purple-500 to-indigo-500"
              },
              {
                icon: Layers,
                title: "FULL STACK",
                description: "Database, API routes, webhooks, emails. Everything wired up and ready.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Zap,
                title: "PERFORMANCE",
                description: "Optimized for speed. Server components, edge runtime, lightning fast.",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: Globe,
                title: "PRODUCTION READY",
                description: "Security headers, rate limiting, error handling. Ship with confidence.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: TrendingUp,
                title: "SCALE UP",
                description: "Built to grow with you. From MVP to millions of users.",
                gradient: "from-red-500 to-pink-500"
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 hover:border-white/30 transition-all hover:scale-105 backdrop-blur"
              >
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black">{feature.title}</h3>
                  <p className="text-white/60 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-y border-white/10 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {[
              { value: "500+", label: "Startups Launched" },
              { value: "$2M+", label: "Revenue Generated" },
              { value: "4.9★", label: "Average Rating" },
              { value: "100%", label: "Money Back Guarantee" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-lg text-white/60 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 bg-black">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-black">WHAT YOU GET</h2>
              <p className="text-xl text-white/60 font-bold">
                Everything to go from zero to launch
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-8">
              {[
                "NextAuth v5 with OAuth",
                "Stripe payments & webhooks",
                "PostgreSQL + Prisma ORM",
                "25+ UI components",
                "Email with Resend",
                "Dark mode support",
                "TypeScript strict mode",
                "Rate limiting built-in",
                "SEO optimized",
                "Mobile responsive",
                "Lifetime updates",
                "Full source code",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <p className="font-bold text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="container mx-auto max-w-4xl px-6 relative text-center space-y-10">
          <h2 className="text-5xl md:text-7xl font-black leading-tight">
            STOP PLANNING.
            <br />
            START BUILDING.
          </h2>

          <p className="text-2xl font-bold text-white/90 max-w-2xl mx-auto">
            Join 500+ founders who chose to ship fast with Fabrk.
            One-time payment. Lifetime access. Zero regrets.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
            <Button
              size="xl"
              className="bg-black text-white hover:bg-black/90 font-black text-2xl px-12 py-8 shadow-2xl hover:scale-105 transition-all"
              asChild
            >
              <Link href="/#pricing">
                BUY NOW - $79
                <ChevronRight className="ml-3 h-7 w-7" />
              </Link>
            </Button>
          </div>

          <p className="text-sm text-white/60 font-medium pt-4">
            ✓ Instant access ✓ All future updates ✓ 30-day money back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 font-medium">
              © 2024 Fabrk. Built for builders.
            </p>
            <div className="flex gap-6">
              <Link href="/variations" className="text-white/60 hover:text-white transition font-medium">
                All Variations
              </Link>
              <Link href="/components" className="text-white/60 hover:text-white transition font-medium">
                Components
              </Link>
              <Link href="/" className="text-white/60 hover:text-white transition font-medium">
                Default Theme
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Style Badge */}
      <div className="fixed bottom-6 right-6">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-4 shadow-2xl shadow-purple-500/50 border-2 border-white/20">
          <p className="font-black text-sm mb-1">STARTUP BOLD</p>
          <p className="text-xs text-white/80 mb-3 font-medium">
            High-energy design for MVPs
          </p>
          <Button
            size="sm"
            className="w-full bg-black/30 hover:bg-black/50 border border-white/20 backdrop-blur"
            asChild
          >
            <Link href="/variations">
              View All 4 Styles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
