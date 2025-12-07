# Landing Page Audit - Marketing Pages

**Files:**

- `/src/app/pricing/page.tsx`
- `/src/app/about/page.tsx`
- `/src/app/contact/page.tsx`
- `/src/app/features/page.tsx`

**Template:** All use `MarketingPageTemplate`

---

## 1. Pricing Page

**File:** `/src/app/pricing/page.tsx`

### Structure

```tsx
<MarketingPageTemplate
  hero={<MarketingPageHeader {...} />}
  sections={[
    { id: "pricing", component: <PricingSection /> },
    { id: "faq", component: <FAQSection /> }
  ]}
/>
```

### MarketingPageHeader Props

- `code`: "0x00"
- `badge`: "COMMERCIAL_LICENSE"
- `title`: "Simple Transparent Pricing"
- `description`: "One time payment. Lifetime updates. No subscriptions."

### Layout Pattern

- Uses **MarketingPageHeader** component (from template file)
- 2 sections: Pricing + FAQ
- No custom hero, uses template header

### Typography

- Header applies: `text-xs font-mono` for badge, `text-3xl lg:text-4xl font-bold` for title
- Description: `text-sm font-mono text-muted-foreground`

### Spacing

- Header padding: `px-6 py-16 lg:py-20`
- Border: `border-b border-border`

---

## 2. About Page

**File:** `/src/app/about/page.tsx`

### Structure

```tsx
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
```

### Layout Pattern

- Custom hero component (AboutHero)
- 4 sections: Mission → Values → Story → Why Choose
- CTA at bottom before footer

### Component Locations

All in `/src/app/about/components/`:

- `about-hero.tsx`
- `mission-section.tsx`
- `values-section.tsx`
- `story-section.tsx`
- `why-choose-section.tsx`
- `about-cta.tsx`

### Client Component

- Uses `"use client"` directive (likely for animations)

---

## 3. Contact Page

**File:** `/src/app/contact/page.tsx`

### Structure

```tsx
<MarketingPageTemplate hero={<PageHeader />}>
  <ContactContent />
</MarketingPageTemplate>
```

### DIFFERENT PATTERN

- Uses `children` prop instead of `sections` array
- Custom ContactContent component wraps entire page

### ContactContent Layout

```tsx
<div className="container mx-auto max-w-7xl px-6 py-16">
  <div className="grid gap-8 lg:grid-cols-3">
    <div className="lg:col-span-2">
      <ContactForm />
    </div>
    <ContactSidebar />
  </div>
  <FaqSection />
</div>
```

### Layout Details

- Container: `max-w-7xl px-6 py-16`
- Grid: `lg:grid-cols-3` (2:1 ratio - form:sidebar)
- Gap: `gap-8`
- Form spans 2 columns on desktop

### Component Locations

All in `/src/app/contact/components/`:

- `page-header.tsx`
- `contact-form.tsx`
- `contact-sidebar.tsx`
- `faq-section.tsx`

---

## 4. Features Page

**File:** `/src/app/features/page.tsx`

### Structure

```tsx
<MarketingPageTemplate
  hero={<FeaturesHero />}
  sections={[
    { id: "stats", component: <StatsSection /> },
    { id: "category-nav", component: <CategoryNavigation /> },
    { id: "feature-categories", component: <FeatureCategoriesSection /> },
    { id: "tech-stack", component: <TechStackSection /> },
    { id: "quality", component: <QualitySection /> },
  ]}
  cta={<FeaturesCTA />}
/>
```

### Layout Pattern

- Custom hero (FeaturesHero)
- 5 sections with specific IDs
- CTA at bottom

### FeatureCategoriesSection

**Unique nested structure:**

```tsx
<section className="py-16 lg:py-24">
  <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
    <div className="space-y-24 lg:space-y-32">
      {FEATURE_CATEGORIES.map((category, index) => (
        <FeatureCategoryCard key={category.id} category={category} index={index} />
      ))}
    </div>
  </div>
</section>
```

### Spacing Observation

- **Large vertical gaps:** `space-y-24 lg:space-y-32` (96px to 128px!)
- **Section padding:** `py-16 lg:py-24` (standard)
- **Container padding:** `px-6 sm:px-8 lg:px-12` (progressive)

### Component Locations

All in `/src/app/features/components/`:

- `features-hero.tsx`
- `stats-section.tsx`
- `category-navigation.tsx`
- `feature-category-card.tsx`
- `tech-stack-section.tsx`
- `quality-section.tsx`
- `features-cta.tsx`
- `feature-data.tsx` (data constants)

---

## 5. Landing Alt Page

**File:** `/src/app/landing-alt/page.tsx`

### Structure

```tsx
<div className="bg-background min-h-screen">
  <SiteNavigation />
  <HeroSection />
  <ComparisonSection />
  <FeaturesSection />
  <PricingSection />
  <FAQSection />
  <Footer />
</div>
```

### CRITICAL DIFFERENCE

- **Does NOT use MarketingPageTemplate**
- Manual layout with individual section components
- No sections array, direct component rendering

### Purpose

- A/B testing alternative
- Shows ComparisonSection early (before features)
- Different section ordering than main page

### Inconsistency

- Uses different architecture pattern than other marketing pages
- No overlays (StickyCTABar, ExitIntentPopup)
- Manual navigation/footer vs template

---

## Template Usage Comparison

| Page            | Template | Hero Type       | Sections Count | CTA | Children Pattern  |
| --------------- | -------- | --------------- | -------------- | --- | ----------------- |
| **Main**        | ✓        | Custom          | 6              | ✗   | ✗                 |
| **Pricing**     | ✓        | Template Header | 2              | ✗   | ✗                 |
| **About**       | ✓        | Custom          | 4              | ✓   | ✗                 |
| **Contact**     | ✓        | Custom          | 0              | ✗   | ✓ (custom layout) |
| **Features**    | ✓        | Custom          | 5              | ✓   | ✗                 |
| **Landing Alt** | ✗        | Custom          | 5              | ✗   | ✗                 |

---

## Design Patterns Observed

### Container Widths

- **Standard:** `max-w-7xl` (all pages)
- **Pricing header:** `max-w-4xl` (narrower for readability)

### Padding Patterns

1. **Simple:** `px-6 py-16` (contact)
2. **Progressive:** `px-6 sm:px-8 lg:px-12` (features)
3. **Header:** `px-6 py-16 lg:py-20` (pricing, template header)

### Grid Layouts

1. **Contact:** `lg:grid-cols-3` (2:1 form/sidebar)
2. **Features:** Custom nested sections
3. **About:** Section-by-section (no grid wrapper)

### Spacing Scale

- **Small gaps:** `gap-4`, `gap-8` (16px, 32px)
- **Section spacing:** `py-16 lg:py-24` (64px to 96px)
- **Feature categories:** `space-y-24 lg:space-y-32` (96px to 128px) - LARGEST

---

## Typography Hierarchy

### Page Headers (MarketingPageHeader)

- Badge: `text-xs font-mono text-muted-foreground`
- Title: `text-3xl lg:text-4xl font-bold tracking-tight font-mono`
- Description: `text-sm font-mono text-muted-foreground`

### Section Headers (observed pattern)

- Section code: `text-xs font-mono`
- Section title: `text-2xl font-bold font-mono`
- Section description: `text-sm font-mono text-muted-foreground`

---

## Color Usage

### All Pages: 100% Semantic Tokens ✓

- `bg-background`, `bg-card`, `bg-muted/30`
- `text-foreground`, `text-muted-foreground`, `text-primary`
- `border-border`

**No hardcoded colors found** ✓

---

## Animation Patterns

### Framer Motion Usage

- All pages use `"use client"` for animations (except pricing)
- Pattern: `initial/animate` with `viewport={{ once: true }}`
- Stagger delays: 0.1s to 0.4s steps

### Pricing Exception

- No client directive
- No animations observed
- Static header component

---

## Inconsistencies & Issues

### 1. Template Usage Inconsistency

- **Landing Alt** doesn't use MarketingPageTemplate
- **Contact** uses children pattern instead of sections array
- Other pages use sections array consistently

### 2. Padding Inconsistency

- Simple `px-6` vs progressive `px-6 sm:px-8 lg:px-12`
- No standard pattern emerges

### 3. Section Spacing Variance

- Standard: `py-16 lg:py-24`
- Header: `py-16 lg:py-20`
- Feature categories: `space-y-24 lg:space-y-32`

### 4. Client/Server Split

- Most pages: `"use client"` for animations
- Pricing: Server component (no animations)
- Inconsistent approach to animation requirements

---

## Recommendations

### 1. Standardize Template Usage

- Migrate Landing Alt to MarketingPageTemplate
- Document when to use sections vs children pattern

### 2. Establish Padding Standards

- Choose one progressive padding pattern
- Apply consistently across all containers

### 3. Section Spacing Guidelines

- Define standard section spacing
- Document when to use larger gaps (96px+)

### 4. Animation Strategy

- Define which pages need animations
- Consider performance impact of "use client" everywhere

---

## Next Steps

1. Audit individual section components (hero, cta, etc.)
2. Document all component file structures
3. Create spacing/padding consistency matrix
4. Analyze blog and legal pages for additional patterns
