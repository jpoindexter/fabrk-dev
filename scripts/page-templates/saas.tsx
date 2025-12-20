/**
 * SAAS LANDING PAGE TEMPLATE
 *
 * NEXT STEPS:
 * 1. Update the headline and value proposition
 * 2. Replace the 6 features with your actual features
 * 3. Update pricing tiers and features
 * 4. Add your FAQ questions
 * 5. Remove the instruction banner when done
 *
 * CUSTOMIZATION:
 * - Add testimonials section for social proof
 * - Add integrations/partners section
 * - Customize colors in globals.css
 */

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* INSTRUCTION BANNER - Remove when done */}
      <Alert className="rounded-none border-x-0 border-t-0 bg-amber-500/10">
        <AlertDescription className="text-center">
          <strong>[SETUP]</strong> Edit this page at{' '}
          <code className="bg-muted px-1">src/app/page.tsx</code>
          {' '}- Update content, then remove this banner.
        </AlertDescription>
      </Alert>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <Badge variant="secondary" className="mb-4">NOW IN BETA</Badge>
        {/* TODO: Update headline */}
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
          BUILD YOUR SAAS FASTER THAN EVER
        </h1>
        {/* TODO: Update value proposition */}
        <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
          Stop wasting time on boilerplate. Start with auth, payments, and dashboards
          already built. Ship your product in days, not months.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/signup">&gt; START FREE TRIAL</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/demo">&gt; VIEW DEMO</Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          No credit card required. 14-day free trial.
        </p>
      </section>

      {/* Features Grid */}
      <section className="border-t bg-muted/50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">EVERYTHING YOU NEED</h2>
          <p className="mb-12 text-center text-muted-foreground">
            All the features you need to launch and grow your SaaS
          </p>
          {/* TODO: Replace with your features */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'AUTHENTICATION', desc: 'Email, OAuth, magic links - all pre-configured' },
              { title: 'PAYMENTS', desc: 'Stripe integration with subscriptions and invoices' },
              { title: 'DASHBOARD', desc: 'Beautiful admin dashboard with analytics' },
              { title: 'MULTI-TENANCY', desc: 'Teams and organizations out of the box' },
              { title: 'EMAIL', desc: 'Transactional emails with templates ready' },
              { title: 'API', desc: 'RESTful API with rate limiting and docs' },
            ].map((feature) => (
              <Card key={feature.title}>
                <CardHeader title={feature.title} />
                <CardContent>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="border-t px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">SIMPLE PRICING</h2>
          <p className="mb-12 text-center text-muted-foreground">
            Choose the plan that works for you
          </p>
          {/* TODO: Update pricing tiers */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: 'STARTER', price: '$9', desc: 'For individuals', features: ['1 user', '1,000 requests/mo', 'Email support'] },
              { name: 'PRO', price: '$29', desc: 'For small teams', features: ['5 users', '10,000 requests/mo', 'Priority support'], popular: true },
              { name: 'ENTERPRISE', price: '$99', desc: 'For large teams', features: ['Unlimited users', 'Unlimited requests', '24/7 support'] },
            ].map((plan) => (
              <Card key={plan.name} className={plan.popular ? 'border-primary' : ''}>
                <CardHeader title={plan.name}>
                  {plan.popular && <Badge className="mb-2 w-fit">MOST POPULAR</Badge>}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{plan.desc}</p>
                  <div className="text-4xl font-bold mb-4">{plan.price}<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((f) => (
                      <li key={f}>✓ {f}</li>
                    ))}
                  </ul>
                  <Button className="mt-6 w-full" variant={plan.popular ? 'default' : 'outline'}>
                    GET STARTED
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t bg-muted/50 px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold">FAQ</h2>
          {/* TODO: Add your FAQ */}
          <div className="space-y-6">
            {[
              { q: 'How does the free trial work?', a: 'You get full access to all features for 14 days. No credit card required.' },
              { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time with no questions asked.' },
              { q: 'Do you offer refunds?', a: 'Yes, we offer a 30-day money-back guarantee on all plans.' },
            ].map((faq) => (
              <Card key={faq.q}>
                <CardHeader title={faq.q} />
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t px-4 py-24 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-bold">START BUILDING TODAY</h2>
          <p className="text-muted-foreground">
            Join thousands of developers shipping faster with our platform.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">&gt; START FREE TRIAL</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
