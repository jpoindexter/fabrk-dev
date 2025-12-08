# Landing Page Audit (Alternative)

**File:** `src/app/landing-alt/page.tsx`
**Status:** Production-ready ✓
**Template Used:** Manual layout (no template wrapper)

---

## Purpose

Alternative landing page layout for A/B testing. Shows ComparisonSection early in the flow instead of near the end.

---

## Layout Overview

### Structure

- No MarketingPageTemplate wrapper
- Manual layout with direct components
- Custom order: Hero → Comparison → Features → Pricing → FAQ

### Component Hierarchy

```
div (min-h-screen bg-background)
├── SiteNavigation
├── HeroSection
├── ComparisonSection (early positioning)
├── FeaturesSection
├── PricingSection
├── FAQSection
└── Footer
```

---

## Key Components Used

1. **SiteNavigation** - Top navigation
2. **HeroSection** - Hero section
3. **ComparisonSection** - Competitive advantages (early!)
4. **FeaturesSection** - Features grid
5. **PricingSection** - Pricing cards
6. **FAQSection** - FAQ accordion
7. **Footer** - Footer component

---

## Typography Scale Observed

Expected terminal aesthetic (inherited from components):

- **Hero Title:** text-4xl+
- **Section Headers:** text-2xl to text-3xl
- **Body Text:** text-sm to text-base
- **Labels:** text-xs

---

## Spacing Patterns Observed

### Root Container

- `min-h-screen bg-background` - No explicit padding/spacing
- **No container wrapping** - Sections handle own width
- **No gap control** - Sections handle own vertical spacing

---

## Inconsistencies / Ad-Hoc Styles

### Major Issue: No Template

⚠️ **INCONSISTENT** - Doesn't use MarketingPageTemplate

- Manual layout increases maintenance burden
- Duplicates navigation/footer logic
- No overlay support (StickyCTABar, ExitIntentPopup)

### Potential Issues

⚠️ **No container wrapper** - Sections must self-contain
⚠️ **No standardized spacing** - Each section controls own gaps
⚠️ **Manual navigation** - Harder to update globally

---

## Design System Compliance

⚠️ **REVIEW** - Should use MarketingPageTemplate
✅ **PASS** - Uses approved component library
⚠️ **INCONSISTENT** - Manual layout vs template pattern

---

## Recommendations

### Option 1: Refactor to Template (RECOMMENDED)

```tsx
<MarketingPageTemplate
  hero={<HeroSection />}
  sections={[
    { id: "comparison", component: <ComparisonSection /> }, // Early positioning
    { id: "features", component: <FeaturesSection /> },
    { id: "pricing", component: <PricingSection /> },
    { id: "faq", component: <FAQSection /> },
  ]}
/>
```

### Option 2: Document as Intentional

If manual layout is intentional for A/B testing flexibility:

1. Document why template not used
2. Add comment explaining maintenance trade-off
3. Keep as alternative pattern for testing

---

## Related Files to Audit

All components already audited from main landing page:

- `src/components/navigation.tsx`
- `src/components/landing/hero-section.tsx`
- `src/components/landing/comparison-section.tsx`
- `src/components/landing/features-section.tsx`
- `src/components/landing/pricing-section.tsx`
- `src/components/landing/faq-section.tsx`
- `src/components/landing/footer.tsx`
