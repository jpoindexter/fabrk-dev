/**
 * ✅ FABRK COMPONENT
 * Home Page - Shadcn/ui style homepage
 * Production-ready ✓
 * 1:1 replica of shadcn/ui homepage design
 */

"use client";

import { ExamplesShowcase } from "@/components/home/examples-showcase";
import { HeroShadcn } from "@/components/home/hero-shadcn";
import { StreamlineSection } from "@/components/home/streamline-section";
import { KeyboardShortcutsModal } from "@/components/ui/keyboard-shortcuts-modal";
import { useGlobalKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import dynamic from "next/dynamic";

// Lazy load below-the-fold sections for better performance
const ShowcaseSection = dynamic(
  () =>
    import("@/components/home/showcase-section").then((mod) => ({ default: mod.ShowcaseSection })),
  {
    loading: () => <div className="min-h-[2000px]" />,
  }
);

const DashboardDemo = dynamic(
  () => import("@/components/home/dashboard-demo").then((mod) => ({ default: mod.DashboardDemo })),
  {
    loading: () => <div className="min-h-[800px]" />,
  }
);

const PricingShadcn = dynamic(
  () => import("@/components/home/pricing-shadcn").then((mod) => ({ default: mod.PricingShadcn })),
  {
    loading: () => <div className="min-h-[800px]" />,
  }
);

const TestimonialsShadcn = dynamic(
  () =>
    import("@/components/home/testimonials-shadcn").then((mod) => ({
      default: mod.TestimonialsShadcn,
    })),
  {
    loading: () => <div className="min-h-[600px]" />,
  }
);

const FaqShadcn = dynamic(
  () => import("@/components/home/faq-shadcn").then((mod) => ({ default: mod.FaqShadcn })),
  {
    loading: () => <div className="min-h-[600px]" />,
  }
);

const CtaShadcn = dynamic(
  () => import("@/components/home/cta-shadcn").then((mod) => ({ default: mod.CtaShadcn })),
  {
    loading: () => <div className="min-h-[400px]" />,
  }
);

export default function HomePage() {
  // Enable global keyboard shortcuts
  useGlobalKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-white">
      <HeroShadcn />
      <ExamplesShowcase />
      <StreamlineSection />
      <ShowcaseSection />
      <DashboardDemo />
      <PricingShadcn />
      <TestimonialsShadcn />
      <FaqShadcn />
      <CtaShadcn />
      <KeyboardShortcutsModal />
    </div>
  );
}
