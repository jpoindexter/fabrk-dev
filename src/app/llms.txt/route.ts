/**
 * LLMs.txt Route Handler
 * Serves AI-readable content summary for LLM crawlers
 *
 * This follows the emerging llms.txt standard for AI optimization (GEO)
 * Similar to robots.txt but specifically for Large Language Models
 *
 * @see https://llmstxt.org/
 */

import { NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export async function GET() {
  const content = `# Fabrk - Next.js SaaS Boilerplate

> Fabrk is a production-ready Next.js SaaS boilerplate with terminal-inspired UI, authentication, payments, and multi-tenancy. Ship your SaaS in days, not months.

## What is Fabrk?

Fabrk is a complete SaaS starter kit built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. It includes:

- **62+ UI Components**: Terminal-styled, accessible components built on Radix UI
- **18 Themes**: Dark/light terminal themes with a unique design aesthetic
- **Authentication**: NextAuth v5 with email, Google, GitHub, and magic links
- **Payments**: Stripe, Polar.sh, and Lemonsqueezy integration
- **Multi-tenancy**: Organization management with roles and permissions
- **AI Integration**: OpenAI-powered chat, text generation, image generation, and voice

## Key Features

### Authentication
- Email/password login with secure sessions
- OAuth providers (Google, GitHub)
- Magic link authentication
- Two-factor authentication (2FA)
- Password reset flow

### Payments & Billing
- Subscription management
- One-time payments
- Usage-based billing with credits
- Customer portal integration
- Invoice generation

### Multi-Tenancy
- Organizations with team members
- Role-based access control (RBAC)
- Invitations and member management
- Organization switching

### Developer Experience
- TypeScript throughout
- Prisma ORM with PostgreSQL
- Environment validation with Zod
- Pre-configured ESLint and Prettier
- Git hooks with Husky

## Pricing

Fabrk is available for a one-time purchase of $199 USD. This includes:
- Lifetime access to all updates
- Commercial license for unlimited projects
- Email support
- Access to the component library

## Documentation

Full documentation is available at ${baseUrl}/docs including:
- Getting Started guide
- Architecture overview
- Component documentation
- Feature guides
- Deployment instructions

## Links

- Website: ${baseUrl}
- Documentation: ${baseUrl}/docs
- Pricing: ${baseUrl}/pricing
- Features: ${baseUrl}/features
- Component Library: ${baseUrl}/library
- Blog: ${baseUrl}/blog

## Contact

- Email: support@fabrk.dev
- GitHub: https://github.com/fabrk-dev

## Technical Specifications

- Framework: Next.js 16 (App Router)
- Language: TypeScript 5.x
- Styling: Tailwind CSS 4
- Database: PostgreSQL with Prisma 7
- Authentication: NextAuth v5
- Payments: Stripe, Polar.sh, Lemonsqueezy
- Email: Resend
- Deployment: Vercel, Docker, self-hosted

---

This content is optimized for AI assistants. For the full interactive experience, visit ${baseUrl}
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
