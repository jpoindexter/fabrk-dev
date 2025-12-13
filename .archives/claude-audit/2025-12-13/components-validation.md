# Form Validation Patterns Audit

Patterns for form validation, error handling, and user feedback.

---

## Quick Reference

| Check | Severity | Pattern |
|-------|----------|---------|
| Missing error message | HIGH | No feedback on validation failure |
| Error not linked to input | HIGH | Missing aria-describedby |
| No required indicator | MEDIUM | Required fields not marked |
| Validation on blur only | MEDIUM | Should also validate on submit |
| No loading state | MEDIUM | Form submits without feedback |

---

## Error Message Placement

### Correct Pattern

```typescript
// ✅ CORRECT - Error below input, linked with aria-describedby
<div className="space-y-2">
  <Label htmlFor="email">
    Email
    <span className="text-destructive ml-1">*</span>
  </Label>
  <Input
    id="email"
    type="email"
    aria-invalid={!!error}
    aria-describedby={error ? "email-error" : undefined}
  />
  {error && (
    <p id="email-error" className="text-sm text-destructive" role="alert">
      {error}
    </p>
  )}
</div>

// ❌ WRONG - Error not linked
<Input id="email" />
{error && <p className="text-red-500">{error}</p>}

// ❌ WRONG - Error above input (confusing)
{error && <p>{error}</p>}
<Input id="email" />
```

### Terminal Style Error

```typescript
<p
  id="email-error"
  className="font-mono text-xs text-destructive"
  role="alert"
>
  [ERROR]: {error}
</p>
```

---

## Required Field Indicators

### Visual Indicator

```typescript
// ✅ CORRECT - Asterisk with sr-only explanation
<Label htmlFor="email">
  Email
  <span className="text-destructive ml-1" aria-hidden="true">*</span>
  <span className="sr-only">(required)</span>
</Label>

// ✅ CORRECT - Using required prop
<Label htmlFor="email" required>Email</Label>

// ❌ WRONG - No indicator for required field
<Label htmlFor="email">Email</Label>
<Input id="email" required />
```

---

## Validation Timing

### When to Validate

| Event | What to Validate | Example |
|-------|------------------|---------|
| `onBlur` | Format, constraints | Email format |
| `onChange` | Real-time feedback | Password strength |
| `onSubmit` | All fields, required | Final validation |

### Validation Flow

```typescript
"use client";

import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function SignupForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate single field on blur
  const validateField = (name: string, value: string) => {
    const result = schema.shape[name].safeParse(value);
    if (!result.success) {
      setErrors(prev => ({ ...prev, [name]: result.error.errors[0].message }));
    } else {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate all on submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0] || ""])
        )
      );
      return;
    }

    // Submit valid data
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        onBlur={(e) => {
          setTouched(prev => ({ ...prev, email: true }));
          validateField("email", e.target.value);
        }}
        aria-invalid={touched.email && !!errors.email}
        aria-describedby={errors.email ? "email-error" : undefined}
      />
      {touched.email && errors.email && (
        <p id="email-error" role="alert">{errors.email}</p>
      )}
    </form>
  );
}
```

---

## React Hook Form Pattern

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Submit data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email" required>Email</Label>
        <Input
          id="email"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="font-mono text-xs text-destructive" role="alert">
            [ERROR]: {errors.email.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "> SUBMIT"}
      </Button>
    </form>
  );
}
```

---

## Multi-Step Form Validation

```typescript
// Validate current step before proceeding
const validateStep = async (step: number) => {
  const stepSchema = {
    0: z.object({ email: z.string().email() }),
    1: z.object({ name: z.string().min(2) }),
    2: z.object({ company: z.string().optional() }),
  }[step];

  const result = stepSchema.safeParse(formData);
  if (!result.success) {
    setErrors(result.error.flatten().fieldErrors);
    return false;
  }
  return true;
};

const handleNext = async () => {
  if (await validateStep(currentStep)) {
    setCurrentStep(prev => prev + 1);
  }
};
```

---

## Loading & Submit States

```typescript
// ✅ CORRECT - Loading state with disabled form
<Button type="submit" disabled={isSubmitting}>
  {isSubmitting ? (
    <>
      <Spinner className="mr-2 h-4 w-4" />
      Submitting...
    </>
  ) : (
    "> SUBMIT"
  )}
</Button>

// ✅ CORRECT - Disable all inputs during submit
<fieldset disabled={isSubmitting}>
  <Input name="email" />
  <Input name="password" />
  <Button type="submit">> SUBMIT</Button>
</fieldset>
```

---

## Detection Patterns

```bash
# Forms without aria-describedby for errors
grep -rE '<Input[^>]*>' src --include="*.tsx" | grep -v "aria-describedby"

# Error messages without role="alert"
grep -rE 'text-destructive|text-red' src --include="*.tsx" | grep -v 'role="alert"'

# Required inputs without visual indicator
grep -rE 'required' src --include="*.tsx" | grep -v '\*'

# Forms without loading state
grep -rE 'onSubmit|handleSubmit' src --include="*.tsx" | grep -v 'isSubmitting\|isLoading'
```

---

## Checklist

### Every Form Must Have:

- [ ] All required fields marked with asterisk
- [ ] Error messages below inputs
- [ ] Errors linked with aria-describedby
- [ ] Error messages have role="alert"
- [ ] Validation on blur for format
- [ ] Validation on submit for all
- [ ] Loading state during submission
- [ ] Disabled state during submission
- [ ] Success feedback after submit

### Error Messages Must:

- [ ] Be specific (not just "Invalid")
- [ ] Tell user how to fix
- [ ] Use terminal style `[ERROR]: message`
- [ ] Be announced by screen readers

---

## Common Issues

| Issue | Impact | Fix |
|-------|--------|-----|
| No error feedback | User confused | Add error messages |
| Error not announced | A11y failure | Add role="alert" |
| No required indicator | User misses fields | Add asterisk |
| No loading state | Double submits | Add isSubmitting |
| Validation on submit only | Poor UX | Add onBlur validation |
