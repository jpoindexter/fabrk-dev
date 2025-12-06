# Dashboard Page Audit: Account Settings

**File:** `/src/app/(dashboard)/account/page.tsx`
**Type:** Client Component
**Lines:** 239

---

## 1. Page Purpose

Account settings hub with tabbed interface for managing:
- Profile information (name, email, avatar)
- Security settings (password, 2FA)
- Billing & subscriptions
- API key management
- Active sessions monitoring

---

## 2. Layout Overview

### Structure
- **Container**: `max-w-6xl` centered with `px-6 py-8`
- **Header**: Page title + description
- **Tabs System**: 5 tabs with icons (Profile, Security, Billing, API Keys, Sessions)
- **Two-Column Grid**: Main content (2/3 width) + sidebar (1/3 width)

### Sections
1. **Tab Navigation** - Grid layout with 5 icon-based tabs
2. **Main Content Area** - Tab-specific forms (ProfileForm, SecurityForm, etc.)
3. **Sidebar** - Quick Actions, Account Status, Help links

---

## 3. Key Components Used

| Component | Usage | Count |
|-----------|-------|-------|
| `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle` | Section containers | 7 |
| `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger` | Tabbed interface | 1 set |
| `Button` | Quick actions sidebar | 5 |
| Custom forms | ProfileForm, SecurityForm, BillingSection, ApiKeysSection, SessionsSection | 5 |

---

## 4. Typography Scale Observed

| Element | Font Size | Weight | Usage |
|---------|-----------|--------|-------|
| Page title | `text-4xl` | `font-semibold` | "Account Settings" |
| Description | Default | Default | Muted foreground text |
| Tab labels | `text-xs` | `font-medium` | Tab trigger text |
| Card titles | `text-base` | Default | "Quick Actions", "Account Status" |
| Sidebar labels | `text-sm` | Default | Account status rows |
| Sidebar values | `text-sm` | `font-medium` | Status values |

### Issues
- ✅ **Consistent scale**: Uses standard size utilities
- ⚠️ **No monospace**: Missing `font-mono` on UI text (violates terminal aesthetic)

---

## 5. Spacing Patterns Observed

| Pattern | Value | Usage |
|---------|-------|-------|
| Container padding | `px-6 py-8` | Page wrapper |
| Section spacing | `mb-8` | Header bottom margin |
| Tab spacing | `space-y-6` | Between tabs container |
| Grid gap | `gap-6` | Two-column layout |
| Tab trigger padding | `px-4 py-4` | Tab buttons |
| Icon-text gap | `gap-2` | Icons + labels |
| Button padding | `p-6` | Quick action buttons |

### Issues
- ✅ **8-point grid**: All spacing uses standard utilities
- ✅ **Consistent gaps**: Uses `gap-6`, `gap-2` systematically

---

## 6. Inconsistencies & Ad-Hoc Styles

### Critical Issues

1. **Border Radius Violations** (Lines 76, 172, 174)
   ```tsx
   // BAD - rounded corners instead of rounded-none
   className="data-[state=active]:bg-background flex flex-col items-center gap-2 px-4 py-4"
   ```
   - **Impact**: Tabs have soft corners, breaks terminal aesthetic
   - **Fix**: Add `rounded-none` to all TabsTrigger components

2. **Missing Monospace Font**
   - All UI text uses default font instead of `font-mono`
   - Affects: Page title, tab labels, sidebar text
   - **Fix**: Apply `font-mono` globally

3. **Hardcoded Transitions** (Line 77)
   ```tsx
   "hover:bg-primary hover:text-primary-foreground transition-colors"
   ```
   - Transitions should be standardized across design system

4. **Inline Status Data** (Lines 193-208)
   - Hardcoded mock data in component (`Plan`, `Status`, `Member Since`, `Storage Used`)
   - Should be fetched from API/database

5. **Tab Icon Size Inconsistency**
   - Line 80: `h-4 w-4` (tabs)
   - Line 177: `size-5` (sidebar buttons)
   - **Fix**: Standardize to `h-4 w-4` or define icon size tokens

### Design System Compliance

| Rule | Status | Notes |
|------|--------|-------|
| `rounded-none` | ❌ FAIL | Tabs have rounded corners |
| `font-mono` | ❌ FAIL | Missing throughout |
| Design tokens only | ✅ PASS | Uses semantic color variables |
| 8-point grid | ✅ PASS | Spacing follows grid |
| Terminal labels | ⚠️ PARTIAL | No bracket formatting `[LABEL]:` |

---

## 7. Recommendations

### High Priority
1. **Add `rounded-none` to all TabsTrigger components**
2. **Apply `font-mono` to all UI text**
3. **Standardize icon sizes** (use `h-4 w-4` consistently)
4. **Format labels** with terminal style: `[PROFILE]`, `[SECURITY]`, etc.

### Medium Priority
5. **Extract transitions** to design system utility
6. **Replace hardcoded status data** with real API data
7. **Add terminal header** to cards (e.g., `[ [0x00] QUICK_ACTIONS ]`)

### Code Example (Fixed Tab Trigger)
```tsx
<TabsTrigger
  key={tab.value}
  value={tab.value}
  className={cn(
    "rounded-none font-mono", // FIXED: Added terminal styles
    "data-[state=active]:bg-background flex flex-col items-center gap-2 px-4 py-4",
    "hover:bg-primary hover:text-primary-foreground transition-colors"
  )}
>
  <Icon className="h-4 w-4" />
  <span className="text-xs font-medium uppercase">[{tab.label}]</span>
</TabsTrigger>
```

---

## 8. Overall Assessment

**Design System Compliance:** 60%

**Strengths:**
- Clean tabbed interface
- Proper semantic color usage
- Good spacing consistency
- Responsive two-column layout

**Weaknesses:**
- Missing terminal aesthetic (no `rounded-none`, no `font-mono`)
- Inconsistent icon sizing
- Hardcoded mock data
- No terminal-style label formatting

**Priority:** HIGH - Core account page needs terminal styling applied
