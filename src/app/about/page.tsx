/**
 * About Us Page
 * Company story, mission, and values - Terminal Console Style
 *
 * Uses MarketingPageTemplate for consistent structure
 */

"use client";

import { MarketingPageTemplate } from "@/components/templates/marketing-page-template";
import { AboutHero } from "./components/about-hero";
import { MissionSection } from "./components/mission-section";
import { ValuesSection } from "./components/values-section";
import { StorySection } from "./components/story-section";
import { WhyChooseSection } from "./components/why-choose-section";
import { AboutCTA } from "./components/about-cta";

export default function AboutPage() {
  return (
    <MarketingPageTemplate
      hero={<AboutHero />}
      sections={[
        { id: "mission", component: <MissionSection /> },
        { id: "values", component: <ValuesSection /> },
        { id: "story", component: <StorySection /> },
        { id: "why-choose", component: <WhyChooseSection /> },
      ]}
      cta={<AboutCTA />}
    />
  );
}
