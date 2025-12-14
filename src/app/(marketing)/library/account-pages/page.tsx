/**
 * Account Pages Category - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { TemplatePreviewWrapper } from '@/components/library';
import { getCategoryInfo, getTemplatesByCategory } from '../library-data';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `// Account Pages Category Overview

// This category includes production-ready account management templates:

// 1. Profile Page
// - User profile header with avatar and stats
// - Achievement badges display
// - Activity feed with timestamps
// - Project cards with stats

// 2. Settings Page
// - 4-tab navigation (General, Account, Privacy, Billing)
// - Appearance settings (theme, font size, layout)
// - Notification preferences (email, push, in-app)
// - Privacy controls and security settings

// 3. Billing Dashboard
// - Current plan overview with next billing date
// - Usage metrics (users, projects, storage, API calls)
// - Payment methods management
// - Recent invoices and billing history

// All templates are:
// - Fully responsive (mobile-first)
// - Design system compliant (mode.font, mode.radius)
// - Production-ready with terminal aesthetic
// - Copy-paste ready for your SaaS`;

function AccountPagesPreview() {
  const categoryTemplates = getTemplatesByCategory('account');

  return (
    <TemplatePreviewWrapper minHeight="600px">
      <div>
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
                  <h3 className={cn(mode.font, 'mb-2 text-sm font-semibold')}>{template.name}</h3>

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
    </TemplatePreviewWrapper>
  );
}

export default function AccountPagesPage() {
  const categoryTemplates = getTemplatesByCategory('account');
  const categoryInfo = getCategoryInfo('account');

  return (
    <div className="w-full overflow-x-hidden">
      <main className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-12">
        {/* Category Header */}
        <div className="space-y-4">
          <div className="border-border inline-block border px-4 py-1">
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
              [CATEGORY]: ACCOUNT PAGES
            </span>
          </div>
          <div className="flex items-center gap-4">
            {categoryInfo && <categoryInfo.icon className="text-primary h-6 w-6" />}
            <h1 className={cn(mode.font, 'text-4xl font-semibold')}>Account Pages</h1>
            <span className={cn(mode.font, 'border-border border px-2 py-0.5 text-xs')}>
              COUNT: {categoryTemplates.length}
            </span>
          </div>
        </div>

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="CATEGORY OVERVIEW" />
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="TEMPLATES OVERVIEW" />
              <AccountPagesPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="CATEGORY INFO" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Template Features Card */}
        <Card>
          <CardHeader code="0x02" title="ACCOUNT PAGE FEATURES" />
          <CardContent padding="lg">
            <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
              [ACCOUNT PAGE TEMPLATES]:
            </div>
            <div className={cn(mode.font, 'space-y-2 text-xs')}>
              <div>
                <span className="text-success">&gt;</span> Settings page with 4-tab navigation
              </div>
              <div>
                <span className="text-success">&gt;</span> Appearance settings (theme, font size,
                layout)
              </div>
              <div>
                <span className="text-success">&gt;</span> Notification preferences (email, push,
                in-app)
              </div>
              <div>
                <span className="text-success">&gt;</span> Privacy controls (data sharing, cookies,
                analytics)
              </div>
              <div>
                <span className="text-success">&gt;</span> Language & region settings
              </div>
              <div>
                <span className="text-success">&gt;</span> Account security (password, 2FA,
                sessions)
              </div>
              <div>
                <span className="text-success">&gt;</span> Subscription and billing management
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
