# Baseline Metrics — Marketing Homepage

**Date**: December 11, 2025
**Branch**: `marketing-homepage-redesign`
**Purpose**: Document current state before implementing Russian Judge redesign

---

## Current Homepage Structure

**Page**: `src/app/(marketing)/page.tsx`

**Section Order**:
1. HeroSection
2. FeaturesShowcase (12-card grid)
3. FeaturesSection (animated previews)
4. PricingSection
5. ComparisonSection
6. FAQSection
7. StickyCTABar (overlay)
8. ExitIntentPopup (overlay)

**Total Sections**: 6 main + 2 overlays

---

## Current Hero Messaging

**File**: `src/components/marketing/hero-section.tsx`

**Headline**:
```
BUILDING YOUR SAAS
JUST GOT UNFAIRLY EASY.
```

**Subheadline**:
```
Why spend valuable time tackling auth, billing, emails, organizations,
invites and onboarding? Focus on your business and skip the noise.
```

**CTAs**:
- Primary: `> GET FABRK`
- Secondary: `> VIEW LIBRARY`

**Issues Identified**:
- Vague messaging ("unfairly easy" vs. concrete time savings)
- Rhetorical questions instead of benefits
- No social proof above the fold
- CTAs equally weighted (no visual hierarchy)
- No pricing visible in hero

---

## Current Features Section

**FeaturesShowcase**: 12 small cards with technical descriptions
**FeaturesSection**: 6 animated preview cards (auth, billing, credits, design, organization, database)

**Issue**: Two redundant feature sections (confusing hierarchy)

---

## Current Pricing Position

**Location**: Section 4 (after hero, features showcase, features section)

**Issue**: Pricing buried — users must scroll through 3 sections to see price

---

## SEO Metadata (Current)

**File**: `src/app/(marketing)/page.tsx`

**Title**: Default from layout (likely "Fabrk")
**Description**: Not explicitly set in page
**H1**: "BUILDING YOUR SAAS JUST GOT UNFAIRLY EASY"

**Action Required**: Backup and update SEO tags

---

## Performance Budget (Targets)

Since Lighthouse audit failed to run on local dev server, setting targets based on industry standards:

**Targets After Redesign**:
- Performance: ≥ 90
- Accessibility: ≥ 95 (WCAG 2.1 AA)
- Best Practices: ≥ 90
- SEO: ≥ 95

**Core Web Vitals**:
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- FID (First Input Delay): < 100ms

---

## Mobile Considerations

**Current Issues**:
- 12-card grid on FeaturesShowcase likely breaks on mobile
- Hero 3-column layout (terminal demo + stats + CTA) won't fit mobile
- Typewriter animation may be slow on low-end devices

**Action Required**: Mobile-first redesign for hero

---

## Analytics (Current State)

**PostHog Setup**: Exists but no specific event tracking for:
- Hero CTA clicks
- Pricing section views
- Demo engagement
- Scroll depth tracking

**Action Required**: Add event tracking in Phase 0.5

---

## Accessibility (Current State)

**Design System**: WCAG 2.1 AA compliant (verified in terminal-first-consistency-fixes branch)

**Potential Issues in New Design**:
- Stats counter animations (screen reader compatibility)
- Countdown timer (if added - needs ARIA labels)
- Logo row (needs alt text for each logo)

---

## Next Steps

1. ✅ Baseline metrics documented
2. ⬜ Phase 1: Implement hero redesign
3. ⬜ Phase 2: Simplify features section (12 → 3)
4. ⬜ Phase 3: Move pricing up
5. ⬜ Phase 4: Add competitor comparison
6. ⬜ Phase 5: Reposition FAQ
7. ⬜ Phase 6: Performance validation
8. ⬜ Phase 7: Accessibility validation

---

**Status**: Ready to proceed with Phase 1 (Hero Redesign)
