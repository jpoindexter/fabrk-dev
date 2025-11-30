# QA Checklist - v1.1.0

Pre-release verification checklist for Fabrk v1.1.0

---

## Pre-Deployment Verification

### Code Quality
- [ ] `npm run lint` passes with no errors
- [ ] `npm run type-check` passes with no errors
- [ ] All unit tests pass: `npm test`
- [ ] All E2E tests pass: `npm run test:e2e` (requires dev server)
- [ ] No console errors in browser dev tools
- [ ] No hydration warnings in React

### Git Status
- [ ] All changes committed
- [ ] Branch is up to date with main
- [ ] No merge conflicts
- [ ] PR created and reviewed

---

## Feature Verification

### Two-Factor Authentication (2FA)

**Setup Flow:**
- [ ] Navigate to `/settings/security`
- [ ] Click "Enable 2FA" button
- [ ] QR code displays correctly
- [ ] Secret key shows for manual entry
- [ ] OTP input accepts 6 digits
- [ ] Invalid OTP shows error
- [ ] Valid OTP enables 2FA
- [ ] Backup codes modal appears after setup
- [ ] Backup codes are in XXXX-XXXX format
- [ ] 10 backup codes are generated

**Verification Flow:**
- [ ] Login prompts for 2FA when enabled
- [ ] OTP verification works
- [ ] Backup code can be used once
- [ ] Used backup code is rejected

**Disable Flow:**
- [ ] Disable button shows when 2FA is enabled
- [ ] Confirmation dialog appears
- [ ] Disabling removes 2FA requirement

**Security:**
- [ ] Audit logs record MFA events
- [ ] Secret is never exposed in UI after setup

---

### Trial Period System

**Pricing Page:**
- [ ] Trial option visible on `/pricing`
- [ ] Trial duration is displayed (e.g., "14-day free trial")
- [ ] Start trial button is clickable

**Checkout Flow:**
- [ ] Unauthenticated users redirected to sign in
- [ ] Authenticated users see Stripe checkout
- [ ] Stripe checkout shows trial period
- [ ] Successful checkout sets trial status

**Trial Banner:**
- [ ] Banner appears for trial users
- [ ] Days remaining shows correct count
- [ ] Upgrade CTA is visible
- [ ] Banner changes urgency near expiration

**Expiration:**
- [ ] Expired trial shows expiration message
- [ ] Expired trial blocks premium features
- [ ] Upgrade option is prominent

**Duplicate Prevention:**
- [ ] Users who used trial see "Subscribe" not "Start Trial"
- [ ] API prevents duplicate trial creation

---

### Cloud Storage

**Provider Detection:**
- [ ] R2 is used when R2 env vars are set
- [ ] S3 is used when only S3 env vars are set
- [ ] Local is used when no cloud env vars are set
- [ ] `getStorageProvider()` returns correct value

**File Upload:**
- [ ] Avatar upload works in profile settings
- [ ] Files are stored in correct location
- [ ] Upload progress indicator shows (if implemented)
- [ ] Success feedback after upload

**Validation:**
- [ ] Oversized files are rejected with error message
- [ ] Invalid MIME types are rejected
- [ ] Empty files are rejected
- [ ] Error messages are user-friendly

**Access Control:**
- [ ] Users can only access their own files
- [ ] Organization members can access org files
- [ ] Signed URLs work for private files

---

### Cookie Consent

**Banner:**
- [ ] Banner appears on first visit
- [ ] Accept All button works
- [ ] Decline button works
- [ ] Manage/Customize button opens modal

**Modal:**
- [ ] Modal displays cookie categories
- [ ] Toggle switches work
- [ ] Save button persists preferences
- [ ] Escape key closes modal
- [ ] Backdrop click closes modal

**Persistence:**
- [ ] Preferences saved to localStorage
- [ ] Return visits don't show banner
- [ ] GTM consent mode is updated

**Hydration:**
- [ ] No hydration errors on page load
- [ ] No text content mismatch warnings
- [ ] Banner renders correctly after hydration

---

### CSRF Protection

**Token Generation:**
- [ ] CSRF token cookie is set
- [ ] Token is at least 32 characters

**Validation:**
- [ ] GET requests pass without token
- [ ] POST requests require token
- [ ] Missing token returns 403
- [ ] Mismatched tokens return 403
- [ ] Valid matching tokens pass

---

## Cross-Browser Testing

### Chrome (Latest)
- [ ] All features work
- [ ] No console errors
- [ ] Styling correct

### Firefox (Latest)
- [ ] All features work
- [ ] No console errors
- [ ] Styling correct

### Safari (Latest)
- [ ] All features work
- [ ] No console errors
- [ ] Styling correct

### Edge (Latest)
- [ ] All features work
- [ ] No console errors
- [ ] Styling correct

---

## Mobile Testing

### iOS Safari
- [ ] Responsive layout works
- [ ] Touch interactions work
- [ ] No layout overflow

### Android Chrome
- [ ] Responsive layout works
- [ ] Touch interactions work
- [ ] No layout overflow

---

## Performance

- [ ] Lighthouse score > 80 for Performance
- [ ] No render-blocking resources warnings
- [ ] Images optimized
- [ ] Bundle size reasonable

---

## Security

- [ ] HTTPS enforced in production
- [ ] Security headers present
- [ ] No sensitive data in console logs
- [ ] No sensitive data in error messages
- [ ] API keys not exposed in client

---

## Accessibility

- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader compatible
- [ ] Color contrast sufficient

---

## Documentation

- [ ] Release notes created
- [ ] CHANGELOG updated
- [ ] API documentation current
- [ ] README reflects new features

---

## Final Steps

- [ ] All items above checked
- [ ] Team sign-off obtained
- [ ] Backup of production database
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured

---

## Post-Deployment

- [ ] Smoke test production environment
- [ ] Monitor error rates
- [ ] Check analytics for issues
- [ ] Respond to user feedback

---

**QA Completed By:** ________________
**Date:** ________________
**Version:** 1.1.0
