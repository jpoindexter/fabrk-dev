# Strategic Audit: Fabrk Boilerplate

**Date:** 2025-12-03
**Version:** 1.0
**Status:** RELEASE-READY

---

## 1. Executive Summary: The "Enterprise" Angle
Fabrk is **NOT** a competitor to ShipFast ($199).
ShipFast is for solo developers building B2C apps in a weekend.
Fabrk is for **Teams & Agencies** building scalable B2B SaaS platforms.

**The Pricing Mismatch:**
*   Current Price: $199 (Undervalued)
*   Market Value: $349 - $599
*   Target: Developers who know that "Rate Limiting" and "Audit Logs" take 2 weeks to build manually.

---

## 2. What to "Take Out" (Simplification Strategy)
You asked what is "over-built" or "non-essential." These features add weight without immediate value for 80% of customers.

### 🚨 High Priority Removal (Bloat)
These libraries are heavy, complex to set up, and often replaced by simpler alternatives.
*   **Sanity CMS (`src/lib/sanity`)**: Overkill. Most SaaS blogs run fine on MDX (which you already have). Requires setting up a whole external project.
*   **Algolia Search (`src/lib/algolia`)**: Expensive & complex. Postgres full-text search (`pg_search`) is free and sufficient for MVP.
*   **Mermaid Diagrams (`src/components/ui/mermaid`)**: Niche documentation tool. Not a core SaaS feature.
*   **Legacy "Showcase" Templates (`src/app/templates`)**: These are "Marketing Assets" disguised as code. They bloat the customer's project. **Move these to a separate "Fabrk UI" gallery repo or strictly keep them in the marketing site.**

### ⚠️ Moderate Priority (Complexity vs. Value)
*   **Pusher (`src/lib/pusher`)**: Real-time is great, but 90% of MVPs don't need it on Day 1. It forces users to set up another 3rd party account. **Recommendation:** Keep the code, but ensure it is `DISABLED` by default in `.env`.
*   **Job Worker System (`src/lib/jobs`)**: You built a custom job queue in Postgres. This is "Enterprise" but complex. Small apps just use Vercel Cron or Inngest.

---

## 3. What is "Over-Built" (And Why You Keep It)
These features are "too much" for a hobbyist, but **exactly why an Enterprise customer buys Fabrk**.

1.  **Webhook Delivery System (`src/lib/webhooks`)**:
    *   *Status:* Over-built.
    *   *Verdict:* **KEEP.** This is a killer feature. Building a retry-queue for webhooks is hard.
2.  **Feature Flags (`src/lib/feature-flags`)**:
    *   *Status:* Over-built.
    *   *Verdict:* **KEEP.** Agencies love this for staged rollouts.
3.  **API Key Management (`src/lib/api-keys`)**:
    *   *Status:* Over-built.
    *   *Verdict:* **KEEP.** Essential for "Dev Tool" SaaS apps.
4.  **Audit Logs (`src/lib/audit`)**:
    *   *Status:* Over-built.
    *   *Verdict:* **KEEP.** Required for B2B Enterprise compliance (SOC2).

---

## 4. Pricing Strategy
You are currently priced like a "Hobby" kit but offering an "Enterprise" chassis.

**Recommended Tier Structure:**

| Tier | Price | Features | Target Customer |
| :--- | :--- | :--- | :--- |
| **Starter** | **$199** | Auth, Payments (Stripe), Dashboard, 20 Themes | Solo Dev / B2C |
| **Pro** | **$349** | + Multi-tenancy (Teams), API Keys, Feature Flags | B2B SaaS Founder |
| **Agency** | **$799** | + Unlimited Projects, Priority Support | Dev Agencies |

**Justification:**
*   **Supastarter** charges **$349** for similar features.
*   **SaaS Pegasus** (Django) charges **$1000+**.
*   You have **130+ Tests** and **Security Headers**. ShipFast has zero. You are selling *reliability*.

---

## 5. Competitor Benchmarking

| Feature | Fabrk ($299 est) | ShipFast ($199) | Supastarter ($349) | Gravity ($995) |
| :--- | :--- | :--- | :--- | :--- |
| **Tech Stack** | Next.js 15 / Prisma | Next.js / Mongo | Next.js / Prisma | Node / React |
| **Multi-Tenancy** | ✅ Native | ❌ No | ✅ Native | ✅ Native |
| **Testing** | ✅ 130+ Tests | ❌ None | ❌ Minimal | ✅ Yes |
| **Security** | ✅ Rate Limit / CSP | ❌ Basic | ❌ Basic | ✅ Enterprise |
| **Webhooks** | ✅ Outbound System | ❌ Inbound Only | ❌ Inbound Only | ❌ Basic |
| **UI Quality** | 20 Themes / 200+ Comps | ~30 Comps | ~100 Comps | ~100 Comps |

**Your Winning Pitch:**
> "ShipFast is for weekend projects. Fabrk is for building the next Linear or Vercel. We include the 'boring' enterprise infrastructure (Security, Logs, Webhooks, Tests) so you can sell to businesses immediately."

---

## 6. Gaps & Risks
*   **AI Integration:** You are weak here. Supastarter and ShipFast have deep OpenAI/Vercel AI SDK integrations. You have basic API keys. **Action:** Add a simple "Chat with Data" template using Vercel AI SDK.
*   **Documentation Search:** You removed Algolia (good for cost), but make sure you have a simple `CMDK` search replacement for docs.
*   **Onboarding Friction:** The `.env.example` is HUGE. It scares away users. **Action:** Create a `setup.ts` script that interactively generates the `.env` file.

---

## 7. Final Recommendation
1.  **Price at $299 (Intro) -> $349.**
2.  **Delete** Sanity, Algolia, Mermaid from the main repo.
3.  **Market** the "Enterprise" features (Security, Tests, Webhooks) as your superpower.
4.  **Launch** with the "Terminal" aesthetic as a unique brand identity.
