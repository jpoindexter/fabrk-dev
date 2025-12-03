/**
 * ✅ FABRK COMPONENT
 * UI Components Showcase - Terminal console style
 * Production-ready ✓
 */

import { DemoNav } from "@/components/demo/demo-nav";
import { Footer } from "@/components/landing/footer";
import ActivityTimelineDemo from "./activity-timeline-demo";
import { PageHeader } from "./sections/page-header";
import { ButtonsSection } from "./sections/buttons-section";
import { FormsSection } from "./sections/forms-section";
import { CardsSection } from "./sections/cards-section";
import { TypographySection } from "./sections/typography-section";
import { FeedbackSection } from "./sections/feedback-section";
import { NavigationSection } from "./sections/navigation-section";
import { DropdownSection } from "./sections/dropdown-section";

export default function ComponentsPage() {
  return (
    <div className="bg-background min-h-screen font-mono">
      {/* Demo Navigation */}
      <DemoNav backButtonText="Back" backButtonHref="/demo" />

      <div className="container mx-auto max-w-7xl space-y-12 px-6 py-12">
        {/* Header */}
        <PageHeader />

        {/* Buttons Section */}
        <ButtonsSection />

        {/* Forms Section */}
        <FormsSection />

        {/* Cards Section */}
        <CardsSection />

        {/* Typography Section */}
        <TypographySection />

        {/* Feedback Section */}
        <FeedbackSection />

        {/* Navigation Section */}
        <NavigationSection />

        {/* Dropdown Menus Section */}
        <DropdownSection />

        {/* Activity Timeline Section */}
        <section id="activity-timeline" className="space-y-6">
          <ActivityTimelineDemo />
        </section>
      </div>

      <Footer />
    </div>
  );
}
