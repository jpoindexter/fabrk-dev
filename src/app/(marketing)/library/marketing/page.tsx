/**
 * ✅ FABRK COMPONENT
 * Marketing Category - Terminal console style
 * Production-ready ✓
 */
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardContent, TemplatePageHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { getCategoryInfo, getTemplatesByCategory } from '../library-data';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `/**
 * Marketing Templates Category
 *
 * This category contains production-ready marketing templates:
 *
 * 1. Landing Page Variations
 *    - Centered Hero: Classic centered layout
 *    - Split Hero: Two-column with visual
 *    - Minimal Hero: Clean with email capture
 *
 * 2. Pricing Pages
 *    - Billing toggle (monthly/yearly)
 *    - Feature comparison table
 *    - FAQ sections
 *
 * 3. Blog Templates
 *    - Featured posts
 *    - Category filters
 *    - Pagination
 *
 * All templates follow terminal design system with:
 * - mode.font for typography
 * - mode.radius for border radius
 * - Design tokens for colors
 * - Card headers with terminal codes
 *
 * Usage:
 * 1. Navigate to specific template
 * 2. Copy code from CODE tab
 * 3. Paste into your project
 * 4. Customize data/content
 */

import Link from "next/link";

export default function MarketingTemplates() {
  const templates = [
    {
      name: "Landing Variations",
      href: "/templates/landing-variations",
      description: "Hero section variations"
    },
    {
      name: "Pricing Page",
      href: "/templates/pricing-page",
      description: "Full pricing with comparison"
    },
    {
      name: "Blog",
      href: "/templates/blog",
      description: "Blog listing with filters"
    }
  ];

  return (
    <div className="container mx-auto max-w-7xl space-y-8 px-6 py-12">
      <h1>Marketing Templates</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <Link key={template.name} href={template.href}>
            <div className="border border-border p-4">
              <h3>{template.name}</h3>
              <p>{template.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}`;

function MarketingPreview() {
  const categoryTemplates = getTemplatesByCategory('marketing');
  const categoryInfo = getCategoryInfo('marketing');

  return (
    <div className="bg-background/50 min-h-[600px] p-4 sm:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Category Header */}
        <div className="space-y-4">
          <div className="border-border inline-block border px-4 py-1">
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
              [CATEGORY]: MARKETING
            </span>
          </div>
          <div className="flex items-center gap-4">
            {categoryInfo && <categoryInfo.icon className="text-primary h-6 w-6" />}
            <h1 className={cn(mode.font, 'text-4xl font-semibold')}>Marketing</h1>
            <span className={cn(mode.font, 'border-border border px-2 py-0.5 text-xs')}>
              COUNT: {categoryTemplates.length}
            </span>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {categoryTemplates.map((template) => (
            <Link key={template.id} href={template.href}>
              <div className="group border-border bg-card hover:border-primary/50 border transition-colors">
                {/* Card Header */}
                <div className="border-border flex items-center justify-between border-b px-4 py-2">
                  <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                    [TEMPLATE]: {template.id.toUpperCase()}
                  </span>
                  <template.icon className="text-muted-foreground size-4" />
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Status & Badge */}
                  <div className={cn(mode.font, 'mb-4 flex items-center justify-between text-xs')}>
                    <div>
                      <span className="text-muted-foreground">STATUS: </span>
                      <span className="text-success">READY</span>
                    </div>
                    {template.badge && (
                      <div className="border-primary/50 text-primary border px-2 py-0.5">
                        {template.badge.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className={cn(mode.font, 'mb-2 text-lg font-semibold')}>{template.name}</h3>

                  {/* Description */}
                  <div className={cn(mode.font, 'mb-4 text-xs')}>
                    <span className="text-muted-foreground">DESC: </span>
                    <span className="text-foreground">{template.description}</span>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className={cn(mode.font, 'text-muted-foreground mb-2 text-xs')}>
                      [FEATURES]:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature) => (
                        <span
                          key={feature}
                          className={cn(mode.font, 'border-border border px-2 py-0.5 text-xs')}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        mode.font,
                        'text-primary group-hover:text-primary/80 text-xs transition-colors'
                      )}
                    >
                      &gt; VIEW TEMPLATE
                    </span>
                    <span
                      className={cn(
                        mode.font,
                        'text-muted-foreground text-xs transition-transform group-hover:translate-x-1'
                      )}
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MarketingPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="MARKETING"
          title="Marketing Templates"
          description="Landing pages, pricing, blog, and marketing sections"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="CATEGORY OVERVIEW" />
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
              <CardHeader code="0x01" title="TEMPLATES BROWSER" />
              <MarketingPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="USAGE GUIDE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Template Features Card */}
        <Card>
          <CardHeader code="0x02" title="MARKETING FEATURES" />
          <CardContent padding="lg">
            <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
              [MARKETING_TEMPLATES]:
            </div>
            <div className={cn(mode.font, 'space-y-2 text-xs')}>
              <div>
                <span className="text-success">&gt;</span> Landing pages with hero sections
              </div>
              <div>
                <span className="text-success">&gt;</span> Feature showcase sections with icons
              </div>
              <div>
                <span className="text-success">&gt;</span> Testimonials and social proof
              </div>
              <div>
                <span className="text-success">&gt;</span> Pricing tables with plan comparison
              </div>
              <div>
                <span className="text-success">&gt;</span> Call-to-action sections and buttons
              </div>
              <div>
                <span className="text-success">&gt;</span> Newsletter signup forms
              </div>
              <div>
                <span className="text-success">&gt;</span> Footer with site navigation and links
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
