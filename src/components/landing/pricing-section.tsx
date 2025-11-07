import { Check } from "lucide-react";
import { CheckoutButton } from "@/components/pricing/checkout-button";

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
      className="scroll-mt-16 bg-[#F7F7F7] px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-center text-4xl font-bold text-black">
          One Price. Unlimited Projects. Launch Now.
        </h2>

        {/* Pricing Card */}
        <div className="mx-auto mt-16 max-w-lg">
          <div className="rounded-2xl border border-black/10 bg-white p-10 shadow-2xl">
            {/* Plan Name */}
            <div className="mb-6 text-center">
              <span className="inline-block rounded-full bg-[#007AFF]/10 px-6 py-2 text-sm font-semibold text-[#007AFF]">
                Early Access - Launch Special
              </span>
            </div>

            {/* Price */}
            <div className="mb-8 text-center">
              <div className="mb-2 flex items-center justify-center gap-3">
                <span className="text-6xl font-bold text-black">$79</span>
              </div>
              <p className="text-lg text-[#333333]">
                Pay once, use forever. <span className="font-bold">$0 recurring fees.</span>
              </p>
            </div>

            {/* Features List */}
            <ul className="mb-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 text-[#007AFF]" strokeWidth={3} />
                  <span className="text-[#333333]">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <CheckoutButton
              priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || ""}
              planName="Fabrk Boilerplate"
              className="h-14 w-full bg-primary text-lg font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Buy Now & Ship Faster
            </CheckoutButton>

            {/* Risk Reversal */}
            <p className="mt-6 text-center text-sm text-[#666666]">
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
