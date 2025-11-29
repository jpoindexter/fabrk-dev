import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Free Trial System - Fabrk Docs",
  description: "Offer free trials to convert more users. Configure trial length, show countdown banners, and integrate with Stripe billing.",
};

export default function TrialPage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x30] FEATURES ] TRIAL</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">FREE_TRIAL_SYSTEM</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Let users try your product before they buy with time-limited trials.
        </p>
      </div>

      {/* What is a Trial - Plain English */}
      <Card className="rounded-none">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-mono text-lg font-bold text-primary">WHAT_IS_A_FREE_TRIAL</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            A free trial lets potential customers use your product for a limited time before
            paying. It&apos;s like test-driving a car before buying it.
          </p>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            When the trial period ends, users either pay to continue or lose access to premium
            features. Fabrk&apos;s trial system integrates with Stripe so the conversion to paid
            happens automatically.
          </p>
        </CardContent>
      </Card>

      {/* Why Use Trials */}
      <Card className="rounded-none">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-mono text-lg font-bold text-primary">WHY_OFFER_TRIALS</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-mono font-medium">BENEFITS</h3>
              <ul className="font-mono text-sm text-muted-foreground space-y-1">
                <li>Lower barrier to signup (no credit card upfront)</li>
                <li>Users experience value before paying</li>
                <li>Higher conversion rates than &quot;buy now&quot; only</li>
                <li>Reduces refund requests</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-mono font-medium">COMMON_TRIAL_LENGTHS</h3>
              <ul className="font-mono text-sm text-muted-foreground space-y-1">
                <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>7 days:</strong> Quick-value products</li>
                <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>14 days:</strong> Most SaaS (recommended)</li>
                <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>30 days:</strong> Complex enterprise tools</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">HOW_FABRK_TRIALS_WORK</h2>
        <div className="space-y-4">
          <div className="border border-border bg-card p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">1</span>
              <h3 className="font-mono font-semibold">USER_STARTS_TRIAL</h3>
            </div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              User clicks &quot;Start Free Trial&quot; on your pricing page. They create an account
              (no credit card required by default) and immediately get access to premium features.
            </p>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">2</span>
              <h3 className="font-mono font-semibold">TRIAL_BANNER_SHOWS</h3>
            </div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              While on trial, users see a banner showing how many days are left. This creates
              gentle urgency without being annoying.
            </p>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">3</span>
              <h3 className="font-mono font-semibold">URGENCY_NEAR_END</h3>
            </div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              When trial is almost over (last 3 days), the banner becomes more prominent.
              Users are prompted to subscribe before losing access.
            </p>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">4</span>
              <h3 className="font-mono font-semibold">TRIAL_EXPIRES</h3>
            </div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              When trial ends, users can no longer access premium features. They see a message
              encouraging them to subscribe. If you require credit card upfront, Stripe automatically
              starts charging.
            </p>
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">CONFIGURATION</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Configure trial settings in <code className="bg-muted px-1 font-mono">src/config.js</code>:
        </p>
        <CodeBlock language="javascript" code={`// src/config.js

export const config = {
  features: {
    // Enable/disable trial system
    trialPeriod: true,

    // Number of days for free trial
    trialDays: 14,

    // Require credit card to start trial?
    // true: Card collected at signup, charged when trial ends
    // false: No card needed, user prompted to pay at trial end
    trialRequiresCard: false,
  },
};`} />
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          <strong>Tip:</strong> Requiring a credit card upfront reduces signups but increases
          conversion rates. No-card trials get more signups but lower conversion. Test both
          to see what works for your product.
        </p>
      </div>

      {/* Trial Banner */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">TRIAL_BANNER</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Fabrk includes a trial banner component that automatically shows for trial users.
        </p>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <h3 className="font-mono font-semibold mb-3">BANNER_STATES</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border border-border bg-card">
                <div className="h-3 w-3 rounded-full bg-success"></div>
                <div>
                  <p className="text-sm font-medium">Plenty of time (8+ days)</p>
                  <p className="font-mono text-sm text-muted-foreground">&quot;You have 12 days left in your trial&quot;</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border bg-card">
                <div className="h-3 w-3 rounded-full bg-warning"></div>
                <div>
                  <p className="text-sm font-medium">Running low (4-7 days)</p>
                  <p className="font-mono text-sm text-muted-foreground">&quot;5 days left - Subscribe to keep access&quot;</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border bg-card">
                <div className="h-3 w-3 rounded-full bg-destructive"></div>
                <div>
                  <p className="text-sm font-medium">Urgent (1-3 days)</p>
                  <p className="font-mono text-sm text-muted-foreground">&quot;Trial ends tomorrow! Subscribe now&quot;</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border bg-card">
                <div className="h-3 w-3 rounded-full bg-muted-foreground"></div>
                <div>
                  <p className="text-sm font-medium">Expired</p>
                  <p className="font-mono text-sm text-muted-foreground">&quot;Your trial has ended. Subscribe to continue&quot;</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">CODE_REFERENCE</h2>

        <h3 className="font-mono font-semibold">CHECK_IF_USER_IS_ON_TRIAL</h3>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Use these helpers to check trial status:
        </p>
        <CodeBlock language="typescript" code={`import {
  isOnTrial,
  getTrialDaysRemaining,
  hasTrialExpired,
  hasUsedTrial
} from "@/lib/trial";

// Check if user is currently on trial
const onTrial = isOnTrial(user.trialEndsAt);

// Get days remaining (0 if expired)
const daysLeft = getTrialDaysRemaining(user.trialEndsAt);

// Check if trial has expired
const expired = hasTrialExpired(user.trialEndsAt);

// Check if user already used their trial (prevents abuse)
const usedTrial = hasUsedTrial(user);`} />

        <h3 className="font-mono font-semibold mt-6">PROTECT_PREMIUM_FEATURES</h3>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Block access when trial expires:
        </p>
        <CodeBlock language="typescript" code={`// In your API route
import { auth } from "@/lib/auth";
import { hasTrialExpired } from "@/lib/trial";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user has active subscription OR valid trial
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { tier: true, trialEndsAt: true },
  });

  const hasAccess =
    user.tier !== "free" || // Paid user
    (user.trialEndsAt && !hasTrialExpired(user.trialEndsAt)); // Valid trial

  if (!hasAccess) {
    return NextResponse.json(
      { error: "Please subscribe to access this feature" },
      { status: 403 }
    );
  }

  // User has access - continue with premium feature
  return NextResponse.json({ data: "..." });
}`} />

        <h3 className="font-mono font-semibold mt-6">USING_THE_TRIAL_BANNER</h3>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Add the banner to your dashboard layout:
        </p>
        <CodeBlock language="tsx" code={`import { TrialBanner } from "@/components/billing/trial-banner";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <TrialBanner />
      <main>{children}</main>
    </div>
  );
}`} />
      </div>

      {/* Stripe Integration */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">STRIPE_TRIAL_INTEGRATION</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          If you require credit card upfront, Stripe handles the trial automatically:
        </p>
        <CodeBlock language="typescript" code={`// Create subscription with trial period
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: priceId }],
  trial_period_days: config.features.trialDays, // e.g., 14

  // Optional: Don't charge if trial ends and card fails
  payment_settings: {
    save_default_payment_method: "on_subscription",
  },
});`} />
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Stripe will automatically charge the customer when the trial ends. If payment fails,
          you&apos;ll receive a webhook to handle the situation.
        </p>
      </div>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">BEST_PRACTICES</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span><strong>Email reminders:</strong> Send emails at trial midpoint, 3 days before, and 1 day before expiration.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span><strong>Show value early:</strong> Get users to their &quot;aha moment&quot; in the first 2 days, not day 14.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span><strong>Don&apos;t restrict too much:</strong> Let trial users see the full product. Restricted trials feel frustrating.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">4.</span>
                <span><strong>Track engagement:</strong> Users who don&apos;t engage by day 3 rarely convert. Reach out proactively.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">5.</span>
                <span><strong>Prevent abuse:</strong> Fabrk tracks who has used a trial before, preventing multiple free trials per user.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Common Questions */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">COMMON_QUESTIONS</h2>
        <div className="space-y-4">
          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-medium">
              Can users get multiple free trials?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                No. Fabrk tracks whether a user has already used a trial. Once they&apos;ve had one,
                they can only subscribe (no second trial). This prevents abuse.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-medium">
              What happens to user data when trial expires?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                User data is preserved. They just can&apos;t access premium features. If they subscribe
                later, all their data is still there. This encourages conversion.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-medium">
              Should I require a credit card for trials?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                It depends on your business. Card-required trials have fewer signups but higher
                conversion (40-60%). No-card trials get more signups but lower conversion (10-20%).
                Test both if you&apos;re unsure.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-medium">
              How do I extend someone&apos;s trial?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                Update the user&apos;s <code className="bg-muted px-1 font-mono">trialEndsAt</code> field
                in the database to a future date. You can also do this via Stripe if using their
                trial system.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/payments">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono font-semibold">PAYMENTS</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Set up Stripe to handle trial-to-paid conversion.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/features/emails">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono font-semibold">EMAIL_REMINDERS</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Send trial reminder emails to increase conversion.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Back to docs link */}
      <div className="pt-4">
        <Link href="/docs" className="text-primary hover:underline">
          ← Back to Documentation
        </Link>
      </div>
    </div>
  );
}
