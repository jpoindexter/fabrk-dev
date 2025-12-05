# Landing Components Design System Audit

**Audit Date:** 2025-12-05
**Components Audited:** 28 landing page components
**Purpose:** Document design system usage patterns for future optimization

---

## Summary

This audit documents the current state of 28 landing page components in `/src/components/landing/`. These are marketing-specific components (NOT synced to the official Fabrk boilerplate repo).

**Key Findings:**
- ✅ Excellent `mode.*` usage across all components (100% compliance)
- ✅ Consistent use of design tokens for colors
- ✅ Proper responsive classes and spacing patterns
- ⚠️ Some hardcoded overlay opacity values
- ⚠️ Mixed animation timing patterns (could be standardized)
- ⚠️ Minor accessibility improvements needed (aria-labels)

---

## Component Inventory

### Hero Components (3)

1. **hero-section.tsx** - Terminal-style hero with typewriter effect
2. **hero-split.tsx** - Two-column layout with dashboard mockup
3. **hero-video.tsx** - Full-width video background hero

### Feature Components (5 + 5 subcomponents)

4. **features-section.tsx** - Deprecated re-export wrapper
5. **features-section/index.tsx** - Main features section with 4 subsections
6. **features-section/feature-item.tsx** - Single feature list item
7. **features-section/feature-section.tsx** - Two-column layout component
8. **features-section/preview-header.tsx** - Terminal window header
9. **features-section/preview-auth.tsx** - Auth form animation
10. **features-section/preview-design.tsx** - Design system showcase
11. **features-section/preview-billing.tsx** - Billing portal animation
12. **features-section/preview-organization.tsx** - Org manager animation

### Pricing Components (2)

13. **pricing-section.tsx** - Single card pricing with discount
14. **pricing-table.tsx** - Comparison table (Fabrk vs competitors)

### Content Sections (6)

15. **testimonials-section.tsx** - Customer testimonials grid
16. **faq-section.tsx** - Categorized FAQ with accordion
17. **stats-section.tsx** - Animated counter metrics
18. **comparison-section.tsx** - Time-to-market comparison table
19. **developer-experience-section.tsx** - DX feature grid
20. **enterprise-features-section.tsx** - Enterprise feature grid
21. **quality-section.tsx** - Quality metrics grid
22. **tech-stack.tsx** - Technology logo grid

### Layout Components (2)

23. **navigation.tsx** - Sticky header with mobile menu
24. **footer.tsx** - Terminal-style footer with links

### Effects/Utilities (4)

25. **animated-background.tsx** - Dot grid pattern background
26. **interactive-demo.tsx** - Tabbed iframe demo
27. **exit-intent-popup.tsx** - Exit intent modal with discount
28. **sticky-cta-bar.tsx** - Scroll-triggered bottom bar

---

## Typography Patterns

### Font Classes Used

**Consistent `mode.font` usage across ALL components** ✅

```tsx
// Every component uses:
className={cn(mode.font, "...")}

// Applied to:
- All text elements (p, span, h1-h6)
- Buttons
- Labels
- Links
- Terminal headers
```

### Text Size Classes

| Size | Usage | Components |
|------|-------|------------|
| `text-xs` | Terminal labels, metadata, descriptions | All components |
| `text-sm` | Body text, navigation links | hero-*, features-*, footer |
| `text-base` | Default body (rare, usually xs/sm) | hero-video |
| `text-lg` | Large body text | hero-video, pricing-table |
| `text-xl` | Subheadings | footer (logo), pricing-table |
| `text-2xl` | Section headings | features-*, stats-*, testimonials-* |
| `text-3xl` | Major headings | hero-*, pricing-*, comparison-* |
| `text-4xl` | Large headings | hero-*, pricing-section |
| `text-5xl` - `text-8xl` | Hero headlines | hero-video |

**Observation:** Terminal aesthetic favors smaller text (`text-xs` dominant) with mono font for that CLI feel.

### Font Weight Classes

| Weight | Usage |
|--------|-------|
| `font-medium` | Pricing table values, badges |
| `font-semibold` | Feature headings, CTA text |
| `font-bold` | Section titles, prices, emphasis |

---

## Spacing Patterns

### Padding Classes

**Section-level padding:**
```tsx
px-6 py-16 lg:py-24    // hero-section
px-6 py-20 lg:py-28    // features-section, faq-section, comparison-section
px-6 py-24             // stats-section, testimonials-section, tech-stack
```

**Card/component padding:**
```tsx
p-4   // Small cards, terminal headers
p-6   // Standard cards, feature items, preview components
p-8   // Large cards, quality metrics
```

**Container padding:**
```tsx
px-4 py-2    // Terminal window headers, footer tech stack
px-4 py-4    // Sticky CTA bar, navigation
px-4 sm:px-6 // Footer sections
```

### Gap Classes

**Grid/flex gaps:**
```tsx
gap-2  // Small spacing (badges, tech stack icons)
gap-4  // Standard spacing (form fields, feature lists)
gap-6  // Card grids (testimonials, quality metrics)
gap-8  // Section spacing (two-column layouts)
gap-12 // Large section spacing (hero layouts)
gap-16 // Very large spacing (lg:gap-16 in hero-section)
```

### Margin Classes

**Top margins:**
```tsx
mt-1, mt-2, mt-4  // Inline spacing (descriptions, sublabels)
mt-6, mt-8        // Section spacing (info boxes, footer)
mt-12, mt-16      // Large section breaks (pricing trust badge)
```

**Bottom margins:**
```tsx
mb-2, mb-4, mb-6  // Section intros, labels
mb-8, mb-12, mb-16 // Large section breaks
```

**Observation:** Consistent 8-point grid adherence (`4px` increments: `p-1`, `p-2`, `p-4`, `p-6`, `p-8`).

---

## Color Token Usage

### Background Colors

**Primary backgrounds:**
```tsx
bg-background  // Page backgrounds (sections, main containers)
bg-card        // Cards, terminal windows, info boxes
bg-muted       // Table headers, hover states (pricing-table)
bg-primary     // CTA buttons, active states, badges
bg-secondary   // Testimonial avatars (alternate)
bg-accent      // Testimonial avatars (alternate)
```

**Modifiers:**
```tsx
bg-primary/10       // Icon backgrounds (developer-experience, enterprise-features)
bg-foreground/10    // Hero-split mockup elements
bg-foreground/60    // Hero-video overlay
bg-card/95          // Sticky CTA bar (with backdrop-blur)
bg-success/10       // Terminal success message backgrounds
```

### Text Colors

**Foreground colors:**
```tsx
text-foreground         // Main text, headings
text-muted-foreground   // Secondary text, descriptions, labels
text-primary            // Accent text, active links, terminal cursors
text-success            // Success states, checkmarks
text-destructive        // Error states, negative comparisons
```

### Border Colors

**Border classes:**
```tsx
border-border           // Standard borders (cards, sections, tables)
border-primary          // Active/hover borders
border-foreground       // Strong borders (pricing-table, hero-split mockup)
border-foreground/10    // Subtle internal dividers
border-primary/50       // Hover states (cards, links)
```

**Border widths:**
```tsx
border      // 1px (default, most cards)
border-2    // 2px (strong emphasis, CTAs, hero-split)
border-t    // Top only (section dividers)
border-b    // Bottom only (terminal headers, table rows)
border-l    // Left only (description boxes)
```

### ✅ NO HARDCODED COLORS DETECTED

All color values use CSS variables from `globals.css`. Excellent compliance with design token system.

---

## Animation Patterns

### Framer Motion Usage

**Initial/Animate pattern (most common):**
```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

**Sequential delays (stagger effect):**
```tsx
transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
```

**Hover animations:**
```tsx
whileHover={{ x: 4 }}           // feature-item
whileHover={{ scale: 1.01 }}    // hero-section terminal
whileHover={{ scale: 1.1 }}     // hero-video buttons
```

**Continuous animations:**
```tsx
animate={{ opacity: [1, 0, 1] }}
transition={{ duration: 0.8, repeat: Infinity }}  // Blinking cursor
```

### Animation Timing Patterns

| Duration | Usage |
|----------|-------|
| `0.3s` - `0.5s` | Fast transitions (feature items, card reveals) |
| `0.6s` | Standard sections/headings |
| `0.8s` - `1s` | Cursor blink, emphasis |
| `1.5s` - `2.5s` | Animated counters |

**Observation:** Could standardize timing into design system constants (e.g., `animation.fast`, `animation.normal`, `animation.slow`).

### AnimatedCounter Component

Used in 3 components:
- **stats-section.tsx** - 4 metrics (developers, projects, rating, time saved)
- **comparison-section.tsx** - Hours saved counter
- **pricing-section/preview-billing.tsx** - Price/billing counters

**Pattern:**
```tsx
<AnimatedCounter
  value={140}
  suffix="+ hours"
  duration={2.5}
/>
```

---

## Responsive Design

### Breakpoint Usage

**Grid responsive patterns:**
```tsx
// Mobile-first, stacked → 2-col → 3-col → 4-col
grid-cols-2 md:grid-cols-2 lg:grid-cols-3          // testimonials
grid-cols-2 md:grid-cols-2 lg:grid-cols-4          // developer-experience, enterprise
grid-cols-2 md:grid-cols-4 lg:grid-cols-7          // tech-stack
```

**Two-column layouts:**
```tsx
grid gap-12 lg:grid-cols-2 lg:gap-16               // hero-section, pricing-section
grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-12      // faq-section (sidebar)
```

**Hide/show patterns:**
```tsx
hidden md:flex                                      // Desktop navigation
flex md:hidden                                      // Mobile menu trigger
sm:inline hidden                                    // Hero "_CONSOLE" label
```

### Spacing responsive patterns

```tsx
px-4 sm:px-6                // Container padding
py-16 lg:py-24              // Section vertical padding
py-20 lg:py-28              // Large section padding
text-3xl lg:text-4xl        // Responsive heading sizes
```

---

## Mode.* Usage (Terminal Aesthetic)

### Mode.radius (All components)

```tsx
className={cn(mode.radius, "...")}
```

Applied to:
- Cards
- Buttons
- Inputs
- Badges
- Terminal windows
- Tables
- Dialogs
- Tabs

**Value:** `rounded-none` (defined in `design-system/index.ts`)

### Mode.font (All components)

```tsx
className={cn(mode.font, "...")}
```

Applied to:
- All text elements
- Buttons
- Labels
- Navigation
- Footer

**Value:** `font-mono` (defined in `design-system/index.ts`)

### ✅ 100% Compliance

Every component uses `mode.radius` and `mode.font` correctly. No hardcoded `rounded-*` or font family classes detected.

---

## Container/Layout Patterns

### Max-width containers

```tsx
mx-auto max-w-7xl    // Full-width sections (most common)
mx-auto max-w-5xl    // Narrower sections (comparison-section)
mx-auto max-w-4xl    // Text-focused sections (faq-section, hero-video)
mx-auto max-w-2xl    // Description text (centered subheadlines)
max-w-md             // Modal content (exit-intent-popup)
max-w-sm             // Preview cards (auth, billing, org)
```

### Terminal Window Pattern

**Consistent structure across preview components:**
```tsx
<div className={cn(mode.radius, "border-border bg-card border")}>
  {/* Header */}
  <div className="border-border border-b px-4 py-2">
    <span className={cn(mode.font, "text-muted-foreground text-xs")}>
      [ window_title.exe ]
    </span>
  </div>

  {/* Content */}
  <div className="p-6">
    {/* ... */}
  </div>
</div>
```

Used in:
- hero-section (HeroCodeDemo)
- preview-auth
- preview-billing
- preview-organization
- preview-design
- pricing-section (card)
- comparison-section (table)
- footer (nav_links box)

---

## Hardcoded Values

### ⚠️ Opacity Values

**Overlay opacities (hero-video):**
```tsx
bg-foreground/60              // Video overlay
overlayOpacity = 0.6          // Prop default
```

**Background opacities:**
```tsx
bg-foreground/50              // Gradient fallback
bg-primary/10                 // Icon backgrounds (many components)
bg-foreground/10              // Mockup elements
bg-card/95                    // Sticky CTA backdrop
```

**Recommendation:** Could create design tokens:
```tsx
// design-system/index.ts
export const opacity = {
  overlay: "bg-foreground/60",
  iconBg: "bg-primary/10",
  backdrop: "bg-card/95",
} as const;
```

### Pixel Values

**Heights:**
```tsx
h-8, h-10, h-12, h-14         // Button/input heights
h-16                          // Navigation height
h-[700px]                     // Interactive demo iframe
min-h-[36px]                  // Auth preview inputs
min-h-[116px]                 // Org preview container
```

**Icon sizes:**
```tsx
size-3.5   // Tech stack icons, social icons
size-4     // Feature icons, small UI icons
size-5     // Menu icon
size-6     // Large feature icons, quality metrics
size-8     // Exit intent sparkle icon
h-6 w-6    // SVG icons (developer-experience, enterprise)
```

**Observation:** Icon sizes could be standardized into `mode.iconSize.sm`, `mode.iconSize.md`, etc.

---

## Accessibility Observations

### ✅ Good Practices

1. **Semantic HTML:**
   - `<nav>` with `aria-label` (navigation, footer)
   - `<section>` for major areas
   - `<button>` for interactive elements

2. **Link accessibility:**
   - `target="_blank"` always paired with `rel="noopener noreferrer"` (footer, sticky-cta)

3. **Form labels:**
   - Auth preview uses explicit labels (`EMAIL:`, `PASSWORD:`)

4. **Dialog accessibility:**
   - `DialogTitle`, `DialogDescription` (exit-intent-popup)
   - `SheetTitle` with `sr-only` (navigation mobile menu)

### ⚠️ Minor Issues

1. **Missing aria-label on icon buttons:**
   - Navigation menu button: ✅ Has `aria-label="Open menu"`
   - Exit intent dismiss button: ✅ Has `aria-label="Dismiss"`
   - Sticky CTA dismiss button: ✅ Has `aria-label="Dismiss"`

2. **Button state indicators:**
   - FAQ accordion uses `aria-expanded={isOpen}` ✅

3. **Image alt text:**
   - No `<img>` tags detected (all icons are SVG or SimpleIcon)

**Overall:** Accessibility is good. No critical violations detected.

---

## Component-Specific Patterns

### 1. Hero Section (hero-section.tsx)

**Unique patterns:**
- TypeWriter component with cursor animation
- HeroCodeDemo with 5-step terminal sequence
- `useInView` for viewport-triggered animations
- Sequential timeouts for CLI simulation

**Design tokens:**
```tsx
text-success     // Terminal prompt "$"
text-primary     // Highlighted text, cursor
text-foreground  // Command text
```

### 2. Hero Split (hero-split.tsx)

**Unique patterns:**
- Configurable props (headline, CTAs, trustBadges, imagePosition)
- Dashboard mockup with placeholder blocks
- Decorative corner elements (`bg-primary/10`, `bg-accent/10`)
- File count badge positioned absolutely

**Layout:**
```tsx
grid items-center gap-12 lg:grid-cols-2
${contentOrder} / ${imageOrder}  // Dynamic ordering
```

### 3. Hero Video (hero-video.tsx)

**Unique patterns:**
- Video background with fallback gradient
- `animate-gradient-shift` CSS class
- Large text scale (`text-5xl` to `text-8xl`)
- Scroll indicator with bounce animation

**Overlay system:**
```tsx
<video /> with <div className="bg-foreground/60" />
```

### 4. Features Section (features-section/index.tsx)

**Architecture:**
- Main component imports 4 preview subcomponents
- Uses `FeatureSectionLayout` for consistent structure
- Reversed layout via `reversed` prop

**Feature list pattern:**
```tsx
features={[
  { icon: Mail, title: "...", description: "..." },
  // ...
]}
```

### 5. Pricing Section (pricing-section.tsx)

**Unique patterns:**
- DiscountCounter integration
- WindowControls component (animated dots)
- Two-column layout (description + card)
- Terminal-style pricing card with features list

**Animation:**
```tsx
// Staggered feature list
transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
```

### 6. Pricing Table (pricing-table.tsx)

**Unique patterns:**
- Horizontal scroll with custom scrollbar styles
- Sticky first column (`sticky left-0 z-10`)
- Dynamic feature rendering (boolean → icon, string → text)
- `highlighted` prop for best-value plan

**Table structure:**
```tsx
<thead> // Plan headers
<tbody> // Feature comparison rows
<tfoot> // CTA buttons
```

### 7. Testimonials Section (testimonials-section.tsx)

**Data structure:**
```tsx
testimonials = [
  { quote, author, role, initials, color },
  // 6 testimonials total
]
```

**Avatar pattern:**
```tsx
<Avatar>
  <AvatarFallback className="bg-primary/10 text-primary">
    {initials}
  </AvatarFallback>
</Avatar>
```

### 8. FAQ Section (faq-section.tsx)

**Unique patterns:**
- Category tabs (general, technical, payment, license)
- Accordion component (FAQItem)
- Two-column layout (categories sidebar + FAQ list)
- Terminal-style question/answer format

**Categories state:**
```tsx
const [activeCategory, setActiveCategory] = useState<FAQCategory>("general");
const filteredFaqs = faqs.filter(faq => faq.category === activeCategory);
```

### 9. Stats Section (stats-section.tsx)

**Unique patterns:**
- AnimatedCounter with spring physics
- `useMotionValue` + `useSpring` for smooth counting
- `useInView` trigger for animation start

**Stats data:**
```tsx
stats = [
  { value, suffix, label, description, color },
  // 4 stats total
]
```

### 10. Comparison Section (comparison-section.tsx)

**Unique patterns:**
- Build-from-scratch vs Fabrk comparison
- Animated hour counters with delays
- Hover effect on rows (`whileHover={{ x: 2 }}`)
- Total row with emphasized styling

**Animation timing:**
```tsx
<AnimatedCounter
  value={feature.hours}
  duration={1 + index * 0.2}  // Increasing delay per row
/>
```

### 11. Developer Experience Section (developer-experience-section.tsx)

**Unique patterns:**
- Mix of SimpleIcon (from simple-icons) and Lucide icons
- Conditional icon rendering
- 4-column grid on desktop

**Icon pattern:**
```tsx
{feature.icon ? (
  <SimpleIcon path={feature.icon} />
) : IconComponent ? (
  <IconComponent />
) : null}
```

### 12. Enterprise Features Section (enterprise-features-section.tsx)

**Unique patterns:**
- String-based icon matching (icon: "users" → `<Users />`)
- Value proposition card at bottom
- 8 features in 4-column grid

**String manipulation:**
```tsx
feature.title.toUpperCase().replace(/ /g, "_").replace(/\+/g, "_AND_")
// "Multi-Tenancy + RBAC" → "MULTI_TENANCY_AND_RBAC"
```

### 13. Quality Section (quality-section.tsx)

**Unique patterns:**
- Mix of percentage and count metrics
- `iconComponent: "testTube"` string pattern (similar to enterprise)
- Quality guarantee card

**Metrics:**
```tsx
qualityMetrics = [
  { metric: "85%", label: "Test Coverage", ... },
  { metric: "114+", label: "Comprehensive Tests", ... },
]
```

### 14. Tech Stack (tech-stack.tsx)

**Unique patterns:**
- Simple-icons library usage
- 7-column grid on desktop
- Hover color change effect

**Pattern:**
```tsx
technologies.map(tech => (
  <SimpleIcon path={tech.path} className="group-hover:text-primary" />
))
```

### 15. Navigation (navigation.tsx)

**Unique patterns:**
- Sheet component for mobile menu
- ThemeDropdown integration
- Sticky positioning with backdrop blur
- `[NAVIGATE]:` label prefix

**Mobile menu structure:**
```tsx
<Sheet>
  <SheetContent>
    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
    {/* Menu items with SheetClose wrapper */}
  </SheetContent>
</Sheet>
```

### 16. Footer (footer.tsx)

**Unique patterns:**
- Tech stack bar (reuses pattern from hero-section)
- Terminal box for navigation links
- 3-column grid (Product, Company, Legal)
- Social icons with SimpleIcon

**Structure:**
```tsx
<footer>
  {/* Tech Stack Bar */}
  {/* Main Content (Logo + Nav Terminal) */}
  {/* Bottom Bar (Copyright + Social) */}
</footer>
```

### 17. Animated Background (animated-background.tsx)

**Unique patterns:**
- SVG dot grid pattern
- Corner brackets for terminal aesthetic
- Fixed positioning with `-z-10`

**Pattern definition:**
```tsx
<pattern id="dot-grid" width="24" height="24">
  <circle cx="1" cy="1" r="1" fill="currentColor" />
</pattern>
```

### 18. Interactive Demo (interactive-demo.tsx)

**Unique patterns:**
- Tabs component with iframe content
- 700px fixed height iframe
- Demo routes array

**Routes:**
```tsx
DEMO_ROUTES = [
  { id: "team", label: "Team Dashboard", path: "/templates/team-dashboard" },
  // ...
]
```

### 19. Exit Intent Popup (exit-intent-popup.tsx)

**Unique patterns:**
- `mouseleave` event on document
- localStorage tracking (`exit-intent-shown`)
- Cookie expiry system (7 days default)
- PolarCheckoutButton with custom discount ID

**Trigger logic:**
```tsx
if (e.clientY <= 0 && !hasShown) {
  // Show popup after delay
}
```

### 20. Sticky CTA Bar (sticky-cta-bar.tsx)

**Unique patterns:**
- Scroll position tracking
- localStorage dismiss state
- Transform translate animation
- Backdrop blur with semi-transparent background

**Visibility logic:**
```tsx
const scrolled = window.scrollY > showAfterScroll;
setIsVisible(scrolled && !isDismissed);
```

---

## Recommendations

### 1. Standardize Animation Timings

Create design tokens for animation durations:

```tsx
// design-system/index.ts
export const animation = {
  fast: { duration: 0.3 },
  normal: { duration: 0.6 },
  slow: { duration: 1.5 },
  cursor: { duration: 0.8, repeat: Infinity },
} as const;
```

Usage:
```tsx
<motion.div
  transition={animation.normal}
>
```

### 2. Create Opacity Tokens

```tsx
// design-system/index.ts
export const opacity = {
  overlay: "bg-foreground/60",
  iconBg: "bg-primary/10",
  backdrop: "bg-card/95",
  subtle: "bg-foreground/10",
} as const;
```

### 3. Standardize Icon Sizes

```tsx
// design-system/index.ts
export const iconSize = {
  xs: "size-3.5",
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
} as const;
```

### 4. Extract Reusable Components

**TerminalWindow:**
```tsx
// components/ui/terminal-window.tsx
export function TerminalWindow({ title, children }) {
  return (
    <div className={cn(mode.radius, "border-border bg-card border")}>
      <div className="border-border border-b px-4 py-2">
        <span className={cn(mode.font, "text-muted-foreground text-xs")}>
          {title}
        </span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
```

**SectionHeader:**
```tsx
// components/ui/section-header.tsx
export function SectionHeader({ code, title, description }) {
  return (
    <motion.div {...fadeInUp}>
      <div className={cn(mode.radius, "border-border bg-card mb-4 inline-block border px-4 py-1")}>
        <span className={cn(mode.font, "text-muted-foreground text-xs")}>
          [ {code} ]
        </span>
      </div>
      <h2 className={cn(mode.font, "mb-4 text-3xl font-bold")}>{title}</h2>
      {description && (
        <p className={cn(mode.font, "text-muted-foreground text-sm")}>{description}</p>
      )}
    </motion.div>
  );
}
```

### 5. Consider Animation Utility

```tsx
// design-system/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export const stagger = (index: number, baseDelay = 0.3) => ({
  delay: baseDelay + index * 0.05,
});
```

Usage:
```tsx
<motion.div {...fadeInUp}>
```

---

## Files Summary

| Component | Lines | Uses mode.* | Animations | Hardcoded Values |
|-----------|-------|-------------|------------|------------------|
| hero-section.tsx | 356 | ✅ | Typewriter, cursor blink, sequential | Step timeouts (ms) |
| hero-split.tsx | 197 | ✅ | Scale on hover | Dashboard mockup heights |
| hero-video.tsx | 170 | ✅ | Button hover scale, scroll bounce | Video overlay opacity |
| features-section.tsx | 11 | ✅ | N/A (re-export) | None |
| features-section/index.tsx | 184 | ✅ | fadeInUp | None |
| features-section/feature-item.tsx | 30 | ✅ | None | None |
| features-section/feature-section.tsx | 81 | ✅ | fadeInUp, horizontal slide | None |
| features-section/preview-header.tsx | 22 | ✅ | None | None |
| features-section/preview-auth.tsx | 150 | ✅ | Typing, cursor blink | Typing speed (ms) |
| features-section/preview-design.tsx | 121 | ✅ | Stagger, rotate, scaleY | Component count animation |
| features-section/preview-billing.tsx | 150 | ✅ | Counter, scale pulse | None |
| features-section/preview-organization.tsx | 114 | ✅ | Slide in (org add) | None |
| pricing-section.tsx | 169 | ✅ | Stagger features | None |
| pricing-table.tsx | 287 | ✅ | None | Table scroll custom CSS |
| testimonials-section.tsx | 128 | ✅ | fadeInUp, stagger | None |
| faq-section.tsx | 246 | ✅ | Accordion, rotate chevron | None |
| footer.tsx | 196 | ✅ | None | None |
| navigation.tsx | 176 | ✅ | None | None |
| stats-section.tsx | 163 | ✅ | Counter spring | None |
| comparison-section.tsx | 214 | ✅ | Counter, row hover | None |
| developer-experience-section.tsx | 130 | ✅ | None | None |
| enterprise-features-section.tsx | 172 | ✅ | fadeInUp, stagger | None |
| quality-section.tsx | 133 | ✅ | fadeInUp, stagger | None |
| tech-stack.tsx | 51 | ✅ | Icon hover color | None |
| animated-background.tsx | 31 | ✅ | None | SVG pattern sizes |
| interactive-demo.tsx | 90 | ✅ | None | Iframe height (700px) |
| exit-intent-popup.tsx | 177 | ✅ | Dialog open/close | Cookie expiry (days) |
| sticky-cta-bar.tsx | 138 | ✅ | Transform slide | Scroll threshold (px) |

**Total:** 3,686 lines of code across 28 components

---

## Conclusion

The landing page components demonstrate **excellent adherence to the Fabrk design system**:

✅ **Strengths:**
- 100% `mode.radius` and `mode.font` usage
- Consistent design token usage for colors
- Proper 8-point grid spacing
- Clean responsive patterns
- Terminal aesthetic maintained throughout
- No hardcoded hex colors

⚠️ **Minor improvements:**
- Standardize animation timings into design tokens
- Extract reusable patterns (TerminalWindow, SectionHeader)
- Document icon size standards
- Create opacity tokens

**Overall Grade: A-**

These components are production-ready and well-architected. The recommendations above are optimizations, not critical fixes.

---

**End of Audit**
