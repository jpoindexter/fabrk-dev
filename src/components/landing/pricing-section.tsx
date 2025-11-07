import { Check } from "lucide-react";
import { CheckoutButton } from "@/components/pricing/checkout-button";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export function PricingSection() {
  const features = [
    "Next.js 15 Boilerplate",
    "Lifetime Updates",
    "Unlimited Projects",
    "Access to Private Discord",
    "Full Source Code",
  ];

  return (
    <section
      id="pricing"
      className="scroll-mt-16 bg-accent px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-center text-4xl font-bold text-foreground">
          One Price. Unlimited Projects. Launch Now.
        </h2>

        {/* Pricing Card */}
        <div className="mx-auto mt-16 max-w-lg">
          <div className="rounded-2xl border-3 border-border bg-card p-10 shadow-brutal-lg">
            {/* Plan Name */}
            <div className="mb-6 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-6 py-2 text-sm font-semibold text-primary">
                Early Access - Launch Special
              </span>
            </div>

            {/* Price */}
            <div className="mb-8 text-center">
              <div className="mb-2 flex items-center justify-center gap-3">
                <span className="text-6xl font-bold text-foreground">$79</span>
              </div>
              <p className="text-lg text-muted-foreground">
                Pay once, use forever. <span className="font-bold text-foreground">$0 recurring fees.</span>
              </p>
            </div>

            {/* Features List */}
            <ul className="mb-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 text-primary" strokeWidth={3} />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <ErrorBoundary
              fallback={
                <div className="rounded-lg border-3 border-destructive bg-destructive/10 p-4 text-center">
                  <p className="text-sm text-destructive">
                    Unable to load checkout. Please refresh the page or contact support.
                  </p>
                </div>
              }
            >
              <CheckoutButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || ""}
                planName="Fabrk Boilerplate"
                className="h-14 w-full text-lg font-semibold"
              >
                Buy Now & Ship Faster
              </CheckoutButton>
            </ErrorBoundary>

            {/* Risk Reversal */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
