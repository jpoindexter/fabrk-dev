/**
 * ✅ FABRK COMPONENT
 * Getting Started Guide - Library Templates
 * Complete walkthrough for first-time users
 */
'use client';

import Link from 'next/link';
import { Rocket, FolderTree, Terminal, CheckCircle, ArrowRight } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';

export default function GettingStartedPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="border-border inline-block border px-4 py-1">
          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
            [GUIDE]: GETTING_STARTED
          </span>
        </div>

        <div className="flex items-start gap-4">
          <div className={cn('bg-primary/10 p-4', mode.radius)}>
            <Rocket className="text-primary h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h1 className={cn(mode.font, 'text-3xl font-semibold tracking-tight')}>
              Getting Started with Library Templates
            </h1>
            <p className={cn(mode.font, 'text-muted-foreground text-base')}>
              Learn how to copy, customize, and integrate production-ready templates into your
              Next.js project in under 10 minutes.
            </p>
          </div>
        </div>

        {/* Meta Info */}
        <div className="border-border border-l-primary flex items-center gap-6 border-l-2 pl-4">
          <div>
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>Time: </span>
            <span className={cn(mode.font, 'text-primary text-xs font-medium')}>~10 minutes</span>
          </div>
          <div>
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>Level: </span>
            <span className={cn(mode.font, 'text-primary text-xs font-medium')}>Beginner</span>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <Card>
        <CardHeader code="0x00" title="WHAT YOU'LL LEARN" />
        <CardContent padding="md">
          <ul className={cn(mode.font, 'space-y-2 text-xs')}>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>How to navigate the library and find the right template</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>How to copy template code into your project</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>Understanding template structure and dependencies</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>First customizations and basic modifications</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>Next steps for integrations and advanced features</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Prerequisites */}
      <Card>
        <CardHeader code="0x01" title="PREREQUISITES" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p className="text-muted-foreground">
              Before starting, ensure you have the following set up:
            </p>

            <div className="space-y-4">
              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">✓ Next.js 15+ Project</p>
                <p className="text-muted-foreground">
                  App Router with TypeScript enabled. Templates use Next.js 15 features.
                </p>
              </div>

              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">✓ Fabrk Dependencies</p>
                <p className="text-muted-foreground">
                  All templates assume you're using Fabrk with Radix UI, Tailwind CSS 4, and the
                  design system.
                </p>
              </div>

              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">✓ Design System Setup</p>
                <p className="text-muted-foreground">
                  Templates use <code className="bg-muted px-1">mode.font</code>,{' '}
                  <code className="bg-muted px-1">mode.radius</code>, and design tokens from{' '}
                  <code className="bg-muted px-1">@/design-system</code>.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Browse Library */}
      <Card>
        <CardHeader code="0x02" title="STEP 1: BROWSE THE LIBRARY" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>
              Start by exploring the{' '}
              <Link href="/library" className="text-primary hover:underline">
                template library
              </Link>{' '}
              to find components that match your needs.
            </p>

            <div className="border-border space-y-4 border p-4">
              <p className="text-muted-foreground font-medium">[NAVIGATION TIPS]:</p>
              <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
                <li>
                  <span className="font-medium">Search bar</span>: Type keywords like
                  "authentication", "dashboard", or "billing"
                </li>
                <li>
                  <span className="font-medium">Category filters</span>: Filter by Dashboards, Auth,
                  Admin, etc.
                </li>
                <li>
                  <span className="font-medium">Featured section</span>: Most popular and essential
                  templates
                </li>
                <li>
                  <span className="font-medium">Status badges</span>: Look for "Popular", "New", or
                  "Essential" tags
                </li>
              </ul>
            </div>

            <div className="bg-muted/30 border-border border p-4">
              <p className="text-primary mb-2 font-medium">[EXAMPLE]:</p>
              <p className="text-muted-foreground">
                Building a SaaS dashboard? Search for "analytics dashboard" or filter by
                "Dashboards" category to find the Analytics Dashboard, Team Dashboard, and Chart
                Library templates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: View Template */}
      <Card>
        <CardHeader code="0x03" title="STEP 2: PREVIEW & INSPECT" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>Each template page has two tabs: [PREVIEW] and [CODE].</p>

            <div className="space-y-4">
              <div className="border-border border p-4">
                <p className="text-primary mb-2 font-medium">[PREVIEW TAB]:</p>
                <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-2">
                  <li>See the template in action with live interactions</li>
                  <li>Test responsive behavior by resizing your browser</li>
                  <li>Verify it matches your design requirements</li>
                </ul>
              </div>

              <div className="border-border border p-4">
                <p className="text-primary mb-2 font-medium">[CODE TAB]:</p>
                <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-2">
                  <li>Complete, copyable source code</li>
                  <li>Includes all imports, state management, and styling</li>
                  <li>Ready to paste with minimal modifications</li>
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground">
              Scroll down to see the <span className="font-medium">File Structure</span> section,
              which shows exactly where to place the code in your project.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Copy Code */}
      <Card>
        <CardHeader code="0x04" title="STEP 3: COPY THE CODE" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>
              Click the [CODE] tab and use the copy button in the top-right corner of the code
              block.
            </p>

            <div className="space-y-4">
              <div className="bg-muted/30 border-border border p-4">
                <p className="text-primary mb-2 flex items-center gap-2 font-medium">
                  <Terminal className="h-4 w-4" />
                  [QUICK COPY]:
                </p>
                <ol className="text-muted-foreground list-inside list-decimal space-y-2 pl-2">
                  <li>Switch to [CODE] tab on template page</li>
                  <li>Click the copy icon in the code block header</li>
                  <li>
                    Code is now in your clipboard with syntax highlighting preserved for readability
                  </li>
                </ol>
              </div>
            </div>

            <div className="border-border border-l-primary space-y-2 border-l-2 pl-4">
              <p className="font-medium">💡 Pro Tip:</p>
              <p className="text-muted-foreground">
                The code includes comments showing exactly where to paste it in your project
                structure (e.g.,{' '}
                <code className="bg-muted px-1">app/(dashboard)/analytics/page.tsx</code>).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 4: Paste & Adjust */}
      <Card>
        <CardHeader code="0x05" title="STEP 4: PASTE INTO YOUR PROJECT" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>Create the file structure shown in the template's [FILE STRUCTURE] section.</p>

            <div className="bg-muted/30 border-border border p-4">
              <p className="text-primary mb-4 flex items-center gap-2 font-medium">
                <FolderTree className="h-4 w-4" />
                [EXAMPLE FILE STRUCTURE]:
              </p>
              <CodeBlock
                code={`app/
  (dashboard)/          ← Create route group if needed
    analytics/          ← Create directory
      page.tsx          ← Paste template code here
components/
  metric-cards.tsx      ← Extract component (if splitting)
  revenue-chart.tsx     ← Extract component (if splitting)`}
                language="bash"
                maxHeight="200px"
              />
            </div>

            <div className="space-y-4">
              <p className="font-medium">What to adjust after pasting:</p>
              <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
                <li>
                  <span className="font-medium">Import paths</span>: Verify all{' '}
                  <code className="bg-muted px-1">@/components/...</code> imports resolve correctly
                </li>
                <li>
                  <span className="font-medium">Mock data</span>: Replace placeholder data with real
                  API calls or database queries
                </li>
                <li>
                  <span className="font-medium">Routes</span>: Update any hardcoded routes to match
                  your app structure
                </li>
                <li>
                  <span className="font-medium">Environment variables</span>: Add any required env
                  vars to <code className="bg-muted px-1">.env.local</code>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 5: Test */}
      <Card>
        <CardHeader code="0x06" title="STEP 5: TEST & VERIFY" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>Run your development server and verify the template works:</p>

            <CodeBlock
              code={`# Start dev server
npm run dev

# Visit your new route
# e.g., http://localhost:3000/analytics

# Check for TypeScript errors
npm run type-check

# Run linting
npm run lint`}
              language="bash"
              maxHeight="200px"
            />

            <div className="border-border space-y-2 border p-4">
              <p className="text-primary font-medium">[COMMON ISSUES]:</p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-2">
                <li>Missing imports? Check you have all required components installed</li>
                <li>
                  TypeScript errors? Verify <code className="bg-muted px-1">@/design-system</code>{' '}
                  module exists
                </li>
                <li>Styling broken? Ensure Tailwind CSS config includes all template paths</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                See the{' '}
                <Link href="/library/docs/troubleshooting" className="text-primary hover:underline">
                  Troubleshooting Guide
                </Link>{' '}
                for detailed solutions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader code="0x07" title="NEXT STEPS" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p className="font-medium">You've successfully added your first template! Now:</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/library/docs/integration/nextauth"
                className="border-border hover:border-primary group border p-4 transition-colors"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-primary font-medium">Add Authentication</span>
                  <ArrowRight className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
                </div>
                <p className="text-muted-foreground">
                  Integrate NextAuth for user login, sessions, and protected routes
                </p>
              </Link>

              <Link
                href="/library/docs/integration/prisma"
                className="border-border hover:border-primary group border p-4 transition-colors"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-primary font-medium">Connect Database</span>
                  <ArrowRight className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
                </div>
                <p className="text-muted-foreground">
                  Replace mock data with real database queries using Prisma
                </p>
              </Link>

              <Link
                href="/library/docs/customization"
                className="border-border hover:border-primary group border p-4 transition-colors"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-primary font-medium">Customize Design</span>
                  <ArrowRight className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
                </div>
                <p className="text-muted-foreground">
                  Change colors, fonts, spacing, and components to match your brand
                </p>
              </Link>

              <Link
                href="/library"
                className="border-border hover:border-primary group border p-4 transition-colors"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-primary font-medium">Browse More Templates</span>
                  <ArrowRight className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
                </div>
                <p className="text-muted-foreground">
                  Explore 30+ more production-ready templates across all categories
                </p>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference */}
      <Card>
        <CardHeader code="0x08" title="QUICK REFERENCE" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <div className="border-border border-l-primary grid gap-4 border-l-2 pl-4 sm:grid-cols-2">
              <div>
                <p className="font-medium">📚 Resources</p>
                <ul className="text-muted-foreground mt-2 space-y-1">
                  <li>
                    <Link href="/library" className="hover:text-primary">
                      → Template Library
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs" className="hover:text-primary">
                      → Component API Docs
                    </Link>
                  </li>
                  <li>
                    <Link href="/library/docs/troubleshooting" className="hover:text-primary">
                      → Troubleshooting
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium">🔧 Integration Guides</p>
                <ul className="text-muted-foreground mt-2 space-y-1">
                  <li>
                    <Link href="/library/docs/integration/nextauth" className="hover:text-primary">
                      → NextAuth
                    </Link>
                  </li>
                  <li>
                    <Link href="/library/docs/integration/prisma" className="hover:text-primary">
                      → Prisma
                    </Link>
                  </li>
                  <li>
                    <Link href="/library/docs/integration/polar" className="hover:text-primary">
                      → Polar.sh
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
