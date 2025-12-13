# Audit Patterns: Critical & High

Regex patterns for CRITICAL and HIGH severity violations.

---

## Color Violations (CRITICAL)

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
```

---

## Shape & Border (HIGH)

```bash
# Banned rounded corners
rounded-(?:sm|md|lg|xl|2xl|3xl|full|\[)
# Exception: rounded-full ONLY in traffic light dots

# Missing rounded-none on components
<Button(?![^>]*rounded-none)
<Input(?![^>]*rounded-none)
<Card(?![^>]*rounded-none)
<Dialog(?![^>]*rounded-none)

# Banned shadows
shadow-(?:md|lg|xl|2xl|inner)
drop-shadow-(?:md|lg|xl|2xl)
```

---

## Accessibility (CRITICAL)

```bash
# Missing aria-label on icon-only buttons
<Button(?=[^>]*size="icon")(?![^>]*aria-label)

# Outline removal without focus-visible
outline-none(?![^"]*focus-visible)

# Missing alt on images
<img(?![^>]*alt=)
<Image(?![^>]*alt=)

# Missing label association
<input(?![^>]*id=)(?![^>]*aria-label)
<Label(?![^>]*htmlFor)

# Missing role on interactive divs
onClick(?![^>]*role=)
```

---

## Security (CRITICAL)

```bash
# Direct env access
process\.env\.(?!NODE_ENV)

# Dangerous patterns
dangerouslySetInnerHTML(?![^}]*sanitize)
eval\s*\(
new\s+Function\s*\(
innerHTML\s*=

# Exposed secrets
(api[_-]?key|secret|password|token|auth)["\s]*[:=]["\s]*["\'][^"\']+["\']

# External links without noopener (XSS risk)
target="_blank"(?![^>]*rel="noopener)

# Missing DOMPurify on user content
dangerouslySetInnerHTML=\{\{__html:\s*(?!DOMPurify)

# API error responses leaking internals
return.*json.*error.*stack|return.*json.*error.*message.*Error

# Raw user input in URLs
href=\{`.*\$\{(?!encodeURIComponent)
src=\{`.*\$\{(?!encodeURIComponent)

# console.log in production code
console\.(log|debug|info)\(

# Unvalidated redirects
redirect\(\s*(?!\/|http)
window\.location\s*=\s*(?!["']\/)
```

### Security Quick Commands

```bash
# External links without rel="noopener noreferrer"
grep -rE 'target="_blank"' src --include="*.tsx" | grep -v 'rel="noopener'

# dangerouslySetInnerHTML without sanitization
grep -rE 'dangerouslySetInnerHTML' src --include="*.tsx" | grep -v 'DOMPurify\|sanitize'

# Console logs (should be removed in production)
grep -rE 'console\.(log|debug|info)\(' src --include="*.tsx" | grep -v '// DEBUG'

# Direct process.env access (use env.ts wrapper)
grep -rE 'process\.env\.' src --include="*.tsx" | grep -v 'NODE_ENV'

# Unencoded user input in URLs
grep -rE 'href=\{`|src=\{`' src --include="*.tsx" | grep -v 'encodeURIComponent'
```

---

## Typography (HIGH)

```bash
# Missing font-mono on UI elements
<Button(?![^>]*font-mono)
<span(?=.*\[.*\]:)(?![^>]*font-mono)

# Sans font in wrong places
font-sans(?=.*<Button|<Input|<Label)
```

---

## Template/Docs (HIGH)

```bash
# DocsCard without title prop
<DocsCard(?![^>]*title=)

# DocsPreview without title
<DocsPreview(?![^>]*title=)
```

---

## Quick Commands

```bash
# All critical violations
grep -rE "#[0-9a-fA-F]{3,8}|shadow-(md|lg|xl)|dangerouslySetInnerHTML" src/ --include="*.tsx"

# All rounded corner violations
grep -rE "rounded-(sm|md|lg|xl|2xl|3xl)" src/app src/components --include="*.tsx"

# All accessibility issues
grep -rE "outline-none(?!.*focus)|<img(?!.*alt=)|<Button.*size=\"icon\"(?!.*aria)" src/ --include="*.tsx"
```
