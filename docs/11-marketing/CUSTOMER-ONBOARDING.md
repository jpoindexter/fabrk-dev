# Customer Onboarding Templates

Templates and guides for onboarding new Fabrk customers and ensuring their success.

---

## Table of Contents

1. [Onboarding Philosophy](#onboarding-philosophy)
2. [Welcome Email Sequence](#welcome-email-sequence)
3. [Getting Started Guide](#getting-started-guide)
4. [First 7 Days Timeline](#first-7-days-timeline)
5. [Support Response Templates](#support-response-templates)
6. [Customer Success Check-ins](#customer-success-check-ins)
7. [Upsell & Cross-sell Templates](#upsell--cross-sell-templates)
8. [Feedback Collection](#feedback-collection)
9. [Re-engagement Templates](#re-engagement-templates)

---

## Onboarding Philosophy

**Goal:** Get customers to their first win as quickly as possible.

**For Fabrk, "first win" means:**
- Download and unzip the boilerplate
- Run `npm install` successfully
- See the landing page locally
- Deploy to Vercel

**Onboarding success = customer running their SaaS within 24 hours.**

**Key principles:**
1. **Reduce friction** - Make the first steps incredibly easy
2. **Celebrate small wins** - Acknowledge every milestone
3. **Provide support** - Be available when they get stuck
4. **Guide the journey** - Don't overwhelm with all features at once
5. **Follow up** - Check in proactively at key moments

---

## Welcome Email Sequence

### Email 1: Welcome + Download Link (Immediately after purchase)

**Subject:** Welcome to Fabrk! Here's your download link 🚀

**Body:**

```
Hi [Name],

Thanks for purchasing Fabrk! You're now part of an exclusive community of indie hackers building SaaS products the smart way.

Here's what you get:
✅ 87+ production-ready components
✅ Complete Next.js 15 boilerplate (TypeScript strict)
✅ Lifetime updates for v1.x
✅ Unlimited projects (personal + commercial)
✅ Discord community access
✅ Email support

📦 Download Your Boilerplate
[Download Fabrk v1.0.0] (big button)

Your License Key: FABRK-ABC-123-DEF-456

---

🚀 Quick Start (5 minutes):

1. Unzip the download
2. Run `npm install --legacy-peer-deps`
3. Copy `.env.example` to `.env.local`
4. Run `npm run dev`
5. Open http://localhost:3000

Full setup guide: https://fabrk.dev/docs/QUICK-START.md

---

🆘 Need Help?

- Documentation: https://fabrk.dev/docs
- Email: support@fabrek.dev (I respond within 24 hours)

---

💡 Pro Tip: Start by exploring the /variations page to see all hero and pricing layouts. Choose your favorites and customize from there.

Let me know if you have any questions. I'm here to help you ship fast!

Cheers,
[Your Name]
Founder, Fabrk

```

---

### Email 2: Getting Started Guide (24 hours after purchase)

**Subject:** How's it going? Here's a quick start checklist

**Body:**

```
Hi [Name],

Hope you've had a chance to explore Fabrk! I wanted to send a quick checklist to help you get up and running.

✅ Your First 30 Minutes with Fabrk:

Day 1:
- [ ] Download and unzip
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] See the landing page at localhost:3000

Day 2:
- [ ] Explore /variations to see all component options
- [ ] Read docs/QUICK-START.md
- [ ] Choose your hero and pricing layouts
- [ ] Customize colors and copy

Day 3:
- [ ] Set up database (PostgreSQL)
- [ ] Configure Stripe keys
- [ ] Test auth flow (sign up, login, email verification)
- [ ] Deploy to Vercel

🎯 Goal: Have your SaaS running locally within 24 hours, deployed within 72 hours.

---

📚 Resources:

- Quick Start: https://fabrk.dev/docs/QUICK-START.md
- Deployment: https://fabrk.dev/docs/DEPLOYMENT.md
- Component Showcase: https://fabrk.dev/docs/COMPONENT-SHOWCASE.md

---

🆘 Stuck on something?

Reply to this email or jump into Discord. I'm here to help!

Let me know how it's going!

[Your Name]
```

---

### Email 3: Tips & Best Practices (3 days after purchase)

**Subject:** 3 tips to ship your SaaS faster

**Body:**

```
Hi [Name],

You've had Fabrk for a few days now. Here are 3 tips to help you ship faster:

**1. Start with the landing page**
Don't spend weeks on the product. Ship the landing page first, collect emails, and validate demand. Fabrk has 3 hero variations and 2 pricing layouts ready to go.

**2. Use the variations page for A/B testing**
The /variations page shows all component options side-by-side. Choose your favorites, deploy, and A/B test to see what converts best.

**3. Don't over-customize on day 1**
The components are production-ready. Ship with minimal customization first, then iterate based on real user feedback. Perfection is the enemy of progress.

---

📖 Recommended reading:

- LANDING-PAGE-VARIATIONS.md (16KB guide on using variations)
- MARKETING.md (launch strategy)
- PRODUCT-HUNT.md (launch copy templates)

---

💬 Show me what you're building!

Share your progress in the Discord. I'd love to see what you're working on and give feedback.

Keep shipping!

[Your Name]
```

---

### Email 4: Check-in (7 days after purchase)

**Subject:** Quick check-in: How's your build going?

**Body:**

```
Hi [Name],

It's been a week since you joined Fabrk. Just checking in!

**Quick question:** Have you deployed your project yet?

- ✅ Yes, it's live! (reply with your URL, I'd love to see it!)
- 🚧 Not yet, still building locally
- 😅 Stuck on something (reply and tell me what's blocking you)

---

🎉 Customer Spotlight:

Check out what other Fabrk customers are building:
- [Customer 1]: Built and launched in 3 days
- [Customer 2]: Made $500 in first week
- [Customer 3]: Hit #3 on Product Hunt

---

🆘 Common issues this week:

1. **Stripe webhook not firing:** Make sure you're using `npm run stripe:listen` locally
2. **Database connection errors:** Double-check your DATABASE_URL in .env.local
3. **TypeScript errors:** Run `npm run type-check` to identify issues

Need help with any of these? Reply and I'll send you a fix.

Keep building!

[Your Name]

P.S. If you've launched, let me know! I'll share your project on Twitter to my 5k+ followers.
```

---

### Email 5: Feedback Request (14 days after purchase)

**Subject:** Quick favor: 2-minute feedback?

**Body:**

```
Hi [Name],

You've had Fabrk for 2 weeks now. Hope it's been helpful!

**Quick favor:** Can you answer 3 questions? (Takes 2 minutes)

1. **What do you like most about Fabrk?**
   [Your answer]

2. **What's one thing that could be better?**
   [Your answer]

3. **Would you recommend Fabrk to a friend?** (1-10)
   [Your rating]

Just reply to this email with your answers. Your feedback helps me make Fabrk better for everyone.

---

🎁 Thanks for your time!

As a thank you, I'll send you early access to v1.1 features (command palette, calendar component, rich text editor) when they're ready.

Cheers,
[Your Name]

P.S. If you're happy with Fabrk, I'd be incredibly grateful for a tweet or review. It helps other indie hackers discover us!
```

---

## Getting Started Guide

**This goes in `docs/GETTING-STARTED.md` (customer-facing):**

```markdown
# Getting Started with Fabrk

Welcome! This guide will get you from zero to deployed in under 1 hour.

---

## Step 1: Download & Install (5 minutes)

1. **Download** the boilerplate from your purchase email
2. **Unzip** to your projects folder
3. **Install dependencies:**

```bash
cd fabrk
npm install
```

---

## Step 2: Local Setup (10 minutes)

1. **Copy environment variables:**

```bash
cp .env.example .env.local
```

2. **Set up PostgreSQL database:**

Option A: Local PostgreSQL
```bash
# Install PostgreSQL (if not installed)
brew install postgresql  # macOS
sudo apt install postgresql  # Linux

# Create database
createdb fabrk
```

Option B: Vercel Postgres (recommended for beginners)
- Go to [vercel.com/storage](https://vercel.com/storage)
- Create PostgreSQL database
- Copy connection string to `.env.local`

Option C: Supabase (free tier)
- Go to [supabase.com](https://supabase.com)
- Create new project
- Copy connection string to `.env.local`

3. **Generate NextAuth secret:**

```bash
openssl rand -base64 32
```

Add to `.env.local` as `NEXTAUTH_SECRET`

4. **Push database schema:**

```bash
npm run db:push
```

5. **Start dev server:**

```bash
npm run dev
```

Open http://localhost:3000

---

## Step 3: Configure Stripe (15 minutes)

1. **Create Stripe account:** [stripe.com](https://stripe.com)

2. **Get API keys:**
   - Go to Developers → API Keys
   - Copy Publishable Key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Copy Secret Key → `STRIPE_SECRET_KEY`

3. **Create products:**
   - Go to Products → Add Product
   - Create: "Starter" ($49), "Professional" ($99), "Enterprise" ($199)
   - Copy Price IDs to .env.local

4. **Test locally:**
   - Click "Buy Now" on your landing page
   - Use test card: `4242 4242 4242 4242`
   - Any future date and CVC

5. **Set up webhooks** (for production later):
   - Developers → Webhooks → Add endpoint
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

---

## Step 4: Customize (20 minutes)

1. **Choose your hero variation:**
   - Visit http://localhost:3000/variations
   - Pick your favorite hero (Centered, Split, or Video)
   - Update `src/app/page.tsx` with your choice

2. **Choose your pricing layout:**
   - Pick between Pricing Cards or Comparison Table
   - Update `src/app/page.tsx`

3. **Update copy:**
   - Edit headlines in your chosen hero component
   - Update pricing in `src/components/landing/pricing-section.tsx`
   - Customize features list

4. **Update colors** (optional):
   - Default: Purple (#007AFF)
   - Edit Tailwind classes throughout components
   - Or update `tailwind.config.ts` for global changes

---

## Step 5: Deploy (10 minutes)

1. **Push to GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-saas.git
git push -u origin main
```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Add environment variables (copy from .env.local)
   - Deploy!

3. **Configure Stripe webhook:**
   - Stripe Dashboard → Webhooks
   - Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
   - Copy webhook secret to Vercel environment variables

4. **Test production:**
   - Visit your deployed URL
   - Complete a test purchase
   - Verify webhook fires correctly

---

## ✅ You're Done!

Your SaaS is now live. Next steps:

1. **Launch:** Follow `docs/LAUNCH-TIMELINE.md`
2. **Monitor:** Set up analytics (see `docs/ANALYTICS-SETUP.md`)
3. **Iterate:** Collect feedback and improve

---

## Need Help?

- **Documentation:** All guides in `/docs` folder
- **Email:** support@fabrek.dev

**Happy building! 🚀**
```

---

## First 7 Days Timeline

**Day 1: Setup**
- Customer downloads boilerplate
- Installs dependencies
- Sees landing page locally
- 🎉 Milestone: "Running locally" (send congrats email if tracking)

**Day 2: Exploration**
- Explores /variations page
- Reads documentation
- Chooses hero and pricing layouts
- Customizes copy

**Day 3: Configuration**
- Sets up database
- Configures Stripe
- Tests auth flow
- Tests checkout flow

**Day 4: Customization**
- Updates colors and branding
- Adds own content
- Customizes components
- Adds product screenshots

**Day 5: Testing**
- Tests all flows end-to-end
- Mobile responsive check
- Cross-browser testing
- Fixes any issues

**Day 6: Deployment**
- Pushes to GitHub
- Deploys to Vercel
- Configures production environment variables
- Tests production checkout

**Day 7: Launch Prep**
- Creates Product Hunt page
- Writes social media posts
- Sets up analytics
- Plans launch day

---

## Support Response Templates

### General Support Response

```
Hi [Name],

Thanks for reaching out! Let me help you with [issue].

[Specific solution or steps]

Let me know if this resolves your issue. If not, reply with:
1. What you tried
2. What error you're seeing (screenshot helps!)
3. Your environment (Node version, OS)

Happy to hop on a quick call if needed.

Best,
[Your Name]
```

### Database Connection Error

```
Hi [Name],

Database connection errors are usually caused by one of these:

1. **Incorrect DATABASE_URL format**
   Should look like: postgresql://user:password@host:5432/database

2. **Database not created yet**
   Run: `createdb fabrk` (if using local PostgreSQL)

3. **Schema not pushed**
   Run: `npm run db:push`

Try these steps and let me know if it resolves the issue!

Best,
[Your Name]
```

### Stripe Webhook Not Firing

```
Hi [Name],

For local development, Stripe webhooks require the Stripe CLI:

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Run: `npm run stripe:listen`
3. Copy the webhook secret to .env.local as STRIPE_WEBHOOK_SECRET
4. Test with: `stripe trigger checkout.session.completed`

For production:
1. Add webhook endpoint in Stripe Dashboard
2. URL: https://yourdomain.com/api/webhooks/stripe
3. Copy signing secret to Vercel environment variables

Let me know if you need more help!

Best,
[Your Name]
```

### Deployment Issue

```
Hi [Name],

Let's troubleshoot your deployment issue.

Common causes:
1. **Build errors**: Check Vercel build logs
2. **Missing environment variables**: Verify all vars in Vercel dashboard
3. **Database connection**: Ensure production DATABASE_URL is set

Can you send me:
1. Vercel build logs (screenshot)
2. List of environment variables you've set (without values)

I'll help you debug!

Best,
[Your Name]
```

---

## Customer Success Check-ins

### Week 1 Check-in (Automated)

**Trigger:** 7 days after purchase, no deployment detected

```
Subject: Need help getting Fabrk deployed?

Hi [Name],

Noticed you haven't deployed yet. Stuck on something?

Common blockers at this stage:
- Database setup
- Stripe configuration
- Deployment to Vercel

I'm here to help! Just reply with what's blocking you and I'll send you a fix within 24 hours.

Or jump on a quick 15-minute call: [Calendly link]

Let's get you shipped!

[Your Name]
```

### Month 1 Check-in (Personal)

**Trigger:** 30 days after purchase

```
Subject: How's your build going?

Hi [Name],

It's been a month since you joined Fabrk. Wanted to check in personally.

Quick question: **Have you launched yet?**

If yes: I'd love to see it! Reply with your URL and I'll share it on Twitter.

If no: What's blocking you? I'm happy to help you get unstuck.

Also, **what's one feature you wish Fabrk had?** Your feedback helps shape the roadmap.

Thanks for being a customer!

[Your Name]
```

---

## Upsell & Cross-sell Templates

### After Successful Launch

```
Subject: Congrats on launching! Here's what's next

Hi [Name],

Saw you launched [project name] - congrats! 🎉

Now that you're live, here are some resources to help you grow:

**Free resources:**
- docs/MARKETING.md (launch strategy)
- docs/SEO-OPTIMIZATION.md (rank on Google)
- docs/ANALYTICS-SETUP.md (track growth)

**Paid resources** (optional):
- Fabrk v1.1 (coming soon): Command palette, calendar, rich text editor ($29 upgrade)
- 1-on-1 coaching call: $100/hour for personalized growth strategy
- Custom component: $200-500 depending on complexity

No pressure - just wanted you to know these are available if helpful.

Keep crushing it!

[Your Name]
```

---

## Feedback Collection

### NPS Survey (30 days after purchase)

```
Subject: Quick question: Would you recommend Fabrk?

Hi [Name],

On a scale of 0-10, how likely are you to recommend Fabrk to a fellow indie hacker?

[0] [1] [2] [3] [4] [5] [6] [7] [8] [9] [10]

(Click a number to respond)

---

**Why ask this?**

Your feedback helps me:
1. Understand what's working (and what's not)
2. Prioritize features for v1.1
3. Make Fabrk better for future customers

Thanks for your time!

[Your Name]
```

### Feature Request Follow-up

```
Subject: Re: Feature request - [Feature name]

Hi [Name],

Thanks for the feature request! I've added it to the roadmap.

Here's the current plan:
- v1.1 (Next 60 days): Command palette, calendar, rich text editor
- v1.2 (Next 90 days): File upload, video tutorials
- v2.0 (6 months): Multi-tenancy, RBAC, advanced analytics

Your requested feature ([Feature name]) is planned for [Version].

Want early access when it's ready? I'll add you to the beta list.

Thanks for helping shape Fabrk!

[Your Name]
```

---

## Re-engagement Templates

### 60 Days, No Activity

```
Subject: Still using Fabrk? Here's what's new

Hi [Name],

Haven't heard from you in a while. Hope you're doing well!

**What's new in Fabrk:**
- 5 new components added
- Performance improvements (30% faster)
- Updated documentation
- New showcase: [Customer project]

**Quick question:** Are you still building with Fabrk?

- ✅ Yes, but I got busy (reply if you need help getting back on track)
- 🚧 No, I switched to something else (sorry to hear that! Can you tell me why?)
- 💡 I launched! (congrats! Send me your URL!)

Let me know how I can help!

[Your Name]
```

---

## Onboarding Metrics to Track

1. **Time to First Value:**
   - How long from purchase to "running locally"?
   - Goal: <1 hour

2. **Time to Deployment:**
   - How long from purchase to first deployment?
   - Goal: <72 hours

3. **Support Ticket Volume:**
   - How many customers need help?
   - Goal: <20% of customers open a ticket

4. **Onboarding Completion Rate:**
   - % of customers who complete setup
   - Goal: >80%

5. **Customer Satisfaction:**
   - NPS score
   - Goal: >50 (promoters >50%)

---

## Onboarding Checklist

**Before Launch:**
- [ ] Welcome email template written
- [ ] Email sequence automated (Day 1, 2, 3, 7, 14)
- [ ] Getting Started guide published
- [ ] Support response templates ready
- [ ] Discord server created with #getting-started channel
- [ ] Support email monitored (response time <24 hours)

**After Launch:**
- [ ] Send welcome email immediately after purchase
- [ ] Monitor support emails daily
- [ ] Check in with customers proactively (Week 1, Month 1)
- [ ] Collect feedback regularly (NPS surveys)
- [ ] Iterate on onboarding based on common support questions

---

## Final Thoughts

**Good onboarding = happy customers = great reviews = more sales.**

The first 24 hours are critical. Make sure customers:
1. Can get started immediately (clear instructions)
2. Experience a quick win (running locally)
3. Know where to get help (Discord, email, docs)

**Your goal:** Get customers from purchase to deployed within 72 hours with minimal friction.

---

**Questions? Email support@fabrek.dev or join the Discord!**

**Happy customers = successful business. 🎉**
