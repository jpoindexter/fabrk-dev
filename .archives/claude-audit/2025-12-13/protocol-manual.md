# Audit Protocol: Manual Review

Phase 3-4 of the audit execution process: WCAG and Design System review.

---

## Phase 3: WCAG 2.1 AA Audit

See [`accessibility.md`](accessibility.md) for full WCAG requirements.

### 3.1 Perceivable (1.x)

```bash
# Images without alt
grep -rn "<img\|<Image" src/ --include="*.tsx" | grep -v "alt="

# Icon buttons without aria-label
grep -rn 'size="icon"' src/ --include="*.tsx" | grep -v "aria-label"

# Fixed pixel fonts
grep -rn "fontSize:" src/ --include="*.tsx" | grep "px"
```

Checklist:
- [ ] All images have alt text
- [ ] Icon buttons have aria-label
- [ ] Contrast meets 4.5:1 (text) / 3:1 (UI)
- [ ] Text scales to 200%

### 3.2 Operable (2.x)

```bash
# Click without keyboard
grep -rn "onClick" src/ --include="*.tsx" | grep "<div\|<span" | grep -v "role=\|tabIndex\|onKeyDown"

# Outline removal
grep -rn "outline-none\|outline-0" src/ --include="*.tsx" | grep -v "focus-visible"

# Skip links
grep -rn "skip" src/app/layout.tsx
```

Checklist:
- [ ] All interactive elements focusable
- [ ] Focus indicators visible
- [ ] No keyboard traps
- [ ] Skip links present

### 3.3 Understandable (3.x)

```bash
# Error patterns
grep -rn "aria-invalid" src/ --include="*.tsx"
grep -rn 'role="alert"' src/ --include="*.tsx"

# Labels
grep -rn "<Input\|<input" src/ --include="*.tsx" | grep -v "id=\|aria-label"
```

Checklist:
- [ ] Form errors have aria-invalid
- [ ] Errors announced via role="alert"
- [ ] All inputs have labels

### 3.4 Robust (4.x)

```bash
npm run lint
npm run type-check
```

Checklist:
- [ ] No duplicate IDs
- [ ] Valid HTML nesting
- [ ] TypeScript passes

---

## Phase 4: Design System Audit

### 4.1 Colors

```bash
npm run scan:hex
grep -rE "(bg|text|border)-(red|blue|green|gray|slate|purple)-\d+" src/ --include="*.tsx"
grep -rn "bg-white\|text-white\|bg-black\|text-black" src/ --include="*.tsx"
```

Checklist:
- [ ] No hardcoded hex colors
- [ ] No Tailwind palette classes
- [ ] All colors use design tokens
- [ ] Theme switching works

### 4.2 Shapes

```bash
grep -rE "rounded-(sm|md|lg|xl|2xl|3xl)" src/app src/components --include="*.tsx"
grep -rE "shadow-(md|lg|xl|2xl)" src/ --include="*.tsx"
```

Checklist:
- [ ] All elements use rounded-none
- [ ] Only shadow-sm used
- [ ] Traffic lights use rounded-full

### 4.3 Typography

```bash
grep -rn "<Button" src/ --include="*.tsx" | grep -v "font-mono"
grep -rn "\[.*\]:" src/ --include="*.tsx"
```

Checklist:
- [ ] Buttons use font-mono text-xs
- [ ] Buttons use `> ACTION` format
- [ ] Labels use `[LABEL]:` format

### 4.4 Spacing

```bash
grep -rE "(p|m|gap|space)-(3|5|7|9|11|13|14|15)" src/ --include="*.tsx"
```

Checklist:
- [ ] All spacing uses 8-point grid
- [ ] No odd values (p-3, m-5, gap-7)

### 4.5 Interaction

```bash
grep -rn "hover:" src/ --include="*.tsx" | grep -v "transition"
grep -rn "duration-500\|duration-700\|duration-1000" src/ --include="*.tsx"
```

Checklist:
- [ ] All hovers have transitions
- [ ] No transitions > 300ms
- [ ] Click targets ≥ 44px

---

## Phase 5: File Inspection

### Foundation (Verify Only)

```bash
ls src/components/ui/*.tsx | head -20
cat src/app/globals.css | head -100
```

- [ ] Design tokens present
- [ ] cn() utility exported

### Layouts

```bash
find src/app -name "layout.tsx" -exec echo "=== {} ===" \; -exec head -50 {} \;
```

- [ ] Theme provider wraps content
- [ ] Skip links present

### Visual Check

- [ ] Landing page at localhost:3000
- [ ] Mobile responsive (320px, 768px, 1024px)
- [ ] Dark/light theme switching
