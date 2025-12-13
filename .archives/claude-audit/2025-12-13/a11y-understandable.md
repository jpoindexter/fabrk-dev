# Accessibility: Understandable (WCAG 3.x)

Information and user interface operation must be understandable.

---

## 3.1.1 Language of Page (Level A)

```tsx
// Set page language
<html lang="en">

// Override for foreign language content
<p>The French word for hello is <span lang="fr">bonjour</span>.</p>
```

---

## 3.2.1 On Focus (Level A)

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

---

## 3.2.2 On Input (Level A)

```tsx
// Input MUST NOT cause unexpected changes without warning

// WRONG: Auto-navigation on select
<Select onChange={() => navigate('/new-page')}>

// CORRECT: Require submit action
<Select onChange={setFilter}>
<Button onClick={() => applyFilterAndNavigate()}>> APPLY</Button>
```

---

## 3.3.1 Error Identification (Level A)

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

---

## 3.3.2 Labels or Instructions (Level A)

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

---

## 3.3.3 Error Suggestion (Level AA)

```tsx
// Provide specific correction suggestions

// WRONG: Generic error
<p>[ERROR]: Invalid input</p>

// CORRECT: Specific suggestion
<p>[ERROR]: Email must include @ symbol. Example: user@example.com</p>
```

---

## 3.3.4 Error Prevention (Level AA)

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

---

## Error Message Patterns

### Terminal-Style Errors

```tsx
// Error format
<p className="text-destructive font-mono text-xs">
  [ERROR]: {message}
</p>

// Success format
<p className="text-success font-mono text-xs">
  [SUCCESS]: {message}
</p>

// Warning format
<p className="text-warning font-mono text-xs">
  [WARNING]: {message}
</p>
```

### Form Error States

```tsx
// Input with error
<Input
  className={cn(
    "rounded-none",
    hasError && "border-destructive focus-visible:ring-destructive"
  )}
  aria-invalid={hasError}
  aria-describedby={hasError ? `${id}-error` : undefined}
/>

// Error message
{hasError && (
  <p
    id={`${id}-error`}
    className="text-destructive font-mono text-xs mt-1"
    role="alert"
  >
    [ERROR]: {error}
  </p>
)}
```

---

## Scan Commands

```bash
# Check for aria-invalid usage
grep -rn "aria-invalid" src/ --include="*.tsx"

# Check for error message patterns
grep -rn 'role="alert"' src/ --include="*.tsx"

# Find inputs without labels
grep -rn "<Input\|<input" src/ --include="*.tsx" | grep -v "id=\|aria-label"
grep -rn "<Label" src/ --include="*.tsx" | grep -v "htmlFor"
```

---

## Checklist

- [ ] Page has `lang` attribute on `<html>`
- [ ] Foreign language content has `lang` override
- [ ] Focus doesn't cause unexpected changes
- [ ] Input doesn't cause unexpected navigation
- [ ] Form errors identified with `aria-invalid`
- [ ] Error messages associated via `aria-describedby`
- [ ] Errors announced via `role="alert"`
- [ ] Error messages are specific and helpful
- [ ] Destructive actions require confirmation
- [ ] Form instructions are clear
