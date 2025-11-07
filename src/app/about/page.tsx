/**
 * About Us Page
 * Company story, mission, and values
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Rocket,
  Target,
  Users,
  Zap,
  Heart,
  Code,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "About Us | Fabrk",
  description: "Learn about Fabrk's mission to help developers ship SaaS products faster",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b-3 border-border bg-gradient-to-b from-accent/30 to-background py-20">
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <Badge variant="secondary" className="mb-4">
            Our Story
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Built by Developers,
            <br />
            <span className="text-primary">For Developers</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to eliminate the repetitive work that slows down every
            SaaS project, so you can focus on building features that matter.
          </p>
        </div>
      </section>

      <main className="container mx-auto max-w-7xl px-6 py-16 space-y-20">
        {/* Mission */}
        <section>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex p-4 rounded-full bg-primary/10 border-3 border-border mb-4">
              <Target className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every developer has experienced the frustration of rebuilding the same
              authentication system, payment integration, and UI components for the
              hundredth time. We created Fabrk to solve this problem once and for all.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our mission is simple: <strong>help you ship your SaaS product in days, not
              months</strong>. We handle the boring infrastructure so you can focus on the
              innovation that makes your product unique.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-accent/20 -mx-6 px-6 py-16 md:-mx-16 md:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we build
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Rocket,
                  title: "Ship Fast",
                  description:
                    "Time is your most valuable resource. Our boilerplate is designed to get you from idea to launch in record time, without compromising quality.",
                },
                {
                  icon: Code,
                  title: "Clean Code",
                  description:
                    "We write code the way you would write it yourself. No over-engineering, no unnecessary abstractions. Just clean, maintainable TypeScript.",
                },
                {
                  icon: Zap,
                  title: "Performance First",
                  description:
                    "Every line of code is optimized for speed. We use the latest Next.js features, server components, and best practices to ensure your app is lightning fast.",
                },
                {
                  icon: Users,
                  title: "Developer Experience",
                  description:
                    "We're developers too. We know what frustrates you, and we've built Fabrk to eliminate those pain points with great docs and thoughtful defaults.",
                },
                {
                  icon: Heart,
                  title: "No Lock-In",
                  description:
                    "You own the code. No proprietary frameworks, no vendor lock-in. Build on top of industry-standard tools and deploy anywhere.",
                },
                {
                  icon: CheckCircle2,
                  title: "Production Ready",
                  description:
                    "From security to error handling to performance optimization, every aspect is built with production deployments in mind.",
                },
              ].map((value, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="p-3 rounded-lg bg-primary/10 border-2 border-border mb-4 w-fit">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">The Story Behind Fabrk</h2>
              <p className="text-xl text-muted-foreground">
                From frustration to solution
              </p>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Like many developers, we were tired of rebuilding the same infrastructure for
                every new SaaS project. Authentication, payments, database setup, email
                integration—it's the same story every time.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                We looked at existing solutions, but they all had the same problems:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Over-engineered with 1000+ files you'll never use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Proprietary frameworks that lock you in</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Poor documentation and unclear architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Bloated with features you don't need</span>
                </li>
              </ul>

              <p className="text-lg text-muted-foreground leading-relaxed">
                So we built Fabrk differently. We started with a 1000+ file codebase, then
                ruthlessly cut it down to just the essentials. We removed every line of code
                that didn't serve a clear purpose. We focused on clarity over cleverness.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                The result? A boilerplate with ~160 files that includes everything you need
                and nothing you don't. Clean TypeScript, modern Next.js, industry-standard
                tools, and comprehensive documentation.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-accent/20 -mx-6 px-6 py-16 md:-mx-16 md:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold">By the Numbers</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: "500+", label: "Developers" },
                { value: "1000+", label: "Projects Launched" },
                { value: "4.9/5", label: "Average Rating" },
                { value: "~160", label: "Essential Files" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-5xl font-black text-primary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Fabrk */}
        <section>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Why Choose Fabrk?</h2>
              <p className="text-xl text-muted-foreground">
                We're not just selling code, we're selling time
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Save Weeks of Development",
                  description:
                    "What normally takes 2-4 weeks to build from scratch is ready in minutes. Focus on your unique features, not boilerplate.",
                },
                {
                  title: "Production-Grade Security",
                  description:
                    "Security headers, rate limiting, token hashing, CSRF protection—all the security best practices implemented and tested.",
                },
                {
                  title: "Modern Tech Stack",
                  description:
                    "Built on Next.js 15, TypeScript, Prisma, NextAuth v5, and Stripe. The tools you're already using or want to learn.",
                },
                {
                  title: "Lifetime Updates",
                  description:
                    "One-time payment, lifetime access to all updates. No subscriptions, no hidden fees.",
                },
              ].map((item, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-6 py-12">
          <h2 className="text-4xl font-bold">Ready to Build Your SaaS?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join 500+ developers who are shipping faster with Fabrk
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/#pricing">
                Get Started - $79
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/features">View All Features</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            ✓ Instant access ✓ Lifetime updates ✓ 30-day money-back guarantee
          </p>
        </section>
      </main>
    </div>
  );
}
