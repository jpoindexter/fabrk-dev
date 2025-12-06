# Design System Audit: Google OAuth Documentation

**Route:** `/docs/features/google-oauth`
**File:** `src/app/docs/features/google-oauth/page.tsx`
**Category:** Feature Documentation
**Status:** ✅ ACCEPTABLE (SVG Logo Colors)

## Purpose
Feature guide explaining how to set up Google OAuth authentication with proper Google branding.

## Key Components
- FeatureGuideTemplate
- DocsSection, DocsCard

## Violations Found

### Hex Colors (4 instances)
**Lines:** 116, 120, 124, 128
**Context:** Google logo SVG path fill colors

```tsx
<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
  <path fill="#4285F4" d="..." />  {/* Blue */}
  <path fill="#34A853" d="..." />  {/* Green */}
  <path fill="#FBBC05" d="..." />  {/* Yellow */}
  <path fill="#EA4335" d="..." />  {/* Red */}
</svg>
```

**Severity:** ⚠️ WARNING
**Verdict:** **ACCEPTABLE - Brand logo requirement**

### Justification
1. **Brand Guidelines**: Google's official brand guidelines require exact colors for their logo
2. **Legal/Trademark**: Using incorrect Google logo colors violates brand usage terms
3. **Official Colors**: These are Google's mandated brand colors:
   - `#4285F4` - Google Blue
   - `#34A853` - Google Green
   - `#FBBC05` - Google Yellow
   - `#EA4335` - Google Red
4. **SVG Context**: Logo SVG fills cannot use CSS variables

### Google Brand Guidelines
From [Google Brand Resource Center](https://about.google/brand-resources/):
> "Use the correct logo colors. Do not alter the logo colors."

**Required Colors:**
```
Blue:   #4285F4 (or equivalent)
Green:  #34A853
Yellow: #FBBC05
Red:    #EA4335
```

### Why Logo Colors are Different
- ❌ **UI Components**: Use design tokens for themability
- ✅ **Brand Logos**: Use exact brand colors for legal compliance
- Examples: Google, GitHub, Twitter, Facebook logos all require specific hex colors

## Recommendation
**NO ACTION REQUIRED** - This is legally required for Google branding.

**Best Practice**: Add a comment explaining the exception:
```tsx
{/* Google logo - brand colors required by Google Brand Guidelines */}
{/* eslint-disable-next-line design-system/no-hardcoded-colors -- Google brand requirement */}
<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
  <path fill="#4285F4" d="..." />
  <path fill="#34A853" d="..." />
  <path fill="#FBBC05" d="..." />
  <path fill="#EA4335" d="..." />
</svg>
```

## Alternative Considered
**Could we use CSS variables?**
```tsx
/* globals.css */
:root {
  --google-blue: #4285F4;
  --google-green: #34A853;
}

/* SVG */
<path fill="var(--google-blue)" />
```

**Verdict**: Not recommended
- Adds unnecessary complexity for a static brand asset
- SVG inline `fill` with hex is industry standard for logos
- Would require extra CSS just to satisfy a linter

## Terminal Design Compliance
The page itself follows terminal design:
- ✅ Uses FeatureGuideTemplate
- ✅ All UI styling uses design tokens
- ✅ Terminal-style code blocks
- ✅ Monospace fonts throughout
- Only exception: Google logo (required)

## Similar Cases in Codebase
This pattern appears for all third-party logos:
- Google (this page)
- GitHub logo (if implemented)
- Stripe logo (if implemented)
- Any other OAuth provider logos

All should use official brand colors as per their brand guidelines.

## Notes
This is **industry-standard practice**:
- Every SaaS uses exact brand colors for OAuth provider buttons
- Changing logo colors would violate brand usage terms
- Users expect to see familiar brand colors (trust signal)
