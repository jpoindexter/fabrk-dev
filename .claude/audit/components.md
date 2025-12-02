# Component Design Patterns

Design patterns for the terminal aesthetic.

---

## Quick Reference

| Topic | File |
|-------|------|
| Forms | [`components-forms.md`](components-forms.md) |
| Buttons | [`components-buttons.md`](components-buttons.md) |
| Cards & Dialogs | [`components-cards.md`](components-cards.md) |

---

## Terminal Styling Summary

### All Components

```tsx
className="rounded-none"
```

### Labels

```tsx
<span className="font-mono text-xs text-muted-foreground">[LABEL]:</span>
```

### Buttons

```tsx
<Button className="rounded-none font-mono text-xs">> ACTION</Button>
```

### Error Messages

```tsx
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>
```

---

## Icon Standards

| Context | Size | Tailwind |
|---------|------|----------|
| Inline text | 16px | `h-4 w-4` |
| Buttons | 16-20px | `h-4 w-4` |
| Navigation | 20px | `h-5 w-5` |
| Large | 24px | `h-6 w-6` |
| Hero | 32-48px | `h-8 w-8` |

### Accessibility

```tsx
// Decorative (hidden)
<Icon className="h-4 w-4" aria-hidden="true" />

// Meaningful (announced)
<Icon className="h-4 w-4" aria-label="Download file" />

// Icon-only button (REQUIRES aria-label)
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>
```

---

## Radix UI Patterns

### asChild Composition

```tsx
// REQUIRED when wrapping with Link
<Button asChild>
  <Link href="/dashboard">> DASHBOARD</Link>
</Button>
```

### Controlled State

```tsx
// ALWAYS include onOpenChange
<Dialog open={isOpen} onOpenChange={setIsOpen}>
<Sheet open={isOpen} onOpenChange={setIsOpen}>
<Popover open={isOpen} onOpenChange={setIsOpen}>
```

---

## Checklist

- [ ] All buttons use `> UPPERCASE` format
- [ ] All components use `rounded-none`
- [ ] All icon buttons have `aria-label`
- [ ] Form inputs have labels
- [ ] Errors include `[ERROR]:` prefix
- [ ] Dialogs include close button
- [ ] Tabs have `hover:text-foreground`
- [ ] Select items use `text-left`
- [ ] Destructive actions have confirmation
