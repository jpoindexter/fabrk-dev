/**
 * About Us Page
 * Company story, mission, and values - Terminal Console Style
 */

"use client";

import { SiteNavigation } from "@/components/navigation";
import { Footer } from "@/components/landing/footer";
import { AboutHero } from "./components/about-hero";
import { MissionSection } from "./components/mission-section";
import { ValuesSection } from "./components/values-section";
import { StorySection } from "./components/story-section";
import { WhyChooseSection } from "./components/why-choose-section";
import { AboutCTA } from "./components/about-cta";

export default function AboutPage() {
  return (
    <div className="font-mono">
      <SiteNavigation />
      <AboutHero />
      <MissionSection />
      <ValuesSection />
      <StorySection />
      <WhyChooseSection />
      <AboutCTA />
      <Footer />
    </div>
  );
}
