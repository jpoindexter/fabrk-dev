/**
 * FABRK COMPONENT
 * Landing Page Variations Template - Terminal console style
 * Production-ready
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import {
  Card,
  CardHeader,
  CardContent,
  TemplatePageHeader,
  FeaturesCard,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
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
} from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const heroVariations = [
  {
    id: 'centered',
    name: 'Centered Hero',
    description: 'Classic centered layout with headline, subtext, and CTAs',
  },
  {
    id: 'split',
    name: 'Split Hero',
    description: 'Two-column layout with text and visual side by side',
  },
  {
    id: 'minimal',
    name: 'Minimal Hero',
    description: 'Clean, focused hero with single CTA and trust badges',
  },
];

const templateCode = `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Play, Sparkles, Zap, Shield, Rocket, Check, Star, ChevronRight } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Centered Hero */}
      <section className="from-muted/30 bg-gradient-to-b to-transparent p-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <Badge variant="secondary" className={cn(mode.radius, mode.font, "text-xs")}>
            <Sparkles className="mr-1 h-3 w-3" />
            NEW: VERSION 2.0 RELEASED
          </Badge>

          <h2 className={cn(mode.font, "text-4xl font-semibold tracking-tight md:text-5xl")}>
            Build faster with
            <span className="text-primary"> production-ready </span>
            components
          </h2>

          <p className={cn(mode.font, "text-muted-foreground mx-auto max-w-xl text-sm")}>
            Ship your SaaS in days, not months. 234 components, authentication, payments,
            and everything you need to launch.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button className={cn(mode.radius, mode.font, "text-xs")}>
              &gt; GET STARTED
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
            <Button variant="outline" className={cn(mode.radius, mode.font, "text-xs")}>
              <Play className="mr-1 h-3 w-3" />
              &gt; WATCH DEMO
            </Button>
          </div>

          <div className={cn(mode.font, "text-muted-foreground flex items-center justify-center gap-6 pt-4 text-xs")}>
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
      </section>

      {/* Split Hero */}
      <section className="from-muted/30 bg-gradient-to-b to-transparent p-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <Badge variant="secondary" className={cn(mode.radius, mode.font, "text-xs")}>
              <Zap className="mr-1 h-3 w-3" />
              TRUSTED BY 10,000+ DEVELOPERS
            </Badge>

            <h2 className={cn(mode.font, "text-4xl font-semibold tracking-tight")}>
              The fastest way to build your
              <span className="text-primary"> next SaaS</span>
            </h2>

            <p className={cn(mode.font, "text-muted-foreground text-sm")}>
              Stop reinventing the wheel. Our boilerplate gives you authentication,
              payments, emails, and a beautiful UI out of the box.
            </p>

            <div className="space-y-4">
              <div className={cn(mode.font, "flex items-center gap-2 text-sm")}>
                <Shield className="text-primary h-4 w-4" />
                Enterprise-grade security
              </div>
              <div className={cn(mode.font, "flex items-center gap-2 text-sm")}>
                <Rocket className="text-primary h-4 w-4" />
                Deploy in minutes
              </div>
              <div className={cn(mode.font, "flex items-center gap-2 text-sm")}>
                <Sparkles className="text-primary h-4 w-4" />
                AI-powered features
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button className={cn(mode.radius, mode.font, "text-xs")}>
                &gt; START BUILDING
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
              <Button variant="link" className={cn(mode.font, "text-primary text-xs")}>
                View documentation →
              </Button>
            </div>
          </div>

          <div className="border border-border bg-muted/30 flex aspect-video items-center justify-center">
            <span className={cn(mode.font, "text-xs text-muted-foreground")}>
              [PRODUCT SCREENSHOT]
            </span>
          </div>
        </div>
      </section>

      {/* Minimal Hero */}
      <section className="from-muted/30 bg-gradient-to-b to-transparent p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-4 text-center">
            <h2 className={cn(mode.font, "text-4xl font-semibold tracking-tight md:text-5xl")}>
              Ship your startup
              <span className="text-primary"> this weekend</span>
            </h2>

            <p className={cn(mode.font, "text-muted-foreground text-sm")}>
              Everything you need. Nothing you don&apos;t.
            </p>
          </div>

          <div className="mx-auto flex max-w-md items-center gap-2">
            <Input
              placeholder="Enter your email"
              className={cn(mode.radius, mode.font, "text-sm")}
            />
            <Button className={cn(mode.radius, mode.font, "text-xs whitespace-nowrap")}>
              &gt; GET ACCESS
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="text-warning fill-warning h-4 w-4" />
              ))}
              <span className={cn(mode.font, "text-muted-foreground ml-2 text-xs")}>
                4.9/5 from 200+ reviews
              </span>
            </div>
          </div>

          <div className={cn(mode.font, "text-muted-foreground flex items-center justify-center gap-6 text-xs")}>
            <span className="border border-border px-2 py-1">VERCEL</span>
            <span className="border border-border px-2 py-1">STRIPE</span>
            <span className="border border-border px-2 py-1">PRISMA</span>
            <span className="border border-border px-2 py-1">NEXT.JS</span>
          </div>
        </div>
      </section>
    </div>
  );
}`;

function LandingVariationsPreview() {
  const [activeVariation, setActiveVariation] = useState('centered');

  const tabs = heroVariations.map((v) => ({
    id: v.id,
    label: v.name.toUpperCase(),
  }));

  return (
    <div className="bg-background/50 min-h-[800px] p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Variation Selector */}
        <StyledTabs
          code="0x00"
          title="VARIATION SELECTOR"
          tabs={tabs}
          value={activeVariation}
          onValueChange={setActiveVariation}
        >
          {/* Centered Hero */}
          <StyledTabsContent value="centered">
            <div className="border-border bg-card border">
              <div className="border-border border-b px-4 py-2">
                <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                  [ [0x01] HERO CENTERED ]
                </span>
              </div>
              <div className="p-6">
                <div className="from-muted/30 bg-gradient-to-b to-transparent p-8">
                  <div className="mx-auto max-w-3xl space-y-6 text-center">
                    <Badge variant="secondary" className={cn(mode.radius, mode.font, 'text-xs')}>
                      <Sparkles className="mr-1 h-3 w-3" />
                      NEW: VERSION 2.0 RELEASED
                    </Badge>

                    <h2
                      className={cn(mode.font, 'text-4xl font-semibold tracking-tight md:text-5xl')}
                    >
                      Build faster with
                      <span className="text-primary"> production-ready </span>
                      components
                    </h2>

                    <p className={cn(mode.font, 'text-muted-foreground mx-auto max-w-xl text-sm')}>
                      Ship your SaaS in days, not months. 234 components, authentication, payments,
                      and everything you need to launch.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                      <Button className={cn(mode.radius, mode.font, 'text-xs')}>
                        &gt; GET STARTED
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                      <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                        <Play className="mr-1 h-3 w-3" />
                        &gt; WATCH DEMO
                      </Button>
                    </div>

                    <div
                      className={cn(
                        mode.font,
                        'text-muted-foreground flex items-center justify-center gap-6 pt-4 text-xs'
                      )}
                    >
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
            </div>
          </StyledTabsContent>

          {/* Split Hero */}
          <StyledTabsContent value="split">
            <div className="border-border bg-card border">
              <div className="border-border border-b px-4 py-2">
                <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                  [ [0x02] HERO SPLIT ]
                </span>
              </div>
              <div className="p-6">
                <div className="from-muted/30 bg-gradient-to-b to-transparent p-8">
                  <div className="grid items-center gap-12 md:grid-cols-2">
                    <div className="space-y-6">
                      <Badge variant="secondary" className={cn(mode.radius, mode.font, 'text-xs')}>
                        <Zap className="mr-1 h-3 w-3" />
                        TRUSTED BY 10,000+ DEVELOPERS
                      </Badge>

                      <h2 className={cn(mode.font, 'text-4xl font-semibold tracking-tight')}>
                        The fastest way to build your
                        <span className="text-primary"> next SaaS</span>
                      </h2>

                      <p className={cn(mode.font, 'text-muted-foreground text-sm')}>
                        Stop reinventing the wheel. Our boilerplate gives you authentication,
                        payments, emails, and a beautiful UI out of the box.
                      </p>

                      <div className="space-y-4">
                        {[
                          { icon: Shield, text: 'Enterprise-grade security' },
                          { icon: Rocket, text: 'Deploy in minutes' },
                          { icon: Sparkles, text: 'AI-powered features' },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className={cn(mode.font, 'flex items-center gap-2 text-sm')}
                          >
                            <item.icon className="text-primary h-4 w-4" />
                            {item.text}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <Button className={cn(mode.radius, mode.font, 'text-xs')}>
                          &gt; START BUILDING
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                        <Button variant="link" className={cn(mode.font, 'text-primary text-xs')}>
                          View documentation →
                        </Button>
                      </div>
                    </div>

                    <div className="border-border bg-muted/30 flex aspect-video items-center justify-center border">
                      <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                        [PRODUCT SCREENSHOT]
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StyledTabsContent>

          {/* Minimal Hero */}
          <StyledTabsContent value="minimal">
            <div className="border-border bg-card border">
              <div className="border-border border-b px-4 py-2">
                <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                  [ [0x03] HERO MINIMAL ]
                </span>
              </div>
              <div className="p-6">
                <div className="from-muted/30 bg-gradient-to-b to-transparent p-8">
                  <div className="mx-auto max-w-2xl space-y-8">
                    <div className="space-y-4 text-center">
                      <h2
                        className={cn(
                          mode.font,
                          'text-4xl font-semibold tracking-tight md:text-5xl'
                        )}
                      >
                        Ship your startup
                        <span className="text-primary"> this weekend</span>
                      </h2>

                      <p className={cn(mode.font, 'text-muted-foreground text-sm')}>
                        Everything you need. Nothing you don&apos;t.
                      </p>
                    </div>

                    <div className="mx-auto flex max-w-md items-center gap-2">
                      <Input
                        placeholder="Enter your email"
                        className={cn(mode.radius, mode.font, 'text-sm')}
                      />
                      <Button className={cn(mode.radius, mode.font, 'text-xs whitespace-nowrap')}>
                        &gt; GET ACCESS
                      </Button>
                    </div>

                    <div className="flex items-center justify-center gap-8 pt-4">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="text-warning fill-warning h-4 w-4" />
                        ))}
                        <span className={cn(mode.font, 'text-muted-foreground ml-2 text-xs')}>
                          4.9/5 from 200+ reviews
                        </span>
                      </div>
                    </div>

                    <div
                      className={cn(
                        mode.font,
                        'text-muted-foreground flex items-center justify-center gap-6 text-xs'
                      )}
                    >
                      <span className="border-border border px-2 py-1">VERCEL</span>
                      <span className="border-border border px-2 py-1">STRIPE</span>
                      <span className="border-border border px-2 py-1">PRISMA</span>
                      <span className="border-border border px-2 py-1">NEXT.JS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StyledTabsContent>
        </StyledTabs>
      </div>
    </div>
  );
}

export default function LandingVariationsTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="LANDING VARIATIONS"
          title="Landing Page Variations"
          description="Three hero section variations for different use cases"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  'h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0',
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [CODE]
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE PREVIEW" />
              <LandingVariationsPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-1 text-xs')}>
              <div className="text-muted-foreground">[FILES]:</div>
              <div className="space-y-1 pl-4">
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-foreground">page.tsx</span>
                  <span className="text-muted-foreground ml-4">← Copy template here</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Card */}
        <FeaturesCard
          title="TEMPLATE FEATURES"
          code="0x07"
          features={[
            '3 hero variations (centered, split, minimal)',
            'Interactive variation switcher',
            'Trust badges and social proof',
            'Email capture form',
            'Feature highlights',
            'Responsive layouts',
          ]}
          note="Mix and match elements from each variation to create your perfect landing page."
        />
      </div>
    </div>
  );
}
