# Fabrk Style Audit Report

> Generated: 2025-12-04
> Purpose: Document ALL styling patterns to identify inconsistencies and plan unification

---

## CRITICAL FINDING: TWO COMPETING HEADER PATTERNS

The codebase has **TWO DIFFERENT** terminal header styles being used:

### Pattern A: Colored Dots (macOS Window Chrome)
```tsx
<div className="flex items-center gap-2 border-b border-border px-4 py-2">
  <div className="flex gap-2">
    <div className="size-2 rounded-none bg-destructive/50" />
    <div className="size-2 rounded-none bg-warning/50" />
    <div className="size-2 rounded-none bg-success/50" />
  </div>
  <span className="font-mono text-xs text-muted-foreground">filename.sh</span>
</div>
```

**Found in 46+ files:**
- `src/app/templates/team-dashboard/components/*.tsx` (7 files)
- `src/app/templates/billing-dashboard/components/*.tsx` (7 files)
- `src/app/templates/pricing-page/components/*.tsx` (4 files)
- `src/app/templates/search-results/components/*.tsx` (5 files)
- `src/app/templates/security-privacy/components/*.tsx` (5 files)
- `src/app/templates/settings-page/components/*.tsx` (1 file)
- `src/app/templates/profile/components/*.tsx` (2 files)
- `src/app/templates/notifications/components/*.tsx` (1 file)
- `src/app/templates/user-management/components/*.tsx` (1 file)
- `src/app/templates/modals/components/*.tsx` (1 file)
- `src/app/templates/email-templates/components/*.tsx` (3 files)
- `src/app/templates/documentation/components/*.tsx` (2 files)
- `src/components/landing/pricing-section.tsx`
- `src/app/docs/components/*.tsx` (7 files)

### Pattern B: Bracket Style (Terminal Aesthetic)
```tsx
<div className="border-b border-border px-4 py-2">
  <span className="font-mono text-xs text-muted-foreground">
    [ [0x00] ACTIVITY_LOG ]
  </span>
</div>
```

**Found in:**
- `src/components/ui/card.tsx` (TerminalCardHeader component)
- `src/components/docs/blocks/*.tsx`
- Some template pages (after recent migrations)

---

## ALL PATTERNS DOCUMENTED

### 1. TERMINAL/CARD HEADERS

| Pattern | Format | File Count | Status |
|---------|--------|------------|--------|
| Colored Dots | `■ ■ ■ filename` | 46+ | **DEPRECATED** |
| Hex Bracket | `[ [0xXX] TITLE ]` | 20+ | **STANDARD** |
| Simple Bracket | `[ title ]` | 5+ | Acceptable |
| Label Only | `[LABEL]:` | 30+ | For inline labels |

### 2. CARD/CONTAINER PATTERNS

| Pattern | Code | Usage |
|---------|------|-------|
| Standard Card | `border border-border bg-card` | 50+ files |
| TerminalCard | Component from card.tsx | Docs, some templates |
| DocsCard | Header + content split | Documentation |
| DocsPreview | Header + preview + code | Component showcases |
| DocsCallout | Colored variant cards | Info/warning/tip/danger |
| Alert Box | Colored border + bg | Warnings, errors |

### 3. BUTTON PATTERNS

| Pattern | Format | Usage |
|---------|--------|-------|
| Standard | `<Button>Text</Button>` | General actions |
| Command Style | `<Button>> ACTION_NAME</Button>` | Primary actions |
| With Icon | `<Button><Icon /> Text</Button>` | Actions with icons |

**Variants:** default, destructive, outline, secondary, ghost, link, primaryCta, secondaryCta, ghostOnDark

### 4. LABEL PATTERNS

| Pattern | Format | Usage |
|---------|--------|-------|
| Bracket Label | `[LABEL]:` | Section headers |
| Status Label | `<span className="text-success">ACTIVE</span>` | Status indicators |
| List Indicator | `> Feature text` | Feature lists |

### 5. BADGE PATTERNS

| Pattern | Format | Usage |
|---------|--------|-------|
| Badge Component | `<Badge variant="...">` | Tags, status |
| Terminal Badge | `[TEMPLATE]: NAME` | Page headers |
| Notification Badge | Outline + uppercase | Notification types |

---

## COMPONENTS THAT NEED MIGRATION

### Priority 1: Template Components (46 files with colored dots)

```
src/app/templates/
├── team-dashboard/components/
│   ├── role-permissions.tsx
│   ├── pending-invitations.tsx
│   ├── members-table.tsx
│   ├── invite-section.tsx ← Screenshot showed this
│   ├── implementation-note.tsx
│   └── ...
├── billing-dashboard/components/
│   ├── usage-metrics-card.tsx
│   ├── template-features-card.tsx
│   ├── recent-invoices-card.tsx
│   ├── plan-cards.tsx
│   ├── payment-methods-card.tsx
│   ├── current-plan-card.tsx
│   └── billing-history-table.tsx
├── pricing-page/components/
│   ├── pricing-cards.tsx
│   ├── features-card.tsx
│   ├── faq-section.tsx
│   └── comparison-table.tsx
├── search-results/components/
│   ├── search-bar.tsx
│   ├── results-header.tsx
│   ├── pagination.tsx
│   ├── filters-sidebar.tsx
│   └── features-card.tsx
├── security-privacy/components/
│   ├── security-tab.tsx
│   ├── privacy-tab.tsx
│   ├── implementation-note.tsx
│   ├── compliance-tab.tsx
│   └── audit-tab.tsx
├── settings-page/components/
│   └── terminal-window.tsx
├── profile/components/
│   ├── profile-tabs.tsx
│   └── badges-section.tsx
├── notifications/components/
│   └── notification-item.tsx
├── user-management/components/
│   └── features-note.tsx
├── modals/components/
│   └── pattern-comparison.tsx
├── email-templates/components/
│   ├── email-tab-navigation.tsx
│   ├── email-preview.tsx
│   └── email-features.tsx
└── documentation/components/
    ├── template-features.tsx
    └── table-of-contents.tsx
```

### Priority 2: Landing/Marketing Components

```
src/components/landing/
└── pricing-section.tsx
```

### Priority 3: Docs Pages with Inline Patterns

```
src/app/docs/components/
├── autocomplete/page.tsx
├── simple-icon/page.tsx
├── label/page.tsx
├── hero/page.tsx
├── form/page.tsx
├── form-error/page.tsx
└── footer/page.tsx

src/app/docs/features/
└── cookie-consent/page.tsx
```

---

## UNIFIED STANDARD (TARGET STATE)

### Terminal Card Header
Use `TerminalCardHeader` from `@/components/ui/card`:
```tsx
import { TerminalCard, TerminalCardHeader } from "@/components/ui/card";

<TerminalCard>
  <TerminalCardHeader code="0x00" title="SECTION_NAME" />
  <div className="p-4">
    {/* content */}
  </div>
</TerminalCard>
```

### For Simple Headers (no card wrapper needed)
```tsx
<div className="border-b border-border px-4 py-2">
  <span className="font-mono text-xs text-muted-foreground">
    [ filename.ext ]
  </span>
</div>
```

### For Terminal Output Windows
Use `TerminalOutput` from `@/components/ui/card`:
```tsx
import { TerminalOutput } from "@/components/ui/card";

<TerminalOutput title="terminal">
  {/* output lines */}
</TerminalOutput>
```

---

## MIGRATION CHECKLIST

- [ ] Fix 46 template component files (colored dots → bracket headers)
- [ ] Fix 1 landing component (pricing-section.tsx)
- [ ] Fix 8 docs pages with inline patterns
- [ ] Verify all components use design tokens (no hardcoded colors)
- [ ] Verify all cards use `border-border bg-card`
- [ ] Verify all buttons follow command style (`> ACTION_NAME`)
- [ ] Remove unused CSS utilities from globals.css

---

## COLOR TOKENS (REFERENCE)

```css
/* Backgrounds */
bg-background, bg-card, bg-muted, bg-primary, bg-secondary, bg-destructive

/* Text */
text-foreground, text-muted-foreground, text-primary, text-destructive, text-success, text-warning

/* Borders */
border-border, border-primary

/* Semantic (with opacity) */
bg-destructive/50, bg-warning/50, bg-success/50, bg-primary/5, etc.
```

---

## TYPOGRAPHY TOKENS (REFERENCE)

```css
/* All terminal UI uses */
font-mono text-xs

/* Headers */
font-mono text-xs text-muted-foreground

/* Large numbers */
text-2xl, text-3xl font-bold

/* Body text */
font-mono text-sm
```

---

## SPACING TOKENS (REFERENCE)

```css
/* Card header */
px-4 py-2

/* Card content */
p-4

/* Gaps */
gap-2, gap-4, gap-6

/* Margins */
mb-1, mb-4, mt-4
```
