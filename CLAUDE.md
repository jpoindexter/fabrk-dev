# CLAUDE.md

**Note:** This is the customer-facing version that syncs to the official repo. For development instructions including sync workflow, see `.internal/CLAUDE-DEV.md`.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

```
███████████   █████████   ███████████  ███████████   █████   ████
░░███░░░░░░█  ███░░░░░███ ░░███░░░░░███░░███░░░░░███ ░░███   ███░
 ░███   █ ░  ░███    ░███  ░███    ░███ ░███    ░███  ░███  ███
 ░███████    ░███████████  ░██████████  ░██████████   ░███████
 ░███░░░█    ░███░░░░░███  ░███░░░░░███ ░███░░░░░███  ░███░░███
 ░███  ░     ░███    ░███  ░███    ░███ ░███    ░███  ░███ ░░███
 █████       █████   █████ ███████████  █████   █████ █████ ░░████
░░░░░       ░░░░░   ░░░░░ ░░░░░░░░░░░  ░░░░░   ░░░░░ ░░░░░   ░░░░
```

> Terminal-first SaaS boilerplate. Ship fast. Look sharp.

## Quick Reference

| Need | Do This |
|------|---------|
| Design system rules | See `docs/08-design/DESIGN_SYSTEM.md` |
| Pre-commit checks | Automatic via Husky (see below) |
| Check components count | 77 UI components in `src/components/ui/` |
| Payment providers | Stripe, Polar, Lemonsqueezy (3 options) |
| Config files | `src/config/index.ts` (not .js) |

---

## Project Overview

**Fabrk** is a Next.js 16 SaaS boilerplate with 77 UI components, terminal-inspired design, and full-stack features.

**Tech Stack:** Next.js 16 (App Router, React 19) • TypeScript strict • NextAuth v5 • Multi-provider payments (Stripe, Polar, Lemonsqueezy) • Prisma + PostgreSQL • Resend • Framer Motion • Radix UI + Tailwind CSS 4 • Terminal-only design system (14 themes: 5 CRT phosphor, 3 light modes, 6 retro computer)

---

## Critical Rules

### 1. Terminal Style EVERYWHERE

All components use terminal aesthetic:
- `rounded-none` on all elements
- `font-mono` for ALL text (body tag uses `className="font-mono"`)
- Design tokens only (no hardcoded colors)

**IMPORTANT:** The `<body>` tag MUST have `className="font-mono antialiased"` to apply JetBrains Mono monospace font globally. This ensures consistent terminal aesthetic throughout the entire application.

### 2. NEVER hardcode colors

Use design tokens from `globals.css`. Run `npm run scan:hex` to detect violations.

```tsx
// GOOD
className="bg-primary text-primary-foreground"

// BAD (breaks theme switching)
className="bg-purple-500 text-white"
```

### 3. ALWAYS use templates for docs pages

See [Documentation Templates](#documentation-templates) section.

### 4. ALWAYS include `title` prop on `DocsCard`

Every card needs a terminal header.

### 5. Terminal Text Casing Standards

Follow these text casing rules for consistent terminal aesthetic:

| Element Type | Casing Rule | Examples |
|--------------|-------------|----------|
| **UI Labels/Badges** | UPPERCASE | `[SYSTEM INIT]`, `[STATUS]`, `[POWERED BY]` |
| **Button Text** | UPPERCASE with `>` prefix | `> GET FABRK`, `> VIEW LIBRARY`, `> SUBMIT` |
| **Headlines (H1/H2)** | UPPERCASE | `BUILDING YOUR SAAS`, `JUST GOT UNFAIRLY EASY` |
| **Body Text** | Normal sentence case | "Why spend valuable time tackling auth..." |
| **Tech Stack Labels** | UPPERCASE | `NEXT.JS`, `REACT`, `TYPESCRIPT` |
| **Status Values** | UPPERCASE | `OPTIMIZED`, `SEAMLESS`, `[OK]` |

**Important:** Never use underscores in user-facing text. Use spaces for readability. Headlines use ALL CAPS for strong terminal aesthetic and visual impact.

```tsx
// GOOD
<Badge label="SYSTEM INIT" />
<Button>> GET FABRK</Button>
<h2>BUILDING YOUR SAAS</h2>

// BAD
<Badge label="SYSTEM_INIT" />
<Button>> GET_FABRK</Button>
<h2>BUILDING_YOUR_SAAS</h2>
<h2>Building Your SaaS</h2>  {/* Title Case too soft for terminal */}
```

### 6. NEVER modify base UI components without explicit permission

**Protected Components** (DO NOT MODIFY unless explicitly told to):

```
src/components/ui/           # 77 UI components - ALL LOCKED
├── button.tsx               # LOCKED
├── card.tsx                 # LOCKED
├── input.tsx                # LOCKED
├── sheet.tsx                # LOCKED
├── tabs.tsx                 # LOCKED
├── ... (72 more files)      # LOCKED

src/components/marketing/
└── navigation.tsx           # LOCKED - Marketing navigation

src/components/navigation/
└── site-navigation.tsx      # LOCKED - Docs navigation

src/components/shared/       # ALL shared components
├── logo.tsx                 # LOCKED
├── footer.tsx               # LOCKED
└── ...                      # LOCKED
```

**Safe to Modify** (without explicit permission):
- `/src/app/` - All page files (docs, templates, routes)
- Demo/preview components inside docs pages (e.g., `NavigationDemo` in `/src/app/(marketing)/docs/components/navigation/page.tsx`)
- New components you create
- Temporary test components

**Why This Matters**: Base UI components are the foundation of the entire application. Modifying them affects EVERY page. Always ask before touching these files.

---

## Commands

```bash
# Development
npm run dev              # Start dev server (auto-kills port 3000)
npm run build            # Production build
npm run type-check       # TypeScript validation

# Code Quality (automated on commit)
npm run lint             # ESLint + hex color scan
npm run scan:hex         # Detect hardcoded colors
npm run format           # Prettier format
npm run audit:staged     # Design system audit (runs on commit)

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed test data
npm run db:reset         # Reset and reseed

# Testing
npm test                 # Vitest unit tests
npm run test:e2e         # Playwright E2E tests
```

---

## Architecture

```
UI Layer (src/app/)
   ↓
API Layer (src/app/api/)
   ↓
Service Layer (src/lib/)
```

### Key Directories

```
src/
├── app/
│   ├── (marketing)/       # Marketing pages & docs
│   │   ├── library/       # Template showcase pages
│   │   └── docs/          # Documentation site
│   ├── (platform)/        # Dashboard/app pages
│   ├── (auth)/            # Auth pages
│   └── api/               # API routes (30+ endpoints)
│       ├── stripe/        # Stripe integration
│       ├── polar/         # Polar.sh integration
│       └── lemonsqueezy/  # Lemonsqueezy integration
├── components/
│   ├── ui/                # Radix primitives (LOCKED - 77 components)
│   ├── docs/              # Docs components & templates
│   │   └── templates/     # Template components (NOT in app/templates/)
│   ├── landing/           # Landing sections
│   ├── dashboard/         # Dashboard components
│   ├── marketing/         # Marketing navigation (LOCKED)
│   ├── navigation/        # Site navigation (LOCKED)
│   └── shared/            # Shared components (LOCKED)
├── config/
│   ├── index.ts           # Config exports
│   ├── app.ts             # App configuration
│   ├── stripe.ts          # Stripe config
│   └── i18n.ts            # Internationalization
├── lib/
│   ├── auth.ts            # NextAuth v5 config
│   ├── db/                # Prisma client
│   ├── env.ts             # Environment validation
│   ├── stripe.ts          # Stripe client
│   ├── polar.ts           # Polar client
│   └── lemonsqueezy/      # Lemonsqueezy client
└── design-system/
    └── themes/            # Terminal theme (5 CRT color variants)
```

### Critical Files

- **`src/config/index.ts`** - Central configuration exports (app.ts, stripe.ts, i18n.ts)
- **`src/lib/env.ts`** - Environment validation with Zod
- **`src/lib/auth.ts`** - NextAuth v5 with JWT sessions (30-day)
- **`docs/08-design/DESIGN_SYSTEM.md`** - Complete design system specification
- **`.claude/audit/`** - 58 modular audit files (see Resources)
- **`.husky/pre-commit`** - Git hook entry point (runs type-check + lint-staged)
- **`.internal/scripts/utilities/pre-commit-audit.mjs`** - Design system pattern checker

---

## Design System Quick Reference

> Full documentation: `docs/08-design/DESIGN_SYSTEM.md`

### Terminal Aesthetic

1. **Sharp edges** - `rounded-none` on all elements
2. **Monospace everywhere** - Body tag uses `font-mono`, JetBrains Mono applied globally
3. **Command-line feel** - Brackets, prefixes, uppercase

**Font Application:**
```tsx
// Root layout.tsx - REQUIRED
<body className="font-mono antialiased" suppressHydrationWarning>

// This applies JetBrains Mono to ALL text site-wide
// Components inherit this automatically - no need to add font-mono to every component
```

### Design System Tokens (IMPORTANT)

Import `mode` from `@/design-system` for consistent styling:

```tsx
import { mode } from "@/design-system";

// Use mode tokens in className
<Button className={cn(mode.radius, mode.font, "w-full text-xs")}>
  > SUBMIT
</Button>

<Input className={cn(mode.radius, mode.font, "text-xs")} />
```

The `mode` object provides:
- `mode.radius` - Border radius class (`rounded-none` for terminal)
- `mode.font` - Font family class (`font-mono`)
- `mode.inputStyle` - Input styling classes

### Allowed Colors

```tsx
// Backgrounds
bg-background, bg-card, bg-muted, bg-primary, bg-secondary, bg-destructive

// Text
text-foreground, text-muted-foreground, text-primary, text-destructive, text-success, text-warning

// Borders
border-border, border-primary

// BANNED
bg-white, bg-gray-*, text-gray-*, #hexvalues
```

### Button Format

```tsx
// CORRECT
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>
<Button className="rounded-none font-mono text-xs">> SAVE_CHANGES</Button>

// WRONG
<Button>Submit</Button>
```

### Label Format

```tsx
<span className="font-mono text-xs text-muted-foreground">[LABEL]:</span>
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>
<p className="font-mono text-xs text-success">[SUCCESS]: Message</p>
```

### Card Header

```tsx
<div className="border border-border bg-card">
  <div className="border-b border-border px-4 py-2">
    <span className="font-mono text-xs text-muted-foreground">
      [ [0x00] SECTION_TITLE ]
    </span>
  </div>
  <div className="p-4">{content}</div>
</div>
```

### Spacing (8-Point Grid)

| Size | Value | Classes |
|------|-------|---------|
| xs | 4px | `p-1`, `gap-1` |
| sm | 8px | `p-2`, `gap-2` |
| md | 16px | `p-4`, `gap-4` |
| lg | 24px | `p-6`, `gap-6` |
| xl | 32px | `p-8`, `gap-8` |

### Docs Page Typography (CRITICAL)

**DocsCard already applies `font-mono text-xs text-muted-foreground` to all children.**

```tsx
// INSIDE DocsCard - NO typography classes needed (card handles it)
<DocsCard title="EXAMPLE">
  <p>This text is already styled by the card.</p>
  <ul className="space-y-1">  {/* Only spacing, no font classes */}
    <li>Item 1</li>
  </ul>
</DocsCard>

// WRONG - Redundant/conflicting styles inside DocsCard
<DocsCard title="EXAMPLE">
  <p className="font-mono text-sm">This conflicts with card styling!</p>
</DocsCard>

// OUTSIDE DocsCard - Explicit typography required
<details className="border border-border bg-card">
  <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
    Question title (text-sm = 14px industry standard)
  </summary>
  <div className="border-t p-4 font-mono text-sm text-muted-foreground">
    Answer content
  </div>
</details>
```

**Font Size Rules:**
- `text-xs` (12px): Labels, captions, DocsCard content (via component)
- `text-sm` (14px): Body text OUTSIDE DocsCard, details/accordion content
- Never use `text-base` or larger for body text in terminal UI

---

## Documentation Templates

**ALL docs pages in `src/app/docs/` MUST use a template.**

| Template | Use For |
|----------|---------|
| `ComponentShowcaseTemplate` | `/docs/components/*` |
| `FeatureGuideTemplate` | `/docs/features/*`, `/docs/security/*` |
| `TutorialTemplate` | `/docs/tutorials/*` |
| `GettingStartedTemplate` | `/docs/getting-started/*` |

### Component Documentation Example

```tsx
import { ComponentShowcaseTemplate } from "@/components/docs";
import { Button } from "@/components/ui/button";

export default function ButtonPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.01]"
      title="Button"
      description="Interactive button component"
      importCode={`import { Button } from "@/components/ui/button"`}
      mainPreview={{
        preview: <Button>> CLICK_ME</Button>,  // Direct component, NO wrapper
        code: `<Button>> CLICK_ME</Button>`,
      }}
      props={[
        { name: "variant", type: "string", default: '"default"', description: "Visual style" },
      ]}
      previous={{ title: "Badge", href: "/docs/components/badge" }}
      next={{ title: "Card", href: "/docs/components/card" }}
    />
  );
}
```

### DocsCard Title Requirement

```tsx
// CORRECT
<DocsCard title="SECTION_NAME">Content</DocsCard>

// WRONG - missing terminal header
<DocsCard>Content</DocsCard>
```

---

## Template Pages Pattern

Template showcase pages in `src/app/(marketing)/library/[category]/` use a Preview/Code tabbed interface.
Template components live in `src/components/docs/templates/`.

```tsx
"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { Card, CardHeader, CardContent, TemplatePageHeader } from "@/components/ui/card";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

const templateCode = `// Copyable standalone template code
export default function Page() {
  return <div>...</div>;
}`;

function TemplatePreview() {
  return (
    <div className="bg-background/50 flex min-h-[500px] items-center justify-center p-8">
      {/* Live preview of the template */}
    </div>
  );
}

export default function TemplatePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        <TemplatePageHeader
          badge="TEMPLATE_NAME"
          title="Template Title"
          description="Brief description"
        />

        <Tabs defaultValue="preview" className="w-full">
          <Card>
            <CardHeader code="0x00" title="TEMPLATE_PREVIEW" />
            <TabsList className={cn("h-auto w-auto gap-0 border-0 bg-transparent p-0", mode.radius)}>
              <TabsTrigger value="preview" className={cn("...", mode.radius, mode.font)}>
                [PREVIEW]
              </TabsTrigger>
              <TabsTrigger value="code" className={cn("...", mode.radius, mode.font)}>
                [CODE]
              </TabsTrigger>
            </TabsList>
          </Card>

          <TabsContent value="preview" className="mt-6">
            <Card><CardHeader code="0x01" title="LIVE_PREVIEW" /><TemplatePreview /></Card>
          </TabsContent>

          <TabsContent value="code" className="mt-6">
            <Card>
              <CardHeader code="0x01" title="SOURCE_CODE" />
              <div className="w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
```

### Brand Icon Colors Exception

Third-party brand icons (Google, GitHub, etc.) require their official colors. Use eslint-disable blocks:

```tsx
{/* eslint-disable design-system/no-hardcoded-colors -- Google brand colors are intentional */}
<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
  <path d="..." fill="#4285F4" />
  <path d="..." fill="#34A853" />
  <path d="..." fill="#FBBC05" />
  <path d="..." fill="#EA4335" />
</svg>
{/* eslint-enable design-system/no-hardcoded-colors */}
```

**Important:** Always include the reason comment (`-- reason here`) for the disable.

---

## Key Patterns

### Environment Variables

```typescript
import { env } from '@/lib/env';

// GOOD
const key = env.server.POLAR_ACCESS_TOKEN;

// BAD
const key = process.env.POLAR_ACCESS_TOKEN;
```

### Protected Routes

```typescript
const session = await auth();
if (!session?.user) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

### API Routes

```typescript
try {
  return NextResponse.json({ data }, { status: 200 });
} catch (error) {
  console.error("Description:", error);
  return NextResponse.json({ error: "Message" }, { status: 500 });
}
```

### Animation (Framer Motion)

```typescript
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
```

---

## Payment Flow (Multi-Provider)

**Fabrk supports 3 payment processors:**

### Stripe
1. Create checkout session via `/api/stripe/checkout`
2. User pays on Stripe hosted checkout
3. Webhook triggers at `/api/webhooks/stripe`
4. Payment record created, welcome email queued

### Polar.sh
1. Create checkout session via `/api/polar/checkout`
2. User pays on Polar hosted checkout
3. Webhook triggers at `/api/webhooks/polar`
4. Payment record created

### Lemonsqueezy
1. Create checkout session via `/api/lemonsqueezy/checkout`
2. User pays on Lemonsqueezy hosted checkout
3. Webhook triggers at `/api/webhooks/lemonsqueezy`
4. Payment record created

**Configuration:** Set payment provider in `src/config/stripe.ts` (or equivalent)

---

## Pre-Commit Hooks (Automatic)

Git commits automatically run these checks via **Husky + lint-staged**:

| Check | Blocks Commit? |
|-------|----------------|
| TypeScript (`tsc --noEmit`) | ✅ |
| ESLint + auto-fix | ✅ |
| Prettier formatting | ✅ |
| `console.log` statements | ✅ |
| `target="_blank"` without noopener | ✅ |
| `rounded-sm/md/lg/xl` (use `rounded-none`) | ✅ |
| `shadow-md/lg/xl` (use `shadow-sm`) | ✅ |
| `bg/text-white/black` (use tokens) | ✅ |
| `process.env` direct access | ✅ |
| Missing `aria-label` on icon buttons | ✅ (100% compliant) |
| `<img>` without `alt` | ⚠️ Warning |

**Bypass (emergency only):** `git commit --no-verify`

---

## Design System Launch Readiness (100% Complete)

The design system achieved **100% launch readiness** on December 12, 2025 with complete OKLCH token coverage and accessibility compliance.

### Key Achievements

| Metric | Status |
|--------|--------|
| **Color Tokenization** | 100% OKLCH (zero hardcoded colors) |
| **Accessibility** | 100% WCAG 2.2 AA compliant |
| **Spacing Grid** | 100% 8-point grid compliance |
| **Typography** | 100% scale compliance |
| **Theme Coverage** | 14 complete themes |
| **Component Compliance** | 77/77 components use tokens |

### Compliance Fixes Completed

**1. WCAG 2.2 Border Contrast (9 themes fixed)**
- Upgraded from WCAG 2.1 to 2.2 AA standard (3:1 non-text contrast)
- Fixed: Amber, Light-Green, Light-Amber, GameBoy, C64, GBPocket, VIC-20, Atari, ZX Spectrum
- OKLCH lightness adjustments for border tokens

**2. Semantic Token Mappings (180 lines added)**
- Added complete 18-token mappings to 10 themes
- Covers: backgrounds (4), text (5), borders (4), status (5)
- Enables component API consistency across all themes

**3. Black & White Theme Enhancement**
- Added grayscale status colors (success, warning, info)
- Added 9 distinct chart colors (20%, 40%, 60%, 80% spectrum)
- Maintains pure B&W aesthetic with full functionality

**4. Spacing Grid Violations (154 instances fixed)**
- Root cause: button.lg token (py-3 → py-4) in design-system/index.ts
- Bulk fix: gap-3, space-y-3, px-3, py-3, p-3 → 4px-aligned values
- Result: 100% 8-point grid compliance

**5. Typography Scale (6 arbitrary font sizes fixed)**
- Replaced text-[8px], text-[10px], text-[11px] with text-xs
- Ensures consistent type scale across all components

**6. Email Template Documentation**
- Added eslint-disable comments with rationale to 2 email files
- Documents legitimate hardcoded colors for email client compatibility

### Design System Tools

**Color Conversion:**
```bash
node scripts/hex-to-oklch-converter.mjs
```
Converts hex colors to OKLCH format. Used to migrate 135 code syntax highlighting colors.

**Accessibility Audit:**
```bash
node scripts/check-aria-labels.mjs
```
Scans all components for icon-only buttons without `aria-label` attributes.

### OKLCH Color System

All colors now use OKLCH format for perceptual uniformity:

```css
/* Example - Code syntax highlighting */
--code-fg: oklch(84% 0.13 134);
--code-bg: oklch(19% 0.02 144);
--code-comment: oklch(62% 0.09 136);

/* Alert overlay - uses CSS relative color syntax */
background-color: oklch(from var(--background) 0% c h / 0.8);
```

**Benefits:**
- Perceptually uniform color mixing
- Better dark mode support
- Reliable gradients
- Future-proof color manipulation

### Launch Reports

Comprehensive audit reports archived in `.archives/design-system/2025-12-12-final/`:
- `DESIGN_SYSTEM_AUDIT_2025-12-12.md` - Complete final audit (600+ lines)
- `DESIGN_SYSTEM_LAUNCH_STATUS.md` - Launch readiness summary

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm run dev` (auto-kills) |
| Prisma out of sync | `npm run db:push` |
| Hardcoded colors | `npm run scan:hex` |
| Env validation errors | Check `.env.local`, see `/docs/ENV-VALIDATION.md` |

---

## AI Components

### Architecture

AI features use multi-provider support (OpenAI, Google, Ollama) via Vercel AI SDK:

```
src/
├── components/ai/           # AI UI components
│   ├── chat-interface.tsx   # Reusable chat input
│   ├── form-preview.tsx     # Form preview renderer
│   ├── code-viewer.tsx      # Code generation display
│   └── index.ts             # Exports
├── lib/ai/
│   ├── provider.ts          # Multi-provider factory
│   └── schemas.ts           # Zod schemas for AI responses
└── app/api/ai/              # AI API routes
    └── generate-form/route.ts
```

### Provider Configuration

```typescript
// lib/ai/provider.ts
export function getAIProvider() {
  const provider = env.server.AI_PROVIDER || "ollama";
  switch (provider) {
    case "openai": return openai(env.server.OPENAI_MODEL || "gpt-4o-mini");
    case "google": return google(env.server.GOOGLE_MODEL || "gemini-1.5-flash");
    case "ollama": return ollama(env.server.OLLAMA_MODEL || "llama3.1:8b");
  }
}
```

### Library Pages Pattern

AI library pages in `src/app/(marketing)/library/` use static demos (no live API calls):

```tsx
// Static demo form data - shows what AI would generate
const demoForm: GeneratedForm = {
  name: "ContactForm",
  fields: [...],
  submitLabel: "Send Message",
};

// 3-tab interface: [PREVIEW], [SCHEMA], [COMPONENT]
<Tabs defaultValue="preview">
  <TabsContent value="preview"><FormPreview form={demoForm} /></TabsContent>
  <TabsContent value="schema"><CodeBlock code={generateZodCode(demoForm)} /></TabsContent>
  <TabsContent value="component"><CodeBlock code={generateComponentCode(demoForm)} /></TabsContent>
</Tabs>
```

---

## Philosophy

1. **Simplicity** - Clean, understandable code
2. **Pragmatism** - No over-engineering
3. **Ship-first** - Production-ready from day one

When adding features: "Does this help ship faster?" If no, delete it.

---

## Resources

### Design System
- `docs/08-design/DESIGN_SYSTEM.md` - Complete design system specification
- `src/app/globals.css` - CSS variables and utilities (100% OKLCH tokens)
- `src/design-system/themes/` - Terminal theme (14 complete themes)
- `.archives/design-system/2025-12-12-final/` - Launch audit reports (100/100 score)
- `scripts/hex-to-oklch-converter.mjs` - Color conversion tool
- `scripts/check-aria-labels.mjs` - Accessibility audit tool
- `/docs/components/overview` - Component documentation

### Audit Framework (58 files in `.claude/audit/`)

| Category | Files | Coverage |
|----------|-------|----------|
| **Core** | `README.md`, `protocol.md`, `rules.md`, `files.md`, `output.md` | Entry points |
| **Patterns** | `patterns.md`, `patterns-critical.md`, `patterns-medium.md` | Regex for violations |
| **Accessibility** | `accessibility.md`, `a11y-*.md` (4 files) | WCAG 2.1 AA |
| **Colors** | `colors.md`, `colors-*.md` | Design tokens, contrast |
| **Typography** | `typography.md`, `typography-*.md` | Font scale, patterns |
| **Spacing** | `spacing.md`, `spacing-*.md` | 8-point grid |
| **Components** | `components.md`, `components-*.md` (5 files) | Forms, buttons, cards, validation, empty states |
| **Animation** | `animation.md`, `animation-*.md` | Framer Motion, CSS |
| **Responsive** | `responsive.md`, `responsive-*.md` | Mobile-first, breakpoints |
| **Enterprise** | `enterprise.md`, `enterprise-*.md` | Error boundaries, data fetching |
| **Extended** | `seo-metadata.md`, `react-patterns.md`, `nextjs-patterns.md`, `performance-metrics.md`, `testing-coverage.md`, `component-api.md`, `browser-compatibility.md` | SEO, React, Next.js, Core Web Vitals |

**Run audit:** Say "run audit" or see `.claude/audit/README.md`
