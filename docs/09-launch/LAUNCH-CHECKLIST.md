# 🚀 Fabrk Launch Checklist

This checklist covers everything needed to launch Fabrk (the boilerplate product) to customers.

**Status:** Ready for Launch 🟢
**Target Date:** Immediate

---

## 1. Pre-Launch Verification (The "Must Haves")

### Code Quality & Security
- [x] **Resolve TODOs/FIXMEs:** Verified 0 instances in `src/`
- [x] **Configuration:** Replaced all placeholders in `src/config.js`
- [x] **Type Safety:** TypeScript strict mode enabled (no `any` types)
- [x] **Linting:** ESLint passing with zero errors
- [x] **Dependencies:** `npm audit` check for critical vulnerabilities
- [ ] **Tests:** Run `npm run test:all` (Target: 95%+ pass rate)
- [ ] **Build:** Verify `npm run build` succeeds without errors

### Documentation
- [x] **README.md:** Updated with correct setup instructions
- [x] **ONBOARDING-CHECKLIST.md:** Verified for customer clarity
- [x] **LICENSE.md:** Commercial license terms verified
- [x] **SECURITY.md:** Security policy and reporting contacts correct
- [x] **DISTRIBUTION.md:** Delivery process documented

### Legal & Business
- [x] **Pricing:** Confirmed $199 one-time price in `src/config.js`
- [x] **Support:** Support email `support@fabrek.dev` configured
- [x] **Terms:** License agreement ready for distribution

---

## 2. Stripe & Payments Setup (Detailed)

### Product Configuration
- [ ] **Create Products:** Create "Fabrk Starter", "Fabrk Professional", "Fabrk Enterprise" in Stripe Dashboard.
- [ ] **Set Prices:** Set one-time prices (e.g., $199).
- [ ] **Get IDs:** Copy Price IDs (starts with `price_`) to `.env` (`NEXT_PUBLIC_STRIPE_PRICE_*`).
- [ ] **Coupons:** Create "EARLYBIRD" coupon (optional) and add ID to `src/config.js`.

### Webhook Configuration
- [ ] **Endpoint:** Add `https://your-domain.com/api/stripe/webhook` to Stripe Webhooks.
- [ ] **Events:** Select `checkout.session.completed`, `customer.subscription.*`, `payment_intent.*`.
- [ ] **Secret:** Copy Signing Secret (`whsec_...`) to `.env` (`STRIPE_WEBHOOK_SECRET`).

### Checkout Flow Verification
- [ ] **Custom Fields:** Verify "GitHub Username" field appears on checkout (Required for auto-distribution).
- [ ] **Test Purchase:** Run a test mode purchase.
- [ ] **Verify Database:** Check `User` table for `licenseKey` and `githubUsername`.

---

## 3. Auto-Distribution Automation

### GitHub Access
- [ ] **Token:** Generate GitHub Personal Access Token (Classic) with `repo` and `admin:org` scopes.
- [ ] **Env Var:** Add token to `.env` as `GITHUB_ACCESS_TOKEN`.
- [ ] **Repo Owner:** Set `GITHUB_REPO_OWNER` in `.env`.
- [ ] **Repo Name:** Set `GITHUB_REPO_NAME` in `.env`.

### Automation Workflow
- [ ] **Job Worker:** Verify background job worker is running (`npm run worker` or similar).
- [ ] **Test Grant:** Manually trigger `github.access_grant` job for a test user.
- [ ] **Verify Access:** Check if test user was added as a collaborator to the private repo.

---

## 4. Marketing Assets & Videos

### Video 1: "The Pitch" (30-60s)
- [ ] **Script:** "Stop building auth. Stop building payments. Start building your SaaS."
- [ ] **Visuals:** Fast cuts of Dashboard, Stripe integration, Email templates.
- [ ] **Call to Action:** "Get Fabrk today."
- [ ] **Distribution:** Twitter/X, LinkedIn, Hero Section.

### Video 2: "The Walkthrough" (3-5 mins)
- [ ] **Script:** Deep dive into the folder structure and key features.
- [ ] **Visuals:** Screen recording of VS Code, running `npm run dev`, making a quick change.
- [ ] **Goal:** Show developer experience (DX) is top-tier.
- [ ] **Distribution:** YouTube, Documentation.

### Video 3: "From Zero to Deploy" (Short)
- [ ] **Script:** Time-lapse of cloning repo -> deploying to Vercel.
- [ ] **Goal:** Prove speed to market.

---

## 5. Launch Day Execution

### Distribution Setup
- [ ] **GitHub Repo:** Create private repository for distribution
- [ ] **Access Control:** Verify invite system for new customers
- [ ] **Webhooks:** Test Stripe -> GitHub access automation
- [ ] **Welcome Email:** Verify "Welcome to Fabrk" email template

### Announcement
- [ ] **Product Hunt:** Schedule launch post
- [ ] **Social Media:** Prepare Twitter/LinkedIn threads
- [ ] **Communities:** Post in relevant subreddits/Discord servers

---

## 6. Post-Launch (First 48 Hours)

### Monitoring
- [ ] **Support:** Monitor `support@fabrek.dev` continuously
- [ ] **Stripe:** Watch for failed payments or disputes
- [ ] **GitHub:** Monitor repo access issues
- [ ] **Errors:** Check Sentry/Logs for unhandled exceptions.

### Feedback Loop
- [ ] **Bugs:** Triage critical bugs immediately
- [ ] **Feedback:** Collect feature requests in a central doc
- [ ] **Testimonials:** Ask happy early adopters for quotes

---

## 7. Rollback Plan

If critical issues arise (e.g., broken auth, payment failures):
1. **Pause Sales:** Disable Stripe checkout
2. **Notify:** Email affected customers immediately
3. **Fix:** Deploy hotfix to main distribution repo
4. **Compensate:** Offer refunds or extended support if necessary

---

## Useful Commands

```bash
# Run full test suite
npm run test:all

# Check for TODOs
grep -r "TODO" src/

# Verify build
npm run build

# Check types
npm run type-check

# Run background worker (for local testing)
npm run worker
```
