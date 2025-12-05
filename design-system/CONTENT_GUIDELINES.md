# Content Guidelines

> Terminal-style content standards for Fabrk

---

## Canonical Terms

Use these exact terms consistently across all UI elements:

| Category | Canonical Term | Avoid |
|----------|----------------|-------|
| **Authentication** | Sign In | Login, Log in, log in |
| **Registration** | Sign Up | Register, Create Account |
| **Session End** | Sign Out | Logout, Log out, log out |
| **Confirmation** | Confirm | OK, Yes |
| **Cancellation** | Cancel | No, Close (when cancelling action) |
| **Deletion** | Delete | Remove (for permanent actions) |
| **Saving** | Save | Update (when saving form data) |

---

## Button Text Format

All interactive buttons must follow terminal style:

### Format
```
> ACTION_NAME
```

### Examples

| Context | Correct | Incorrect |
|---------|---------|-----------|
| Primary action | `> SAVE_CHANGES` | "Save Changes", "Save" |
| Destructive | `> DELETE` | "Delete", "Remove" |
| Navigation | `> GO_TO_DASHBOARD` | "Go to Dashboard" |
| Auth | `> SIGN_IN` | "Sign In", "Login" |
| Confirmation | `> CONFIRM` | "Confirm", "OK" |
| Cancel | `> CANCEL` | "Cancel", "No" |

### Special Cases

1. **Loading states**: `> LOADING...` or `> SAVING...`
2. **Disabled states**: Same format, just styled differently
3. **Icon buttons**: No text needed, use aria-label

---

## Label Format

Labels use bracket notation:

### Format
```
[LABEL_NAME]:
```

### Examples

```tsx
// Field labels
<span className="font-mono text-xs text-muted-foreground">[EMAIL]:</span>
<span className="font-mono text-xs text-muted-foreground">[PASSWORD]:</span>

// Status labels
<span className="font-mono text-xs text-success">[SUCCESS]: Operation completed</span>
<span className="font-mono text-xs text-destructive">[ERROR]: Something went wrong</span>
<span className="font-mono text-xs text-warning">[WARNING]: Please review</span>
```

---

## Card Headers

Cards use terminal window style headers:

### Format
```
[ [0xNN] SECTION_TITLE ]
```

### Examples

```tsx
// Component showcase
[ [0x00] BUTTONS ]
[ [0x01] FORMS ]
[ [0x02] NAVIGATION ]

// Feature sections
[ [0x30] AUTHENTICATION ]
[ [0x31] BILLING ]
[ [0x32] SETTINGS ]
```

---

## Error Messages

### Format
```
[ERROR]: Brief description of what went wrong.
```

### Examples

| Context | Message |
|---------|---------|
| Validation | `[ERROR]: Email is required` |
| Auth | `[ERROR]: Invalid credentials` |
| Network | `[ERROR]: Connection failed. Please try again.` |
| Permission | `[ERROR]: You don't have permission to perform this action` |

---

## Success Messages

### Format
```
[SUCCESS]: Brief confirmation of what happened.
```

### Examples

| Context | Message |
|---------|---------|
| Save | `[SUCCESS]: Changes saved` |
| Delete | `[SUCCESS]: Item deleted` |
| Auth | `[SUCCESS]: Signed in successfully` |
| Email | `[SUCCESS]: Verification email sent` |

---

## Empty States

Use terminal-style placeholders:

```tsx
<div className="text-center py-12">
  <span className="font-mono text-muted-foreground text-xs">
    [NO_DATA]: No items found
  </span>
</div>
```

---

## Loading States

Use terminal-style loading indicators:

```tsx
// Button loading
<Button disabled>> LOADING...</Button>

// Page loading
<span className="font-mono text-xs animate-pulse">[LOADING]...</span>

// Section loading
<span className="font-mono text-xs">[FETCHING_DATA]...</span>
```

---

## Timestamps & Dates

Use relative time with terminal format:

```tsx
// Recent
<span className="font-mono text-xs">2 minutes ago</span>

// Older
<span className="font-mono text-xs">Dec 5, 2024</span>

// With time
<span className="font-mono text-xs">Dec 5, 2024 at 14:30</span>
```

---

## Numbers & Statistics

Use uppercase labels:

```tsx
<div className="font-mono">
  <span className="text-xs text-muted-foreground">[TOTAL]:</span>
  <span className="text-2xl font-bold">1,234</span>
</div>
```

---

## Implementation Checklist

When creating new UI:

- [ ] Buttons use `> ACTION_NAME` format
- [ ] Labels use `[LABEL]:` format
- [ ] Card headers include hex code `[ [0xNN] TITLE ]`
- [ ] Use "Sign In" not "Login"
- [ ] Use "Sign Up" not "Register"
- [ ] Use "Sign Out" not "Logout"
- [ ] Error messages use `[ERROR]:` prefix
- [ ] Success messages use `[SUCCESS]:` prefix
- [ ] All text uses `font-mono`
- [ ] Spacing follows 8-point grid

---

*Last updated: December 5, 2025*
