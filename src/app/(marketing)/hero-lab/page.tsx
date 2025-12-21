/**
 * Hero Lab - 10 Hero Section Variations
 * Test different approaches to find the most compelling hero
 */
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

// Hero Components
import { HeroTimeSaved } from './components/hero-time-saved';
import { HeroLiveRevenue } from './components/hero-live-revenue';
import { HeroBeforeAfter } from './components/hero-before-after';
import { HeroComponentGallery } from './components/hero-component-gallery';
import { HeroTerminalBoot } from './components/hero-terminal-boot';
import { HeroSocialProof } from './components/hero-social-proof';
import { HeroFeatureChecklist } from './components/hero-feature-checklist';
import { HeroPricingBreakdown } from './components/hero-pricing-breakdown';
import { HeroThemeShowcase } from './components/hero-theme-showcase';
import { HeroSpeedRun } from './components/hero-speed-run';

export const metadata = {
  title: 'Hero Lab | Fabrk',
  description: 'Testing 10 hero section variations',
};

const VARIATIONS = [
  { id: 'time-saved', name: '01: TIME SAVED', component: HeroTimeSaved },
  { id: 'live-revenue', name: '02: LIVE REVENUE', component: HeroLiveRevenue },
  { id: 'before-after', name: '03: BEFORE/AFTER', component: HeroBeforeAfter },
  { id: 'component-gallery', name: '04: COMPONENT GALLERY', component: HeroComponentGallery },
  { id: 'terminal-boot', name: '05: TERMINAL BOOT', component: HeroTerminalBoot },
  { id: 'social-proof', name: '06: SOCIAL PROOF', component: HeroSocialProof },
  { id: 'feature-checklist', name: '07: FEATURE CHECKLIST', component: HeroFeatureChecklist },
  { id: 'pricing-breakdown', name: '08: PRICING BREAKDOWN', component: HeroPricingBreakdown },
  { id: 'theme-showcase', name: '09: THEME SHOWCASE', component: HeroThemeShowcase },
  { id: 'speed-run', name: '10: SPEED RUN', component: HeroSpeedRun },
];

export default function HeroLabPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container size="2xl">
          <div className="flex items-center gap-4 overflow-x-auto py-3 scrollbar-hide">
            <span className={cn('text-xs shrink-0', mode.font, mode.color.text.muted)}>[NAV]</span>
            {VARIATIONS.map((v) => (
              <a
                key={v.id}
                href={`#${v.id}`}
                className={cn(
                  'text-xs shrink-0 border px-2 py-1 transition-colors',
                  mode.font,
                  mode.color.text.muted,
                  mode.state.hover.card
                )}
              >
                {v.name}
              </a>
            ))}
          </div>
        </Container>
      </div>

      {/* Hero Variations */}
      <div className="divide-y">
        {VARIATIONS.map((variation) => (
          <section
            key={variation.id}
            id={variation.id}
            className="min-h-screen py-16 scroll-mt-32"
          >
            {/* Section Label */}
            <Container size="2xl">
              <div className={cn('mb-8 flex items-center gap-4', mode.font)}>
                <span className={cn('text-xs px-2 py-1 border', mode.color.text.accent)}>
                  {variation.name}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
            </Container>

            {/* Hero Component */}
            <variation.component />
          </section>
        ))}
      </div>
    </div>
  );
}
