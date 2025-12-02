# README Audit Guide

## Purpose
Before marketing, verify all claims in the README and landing page are accurate.

---

## Claims to Verify

### Component Count
**Claimed**: 234 components

**How to verify**:
```bash
ls -la src/components/ui/ | wc -l
```

**Status**: [ ] Verified | Actual count: ____

---

### Template Count
**Claimed**: 8 page templates

**Templates to verify exist**:
1. [ ] Analytics Dashboard (`/templates/analytics-dashboard`)
2. [ ] Team Dashboard (`/templates/team-dashboard`)
3. [ ] Chart Library (`/templates/chart-library`)
4. [ ] User Management (`/templates/user-management`)
5. [ ] Settings Page (`/templates/settings-page`)
6. [ ] Billing Dashboard (`/templates/billing-dashboard`)
7. [ ] Security & Privacy (`/templates/security-privacy`)
8. [ ] Email Templates (`/templates/email-templates`)

**Status**: [ ] Verified | Actual count: ____

---

### Theme Count
**Claimed**: 20 DaisyUI themes

**How to verify**: Check `tailwind.config.ts` for daisyUI themes array

**Status**: [ ] Verified | Actual count: ____

---

### Features to Verify Exist

#### Authentication
- [ ] NextAuth v5 setup (`src/lib/auth.ts`)
- [ ] Google OAuth (`src/app/api/auth/[...nextauth]`)
- [ ] Email/password login
- [ ] Password reset flow
- [ ] MFA/2FA support

#### Payments
- [ ] Stripe integration (`src/app/api/stripe/`)
- [ ] Checkout flow
- [ ] Webhook handlers
- [ ] Customer portal
- [ ] Subscription management

#### Database
- [ ] Prisma schema (`prisma/schema.prisma`)
- [ ] PostgreSQL support
- [ ] User model
- [ ] Organization model

#### Email
- [ ] Resend integration (`src/lib/email.ts`)
- [ ] Email templates (`src/emails/`)
- [ ] Verification emails
- [ ] Password reset emails

---

## Items to Remove/Update

If you find stale references, update these files:

### README.md
- [ ] Remove Storybook references (if removed)
- [ ] Remove test count claims (if reduced)
- [ ] Update component count if different
- [ ] Update any outdated screenshots

### Landing Page (`src/app/page.tsx`)
- [ ] Verify hero section claims
- [ ] Verify feature list accuracy
- [ ] Verify comparison table numbers

---

## Screenshot Checklist

Take these screenshots for Product Hunt gallery:

1. [ ] **Hero Section** - Full landing page above fold
2. [ ] **Component Showcase** - `/components` page
3. [ ] **Dashboard Template** - Analytics or team dashboard
4. [ ] **Settings Template** - Settings page with tabs
5. [ ] **Theme Switcher** - Show 2-3 different themes
6. [ ] **Code Preview** - Clean code snippet
7. [ ] **Pricing Section** - Pricing card
8. [ ] **Mobile View** - Responsive design

---

## After Audit

Once verified:
1. Update any incorrect claims
2. Take fresh screenshots
3. Move to Phase 2 (Product Hunt)
