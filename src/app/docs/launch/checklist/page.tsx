import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export default function LaunchChecklistPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Launch Checklist</h1>
                <p className="text-lg text-muted-foreground">
                    A comprehensive guide to ensuring your Fabrk application is production-ready.
                </p>
            </div>

            <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900">
                <CardContent className="p-6">
                    <p className="text-green-800 dark:text-green-200 font-medium">
                        Status: Ready for Launch 🟢
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        Follow this checklist to verify your application before going live.
                    </p>
                </CardContent>
            </Card>

            {/* 1. Pre-Launch Verification */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">1. Pre-Launch Verification</h2>
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Code Quality & Security</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>Resolve TODOs:</strong> Search for `TODO` or `FIXME` in `src/` and resolve them.</li>
                        <li><strong>Configuration:</strong> Ensure all placeholders in `src/config.js` are replaced with real values.</li>
                        <li><strong>Type Safety:</strong> Run `npm run type-check` to ensure no TypeScript errors.</li>
                        <li><strong>Linting:</strong> Run `npm run lint` to catch potential issues.</li>
                        <li><strong>Dependencies:</strong> Run `npm audit` to check for security vulnerabilities.</li>
                        <li><strong>Build:</strong> Verify `npm run build` succeeds locally.</li>
                    </ul>

                    <h3 className="text-lg font-medium">Legal & Business</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>Pricing:</strong> Confirm prices in `src/config.js` match your Stripe dashboard.</li>
                        <li><strong>Support:</strong> Verify `supportEmail` in config is active.</li>
                        <li><strong>Terms:</strong> Ensure Terms of Service and Privacy Policy pages are accessible.</li>
                    </ul>
                </div>
            </section>

            {/* 2. Stripe Setup */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">2. Stripe & Payments Setup</h2>
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Product Configuration</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Create products in Stripe Dashboard (Test & Production).</li>
                        <li>Copy Price IDs to `.env` (e.g., `NEXT_PUBLIC_STRIPE_PRICE_PRO`).</li>
                        <li>Create coupons if needed (e.g., EARLYBIRD).</li>
                    </ul>

                    <h3 className="text-lg font-medium">Webhook Configuration</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Add endpoint: `https://your-domain.com/api/stripe/webhook`</li>
                        <li>Select events: `checkout.session.completed`, `customer.subscription.*`, `payment_intent.*`</li>
                        <li>Copy Signing Secret (`whsec_...`) to `STRIPE_WEBHOOK_SECRET` in `.env`.</li>
                    </ul>
                </div>
            </section>

            {/* 3. Marketing Assets */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">3. Marketing Assets</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>The Pitch:</strong> Prepare a 30-60s video for social media.</li>
                    <li><strong>The Walkthrough:</strong> Record a 3-5 min demo for the documentation/landing page.</li>
                    <li><strong>Social Proof:</strong> Gather initial testimonials or beta user feedback.</li>
                </ul>
            </section>

            {/* 4. Launch Day */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">4. Launch Day Execution</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Distribution:</strong> Verify your GitHub repo invite system (if selling code) or app deployment.</li>
                    <li><strong>Announcement:</strong> Schedule Product Hunt, Twitter/X, and LinkedIn posts.</li>
                    <li><strong>Community:</strong> Post in relevant Discord servers and subreddits.</li>
                </ul>
            </section>

            {/* 5. Post-Launch */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">5. Post-Launch Monitoring</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Support:</strong> Monitor your support email continuously for 48 hours.</li>
                    <li><strong>Stripe:</strong> Watch for failed payments or disputes.</li>
                    <li><strong>Errors:</strong> Check Vercel logs or Sentry for unhandled exceptions.</li>
                </ul>
            </section>

            {/* Useful Commands */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Useful Commands</h2>
                <CodeBlock language="bash" code={`# Run full test suite
npm run test:all

# Check for TODOs
grep -r "TODO" src/

# Verify build
npm run build

# Check types
npm run type-check`} />
            </section>
        </div>
    );
}
