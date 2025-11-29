import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Launch Checklist - Fabrk Docs",
  description: "Ensure your Fabrk app is production-ready. Complete pre-launch checklist for code, payments, and marketing.",
};

export default function LaunchChecklistPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
                    <span className="font-mono text-xs text-muted-foreground">[ [0xA0] LAUNCH ] CHECKLIST</span>
                </div>
                <h1 className="font-mono text-3xl font-bold tracking-tight">LAUNCH_CHECKLIST</h1>
                <p className="font-mono text-sm text-muted-foreground">
                    &gt; A comprehensive guide to ensuring your Fabrk application is production-ready.
                </p>
            </div>

            <Card className="border-primary/20 bg-card">
                <CardContent className="p-6">
                    <p className="text-primary font-medium">
                        Status: Ready for Launch 🟢
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                        Follow this checklist to verify your application before going live.
                    </p>
                </CardContent>
            </Card>

            {/* 1. Pre-Launch Verification */}
            <section className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center bg-primary text-sm font-mono font-bold text-primary-foreground">1</span>
                    <h2 className="font-mono text-xl font-semibold">PRE_LAUNCH_VERIFICATION</h2>
                </div>
                <div className="space-y-4">
                    <h3 className="font-mono text-lg font-medium">CODE_QUALITY_AND_SECURITY</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>Resolve TODOs:</strong> Search for `TODO` or `FIXME` in `src/` and resolve them.</li>
                        <li><strong>Configuration:</strong> Ensure all placeholders in `src/config.js` are replaced with real values.</li>
                        <li><strong>Type Safety:</strong> Run `npm run type-check` to ensure no TypeScript errors.</li>
                        <li><strong>Linting:</strong> Run `npm run lint` to catch potential issues.</li>
                        <li><strong>Dependencies:</strong> Run `npm audit` to check for security vulnerabilities.</li>
                        <li><strong>Build:</strong> Verify `npm run build` succeeds locally.</li>
                    </ul>

                    <h3 className="font-mono text-lg font-medium">LEGAL_AND_BUSINESS</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>Pricing:</strong> Confirm prices in `src/config.js` match your Stripe dashboard.</li>
                        <li><strong>Support:</strong> Verify `supportEmail` in config is active.</li>
                        <li><strong>Terms:</strong> Ensure Terms of Service and Privacy Policy pages are accessible.</li>
                    </ul>
                </div>
            </section>

            {/* 2. Stripe Setup */}
            <section className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center bg-primary text-sm font-mono font-bold text-primary-foreground">2</span>
                    <h2 className="font-mono text-xl font-semibold">STRIPE_AND_PAYMENTS_SETUP</h2>
                </div>
                <div className="space-y-4">
                    <h3 className="font-mono text-lg font-medium">PRODUCT_CONFIGURATION</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Create products in Stripe Dashboard (Test & Production).</li>
                        <li>Copy Price IDs to `.env` (e.g., `NEXT_PUBLIC_STRIPE_PRICE_PRO`).</li>
                        <li>Create coupons if needed (e.g., EARLYBIRD).</li>
                    </ul>

                    <h3 className="font-mono text-lg font-medium">WEBHOOK_CONFIGURATION</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Add endpoint: `https://your-domain.com/api/stripe/webhook`</li>
                        <li>Select events: `checkout.session.completed`, `customer.subscription.*`, `payment_intent.*`</li>
                        <li>Copy Signing Secret (`whsec_...`) to `STRIPE_WEBHOOK_SECRET` in `.env`.</li>
                    </ul>
                </div>
            </section>

            {/* 3. Marketing Assets */}
            <section className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center bg-primary text-sm font-mono font-bold text-primary-foreground">3</span>
                    <h2 className="font-mono text-xl font-semibold">MARKETING_ASSETS</h2>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>The Pitch:</strong> Prepare a 30-60s video for social media.</li>
                    <li><strong>The Walkthrough:</strong> Record a 3-5 min demo for the documentation/landing page.</li>
                    <li><strong>Social Proof:</strong> Gather initial testimonials or beta user feedback.</li>
                </ul>
            </section>

            {/* 4. Launch Day */}
            <section className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center bg-primary text-sm font-mono font-bold text-primary-foreground">4</span>
                    <h2 className="font-mono text-xl font-semibold">LAUNCH_DAY_EXECUTION</h2>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Distribution:</strong> Verify your GitHub repo invite system (if selling code) or app deployment.</li>
                    <li><strong>Announcement:</strong> Schedule Product Hunt, Twitter/X, and LinkedIn posts.</li>
                    <li><strong>Community:</strong> Post in relevant Discord servers and subreddits.</li>
                </ul>
            </section>

            {/* 5. Post-Launch */}
            <section className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center bg-primary text-sm font-mono font-bold text-primary-foreground">5</span>
                    <h2 className="font-mono text-xl font-semibold">POST_LAUNCH_MONITORING</h2>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Support:</strong> Monitor your support email continuously for 48 hours.</li>
                    <li><strong>Stripe:</strong> Watch for failed payments or disputes.</li>
                    <li><strong>Errors:</strong> Check Vercel logs or Sentry for unhandled exceptions.</li>
                </ul>
            </section>

            {/* Useful Commands */}
            <section className="space-y-4">
                <h2 className="font-mono text-xl font-semibold">USEFUL_COMMANDS</h2>
                <div className="space-y-4">
                    <p className="text-muted-foreground">Pre-launch verification commands:</p>
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
