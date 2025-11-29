import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Launch Checklist - Fabrk Docs",
  description: "Ensure your Fabrk app is production-ready. Complete pre-launch checklist for code, payments, and marketing.",
};

export default function LaunchChecklistPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="mb-4 inline-block border border-border bg-card px-2 py-1">
                    <span className="font-mono text-xs text-muted-foreground">[ [0xA0] LAUNCH ] CHECKLIST</span>
                </div>
                <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">LAUNCH_CHECKLIST</h1>
                <p className="font-mono text-base text-muted-foreground">
                    &gt; A comprehensive guide to ensuring your Fabrk application is production-ready.
                </p>
            </div>

            <Card className="rounded-none border-primary/20 bg-card">
                <CardContent className="p-4">
                    <p className="text-primary font-mono font-medium text-xs">
                        Status: Ready for Launch
                    </p>
                    <p className="font-mono text-xs text-muted-foreground mt-1">
                        Follow this checklist to verify your application before going live.
                    </p>
                </CardContent>
            </Card>

            {/* 1. Pre-Launch Verification */}
            <section className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">1</span>
                    <h2 className="font-mono text-lg font-bold">PRE_LAUNCH_VERIFICATION</h2>
                </div>
                <div className="space-y-3">
                    <h3 className="font-mono text-xs font-semibold">CODE_QUALITY_AND_SECURITY</h3>
                    <div className="space-y-1 font-mono text-sm text-muted-foreground">
                        <div>├─ <strong>Resolve TODOs:</strong> Search for `TODO` or `FIXME` in `src/` and resolve them.</div>
                        <div>├─ <strong>Configuration:</strong> Ensure all placeholders in `src/config.js` are replaced with real values.</div>
                        <div>├─ <strong>Type Safety:</strong> Run `npm run type-check` to ensure no TypeScript errors.</div>
                        <div>├─ <strong>Linting:</strong> Run `npm run lint` to catch potential issues.</div>
                        <div>├─ <strong>Dependencies:</strong> Run `npm audit` to check for security vulnerabilities.</div>
                        <div>└─ <strong>Build:</strong> Verify `npm run build` succeeds locally.</div>
                    </div>

                    <h3 className="font-mono text-xs font-semibold">LEGAL_AND_BUSINESS</h3>
                    <div className="space-y-1 font-mono text-sm text-muted-foreground">
                        <div>├─ <strong>Pricing:</strong> Confirm prices in `src/config.js` match your Stripe dashboard.</div>
                        <div>├─ <strong>Support:</strong> Verify `supportEmail` in config is active.</div>
                        <div>└─ <strong>Terms:</strong> Ensure Terms of Service and Privacy Policy pages are accessible.</div>
                    </div>
                </div>
            </section>

            {/* 2. Stripe Setup */}
            <section className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">2</span>
                    <h2 className="font-mono text-lg font-bold">STRIPE_AND_PAYMENTS_SETUP</h2>
                </div>
                <div className="space-y-3">
                    <h3 className="font-mono text-xs font-semibold">PRODUCT_CONFIGURATION</h3>
                    <div className="space-y-1 font-mono text-sm text-muted-foreground">
                        <div>├─ Create products in Stripe Dashboard (Test & Production).</div>
                        <div>├─ Copy Price IDs to `.env` (e.g., `NEXT_PUBLIC_STRIPE_PRICE_PRO`).</div>
                        <div>└─ Create coupons if needed (e.g., EARLYBIRD).</div>
                    </div>

                    <h3 className="font-mono text-xs font-semibold">WEBHOOK_CONFIGURATION</h3>
                    <div className="space-y-1 font-mono text-sm text-muted-foreground">
                        <div>├─ Add endpoint: `https://your-domain.com/api/stripe/webhook`</div>
                        <div>├─ Select events: `checkout.session.completed`, `customer.subscription.*`, `payment_intent.*`</div>
                        <div>└─ Copy Signing Secret (`whsec_...`) to `STRIPE_WEBHOOK_SECRET` in `.env`.</div>
                    </div>
                </div>
            </section>

            {/* 3. Marketing Assets */}
            <section className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">3</span>
                    <h2 className="font-mono text-lg font-bold">MARKETING_ASSETS</h2>
                </div>
                <div className="space-y-1 font-mono text-sm text-muted-foreground">
                    <div>├─ <strong>The Pitch:</strong> Prepare a 30-60s video for social media.</div>
                    <div>├─ <strong>The Walkthrough:</strong> Record a 3-5 min demo for the documentation/landing page.</div>
                    <div>└─ <strong>Social Proof:</strong> Gather initial testimonials or beta user feedback.</div>
                </div>
            </section>

            {/* 4. Launch Day */}
            <section className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">4</span>
                    <h2 className="font-mono text-lg font-bold">LAUNCH_DAY_EXECUTION</h2>
                </div>
                <div className="space-y-1 font-mono text-sm text-muted-foreground">
                    <div>├─ <strong>Distribution:</strong> Verify your GitHub repo invite system (if selling code) or app deployment.</div>
                    <div>├─ <strong>Announcement:</strong> Schedule Product Hunt, Twitter/X, and LinkedIn posts.</div>
                    <div>└─ <strong>Community:</strong> Post in relevant Discord servers and subreddits.</div>
                </div>
            </section>

            {/* 5. Post-Launch */}
            <section className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">5</span>
                    <h2 className="font-mono text-lg font-bold">POST_LAUNCH_MONITORING</h2>
                </div>
                <div className="space-y-1 font-mono text-sm text-muted-foreground">
                    <div>├─ <strong>Support:</strong> Monitor your support email continuously for 48 hours.</div>
                    <div>├─ <strong>Stripe:</strong> Watch for failed payments or disputes.</div>
                    <div>└─ <strong>Errors:</strong> Check Vercel logs or Sentry for unhandled exceptions.</div>
                </div>
            </section>

            {/* Useful Commands */}
            <section className="space-y-3">
                <h2 className="font-mono text-lg font-bold">USEFUL_COMMANDS</h2>
                <p className="font-mono text-base text-muted-foreground">Pre-launch verification commands:</p>
                <div className="[&>div]:rounded-none">
                    <CodeBlock language="bash" code={`# Run full test suite
npm run test:all

# Check for TODOs
grep -r "TODO" src/

# Verify build
npm run build

# Check types
npm run type-check`} />
                </div>
            </section>
        </div>
    );
}
