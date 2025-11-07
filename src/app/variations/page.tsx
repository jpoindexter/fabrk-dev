/**
 * Landing Page Variations Showcase
 * Multiple styled landing pages for buyers to preview
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
import { ArrowRight, Eye, Home, Sparkles, Zap } from "lucide-react";

const variations = [
  {
    id: "default",
    name: "Neo-Brutalism (Current)",
    description: "Bold borders, hard shadows, purple accents. The default Fabrk theme.",
    href: "/",
    badge: "Default",
    features: ["3px borders", "Hard shadows", "Press animations", "Purple theme"],
  },
  {
    id: "modern",
    name: "Modern Minimal",
    description: "Clean, sleek design with subtle shadows and smooth animations.",
    href: "/variations/modern",
    badge: "Popular",
    features: ["Soft shadows", "Smooth transitions", "Blue accents", "Minimal borders"],
  },
  {
    id: "saas",
    name: "SaaS Landing",
    description: "Feature-focused layout perfect for B2B SaaS products.",
    href: "/variations/saas",
    badge: "B2B",
    features: ["Feature grid", "Social proof", "CTA-optimized", "Professional"],
  },
  {
    id: "startup",
    name: "Startup Bold",
    description: "Attention-grabbing design for early-stage startups and MVPs.",
    href: "/variations/startup",
    badge: "New",
    features: ["Bold typography", "Gradient accents", "High contrast", "Energetic"],
  },
];

export default function VariationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-3 border-border bg-card">
        <div className="container mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Landing Page Variations</h1>
              <p className="text-muted-foreground text-lg">
                4 pre-built designs. All included in your purchase.
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-12">
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>All Variations Included</CardTitle>
                <CardDescription>
                  Copy components between designs. Mix and match to create your perfect landing page.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {variations.map((variation) => (
            <Card key={variation.id} className="group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{variation.name}</CardTitle>
                    <CardDescription className="mt-2">{variation.description}</CardDescription>
                  </div>
                  <Badge>{variation.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted border-3 border-border rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Eye className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">{variation.name}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {variation.features.map((feature) => (
                    <Badge key={feature} variant="secondary">{feature}</Badge>
                  ))}
                </div>

                <Button asChild className="w-full">
                  <Link href={variation.href}>
                    View Live Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
