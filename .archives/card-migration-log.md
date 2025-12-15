# Card Migration Log

## Migration Status

| Priority              | Status   | Count        |
| --------------------- | -------- | ------------ |
| Already Canonical     | Complete | 25 cards     |
| Needs Terminal Header | Pending  | 15 cards     |
| Inline JSX            | Pending  | 10 instances |

---

## Completed Migrations

### Phase 1: Canonical Card Component Created (2025-12-06)

- Added `TerminalCard`, `TerminalCardHeader`, `TerminalCardContent`, `TerminalCardFooter`
- Enhanced `StyledCardHeader` with `meta` prop support
- Added `variant` and `tone` props for styling flexibility

**Files Modified:**

- `src/components/ui/card.tsx` - Added new canonical components

---

## Cards Already Using Canonical Pattern

These cards already follow the terminal card pattern and need no migration:

| Card                        | File                                                                      | Status    |
| --------------------------- | ------------------------------------------------------------------------- | --------- |
| DocsCard                    | `src/components/docs/blocks/docs-card.tsx`                                | Compliant |
| DocsLinkCard                | `src/components/docs/blocks/docs-link-card.tsx`                           | Compliant |
| SecurityPasswordCard        | `src/components/security/security-password-card.tsx`                      | Compliant |
| Security2FACard             | `src/components/security/security-2fa-card.tsx`                           | Compliant |
| SecurityAccountsCard        | `src/components/security/security-accounts-card.tsx`                      | Compliant |
| SecuritySessionsCard        | `src/components/security/security-sessions-card.tsx`                      | Compliant |
| SecurityRecommendationsCard | `src/components/security/security-recommendations-card.tsx`               | Compliant |
| FeatureCategoryCard         | `src/app/features/components/feature-category-card.tsx`                   | Compliant |
| PaymentMethodsCard          | `src/app/templates/billing-dashboard/components/payment-methods-card.tsx` | Compliant |
| RecentInvoicesCard          | `src/app/templates/billing-dashboard/components/recent-invoices-card.tsx` | Compliant |
| UsageMetricsCard            | `src/app/templates/billing-dashboard/components/usage-metrics-card.tsx`   | Compliant |
| CurrentPlanCard (Template)  | `src/app/templates/billing-dashboard/components/current-plan-card.tsx`    | Compliant |
| PlanCards                   | `src/app/templates/billing-dashboard/components/plan-cards.tsx`           | Compliant |
| PricingCards                | `src/app/templates/pricing-page/components/pricing-cards.tsx`             | Compliant |
| ResultCard                  | `src/app/templates/search-results/components/result-card.tsx`             | Compliant |
| ActivityFeed                | `src/app/templates/analytics-dashboard/components/activity-feed.tsx`      | Compliant |
| AccountStatus               | `src/app/(dashboard)/dashboard/components/account-status.tsx`             | Compliant |
| RecentActivity              | `src/app/(dashboard)/dashboard/components/recent-activity.tsx`            | Compliant |
| StatsCards (Dashboard)      | `src/app/(dashboard)/dashboard/components/stats-cards.tsx`                | Compliant |

---

## Cards Needing Migration

### Priority 1: Dashboard/Organization Cards

| Card                  | File                                                                                    | Migration Notes      |
| --------------------- | --------------------------------------------------------------------------------------- | -------------------- |
| CurrentPlanCard (Org) | `src/app/(dashboard)/organizations/[slug]/billing/components/current-plan-card.tsx`     | Add StyledCardHeader |
| BillingHistoryCard    | `src/app/(dashboard)/organizations/[slug]/billing/components/billing-history-card.tsx`  | Add StyledCardHeader |
| UsageStatsCard        | `src/app/(dashboard)/organizations/[slug]/billing/components/usage-stats-card.tsx`      | Add StyledCardHeader |
| RolePermissionsCard   | `src/app/(dashboard)/organizations/[slug]/members/components/role-permissions-card.tsx` | Add StyledCardHeader |

### Priority 2: UI Component Cards

| Card             | File                                          | Migration Notes             |
| ---------------- | --------------------------------------------- | --------------------------- |
| KpiCard          | `src/components/ui/kpi-card.tsx`              | Add terminal header pattern |
| MemberCard       | `src/components/ui/member-card.tsx`           | Add terminal header pattern |
| OrgCard          | `src/components/organization/org-card.tsx`    | Add terminal header pattern |
| AdminMetricsCard | `src/components/admin/admin-metrics-card.tsx` | Add terminal header pattern |

### Priority 3: Purchase Status Cards

| Card          | File                                                          | Migration Notes      |
| ------------- | ------------------------------------------------------------- | -------------------- |
| LicenseCard   | `src/components/dashboard/purchase-status/license-card.tsx`   | Add StyledCardHeader |
| AccessCard    | `src/components/dashboard/purchase-status/access-card.tsx`    | Add StyledCardHeader |
| ResourcesCard | `src/components/dashboard/purchase-status/resources-card.tsx` | Add StyledCardHeader |

### Priority 4: Template Stats Cards

| Card               | File                                                                | Migration Notes     |
| ------------------ | ------------------------------------------------------------------- | ------------------- |
| MetricCards        | `src/app/templates/analytics-dashboard/components/metric-cards.tsx` | Add terminal header |
| StatsCards (Team)  | `src/app/templates/team-dashboard/components/stats-cards.tsx`       | Add terminal header |
| StatsCards (Users) | `src/app/templates/user-management/components/stats-cards.tsx`      | Add terminal header |

---

## Migration Pattern

### Before (Non-Compliant)

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>{content}</CardContent>
</Card>
```

### After (Compliant - Using TerminalCard)

```tsx
<TerminalCard>
  <TerminalCardHeader code="0x00" title="TITLE" icon={<Icon className="size-4" />} />
  <TerminalCardContent>
    <div className="text-xs">
      <span className="text-muted-foreground">DESC: </span>
      <span className="text-foreground">{content}</span>
    </div>
  </TerminalCardContent>
</TerminalCard>
```

### After (Compliant - Using StyledCard)

```tsx
<StyledCard>
  <StyledCardHeader code="0x00" title="TITLE" icon={<Icon className="size-4" />} />
  <div className="p-4">
    <div className="text-xs">
      <span className="text-muted-foreground">DESC: </span>
      <span className="text-foreground">{content}</span>
    </div>
  </div>
</StyledCard>
```

---

## Inline JSX Migration Pattern

### Before

```tsx
<div className="border-border bg-card border p-4">
  <h3 className="text-lg font-semibold">Title</h3>
  <p>{description}</p>
</div>
```

### After

```tsx
<TerminalCard>
  <TerminalCardHeader code="0x00" title="TITLE" />
  <TerminalCardContent>
    <div className="text-xs">
      <span className="text-muted-foreground">DESC: </span>
      <span className="text-foreground">{description}</span>
    </div>
  </TerminalCardContent>
</TerminalCard>
```

---

## Grid Card Pattern

All grid cards should use this structure:

```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {items.map((item, index) => (
    <TerminalCard key={item.id} interactive>
      <TerminalCardHeader
        code={`0x${index.toString(16).toUpperCase().padStart(2, '0')}`}
        title={item.title.toUpperCase().replace(/ /g, '_').slice(0, 12)}
        icon={
          <item.icon className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
        }
      />
      <TerminalCardContent>
        <div className="text-foreground mb-3 text-xs font-semibold">
          {item.title.toUpperCase().replace(/ /g, '_')}
        </div>
        <div className="text-xs">
          <span className="text-muted-foreground">DESC: </span>
          <span className="text-foreground">{item.description}</span>
        </div>
      </TerminalCardContent>
    </TerminalCard>
  ))}
</div>
```

---

## Hero Card Pattern (Exception)

Hero cards use Style A (inline header with dashes) and do NOT use TerminalCard:

```tsx
<div className="border-border bg-card mx-auto max-w-2xl border p-4 text-left">
  <div className="text-muted-foreground mb-4 text-xs">
    [ [0x01] STATUS ]────────────────────────
  </div>
  <p className="text-muted-foreground mb-4 text-sm">{description}</p>
  <div className="flex flex-wrap gap-4 text-sm">
    <span>
      <span className="text-muted-foreground">Label:</span>{' '}
      <span className="text-primary">VALUE</span>
    </span>
  </div>
</div>
```

---

## Next Steps

1. Run migration script or manually update Priority 1 cards
2. Update Priority 2-4 cards
3. Run visual regression tests
4. Update card-inventory.json with migration status
