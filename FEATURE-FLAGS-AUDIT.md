# Feature Flags Audit

This document tracks all feature flags in the codebase, their status, and cleanup recommendations.

## Current Feature Flags

### Active Flags

| Flag Key | Status | Rollout | Description | Owner | Created | Review Date |
|----------|--------|---------|-------------|-------|---------|-------------|
| `dark_mode` | ✅ Enabled | 100% | Dark mode theme | Core | - | - |
| `advanced_analytics` | ✅ Enabled | 50% | Advanced analytics dashboard | Product | - | Quarterly |

### Development/Beta Flags

| Flag Key | Status | Rollout | Description | Owner | Target Release |
|----------|--------|---------|-------------|-------|----------------|
| `new_dashboard` | ⏸️ Paused | 0% | New dashboard UI redesign | Frontend | TBD |
| `ai_features` | ⏸️ Paused | Admin only | AI-powered features | AI Team | TBD |
| `beta_features` | ⏸️ Paused | Specific users | Beta features access | Product | TBD |

---

## Flag Status Legend

| Status | Meaning |
|--------|---------|
| ✅ Enabled | Flag is active in production |
| ⏸️ Paused | Flag exists but is disabled |
| 🗑️ Deprecated | Flag should be removed |
| 🆕 New | Recently added flag |

---

## Cleanup Recommendations

### Flags Ready for Cleanup

| Flag | Reason | Action | Priority |
|------|--------|--------|----------|
| `dark_mode` | Fully rolled out (100%) | Remove flag, make permanent | Low |

### Flags Needing Review

| Flag | Last Activity | Recommendation |
|------|---------------|----------------|
| `new_dashboard` | Unknown | Evaluate if still planned |
| `ai_features` | Unknown | Evaluate timeline |
| `beta_features` | Unknown | Review target users |

---

## Flag Management Process

### Adding a New Flag

1. **Define the flag** in `src/lib/feature-flags/index.ts`:
   ```typescript
   my_new_feature: {
     key: "my_new_feature",
     enabled: false,
     description: "Description of feature",
     rolloutPercentage: 0,
     environments: ["development", "staging"],
   },
   ```

2. **Add to FeatureFlags enum**:
   ```typescript
   export const FeatureFlags = {
     // ... existing flags
     MY_NEW_FEATURE: "my_new_feature",
   } as const;
   ```

3. **Document** in this audit file

4. **Set review date** (typically 90 days after creation)

### Rolling Out a Flag

1. Start with 0% rollout
2. Test in development/staging
3. Gradually increase: 1% → 10% → 25% → 50% → 100%
4. Monitor metrics at each stage
5. Document rollout progress

### Removing a Flag

1. Verify flag is at 100% for 30+ days
2. Remove all `isFeatureEnabled()` checks from code
3. Remove flag from `defaultFlags` object
4. Remove from `FeatureFlags` enum
5. Update this audit document
6. Deploy cleanup

---

## Audit Schedule

| Task | Frequency | Last Completed |
|------|-----------|----------------|
| Flag usage review | Monthly | [Date] |
| Stale flag cleanup | Quarterly | [Date] |
| Full audit | Annually | [Date] |

---

## Usage Patterns

### Server-Side Usage

```typescript
import { isFeatureEnabled, FeatureFlags } from '@/lib/feature-flags';

// In server components/API routes
const showNewDashboard = isFeatureEnabled(FeatureFlags.NEW_DASHBOARD, {
  userId: session.user.id,
  role: session.user.role,
  environment: process.env.NODE_ENV,
});
```

### Client-Side Usage

```typescript
import { useFeatureFlag } from '@/lib/feature-flags/hooks';

function MyComponent() {
  const isEnabled = useFeatureFlag('my_feature');

  if (!isEnabled) return null;
  return <NewFeature />;
}
```

### A/B Testing

```typescript
const variant = getFeatureVariant('experiment_name', { userId });

switch (variant) {
  case 'control':
    return <ControlVersion />;
  case 'variant_a':
    return <VariantA />;
  default:
    return <ControlVersion />;
}
```

---

## Best Practices

1. **Keep flags temporary** - Every flag should have a planned removal date
2. **Use descriptive names** - `new_checkout_flow` not `feature_1`
3. **Document thoroughly** - Add description and owner
4. **Clean up promptly** - Remove flags within 30 days of 100% rollout
5. **Monitor impact** - Track metrics for each flag
6. **Limit active flags** - Aim for <10 active flags at any time

---

## Related Documentation

- [Feature Flags Implementation](./src/lib/feature-flags/index.ts)
- [Admin Feature Flags API](./src/app/api/admin/feature-flags/route.ts)
- [A/B Testing Guide](./AB-TESTING.md)
