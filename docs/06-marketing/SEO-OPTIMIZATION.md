# SEO Optimization & Meta Tags Guide

Comprehensive guide to optimizing Fabrk for search engines and social sharing.

## Page Meta Tags

Update these in `src/lib/metadata.ts` and individual page files:

### Homepage

```typescript
export const metadata: Metadata = {
  title: "Fabrk - Ship SaaS in Days, Not Months | 87 Components",
  description: "Production-ready Next.js 15 SaaS boilerplate with 87 components, authentication, payments, and complete documentation. Launch in 2 weeks instead of 2 months. $299 one-time.",
  keywords: ["SaaS boilerplate", "Next.js template", "TypeScript", "Stripe", "NextAuth"],
  og: {
    title: "Fabrk - The Complete SaaS Boilerplate",
    description: "87 production-ready components + auth + payments. Ship SaaS faster.",
    image: "https://fabrk.dev/og-image.png",
    url: "https://fabrk.dev",
  },
};
```

### Features Page

```typescript
export const metadata: Metadata = {
  title: "Features - Fabrk SaaS Boilerplate",
  description: "87 production-ready components, NextAuth v5, Stripe integration, PostgreSQL + Prisma, Resend emails, real-time with Pusher, multi-tenancy, and more.",
};
```

### Pricing Page

```typescript
export const metadata: Metadata = {
  title: "Pricing - Fabrk SaaS Boilerplate | $299 One-Time",
  description: "One-time payment of $299. Includes source code, lifetime updates, unlimited projects, and email support.",
};
```

### Components Page

```typescript
export const metadata: Metadata = {
  title: "Components - 87 Production-Ready UI Components",
  description: "Explore all 87 production-ready components with Storybook integration, TypeScript, and accessibility features. 95% Storybook coverage.",
};
```

### Demo Page

```typescript
export const metadata: Metadata = {
  title: "Live Demo - See Fabrk in Action",
  description: "Interactive demo showcasing dashboard, analytics, billing, admin panel, and component library. Fully functional.",
};
```

## Structured Data

### Schema.org Markup

Add to relevant pages:

```typescript
// src/lib/seo/structured-data.ts

export const softwareApplicationSchema = {
  "@context": "https://schema.org/",
  "@type": "SoftwareApplication",
  name: "Fabrk",
  description: "Production-ready SaaS boilerplate for Next.js",
  url: "https://fabrk.dev",
  applicationCategory: "DeveloperApplication",
  offers: {
    "@type": "Offer",
    price: "299",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "50",
  },
};

export const productSchema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  name: "Fabrk",
  image: "https://fabrk.dev/og-image.png",
  description: "87 components + auth + payments + multi-tenancy",
  brand: {
    "@type": "Brand",
    name: "Fabrk",
  },
  offers: {
    "@type": "Offer",
    url: "https://fabrk.dev/pricing",
    priceCurrency: "USD",
    price: "299",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "50",
    bestRating: "5",
    worstRating: "1",
  },
};
```

## Keyword Targeting

### Primary Keywords (High Intent)

**Target these aggressively:**

1. **"SaaS boilerplate"**
   - Volume: 2,000+ monthly
   - Intent: High (ready to buy)
   - Difficulty: Medium
   - Strategy: Homepage title + H1

2. **"Next.js boilerplate"**
   - Volume: 1,500+ monthly
   - Intent: High
   - Difficulty: Medium
   - Strategy: Features page + blog posts

3. **"SaaS starter kit"**
   - Volume: 1,200+ monthly
   - Intent: High
   - Difficulty: Medium
   - Strategy: FAQ + comparison

4. **"production-ready SaaS"**
   - Volume: 500+ monthly
   - Intent: Very High
   - Difficulty: High
   - Strategy: Case studies + blog

5. **"ship SaaS fast"**
   - Volume: 300+ monthly
   - Intent: Very High
   - Difficulty: Low
   - Strategy: Homepage hero

### Secondary Keywords (Medium Intent)

- "Next.js Stripe integration"
- "SaaS authentication"
- "full-stack boilerplate"
- "TypeScript SaaS template"
- "Makerkit alternative"
- "ShipFast alternative"

### Long-Tail Keywords (Research Phase)

- "how to build SaaS quickly"
- "SaaS boilerplate 2024"
- "best Next.js template"
- "production ready React boilerplate"
- "open source SaaS starter"

## On-Page SEO Checklist

### Homepage

- [ ] H1: "Ship SaaS in Days, Not Months"
- [ ] Meta title (60 chars): "Fabrk - Ship SaaS | 87 Components | $299"
- [ ] Meta description (155 chars): "Production-ready SaaS boilerplate..."
- [ ] H2s for each section (Features, Pricing, Testimonials, etc.)
- [ ] Alt text on all images
- [ ] Internal links to /components, /features, /pricing
- [ ] External links to relevant resources
- [ ] Clear CTA buttons (Get Started, View Demo)

### Features Page

- [ ] H1: "Complete Feature Set"
- [ ] Section headers for each feature category
- [ ] Feature descriptions with keywords naturally
- [ ] Internal links to component demos
- [ ] Code snippets (with syntax highlighting)
- [ ] Screenshots/videos of features in action
- [ ] Comparison table with competitors (good for SEO)

### Pricing Page

- [ ] H1: "Transparent Pricing"
- [ ] Clear pricing value proposition
- [ ] FAQ section with common questions
- [ ] Testimonials highlighting value
- [ ] Guarantee information (30-day)
- [ ] CTA buttons above and below fold
- [ ] Links to demo and features

### Blog Posts

Each blog post should:
- [ ] Target 1 primary keyword
- [ ] Include 3-5 secondary keywords naturally
- [ ] 1,500+ words for authority
- [ ] Headers structure (H1 → H2 → H3)
- [ ] Internal links (3-5 to relevant pages)
- [ ] External links to authority sources
- [ ] Author bio with credentials
- [ ] Featured image (1200x630px)
- [ ] Meta description
- [ ] Call-to-action

## Technical SEO

### Core Web Vitals

Monitor at [PageSpeedInsights](https://pagespeed.web.dev/):

**Targets:**
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

**Current Status**: Good (from Next.js 15 optimizations)

### XML Sitemap

Already implemented at `/sitemap.xml`:
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Update monthly

### robots.txt

Located at `/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Sitemap: https://fabrk.dev/sitemap.xml
```

### Canonical URLs

All pages have canonical URL (no duplicates):
```html
<link rel="canonical" href="https://fabrk.dev/page-name" />
```

### Mobile Responsiveness

- [ ] Test on iPhone 6+ (375px)
- [ ] Test on iPad (768px)
- [ ] Test on Desktop (1920px)
- [ ] Check Google Mobile-Friendly Test

## Content Strategy

### Blog Topics (High SEO Value)

1. **"How to Ship a SaaS in 2 Weeks"** (2,000+ words)
   - Keywords: "build SaaS fast", "SaaS MVP timeline"
   - Backlink magnet: shares how to use Fabrk

2. **"SaaS Boilerplate Comparison 2024"** (3,000+ words)
   - Keywords: "Makerkit vs ShipFast", "best SaaS starter"
   - Targets all competitive keywords

3. **"87 UI Components You Need for SaaS"** (2,500+ words)
   - Keywords: "SaaS UI kit", "component library"
   - Lists all Fabrk components

4. **"Production-Ready Code: Why It Matters"** (1,500+ words)
   - Keywords: "production ready", "code quality"
   - Thought leadership

5. **"The Cost of Building SaaS Boilerplate"** (2,000+ words)
   - Keywords: "SaaS development cost", "boilerplate ROI"
   - Positions value proposition

6. **"NextAuth vs Alternatives"** (2,000+ words)
   - Keywords: "NextAuth tutorial", "Next.js authentication"
   - Targets auth queries

7. **"Stripe Integration in Next.js"** (2,000+ words)
   - Keywords: "Stripe Next.js", "payment integration"
   - Targets e-commerce/SaaS queries

### Guest Posting Opportunities

- [ ] Dev.to (500K+ tech audience)
- [ ] Hashnode (SaaS technical content)
- [ ] Indie Hackers (founder audience)
- [ ] CSS-Tricks (web dev)
- [ ] Smashing Magazine (professional dev)

Topics:
- "We built 87 components—here's what we learned"
- "Why test coverage matters for boilerplate code"
- "The complete guide to production-ready SaaS"

### Content Calendar

**Month 1**:
- [ ] Launch 2 blog posts
- [ ] Publish case study
- [ ] Update meta tags across all pages

**Month 2**:
- [ ] Publish 2-3 blog posts
- [ ] Create comparison content
- [ ] Deploy Storybook (SEO benefit)

**Month 3-6**:
- [ ] Publish 2-3 posts/month
- [ ] Outreach for backlinks
- [ ] Monitor rankings
- [ ] Update content based on search trends

## Link Building Strategy

### Internal Linking

Link between pages:
- Homepage → Features → Pricing
- Blog posts → Related blog posts (3-5 links)
- Product pages → Blog support articles
- Testimonials → Case studies

Use anchor text with keywords:
- ✅ "87 production-ready components"
- ✅ "SaaS boilerplate with payments"
- ✅ "NextAuth integration"
- ❌ "click here"
- ❌ "learn more"

### External Link Building

Target high-authority sources:

**Tier 1** (Most valuable):
- [Hacker News](https://news.ycombinator.com/) - Can drive 1000+ referral traffic
- [Product Hunt](https://producthunt.com/) - Target: Top 10 of day
- [Indie Hackers](https://www.indiehackers.com/) - Founder audience

**Tier 2** (Good value):
- Dev.to
- Hashnode
- CSS-Tricks
- Smashing Magazine
- Reddit r/webdev

**Tier 3** (Moderate value):
- Tech blogs
- Developer newsletters
- Community forums

### Backlink Anchor Text

Use descriptive anchors:
- "87-component SaaS boilerplate"
- "Next.js boilerplate with Stripe"
- "production-ready SaaS starter"

## Authority Building

### Speak at Conferences

Target:
- Next.js conferences
- SaaS-focused events
- Indie hacker meetups
- Tech podcasts

Topics:
- "Shipping SaaS 3x Faster"
- "Production-Ready Code Economics"
- "Building Component Libraries"

### Newsletter/Community

**Start newsletter** focused on:
- SaaS founding tips
- Next.js tutorials
- Boilerplate updates
- Industry insights

Target 1,000+ subscribers to grow authority

### Thought Leadership

Publish on:
- Twitter/X (daily tips, frameworks)
- LinkedIn (long-form thought pieces)
- Dev.to (tutorials, deep dives)
- Substack (newsletter insights)

## Monitoring & Analytics

### Google Search Console Setup

- [ ] Verify site ownership
- [ ] Submit sitemap
- [ ] Monitor search queries
- [ ] Track ranking positions
- [ ] Monitor CTR and impressions
- [ ] Fix mobile usability issues

### Ranking Tracker

Monitor key keywords monthly:
- "SaaS boilerplate"
- "Next.js template"
- "Makerkit alternative"
- "production-ready SaaS"
- "ship SaaS fast"

Tools:
- Google Search Console (free)
- Ahrefs (paid, comprehensive)
- SEMrush (paid, competitive analysis)

### Traffic Goals

**Month 1**: 500 organic visits
**Month 3**: 2,000 organic visits
**Month 6**: 5,000+ organic visits
**Month 12**: 10,000+ organic visits

## Social Media SEO

### Twitter/X

**Daily content**:
- Fabrk tips and tricks
- Component showcases
- Launch updates
- Engage with SaaS community

**Target**: 1,000+ followers = social proof

### LinkedIn

**Weekly posts**:
- Longer-form thought pieces
- Founder insights
- SaaS trends analysis
- Company updates

**Target**: 500+ connections in SaaS/tech

### Dev.to

**Bi-weekly posts**:
- Technical deep dives
- Tutorial content
- Component showcase
- Industry insights

**Target**: 100+ followers, featured articles

## Email SEO

### Newsletter Growth

Use blog posts to grow email list:
- Sign-up forms at article end
- Lead magnets (free templates)
- Monthly digest of blog posts

### Welcome Series

First email:
- "Here's your free SaaS templates"
- Link to blog posts
- Link to Storybook

### Regular Newsletter

Content mix:
- 50% Fabrk updates/tips
- 30% SaaS insights
- 20% Community highlights

**Target**: Grow to 5,000+ subscribers in 6 months

## SEO Maintenance

### Monthly Checklist

- [ ] Review search console data
- [ ] Check ranking positions
- [ ] Publish new blog content
- [ ] Update old content
- [ ] Monitor Core Web Vitals
- [ ] Check for broken links
- [ ] Audit internal linking

### Quarterly Review

- [ ] Comprehensive keyword analysis
- [ ] Competitor content analysis
- [ ] Update top-performing content
- [ ] Identify new content opportunities
- [ ] Review backlink profile

### Annual SEO Audit

- [ ] Full technical SEO audit
- [ ] Competitive positioning analysis
- [ ] Content strategy reassessment
- [ ] Backlink profile analysis
- [ ] Set new annual targets

---

**Last updated**: [Current date]
**Next review**: [+3 months]
