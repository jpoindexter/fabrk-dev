# DOCS PAGE STYLE AUDIT

**Total Pages:** 55
**Generated:** 2025-11-29

---

## INCONSISTENCY SUMMARY

### KEY FINDING: Badge div inconsistency is causing the visual differences

The screenshots show google-oauth has more spacing above the H1 than magic-links because:
- **google-oauth** uses `mb-4 inline-block...` on the badge (adds margin-bottom)
- **magic-links** uses `inline-block...` without `mb-4` (no margin-bottom)

But magic-links has `space-y-4` on the header wrapper which adds spacing between children.
So the visual difference is caused by conflicting spacing approaches.

---

## HEADER_WRAPPER VARIANTS (2 patterns)

| Pattern | Pages | Notes |
|---------|-------|-------|
| `space-y-4` | 14 | ✅ CANONICAL - uses space-y for child spacing |
| `space-y-2` | 4 | ❌ Different spacing |

**Pages with `space-y-2` (need fixing):**
- features/cloud-storage
- features/payments
- features/trial
- tutorials/authentication

---

## BADGE_DIV VARIANTS (3 patterns)

| Pattern | Pages | Notes |
|---------|-------|-------|
| `mb-4 inline-block border border-border bg-card px-3 py-1` | 35 | Has margin-bottom |
| `inline-block border border-border bg-card px-3 py-1` | 12 | ✅ CANONICAL - no mb-4, relies on space-y-4 |
| `mb-4 inline-block border border-border bg-card px-2 py-1` | 6 | Has px-2 instead of px-3 |

**Key Insight:** The 12 pages with the canonical pattern ALL have `header_wrapper: space-y-4`.
The 35 pages with `mb-4` do NOT have a header_wrapper (they rely on mb-4 for spacing).

---

## DESCRIPTION_P VARIANTS (4 patterns)

| Pattern | Pages | Notes |
|---------|-------|-------|
| `font-mono text-sm text-muted-foreground leading-relaxed` | 37 | ✅ CANONICAL |
| `mt-2 font-mono text-sm text-muted-foreground leading-relaxed` | 8 | Has mt-2 |
| `font-mono text-sm text-muted-foreground mt-2` | 6 | Has mt-2, no leading-relaxed |
| `font-mono text-sm text-muted-foreground` | 2 | Missing leading-relaxed |

---

## H2 VARIANTS (3 patterns)

| Pattern | Pages | Notes |
|---------|-------|-------|
| `font-mono text-lg font-bold text-primary` | 30 | ✅ CANONICAL |
| `font-mono text-lg font-bold text-primary mb-4` | 17 | Has mb-4 |
| `font-mono text-lg font-bold text-primary mb-3` | 7 | Has mb-3 |

---

## H3 VARIANTS (12 patterns!)

| Pattern | Pages |
|---------|-------|
| `font-mono text-base font-semibold text-foreground` | 22 |
| `mb-2 font-mono text-base font-semibold text-foreground` | 8 |
| `font-mono font-medium` | 4 |
| `mb-2 font-mono font-semibold` | 3 |
| `mb-2 font-semibold` | 2 |
| `font-mono text-base font-semibold text-foreground mb-2` | 1 |
| `font-mono text-lg font-bold` | 1 |
| `font-mono mb-2 text-xs font-semibold` | 1 |
| `font-mono font-medium text-destructive` | 1 |
| `font-semibold` | 1 |
| `font-mono text-base font-semibold text-foreground mb-3` | 1 |
| `font-mono font-semibold mb-2` | 1 |

**✅ CANONICAL:** `font-mono text-base font-semibold text-foreground`

---

## CANONICAL PATTERN (from getting-started)

This is the pattern ALL docs pages should follow:

```tsx
export default function ExamplePage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0xNN] SECTION ] PAGE_NAME</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">PAGE_TITLE</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Description text here.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold text-primary">SECTION_TITLE</h2>
          {/* content */}
        </CardContent>
      </Card>

      <section>
        <h2 className="font-mono text-lg font-bold text-primary">ANOTHER_SECTION</h2>
        {/* content */}
      </section>
    </div>
  );
}
```

### Key Elements:

| Element | Class |
|---------|-------|
| **Root wrapper** | `space-y-16` |
| **Header wrapper** | `space-y-4` |
| **Badge div** | `inline-block border border-border bg-card px-3 py-1` |
| **Badge span** | `font-mono text-sm text-muted-foreground` |
| **H1** | `font-mono text-2xl font-bold tracking-tight lg:text-3xl` |
| **Description** | `font-mono text-sm text-muted-foreground leading-relaxed` |
| **H2** | `font-mono text-lg font-bold text-primary` |
| **H3** | `font-mono text-base font-semibold text-foreground` |
| **Card** | `rounded-none` |

---

## PAGES NEEDING FIXES

### Missing Header Wrapper (need `{/* Header */}<div className="space-y-4">`)
These pages use `mb-4` on badge instead of proper header wrapper:

- architecture
- components/buttons
- components/charts
- components/data-display
- components/faq
- components/features
- components/footer
- components/forms
- components/hero
- components/modals
- components/navigation
- components/overview
- components/pricing
- components/testimonials
- components/uploads
- deployment/database
- deployment/environment
- deployment/vercel
- extras/testing
- extras/theming
- features/cloud-storage (also has space-y-2)
- features/cookie-consent
- features/database
- features/google-oauth
- features/mfa
- features/payments (also has space-y-2)
- features/trial (also has space-y-2)
- launch/checklist
- security/audit-logging
- security/bot-protection
- security/csrf
- security/headers
- security/rate-limiting
- security/validation
- tutorials/api-routes
- tutorials/email-templates
- tutorials/file-uploads
- tutorials/protected-pages
- tutorials/quick-start
- tutorials/stripe-payments
- tutorials/webhooks

### Description missing `leading-relaxed`
- features/database
- features/google-oauth

### Wrong header wrapper spacing (`space-y-2` instead of `space-y-4`)
- features/cloud-storage
- features/payments
- features/trial
- tutorials/authentication

---

## FIX STRATEGY

1. **Standardize header wrapper**: Add `{/* Header */}<div className="space-y-4">` to all pages
2. **Remove `mb-4` from badge div**: Use `inline-block border border-border bg-card px-3 py-1`
3. **Standardize badge padding**: Use `px-3 py-1` (not `px-2 py-1`)
4. **Add `leading-relaxed`** to all description paragraphs
5. **Standardize H2**: Use `font-mono text-lg font-bold text-primary` (no mb-4)
6. **Standardize H3**: Use `font-mono text-base font-semibold text-foreground`
