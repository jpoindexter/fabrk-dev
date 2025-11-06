/**
 * ✅ FABRK COMPONENT
 * Landing Page Variations Showcase
 *
 * This page demonstrates all available landing page component variations:
 * - 3 Hero variations (Centered, Split-Screen, Video)
 * - 2 Pricing variations (Cards, Comparison Table)
 *
 * Use this to preview and choose your preferred layouts.
 *
 * To use in production:
 * 1. Choose your favorite hero variation
 * 2. Choose your favorite pricing layout
 * 3. Update src/app/page.tsx with your selections
 */

import {
  Navigation,
  HeroSection,
  HeroSplit,
  HeroVideo,
  PricingSection,
  PricingTable,
  Footer,
} from "@/components/landing";

export default function VariationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Variations */}
      <section className="border-b-8 border-black bg-[#F9F9F9] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-4 text-4xl font-bold text-black">
            Hero Variations
          </h2>
          <p className="mb-8 text-lg text-[#666666]">
            Choose the hero layout that best showcases your product. See{" "}
            <code className="rounded bg-black/10 px-2 py-1 text-sm">
              docs/LANDING-PAGE-VARIATIONS.md
            </code>{" "}
            for details.
          </p>
        </div>
      </section>

      {/* Variation 1: Centered Hero (Default) */}
      <section id="hero-centered">
        <div className="border-b-4 border-black bg-[#FFE5B4] py-4">
          <div className="mx-auto max-w-7xl px-6">
            <h3 className="text-2xl font-bold text-black">
              1. Centered Hero (Default)
            </h3>
            <p className="text-sm text-[#666666]">
              Best for: Simple messaging, code-first products
            </p>
          </div>
        </div>
        <HeroSection />
      </section>

      {/* Variation 2: Split-Screen Hero */}
      <section id="hero-split" className="border-t-8 border-black">
        <div className="border-b-4 border-black bg-[#E5F5FF] py-4">
          <div className="mx-auto max-w-7xl px-6">
            <h3 className="text-2xl font-bold text-black">
              2. Split-Screen Hero
            </h3>
            <p className="text-sm text-[#666666]">
              Best for: Showcasing product UI, visual products
            </p>
          </div>
        </div>
        <HeroSplit />
      </section>

      {/* Variation 3: Video Background Hero */}
      <section id="hero-video" className="border-t-8 border-black">
        <div className="border-b-4 border-black bg-[#FFE5F0] py-4">
          <div className="mx-auto max-w-7xl px-6">
            <h3 className="text-2xl font-bold text-black">
              3. Video Background Hero
            </h3>
            <p className="text-sm text-[#666666]">
              Best for: High-impact launches, demo videos
            </p>
          </div>
        </div>
        <HeroVideo />
      </section>

      {/* Pricing Variations */}
      <section className="border-t-8 border-black bg-[#F9F9F9] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-4 text-4xl font-bold text-black">
            Pricing Variations
          </h2>
          <p className="mb-8 text-lg text-[#666666]">
            Choose between card-based pricing or a competitive comparison table.
          </p>
        </div>
      </section>

      {/* Variation 1: Pricing Cards (Default) */}
      <section id="pricing-cards">
        <div className="border-b-4 border-black bg-[#E5FFE5] py-4">
          <div className="mx-auto max-w-7xl px-6">
            <h3 className="text-2xl font-bold text-black">
              1. Pricing Cards (Default)
            </h3>
            <p className="text-sm text-[#666666]">
              Best for: Simple pricing, clear CTAs
            </p>
          </div>
        </div>
        <PricingSection />
      </section>

      {/* Variation 2: Comparison Table */}
      <section id="pricing-table" className="border-t-8 border-black">
        <div className="border-b-4 border-black bg-[#FFF5E5] py-4">
          <div className="mx-auto max-w-7xl px-6">
            <h3 className="text-2xl font-bold text-black">
              2. Comparison Table
            </h3>
            <p className="text-sm text-[#666666]">
              Best for: Showing competitive advantages, feature-rich products
            </p>
          </div>
        </div>
        <PricingTable />
      </section>

      {/* Implementation Instructions */}
      <section className="border-t-8 border-black bg-[#F0F0F0] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-3xl font-bold text-black">
            How to Use These Variations
          </h2>

          <div className="space-y-6">
            <div className="rounded-lg border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="mb-3 text-xl font-bold text-black">
                Step 1: Choose Your Hero
              </h3>
              <p className="mb-4 text-[#666666]">
                Pick one of the three hero variations above. Copy the import and
                component to your landing page.
              </p>
              <pre className="overflow-x-auto rounded bg-black p-4 text-sm text-white">
                {`// In src/app/page.tsx
import { HeroSplit } from "@/components/landing";

export default function HomePage() {
  return (
    <>
      <HeroSplit />
      {/* Other sections... */}
    </>
  );
}`}
              </pre>
            </div>

            <div className="rounded-lg border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="mb-3 text-xl font-bold text-black">
                Step 2: Choose Your Pricing Layout
              </h3>
              <p className="mb-4 text-[#666666]">
                Pick between pricing cards or comparison table. Cards are simpler,
                table shows competitive advantages.
              </p>
              <pre className="overflow-x-auto rounded bg-black p-4 text-sm text-white">
                {`// In src/app/page.tsx
import { PricingTable } from "@/components/landing";

export default function HomePage() {
  return (
    <>
      {/* Other sections... */}
      <PricingTable />
    </>
  );
}`}
              </pre>
            </div>

            <div className="rounded-lg border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="mb-3 text-xl font-bold text-black">
                Step 3: Customize Props
              </h3>
              <p className="mb-4 text-[#666666]">
                Each variation accepts props for customization. See full
                documentation in{" "}
                <code className="rounded bg-black/10 px-2 py-1 text-sm">
                  docs/LANDING-PAGE-VARIATIONS.md
                </code>
              </p>
            </div>

            <div className="rounded-lg border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="mb-3 text-xl font-bold text-black">
                Need Help?
              </h3>
              <p className="text-[#666666]">
                Check the{" "}
                <a
                  href="/docs/LANDING-PAGE-VARIATIONS.md"
                  className="font-semibold text-[#007AFF] underline"
                >
                  Landing Page Variations Guide
                </a>{" "}
                for detailed instructions, prop references, and best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
