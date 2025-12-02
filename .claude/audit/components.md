# Component Design Patterns

Design patterns for forms, buttons, cards, and other UI components in the terminal aesthetic.

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

#### Single Column (Mobile-First)

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

#### Two Column (Responsive)

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

#### Inline Form

```tsx
<form className="flex gap-2">
  <Input placeholder="Search..." className="flex-1" />
  <Button type="submit">> SEARCH</Button>
</form>
```

### Form Validation

```tsx
// Real-time validation
<Input
  type="email"
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  required
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? "email-error" : undefined}
/>

// Error display pattern
{errors.email && (
  <p id="email-error" className="text-destructive font-mono text-xs mt-1" role="alert">
    [ERROR]: {errors.email.message}
  </p>
)}
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

### Button Format (Terminal Style)

```tsx
// REQUIRED: > PREFIX + UPPERCASE + UNDERSCORES
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>
<Button className="rounded-none font-mono text-xs">> SAVE_CHANGES</Button>
<Button className="rounded-none font-mono text-xs">> DELETE_ACCOUNT</Button>
```

### Button Patterns

#### Primary Action (Always Rightmost)

```tsx
<div className="flex justify-end gap-2">
  <Button variant="outline">> CANCEL</Button>
  <Button>> SAVE</Button>
</div>
```

#### Destructive Action (Requires Confirmation)

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">> DELETE</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>[WARNING]: Delete Item?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>> CANCEL</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive">> DELETE</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

#### Loading State

```tsx
<Button disabled>
  <Loader2 className="h-4 w-4 animate-spin mr-2" />
  > SAVING...
</Button>
```

#### Icon + Text

```tsx
<Button className="gap-2">
  <Download className="h-4 w-4" aria-hidden="true" />
  > DOWNLOAD
</Button>
```

#### Icon Only (Requires aria-label)

```tsx
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
<Card className="p-4 rounded-none">Content</Card>

// Interactive card
<Card className="cursor-pointer hover:border-primary transition-colors rounded-none">
  {/* Content */}
</Card>

// Selected card
<Card className="border-primary bg-primary/5 rounded-none">
  {/* Content */}
</Card>

// Disabled card
<Card className="opacity-50 pointer-events-none rounded-none">
  {/* Content */}
</Card>
```

### Card Header Patterns

#### Simple Header

```tsx
<div className="border-b border-border px-4 py-2">
  <span className="font-mono text-xs text-muted-foreground">[TITLE]:</span>
</div>
```

#### Traffic Light Header

```tsx
<div className="border-b border-border px-4 py-2 flex items-center gap-2">
  <div className="flex gap-1.5">
    <div className="size-2 rounded-full bg-destructive/50" />
    <div className="size-2 rounded-full bg-warning/50" />
    <div className="size-2 rounded-full bg-success/50" />
  </div>
  <span className="font-mono text-xs text-muted-foreground">filename.tsx</span>
</div>
```

#### Header with Actions

```tsx
<div className="border-b border-border px-4 py-2 flex items-center justify-between">
  <span className="font-mono text-xs text-muted-foreground">[SECTION]:</span>
  <Button size="sm" variant="ghost" className="h-6 px-2">
    > EDIT
  </Button>
</div>
```

---

## Select/Dropdown Design

### Select Pattern

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

### With Label

```tsx
<div className="space-y-2">
  <Label htmlFor="country">[COUNTRY]:</Label>
  <Select>
    <SelectTrigger id="country" className="rounded-none">
      <SelectValue placeholder="Select country..." />
    </SelectTrigger>
    <SelectContent className="rounded-none">
      <SelectItem value="us" className="text-left">United States</SelectItem>
      <SelectItem value="uk" className="text-left">United Kingdom</SelectItem>
    </SelectContent>
  </Select>
</div>
```

---

## Tabs Design

### Tab Pattern

```tsx
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

### Tab Accessibility

```tsx
// CRITICAL: Tabs must have hover:text-foreground for contrast
<TabsTrigger className="hover:text-foreground transition-colors">
```

---

## Dialog/Modal Design

### Dialog Pattern

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>> OPEN_DIALOG</Button>
  </DialogTrigger>
  <DialogContent className="rounded-none">
    <DialogHeader>
      <DialogTitle>[DIALOG_TITLE]</DialogTitle>
      <DialogDescription>
        Dialog description text.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Dialog content */}
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">> CANCEL</Button>
      </DialogClose>
      <Button>> CONFIRM</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Alert Dialog (Destructive)

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">> DELETE</Button>
  </AlertDialogTrigger>
  <AlertDialogContent className="rounded-none">
    <AlertDialogHeader>
      <AlertDialogTitle>[WARNING]: Confirm Deletion</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>> CANCEL</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive">> DELETE</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## Badge/Tag Design

### Badge Variants

```tsx
// Default
<Badge className="rounded-none font-mono text-xs">Default</Badge>

// Secondary
<Badge variant="secondary" className="rounded-none">Secondary</Badge>

// Destructive
<Badge variant="destructive" className="rounded-none">Error</Badge>

// Outline
<Badge variant="outline" className="rounded-none">Outline</Badge>
```

### Status Badge Pattern

```tsx
<Badge variant="outline" className="flex items-center gap-1 rounded-none">
  <span className="size-1.5 rounded-full bg-success" />
  <span>Active</span>
</Badge>
```

---

## Table Design

### Table Pattern

```tsx
<div className="border border-border rounded-none">
  <Table>
    <TableHeader>
      <TableRow className="border-border">
        <TableHead className="font-mono text-xs">[NAME]</TableHead>
        <TableHead className="font-mono text-xs">[STATUS]</TableHead>
        <TableHead className="font-mono text-xs">[ACTIONS]</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="border-border">
        <TableCell className="font-mono text-sm">Item Name</TableCell>
        <TableCell>
          <Badge variant="outline" className="rounded-none">Active</Badge>
        </TableCell>
        <TableCell>
          <Button size="sm" variant="ghost">> EDIT</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

### Table Accessibility

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Name</TableHead>
      <TableHead scope="col">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell scope="row">Project Alpha</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## Checkbox/Radio Design

### Checkbox Pattern

```tsx
<div className="flex items-center gap-2">
  <Checkbox id="terms" className="rounded-none" />
  <Label htmlFor="terms" className="font-mono text-xs">
    Accept terms and conditions
  </Label>
</div>
```

### Radio Group Pattern

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

## Radix UI Patterns

### asChild Composition

```tsx
// REQUIRED when wrapping with Link
<Button asChild>
  <Link href="/dashboard">> DASHBOARD</Link>
</Button>

// WRONG: Nesting without asChild (creates invalid HTML)
<Button>
  <Link href="/dashboard">> DASHBOARD</Link>
</Button>
```

### Controlled State

```tsx
// For programmatic control, ALWAYS include onOpenChange
<Dialog open={isOpen} onOpenChange={setIsOpen}>
<Sheet open={isOpen} onOpenChange={setIsOpen}>
<Popover open={isOpen} onOpenChange={setIsOpen}>
```

---

## Icon Standards

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
```

### Icon + Text Pattern

```tsx
// Icon before text
<Button className="gap-2">
  <DownloadIcon className="h-4 w-4" aria-hidden="true" />
  <span>> DOWNLOAD</span>
</Button>

// Icon after text
<span className="flex items-center gap-1">
  Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
</span>
```

---

## Quick Reference Checklist

### Before Every Commit

- [ ] All buttons use `> UPPERCASE_UNDERSCORES` format
- [ ] All components use `rounded-none`
- [ ] All icon buttons have `aria-label`
- [ ] Form inputs have associated labels
- [ ] Error messages include `[ERROR]:` prefix
- [ ] Dialogs include close button
- [ ] Tabs have `hover:text-foreground` for contrast
- [ ] Select items use `text-left` alignment
- [ ] Destructive actions have confirmation dialogs
