# Audit Rules

Comprehensive compliance requirements for the Fabrk design system, WCAG 2.1 AA accessibility, and UX best practices.

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

## Typography System (CRITICAL)

### Font Stack

| Category | Font | Tailwind | Use |
|----------|------|----------|-----|
| **Monospace** | JetBrains Mono | `font-mono` | Terminal UI, code, labels, body |
| **Sans-serif** | Geist Sans | `font-sans` | Marketing, headings |

### Type Scale

| Token | Size | Line Height | Weight | Use |
|-------|------|-------------|--------|-----|
| `text-xs` | 12px (0.75rem) | 1rem | 400-700 | Labels, captions, metadata |
| `text-sm` | 14px (0.875rem) | 1.25rem | 400-600 | Body text, descriptions |
| `text-base` | 16px (1rem) | 1.5rem | 400-600 | Default, paragraphs |
| `text-lg` | 18px (1.125rem) | 1.75rem | 600-700 | Card titles, emphasis |
| `text-xl` | 20px (1.25rem) | 1.75rem | 600 | Subsection headings |
| `text-2xl` | 24px (1.5rem) | 2rem | 600 | Section headings |
| `text-3xl` | 30px (1.875rem) | 2.25rem | 700 | Large headings |
| `text-4xl` | 36px (2.25rem) | 2.5rem | 700 | Page titles |

### Font Weight

| Weight | Token | Use |
|--------|-------|-----|
| 400 | `font-normal` | Body text, descriptions |
| 500 | `font-medium` | Emphasis, links |
| 600 | `font-semibold` | Headings, buttons |
| 700 | `font-bold` | Strong emphasis, titles |

### Line Height

| Token | Value | Use |
|-------|-------|-----|
| `leading-none` | 1 | Single-line headings |
| `leading-tight` | 1.25 | Compact text |
| `leading-snug` | 1.375 | Buttons, short labels |
| `leading-normal` | 1.5 | Body text |
| `leading-relaxed` | 1.625 | Long-form content |
| `leading-loose` | 2 | Very spaced text |

### Letter Spacing

| Token | Value | Use |
|-------|-------|-----|
| `tracking-tighter` | -0.05em | Large headings |
| `tracking-tight` | -0.025em | Headings |
| `tracking-normal` | 0 | Body text |
| `tracking-wide` | 0.025em | Labels, buttons |
| `tracking-wider` | 0.05em | Small caps |
| `tracking-widest` | 0.1em | Uppercase labels |

### Terminal Typography Patterns

```tsx
// Page title
<h1 className="text-4xl font-bold tracking-tight">Page Title</h1>

// Section heading
<h2 className="text-2xl font-semibold tracking-tight">Section</h2>

// Card/terminal header
<h3 className="font-mono text-lg font-bold text-primary">
  [ [0x00] CARD_TITLE ]
</h3>

// Terminal label
<span className="font-mono text-xs text-muted-foreground">
  [LABEL]:
</span>

// Body text
<p className="font-mono text-sm text-muted-foreground leading-relaxed">
  Description text here.
</p>

// Code/monospace
<code className="font-mono text-xs bg-muted px-1 py-0.5">
  code
</code>

// Button text
<Button className="font-mono text-xs">
  > ACTION_NAME
</Button>

// Status message
<p className="font-mono text-xs text-destructive">
  [ERROR]: Message here
</p>
```

### Typography Accessibility

```tsx
// Minimum body text: 16px (text-base) for readability
// Never use text-xs for body paragraphs

// Line length: 45-75 characters optimal (ch units)
<p className="max-w-prose">  // ~65ch

// Paragraph spacing
<div className="space-y-4">  // Double line height between paragraphs

// Don't use font-size < 12px (text-xs) for anything
// Exception: Decorative elements only
```

---

## Spacing System (8-Point Grid)

### Core Principle

ALL spacing follows 4px base unit. Use multiples of 4px or 8px:

| Token | Value | Pixels | Use |
|-------|-------|--------|-----|
| `0` | 0 | 0px | Reset |
| `0.5` | 0.125rem | 2px | Micro gaps |
| `1` | 0.25rem | 4px | Icon gaps, tight spacing |
| `1.5` | 0.375rem | 6px | Small gaps |
| `2` | 0.5rem | 8px | Standard small spacing |
| `2.5` | 0.625rem | 10px | - |
| `3` | 0.75rem | 12px | ⚠️ Non-standard (use 2 or 4) |
| `4` | 1rem | 16px | Standard spacing |
| `5` | 1.25rem | 20px | ⚠️ Non-standard (use 4 or 6) |
| `6` | 1.5rem | 24px | Comfortable spacing |
| `8` | 2rem | 32px | Section spacing |
| `10` | 2.5rem | 40px | Large spacing |
| `12` | 3rem | 48px | Page section spacing |
| `16` | 4rem | 64px | Major divisions |
| `20` | 5rem | 80px | Hero spacing |
| `24` | 6rem | 96px | Extra large |

### Padding Patterns

```tsx
// Component internal padding
<div className="p-1">     // 4px - Icon buttons
<div className="p-2">     // 8px - Compact cards, tags
<div className="p-4">     // 16px - Standard cards
<div className="p-6">     // 24px - Spacious cards
<div className="p-8">     // 32px - Large containers

// Asymmetric padding
<div className="px-4 py-2">   // Header bars (16px horizontal, 8px vertical)
<div className="px-4 py-3">   // Input fields
<div className="px-6 py-4">   // Card content
<div className="px-6 py-12">  // Page sections
```

### Margin Patterns

```tsx
// Element spacing
<div className="mt-1">    // 4px - Tight
<div className="mt-2">    // 8px - Standard small
<div className="mt-4">    // 16px - Standard
<div className="mt-6">    // 24px - Comfortable
<div className="mt-8">    // 32px - Section gap

// Bottom margins
<div className="mb-2">    // Label to input
<div className="mb-4">    // Between form groups
<div className="mb-8">    // Between sections
```

### Gap Patterns

```tsx
// Flex/Grid gaps
<div className="gap-1">     // 4px - Icon + text
<div className="gap-1.5">   // 6px - Traffic light dots
<div className="gap-2">     // 8px - Button content
<div className="gap-4">     // 16px - Card grid
<div className="gap-6">     // 24px - Section items
<div className="gap-8">     // 32px - Major sections

// Space-between (vertical)
<div className="space-y-1">   // 4px - Tight list
<div className="space-y-2">   // 8px - Form fields
<div className="space-y-4">   // 16px - Standard list
<div className="space-y-6">   // 24px - Card list
<div className="space-y-8">   // 32px - Sections
<div className="space-y-12">  // 48px - Page sections
```

### Layout Spacing

```tsx
// Page container
<div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">

// Section container
<section className="py-12 md:py-16 lg:py-20">

// Card with header
<div className="border border-border">
  <div className="border-b border-border px-4 py-2">  // Header
  <div className="p-4">                               // Content
</div>

// Form layout
<form className="space-y-6">
  <div className="space-y-2">  // Label + input group
    <Label />
    <Input />
  </div>
</form>
```

---

## Interaction Design

### Click/Touch Targets

| Device | Minimum Size | Recommended |
|--------|--------------|-------------|
| Mobile touch | 44×44px | 48×48px |
| Desktop click | 24×24px | 32×32px |
| Icon button | 32×32px | 40×40px |

```tsx
// ✅ CORRECT: Adequate touch target
<Button className="h-10 min-w-[44px]">  // 40px height

// ✅ CORRECT: Icon button with sufficient size
<Button size="icon" className="h-10 w-10">  // 40×40px
  <X className="h-4 w-4" />
</Button>

// ✅ CORRECT: List item with full-width clickable area
<button className="w-full px-4 py-3 text-left">
  {/* Content */}
</button>

// ❌ WRONG: Tiny target
<button className="h-4 w-4">×</button>  // 16px - too small!
```

### Hover States

```tsx
// ALL interactive elements need hover feedback

// Button hover
<Button className="hover:bg-primary/90 transition-colors">

// Card hover
<Card className="hover:border-primary transition-colors cursor-pointer">

// Link hover
<a className="text-primary hover:underline transition-colors">

// List item hover
<li className="hover:bg-muted transition-colors">
```

### Focus States (CRITICAL)

```tsx
// Visible focus indicator on ALL interactive elements
className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

// Alternative ring style
className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

// NEVER remove focus without alternative
// ❌ BANNED:
className="outline-none"
className="focus:outline-none"
```

### Active/Pressed States

```tsx
// Button pressed
<Button className="active:scale-95 transition-transform">

// Clickable card pressed
<Card className="active:bg-muted/50 transition-colors">
```

### Disabled States

```tsx
// Disabled elements
<Button disabled className="opacity-50 cursor-not-allowed">

// Disabled with tooltip explaining why
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <span tabIndex={0}>  // Wrapper for disabled button
        <Button disabled>> SUBMIT</Button>
      </span>
    </TooltipTrigger>
    <TooltipContent>
      Complete required fields first
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Loading States

```tsx
// Button loading
<Button disabled>
  <Loader2 className="h-4 w-4 animate-spin mr-2" />
  > LOADING...
</Button>

// Skeleton loading
<Skeleton className="h-4 w-[200px]" />

// Content loading
<div aria-busy={isLoading}>
  {isLoading ? <Skeleton /> : <Content />}
</div>
```

### Transition Timing

| Duration | Use | Token |
|----------|-----|-------|
| 75ms | Micro-feedback | `duration-75` |
| 100ms | Quick feedback | `duration-100` |
| 150ms | Hover states | `duration-150` |
| 200ms | Standard transitions | `duration-200` |
| 300ms | Complex animations | `duration-300` |
| 500ms+ | ⚠️ Too slow (avoid) | - |

```tsx
// Standard transition
<Button className="transition-colors duration-200">

// Multi-property transition
<Card className="transition-all duration-200">

// Transform transition
<div className="transition-transform duration-200 hover:scale-105">
```

### Easing Functions

| Easing | Use | Token |
|--------|-----|-------|
| `ease-out` | Entry animations | Default |
| `ease-in` | Exit animations | `ease-in` |
| `ease-in-out` | State changes | `ease-in-out` |
| `linear` | Continuous animations | `ease-linear` |

---

## Form Design

### Input Anatomy

```tsx
<div className="space-y-2">
  {/* Label */}
  <Label htmlFor="email" className="font-mono text-xs">
    [EMAIL]: <span className="text-destructive">*</span>
  </Label>

  {/* Input */}
  <Input
    id="email"
    type="email"
    placeholder="user@example.com"
    className="rounded-none font-mono"
    aria-describedby="email-hint email-error"
    aria-invalid={hasError}
  />

  {/* Hint text */}
  <p id="email-hint" className="text-xs text-muted-foreground font-mono">
    We'll never share your email.
  </p>

  {/* Error message */}
  {hasError && (
    <p id="email-error" className="text-xs text-destructive font-mono" role="alert">
      [ERROR]: Please enter a valid email.
    </p>
  )}
</div>
```

### Input Sizes

| Size | Height | Padding | Font | Use |
|------|--------|---------|------|-----|
| `sm` | 32px | px-2 py-1 | text-xs | Compact forms |
| `default` | 40px | px-3 py-2 | text-sm | Standard forms |
| `lg` | 48px | px-4 py-3 | text-base | Prominent inputs |

### Input States

```tsx
// Default
<Input className="border-input" />

// Focus
<Input className="focus:border-primary focus:ring-1 focus:ring-primary" />

// Error
<Input className="border-destructive focus:ring-destructive" aria-invalid="true" />

// Disabled
<Input disabled className="opacity-50 cursor-not-allowed" />

// Read-only
<Input readOnly className="bg-muted" />
```

### Form Layout Patterns

```tsx
// Single column (mobile-first)
<form className="space-y-6 max-w-md">
  <div className="space-y-2">
    <Label>[NAME]:</Label>
    <Input />
  </div>
  <div className="space-y-2">
    <Label>[EMAIL]:</Label>
    <Input />
  </div>
  <Button type="submit">> SUBMIT</Button>
</form>

// Two column (responsive)
<form className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label>[FIRST_NAME]:</Label>
      <Input />
    </div>
    <div className="space-y-2">
      <Label>[LAST_NAME]:</Label>
      <Input />
    </div>
  </div>
</form>

// Inline form
<form className="flex gap-2">
  <Input placeholder="Search..." className="flex-1" />
  <Button type="submit">> SEARCH</Button>
</form>
```

---

## Button Design

### Button Variants

| Variant | Use | Example |
|---------|-----|---------|
| `default` | Primary actions | Save, Submit |
| `secondary` | Secondary actions | Cancel, Back |
| `destructive` | Dangerous actions | Delete, Remove |
| `outline` | Tertiary actions | Learn More |
| `ghost` | Subtle actions | Menu items |
| `link` | Text links | Read more |

### Button Sizes

| Size | Height | Padding | Font |
|------|--------|---------|------|
| `sm` | 32px | px-3 | text-xs |
| `default` | 40px | px-4 | text-sm |
| `lg` | 48px | px-8 | text-base |
| `icon` | 40x40px | p-2 | - |

### Button Patterns

```tsx
// Primary action (always rightmost)
<div className="flex justify-end gap-2">
  <Button variant="outline">> CANCEL</Button>
  <Button>> SAVE</Button>
</div>

// Destructive action (requires confirmation)
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">> DELETE</Button>
  </AlertDialogTrigger>
  {/* Confirmation dialog */}
</AlertDialog>

// Loading state
<Button disabled>
  <Loader2 className="h-4 w-4 animate-spin mr-2" />
  > SAVING...
</Button>

// Icon + text
<Button className="gap-2">
  <Download className="h-4 w-4" aria-hidden="true" />
  > DOWNLOAD
</Button>

// Icon only (requires aria-label)
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>
```

---

## Card Design

### Card Anatomy

```tsx
<Card className="rounded-none border-border">
  {/* Terminal-style header (optional) */}
  <div className="border-b border-border px-4 py-2 flex items-center gap-2">
    <div className="flex gap-1.5">
      <div className="size-2 rounded-full bg-destructive/50" />
      <div className="size-2 rounded-full bg-warning/50" />
      <div className="size-2 rounded-full bg-success/50" />
    </div>
    <span className="font-mono text-xs text-muted-foreground">
      [ [0x00] CARD_TITLE ]
    </span>
  </div>

  {/* Content */}
  <CardContent className="p-4">
    {/* Card content */}
  </CardContent>

  {/* Footer (optional) */}
  <CardFooter className="border-t border-border px-4 py-2">
    <Button variant="ghost" className="ml-auto">> ACTION</Button>
  </CardFooter>
</Card>
```

### Card Variations

```tsx
// Basic card
<Card className="p-4">Content</Card>

// Interactive card
<Card className="cursor-pointer hover:border-primary transition-colors">

// Selected card
<Card className="border-primary bg-primary/5">

// Disabled card
<Card className="opacity-50 pointer-events-none">
```

---

## 1. File Organization

### Size Limits

| Lines | Severity | Action |
|-------|----------|--------|
| 400+ | CRITICAL | MUST split immediately |
| 300-399 | HIGH | MUST split before next release |
| 200-299 | MEDIUM | Review for split opportunities |
| 150-199 | LOW | Monitor, split if growing |

### Modular Design Principles

- **Single Responsibility**: Each file does ONE thing well
- **Composition over Inheritance**: Prefer small, composable components
- **Barrel Exports**: Every component folder has `index.ts`
- **Colocation**: Keep related files together (component + hook + types + test)

### File Structure

```
src/components/feature-name/
├── index.ts           # Barrel export
├── FeatureName.tsx    # Main component
├── FeatureName.test.tsx
├── use-feature.ts     # Custom hook (if needed)
├── types.ts           # TypeScript types
└── constants.ts       # Feature constants
```

---

## 2. Terminal Design System

> Full specification: `DESIGN_SYSTEM.md`

### Shape & Corners (CRITICAL)

| Rule | Allowed | Banned |
|------|---------|--------|
| Default | `rounded-none` | Everything else |
| Exception | `rounded-full` (traffic dots ONLY) | `rounded-sm`, `rounded-md`, etc. |

### Button Format (HIGH)

```tsx
// REQUIRED: > PREFIX + UPPERCASE + UNDERSCORES
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>
<Button className="rounded-none font-mono text-xs">> SAVE_CHANGES</Button>
<Button className="rounded-none font-mono text-xs">> DELETE_ACCOUNT</Button>

// Loading state
<Button disabled className="rounded-none font-mono text-xs">> LOADING...</Button>

// Icon buttons need aria-label
<Button size="icon" aria-label="Close dialog" className="rounded-none">
  <X className="h-4 w-4" />
</Button>
```

### Label Format (HIGH)

```tsx
// Standard labels - ALWAYS use brackets
<span className="font-mono text-xs text-muted-foreground">[EMAIL]:</span>
<span className="font-mono text-xs text-muted-foreground">[PASSWORD]:</span>
<span className="font-mono text-xs text-muted-foreground">[STATUS]:</span>

// Status messages - Include status type
<p className="font-mono text-xs text-destructive">[ERROR]: Invalid credentials</p>
<p className="font-mono text-xs text-success">[SUCCESS]: Saved successfully</p>
<p className="font-mono text-xs text-warning">[WARNING]: Unsaved changes</p>
<p className="font-mono text-xs text-info">[INFO]: Processing request...</p>
```

### Card Headers (HIGH)

```tsx
// Terminal-style card header
<div className="border border-border bg-card rounded-none">
  <div className="border-b border-border px-4 py-2">
    <span className="font-mono text-xs text-muted-foreground">
      [ [0x00] SECTION_TITLE ]
    </span>
  </div>
  <div className="p-4">
    {/* Content */}
  </div>
</div>
```

### Traffic Light Dots (Only Exception to rounded-full)

```tsx
<div className="flex items-center gap-2 border-b border-border px-4 py-2">
  <div className="flex gap-1.5">
    <div className="size-2 rounded-full bg-destructive/50" />
    <div className="size-2 rounded-full bg-warning/50" />
    <div className="size-2 rounded-full bg-success/50" />
  </div>
  <span className="font-mono text-xs text-muted-foreground">filename.tsx</span>
</div>
```

---

## 3. Color System (CRITICAL)

### Allowed Tokens

```tsx
// Backgrounds
bg-background      // Page background
bg-card            // Card surfaces
bg-muted           // Subtle backgrounds
bg-primary         // Brand/CTA
bg-secondary       // Secondary actions
bg-destructive     // Error states
bg-success         // Success states
bg-warning         // Warning states
bg-info            // Info states

// Text
text-foreground           // Primary text
text-muted-foreground     // Secondary text
text-primary              // Brand color
text-primary-foreground   // On primary bg
text-destructive          // Error text
text-destructive-foreground
text-success              // Success text
text-warning              // Warning text
text-info                 // Info text

// Borders
border-border      // Standard borders
border-input       // Input borders
border-primary     // Accent borders

// Charts
chart-1 through chart-5
```

### BANNED (No Exceptions)

- Hardcoded hex: `#8b5cf6`, `#ffffff`, etc.
- Tailwind palette: `bg-gray-500`, `text-purple-600`, `border-slate-200`
- Raw functions: `rgb()`, `hsl()`, `oklch()` (without var())
- White/black: `bg-white`, `text-black`

---

## 4. Shadows (HIGH)

### Allowed

```tsx
shadow-sm                                    // Subtle elevation
shadow-[4px_4px_0px_0px_var(--border)]       // Terminal hard shadow
```

### BANNED (No Exceptions)

```tsx
shadow-md
shadow-lg
shadow-xl
shadow-2xl
shadow-inner
drop-shadow-md
drop-shadow-lg
```

---

## 5. Component Patterns

### cn() Utility (HIGH)

```tsx
// REQUIRED for className merging
import { cn } from "@/lib/utils";

<div className={cn("base-styles", className, {
  "conditional-style": condition,
})} />

// BANNED - Template literals
<div className={`base ${className}`} />
<div className={"base " + className} />
```

### forwardRef Components (HIGH)

```tsx
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("base", className)} {...props} />
  )
);
Component.displayName = "Component";  // REQUIRED
```

### data-slot Attribute (MEDIUM)

```tsx
// Required for CSS targeting in compound components
<button data-slot="trigger" />
<div data-slot="content" />
<span data-slot="label" />
```

### Composition Pattern (HIGH)

```tsx
// GOOD - Compound components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// BAD - Prop overload
<Card title="Title" content="Content" headerClass="..." contentClass="..." />
```

---

## 6. Import Organization

### Order (MEDIUM)

```tsx
// 1. React/Next.js
import * as React from "react";
import { useRouter } from "next/navigation";

// 2. External libraries (alphabetical)
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";

// 3. Internal UI components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 4. Internal feature components
import { UserAvatar } from "@/components/dashboard/user-avatar";

// 5. Utilities & hooks
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

// 6. Types (last)
import type { User } from "@/types";
```

---

## 7. Accessibility (WCAG 2.1 AA) (CRITICAL)

> Full WCAG 2.1 Level AA compliance is REQUIRED for all components.

### 7.1 Perceivable (WCAG 1.x)

#### 1.1.1 Non-text Content (Level A)

```tsx
// ALL images MUST have alt text
<Image src="/logo.png" alt="Fabrk logo - terminal-inspired design system" />

// Decorative images use empty alt
<Image src="/decoration.svg" alt="" aria-hidden="true" />

// Icons with meaning need labels
<AlertTriangle className="h-4 w-4" aria-label="Warning" />

// Icon-only buttons MUST have aria-label
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// SVG sprites need title
<svg role="img" aria-labelledby="icon-title">
  <title id="icon-title">Settings</title>
  <use href="#settings-icon" />
</svg>
```

#### 1.3.1 Info and Relationships (Level A)

```tsx
// Form inputs MUST have associated labels
<Label htmlFor="email">[EMAIL]:</Label>
<Input id="email" type="email" aria-describedby="email-hint" />
<p id="email-hint" className="text-xs text-muted-foreground">
  We'll never share your email.
</p>

// Related form controls use fieldset/legend
<fieldset>
  <legend>[NOTIFICATION_PREFERENCES]:</legend>
  <Checkbox id="email-notif" />
  <Label htmlFor="email-notif">Email notifications</Label>
</fieldset>

// Tables need proper headers
<table>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Project Alpha</th>
      <td>Active</td>
    </tr>
  </tbody>
</table>

// Use semantic HTML (nav, main, aside, header, footer, article, section)
<main id="main-content">
  <article>
    <header><h1>Page Title</h1></header>
    <section aria-labelledby="section-1">
      <h2 id="section-1">Section Title</h2>
    </section>
  </article>
</main>
```

#### 1.3.2 Meaningful Sequence (Level A)

```tsx
// DOM order MUST match visual order
// WRONG: Using CSS to reorder (confuses screen readers)
<div className="flex flex-col-reverse">  // Avoid

// CORRECT: Logical DOM order
<header>Header first</header>
<main>Main content second</main>
<footer>Footer last</footer>
```

#### 1.3.3 Sensory Characteristics (Level A)

```tsx
// NEVER rely on color alone
// WRONG:
<p>Fields in red are required</p>

// CORRECT:
<Label>
  [EMAIL]: <span className="text-destructive">*</span>
  <span className="sr-only">(required)</span>
</Label>

// NEVER rely on position alone
// WRONG:
<p>Click the button on the right</p>

// CORRECT:
<p>Click the "Submit" button to continue</p>
```

#### 1.4.1 Use of Color (Level A)

```tsx
// Error states need icon + color + text
<div className="text-destructive flex items-center gap-2">
  <AlertCircle className="h-4 w-4" aria-hidden="true" />
  <span>[ERROR]: Invalid email format</span>
</div>

// Links need more than color
<a className="underline hover:text-foreground">Link text</a>

// Status indicators need labels
<Badge variant="success" className="flex items-center gap-1">
  <CheckCircle className="h-3 w-3" aria-hidden="true" />
  <span>Active</span>
</Badge>
```

#### 1.4.3 Contrast (Level AA) (CRITICAL)

```tsx
// Minimum contrast ratios:
// - Normal text: 4.5:1
// - Large text (18px+ or 14px bold): 3:1
// - UI components & graphics: 3:1

// Design tokens are pre-validated for contrast
// ALWAYS use tokens, never hardcode colors

// Check contrast with:
// - Chrome DevTools > Elements > Contrast
// - WebAIM Contrast Checker
// - axe DevTools extension
```

#### 1.4.4 Resize Text (Level AA)

```tsx
// Use relative units (rem, em), not px for text
// Text MUST be resizable to 200% without loss of content

// CORRECT:
className="text-sm"   // Uses rem
className="text-base"

// AVOID for text:
style={{ fontSize: '14px' }}  // Fixed pixels

// Container MUST NOT clip on zoom
className="overflow-auto"  // Allow scroll if needed
```

#### 1.4.10 Reflow (Level AA)

```tsx
// Content MUST reflow at 320px width (400% zoom on 1280px)
// No horizontal scrolling for text content

// CORRECT: Responsive design
<div className="container mx-auto px-4 md:px-6">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Test at: Chrome DevTools > Device Toolbar > 320px width
```

#### 1.4.11 Non-text Contrast (Level AA)

```tsx
// UI components need 3:1 against background
// - Focus indicators
// - Form field boundaries
// - Icons conveying information

// CORRECT: Visible borders
<Input className="border-input" />  // Border visible against bg

// WRONG: Low contrast border
<Input className="border-gray-200" />  // May fail on light backgrounds
```

#### 1.4.12 Text Spacing (Level AA)

```tsx
// Content MUST remain usable when users apply:
// - Line height: 1.5x font size
// - Paragraph spacing: 2x font size
// - Letter spacing: 0.12x font size
// - Word spacing: 0.16x font size

// DON'T set fixed heights on text containers
// WRONG:
<p className="h-20">Text that might wrap</p>

// CORRECT:
<p className="min-h-fit">Text that might wrap</p>
```

### 7.2 Operable (WCAG 2.x)

#### 2.1.1 Keyboard (Level A) (CRITICAL)

```tsx
// ALL functionality MUST be keyboard accessible

// Interactive elements must be focusable
<button>Focusable by default</button>
<a href="/page">Focusable by default</a>
<input />  // Focusable by default

// Custom interactive elements need tabIndex
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Custom button
</div>

// BANNED: Click handlers on non-interactive elements without keyboard
<div onClick={handleClick}>  // WRONG: Not keyboard accessible
```

#### 2.1.2 No Keyboard Trap (Level A)

```tsx
// Focus MUST be able to leave any component

// Modals need focus trap while open
<Dialog>
  <DialogContent>
    {/* Focus cycles within modal */}
    {/* ESC closes modal and returns focus */}
  </DialogContent>
</Dialog>

// ALWAYS provide escape route
<Dialog>
  <DialogClose>Close</DialogClose>  // Always include close button
</Dialog>
```

#### 2.4.1 Bypass Blocks (Level A)

```tsx
// Skip links for main content
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2"
>
  Skip to main content
</a>

// Landmark regions for screen reader navigation
<header role="banner">
<nav role="navigation">
<main role="main" id="main-content">
<footer role="contentinfo">
```

#### 2.4.3 Focus Order (Level A)

```tsx
// Tab order MUST match visual reading order

// NEVER use tabIndex > 0
// WRONG:
tabIndex={5}  // Creates confusing tab order

// CORRECT:
tabIndex={0}   // In natural DOM order
tabIndex={-1}  // Programmatically focusable only

// Modal focus management
const modalRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();  // Move focus to modal
  }
}, [isOpen]);
```

#### 2.4.6 Headings and Labels (Level AA)

```tsx
// Headings MUST describe their section
<h1>Dashboard</h1>
<h2>Recent Activity</h2>
<h3>This Week</h3>

// Labels MUST describe their input
<Label htmlFor="search">[SEARCH]:</Label>
<Input id="search" placeholder="Search projects..." />

// Form groups need descriptive legends
<fieldset>
  <legend>[BILLING_ADDRESS]:</legend>
  {/* Address fields */}
</fieldset>
```

#### 2.4.7 Focus Visible (Level AA) (CRITICAL)

```tsx
// Focus indicator MUST be visible

// REQUIRED on all interactive elements
className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

// BANNED: Removing outline without replacement
className="outline-none"  // NEVER without focus-visible alternative
className="focus:outline-none"  // NEVER without focus-visible alternative

// Custom focus styles allowed if clearly visible
className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
```

#### 2.5.3 Label in Name (Level A)

```tsx
// Accessible name MUST include visible text

// CORRECT: aria-label matches visible text
<Button aria-label="Submit form">> SUBMIT</Button>  // "SUBMIT" in aria-label

// WRONG: Mismatch between visible and accessible name
<Button aria-label="Send data">> SUBMIT</Button>  // Confusing for voice control
```

### 7.3 Understandable (WCAG 3.x)

#### 3.1.1 Language of Page (Level A)

```tsx
// Set page language
<html lang="en">

// Override for foreign language content
<p>The French word for hello is <span lang="fr">bonjour</span>.</p>
```

#### 3.2.1 On Focus (Level A)

```tsx
// Focus MUST NOT cause unexpected changes

// WRONG: Auto-submit on focus
<Select onFocus={() => submitForm()}>

// WRONG: Open modal on focus
<Button onFocus={() => openModal()}>

// CORRECT: Require explicit action
<Select onChange={handleChange}>
<Button onClick={() => openModal()}>
```

#### 3.2.2 On Input (Level A)

```tsx
// Input MUST NOT cause unexpected changes without warning

// WRONG: Auto-navigation on select
<Select onChange={() => navigate('/new-page')}>

// CORRECT: Require submit action
<Select onChange={setFilter}>
<Button onClick={() => applyFilterAndNavigate()}>> APPLY</Button>
```

#### 3.3.1 Error Identification (Level A)

```tsx
// Errors MUST be identified and described

<div>
  <Label htmlFor="email">[EMAIL]:</Label>
  <Input
    id="email"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <p id="email-error" className="text-destructive font-mono text-xs mt-1" role="alert">
      [ERROR]: Please enter a valid email address
    </p>
  )}
</div>
```

#### 3.3.2 Labels or Instructions (Level A)

```tsx
// Inputs need clear labels and instructions

<div className="space-y-1">
  <Label htmlFor="password">[PASSWORD]:</Label>
  <Input
    id="password"
    type="password"
    aria-describedby="password-requirements"
  />
  <p id="password-requirements" className="text-xs text-muted-foreground">
    Must be at least 8 characters with one number and one symbol.
  </p>
</div>
```

#### 3.3.3 Error Suggestion (Level AA)

```tsx
// Provide specific correction suggestions

// WRONG: Generic error
<p>[ERROR]: Invalid input</p>

// CORRECT: Specific suggestion
<p>[ERROR]: Email must include @ symbol. Example: user@example.com</p>
```

#### 3.3.4 Error Prevention (Level AA)

```tsx
// For legal/financial actions, provide:
// 1. Reversibility
// 2. Checking opportunity
// 3. Confirmation

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">> DELETE_ACCOUNT</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>[WARNING]: Delete Account?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. All your data will be permanently deleted.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>> CANCEL</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive">> DELETE</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### 7.4 Robust (WCAG 4.x)

#### 4.1.1 Parsing (Level A)

```tsx
// Valid, well-formed HTML
// - Unique IDs
// - Proper nesting
// - Complete start/end tags

// Run: npm run lint (includes HTML validation)
```

#### 4.1.2 Name, Role, Value (Level A)

```tsx
// Custom components need ARIA

// Custom checkbox
<div
  role="checkbox"
  aria-checked={checked}
  tabIndex={0}
  onClick={toggle}
  onKeyDown={handleKeyDown}
>

// Custom switch
<button
  role="switch"
  aria-checked={enabled}
  onClick={toggle}
>

// Custom combobox
<div role="combobox" aria-expanded={isOpen} aria-haspopup="listbox">
  <input aria-controls="listbox-id" aria-activedescendant={activeId} />
  <ul role="listbox" id="listbox-id">
    <li role="option" id="opt-1" aria-selected={selected === 1}>
```

### 7.5 ARIA Best Practices

```tsx
// FIRST rule of ARIA: Don't use ARIA if native HTML works
// WRONG:
<div role="button" tabIndex={0}>Click</div>

// CORRECT:
<button>Click</button>

// Common ARIA patterns:

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}  {/* Announced when changes */}
</div>

// Loading states
<div aria-busy={isLoading}>
  {isLoading ? <Skeleton /> : <Content />}
</div>

// Expanded/collapsed
<button aria-expanded={isOpen} aria-controls="panel-id">
  Toggle Panel
</button>
<div id="panel-id" hidden={!isOpen}>
  Panel content
</div>

// Tabs
<div role="tablist">
  <button role="tab" aria-selected={active === 0} aria-controls="panel-0">Tab 1</button>
</div>
<div role="tabpanel" id="panel-0" aria-labelledby="tab-0">

// Required form fields
<Input aria-required="true" />

// Disabled vs readonly
<Input disabled />        // aria-disabled="true" automatic
<Input readOnly />        // aria-readonly="true" automatic
```

### 7.6 Screen Reader Testing Checklist

- [ ] All images have descriptive alt text
- [ ] All form fields have associated labels
- [ ] All buttons and links have accessible names
- [ ] Headings create logical outline
- [ ] Tables have proper headers
- [ ] Dynamic content announced via live regions
- [ ] Focus management in modals works correctly
- [ ] Error messages are announced
- [ ] Status changes are announced

### 7.7 Keyboard Testing Checklist

- [ ] All interactive elements reachable via Tab
- [ ] Focus indicator clearly visible
- [ ] Tab order matches visual order
- [ ] Modals trap focus correctly
- [ ] ESC closes modals/dropdowns
- [ ] Enter/Space activates buttons
- [ ] Arrow keys navigate within components
- [ ] No keyboard traps

---

## 8. Security (CRITICAL)

### Environment Variables

```tsx
// REQUIRED: Use env.ts validation
import { env } from "@/lib/env";
const apiKey = env.server.API_KEY;

// BANNED: Direct access
const apiKey = process.env.API_KEY;
```

### Dangerous Patterns

```tsx
// BANNED without sanitization
dangerouslySetInnerHTML={{ __html: content }}

// REQUIRED: Sanitize first
import DOMPurify from "dompurify";
dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}

// NEVER USE
eval(code)
new Function(code)
```

### Client-Side Security

- Never expose API keys in client code
- Validate all user input server-side
- Use HTTPS for all external requests
- Sanitize any user-generated content

---

## 9. Documentation Pages (HIGH)

### Template Requirements

ALL docs pages MUST use a template:

| Template | Use For |
|----------|---------|
| `ComponentShowcaseTemplate` | `/docs/components/*` |
| `FeatureGuideTemplate` | `/docs/features/*`, `/docs/security/*` |
| `TutorialTemplate` | `/docs/tutorials/*` |
| `GettingStartedTemplate` | `/docs/getting-started/*` |

### DocsCard Rules

```tsx
// REQUIRED: title prop
<DocsCard title="SECTION_NAME">Content</DocsCard>

// BANNED: Missing title
<DocsCard>Content</DocsCard>
```

### Preview Rules

```tsx
// GOOD: Direct component in preview
mainPreview={{
  preview: <Button>> CLICK_ME</Button>,
  code: `<Button>> CLICK_ME</Button>`,
}}

// BAD: Wrapper div
mainPreview={{
  preview: <div><Button>> CLICK_ME</Button></div>,
  code: `...`,
}}
```

---

## 10. Code Quality (MEDIUM)

### Must NOT Contain

| Pattern | Reason | Alternative |
|---------|--------|-------------|
| `console.log` | Debug code | Remove or use logger |
| `console.error` | Debug code | Use error boundary |
| `// TODO` | Incomplete work | Create issue instead |
| `// FIXME` | Known bug | Create issue instead |
| `// HACK` | Technical debt | Refactor properly |
| `@ts-ignore` | Type bypass | Fix the type |
| `@ts-expect-error` | Type bypass | Fix the type |
| `: any` | Loose typing | Use proper type |
| `as any` | Type assertion | Use proper cast |

### Exceptions (Must Comment)

```tsx
// @ts-expect-error - Third-party library types incorrect, reported upstream
const result = legacyLib.doThing();

// eslint-disable-next-line - Intentional for performance
const cached = useMemo(() => expensiveCalc(), []);
```

---

## 11. Enterprise Patterns (HIGH)

### Error Boundaries

Every route group should have:
- `error.tsx` - Error boundary
- `loading.tsx` - Loading state
- `not-found.tsx` - 404 state (where applicable)

### Data Fetching

```tsx
// GOOD: Error handling
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
} catch (error) {
  // Handle error
}

// BAD: No error handling
const data = await fetch(url).then(r => r.json());
```

### Suspense Boundaries

```tsx
// Wrap lazy-loaded components
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### Performance

- Use `React.memo` for list item components
- Use `useCallback` for handlers passed to children
- Use `useMemo` for expensive computations
- Add `key` prop to all mapped elements

---

## 12. Testing Requirements (MEDIUM)

### Coverage Expectations

| Type | Coverage | Priority |
|------|----------|----------|
| Utility functions | 90%+ | HIGH |
| Custom hooks | 80%+ | HIGH |
| Components | 70%+ | MEDIUM |
| Integration | Key flows | HIGH |

### Test File Location

```
src/components/button/
├── Button.tsx
├── Button.test.tsx    # Unit tests
└── Button.e2e.ts      # E2E tests (if needed)
```

---

## 13. Spacing System (8-Point Grid) (HIGH)

### Core Principle

All spacing MUST follow 4px/8px multiples for visual consistency.

### Allowed Spacing Values

| Name | Value | Tailwind | Use |
|------|-------|----------|-----|
| xs | 4px | `p-1`, `m-1`, `gap-1` | Inline, tight groupings |
| sm | 8px | `p-2`, `m-2`, `gap-2` | Component internal |
| md | 16px | `p-4`, `m-4`, `gap-4` | Standard spacing |
| lg | 24px | `p-6`, `m-6`, `gap-6` | Comfortable sections |
| xl | 32px | `p-8`, `m-8`, `gap-8` | Major sections |
| 2xl | 48px | `p-12`, `m-12`, `gap-12` | Page sections |
| 3xl | 64px | `p-16`, `m-16`, `gap-16` | Page divisions |

### BANNED Spacing Values

```tsx
// These break the 8-point grid
p-3, p-5, p-7, p-9, p-11, p-13, p-14, p-15  // Use p-2, p-4, p-6, p-8, p-12, p-16 instead
m-3, m-5, m-7, m-9, m-11, m-13, m-14, m-15
gap-3, gap-5, gap-7, gap-9
space-y-3, space-y-5, space-y-7, space-y-9
```

### Standard Patterns

```tsx
// Page container
<div className="container mx-auto max-w-7xl px-6 py-12 space-y-12">

// Card padding
<div className="p-4">              // Standard content
<div className="p-6">              // Spacious content
<div className="px-4 py-2">        // Header bar
<div className="px-4 py-3">        // Form inputs

// Section spacing
<div className="space-y-2">        // Tight: form fields
<div className="space-y-4">        // Standard: within sections
<div className="space-y-6">        // Comfortable: card lists
<div className="space-y-8">        // Loose: between sections
<div className="space-y-12">       // Wide: major page sections
<div className="space-y-16">       // Extra wide: page divisions

// Grid gaps
<div className="grid gap-2">       // Tight grid
<div className="grid gap-4">       // Standard grid
<div className="grid gap-6">       // Card grid
<div className="grid gap-8">       // Spacious grid
```

---

## 14. Animation & Transitions (MEDIUM)

### Timing Standards

| Duration | Use | Tailwind |
|----------|-----|----------|
| 150ms | Micro-interactions (hover, focus) | `duration-150` |
| 200ms | Standard transitions | `duration-200` |
| 300ms | Complex animations | `duration-300` |

### BANNED Durations

```tsx
// Too slow - feels sluggish
duration-500, duration-700, duration-1000
```

### Required Transitions

```tsx
// Interactive elements MUST have transitions
<button className="transition-colors duration-200 hover:bg-muted">
<a className="transition-colors duration-200 hover:text-foreground">
<div className="transition-all duration-200 hover:border-primary">

// BANNED: hover without transition
<button className="hover:bg-muted">  // Missing transition-colors
```

### Reduced Motion Support (CRITICAL for A11Y)

```tsx
// REQUIRED: Respect prefers-reduced-motion
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="motion-reduce:transform-none"
/>

// Or use motion-safe
className="motion-safe:animate-fadeIn"

// BANNED: Animation without reduced-motion consideration
className="animate-bounce"  // Must add motion-safe: or motion-reduce:
```

### Framer Motion Standards

```tsx
// REQUIRED: initial + animate together
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>

// REQUIRED: AnimatePresence for exit animations
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>

// REQUIRED: layout prop for list reordering
{items.map((item) => (
  <motion.div key={item.id} layout>
    {item.content}
  </motion.div>
))}
```

---

## 15. Responsive Design (HIGH)

### Mobile-First Approach (REQUIRED)

```tsx
// CORRECT: Mobile-first, add complexity upward
<div className="flex flex-col md:flex-row">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div className="text-sm md:text-base lg:text-lg">

// WRONG: Desktop-first, subtract downward
<div className="flex-row md:flex-col">  // Confusing cascade
```

### Breakpoint Reference

| Breakpoint | Width | Use |
|------------|-------|-----|
| Default | <640px | Mobile phones |
| `sm:` | ≥640px | Large phones |
| `md:` | ≥768px | Tablets |
| `lg:` | ≥1024px | Laptops |
| `xl:` | ≥1280px | Desktops |
| `2xl:` | ≥1536px | Large screens |

### Required Responsive Patterns

```tsx
// Grid columns MUST be responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  // NOT: grid-cols-3 alone (breaks mobile)

// Large text MUST scale down
<h1 className="text-2xl md:text-4xl lg:text-5xl">
  // NOT: text-5xl alone (too large on mobile)

// Fixed widths MUST have responsive alternatives
<div className="w-full md:w-[600px] lg:w-[800px]">
  // NOT: w-[800px] alone (breaks mobile)

// Hidden content MUST have mobile alternative
<nav className="hidden md:flex">  // Desktop nav
<nav className="flex md:hidden">  // Mobile nav (hamburger)
```

### Container Usage

```tsx
// CORRECT: Container with responsive padding
<div className="container mx-auto px-4 md:px-6 lg:px-8">

// Standard max-width container
<div className="container mx-auto max-w-7xl px-6">
```

---

## 16. Theme Switching (HIGH)

### CSS Variables (REQUIRED)

```tsx
// CORRECT: Use CSS variables via Tailwind
className="bg-background text-foreground border-border"

// WRONG: Hardcoded values that break theming
className="bg-white text-black border-gray-200"
style={{ backgroundColor: '#ffffff' }}
```

### Dark Mode Support

```tsx
// Design tokens auto-switch with theme
// No explicit dark: classes needed for token-based styles

// Only use dark: for NON-token situations (rare)
className="dark:shadow-glow"  // Special dark-only effect
```

### Theme-Aware Components

```tsx
// CORRECT: Token-based styling (auto-themes)
<Card className="border-border bg-card">
  <CardContent className="text-card-foreground">

// WRONG: Won't switch with theme
<Card className="border-gray-200 bg-white">
  <CardContent className="text-gray-900">
```

### Testing Theme Switching

Every component should work correctly in:
- [ ] Light theme (default)
- [ ] Dark theme
- [ ] All 20 DaisyUI themes (spot check 3-4)

---

## 17. Icon Standards (MEDIUM)

### Size Standards

| Context | Size | Tailwind |
|---------|------|----------|
| Inline text | 16px | `h-4 w-4` |
| Buttons | 16-20px | `h-4 w-4` or `h-5 w-5` |
| Navigation | 20px | `h-5 w-5` |
| Large icons | 24px | `h-6 w-6` |
| Hero/Feature | 32-48px | `h-8 w-8` or `h-12 w-12` |

### Icon Accessibility

```tsx
// Decorative icons (NOT read by screen readers)
<Icon className="h-4 w-4" aria-hidden="true" />

// Meaningful icons (read by screen readers)
<Icon className="h-4 w-4" aria-label="Download file" />

// Icon-only buttons REQUIRE aria-label
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// BANNED: Icon-only button without aria-label
<Button size="icon">
  <X className="h-4 w-4" />  // Screen readers can't describe this
</Button>
```

### Icon + Text Pattern

```tsx
// CORRECT: Icon before text with gap
<Button className="gap-2">
  <DownloadIcon className="h-4 w-4" aria-hidden="true" />
  <span>> DOWNLOAD</span>
</Button>

// CORRECT: Icon after text
<span className="flex items-center gap-1">
  Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
</span>
```

---

## 18. Radix UI Patterns (HIGH)

### asChild Composition

```tsx
// REQUIRED when wrapping with Link
<Button asChild>
  <Link href="/dashboard">> DASHBOARD</Link>
</Button>

// WRONG: Nesting without asChild
<Button>
  <Link href="/dashboard">> DASHBOARD</Link>  // Creates invalid HTML
</Button>
```

### Dialog Structure

```tsx
// REQUIRED: Complete dialog structure
<Dialog>
  <DialogTrigger asChild>
    <Button>> OPEN_DIALOG</Button>
  </DialogTrigger>
  <DialogContent className="rounded-none">
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">> CANCEL</Button>
      </DialogClose>
      <Button>> CONFIRM</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Select Pattern

```tsx
// REQUIRED: Placeholder and defaultValue
<Select defaultValue={defaultVal}>
  <SelectTrigger className="rounded-none">
    <SelectValue placeholder="Select option..." />
  </SelectTrigger>
  <SelectContent className="rounded-none">
    <SelectItem value="opt1" className="text-left">Option 1</SelectItem>
    <SelectItem value="opt2" className="text-left">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Tabs Pattern

```tsx
// REQUIRED: defaultValue
<Tabs defaultValue="tab1">
  <TabsList className="rounded-none">
    <TabsTrigger
      value="tab1"
      className="rounded-none hover:text-foreground transition-colors"
    >
      Tab 1
    </TabsTrigger>
    <TabsTrigger
      value="tab2"
      className="rounded-none hover:text-foreground transition-colors"
    >
      Tab 2
    </TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Controlled State

```tsx
// For programmatic control, ALWAYS include onOpenChange
<Dialog open={isOpen} onOpenChange={setIsOpen}>
<Sheet open={isOpen} onOpenChange={setIsOpen}>
<Popover open={isOpen} onOpenChange={setIsOpen}>
```

---

## Quick Reference Checklist

### Before Every Commit

- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run scan:hex` passes
- [ ] No `console.log` statements
- [ ] No `// TODO` comments
- [ ] All buttons use `> ACTION` format
- [ ] All elements use `rounded-none`
- [ ] All colors use design tokens
- [ ] All images have alt text
- [ ] DocsCard components have `title` prop
- [ ] Spacing uses 8-point grid (p-2, p-4, p-6, p-8, p-12, p-16)
- [ ] Transitions on hover states
- [ ] Responsive breakpoints on grids and large text
- [ ] Icon buttons have aria-label

### Theme Testing

- [ ] Works in light theme
- [ ] Works in dark theme
- [ ] No hardcoded colors visible

### Accessibility Quick Check

- [ ] Tab through page - all elements reachable
- [ ] Screen reader test main flows
- [ ] Zoom to 200% - layout intact
- [ ] Check focus indicators visible

---

## Anti-Patterns (NEVER DO)

### Design System Violations

```tsx
// ❌ NEVER: Hardcoded colors
className="bg-purple-500 text-white"
style={{ color: '#8b5cf6' }}

// ❌ NEVER: Rounded corners (except traffic dots)
className="rounded-lg"
className="rounded-md"

// ❌ NEVER: Heavy shadows
className="shadow-lg"
className="shadow-xl"

// ❌ NEVER: Non-grid spacing
className="p-3 m-5 gap-7"
```

### Accessibility Violations

```tsx
// ❌ NEVER: Remove outline without visible alternative
className="outline-none focus:outline-none"

// ❌ NEVER: Icon button without label
<Button size="icon"><X /></Button>

// ❌ NEVER: Image without alt
<Image src="/logo.png" />

// ❌ NEVER: Click handler on non-interactive element
<div onClick={handleClick}>Click me</div>  // Use button instead
```

### Performance Violations

```tsx
// ❌ NEVER: Inline objects in render
<Component style={{ margin: 10 }} />  // Creates new object each render

// ❌ NEVER: Anonymous function props without useCallback
<Button onClick={() => doThing()}>  // Recreates function each render

// ❌ NEVER: Missing key in map
{items.map((item) => <Item />)}  // Always add key={item.id}
```

### Security Violations

```tsx
// ❌ NEVER: Direct env access
const key = process.env.API_KEY;

// ❌ NEVER: Unsanitized HTML
dangerouslySetInnerHTML={{ __html: userContent }}

// ❌ NEVER: Eval or Function constructor
eval(userInput);
new Function(userInput);
```
