# Components: Forms

Form design patterns in the terminal aesthetic.

---

## Input Anatomy

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

---

## Input Sizes

| Size | Height | Padding | Font | Use |
|------|--------|---------|------|-----|
| `sm` | 32px | px-2 py-1 | text-xs | Compact forms |
| `default` | 40px | px-3 py-2 | text-sm | Standard forms |
| `lg` | 48px | px-4 py-3 | text-base | Prominent inputs |

---

## Input States

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

---

## Form Layouts

### Single Column

```tsx
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
```

### Two Column

```tsx
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
```

### Inline Form

```tsx
<form className="flex gap-2">
  <Input placeholder="Search..." className="flex-1" />
  <Button type="submit">> SEARCH</Button>
</form>
```

---

## Validation

```tsx
<Input
  type="email"
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  required
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? "email-error" : undefined}
/>

{errors.email && (
  <p id="email-error" className="text-destructive font-mono text-xs mt-1" role="alert">
    [ERROR]: {errors.email.message}
  </p>
)}
```

---

## Select Pattern

```tsx
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

---

## Checkbox/Radio

### Checkbox

```tsx
<div className="flex items-center gap-2">
  <Checkbox id="terms" className="rounded-none" />
  <Label htmlFor="terms" className="font-mono text-xs">
    Accept terms and conditions
  </Label>
</div>
```

### Radio Group

```tsx
<RadioGroup defaultValue="option1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1" className="font-mono text-xs">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option2" id="option2" />
    <Label htmlFor="option2" className="font-mono text-xs">Option 2</Label>
  </div>
</RadioGroup>
```

---

## Checklist

- [ ] Labels use `[LABEL]:` format
- [ ] Inputs use `rounded-none`
- [ ] Errors show `[ERROR]:` prefix
- [ ] Required fields marked with *
- [ ] Error states have `aria-invalid`
