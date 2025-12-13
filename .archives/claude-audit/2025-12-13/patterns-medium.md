# Audit Patterns: Medium & Low

Regex patterns for MEDIUM and LOW severity violations.

---

## Code Quality (MEDIUM)

```bash
# Console statements
console\.(log|warn|error|info|debug|trace|table|dir)

# TODO/FIXME comments
//\s*(TODO|FIXME|HACK|XXX|BUG|TEMP|REMOVE)
/\*\s*(TODO|FIXME|HACK|XXX)

# TypeScript escape hatches
@ts-ignore
@ts-expect-error
as\s+any(?!\s*\/\/)
:\s*any(?!\s*\/\/)
```

---

## Spacing (MEDIUM)

```bash
# Non-standard spacing (should use 4px/8px multiples)
(p|m|gap|space)-(3|5|7|9|11|13|14|15)(?![0-9])

# Inconsistent section spacing
space-y-(?!2|4|6|8|12|16)

# Raw pixel values
(padding|margin|gap):\s*\d+px
```

---

## Animation (MEDIUM)

```bash
# Missing transition on interactive elements
(hover:|focus:)(?![^"]*transition)

# Animation without reduced-motion
animate-(?!none)(?![^"]*motion-safe)

# Long transitions (> 300ms)
duration-(?:500|700|1000)

# Missing transition-colors on hover:bg
hover:bg-(?![^"]*transition)
```

---

## Performance (MEDIUM)

```bash
# Missing React.memo on list items
map\(.*=>\s*<(?!React\.memo)

# Missing key prop
\.map\([^)]*\)\s*=>\s*<(?![^>]*key=)

# Large inline objects
<\w+[^>]*=\s*\{[\s\S]{100,}\}
```

---

## Modularity (MEDIUM)

```bash
# Too many imports (> 15)
^import.*from.*\n(?=.*\n.*import){15,}

# Deep imports (prefer barrel exports)
from\s+["']@/components/ui/[^/]+/[^/]+["']
```

---

## Responsive (HIGH)

```bash
# Fixed widths without responsive
w-\[\d+px\](?![^"]*md:|lg:)

# Text size without responsive
text-(3xl|4xl|5xl)(?![^"]*md:|sm:)

# Grid columns without responsive
grid-cols-(?:3|4|5|6)(?![^"]*md:|lg:|sm:)

# Missing mobile-first
md:flex(?!.*flex)
lg:grid(?!.*grid)
```

---

## Framer Motion (MEDIUM)

```bash
# Missing AnimatePresence for exit
<motion\.(?![^>]*exit=).*animate=

# Animation without initial state
<motion\.(?![^>]*initial=).*animate=

# Missing layout for reordering
\.map\(.*<motion\.(?![^>]*layout)
```

---

## Radix UI (HIGH)

```bash
# Missing asChild for composition
<(Button|Link)(?=[^>]*href=)(?![^>]*asChild)

# Missing onOpenChange
<(Dialog|Sheet|Popover)(?![^>]*onOpenChange)

# Tabs without defaultValue
<Tabs(?![^>]*defaultValue)
```

---

## Import/Module (LOW)

```bash
# Wrong import order
^import(?!.*react).*\n.*import.*react

# Wildcard imports
import\s+\*\s+as

# Deep imports
from\s+["']@/components/ui/[^/]+/[^/]+["']
```

---

## Quick Commands

```bash
# All code quality issues
grep -rE "console\.(log|error|warn)|@ts-ignore|TODO|FIXME" src/ --include="*.tsx"

# Comprehensive single command
grep -rE "(bg|text)-(red|blue|gray|white|black)-|rounded-(md|lg)|shadow-(md|lg)|console\.log|@ts-ignore" src/ --include="*.tsx" --include="*.ts" | wc -l
```
