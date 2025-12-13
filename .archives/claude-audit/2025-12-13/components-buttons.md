# Components: Buttons

Button design patterns in the terminal aesthetic.

---

## Button Variants

| Variant | Use | Example |
|---------|-----|---------|
| `default` | Primary actions | Save, Submit |
| `secondary` | Secondary actions | Cancel, Back |
| `destructive` | Dangerous actions | Delete, Remove |
| `outline` | Tertiary actions | Learn More |
| `ghost` | Subtle actions | Menu items |
| `link` | Text links | Read more |

---

## Button Sizes

| Size | Height | Padding | Font |
|------|--------|---------|------|
| `sm` | 32px | px-3 | text-xs |
| `default` | 40px | px-4 | text-sm |
| `lg` | 48px | px-8 | text-base |
| `icon` | 40x40px | p-2 | - |

---

## Terminal Format (REQUIRED)

```tsx
// REQUIRED: > PREFIX + UPPERCASE + UNDERSCORES
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>
<Button className="rounded-none font-mono text-xs">> SAVE_CHANGES</Button>
<Button className="rounded-none font-mono text-xs">> DELETE_ACCOUNT</Button>
```

---

## Button Patterns

### Primary Action (Rightmost)

```tsx
<div className="flex justify-end gap-2">
  <Button variant="outline">> CANCEL</Button>
  <Button>> SAVE</Button>
</div>
```

### Destructive (Confirm First)

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

### Loading State

```tsx
<Button disabled>
  <Loader2 className="h-4 w-4 animate-spin mr-2" />
  > SAVING...
</Button>
```

### Icon + Text

```tsx
<Button className="gap-2">
  <Download className="h-4 w-4" aria-hidden="true" />
  > DOWNLOAD
</Button>
```

### Icon Only (Requires aria-label)

```tsx
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>
```

---

## Checklist

- [ ] Uses `> UPPERCASE` format
- [ ] Uses `rounded-none`
- [ ] Icon-only has `aria-label`
- [ ] Destructive has confirmation
- [ ] Loading shows spinner
