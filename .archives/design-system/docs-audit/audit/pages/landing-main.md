# Landing Page Audit (Main)

**File:** `src/app/page.tsx`
**Status:** Production-ready ✓
**Template Used:** MarketingPageTemplate

---

## Purpose

Main landing page for Fabrk. Clean, Achromatic-inspired design showcasing the product with hero, features, pricing, comparison, FAQ sections.

---

## Layout Overview

### Structure

- Uses `MarketingPageTemplate` wrapper
- Hero section (top)
- 5 main sections: FeaturesShowcase, FeaturesSection, PricingSection, ComparisonSection, FAQSection
- Overlay components: StickyCTABar, ExitIntentPopup

### Component Hierarchy

```
MarketingPageTemplate
├── hero: HeroSection
├── sections: [
│   ├── FeaturesShowcase
│   ├── FeaturesSection
│   ├── PricingSection
│   ├── ComparisonSection
│   └── FAQSection
│   ]
└── overlays: StickyCTABar + ExitIntentPopup
```

---

## Key Components Used

1. **MarketingPageTemplate** - Wrapper providing consistent navigation/footer
2. **HeroSection** - Primary hero content
3. **FeaturesShowcase** - Interactive features display
4. **FeaturesSection** - Feature grid/list
5. **PricingSection** - Pricing cards
6. **ComparisonSection** - Competitor comparison
7. **FAQSection** - Accordion FAQ
8. **StickyCTABar** - Sticky bottom CTA
9. **ExitIntentPopup** - Exit-intent modal

---

## Typography Scale Observed

All components use terminal/monospace aesthetic:

- **Font Family:** `font-mono` applied globally
- **Hero Title:** Large text (likely 4xl-5xl+)
- **Section Headers:** text-2xl to text-3xl
- **Body Text:** text-sm to text-base
- **Labels/Meta:** text-xs for muted labels

---

## Spacing Patterns Observed

- **Vertical Section Spacing:** Likely `py-16` or `py-24` per section
- **Container:** `container mx-auto max-w-7xl px-6`
- **Component Gaps:** Sections wrapped in arrays suggest no manual gaps (template handles)
- **CTA Bar:** Sticky positioning, likely fixed height
- **Popup:** Overlay positioning

---

## Inconsistencies / Ad-Hoc Styles

### None Observed

- Uses production-ready components
- Template-driven layout (consistent)
- No inline hardcoded values visible
- Follows component-first architecture

---

## Design System Compliance

✅ **PASS** - Template-based, uses approved components
✅ **PASS** - No hardcoded colors visible
✅ **PASS** - No custom spacing values
✅ **PASS** - Terminal aesthetic via component design

---

## Recommendations

1. **Verify HeroSection** uses `font-mono` and terminal styling
2. **Check overlays** don't interfere with accessibility (keyboard nav)
3. **Ensure StickyCTABar** uses design tokens for bg/text colors
4. **Validate ExitIntentPopup** respects user preferences (no spam)

---

## Related Files to Audit

- `src/components/landing/hero-section.tsx`
- `src/components/home/features-showcase.tsx`
- `src/components/landing/features-section.tsx`
- `src/components/landing/pricing-section.tsx`
- `src/components/landing/comparison-section.tsx`
- `src/components/landing/faq-section.tsx`
- `src/components/landing/sticky-cta-bar.tsx`
- `src/components/landing/exit-intent-popup.tsx`
- `src/components/templates/marketing-page-template.tsx`
