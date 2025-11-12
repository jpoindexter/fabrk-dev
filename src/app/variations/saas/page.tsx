/**
 * SaaS Landing Page Variation
 * Feature-focused, professional B2B design
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Check, Shield, Zap, Lock, Database, Cloud,
  ArrowRight, Star, Building2, ArrowLeft
} from "lucide-react";

export default function SaaSVariation() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Fabrk SaaS</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium hover:text-primary transition">Features</Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-primary transition">Pricing</Link>
              <Link href="#security" className="text-sm font-medium hover:text-primary transition">Security</Link>
              <Link href="/components" className="text-sm font-medium hover:text-primary transition">Docs</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/#pricing">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Enterprise Ready
                </Badge>
                <Badge variant="outline">SOC 2 Compliant</Badge>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                The Complete SaaS Platform for Modern Teams
              </h1>

              <p className="text-xl text-muted-foreground">
                Everything your business needs to scale. Authentication, payments, 
                team management, and analytics in one production-ready platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/#pricing">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/components">View Documentation</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-background" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Trusted by 10,000+ teams</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-border p-8">
                <div className="h-full bg-card rounded-xl border border-border shadow-2xl flex items-center justify-center">
                  <p className="text-muted-foreground">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border bg-accent/30">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10k+", label: "Active Users" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "24/7", label: "Support" },
              { value: "50+", label: "Integrations" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Enterprise-Grade Features</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to run a successful SaaS business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Enterprise Security",
                features: ["SOC 2 Type II", "GDPR Compliant", "256-bit encryption", "SSO & SAML"]
              },
              {
                icon: Zap,
                title: "Built to Scale",
                features: ["99.9% uptime SLA", "Auto-scaling", "CDN included", "Global edge network"]
              },
              {
                icon: Lock,
                title: "Advanced Auth",
                features: ["Multi-factor auth", "Role-based access", "Session management", "OAuth providers"]
              },
              {
                icon: Database,
                title: "Data Management",
                features: ["Automated backups", "Data encryption", "Export tools", "Audit logs"]
              },
              {
                icon: Cloud,
                title: "Cloud Native",
                features: ["Kubernetes ready", "Docker support", "CI/CD pipelines", "Zero downtime deploys"]
              },
              {
                icon: Star,
                title: "Premium Support",
                features: ["24/7 support", "Dedicated account manager", "Priority bug fixes", "Custom SLAs"]
              },
            ].map((feature, i) => (
              <Card key={i} className="hover:border-primary/50 transition-all">
                <CardContent className="pt-6">
                  <feature.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-4">{feature.title}</h3>
                  <ul className="space-y-2">
                    {feature.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to scale your business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of companies using Fabrk to power their SaaS
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              View All Styles
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 Fabrk. Enterprise SaaS Boilerplate.
            </p>
            <Link href="/variations" className="text-sm hover:text-primary transition">
              View All Landing Page Styles →
            </Link>
          </div>
        </div>
      </footer>

      {/* Style Badge */}
      <div className="fixed bottom-4 right-4">
        <Badge className="bg-card border-2 border-primary shadow-lg p-3">
          <Building2 className="h-4 w-4 mr-2" />
          SaaS Professional Style
        </Badge>
      </div>
    </div>
  );
}
