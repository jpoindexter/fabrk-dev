# Fabrk Launch Plan

**Date:** November 30, 2025
**Status:** Draft
**Target:** Production Launch

---

## 1. Pre-Launch Checklist

### Code & Assets (Immediate Action Required)
- [ ] **Testimonials:** Replace placeholders in `src/components/landing/testimonials-section.tsx` with real or realistic customer feedback.
- [ ] **Screenshots:** Generate and upload product screenshots to `public/images/`:
    - `dashboard-preview.png`
    - `auth-flow.png`
    - `settings-page.png`
- [ ] **Final Review:** Scan for `console.log` statements and critical `TODO` comments.

### Environment Configuration (Vercel/Production)
- [ ] **Secrets:** Verify all variables from `.env.example` are set in Vercel Project Settings.
    - `NEXTAUTH_SECRET` (Must be a random 32+ char string)
    - `DATABASE_URL` (Production connection string)
    - `STRIPE_SECRET_KEY` (Live mode)
    - `STRIPE_WEBHOOK_SECRET` (Live mode)
    - `RESEND_API_KEY` (Verified domain)
- [ ] **Domain:** Verify DNS propagation for the custom domain.

### Database
- [ ] **Migration:** **DO NOT** use `prisma db push` in production.
    - Run `npx prisma migrate deploy` during the build or as a pre-launch command to apply migrations safely.
- [ ] **Backup:** Create a manual backup of the production database before the first traffic surge.

### Third-Party Integrations
- [ ] **Stripe:**
    - Toggle "View test data" to **OFF**.
    - Verify "Customer Portal" settings in Stripe Dashboard.
    - Ensure at least one "Production" product/price exists and matches `NEXT_PUBLIC_STRIPE_PRICE_...`.
- [ ] **Resend:**
    - Send a test email to a verified external address to confirm deliverability.
- [ ] **Google OAuth:**
    - Verify the "Authorized redirect URIs" in Google Cloud Console includes `https://your-domain.com/api/auth/callback/google`.

### Performance & Security
- [ ] **Lighthouse:** Run a final local audit (`npm run lighthouse`).
- [ ] **Security:** Verify Content Security Policy (CSP) headers in `next.config.ts`.

### Rollback Strategy
- [ ] **Vercel:** Familiarize with the "Instant Rollback" feature in Vercel deployments.
- [ ] **Database:** Have a script or provider-level backup ready to restore if a migration fails corruptly.

---

## 2. Launch Execution

### Deployment
1.  **Merge:** Merge `develop` (or feature branches) into `main`.
2.  **Build:** Monitor Vercel build logs for warnings.
3.  **Verify:** Check the "Deployment Status" turns green.

### Smoke Testing (Live Verification)
1.  **Public Pages:** Visit Landing, Pricing, Login, and FAQ pages.
2.  **Auth:** Create a **new** real user account.
3.  **Checkout:** Initiate a checkout session (verify it redirects to Stripe).
4.  **Email:** Verify the "Welcome" email arrives.
5.  **Functionality:** Test one core feature (e.g., update profile, save a setting).

### Real-Time Monitoring
-   **Vercel Dashboard:** Keep the "Real-Time" and "Logs" tabs open.
-   **Database:** Monitor connection pool usage (if available in your provider's dashboard).

### Incident Response
-   **Critical Bug:** If a blocker is found, revert the Vercel deployment immediately.
-   **Maintenance Mode:** If needed, set `NEXT_PUBLIC_MAINTENANCE_MODE=true` (requires implementing this flag in `middleware.ts` if not present).

---

## 3. Post-Launch

### Feedback & Analysis
-   [ ] **User Feedback:** Monitor support email (`support@fabrk.dev`) and Discord.
-   [ ] **Analytics:** Check Vercel Analytics / PostHog for traffic sources and conversion rates.
-   [ ] **Performance:** Review "Speed Insights" on Vercel after 24 hours of data.

### Maintenance
-   [ ] **Bug Fixing:** Triage reports -> Reproduce locally -> Fix -> Push.
-   [ ] **Marketing:** Execute the "Product Hunt" launch plan (see `marketing/02-PRODUCT-HUNT.md`).
-   [ ] **Documentation:** Update `docs/` if any last-minute UI changes occurred.
