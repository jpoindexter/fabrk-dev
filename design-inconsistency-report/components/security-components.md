# Security Components Design Audit

> **Location:** `src/components/security/`
> **Compliance Score:** 70/100

---

## Summary

The security components have significant card header violations. All security cards use the default shadcn `CardHeader`/`CardTitle` pattern instead of the terminal-styled `StyledCardHeader`. This creates visual inconsistency with the rest of the application.

---

## Component Analysis

### security-password-card.tsx

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 17 | Non-terminal CardHeader | Uses `CardHeader` + `CardTitle` | Should use `StyledCardHeader` |

**Current Implementation:**
```tsx
<CardHeader>
  <CardTitle>Password</CardTitle>
  <CardDescription>Manage your password settings</CardDescription>
</CardHeader>
```

**Expected Implementation:**
```tsx
<StyledCardHeader title="PASSWORD" />
<CardContent>
  <p className="font-mono text-xs text-muted-foreground mb-4">
    Manage your password settings
  </p>
  ...
</CardContent>
```

---

### security-2fa-card.tsx

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 31 | Non-terminal CardHeader | Uses `CardHeader` + `CardTitle` | Should use `StyledCardHeader` |

**Current Implementation:**
```tsx
<CardHeader>
  <CardTitle>Two-Factor Authentication</CardTitle>
  <CardDescription>Add an extra layer of security</CardDescription>
</CardHeader>
```

**Expected Implementation:**
```tsx
<StyledCardHeader title="TWO_FACTOR_AUTHENTICATION" />
```

---

### security-accounts-card.tsx

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 21 | Non-terminal CardHeader | Uses `CardHeader` + `CardTitle` | Should use `StyledCardHeader` |

**Current Implementation:**
```tsx
<CardHeader>
  <CardTitle>Connected Accounts</CardTitle>
  <CardDescription>Manage your linked accounts</CardDescription>
</CardHeader>
```

**Expected Implementation:**
```tsx
<StyledCardHeader title="CONNECTED_ACCOUNTS" />
```

---

### security-sessions-card.tsx

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 25 | Non-terminal CardHeader | Uses `CardHeader` + `CardTitle` | Should use `StyledCardHeader` |

**Current Implementation:**
```tsx
<CardHeader>
  <CardTitle>Active Sessions</CardTitle>
  <CardDescription>Manage your active sessions</CardDescription>
</CardHeader>
```

**Expected Implementation:**
```tsx
<StyledCardHeader title="ACTIVE_SESSIONS" />
```

---

### security-recommendations-card.tsx

**Violations:**

| Line | Issue | Current | Expected |
|------|-------|---------|----------|
| 14 | Non-terminal CardHeader | Uses `CardHeader` + `CardTitle` | Should use `StyledCardHeader` |

**Current Implementation:**
```tsx
<CardHeader>
  <CardTitle>Security Recommendations</CardTitle>
</CardHeader>
```

**Expected Implementation:**
```tsx
<StyledCardHeader title="SECURITY_RECOMMENDATIONS" />
```

---

## Common Pattern Issues

### Issue 1: CardDescription Placement

The current components use `CardDescription` inside `CardHeader`. With terminal styling, descriptions should move to `CardContent`:

**Current (Wrong):**
```tsx
<CardHeader>
  <CardTitle>Title</CardTitle>
  <CardDescription>Description</CardDescription>
</CardHeader>
<CardContent>
  {/* content */}
</CardContent>
```

**Expected (Correct):**
```tsx
<StyledCardHeader title="TITLE" />
<CardContent>
  <p className="font-mono text-xs text-muted-foreground mb-4">
    Description
  </p>
  {/* content */}
</CardContent>
```

### Issue 2: Title Formatting

Titles should be uppercase with underscores:
- "Password" → "PASSWORD"
- "Two-Factor Authentication" → "TWO_FACTOR_AUTHENTICATION"
- "Connected Accounts" → "CONNECTED_ACCOUNTS"
- "Active Sessions" → "ACTIVE_SESSIONS"
- "Security Recommendations" → "SECURITY_RECOMMENDATIONS"

---

## Recommended Fix Pattern

For each security card component:

1. **Import StyledCardHeader:**
```tsx
import { Card, CardContent, StyledCardHeader } from "@/components/ui/card";
```

2. **Replace CardHeader/CardTitle:**
```tsx
// Before
<CardHeader>
  <CardTitle>Title Here</CardTitle>
  <CardDescription>Description</CardDescription>
</CardHeader>

// After
<StyledCardHeader title="TITLE_HERE" />
```

3. **Move description to CardContent:**
```tsx
<CardContent>
  <p className="font-mono text-xs text-muted-foreground mb-4">
    Description text
  </p>
  {/* rest of content */}
</CardContent>
```

---

## Files to Update

| File | Priority | Changes |
|------|----------|---------|
| `security-password-card.tsx` | High | Replace CardHeader with StyledCardHeader |
| `security-2fa-card.tsx` | High | Replace CardHeader with StyledCardHeader |
| `security-accounts-card.tsx` | High | Replace CardHeader with StyledCardHeader |
| `security-sessions-card.tsx` | High | Replace CardHeader with StyledCardHeader |
| `security-recommendations-card.tsx` | High | Replace CardHeader with StyledCardHeader |

**Total:** 5 files requiring header updates

---

## Migration Checklist

For each security component:

- [ ] Import `StyledCardHeader` from `@/components/ui/card`
- [ ] Remove `CardHeader`, `CardTitle`, `CardDescription` imports
- [ ] Replace `<CardHeader>...</CardHeader>` with `<StyledCardHeader title="UPPERCASE_TITLE" />`
- [ ] Move description text to `CardContent` with proper styling
- [ ] Verify all text uses `font-mono` class
- [ ] Test visual consistency with other cards
