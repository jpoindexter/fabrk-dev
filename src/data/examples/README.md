# Example Marketing Data

Generic example data for building your marketing pages. These files show the structure and expected format for pricing, benefits, FAQs, and testimonials.

## Files

| File | Purpose |
|------|---------|
| `pricing-example.ts` | Generic pricing tiers (Starter/Pro/Enterprise) |
| `benefits-example.ts` | Product benefits and value propositions |
| `faq-example.ts` | Common SaaS frequently asked questions |
| `testimonials-example.ts` | Customer testimonials format |

## Usage

### Option 1: Use as Reference

Keep these files as reference while creating your own marketing data:

```typescript
// src/data/landing/pricing.ts (your custom data)
export const PRICING = {
  launch: 199,  // Your pricing
  features: [
    'YOUR FEATURE 1',
    'YOUR FEATURE 2',
  ],
  // ... customize for your product
};
```

### Option 2: Copy and Customize

Copy an example file and customize it:

```bash
cp src/data/examples/pricing-example.ts src/data/landing/pricing.ts
# Edit src/data/landing/pricing.ts with your content
```

### Option 3: Import Temporarily

Use example data while building, replace later:

```typescript
// Temporary - use example data
import { PRICING_EXAMPLE } from '@/data/examples/pricing-example';

// Later - replace with your data
import { PRICING } from '@/data/landing/pricing';
```

## Customization Guidelines

### Pricing
- Update prices to match your business model
- Customize features for each tier
- Adjust currency and billing periods
- Add/remove tiers as needed

### Benefits
- Focus on **outcomes**, not features
- Use real time/cost savings if available
- Highlight what makes you unique
- Keep descriptions concise and specific

### FAQs
- Answer questions your customers actually ask
- Be honest and transparent
- Link to docs for technical details
- Update as you get more questions

### Testimonials
- Use real customer quotes (with permission)
- Include specific metrics/results
- Add customer photo/logo if possible
- Avoid generic praise - be specific

## Structure

All example files export TypeScript constants with `as const` for type safety:

```typescript
export const EXAMPLE_DATA = {
  // your data
} as const;

// TypeScript will infer exact types
type ExampleType = typeof EXAMPLE_DATA;
```

## Next Steps

1. Review examples to understand the structure
2. Create your own files in `src/data/landing/`
3. Update components to import your data
4. Delete or keep examples as reference

---

**Note:** These are generic examples. Real marketing data should be based on your product, customers, and value proposition.
