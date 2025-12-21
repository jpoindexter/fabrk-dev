/**
 * Hero Lab - 15 Hero Section Variations
 * Test different approaches to find the most compelling hero
 */
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

// Hero Components - Compact (stay above fold)
import { HeroCommandLine } from './components/hero-command-line';
import { HeroSplitCompact } from './components/hero-split-compact';
import { HeroStatsWall } from './components/hero-stats-wall';
import { HeroVideoPreview } from './components/hero-video-preview';
import { HeroMinimalCTA } from './components/hero-minimal-cta';

// Hero Components - Full (may overflow fold)
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
  description: 'Testing 15 hero section variations',
};

// Compact heroes (above fold) - RECOMMENDED
const COMPACT_VARIATIONS = [
  { id: 'minimal-cta', name: '★ MINIMAL CTA', component: HeroMinimalCTA, recommended: true },
  { id: 'command-line', name: '★ COMMAND LINE', component: HeroCommandLine, recommended: true },
  { id: 'stats-wall', name: '★ STATS WALL', component: HeroStatsWall, recommended: true },
  { id: 'split-compact', name: 'SPLIT COMPACT', component: HeroSplitCompact },
  { id: 'video-preview', name: 'VIDEO PREVIEW', component: HeroVideoPreview },
];

// Full heroes (may overflow)
const FULL_VARIATIONS = [
  { id: 'terminal-boot', name: 'TERMINAL BOOT', component: HeroTerminalBoot },
  { id: 'before-after', name: 'BEFORE/AFTER', component: HeroBeforeAfter },
  { id: 'time-saved', name: 'TIME SAVED', component: HeroTimeSaved },
  { id: 'live-revenue', name: 'LIVE REVENUE', component: HeroLiveRevenue },
  { id: 'component-gallery', name: 'COMPONENT GALLERY', component: HeroComponentGallery },
  { id: 'social-proof', name: 'SOCIAL PROOF', component: HeroSocialProof },
  { id: 'feature-checklist', name: 'FEATURE CHECKLIST', component: HeroFeatureChecklist },
  { id: 'pricing-breakdown', name: 'PRICING BREAKDOWN', component: HeroPricingBreakdown },
  { id: 'theme-showcase', name: 'THEME SHOWCASE', component: HeroThemeShowcase },
  { id: 'speed-run', name: 'SPEED RUN', component: HeroSpeedRun },
];

const ALL_VARIATIONS = [...COMPACT_VARIATIONS, ...FULL_VARIATIONS];

export default function HeroLabPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container size="2xl">
          <div className="py-3 space-y-2">
            {/* Compact Section */}
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              <span className={cn('text-xs shrink-0 text-success', mode.font)}>[ABOVE FOLD]</span>
              {COMPACT_VARIATIONS.map((v) => (
                <a
                  key={v.id}
                  href={`#${v.id}`}
                  className={cn(
                    'text-xs shrink-0 border px-2 py-1 transition-colors',
                    mode.font,
                    v.recommended ? 'border-success text-success' : mode.color.text.muted,
                    mode.state.hover.card
                  )}
                >
                  {v.name}
                </a>
              ))}
            </div>
            {/* Full Section */}
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              <span className={cn('text-xs shrink-0', mode.font, mode.color.text.muted)}>[FULL SIZE]</span>
              {FULL_VARIATIONS.map((v) => (
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
          </div>
        </Container>
      </div>

      {/* Hero Variations */}
      <div className="divide-y">
        {ALL_VARIATIONS.map((variation, index) => {
          const isCompact = index < COMPACT_VARIATIONS.length;
          return (
            <section
              key={variation.id}
              id={variation.id}
              className={cn(
                'py-8 scroll-mt-40',
                isCompact ? 'min-h-[80vh]' : 'min-h-screen'
              )}
            >
              {/* Section Label */}
              <Container size="2xl">
                <div className={cn('mb-6 flex items-center gap-4', mode.font)}>
                  <span
                    className={cn(
                      'text-xs px-2 py-1 border',
                      isCompact ? 'border-success text-success' : mode.color.text.accent
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}: {variation.name}
                  </span>
                  {isCompact && (
                    <span className={cn('text-xs', mode.color.text.success)}>STAYS ABOVE FOLD</span>
                  )}
                  <div className="h-px flex-1 bg-border" />
                </div>
              </Container>

              {/* Hero Component */}
              <variation.component />
            </section>
          );
        })}
      </div>
    </div>
  );
}
