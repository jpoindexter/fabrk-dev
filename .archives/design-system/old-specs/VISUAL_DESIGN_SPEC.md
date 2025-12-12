# FABRK VISUAL DESIGN SPECIFICATION
## Marketing Site Design System & Implementation Guide

**Version:** 2.0 — Post-Messaging Overhaul
**Date:** December 11, 2025
**Scope:** Landing page & marketing site visual design
**Status:** Ready for Implementation

---

## 🔥 EXECUTIVE SUMMARY

**Current State:** Functional but visually weak. Terminal aesthetic exists but isn't fully leveraged. Layout is cramped. Hierarchy is unclear. Brand lacks visual confidence.

**Goal:** Transform Fabrk's marketing site into a **visually impactful, confidence-inspiring showcase** of a production-grade SaaS boilerplate while maintaining the unique terminal aesthetic.

**Key Principle:** **"Terminal, but Premium"** — Embrace the monospace, sharp-edged, console aesthetic while maintaining professional polish and visual hierarchy.

---

## 1. VISUAL AUDIT — CURRENT PROBLEMS

### 🚨 Critical Issues

**A. Weak Visual Hierarchy**
- Headlines and body text feel similar in weight
- No clear "what to look at first" in hero section
- Feature cards lack visual distinction from surrounding content
- CTAs don't stand out enough — they blend into the noise

**B. Cramped Layout**
- Sections feel squeezed together
- Insufficient breathing room around important elements
- Cards packed too tightly in grids
- Mobile spacing even tighter — feels claustrophobic

**C. Inconsistent Terminal Aesthetic**
- Some elements use terminal styling (brackets, monospace)
- Others feel generic (rounded corners sneaking in, soft shadows)
- Not committed enough to the aesthetic — feels half-baked
- Missing opportunity for stronger brand differentiation

**D. Color Usage Lacks Confidence**
- Accent colors used timidly
- Backgrounds all feel the same shade
- No visual separation between sections
- CTAs don't pop — need more contrast

**E. Component Inconsistency**
- Different card styles across sections (some with headers, some without)
- Button styles vary (some with arrows, some without)
- Badge/label treatments inconsistent
- No clear component hierarchy system

**F. Typography Lacks Impact**
- Headlines too small for their importance
- Line lengths too long (hurts readability)
- Insufficient contrast between heading weights
- Body text feels monotonous (same size everywhere)

---

## 2. VISUAL LANGUAGE — DESIGN SYSTEM

### 🎨 COLOR SYSTEM

**Philosophy:** **Achromatic terminal with strategic accent pops**

#### Primary Palette

```
Terminal Canvas (Background Tones)
├── bg-canvas:     hsl(0 0% 3%)      — Page background (dark)
├── bg-surface:    hsl(0 0% 7%)      — Card/section backgrounds
├── bg-elevated:   hsl(0 0% 10%)     — Hover states, modals
└── bg-muted:      hsl(0 0% 14%)     — Disabled, placeholders

Terminal Foreground (Text Tones)
├── text-primary:   hsl(0 0% 98%)    — Headlines, important text
├── text-secondary: hsl(0 0% 80%)    — Body text, descriptions
├── text-muted:     hsl(0 0% 50%)    — Labels, meta info
└── text-disabled:  hsl(0 0% 30%)    — Disabled states

Terminal Accent (Brand Pops)
├── accent-primary:   hsl(280 100% 70%)  — Primary CTAs, links (purple/magenta)
├── accent-success:   hsl(142 76% 45%)   — Success states, checkmarks (terminal green)
├── accent-warning:   hsl(38 92% 50%)    — Warnings, limited offers (amber)
└── accent-danger:    hsl(0 84% 60%)     — Errors, destructive actions (terminal red)

Terminal Borders
├── border-default:  hsl(0 0% 20%)   — Default borders
├── border-strong:   hsl(0 0% 30%)   — Emphasized borders
└── border-accent:   hsl(280 100% 70%)  — Accent borders (use sparingly)
```

#### Usage Rules

1. **Canvas** — Use `bg-canvas` for page background. Never white.
2. **Cards** — Use `bg-surface` for all card backgrounds. Consistent elevation.
3. **Text Hierarchy** —
   - H1/H2: `text-primary` (98% white)
   - Body: `text-secondary` (80% white)
   - Labels/Meta: `text-muted` (50% white)
4. **Accent Color** — Reserve for:
   - Primary CTAs (buttons)
   - Active states (nav, tabs)
   - Small highlights (badges, progress)
   - **Never** use for large backgrounds or body text
5. **Success/Warning** — Use terminal green/amber only for:
   - Status indicators
   - Validation states
   - Small badges (e.g., "20% OFF")

---

### 📐 TYPOGRAPHY SYSTEM

**Philosophy:** **Monospace hierarchy through size, weight, and spacing**

#### Font Stack

```css
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
--font-display: 'JetBrains Mono', monospace; /* Same, but can be different weight */
```

#### Type Scale

```
Display (Hero Headlines)
├── H1 Display:  64px / 1.1   / 700 (Bold)       — Hero headline only
└── H1 Large:    48px / 1.2   / 600 (Semibold)  — Section hero

Headings
├── H2:          32px / 1.3   / 600 (Semibold)  — Section headers
├── H3:          24px / 1.4   / 600 (Semibold)  — Card headers
└── H4:          18px / 1.4   / 600 (Semibold)  — Subheadings

Body Text
├── Body Large:  16px / 1.6   / 400 (Regular)   — Hero subheadline, important paragraphs
├── Body:        14px / 1.6   / 400 (Regular)   — Default body text
└── Body Small:  12px / 1.5   / 400 (Regular)   — Captions, meta info

Labels & Meta
├── Label:       12px / 1.4   / 500 (Medium)    — All caps labels (e.g., [SYSTEM INIT])
└── Code:        14px / 1.4   / 400 (Regular)   — Inline code, terminal output
```

#### Typography Rules

1. **Monospace Everything** — No exceptions. Body tag has `font-mono` class.
2. **Line Length** —
   - Headlines: Max 12-14 words (60-70 characters)
   - Body: Max 75 characters per line
   - Use narrower content containers (prose, max-w-3xl)
3. **Weight Hierarchy** —
   - Headlines: 600-700 weight
   - Body: 400 weight
   - Labels: 500 weight (medium)
4. **All-Caps Labels** — Use for:
   - Section badges (e.g., `[0x10] FEATURES`)
   - Terminal prompts (e.g., `> GET STARTED`)
   - Status badges (e.g., `[ACTIVE]`)
5. **Never Use Italic** — Looks wrong in monospace. Use color/weight instead.

---

### 📏 SPACING & GRID SYSTEM

**Philosophy:** **8-point grid with generous breathing room**

#### Vertical Rhythm

```
Section Spacing (Between major sections)
├── py-20 (80px)   — Standard section padding
├── py-24 (96px)   — Emphasized sections (hero, pricing)
└── py-16 (64px)   — Compact sections (stats bar)

Card Spacing (Inside cards/containers)
├── p-8 (32px)     — Large cards (feature cards)
├── p-6 (24px)     — Medium cards (testimonials)
└── p-4 (16px)     — Small cards (stat cards)

Element Spacing (Between elements)
├── gap-8 (32px)   — Between major elements (cards in grid)
├── gap-6 (24px)   — Between related elements (heading + description)
├── gap-4 (16px)   — Between list items, form fields
└── gap-2 (8px)    — Between tight elements (icon + label)
```

#### Grid Patterns

```
Desktop (1280px+ container)
├── 12-column grid — Complex layouts (feature showcase)
├── 3-column grid  — Feature cards, use cases
├── 2-column grid  — Benefits, comparisons
└── 1-column       — Hero, pricing, CTA sections

Tablet (768px-1279px)
├── 2-column grid  — Feature cards collapse
└── 1-column       — Everything else stacks

Mobile (< 768px)
└── 1-column only  — Everything stacks, full width
```

#### Spacing Rules

1. **Consistent Gaps** — Use only: `gap-2`, `gap-4`, `gap-6`, `gap-8`. No random values.
2. **Section Breathing** — Minimum `py-20` between sections. More for hero/pricing.
3. **Card Padding** — Minimum `p-6` for any card. `p-8` for large cards.
4. **Content Width** —
   - Body text: `max-w-3xl` (768px)
   - Headlines: `max-w-4xl` (896px)
   - Full content: `container max-w-7xl` (1280px)

---

### 🎭 COMPONENT SYSTEM

**Philosophy:** **Consistent, recognizable terminal components**

#### Terminal Component DNA

All components share:
- **Sharp Corners** — `rounded-none` (0px border-radius) — Non-negotiable
- **Single-Pixel Borders** — `border` (1px solid) — Always present
- **Flat Shadows** — Use borders, not shadows (shadows = not terminal)
- **Monospace Text** — Everything uses JetBrains Mono
- **Bracket Notation** — Labels use `[ ]` brackets consistently

#### Component Catalog

**1. Buttons**

```tsx
Primary CTA (Accent)
├── Background: accent-primary (purple)
├── Text: text-primary (white)
├── Border: none
├── Padding: px-6 py-3
├── Hover: Lighten 10%
└── Format: "> BUTTON TEXT" (arrow prefix, uppercase)

Secondary CTA (Outline)
├── Background: transparent
├── Text: text-primary (white)
├── Border: border-accent (purple)
├── Padding: px-6 py-3
├── Hover: bg-surface (slight fill)
└── Format: "> BUTTON TEXT"

Ghost/Tertiary
├── Background: transparent
├── Text: text-secondary (80% white)
├── Border: border-default
├── Padding: px-4 py-2
├── Hover: text-primary
└── Format: "Button Text" (no arrow, title case OK)
```

**2. Cards**

```tsx
Standard Card
├── Background: bg-surface (7% white)
├── Border: border-default (1px solid 20% white)
├── Padding: p-6 (24px) or p-8 (32px)
├── Radius: rounded-none
└── Shadow: none (use borders only)

Card Header (Terminal Style)
├── Background: bg-muted (14% white)
├── Border Bottom: border-default
├── Padding: px-4 py-2
├── Text: text-muted, text-xs, uppercase
└── Format: "[ [0x00] CARD TITLE ]" (hex code + title)
```

**3. Badges & Labels**

```tsx
Terminal Badge
├── Background: bg-muted
├── Border: border-default
├── Padding: px-2 py-1
├── Text: text-muted, text-xs, uppercase
├── Radius: rounded-none
└── Format: "[LABEL]" (always bracketed)

Accent Badge (for emphasis)
├── Background: accent-primary (purple) at 10% opacity
├── Border: border-accent
├── Padding: px-2 py-1
├── Text: accent-primary, text-xs, uppercase
└── Format: "[FEATURED]" or "20% OFF"
```

**4. Section Headers**

```tsx
Terminal Section Header
├── Badge: "[0x10]" (hex code) in text-muted
├── Heading: H2 (32px), text-primary, semibold
├── Description: Body large (16px), text-secondary
├── Spacing: gap-6 between elements
└── Alignment: center for hero sections, left for content sections
```

---

## 3. PAGE STRUCTURE & SECTION DESIGNS

### 📐 SECTION ORDER

```
1. Hero Section          — Grab attention, state value prop clearly
2. Interactive Playground — Show, don't tell (5-tab demo)
3. Features Showcase     — 3 pillar value props (AI, Payments, Quality)
4. Stats Bar             — Trust indicators (verifiable metrics)
5. Time Savings          — Where 400+ hours comes from (breakdown)
6. Use Cases             — Target personas (4 audience types)
7. Value Breakdown       — Receipt showing $36K value for $399
8. Pricing               — Single plan, clear pricing, urgency
9. What's Included       — Comprehensive checklist of features
10. FAQ                  — Address objections, build trust
11. Final CTA            — Last conversion push
12. Sticky CTA Bar       — Persistent bottom bar (scrolling)
13. Exit Intent Popup    — Last-ditch conversion (on exit)
```

---

### 🎯 SECTION DESIGNS

#### **SECTION 1: HERO**

**Purpose:** Hook attention. Communicate value prop in 3 seconds. Drive to CTA.

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Terminal Badge: [ [0x00] SYSTEM INIT ]       │
│                                                  │
│  Headline (H1 Display, 64px, Bold):            │
│  "BUILDING YOUR SAAS                           │
│   JUST GOT UNFAIRLY EASY"                      │
│                                                  │
│  Subheadline (Body Large, 16px):               │
│  "60+ production components. 26 templates.     │
│   Terminal design that stands out. Auth,       │
│   billing, dashboards — all done. Ship this    │
│   weekend, not next quarter."                  │
│                                                  │
│  [ Primary CTA ]  [ Secondary CTA ]            │
│                                                  │
│  Social Proof Line (small text):               │
│  "[VERIFIED] Powers 100+ production SaaS apps" │
└─────────────────────────────────────────────────┘
```

**Visual Specs:**
- **Alignment:** Center
- **Width:** Max-w-4xl (896px) for headline, max-w-3xl (768px) for subheadline
- **Spacing:** py-24 (96px) section padding, gap-8 between elements
- **Background:** bg-canvas with subtle grid pattern (optional)
- **CTAs:** Primary (purple) + Secondary (outline), both with "> " prefix

**Copy Guidelines:**
- **Headline:** 6-8 words max, all caps, bold statement
- **Subheadline:** 2-3 sentences, concrete specifics (numbers, features)
- **CTAs:** Action-oriented, specific (not just "Get Started")

---

#### **SECTION 2: INTERACTIVE PLAYGROUND**

**Purpose:** Show the product visually. Let users explore components/templates.

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  [ Tab: COMPONENTS ] [ Tab: DASHBOARD ]       │
│  [ Tab: TABLE ] [ Tab: PROFILE ] [ BILLING ]   │
│                                                  │
│  ┌───────────────────────────────────────────┐ │
│  │  Browser Chrome (fake address bar)        │ │
│  ├───────────────────────────────────────────┤ │
│  │                                            │ │
│  │  Live Component/Template Preview          │ │
│  │  (Interactive, real UI)                   │ │
│  │                                            │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**Visual Specs:**
- **Spacing:** py-20 (80px) section padding
- **Browser Frame:**
  - Border: border-strong (2px for emphasis)
  - Background: bg-surface
  - Chrome: Realistic window controls (red/yellow/green dots)
- **Tabs:**
  - Active: bg-accent-primary, text-white
  - Inactive: bg-surface, text-muted
  - Format: All caps (e.g., "COMPONENTS")
- **Preview Area:**
  - Min height: 600px
  - Background: bg-canvas (to show components against page background)
  - Scrollable if content overflows

**Interaction:**
- Tabs switch content instantly (no loading)
- Preview is fully functional (users can click buttons, see interactions)
- Responsive: Collapse to single column on mobile

---

#### **SECTION 3: FEATURES SHOWCASE**

**Purpose:** Communicate 3 core value props. Build desire. Differentiate from competitors.

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Section Header (centered):                     │
│  Badge: "[WHAT MAKES FABRK DIFFERENT]"         │
│  H2: "SHIP YOUR AI SAAS BEFORE YOUR RUNWAY ENDS"│
│  Description: (Updated copy from earlier)       │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ FEATURE  │  │ FEATURE  │  │ FEATURE  │    │
│  │ CARD 1   │  │ CARD 2   │  │ CARD 3   │    │
│  │          │  │          │  │          │    │
│  │ Icon     │  │ Icon     │  │ Icon     │    │
│  │ Benefit  │  │ Benefit  │  │ Benefit  │    │
│  │ Features │  │ Features │  │ Features │    │
│  │ Stats    │  │ Stats    │  │ Stats    │    │
│  │ CTA →    │  │ CTA →    │  │ CTA →    │    │
│  └──────────┘  └──────────┘  └──────────┘    │
│                                                  │
│  Total Value Card (full width):                 │
│  [ Time Saved: 400+ HRS | Cost Saved: $36K+ ]  │
└─────────────────────────────────────────────────┘
```

**Visual Specs:**
- **Card Grid:** 3 equal columns (desktop), 1 column (mobile)
- **Gap:** gap-8 (32px) between cards
- **Card Design:**
  - Terminal header: `[ [0x10] MODULE_NAME ]`
  - Icon: 48px, accent-primary color
  - Benefit: H3 (24px), text-primary, semibold
  - Description: Body (14px), text-secondary, max 3 sentences
  - Feature List: Checkmarks (green), text-secondary, gap-2
  - Stats: Bold, accent-primary for numbers
  - CTA: Ghost button (outline), right-aligned
- **Total Value Card:**
  - Background: bg-elevated (darker than surface)
  - Border: border-accent (purple)
  - Stats in 4 columns (desktop), 2 columns (mobile)
  - Large numbers (24px), bold

**Content Structure:**
```
Card 1: AI Monetization
├── Icon: Sparkles
├── Benefit: "Launch AI features that actually make money"
├── Description: Token metering, credit system, usage tracking
├── Features: [List 6 features]
├── Stats: "80+ HRS | $8K"
└── CTA: "> Explore AI Features"

Card 2: Payment Flexibility
├── Icon: CreditCard
├── Benefit: "3 payment providers. Zero vendor lock-in."
├── Description: Stripe, Polar, LemonSqueezy with flexibility
├── Features: [List 6 features]
├── Stats: "120+ HRS | $12K"
└── CTA: "> View Billing System"

Card 3: Production Quality
├── Icon: Rocket
├── Benefit: "60+ components that actually work in production"
├── Description: TypeScript strict, git hooks, real error handling
├── Features: [List 6 features]
├── Stats: "200+ HRS | $16K"
└── CTA: "> Browse Component Library"
```

---

#### **SECTION 4: STATS BAR**

**Purpose:** Build trust with verifiable metrics. Social proof.

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  5,000+  │  │   60+    │  │   100+   │     │
│  │ DOWNLOADS│  │COMPONENTS│  │  APPS    │     │
│  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────┘
```

**Visual Specs:**
- **Spacing:** py-16 (64px) — Tighter than other sections
- **Background:** bg-surface (different from canvas for visual separation)
- **Stats:**
  - Number: H2 (32px), accent-primary, bold
  - Label: Body small (12px), text-muted, uppercase
  - Layout: Centered, equal width columns
- **Grid:** 4 columns (desktop), 2 columns (tablet), 1 column (mobile)

**Content Guidelines:**
- Use verifiable numbers only
- Keep labels short (1-2 words)
- Update regularly (use dynamic data if possible)

---

#### **SECTION 5-11: [Similar Detail for Remaining Sections]**

*For brevity, I'll provide high-level specs. Full designs available on request.*

**5. Time Savings:** Visual breakdown showing where 400+ hours comes from (bar chart or list)

**6. Use Cases:** 4 persona cards (Solo Founder, Team Lead, etc.) with pain points → solutions

**7. Value Breakdown:** Receipt-style card showing line items ($8K + $12K + $16K = $36K value for $399 price)

**8. Pricing:** Single plan card, prominent price, feature checklist, urgency indicator, primary CTA

**9. What's Included:** 3-column checklist (Auth, Billing, Components, etc.) with checkmarks

**10. FAQ:** Accordion-style, terminal-themed, common objections addressed

**11. Final CTA:** Repeat hero CTA with different headline ("Ready to Ship?")

---

## 4. COMPONENT USAGE GUIDE

### Per-Section Component Mapping

```
Hero Section
├── SectionHeader (with badge, heading, description)
├── Button (primary + secondary)
└── Container (max-w-4xl, centered)

Features Showcase
├── SectionHeader (centered)
├── BenefitCard (3-column grid)
│   ├── Icon (Lucide icon, 48px)
│   ├── CardHeader (terminal style)
│   ├── Heading (H3)
│   ├── Description (Body)
│   ├── FeatureList (checkmarks)
│   ├── Stats (time + cost)
│   └── Button (ghost/outline)
└── Card (full-width total value card)

Stats Section
├── StatCard (4-column grid)
│   ├── Number (H2, accent color)
│   └── Label (small, uppercase)

Pricing Section
├── PricingCard (single card, centered)
│   ├── CardHeader (terminal)
│   ├── Price (large, accent)
│   ├── FeatureChecklist
│   ├── UrgencyBadge ("[20% OFF]")
│   └── Button (primary, large)

FAQ Section
├── Accordion (terminal-styled)
│   ├── AccordionItem
│   │   ├── AccordionTrigger (with terminal bracket)
│   │   └── AccordionContent (body text)
```

---

## 5. VISUAL DESIGN PRINCIPLES

### Hierarchy Rules

1. **Size Contrast**
   - Hero H1: 64px (4x body text)
   - Section H2: 32px (2x body text)
   - Card H3: 24px (1.5x body text)
   - Body: 14-16px

2. **Weight Contrast**
   - Headlines: 600-700 weight
   - Body: 400 weight
   - Use weight + size together for maximum impact

3. **Color Contrast**
   - Primary content: 98% white
   - Secondary content: 80% white
   - Meta/labels: 50% white
   - Never use anything below 30% white (unreadable)

4. **Spacing Contrast**
   - More space above headline than below (visual gravity)
   - More space between sections than inside sections
   - Tight spacing for related items, loose spacing for separation

### Visual Rhythm

- **Consistent Section Pattern:**
  1. Badge/Label (small, muted)
  2. Heading (large, bold)
  3. Description (medium, secondary)
  4. Visual Content (cards, images, lists)
  5. CTA (if applicable)

- **Card Pattern:**
  1. Header (terminal bracket style)
  2. Icon or visual (if applicable)
  3. Heading
  4. Description
  5. Feature list or stats
  6. CTA (ghost button)

### Alignment & Grid

- **Always align to grid** — No random offsets
- **Consistent margins** — All cards/sections use same horizontal margins
- **Vertical centering** — Center content in tall sections (hero, pricing)
- **Left-align text** — Even in centered sections, left-align paragraphs for readability

---

## 6. IMAGERY & GRAPHICS

### Terminal UI Screenshots

**Philosophy:** Show real product UI, not generic stock photos or illustrations.

**Treatment:**
- **Frame:** Browser chrome (realistic address bar, window controls)
- **Shadow:** None (use border instead: 2px border-strong)
- **Background:** Match product background (bg-canvas) to show authenticity
- **Content:** Real, working components — not mockups

**Where to Use:**
- Interactive playground (primary)
- Feature cards (thumbnail screenshots)
- Use case sections (persona-specific dashboards)

### Icons

**System:** Lucide React (monoline, consistent style)

**Usage:**
- Feature cards: 48px, accent-primary color
- Checklist items: 16px, accent-success (green checkmark)
- Navigation: 20px, text-muted

**Rules:**
- Always use same icon family (no mixing)
- Consistent sizing within section
- Accent color for emphasis, muted for utility

### Patterns & Textures

**Optional Terminal Pattern:**
- Subtle grid pattern on hero background
- Scanline effect (very subtle, 1-2% opacity)
- CRT glow effect on hover (optional, for terminal purists)

**Do NOT Use:**
- Gradients (not terminal-style)
- Soft shadows (use borders)
- Photography (product UI only)
- Illustrations (show real product)

---

## 7. RESPONSIVE BEHAVIOR

### Breakpoints

```css
Mobile:   < 768px   (1 column, full width, larger touch targets)
Tablet:   768-1279px (2 columns, reduce spacing)
Desktop:  1280px+    (3-4 columns, full layout)
```

### Responsive Rules

1. **Mobile First**
   - Design for mobile, enhance for desktop
   - Stack all columns vertically on mobile
   - Increase touch target size (min 44x44px)

2. **Typography Scaling**
   - Hero H1: 64px → 48px (mobile)
   - Section H2: 32px → 24px (mobile)
   - Body: 14px → 16px (mobile for readability)

3. **Spacing Reduction**
   - Section padding: py-20 → py-12 (mobile)
   - Card padding: p-8 → p-6 (mobile)
   - Gap: gap-8 → gap-6 (mobile)

4. **Component Adaptations**
   - Feature cards: 3 columns → 1 column
   - Stats bar: 4 columns → 2 columns → 1 column
   - Buttons: Full width on mobile
   - Playground: Reduce height, maintain functionality

---

## 8. ANIMATION & INTERACTION

### Motion Principles

**Philosophy:** Subtle, purposeful, terminal-inspired

**Timing:**
- Fast: 0.15s (button hover, state changes)
- Medium: 0.3s (card entry, accordion open)
- Slow: 0.6s (section scroll-in, page transitions)

**Easing:**
- `ease-out` — Elements entering
- `ease-in-out` — State changes
- `ease-in` — Elements exiting

### Scroll-Triggered Animations

```tsx
// Framer Motion pattern
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {content}
</motion.div>
```

**What to Animate:**
- Section entries (fade + slide up)
- Card entries (stagger by 0.1s)
- Stats (count-up animation)
- CTA buttons (scale on hover)

**What NOT to Animate:**
- Body text (just fade in)
- Small UI elements (too distracting)
- Anything that delays content visibility

### Hover States

```css
Button Hover
├── Background: Lighten 10%
├── Scale: 1.02 (subtle lift)
└── Transition: 0.15s ease-out

Card Hover
├── Border: border-accent (purple)
└── Transition: 0.3s ease-out

Link Hover
├── Color: accent-primary
└── Underline: Offset 2px
```

---

## 9. IMPLEMENTATION NOTES

### Critical Dev Requirements

1. **Design Tokens Required**
   - All colors from CSS variables (no hardcoded hex)
   - All spacing from Tailwind scale (no random pixel values)
   - All typography from type scale (no arbitrary sizes)

2. **Component Consistency**
   - Reuse CardHeader component everywhere (don't create variants)
   - Reuse Button component with variants (don't create new button styles)
   - Reuse Badge component with color variants (don't hardcode styles)

3. **Accessibility**
   - All interactive elements min 44x44px touch target
   - Color contrast ratio min 4.5:1 for body text, 3:1 for large text
   - Keyboard navigation for all interactive elements
   - Screen reader labels for icon-only buttons

4. **Performance**
   - Lazy load images below fold
   - Use next/image for all screenshots
   - Minimize animation JavaScript (use CSS when possible)
   - Preload hero section assets

### Testing Checklist

- [ ] All text uses monospace font (no system font leaks)
- [ ] All corners are sharp (`rounded-none`)
- [ ] No soft shadows (only borders)
- [ ] Accent color used sparingly (CTAs, highlights only)
- [ ] Consistent spacing (8pt grid)
- [ ] Mobile responsive (test on real device)
- [ ] Dark mode only (no light mode leaks)
- [ ] Keyboard navigable
- [ ] Screen reader accessible

---

## 10. BEFORE/AFTER COMPARISON

### Current (Weak)
- Generic "ship fast" messaging
- Cramped layout, weak hierarchy
- Timid color usage, no visual confidence
- Inconsistent terminal aesthetic
- Component count undersold (60 when you have more)

### Target (Strong)
- Unique "unfairly easy" positioning
- Spacious layout, clear visual hierarchy
- Bold accent usage, confident design
- Committed terminal aesthetic throughout
- Honest, impressive numbers (60+ components, 26 templates)

---

## 11. NEXT STEPS

### Phase 1: Quick Wins (Can Ship Today)
1. Update hero copy (already done)
2. Fix feature card spacing (add gap-8)
3. Enlarge headlines (H1 to 64px, H2 to 32px)
4. Strengthen CTA contrast (use accent-primary background)

### Phase 2: Visual Polish (1-2 Days)
1. Standardize all card headers (terminal bracket style)
2. Fix component inconsistencies (buttons, badges)
3. Improve mobile spacing (py-20 → py-12)
4. Add scroll animations (fade + slide)

### Phase 3: Full Redesign (3-5 Days)
1. Rebuild hero with larger typography
2. Redesign feature cards with better visual hierarchy
3. Add terminal pattern background (subtle grid)
4. Create responsive breakpoints for all sections
5. Polish all interactions (hover states, animations)

---

## 12. APPENDIX: REFERENCE SITES

**Sites That Do Terminal Aesthetic Well:**
- Vercel (clean, spacious, monospace headings)
- Linear (sharp edges, minimal, confident)
- Stripe Docs (clear hierarchy, excellent typography)

**Sites That Do SaaS Marketing Well:**
- Notion (clear value prop, spacious layout)
- Figma (visual playground, show don't tell)
- Framer (beautiful component showcase)

**What Fabrk Should Feel Like:**
- "Stripe's clarity" + "Linear's minimalism" + "Vercel's monospace confidence"
- Professional but edgy
- Technical but accessible
- Premium but approachable

---

**END OF VISUAL DESIGN SPECIFICATION**

---

**Questions? Feedback? Disagreements?**

This spec is opinionated by design. Push back if something doesn't feel right for Fabrk's brand. The goal is visual impact and brand differentiation, not just "looking nice."

**Ready to implement?** Start with Phase 1 (quick wins), then move to Phase 2 (polish), then Phase 3 (full redesign) if needed.
