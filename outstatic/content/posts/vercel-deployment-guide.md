---
title: 'Deploying to Vercel: Production-Ready in Minutes'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'vercel-deployment-guide'
description: 'Deploy Fabrk to Vercel with optimal settings. Includes environment variables, edge functions, and production best practices.'
publishedAt: '2026-01-16T10:00:00.000Z'
---

**From local to production in minutes.**

---

## Why Vercel?

Vercel is the native platform for Next.js:

- Zero-config deployments
- Edge network globally
- Preview deployments per PR
- Integrated analytics
- Automatic HTTPS

---

## Quick Deploy

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

That's it.

---

## Vercel Configuration

Fabrk includes optimized `vercel.json`:

```json
{
  "buildCommand": "prisma generate && next build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

---

## Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

### Required

```bash
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="your-secret-min-32-chars"
NEXTAUTH_URL="https://yourdomain.com"

# App
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### OAuth (if using)

```bash
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### Payments (choose one)

```bash
# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Or Polar
POLAR_API_KEY="..."
POLAR_WEBHOOK_SECRET="..."
```

### Email

```bash
RESEND_API_KEY="re_..."
```

---

## Database Options

### Vercel Postgres

Native integration:

1. Go to Storage → Create Database → Postgres
2. Environment variables auto-added
3. Run `npm run db:push`

### External Database

Use any PostgreSQL provider:

```bash
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

Popular options:
- Supabase
- Neon
- PlanetScale
- Railway

---

## Build Settings

Fabrk uses standalone output for optimal cold starts:

```typescript
// next.config.ts
export default {
  output: 'standalone',
};
```

This reduces function size significantly.

---

## Preview Deployments

Every PR gets a preview URL:

```
https://your-project-git-feature-branch.vercel.app
```

Test changes before merging to main.

---

## Custom Domain

1. Go to Settings → Domains
2. Add your domain
3. Update DNS records
4. SSL is automatic

Update environment variables:

```bash
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

---

## Edge Functions

Middleware runs at the edge automatically:

```typescript
// middleware.ts
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

Authentication checks happen globally, close to users.

---

## Webhooks

Configure webhook URLs for your providers:

### Stripe
```
https://yourdomain.com/api/stripe/webhook
```

### Polar
```
https://yourdomain.com/api/polar/webhook
```

---

## Cron Jobs

Schedule tasks with Vercel Cron:

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/daily-report",
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 0 * * 0"
    }
  ]
}
```

---

## Environment Separation

Use different variables per environment:

| Variable | Development | Preview | Production |
|----------|-------------|---------|------------|
| DATABASE_URL | Local DB | Preview DB | Production DB |
| STRIPE_SECRET_KEY | sk_test_... | sk_test_... | sk_live_... |
| NEXTAUTH_URL | localhost:3000 | Preview URL | Production URL |

Vercel handles this automatically with environment scopes.

---

## Deployment Protection

Protect preview deployments:

1. Go to Settings → Deployment Protection
2. Enable Vercel Authentication
3. Only team members can access previews

---

## Analytics

Enable Vercel Analytics:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Speed Insights

Monitor Core Web Vitals:

```typescript
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## Logs

View logs in Vercel Dashboard:

- Build logs
- Function logs
- Edge function logs

Filter by:
- Time range
- Log level
- Function name

---

## Rollbacks

If something goes wrong:

1. Go to Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"

Instant rollback.

---

## CI/CD

Vercel integrates with GitHub automatically:

- Push to main → Production deploy
- Push to branch → Preview deploy
- PR merged → Production deploy

No configuration needed.

---

## Checklist

Before going live:

- [ ] All environment variables set
- [ ] Custom domain configured
- [ ] Webhook URLs updated
- [ ] OAuth callback URLs updated
- [ ] Database migrated
- [ ] Analytics enabled
- [ ] Error monitoring set up

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check build logs for errors |
| 500 errors | Check function logs |
| Auth not working | Verify NEXTAUTH_URL matches domain |
| DB connection fails | Check DATABASE_URL and SSL |
| Webhooks not received | Verify webhook secrets |

---

## Best Practices

1. **Use preview deployments** - Test before production
2. **Set up monitoring** - Know when things break
3. **Keep secrets secure** - Use environment variables
4. **Enable analytics** - Understand your users
5. **Have a rollback plan** - Mistakes happen

Production deployment, simplified.

