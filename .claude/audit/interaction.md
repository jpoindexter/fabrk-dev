# Interaction Design

Comprehensive interaction patterns.

---

## Quick Reference

| Topic | File |
|-------|------|
| States | [`interaction-states.md`](interaction-states.md) |
| Animation | [`interaction-animation.md`](interaction-animation.md) |

---

## Touch Targets

| Device | Minimum |
|--------|---------|
| Mobile | 44×44px |
| Desktop | 24×24px |
| Icon button | 32×32px |

---

## State Summary

### Hover

```tsx
className="hover:bg-muted transition-colors"
className="hover:border-primary transition-colors"
className="hover:text-foreground transition-colors"
```

### Focus (CRITICAL)

```tsx
className="focus-visible:outline-2 focus-visible:outline-ring"

// BANNED:
className="outline-none"  // Never alone
```

### Disabled

```tsx
className="opacity-50 cursor-not-allowed"
```

### Loading

```tsx
<Loader2 className="h-4 w-4 animate-spin" />
<Skeleton className="h-4 w-full" />
```

---

## Transition Timing

| Duration | Use |
|----------|-----|
| 150ms | Hover |
| 200ms | Standard |
| 300ms | Complex |
| 500ms+ | ⚠️ Too slow |

---

## Reduced Motion

```tsx
className="motion-safe:animate-fadeIn"
className="motion-reduce:animate-none"
```

---

## Checklist by Component

| Component | Hover | Focus | Active | Disabled | Loading |
|-----------|-------|-------|--------|----------|---------|
| Button | ✓ | ✓ | ✓ | ✓ | ✓ |
| Link | ✓ | ✓ | ✓ | - | - |
| Input | ✓ | ✓ | - | ✓ | - |
| Card | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tab | ✓ | ✓ | ✓ | ✓ | - |
| Checkbox | ✓ | ✓ | ✓ | ✓ | - |
| Select | ✓ | ✓ | - | ✓ | ✓ |
