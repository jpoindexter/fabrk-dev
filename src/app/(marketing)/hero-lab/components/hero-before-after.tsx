/**
 * Hero Variation 3: BEFORE/AFTER CODE
 * Hook: Show the dramatic simplification
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Minus, FileCode, FolderTree } from 'lucide-react';

const BEFORE_CODE = `// auth.ts - 200+ lines
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
// ... 50 more imports

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      // ... 20 more lines
    }),
    // ... 150 more lines
  ],
  callbacks: {
    // ... 80 more lines
  },
}`;

const AFTER_CODE = `// Your app
import { Auth, Billing } from "@fabrk"

<Auth>
  <Billing />
</Auth>

// That's it. Ship it.`;

export function HeroBeforeAfter() {
  const [showAfter, setShowAfter] = useState(false);
  const [linesDeleted, setLinesDeleted] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowAfter(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showAfter) {
      let count = 0;
      const interval = setInterval(() => {
        count += 47;
        if (count >= 9847) {
          setLinesDeleted(9847);
          clearInterval(interval);
        } else {
          setLinesDeleted(count);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [showAfter]);

  return (
    <Container size="2xl">
      <div className="space-y-8">
        {/* Headline */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className={cn('text-4xl sm:text-5xl font-bold tracking-tight', mode.font)}>
            DELETE{' '}
            <span className={cn('text-danger', showAfter && 'line-through')}>10,000</span>{' '}
            LINES
            <br />
            <span className="text-primary">KEEP THE FEATURES</span>
          </h1>
          <p className={cn('text-sm', mode.font, mode.color.text.muted)}>
            Auth, payments, dashboards, and 78 UI components.
            We wrote the boilerplate so you don&apos;t have to.
          </p>
        </div>

        {/* Counter */}
        <div className="text-center">
          <div className={cn('inline-flex items-center gap-3 border px-4 py-2', mode.font)}>
            <Minus className={cn('h-4 w-4', mode.color.text.danger)} />
            <span className={cn('text-2xl font-bold', mode.color.text.danger)}>
              {linesDeleted.toLocaleString()}
            </span>
            <span className={cn('text-xs', mode.color.text.muted)}>LINES DELETED</span>
          </div>
        </div>

        {/* Code Comparison */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* BEFORE */}
          <Card size="auto" className={cn(showAfter && 'opacity-40 transition-opacity duration-500')}>
            <CardHeader code="DEL" title="WITHOUT FABRK" />
            <CardContent padding="sm" className="!p-0">
              <div className={cn('relative overflow-hidden')}>
                <pre className={cn('p-4 text-xs overflow-x-auto', mode.font)}>
                  <code className={cn(mode.color.text.muted, showAfter && 'line-through')}>
                    {BEFORE_CODE}
                  </code>
                </pre>
                {showAfter && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                    <span className={cn('text-destructive text-sm font-bold', mode.font)}>
                      DELETED
                    </span>
                  </div>
                )}
              </div>
              <div className={cn('px-4 py-2 border-t text-xs', mode.font, mode.color.text.muted)}>
                <FileCode className="h-3 w-3 inline mr-2" />
                47 files | 9,847 lines | 6 weeks to build
              </div>
            </CardContent>
          </Card>

          {/* AFTER */}
          <Card size="auto" className={cn(!showAfter && 'opacity-40 transition-opacity')}>
            <CardHeader code="ADD" title="WITH FABRK" />
            <CardContent padding="sm" className="!p-0">
              <pre className={cn('p-4 text-xs overflow-x-auto', mode.font)}>
                <code>
                  <span className={mode.color.text.muted}>{'// Your app\n'}</span>
                  <span className={mode.color.text.accent}>import</span>
                  <span>{' { Auth, Billing } '}</span>
                  <span className={mode.color.text.accent}>from</span>
                  <span className={mode.color.text.success}>{' "@fabrk"\n\n'}</span>
                  <span className={mode.color.text.accent}>{'<Auth>\n'}</span>
                  <span className={mode.color.text.success}>{'  <Billing />\n'}</span>
                  <span className={mode.color.text.accent}>{'</Auth>\n\n'}</span>
                  <span className={mode.color.text.muted}>{"// That's it. Ship it."}</span>
                </code>
              </pre>
              <div className={cn('px-4 py-2 border-t text-xs', mode.font, mode.color.text.success)}>
                <FileCode className="h-3 w-3 inline mr-2" />
                2 imports | 4 lines | 2 minutes to add
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File Tree Comparison */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card size="auto" className={cn(showAfter && 'opacity-40')}>
            <CardHeader code="0x01" title="YOUR REPO (WITHOUT FABRK)" />
            <CardContent padding="md">
              <div className={cn('text-xs space-y-1', mode.font, mode.color.text.muted)}>
                <div><FolderTree className="h-3 w-3 inline mr-2" />src/</div>
                <div className="pl-4">├── auth/ <span className="text-destructive">(12 files)</span></div>
                <div className="pl-4">├── payments/ <span className="text-destructive">(8 files)</span></div>
                <div className="pl-4">├── components/ <span className="text-destructive">(47 files)</span></div>
                <div className="pl-4">├── hooks/ <span className="text-destructive">(15 files)</span></div>
                <div className="pl-4">├── lib/ <span className="text-destructive">(23 files)</span></div>
                <div className="pl-4">└── ... <span className="text-destructive">(89 more)</span></div>
              </div>
            </CardContent>
          </Card>

          <Card size="auto">
            <CardHeader code="0x02" title="YOUR REPO (WITH FABRK)" />
            <CardContent padding="md">
              <div className={cn('text-xs space-y-1', mode.font)}>
                <div><FolderTree className="h-3 w-3 inline mr-2" />src/</div>
                <div className="pl-4">├── app/ <span className={mode.color.text.success}>(your pages)</span></div>
                <div className="pl-4">├── components/ <span className={mode.color.text.success}>(78 pre-built)</span></div>
                <div className="pl-4">└── features/ <span className={mode.color.text.success}>(your code)</span></div>
                <div className={cn('mt-4 pt-4 border-t', mode.color.text.muted)}>
                  Focus on what makes your product unique.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PolarCheckoutButton
            className={cn(
              'bg-primary text-primary-foreground px-6 py-3 text-sm font-medium',
              mode.radius,
              mode.font
            )}
          >
            &gt; DELETE THE BOILERPLATE
            <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </PolarCheckoutButton>
          <Button
            variant="ghost"
            asChild
            className={cn('px-4 py-3 text-xs', mode.radius, mode.font)}
          >
            <Link href="/docs/getting-started">&gt; SEE FULL CODEBASE</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
