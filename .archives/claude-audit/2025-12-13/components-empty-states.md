# Empty State Patterns Audit

Standards for displaying empty, loading, and error states.

---

## Quick Reference

| State | Components | Requirements |
|-------|------------|--------------|
| Empty | Icon + title + description + action | Must be actionable |
| Loading | Skeleton or spinner | Must match content shape |
| Error | Icon + message + retry action | Must be recoverable |

---

## Empty State Pattern

### Structure

```typescript
// ✅ CORRECT - Complete empty state
<div className="flex flex-col items-center justify-center py-12 text-center">
  {/* Icon - Represents the empty content type */}
  <div className="mb-4 rounded-none border bg-muted p-4">
    <FileText className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
  </div>

  {/* Title - What's missing */}
  <h3 className="font-mono text-lg font-semibold">No documents yet</h3>

  {/* Description - Why it's empty or what to do */}
  <p className="mt-2 max-w-sm font-mono text-sm text-muted-foreground">
    Create your first document to get started with collaboration.
  </p>

  {/* Action - Primary CTA to resolve empty state */}
  <Button className="mt-6">> CREATE_DOCUMENT</Button>
</div>

// ❌ WRONG - Just text
<p>No items found</p>

// ❌ WRONG - No action
<div className="text-center">
  <Icon />
  <p>No documents</p>
</div>
```

### Using EmptyState Component

```typescript
import { EmptyState } from "@/components/ui/empty-state";

<EmptyState
  icon={FileText}
  title="No documents yet"
  description="Create your first document to get started."
  action={{
    label: "> CREATE_DOCUMENT",
    onClick: () => router.push("/documents/new"),
  }}
/>
```

---

## Loading State Pattern

### Skeleton Matching Content

```typescript
// ✅ CORRECT - Skeleton matches list item shape
function UserListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-none" /> {/* Avatar */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" /> {/* Name */}
            <Skeleton className="h-3 w-1/2" /> {/* Email */}
          </div>
          <Skeleton className="h-8 w-20" /> {/* Action */}
        </div>
      ))}
    </div>
  );
}

// ❌ WRONG - Generic spinner
function UserListLoading() {
  return <Spinner />;  // Doesn't show expected layout
}

// ❌ WRONG - Skeleton doesn't match content
function UserListSkeleton() {
  return <Skeleton className="h-64 w-full" />;  // One big block
}
```

### Loading Container

```typescript
// ✅ CORRECT - Accessible loading state
<div
  role="status"
  aria-label="Loading users"
  aria-busy="true"
>
  <UserListSkeleton />
  <span className="sr-only">Loading users...</span>
</div>
```

---

## Error State Pattern

### Structure

```typescript
// ✅ CORRECT - Recoverable error state
<div
  className="flex flex-col items-center justify-center py-12 text-center"
  role="alert"
>
  {/* Icon */}
  <div className="mb-4 rounded-none border border-destructive bg-destructive/10 p-4">
    <AlertCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
  </div>

  {/* Title */}
  <h3 className="font-mono text-lg font-semibold">[ERROR]: Failed to load</h3>

  {/* Description */}
  <p className="mt-2 max-w-sm font-mono text-sm text-muted-foreground">
    We couldn't load your documents. Please try again.
  </p>

  {/* Retry action */}
  <Button
    variant="outline"
    className="mt-6"
    onClick={handleRetry}
  >
    > TRY_AGAIN
  </Button>
</div>
```

### Error Boundary

```typescript
// ✅ CORRECT - Error boundary with recovery
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>[ERROR]: Something went wrong</h2>
          <Button onClick={() => this.setState({ hasError: false })}>
            > TRY_AGAIN
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

---

## State Distinction

### Three States Pattern

```typescript
function UserList({ users, isLoading, error }) {
  // 1. Loading state - Show skeleton
  if (isLoading) {
    return <UserListSkeleton />;
  }

  // 2. Error state - Show error with retry
  if (error) {
    return (
      <EmptyState
        variant="error"
        title="[ERROR]: Failed to load users"
        description={error.message}
        action={{ label: "> RETRY", onClick: refetch }}
      />
    );
  }

  // 3. Empty state - Show CTA to create
  if (users.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No users yet"
        description="Invite your first team member."
        action={{ label: "> INVITE_USER", onClick: openInviteModal }}
      />
    );
  }

  // 4. Data state - Show content
  return <UserListContent users={users} />;
}
```

---

## Suspense Integration

```typescript
// ✅ CORRECT - Suspense with proper fallback
<Suspense fallback={<UserListSkeleton />}>
  <UserList />
</Suspense>

// ❌ WRONG - Generic fallback
<Suspense fallback={<div>Loading...</div>}>
  <UserList />
</Suspense>

// ❌ WRONG - No fallback
<Suspense>
  <UserList />
</Suspense>
```

---

## Accessibility Requirements

### Empty State

```typescript
// Must be focusable for keyboard navigation
<section
  aria-labelledby="empty-title"
  className="flex flex-col items-center"
>
  <h2 id="empty-title">No documents</h2>
  <p>Create your first document</p>
  <Button autoFocus>Create</Button>
</section>
```

### Loading State

```typescript
// Must announce loading to screen readers
<div
  role="status"
  aria-live="polite"
  aria-busy="true"
>
  <Skeleton />
  <span className="sr-only">Loading content...</span>
</div>
```

### Error State

```typescript
// Must announce error to screen readers
<div
  role="alert"
  aria-live="assertive"
>
  <p>[ERROR]: {errorMessage}</p>
</div>
```

---

## Detection Patterns

```bash
# Empty states without action
grep -rE 'No .* (yet|found)' src --include="*.tsx" | grep -v "Button\|action"

# Loading without role="status"
grep -rE 'Skeleton|Spinner' src --include="*.tsx" | grep -v 'role="status"'

# Error without role="alert"
grep -rE '\[ERROR\]|error' src --include="*.tsx" | grep -v 'role="alert"'

# Suspense without fallback
grep -rE '<Suspense>' src --include="*.tsx" | grep -v 'fallback='
```

---

## Checklist

### Empty States Must:

- [ ] Have an icon representing the content type
- [ ] Have a title explaining what's missing
- [ ] Have a description with guidance
- [ ] Have a primary action to resolve
- [ ] Be accessible (focusable, labeled)

### Loading States Must:

- [ ] Match the shape of the content
- [ ] Have role="status" and aria-busy
- [ ] Have sr-only text explaining what's loading
- [ ] Be used in Suspense fallbacks

### Error States Must:

- [ ] Have role="alert"
- [ ] Explain what went wrong
- [ ] Provide a retry action
- [ ] Use terminal style `[ERROR]: message`

---

## Common Issues

| Issue | Impact | Fix |
|-------|--------|-----|
| No action on empty | User stuck | Add CTA button |
| Generic skeleton | Layout shift | Match content shape |
| Error not announced | A11y failure | Add role="alert" |
| Loading not announced | A11y failure | Add role="status" |
