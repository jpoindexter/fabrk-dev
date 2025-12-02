# Design: Cognitive & Inclusive Principles

Inclusive design, cognitive load, Fitts's Law, Miller's Law, Hick's Law, and ethical patterns.

---

## Inclusive Design Principles

### Microsoft's 4 Inclusive Design Principles

| # | Principle | Application |
|---|-----------|-------------|
| 1 | **Recognize Exclusion** | Identify barriers: visual, motor, cognitive, auditory |
| 2 | **Solve for One, Extend to Many** | Design for permanent disabilities - helps everyone |
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
<Button onClick={handleSave} className="transition-all duration-200">
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
Time = a + b x log2(1 + D/W)
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
<button className="h-4 w-4">x</button>  // 16px - too small!
```

---

## Miller's Law (7 +/- 2)

### Chunking Information

```tsx
// Maximum items in a list without grouping: 7 +/- 2

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
Time = b x log2(n + 1)
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

## Accessibility Checklist

- [ ] Color is never sole indicator
- [ ] Contrast meets WCAG ratios
- [ ] Touch targets >= 44px
- [ ] All functions keyboard accessible
- [ ] Multiple ways to accomplish tasks
