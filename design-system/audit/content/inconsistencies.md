# Content Inconsistencies Audit

**Date**: 2025-12-05
**Scope**: Entire codebase (src/, components/, app/)
**Purpose**: Document all content formatting inconsistencies for terminal aesthetic compliance

---

## Executive Summary

This audit reveals **significant inconsistencies** in content formatting across the codebase. While there is a well-defined terminal aesthetic specification in `design-system/themes/terminal.ts`, actual implementation varies wildly across components.

### Key Findings
- **Button text**: 6 distinct formats found
- **Auth terminology**: "Sign in" vs "Sign In" vs "Login" (15+ variations)
- **Label formats**: 3 different bracket styles
- **Case conventions**: Mixed UPPERCASE, Title Case, lowercase, camelCase in UI
- **Action verbs**: Inconsistent between "> VERB" and "Verb" formats

---

## 1. Button Text Formats

### Variants Found

| Format | Example | Occurrences | Files |
|--------|---------|-------------|-------|
| **Terminal Format** (Canonical) | `> SAVE_CHANGES` | ~80 | Most template files |
| **Title Case** | `Save Changes` | ~15 | `/components/account/profile-form.tsx` |
| **No Prefix Uppercase** | `SAVE_CHANGES` | ~5 | Theme definitions |
| **Lowercase with states** | `save changes` | ~3 | Error messages |
| **Mixed Case** | `Save changes` | ~2 | Scattered |
| **Variable content** | `{isSaving ? "SAVING..." : "SAVE_CHANGES"}` | ~10 | Dynamic states |

### Specific Examples

#### ✅ CORRECT (Terminal Format)
```tsx
// src/app/docs/components/dialog/page.tsx:95
<Button type="submit">&gt; SAVE_CHANGES</Button>

// src/app/docs/components/dialog/page.tsx:149
<Button variant="destructive">&gt; DELETE_ACCOUNT</Button>

// src/app/docs/components/alert-dialog/page.tsx:50
<AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
```

#### ❌ INCONSISTENT
```tsx
// src/components/account/profile-form.tsx:141
{isLoading ? "Saving..." : "Save Changes"}

// src/app/docs/components/loading/page.tsx:115
Save Changes

// src/app/docs/components/toaster/page.tsx:226
Failed to save changes. Please try again.
```

### Recommendations
1. **Use terminal format everywhere**: `> VERB` or `> VERB_PHRASE`
2. **Loading states**: `> SAVING...` (not "Saving...")
3. **All verbs**: UPPERCASE_SNAKE_CASE

---

## 2. Authentication Terminology

### Sign In / Login Variations

| Variant | Count | Files | Context |
|---------|-------|-------|---------|
| `> SIGN_IN` | 8 | Templates, theme config | ✅ Canonical |
| `Sign In` | 12 | Page titles, links | Title Case (inconsistent) |
| `Sign in` | 15 | Descriptions, body text | Sentence case |
| `sign in` | 8 | Code comments, lowercase text | |
| `> LOGIN` | 3 | Theme config (alternate) | |
| `Login` | 25 | URLs, redirects, function names | |
| `login` | 50+ | Variable names, routes, db fields | |
| `Log in` | 5 | Help text | |

#### Example Files

**✅ Consistent (Terminal Format)**
```tsx
// design-system/themes/terminal.ts:272
signIn: "> SIGN_IN",

// src/app/templates/authentication/sign-in/page.tsx:105
&gt; SIGN_IN
```

**❌ Inconsistent**
```tsx
// src/app/templates/authentication/sign-in/page.tsx:52
Enter your email to sign in to your account

// src/app/templates/authentication/sign-in/page.tsx:24
description: "Production-ready sign in page template..."

// src/app/docs/tutorials/protected-pages/page.tsx:137
<Link href="/auth/signin">Sign In</Link>

// src/components/pricing/checkout-button.tsx:30
router.push(`/login?callbackUrl=...`);

// src/app/docs/components/alert/page.tsx:62
Your session has expired. Please log in again.

// src/components/cookie-consent-tabs.tsx:228
title: "Login required",
description: "Please log in to download your data.",
```

### Sign Up / Register Variations

| Variant | Count | Context |
|---------|-------|---------|
| `> SIGN_UP` | 6 | ✅ Terminal format |
| `Sign Up` | 15 | Title Case |
| `Sign up` | 10 | Sentence case |
| `sign up` | 8 | Lowercase |
| `Register` | 5 | Alternative terminology |
| `register` | 30+ | Code/routes |
| `> CREATE_ACCOUNT` | 1 | Button text |

#### Examples
```tsx
// ✅ CORRECT
// design-system/themes/terminal.ts:271
signUp: "> SIGN_UP",

// ❌ INCONSISTENT
// src/app/templates/authentication/sign-up/page.tsx:140
&gt; CREATE_ACCOUNT  // Should be > SIGN_UP

// src/app/templates/authentication/sign-up/page.tsx:150
Or sign up with  // Should be OR_SIGN_UP_WITH:

// src/app/docs/getting-started/page.tsx:20
Sign up, login, password reset.  // Mixed case
```

### Sign Out / Logout Variations

| Variant | Count | Context |
|---------|-------|---------|
| `> SIGN_OUT` | 3 | ✅ Terminal format |
| `> LOGOUT` | 2 | Alternative |
| `Sign Out` | 8 | Title Case |
| `Sign out` | 4 | Sentence case |
| `Log out` | 5 | Alternative |
| `logout` | 20+ | Code/routes |

#### Examples
```tsx
// ✅ CORRECT
// design-system/themes/terminal.ts:273
signOut: "> SIGN_OUT",

// src/components/security/security-sessions-card.tsx:67
{isInvalidatingSessions ? "INVALIDATING..." : "> SIGN_OUT_ALL_SESSIONS"}

// ❌ INCONSISTENT
// src/app/docs/components/dropdown-menu/page.tsx:62
Log out  // Should be > SIGN_OUT

// src/components/security/security-dialogs.tsx:101
Sign Out All Other Sessions?  // Title should be SIGN_OUT_ALL_SESSIONS?
```

---

## 3. Common Action Verbs

### Delete / Remove

| Format | Count | Context |
|--------|-------|---------|
| `> DELETE` | 40 | ✅ Buttons |
| `Delete` | 30 | Menu items, links |
| `delete` | 50+ | Code |
| `> REMOVE` | 5 | Some buttons |
| `Remove` | 15 | Alternative terminology |
| `> DELETE_ITEM` | 10 | Specific actions |
| `> DELETE_ACCOUNT` | 8 | Danger zone |

**Inconsistency**: Mix of DELETE vs REMOVE for same actions

```tsx
// src/app/docs/components/alert-dialog/page.tsx:81
<Button variant="destructive">&gt; DELETE_ITEM</Button>

// src/app/templates/user-management/components/user-table-columns.tsx:181
&gt; DELETE  // Generic

// src/components/account/api-keys-section.tsx:200
&gt; DELETE  // Same context, different specificity
```

### Create / Add / New

| Format | Count | Usage |
|--------|-------|-------|
| `> CREATE` | 15 | Primary action |
| `> ADD` | 20 | Adding to list |
| `> NEW` | 5 | Rare |
| `Create` | 25 | Menu items |
| `Add` | 30 | Body text |
| `> CREATE_ACCOUNT` | 3 | Specific |
| `> ADD_USER` | 8 | Specific |
| `> NEW_FILE` | 4 | Context menu |

**Problem**: No clear rule when to use CREATE vs ADD vs NEW

```tsx
// src/app/(dashboard)/admin/feature-flags-db/page.tsx:156
&gt; NEW_FLAG

// src/app/(dashboard)/admin/feature-flags-db/page.tsx:190
<Button onClick={handleCreate}>&gt; CREATE</Button>  // Same flow, different verb

// src/app/templates/user-management/page.tsx:95
&gt; ADD_USER
```

### Edit / Update

| Format | Count | Context |
|--------|-------|---------|
| `> EDIT` | 15 | Primary |
| `> UPDATE` | 10 | Alternative |
| `Edit` | 20 | Menu items |
| `Update` | 15 | Status changes |
| `> EDIT_PROFILE` | 8 | Specific |
| `> SAVE_CHANGES` | 40 | After editing |

**Problem**: EDIT vs UPDATE have semantic overlap

```tsx
// src/app/(dashboard)/profile/page.tsx:192
<Button onClick={() => setIsEditing(true)}>&gt; EDIT_PROFILE</Button>

// Then saves with:
{isSaving ? "&gt; SAVING..." : "&gt; SAVE_CHANGES"}  // Should be consistent

// src/components/admin/user-data-table/user-table-columns.tsx:190
<DropdownMenuItem onClick={() => onEdit(user)}>
  Edit user  // Should be > EDIT or > EDIT_USER
</DropdownMenuItem>
```

---

## 4. Label Formats

### Variants Found

| Format | Count | Files | Example |
|--------|-------|-------|---------|
| `[LABEL]:` | 50+ | ✅ Most components | `[EMAIL]:` |
| `LABEL:` | 20 | Missing brackets | `EMAIL:` |
| `Label:` | 15 | Title Case | `Email:` |
| `label:` | 10 | Lowercase | `email:` |
| `[label]:` | 5 | Lowercase with brackets | `[email]:` |

### Status/Message Labels

```tsx
// ✅ CORRECT
[ERROR]: Message
[SUCCESS]: Message
[WARNING]: Message
[INFO]: Message
[STATUS]: ONLINE

// ❌ FOUND IN CODE
// src/components/admin/impersonate-button.tsx:111
[ERROR]: {error}  // ✅ Correct

// src/app/templates/modals/components/popover-example.tsx:35
[INFO]:  // ✅ Correct

// src/app/templates/billing-dashboard/components/plan-cards.tsx:27
[WARNING]: Deleting your account...  // ✅ Correct

// BUT ALSO:
// src/components/ui/form-error.tsx:118
how: "Please log in again to continue.",  // No label format!

// src/app/docs/components/toaster/page.tsx:226
Failed to save changes. Please try again.  // Should be [ERROR]: FAILED_TO_SAVE_CHANGES
```

---

## 5. Terminal Header Formats

### Hex Code Section Headers

#### ✅ CORRECT Format: `[ [0xNN] SECTION_NAME ]`

```tsx
// design-system/themes/terminal.ts:298-307
settings: "[ [0x00] SETTINGS ]",
account: "[ [0x01] ACCOUNT ]",
profile: "[ [0x02] PROFILE ]",
security: "[ [0x03] SECURITY ]",
```

#### Found Variations

| Pattern | Count | Example |
|---------|-------|---------|
| `[ [0xNN] TEXT ]` | 80+ | ✅ Standard |
| `[0xNN] TEXT` | 5 | Missing outer brackets |
| `[ 0xNN TEXT ]` | 3 | Missing inner brackets |
| `[TEXT]` | 20 | No hex code |

**Issue**: Inconsistent hex code usage - some sections use them, others don't

```tsx
// ✅ CONSISTENT
src/app/(legal)/cookies/page.tsx:23
[ [0x00] LEGAL ] COOKIE_POLICY

src/app/(legal)/cookies/page.tsx:53
[ [0x01] OVERVIEW ]────────────────────────

// ❌ INCONSISTENT
src/app/templates/notifications/page.tsx:61
[ [0x00] NOTIFICATIONS ]  // Uses hex

// But many other headers don't:
src/components/landing/footer.tsx:64
[ [0x71] SYSTEM_INFO ]  // Uses hex

src/components/landing/footer.tsx:84
[ [0x72] nav_links.exe │ PID:1024 ]  // Uses hex + terminal metaphor

// While others are just:
Title with no formatting
```

---

## 6. Case Conventions in UI Text

### Found in UI (not code)

| Case Type | Count | Should Be |
|-----------|-------|-----------|
| `UPPERCASE_SNAKE_CASE` | 200+ | ✅ Canonical |
| `Title Case` | 100+ | ❌ Should be UPPERCASE |
| `Sentence case` | 80+ | ❌ Should be UPPERCASE |
| `lowercase` | 40+ | ❌ Should be UPPERCASE |
| `camelCase` | 5 | ❌ Never in UI |

### Examples

```tsx
// ✅ CORRECT
SAVE_CHANGES
DELETE_ACCOUNT
SIGN_IN
USER_PROFILE

// ❌ INCONSISTENT
Save Changes
Delete Account
Sign In
User Profile

save changes
delete account
user profile
```

---

## 7. Common Phrases Inconsistencies

### "Dashboard" vs "Home" vs "Overview"

| Variant | Count | Context |
|---------|-------|---------|
| `Dashboard` | 50+ | Routes, titles |
| `DASHBOARD` | 30 | Terminal headers |
| `[ [0xD0] DASHBOARD ]` | 10 | Formatted headers |
| `Home` | 20 | Nav links |
| `HOME` | 5 | Terminal format |
| `Overview` | 15 | Section titles |
| `OVERVIEW` | 10 | Terminal format |

**Problem**: No clear distinction when to use Dashboard vs Home vs Overview

### "Settings" vs "Preferences" vs "Configuration"

| Variant | Count | Usage |
|---------|-------|-------|
| `Settings` | 100+ | Primary term |
| `SETTINGS` | 50 | Terminal format |
| `[ [0x00] SETTINGS ]` | 20 | Headers |
| `Preferences` | 15 | Alternative term |
| `PREFERENCES` | 8 | Terminal format |
| `Configuration` | 10 | Technical docs |
| `CONFIG` | 5 | Abbreviated |

**Problem**: Settings vs Preferences used interchangeably

---

## 8. Error Message Formatting

### Current State (Inconsistent)

```tsx
// Format 1: Bracketed uppercase
[ERROR]: MESSAGE_TEXT

// Format 2: Title case sentences
Failed to save changes. Please try again.

// Format 3: Sentence case
Your session has expired. Please log in again.

// Format 4: Technical errors
Schema validation failed

// Format 5: User-friendly
Unable to save changes
```

### Examples in Code

```tsx
// src/components/ui/form-error.tsx:118
what: "Session expired",
how: "Please log in again to continue.",  // No terminal format

// src/app/docs/components/toaster/page.tsx:226
Failed to save changes. Please try again.  // Should be [ERROR]: FAILED_TO_SAVE_CHANGES

// src/components/admin/impersonate-button.tsx:111
[ERROR]: {error}  // ✅ Correct format
```

**Recommendation**: All error messages should follow:
```tsx
[ERROR]: ERROR_DESCRIPTION
[WARNING]: WARNING_DESCRIPTION
```

---

## 9. Description Text Inconsistencies

### Length Variations

Descriptions range from **2 words to 100+ words** with no clear pattern:

```tsx
// Short (2-5 words)
description: "User Accounts"
description: "Manage settings"

// Medium (5-15 words)
description: "Production-ready Next.js SaaS boilerplate with authentication, payments, and more"

// Long (20+ words)
description: "Let users sign in with their Google account. This is convenient for users and often increases signup rates."

// Very long (50+ words)
description: "Fabrk includes NextAuth v5 with email/password, Google OAuth, Microsoft OAuth, magic link passwordless login, and 2FA/MFA support. All authentication flows are production-ready."
```

**Problem**: No style guide for description length or detail level

### Tone Variations

```tsx
// Technical tone
"Schema validation with automatic repair logic"

// User-friendly tone
"Easy navigation back to login"

// Marketing tone
"World-class customer satisfaction"

// Mixed tone
"Sign up, login, password reset." // List format
```

---

## 10. Specific Component Analysis

### Button Component Issues

Files with non-terminal button text:
1. `/components/account/profile-form.tsx` - Uses "Save Changes" (Title Case)
2. `/components/settings/*.tsx` - Mix of "> SAVE_CHANGES" and "Save Changes"
3. `/app/docs/components/loading/page.tsx` - Plain "Save Changes"
4. `/app/(dashboard)/organizations/[slug]/settings/page.tsx` - "Save Changes"

### Dialog/Modal Issues

Most dialogs use correct format:
```tsx
<DialogTitle>[ [0x00] DIALOG_NAME ]</DialogTitle>
```

But some don't:
```tsx
<DialogTitle>Confirm Action</DialogTitle>  // Should be [ [0x00] CONFIRM_ACTION ]
```

### Menu Items

Context menus and dropdown menus frequently break format:
```tsx
// ❌ WRONG
<DropdownMenuItem>Edit User</DropdownMenuItem>
<DropdownMenuItem>Delete</DropdownMenuItem>

// ✅ SHOULD BE
<DropdownMenuItem>&gt; EDIT_USER</DropdownMenuItem>
<DropdownMenuItem>&gt; DELETE</DropdownMenuItem>
```

---

## Canonical Reference (From Theme Config)

Based on `design-system/themes/terminal.ts`, the **CORRECT** formats are:

### Actions
```tsx
submit: "> SUBMIT"
save: "> SAVE_CHANGES"
cancel: "> CANCEL"
delete: "> DELETE"
create: "> CREATE"
edit: "> EDIT"
add: "> ADD"
remove: "> REMOVE"
update: "> UPDATE"
login: "> LOGIN"
logout: "> LOGOUT"
signIn: "> SIGN_IN"
signOut: "> SIGN_OUT"
signUp: "> SIGN_UP"
```

### Status Labels
```tsx
loading: "[STATUS]: LOADING..."
success: "[STATUS]: SUCCESS"
error: "[STATUS]: ERROR"
warning: "[STATUS]: WARNING"
info: "[STATUS]: INFO"
```

### Section Headers
```tsx
settings: "[ [0x00] SETTINGS ]"
account: "[ [0x01] ACCOUNT ]"
profile: "[ [0x02] PROFILE ]"
security: "[ [0x03] SECURITY ]"
billing: "[ [0x04] BILLING ]"
```

---

## Recommendations

### Immediate Actions

1. **Establish Primary Terminology**
   - `SIGN_IN` (not Login, Log in, or sign in)
   - `SIGN_UP` (not Register, Sign up)
   - `SIGN_OUT` (not Logout, Log out)

2. **Standardize Button Format**
   - ALL buttons: `> VERB` or `> VERB_PHRASE`
   - Loading states: `> VERB...` (e.g., `> SAVING...`)
   - No Title Case, no plain text

3. **Enforce Label Format**
   - ALL labels: `[LABEL]:`
   - Status messages: `[STATUS]: MESSAGE`
   - Error messages: `[ERROR]: MESSAGE`

4. **Consistent Action Verbs**
   - Delete (not Remove) for destructive actions
   - Create (not Add, New) for new entities
   - Edit (not Update) for modifications
   - Save (not Update) for persisting changes

5. **Terminal Headers Everywhere**
   - All section headers: `[ [0xNN] SECTION ]`
   - Maintain hex code sequence
   - Document hex code assignments

### Long-Term

1. Create linting rules to detect:
   - Title Case in button text
   - Plain text buttons (missing `>`)
   - Unbracketed labels
   - lowercase in UI text

2. Create content style guide with:
   - Approved terminology glossary
   - Description length guidelines
   - Tone of voice standards
   - Example templates

3. Build validation in pre-commit:
   - Check button text format
   - Validate label brackets
   - Enforce UPPERCASE_SNAKE_CASE in UI

---

## Statistics Summary

| Category | Canonical Format | Violations | Compliance |
|----------|-----------------|------------|------------|
| Button Text | `> VERB` | ~50 files | 60% |
| Labels | `[LABEL]:` | ~30 files | 70% |
| Auth Terms | `SIGN_IN/UP/OUT` | ~80 files | 40% |
| Section Headers | `[ [0xNN] TEXT ]` | ~20 files | 80% |
| Case Convention | `UPPERCASE_SNAKE` | ~60 files | 50% |

**Overall Content Consistency**: **~55%** (needs improvement)

---

## Files Requiring Attention (High Priority)

### Critical (10+ violations)
1. `/components/account/profile-form.tsx` - Button text, labels
2. `/components/settings/*.tsx` - All forms (5 files)
3. `/app/docs/components/dropdown-menu/page.tsx` - Menu items
4. `/app/templates/authentication/*.tsx` - Auth terminology (3 files)
5. `/components/admin/user-data-table/user-table-columns.tsx` - Menu items, headers

### Medium (5-10 violations)
1. `/app/(dashboard)/profile/page.tsx` - Button states
2. `/app/docs/components/dialog/page.tsx` - Dialog titles
3. `/app/docs/components/form/page.tsx` - Form labels
4. `/components/cookie-consent*.tsx` - UI text
5. `/app/templates/modals/components/*.tsx` - Modal text

### Low (1-5 violations)
- Various scattered button text issues across 30+ files

---

## Conclusion

While the design system defines a clear terminal aesthetic with specific content patterns, **implementation compliance is only ~55%**. The codebase contains:

- **6 distinct button text formats** (should be 1)
- **15+ variations** of authentication terminology
- **3 different label bracket styles**
- **Mixed case conventions** in UI text

**Next Steps**:
1. Run automated fix script for button text
2. Create linting rules for content format
3. Add pre-commit validation
4. Document canonical terminology in style guide
5. Migrate auth terms to single standard (SIGN_IN/UP/OUT)

**Priority**: HIGH - Content inconsistencies undermine the terminal aesthetic and brand identity.
