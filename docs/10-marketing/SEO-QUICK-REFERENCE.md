# SEO/AEO/GEO Quick Reference

Quick lookup for common SEO optimization tasks in Fabrk.

## One-Minute Checklist

**Every page should have:**
- [ ] Schema markup (JSON-LD)
- [ ] Unique title (50-60 chars)
- [ ] Meta description (150-160 chars)
- [ ] H1 heading (one per page)
- [ ] 3+ internal links
- [ ] Alt text on images

**High-impact pages should add:**
- [ ] FAQ section with schema
- [ ] Question-based headings
- [ ] Lists or tables
- [ ] Statistics/data points
- [ ] Breadcrumbs

## Common Patterns

### Add Schema to Any Page

```tsx
import { generate[Type]Schema } from "@/lib/seo";
import { SchemaScript } from "@/components/seo";

const schema = generate[Type]Schema(data);
return <SchemaScript schema={schema} />;
```

### Add FAQ Section

```tsx
import { FAQSection } from "@/components/seo";

<FAQSection
  title="Frequently Asked Questions"
  faqs={[
    { question: "Q?", answer: "A." }
  ]}
/>
```

### Add Breadcrumbs

```tsx
import { Breadcrumbs } from "@/components/seo";

<Breadcrumbs items={[
  { name: "Home", url: "/" },
  { name: "Products", url: "/products" }
]} />
```

### Add How-To Guide

```tsx
import { HowTo } from "@/components/seo";

<HowTo
  title="How to..."
  description="Step-by-step guide"
  steps={[
    { name: "Step 1", text: "Do this..." }
  ]}
/>
```

### Analyze Content

```typescript
import { analyzeContentComprehensive } from "@/lib/seo";

const score = analyzeContentComprehensive(
  content,
  ["keyword1", "keyword2"]
);

console.log(`Score: ${score.overall}/100`);
```

## Schema Types

| Schema | Use For | Import |
|--------|---------|--------|
| Organization | Homepage, about page | `generateOrganizationSchema` |
| SoftwareApplication | Product pages | `generateSoftwareApplicationSchema` |
| Article | Blog posts | `generateArticleSchema` |
| FAQ | FAQ sections | `generateFAQSchema` |
| HowTo | Tutorials, guides | `generateHowToSchema` |
| Breadcrumb | Navigation | `generateBreadcrumbSchema` |
| Review | Testimonials | `generateReviewSchema` |
| WebSite | Homepage | `generateWebSiteSchema` |

## AI Crawlers

Allowed by default in `robots.txt`:
- GPTBot (ChatGPT)
- Google-Extended (Gemini)
- Anthropic-AI (Claude)
- PerplexityBot
- CCBot (Common Crawl)

Block specific crawler:
```tsx
// In src/app/robots.ts
{
  userAgent: "FacebookBot",
  disallow: ["/"]
}
```

## Content Optimization Scores

| Score | SEO | AEO | GEO |
|-------|-----|-----|-----|
| **90-100** | Excellent structure, keywords, length | Questions, lists, tables present | Clear definitions, stats, citations |
| **70-89** | Good structure, could improve keywords | Has some Q&A or lists | Some data, needs more structure |
| **50-69** | Basic structure, needs work | Missing key elements | Lacks definitions or data |
| **Below 50** | Poor structure, thin content | No AEO elements | Not AI-friendly |

## Readability Targets

| Score | Reading Level | Best For |
|-------|---------------|----------|
| **90-100** | 5th grade | General public |
| **80-89** | 6th grade | Broad audience |
| **70-79** | 7th grade | Most web content |
| **60-69** | 8th-9th grade | Technical topics |
| **50-59** | 10th-12th grade | Academic content |
| **30-49** | College | Research papers |
| **0-29** | College graduate | Legal, academic |

**Target: 60-70 for web content**

## Quick Wins (< 1 Hour)

1. **Add FAQ to homepage** - Instant AEO boost
2. **Add organization schema** - Better brand recognition
3. **Add breadcrumbs to all pages** - Better site structure
4. **Optimize existing meta descriptions** - Higher CTR
5. **Add question headings** - Featured snippet opportunity

## Keyword Research

Use these patterns for SaaS keywords:

```
[Product Category] + alternatives
[Product Category] + vs [competitor]
[Product Category] + pricing
[Product Category] + reviews
how to [solve problem]
what is [concept]
best [product category] for [use case]
```

Example:
```
nextjs boilerplate
nextjs saas starter
next.js boilerplate vs create-next-app
best nextjs boilerplate for saas
how to build a saas with nextjs
```

## Content Templates

### Landing Page (SEO Priority)
```markdown
# [Primary Keyword] | [Brand]

[Value proposition in 1 sentence with keyword]

## What is [Product]?

[Clear definition, 40-60 words, keyword-rich]

## Key Features

1. Feature 1
2. Feature 2
3. Feature 3

## How It Works

[3-5 steps]

## FAQ

[5-10 common questions]
```

### Blog Post (AEO Priority)
```markdown
# [Question-Based Title]

[Direct answer in first paragraph]

## Table of Contents

## What is [Topic]?

[Definition]

## How [Topic] Works

[Explanation with lists]

## [Topic] vs [Alternative]

[Comparison table]

## FAQ

[5-10 questions]
```

### Tutorial (AEO + GEO Priority)
```markdown
# How to [Action]

[Summary: What you'll learn, time required]

## Prerequisites

- Requirement 1
- Requirement 2

## Step 1: [Action]

[Detailed instructions]

## Step 2: [Action]

[Detailed instructions]

## Common Issues

[Troubleshooting]

## FAQ

[Questions]
```

## Testing Checklist

Before publishing:

1. **Google Rich Results Test**
   ```
   https://search.google.com/test/rich-results
   ```

2. **PageSpeed Insights**
   ```
   https://pagespeed.web.dev/
   ```

3. **Mobile-Friendly Test**
   ```
   https://search.google.com/test/mobile-friendly
   ```

4. **Schema Validator**
   ```
   https://validator.schema.org/
   ```

## Monitoring

Track these metrics weekly:

- **Search Console:** Impressions, clicks, CTR, position
- **Featured Snippets:** Count of keywords with snippets
- **AI Citations:** Track mentions in ChatGPT, Perplexity
- **Core Web Vitals:** LCP, FID, CLS

## Emergency Fixes

### Dropped Rankings?

1. Check Search Console for manual actions
2. Verify robots.txt not blocking
3. Check for broken links
4. Ensure HTTPS working
5. Verify sitemap submitted

### Schema Errors?

1. Use Google Rich Results Test
2. Check JSON syntax
3. Verify required fields
4. Remove duplicate schemas
5. Test on staging first

### AI Not Citing?

1. Verify AI crawlers allowed in robots.txt
2. Add clear definitions
3. Include statistics
4. Cite sources
5. Improve content structure

## Resources

- **Full Guide:** [SEO-AEO-GEO-GUIDE.md](./SEO-AEO-GEO-GUIDE.md)
- **Components:** `src/components/seo/`
- **Utilities:** `src/lib/seo/`
- **Examples:** See implementation in homepage

---

**Need help?** Email support@fabrk.dev
