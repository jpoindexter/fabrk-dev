# Design: UX Heuristics & Visual Principles

Nielsen's 10 heuristics, Gestalt principles, and visual hierarchy.

---

## WCAG 2.1 AA Quick Reference

| Principle | Guidelines | Key Requirements |
|-----------|------------|------------------|
| **Perceivable** | 1.1-1.4 | Alt text, captions, contrast, resize |
| **Operable** | 2.1-2.5 | Keyboard, timing, seizures, navigation |
| **Understandable** | 3.1-3.3 | Readable, predictable, error assistance |
| **Robust** | 4.1 | Compatible with assistive tech |

---

## UX Heuristics (Nielsen's 10)

| # | Heuristic | Application |
|---|-----------|-------------|
| 1 | **Visibility of System Status** | Loading states, progress indicators, toast notifications |
| 2 | **Match Real World** | Natural language, familiar icons, user terminology |
| 3 | **User Control & Freedom** | Undo/redo, cancel buttons, exit paths, back navigation |
| 4 | **Consistency & Standards** | Design tokens, component patterns, predictable behavior |
| 5 | **Error Prevention** | Validation, confirmation dialogs, constraints |
| 6 | **Recognition over Recall** | Visible options, contextual help, breadcrumbs |
| 7 | **Flexibility & Efficiency** | Shortcuts, customization, progressive disclosure |
| 8 | **Aesthetic & Minimalist** | Essential info only, visual hierarchy, whitespace |
| 9 | **Error Recovery** | Clear messages, specific guidance, recovery actions |
| 10 | **Help & Documentation** | Tooltips, onboarding, searchable docs |

---

## Gestalt Principles

| Principle | Definition | Application |
|-----------|------------|-------------|
| **Proximity** | Elements close together are perceived as related | Group related form fields, card sections |
| **Similarity** | Similar elements are perceived as related | Consistent styling for same-function buttons |
| **Continuity** | Eye follows lines and curves | Align elements, use consistent spacing |
| **Closure** | Mind completes incomplete shapes | Icons can be simplified, implied boundaries |
| **Figure/Ground** | Elements are seen as foreground or background | Contrast between content and background |
| **Common Region** | Elements in same bounded area are grouped | Cards, bordered sections, background colors |

---

## Visual Hierarchy

```
1. SIZE        - Larger = more important
2. COLOR       - High contrast = attention
3. CONTRAST    - Stand out from surroundings
4. SPACING     - Whitespace creates grouping
5. POSITION    - Top-left (LTR) = primary
6. TYPOGRAPHY  - Bold, size, weight
7. IMAGERY     - Images draw attention
8. MOTION      - Animation focuses attention
```

### Typography Hierarchy

| Level | Use | Terminal Style |
|-------|-----|----------------|
| H1 | Page title | `text-4xl font-bold` |
| H2 | Section title | `text-2xl font-semibold` |
| H3 | Subsection | `text-xl font-semibold` |
| H4 | Card title | `text-lg font-bold font-mono` |
| Body | Content | `text-sm font-mono text-muted-foreground` |
| Label | Form labels | `text-xs font-mono text-muted-foreground` |
| Caption | Metadata | `text-xs font-mono text-muted-foreground` |

---

## Color Theory & Psychology

### Semantic Color Meaning

| Color | Semantic Use | Token | Psychology |
|-------|--------------|-------|------------|
| **Primary** | Brand, CTAs, links | `bg-primary` | Trust, action, identity |
| **Success** | Completion, positive | `text-success` | Growth, go, approval |
| **Warning** | Caution, attention | `text-warning` | Alert, proceed carefully |
| **Destructive** | Error, danger, delete | `text-destructive` | Stop, critical, urgent |
| **Info** | Information, neutral | `text-info` | Calm, informational |
| **Muted** | Secondary, disabled | `text-muted-foreground` | De-emphasized |

### Color Accessibility Rules

```tsx
// CRITICAL: Never convey information by color alone

// ✅ CORRECT: Color + icon + text
<div className="text-destructive flex items-center gap-2">
  <AlertCircle className="h-4 w-4" />
  <span>[ERROR]: Invalid email</span>
</div>

// ❌ WRONG: Color only
<p className="text-destructive">Invalid email</p>

// Color blindness considerations:
// - 8% of men, 0.5% of women have color vision deficiency
// - Red-green most common (deuteranopia, protanopia)
// - Use icons, patterns, text labels alongside color
// - Test with color blindness simulators
```

### Contrast Requirements (WCAG)

| Content Type | Minimum Ratio | Example |
|--------------|---------------|---------|
| Normal text (<18px) | 4.5:1 | Body text, labels |
| Large text (>=18px/14px bold) | 3:1 | Headings, buttons |
| UI components | 3:1 | Focus rings, borders |
| Graphical objects | 3:1 | Charts, icons |
| Decorative | None | Background patterns |

---

## UX Checklist

- [ ] System status visible (loading, progress)
- [ ] Language matches user's world
- [ ] Easy to undo/cancel/exit
- [ ] Consistent with design system
- [ ] Errors prevented, not just caught
- [ ] Options visible, not memorized
- [ ] Shortcuts for power users
- [ ] Only essential information shown
- [ ] Error messages helpful and specific
- [ ] Help available when needed

## Visual Hierarchy Checklist

- [ ] Most important element is largest/boldest
- [ ] Related elements grouped together
- [ ] Consistent spacing throughout
- [ ] Clear contrast between elements
- [ ] Typography establishes hierarchy
- [ ] Whitespace used intentionally
