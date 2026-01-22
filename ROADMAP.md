# FABRK Roadmap

> Last Updated: January 2026 | Current Version: 1.3.1

## Current Status

| Metric | Count | Status |
|--------|-------|--------|
| UI Components | 62 | Production-ready |
| Chart Components | 8 | Production-ready |
| Templates | 36+ | Production-ready |
| Themes | 18 | WCAG AA compliant |
| TypeScript Errors | 0 | Clean |

---

## In Progress

- [ ] OKLCH Color Migration - Replacing remaining hex colors with design tokens

---

## Recently Shipped

### v1.3.1 - Component Architecture Cleanup (January 2026)
- Clean /ui/ directory - moved business logic to feature directories
- New /charts/ directory - consolidated 8 chart components
- card.tsx split from 890 to 250 lines
- Documentation accuracy - all counts now use dynamic script

### v1.3.0 - Security Hardening (January 2026)
- HMAC-signed admin impersonation cookies
- Email change verification before update
- XSS prevention in email templates
- Atomic password reset tokens
- DOMPurify HTML sanitization

### v1.2.0 - M3 Typography System (January 2026)
- Material Design 3 typography tokens
- Responsive scaling under 600px

### v1.1.0 - Font Pairings & Accessibility (December 2025)
- 34 display/body font combinations
- 6 FUI themes
- All 18 themes pass WCAG AA audit

---

## Feature Requests

Have an idea? Email support@fabrk.dev

---

*Priorities shift based on customer feedback.*
