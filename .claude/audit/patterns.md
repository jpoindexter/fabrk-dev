# Audit Patterns

Regex patterns for finding design system violations. Use with `grep -rE` or IDE search.

---

## 1. Color Violations (CRITICAL)

```bash
# Hardcoded hex colors
#[0-9a-fA-F]{3,8}

# Raw color functions
rgb\(|rgba\(|hsl\(|hsla\(|oklch\([^v]

# Tailwind color palette classes (banned)
(bg|text|border|ring|outline|fill|stroke)-(red|blue|green|yellow|purple|pink|orange|gray|slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose)-\d+

# White/black hardcoded
(bg|text|border)-white(?!\s*/)
(bg|text|border)-black(?!\s*/)

# Opacity with wrong base
/(bg|text)-\w+-\d+\/\d+/
```

---

## 2. Shape & Border Violations (HIGH)

```bash
# Banned rounded corners
rounded-(?:sm|md|lg|xl|2xl|3xl|full|\[)
# Exception: rounded-full ONLY in traffic light dots
# Exception: rounded-none is REQUIRED

# Missing rounded-none on components
<Button(?![^>]*rounded-none)
<Input(?![^>]*rounded-none)
<Card(?![^>]*rounded-none)
<Dialog(?![^>]*rounded-none)
<Sheet(?![^>]*rounded-none)
<Select(?![^>]*rounded-none)
<Textarea(?![^>]*rounded-none)
<Popover(?![^>]*rounded-none)

# Banned shadows
shadow-(?:md|lg|xl|2xl|inner)
drop-shadow-(?:md|lg|xl|2xl)
```

---

## 3. Typography Violations (HIGH)

```bash
# Missing font-mono on UI elements
<Button(?![^>]*font-mono)
<span(?=.*\[.*\]:)(?![^>]*font-mono)  # Labels like [EMAIL]:

# Wrong text sizes for terminal
text-(?:base|lg|xl|2xl|3xl|4xl)(?![^>]*font-sans)  # Should use text-xs/text-sm with font-mono

# Sans font in wrong places (should be mono)
font-sans(?=.*<Button|<Input|<Label)
```

---

## 4. Component Violations (HIGH)

```bash
# Native HTML instead of UI components
<button(?!\s+type=)
<input(?!\s+type="hidden)
<select\s+
<textarea(?!\s+disabled)
<a\s+href(?![^>]*className)

# Missing cn() utility for className merging
className=\{`[^`]*\$\{  # Template literal className
className=\{[^c][^n]    # className without cn()

# Missing displayName on forwardRef
forwardRef(?![\s\S]*displayName)

# Missing data-slot attribute
<(button|input|div|span)(?![^>]*data-slot)
```

---

## 5. Accessibility Violations (CRITICAL)

```bash
# Missing aria-label on icon-only buttons
<Button(?=[^>]*size="icon")(?![^>]*aria-label)
<button(?=[^>]*<.*Icon)(?![^>]*aria-label)

# Outline removal without focus-visible
outline-none(?![^"]*focus-visible)
outline-0(?![^"]*focus-visible)

# Missing alt on images
<img(?![^>]*alt=)
<Image(?![^>]*alt=)

# Missing label association
<input(?![^>]*id=)(?![^>]*aria-label)
<Label(?![^>]*htmlFor)

# Empty links
<a[^>]*>\s*</a>
href="#"(?![^>]*aria)
href="javascript:"

# Missing role on interactive divs
onClick(?![^>]*role=)

# Tab index issues
tabIndex="-1"(?![^>]*aria-hidden)
tabindex="[2-9]|[1-9]\d+"  # tabIndex > 1

# Missing heading hierarchy
<h3(?![\s\S]*<h2)  # h3 without h2
<h4(?![\s\S]*<h3)  # h4 without h3
```

---

## 6. Template & Documentation Violations (HIGH)

```bash
# Missing template usage in docs
src/app/docs/.*page\.tsx(?![\s\S]*Template)

# DocsCard without title prop
<DocsCard(?![^>]*title=)

# DocsPreview without proper structure
<DocsPreview(?![^>]*title=)

# Wrapper divs in preview (should be direct component)
mainPreview:\s*\{[\s\S]*preview:\s*<div
```

---

## 7. Code Quality Violations (MEDIUM)

```bash
# Console statements
console\.(log|warn|error|info|debug|trace|table|dir)

# TODO/FIXME comments
//\s*(TODO|FIXME|HACK|XXX|BUG|TEMP|REMOVE)
/\*\s*(TODO|FIXME|HACK|XXX)

# TypeScript escape hatches
@ts-ignore
@ts-expect-error
@ts-nocheck
as\s+any(?!\s*\/\/)  # `as any` without comment
:\s*any(?!\s*\/\/)   # `: any` without comment

# Unused variables (let ESLint catch, but flag)
^(const|let|var)\s+_\w+\s*=

# Large commented blocks
^(\s*//.*\n){3,}  # 3+ consecutive comment lines
```

---

## 8. Security Violations (CRITICAL)

```bash
# Direct env access
process\.env\.(?!NODE_ENV)

# Dangerous patterns
dangerouslySetInnerHTML(?![^}]*sanitize)
eval\s*\(
new\s+Function\s*\(
innerHTML\s*=
outerHTML\s*=

# Exposed secrets patterns
(api[_-]?key|secret|password|token|auth)["\s]*[:=]["\s]*["\'][^"\']+["\']

# SQL injection risk
`.*\$\{.*\}.*(?:SELECT|INSERT|UPDATE|DELETE|DROP)`i
```

---

## 9. Performance Violations (MEDIUM)

```bash
# Missing React.memo on list items
map\(.*=>\s*<(?!React\.memo)

# Missing useCallback on handlers passed to children
on[A-Z]\w+\s*=\s*\{(?!useCallback|\(\)\s*=>)

# Missing useMemo on expensive computations
\.filter\(.*\.map\((?![\s\S]*useMemo)

# Large inline objects/arrays in render
<\w+[^>]*=\s*\{[\s\S]{100,}\}

# Missing key prop
\.map\([^)]*\)\s*=>\s*<(?![^>]*key=)
```

---

## 10. Modular Design Violations (MEDIUM)

```bash
# File too long (check with wc -l)
# Files > 300 lines need splitting

# Too many imports (> 15 indicates poor modularity)
^import.*from.*\n(?=.*\n.*import){15,}

# Prop drilling (passing same prop through 3+ levels)
# Manual review required

# Missing barrel exports
# Check for index.ts in component folders
```

---

## 11. Enterprise Patterns (HIGH)

```bash
# Missing error boundary
# Check: src/app/**/error.tsx exists for each route

# Missing loading state
# Check: src/app/**/loading.tsx exists for each route

# Direct fetch without error handling
fetch\([^)]+\)(?![\s\S]*\.catch)
await\s+fetch(?![\s\S]*try)

# Missing Suspense boundaries
<(?!Suspense).*lazy\(
```

---

## Quick Scan Commands

```bash
# All critical violations
grep -rE "#[0-9a-fA-F]{3,8}|shadow-(md|lg|xl)|dangerouslySetInnerHTML" src/ --include="*.tsx"

# All rounded corner violations
grep -rE "rounded-(sm|md|lg|xl|2xl|3xl)" src/app src/components --include="*.tsx"

# All accessibility issues
grep -rE "outline-none(?!.*focus)|<img(?!.*alt=)|<Button.*size=\"icon\"(?!.*aria)" src/ --include="*.tsx"

# All code quality issues
grep -rE "console\.(log|error|warn)|@ts-ignore|TODO|FIXME" src/ --include="*.tsx"

# Built-in scan
npm run scan:hex    # Hardcoded colors
npm run lint        # ESLint (includes a11y rules)
npm run type-check  # TypeScript errors
```

---

## Pattern Testing

Test patterns at: https://regex101.com/

Always verify patterns don't have false positives before running bulk fixes.
