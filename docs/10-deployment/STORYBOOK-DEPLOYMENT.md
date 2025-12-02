# Deploy Storybook Publicly

Make your 234 production-ready components publicly accessible at `storybook.fabrk.io` to showcase the component library to customers and improve conversion.

## Why Deploy Storybook?

- **Social Proof**: Show potential customers all 234 components with interactive examples
- **Conversion**: Competitors show component galleries; Storybook deployment is professional proof-of-quality
- **Documentation**: Live, interactive component documentation for teams building with Fabrk
- **SEO**: Component documentation page improves search visibility

## Option 1: Vercel (Recommended - Free)

### 1. Build Storybook

```bash
npm run build-storybook
```

This creates a static site in `storybook-static/` directory.

### 2. Deploy to Vercel

```bash
# If not installed
npm install -D vercel

# Deploy
vercel --prod --name storybook
```

### 3. Add Custom Domain

In Vercel dashboard:
1. Go to your storybook project settings
2. Add domain: `storybook.fabrk.io`
3. Configure DNS with your registrar

## Option 2: GitHub Pages (Free)

### 1. Configure GitHub Pages in package.json

```json
{
  "homepage": "https://yourusername.github.io/fabrk",
  "scripts": {
    "build-storybook": "storybook build -o ./storybook-static",
    "deploy-storybook": "gh-pages -d storybook-static"
  }
}
```

### 2. Deploy

```bash
npm run build-storybook
npm run deploy-storybook
```

Visit: `https://yourusername.github.io/fabrk/`

## Option 3: Chromatic (Official Storybook Hosting)

Chromatic is the official Storybook cloud platform with free tier.

### 1. Sign up

Visit [chromatic.com](https://chromatic.com) and sign in with GitHub

### 2. Install Chromatic

```bash
npm install -D chromatic
```

### 3. Deploy

```bash
npx chromatic --project-token=YOUR_TOKEN
```

Visit: `https://main-xxx.chromatic.com/`

## Custom Domain Setup

### For Vercel:

```bash
vercel domains add storybook.fabrk.io
```

Then add CNAME record to your DNS:
```
storybook.fabrk.io  CNAME  cname.vercel-dns.com
```

### For GitHub Pages + Custom Domain:

1. Create `public/CNAME` file:
```
storybook.fabrk.io
```

2. Add CNAME DNS record:
```
storybook.fabrk.io  CNAME  yourusername.github.io
```

## Maintenance

### Automatic Deployments (CI/CD)

Add to `.github/workflows/deploy-storybook.yml`:

```yaml
name: Deploy Storybook

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - run: npm ci
      - run: npm run build-storybook

      - uses: vercel/action@v4
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}
          working-directory: ./storybook-static
```

## Marketing Your Storybook

Add link to:
- Navigation bar (under "Components")
- Hero CTA buttons
- Footer
- README.md

Example:
```markdown
**Component Library**: [View all 234 components in Storybook](https://storybook.fabrk.io)
```

## Expected Stats

Once deployed:
- **95% Storybook coverage**: 234 components with interactive stories
- **100+ component variants**: All states and variations documented
- **Live demos**: Click through every component interactively
- **Accessibility audits**: WCAG compliance information for each component

## Troubleshooting

### Build Fails

```bash
# Clear build cache
rm -rf node_modules/.cache
npm run build-storybook --force
```

### Domain doesn't resolve

1. Check DNS propagation: `nslookup storybook.fabrk.io`
2. Wait 24-48 hours for DNS to propagate
3. Verify CNAME record is correct

### Storybook loads but styles are broken

Check that `basename` is set correctly in `.storybook/main.ts`:

```typescript
export default {
  // ... other config
  core: {
    builder: "@storybook/builder-vite",
  },
  viteFinal: async (config: any) => {
    return {
      ...config,
      base: process.env.NODE_ENV === "production" ? "/storybook/" : "/",
    };
  },
};
```

## Next Steps

1. Deploy Storybook within next 24 hours
2. Add link to navigation and marketing pages
3. Monitor analytics: Track how many customers visit Storybook
4. Update regularly when adding new components

---

**Estimated Time**: 30 minutes setup, 5 minutes deployment
