/**
 * STARTER LANDING PAGE TEMPLATE
 *
 * A clean, minimal landing page that's easy to customize.
 * Uses the terminal aesthetic (font-mono, uppercase headings) but
 * keeps styling simple so you can make it your own.
 *
 * NEXT STEPS:
 * 1. Update the product name and tagline in the Hero section
 * 2. Replace the 3 features with your actual features
 * 3. Update the CTA button links (/signup, /docs)
 * 4. Remove the instruction banner when you're done
 *
 * CUSTOMIZATION:
 * - Add more sections as needed (testimonials, pricing, FAQ)
 * - Import components from @/components/ui/ for consistent styling
 * - Check /docs for all available UI components and templates
 */

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* INSTRUCTION BANNER - Remove this when you're done customizing */}
      <Alert className="border-x-0 border-t-0 bg-amber-500/10">
        <AlertDescription className="text-center">
          <strong>[SETUP]</strong> Edit this page at{' '}
          <code className="bg-muted px-1">src/app/page.tsx</code>
          {' '}- Update content below, then remove this banner.
          See <code className="bg-muted px-1">FABRK-PROMPTS.md</code> for AI prompts.
        </AlertDescription>
      </Alert>

      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* TODO: Replace with your product name */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            YOUR PRODUCT NAME
          </h1>

          {/* TODO: Replace with your value proposition */}
          <p className="text-xl text-muted-foreground">
            A short, compelling description of what your product does and why it matters.
            Replace this with your value proposition.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">&gt; GET STARTED</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">&gt; LEARN MORE</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">FEATURES</h2>

          {/* TODO: Replace with your actual features */}
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">FEATURE ONE</h3>
              <p className="text-muted-foreground">
                Describe your first key feature here. What problem does it solve?
                How does it help your users?
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">FEATURE TWO</h3>
              <p className="text-muted-foreground">
                Describe your second key feature here. What value does it provide?
                Why should users care?
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">FEATURE THREE</h3>
              <p className="text-muted-foreground">
                Describe your third key feature here. What makes it unique?
                How does it differentiate you?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t px-4 py-24 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-bold">READY TO GET STARTED?</h2>
          <p className="text-muted-foreground">
            Join thousands of users who are already using our product.
            Start your free trial today.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">&gt; START FREE TRIAL</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
