# Other Marketing Channels

## 1. Indie Hackers Post

### Where to Post
- Main feed: https://www.indiehackers.com/
- Products: Submit to IH products directory

### Post Template

**Title**: I built a Next.js SaaS boilerplate with 234 components and 28 templates

```
Hey IH!

I just launched Fabrk, a production-ready Next.js 15 boilerplate for SaaS builders.

**The Problem**

Every time I started a new SaaS project, I'd spend 2-3 weeks on the same stuff:
- Setting up authentication
- Integrating Stripe
- Building UI components
- Creating dashboard layouts

It was driving me crazy. So I packaged everything into one boilerplate.

**What's Inside**

- 87 production-ready UI components
- 28 copy-paste page templates (dashboards, settings, billing)
- NextAuth v5 with OAuth + email/password + MFA
- Stripe integration (checkout, webhooks, customer portal)
- Prisma + PostgreSQL
- Resend for transactional emails
- 20 DaisyUI themes

**Pricing**

$299 one-time. Unlimited projects. Lifetime updates.

**Why I Built This**

After building 5+ SaaS products, I realized I was copying the same code between projects. The boilerplate started as my personal toolkit and grew from there.

**Links**

- Website: [URL]
- Demo: [DEMO_URL]
- Product Hunt: [PH_URL]

Would love to hear your thoughts! Happy to answer any questions.
```

---

## 2. Reddit Posts

### Subreddits to Post

1. **r/SideProject** (160k members)
   - Best for launch announcements
   - Use [LAUNCH] tag

2. **r/nextjs** (90k members)
   - Technical audience
   - Focus on Next.js 15 features

3. **r/webdev** (2.2M members)
   - Broader audience
   - Focus on productivity/time savings

4. **r/SaaS** (45k members)
   - SaaS founders
   - Focus on business value

### Reddit Post Template

**Title**: [LAUNCH] I built a Next.js SaaS boilerplate with 234 components - saves 73+ hours per project

```
Hey everyone,

After 6 months of work, I'm launching Fabrk - a production-ready Next.js 15 boilerplate.

**What it includes:**

**UI Components (87)**
- Buttons, inputs, forms, tables
- Charts (line, bar, donut, funnel)
- Data tables with sorting/filtering
- Modals, drawers, command palettes
- Date pickers, file uploaders
- Rich text editors

**Page Templates (8)**
- Analytics Dashboard
- Team Management
- Settings Page (4 tabs)
- Billing Dashboard
- Security & Privacy
- Admin Panel
- Chart Library
- Email Templates

**Backend**
- NextAuth v5 (OAuth + email + MFA)
- Stripe (checkout, webhooks, portal)
- Prisma + PostgreSQL
- Resend emails
- 20 themes

**Pricing:** $299 one-time, unlimited projects

**Links:**
- Website: [URL]
- Demo: [DEMO]

Happy to answer questions!
```

### Reddit Etiquette
- Don't spam multiple subreddits same day
- Space posts 24-48 hours apart
- Engage genuinely with comments
- Don't be too salesy
- Share value, not just promotion

---

## 3. Dev.to Article

### Article Structure

**Title**: How I Built a SaaS Boilerplate with 87 Components (And What I Learned)

```markdown
# How I Built a SaaS Boilerplate with 87 Components

Every new SaaS project, I'd spend weeks on the same setup:
- Authentication
- Payments  
- UI components
- Dashboard layouts

After the 5th time, I decided to build a reusable foundation.

## The Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + DaisyUI
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth v5
- **Payments**: Stripe
- **Email**: Resend

## Component Architecture

I built 234 components using these principles:

### 1. Composition over Configuration

Rather than mega-components with 50 props, I built composable pieces:

```tsx
// Composable
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Not this
<Card title="Title" content="Content" headerStyle={...} />
```

### 2. Radix Primitives for Accessibility

Every interactive component uses Radix UI primitives:
- Proper ARIA attributes
- Keyboard navigation
- Focus management

### 3. CVA for Variants

Class Variance Authority for type-safe variants:

```tsx
const buttonVariants = cva("base-styles", {
  variants: {
    variant: {
      default: "bg-primary",
      destructive: "bg-destructive",
    },
    size: {
      sm: "h-8 px-3",
      lg: "h-12 px-6",
    },
  },
});
```

## What I Learned

### 1. Templates > Components

Individual components are useful, but full page templates are 10x more valuable. Being able to copy-paste an entire settings page saves days.

### 2. Backend Matters

A beautiful UI is useless without working auth and payments. Spending time on webhook handling, session management, and error states pays off.

### 3. Themes Are Underrated

Supporting multiple themes from day one is easier than adding them later. DaisyUI made this trivial.

## The Result

Fabrk now includes:
- 87 UI components
- 8 page templates
- 20 themes
- Complete backend (auth, payments, DB, email)

Check it out: [URL]

---

What challenges have you faced building SaaS boilerplates? Let me know in the comments!
```

### Dev.to Tips
- Use good cover image
- Add relevant tags: nextjs, typescript, webdev, saas
- Engage with comments
- Cross-post to Hashnode if you have account

---

## 4. LinkedIn Post

```
I just launched something I've been working on for 6 months.

Fabrk: A production-ready Next.js SaaS boilerplate.

The problem it solves:
Every new project = weeks of setup (auth, payments, components, dashboards)

What's inside:
→ 87 UI components
→ 8 page templates  
→ NextAuth v5 + Stripe + Prisma
→ 20 themes
→ Everything configured and working

$299 one-time. Unlimited projects.

If you're building SaaS products, this saves you 73+ hours per project.

Link in comments 👇

#nextjs #saas #webdev #typescript #buildinpublic
```

**Comment with link:**
```
Check out Fabrk here: [URL]

Demo available. Happy to answer any questions!
```

---

## 5. Hacker News

### When to Post
- Best times: 6-9 AM PST (peak traffic)
- Best days: Tuesday-Thursday
- Title format: "Show HN: [Product] - [One-line description]"

### Post Template

**Title**: Show HN: Fabrk - Next.js SaaS boilerplate with 234 components

```
I built Fabrk, a production-ready Next.js 15 boilerplate for SaaS applications.

After building multiple SaaS products, I kept rebuilding the same foundations. This is my attempt to package it all into one starter.

Includes:
- 87 UI components (tables, charts, forms, etc.)
- 8 page templates (dashboard, settings, billing)
- Auth (NextAuth v5 with OAuth, MFA)
- Payments (Stripe checkout, webhooks)
- Database (Prisma + PostgreSQL)
- Email (Resend)
- 20 themes

Tech: Next.js 15, TypeScript, Tailwind, DaisyUI, Prisma

$299 one-time, unlimited projects.

Demo: [DEMO_URL]
Website: [URL]

Happy to answer questions about the architecture or implementation.
```

### HN Tips
- Be prepared for tough questions
- Don't be defensive
- Engage genuinely
- HN crowd values technical depth
- Expect criticism - respond gracefully

---

## Posting Schedule

**Day 1 (Launch)**
- Product Hunt (12:01 AM PST)
- Twitter thread (8 AM)
- Email to list (9 AM)

**Day 2**
- Indie Hackers post
- LinkedIn post

**Day 3**
- r/SideProject
- r/nextjs

**Day 4-5**
- Dev.to article
- r/webdev

**Day 6-7**
- Hacker News (if momentum is good)
- r/SaaS
