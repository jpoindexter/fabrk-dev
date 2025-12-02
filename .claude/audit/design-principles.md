# Design Principles

UX heuristics, visual design, color theory, inclusive design, and psychological principles.

---

## WCAG 2.1 AA Quick Reference

Every component MUST comply with these principles:

| Principle | Guidelines | Key Requirements |
|-----------|------------|------------------|
| **Perceivable** | 1.1-1.4 | Alt text, captions, contrast, resize |
| **Operable** | 2.1-2.5 | Keyboard, timing, seizures, navigation |
| **Understandable** | 3.1-3.3 | Readable, predictable, error assistance |
| **Robust** | 4.1 | Compatible with assistive tech |

---

## UX Heuristics (Nielsen's 10)

Apply these heuristics at every design decision:

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

## Visual Design Principles

### Gestalt Principles

| Principle | Definition | Application |
|-----------|------------|-------------|
| **Proximity** | Elements close together are perceived as related | Group related form fields, card sections |
| **Similarity** | Similar elements are perceived as related | Consistent styling for same-function buttons |
| **Continuity** | Eye follows lines and curves | Align elements, use consistent spacing |
| **Closure** | Mind completes incomplete shapes | Icons can be simplified, implied boundaries |
| **Figure/Ground** | Elements are seen as foreground or background | Contrast between content and background |
| **Common Region** | Elements in same bounded area are grouped | Cards, bordered sections, background colors |

### Visual Hierarchy

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
| Large text (≥18px/14px bold) | 3:1 | Headings, buttons |
| UI components | 3:1 | Focus rings, borders |
| Graphical objects | 3:1 | Charts, icons |
| Decorative | None | Background patterns |

---

## Inclusive Design Principles

### Microsoft's 4 Inclusive Design Principles

| # | Principle | Application |
|---|-----------|-------------|
| 1 | **Recognize Exclusion** | Identify barriers: visual, motor, cognitive, auditory |
| 2 | **Solve for One, Extend to Many** | Design for permanent disabilities → helps everyone |
| 3 | **Learn from Diversity** | Include diverse users in testing |
| 4 | **One Size Fits One** | Multiple ways to accomplish tasks |

### Disability Spectrum

| Category | Permanent | Temporary | Situational |
|----------|-----------|-----------|-------------|
| **Visual** | Blind | Eye infection | Bright sunlight |
| **Motor** | One arm | Broken arm | Holding baby |
| **Auditory** | Deaf | Ear infection | Noisy environment |
| **Cognitive** | ADHD | Concussion | Distracted driving |
| **Speech** | Nonverbal | Laryngitis | Heavy accent |

### Design for All

```tsx
// Visual impairment
- Alt text on images
- Sufficient color contrast
- Scalable text (rem units)
- Screen reader compatible

// Motor impairment
- Large click targets (44x44px minimum)
- Keyboard navigation
- No time limits
- Avoid precise movements

// Cognitive impairment
- Simple language
- Clear navigation
- Consistent layout
- Progress indicators
- Error recovery

// Auditory impairment
- Captions for video
- Transcripts for audio
- Visual indicators for alerts
- No audio-only content
```

---

## Emotional Design

### Don Norman's 3 Levels

| Level | Focus | Implementation |
|-------|-------|----------------|
| **Visceral** | Immediate reaction | Terminal aesthetic, colors, typography |
| **Behavioral** | Usability, function | Fast interactions, clear feedback |
| **Reflective** | Self-image, meaning | Professional, developer-focused brand |

### Microinteractions

```tsx
// Successful action feedback
<Button
  onClick={handleSave}
  className="transition-all duration-200"
>
  {isSaved ? (
    <span className="text-success flex items-center gap-1">
      <Check className="h-4 w-4" /> SAVED
    </span>
  ) : (
    <span>> SAVE</span>
  )}
</Button>

// Loading states
<Button disabled={isLoading}>
  {isLoading ? (
    <span className="animate-pulse">> SAVING...</span>
  ) : (
    <span>> SAVE</span>
  )}
</Button>

// Error recovery
<Button variant="outline" onClick={retry}>
  > TRY_AGAIN
</Button>
```

---

## Cognitive Load Principles

### Types of Cognitive Load

| Type | Definition | Mitigation |
|------|------------|------------|
| **Intrinsic** | Complexity of task itself | Progressive disclosure, step-by-step |
| **Extraneous** | Poor design adding load | Clean UI, clear hierarchy |
| **Germane** | Learning new information | Consistent patterns, documentation |

### Reducing Cognitive Load

```tsx
// 1. Chunking - Group related info
<Card>
  <CardHeader>[USER_INFO]</CardHeader>
  <CardContent>
    <Input label="Name" />
    <Input label="Email" />
  </CardContent>
</Card>

// 2. Progressive disclosure - Show what's needed
<Accordion>
  <AccordionItem value="basic">[BASIC_SETTINGS]</AccordionItem>
  <AccordionItem value="advanced">[ADVANCED_SETTINGS]</AccordionItem>
</Accordion>

// 3. Recognition over recall
<Select placeholder="Select country...">
  {countries.map(c => <SelectItem>{c.name}</SelectItem>)}
</Select>

// 4. Defaults - Reduce decisions
<Select defaultValue="usd">

// 5. Constraints - Prevent errors
<Input type="email" pattern="..." />
```

---

## Fitts's Law

### Target Size & Distance

```
Time = a + b × log2(1 + D/W)
- D = Distance to target
- W = Width (size) of target
```

### Application

```tsx
// Minimum touch target: 44x44px (Apple HIG), 48x48px (Material)

// ✅ CORRECT: Large click targets
<Button className="h-10 px-4">  // 40px height
  > SUBMIT
</Button>

<Button size="icon" className="h-10 w-10">  // 40x40px
  <X className="h-4 w-4" />
</Button>

// ✅ CORRECT: Clickable card (larger target)
<Card className="cursor-pointer hover:border-primary" onClick={handleClick}>
  {/* Entire card is clickable */}
</Card>

// ❌ WRONG: Tiny click targets
<button className="h-4 w-4">×</button>  // 16px - too small!
```

---

## Miller's Law (7 ± 2)

### Chunking Information

```tsx
// Maximum items in a list without grouping: 7 ± 2

// ✅ CORRECT: Grouped navigation
<nav>
  <div>[MAIN]
    <Link>Dashboard</Link>
    <Link>Projects</Link>
    <Link>Tasks</Link>
  </div>
  <div>[ACCOUNT]
    <Link>Settings</Link>
    <Link>Profile</Link>
    <Link>Billing</Link>
  </div>
</nav>

// ❌ WRONG: Flat list of 15+ items
<nav>
  <Link>Item 1</Link>
  <Link>Item 2</Link>
  ... (15 items)
</nav>
```

---

## Hick's Law

### Decision Time

```
Time = b × log2(n + 1)
- n = Number of choices
```

### Reducing Options

```tsx
// ✅ CORRECT: Limited, clear options
<RadioGroup>
  <RadioGroupItem value="free">Free - $0/mo</RadioGroupItem>
  <RadioGroupItem value="pro">Pro - $10/mo</RadioGroupItem>
  <RadioGroupItem value="enterprise">Enterprise - Contact</RadioGroupItem>
</RadioGroup>

// ✅ CORRECT: Smart defaults
<Select defaultValue="recommended-option">

// ✅ CORRECT: Progressive disclosure
<Button>> SHOW_MORE_OPTIONS</Button>

// ❌ WRONG: Too many choices
<Select>
  {/* 50+ options without grouping */}
</Select>
```

---

## Dark Patterns to Avoid

### NEVER Implement

| Pattern | Description | Why It's Wrong |
|---------|-------------|----------------|
| **Confirmshaming** | Guilt-tripping decline option | Manipulative |
| **Roach Motel** | Easy to get in, hard to leave | User hostile |
| **Bait & Switch** | Promised different than delivered | Deceptive |
| **Hidden Costs** | Revealing costs at checkout | Dishonest |
| **Misdirection** | Distracting from important info | Manipulative |
| **Trick Questions** | Confusing opt-in/out language | Deceptive |
| **Forced Continuity** | Auto-renew without notice | User hostile |
| **Disguised Ads** | Ads that look like content | Deceptive |

### Ethical Alternatives

```tsx
// ✅ Clear unsubscribe
<Button variant="outline">> UNSUBSCRIBE</Button>
<p className="text-xs text-muted-foreground">
  You can resubscribe anytime from settings.
</p>

// ✅ Transparent pricing
<Card>
  <CardHeader>[PRICING]</CardHeader>
  <CardContent>
    <p>$10/month billed monthly</p>
    <p className="text-xs text-muted-foreground">
      Cancel anytime. No hidden fees.
    </p>
  </CardContent>
</Card>

// ✅ Clear opt-in (not pre-checked)
<Checkbox id="marketing" />  // Unchecked by default
<Label htmlFor="marketing">
  Send me marketing emails (optional)
</Label>
```

---

## Quick Reference

### UX Checklist

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

### Visual Hierarchy Checklist

- [ ] Most important element is largest/boldest
- [ ] Related elements grouped together
- [ ] Consistent spacing throughout
- [ ] Clear contrast between elements
- [ ] Typography establishes hierarchy
- [ ] Whitespace used intentionally

### Accessibility Checklist

- [ ] Color is never sole indicator
- [ ] Contrast meets WCAG ratios
- [ ] Touch targets ≥ 44px
- [ ] All functions keyboard accessible
- [ ] Multiple ways to accomplish tasks
