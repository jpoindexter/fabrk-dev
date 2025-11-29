# FABRK TYPOGRAPHY SYSTEM

**Source:** fabrk_3.json crawl (81 pages)
**Crawled:** 2025-11-29T20:45:40.768Z

---

## CSS VARIABLES

### Fonts (11)
```css
--default-font-family
--default-mono-font-family
--font-geist-sans
--font-jetbrains-mono
--font-mono
--font-sans
--font-weight-black
--font-weight-bold
--font-weight-medium
--font-weight-normal
--font-weight-semibold
```

### Text Sizes (26)
```css
--text-xs, --text-xs--line-height
--text-sm, --text-sm--line-height
--text-base, --text-base--line-height
--text-lg, --text-lg--line-height
--text-xl, --text-xl--line-height
--text-2xl, --text-2xl--line-height
--text-3xl, --text-3xl--line-height
--text-4xl, --text-4xl--line-height
--text-5xl, --text-5xl--line-height
--text-6xl, --text-6xl--line-height
--text-7xl, --text-7xl--line-height
--text-8xl, --text-8xl--line-height
--text-9xl, --text-9xl--line-height
```

### Line Heights
```css
--leading-tight
--leading-snug
--leading-normal
--leading-relaxed
--leading-loose
```

### Letter Spacing
```css
--tracking-tighter
--tracking-tight
--tracking-normal
--tracking-wide
--tracking-wider
--tracking-widest
```

### Colors (62 variables)
```css
/* Semantic Colors */
--background, --foreground
--card, --card-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--success, --success-foreground
--warning, --warning-foreground
--info, --info-foreground
--border, --input, --ring

/* Chart Colors */
--chart-1, --chart-2, --chart-3, --chart-4, --chart-5
```

### Border Radius (6)
```css
--radius        /* base */
--radius-sm
--radius-md
--radius-lg
--radius-xl
--radius-2xl
```

### Shadows (6)
```css
--shadow-xs
--shadow-sm
--shadow-md
--shadow-lg
--shadow-xl
--shadow-2xl
```

### Layout/Containers (16)
```css
--container-xs, --container-sm, --container-md
--container-lg, --container-xl, --container-2xl
--container-3xl, --container-4xl, --container-5xl
--container-6xl, --container-7xl

--breakpoint-sm, --breakpoint-md, --breakpoint-lg
--breakpoint-xl, --breakpoint-2xl
```

### Animation (8)
```css
--animate-spin, --animate-ping, --animate-pulse, --animate-bounce
--ease-in-out, --ease-out
--default-transition-duration
--default-transition-timing-function
```

---

## FONTS USED

| Font | Usage |
|------|-------|
| `GeistSans` | Primary sans-serif |
| `jetbrainsMono` | Monospace / code |
| `var(--font-mono)` | Terminal aesthetic |
| `var(--font-sans)` | Body text |

---

## COLORS PALETTE

**Total unique colors:** 147

### Primary Palette
- Primary purple tones
- Grays: `#09090b`, `#18181b`, `#333`, `#666`, `#99a1af`
- Semantic: success (`#00c758`), warning, destructive

---

## BORDER RADII

| Value | Usage |
|-------|-------|
| `0` | Terminal/brutalist elements |
| `var(--radius-sm)` | Small elements |
| `var(--radius-md)` | Default |
| `var(--radius-lg)` | Cards |
| `50%` | Circles/avatars |

---

## SPACINGS

Base: `--spacing` variable with calc multipliers:
- `calc(var(--spacing) * 0.5)` to `calc(var(--spacing) * 24)`

---

## ELEMENT STYLES

### H1 (11 patterns - NEEDS STANDARDIZATION)

| Pattern | Count | Usage |
|---------|-------|-------|
| `font-bold font-mono lg:text-3xl text-2xl tracking-tight` | 41 | ✅ Docs canonical |
| `font-semibold text-4xl tracking-tight` | 12 | Dashboard |
| `mb-2 text-muted-foreground text-sm` | 6 | Legal subtitle |
| `font-bold text-3xl` | 4 | Marketing |
| `font-bold text-4xl` | 3 | Templates |
| `font-bold md:text-9xl text-8xl text-foreground tracking-tighter` | 3 | Hero/404 |

**CANONICAL (Docs):** `font-mono text-2xl font-bold tracking-tight lg:text-3xl`

---

### H2 (18 patterns - NEEDS STANDARDIZATION)

| Pattern | Count | Usage |
|---------|-------|-------|
| `font-bold font-mono text-lg text-primary` | 90 | ✅ Docs canonical |
| `font-bold font-mono mb-4 text-lg text-primary` | 33 | ❌ Has extra mb-4 |
| `font-semibold leading-[1.2] text-[20px]...` | 9 | Card titles |
| `font-bold text-lg` | 8 | Dashboard |
| `font-semibold mb-2 text-lg` | 6 | Dashboard |
| `font-bold text-2xl tracking-tight` | 5 | Marketing |
| `font-bold lg:text-4xl mb-4 text-3xl tracking-tight` | 4 | Marketing hero |

**CANONICAL (Docs):** `font-mono text-lg font-bold text-primary`

---

### H3 (24 patterns - NEEDS STANDARDIZATION)

| Pattern | Count | Usage |
|---------|-------|-------|
| `font-mono font-semibold text-base text-foreground` | 47 | ✅ Docs canonical |
| `font-mono font-semibold mb-2 text-base text-foreground` | 12 | Has mb-2 |
| `font-semibold mb-2 text-sm` | 12 | Dashboard |
| `font-mono font-semibold` | 10 | Minimal |
| `font-semibold mb-2 text-lg` | 9 | Dashboard |
| `font-medium font-mono` | 8 | Feature sections |
| `font-mono font-semibold mb-2` | 6 | Mixed |

**CANONICAL (Docs):** `font-mono text-base font-semibold text-foreground`

---

### P / Body Text (28 patterns)

| Pattern | Count | Usage |
|---------|-------|-------|
| `font-mono leading-relaxed text-muted-foreground text-sm` | 88 | ✅ Docs canonical |
| `font-mono mb-4 text-muted-foreground text-sm` | 20 | Has mb-4 |
| `font-mono text-muted-foreground text-sm` | 15 | Missing leading-relaxed |
| `text-muted-foreground text-sm` | 12 | Non-mono |
| `font-mono text-muted-foreground text-xs` | 4 | Small text |

**CANONICAL (Docs):** `font-mono text-sm text-muted-foreground leading-relaxed`

---

### UL / Lists (16 patterns)

| Pattern | Count | Usage |
|---------|-------|-------|
| `font-mono space-y-2 text-xs` | 30 | Terminal tree |
| `font-mono space-y-1 text-muted-foreground text-sm` | 23 | Feature lists |
| `pl-4 space-y-1 text-muted-foreground text-sm` | 12 | Indented |
| `font-mono pl-4 space-y-1 text-muted-foreground text-sm` | 12 | Mono indented |
| `font-mono leading-relaxed space-y-1 text-muted-foreground text-sm` | 10 | Relaxed |

**CANONICAL:** `font-mono text-sm text-muted-foreground space-y-1`

---

### BUTTON (16 patterns)

| Pattern | Count | Notes |
|---------|-------|-------|
| Sidebar nav button | 75 | `flex font-semibold gap-2 hover:text-foreground...` |
| Primary button | 65 | `[&_svg]:pointer-events-none... bg-primary...` |
| Outline button | 15 | `bg-background border...` |
| Ghost button | 15 | `animate-in bg-background border...` |

---

### SPAN (12 patterns)

| Pattern | Count | Usage |
|---------|-------|-------|
| `text-primary text-xs` | 65 | Badge text |
| `font-bold text-sm tracking-tight` | 65 | Logo text |
| `hidden sm:inline text-muted-foreground text-xs` | 65 | Responsive label |
| `punctuation tag token` | 32 | Code syntax |

---

### NAV (7 patterns)

| Pattern | Count | Usage |
|---------|-------|-------|
| `backdrop-blur bg-background/95 border-b...sticky top-0 z-50` | 65 | Main header |
| `p-4 space-y-1` | 41 | Sidebar nav |
| `flex flex-col gap-2` | 17 | Vertical nav |
| `p-4 space-y-6` | 15 | Docs sidebar |

---

### DIV Containers (5 patterns)

| Pattern | Count | Usage |
|---------|-------|-------|
| `container max-w-7xl mx-auto px-6 py-8 space-y-6` | 7 | Full width page |
| `container flex h-16 items-center justify-between...` | 5 | Header container |
| `container lg:px-12 max-w-7xl mx-auto px-6 sm:px-8` | 3 | Marketing section |
| `container max-w-6xl mx-auto px-6 py-8` | 3 | Dashboard page |

---

### MAIN (5 patterns)

| Pattern | Count | Usage |
|---------|-------|-------|
| `container max-w-7xl mx-auto px-6 py-12 space-y-12` | 7 | Templates main |
| `container lg:px-8 mx-auto px-4 py-8 sm:px-6` | 5 | Dashboard main |
| `container font-mono max-w-4xl mx-auto px-6 py-16` | 4 | Legal pages |

---

### INPUT (7 patterns)

**Base:** `bg-background border disabled:cursor-not-allowed disabled:opacity-50 file:bg-transparent...`

---

### TABLE (2 patterns)

| Pattern | Usage |
|---------|-------|
| `text-xs w-full` | Default table |
| `font-mono text-xs w-full` | Code/data table |

---

### FOOTER (1 pattern)

`border-border border-t`

---

## STANDARDIZATION REQUIREMENTS

### Docs Pages (41 total)

**Header Section:**
```tsx
<div className="space-y-16">
  {/* Header */}
  <div className="space-y-4">
    <div className="inline-block border border-border bg-card px-3 py-1">
      <span className="font-mono text-sm text-muted-foreground">[SECTION] TITLE</span>
    </div>
    <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">TITLE</h1>
    <p className="font-mono text-sm text-muted-foreground leading-relaxed">
      &gt; Description
    </p>
  </div>
</div>
```

**Section Headings:**
- H2: `font-mono text-lg font-bold text-primary`
- H3: `font-mono text-base font-semibold text-foreground`

**Body Text:**
- P: `font-mono text-sm text-muted-foreground leading-relaxed`
- UL: `font-mono text-sm text-muted-foreground space-y-1`

**Cards:**
- Card: `rounded-none`
- CardContent: `p-6`

---

### Dashboard Pages

**H1:** `text-4xl font-semibold tracking-tight`
**H2:** `font-bold text-lg` or Card titles
**Body:** `text-muted-foreground text-sm`

---

### Marketing Pages

**H1:** `text-3xl font-bold tracking-tight lg:text-4xl` or larger for hero
**H2:** `text-2xl font-bold tracking-tight`
**Body:** `text-muted-foreground` with appropriate size

---

### Legal Pages

**Container:** `container mx-auto max-w-4xl px-6 py-16 font-mono`
**H2:** `text-lg font-bold`
**Body:** `text-sm text-muted-foreground` (not text-xs)
