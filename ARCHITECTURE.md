# Architecture Overview

This document provides a visual overview of the Fabrk architecture.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Browser   │  │  Mobile App │  │   CLI/SDK   │  │   Webhooks  │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │                │
└─────────┼────────────────┼────────────────┼────────────────┼────────────────┘
          │                │                │                │
          └────────────────┴────────────────┴────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              EDGE LAYER (Vercel)                             │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │     CDN     │  │    Edge     │  │    Rate     │  │    CORS     │        │
│  │   Caching   │  │  Middleware │  │  Limiting   │  │   Headers   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                                             │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         APPLICATION LAYER (Next.js)                          │
│                                                                             │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐        │
│  │      Server Components       │  │       API Routes             │        │
│  │  ┌────────┐  ┌────────┐     │  │  ┌────────┐  ┌────────┐     │        │
│  │  │  RSC   │  │ Layout │     │  │  │  Auth  │  │  CRUD  │     │        │
│  │  │ Pages  │  │  Tree  │     │  │  │ Routes │  │ Routes │     │        │
│  │  └────────┘  └────────┘     │  │  └────────┘  └────────┘     │        │
│  └──────────────────────────────┘  └──────────────────────────────┘        │
│                                                                             │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐        │
│  │      Client Components       │  │       Shared Libraries       │        │
│  │  ┌────────┐  ┌────────┐     │  │  ┌────────┐  ┌────────┐     │        │
│  │  │  React │  │  State │     │  │  │  Auth  │  │ Utils  │     │        │
│  │  │   UI   │  │ Mgmt   │     │  │  │  Lib   │  │  Lib   │     │        │
│  │  └────────┘  └────────┘     │  │  └────────┘  └────────┘     │        │
│  └──────────────────────────────┘  └──────────────────────────────┘        │
│                                                                             │
└────────────────┬────────────────────────────────────┬───────────────────────┘
                 │                                    │
                 ▼                                    ▼
┌────────────────────────────────┐  ┌────────────────────────────────────────┐
│        DATA LAYER              │  │         EXTERNAL SERVICES              │
│                                │  │                                        │
│  ┌──────────┐  ┌──────────┐   │  │  ┌──────────┐  ┌──────────┐           │
│  │ Supabase │  │ Upstash  │   │  │  │  Polar   │  │  Resend  │           │
│  │ Postgres │  │  Redis   │   │  │  │ Payments │  │  Email   │           │
│  └──────────┘  └──────────┘   │  │  └──────────┘  └──────────┘           │
│                                │  │                                        │
│  ┌──────────┐  ┌──────────┐   │  │  ┌──────────┐  ┌──────────┐           │
│  │  Prisma  │  │    S3    │   │  │  │  OAuth   │  │ Analytics│           │
│  │   ORM    │  │ Storage  │   │  │  │Providers │  │PostHog   │           │
│  └──────────┘  └──────────┘   │  │  └──────────┘  └──────────┘           │
│                                │  │                                        │
└────────────────────────────────┘  └────────────────────────────────────────┘
```

## Request Flow

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Client  │───▶│  Edge   │───▶│  Next   │───▶│ Prisma  │───▶│  DB     │
│ Request │    │ (Cache) │    │  API    │    │  Query  │    │ Result  │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
     │              │              │              │              │
     │              │              │              │              │
     ▼              ▼              ▼              ▼              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Request Pipeline                              │
│                                                                     │
│  1. DNS Resolution → Vercel Edge                                    │
│  2. SSL/TLS Termination                                             │
│  3. Edge Middleware (rate limiting, CORS, CSP nonce)               │
│  4. Route Matching                                                  │
│  5. Authentication Check (NextAuth)                                 │
│  6. Authorization (RBAC)                                            │
│  7. Business Logic                                                  │
│  8. Database Query (Prisma + Connection Pooling)                    │
│  9. Response Formatting                                             │
│ 10. Response Caching (if applicable)                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌─────────┐                                           ┌─────────────┐
│  User   │                                           │   NextAuth  │
└────┬────┘                                           └──────┬──────┘
     │                                                       │
     │  1. Click "Sign In"                                   │
     │  ─────────────────────────────────────────────────▶  │
     │                                                       │
     │  2. Redirect to OAuth Provider                        │
     │  ◀─────────────────────────────────────────────────  │
     │                                                       │
     │         ┌──────────────┐                              │
     │         │    OAuth     │                              │
     │  ─────▶ │   Provider   │                              │
     │         │(Google/GitHub)│                              │
     │  ◀───── └──────────────┘                              │
     │                                                       │
     │  3. Return with auth code                             │
     │  ─────────────────────────────────────────────────▶  │
     │                                                       │
     │                    ┌──────────────┐                   │
     │                    │   Database   │                   │
     │                    │  (User/Acct) │                   │
     │                    └──────────────┘                   │
     │                           │                           │
     │  4. Create/Update User    │                           │
     │                    ◀──────┘                           │
     │                                                       │
     │  5. Issue JWT Session                                 │
     │  ◀─────────────────────────────────────────────────  │
     │                                                       │
     │  6. Set HTTP-only Cookie                              │
     │  ◀─────────────────────────────────────────────────  │
     │                                                       │
```

## Database Schema (Simplified)

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│      User       │       │  Organization   │       │     Payment     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │       │ id              │
│ email           │──┐    │ name            │       │ userId          │
│ name            │  │    │ slug            │    ┌──│ stripeId        │
│ role            │  │    │ plan            │    │  │ amount          │
│ tier            │  │    │ customerId      │    │  │ status          │
│ customerId      │  │    └────────┬────────┘    │  └─────────────────┘
└────────┬────────┘  │             │             │
         │           │             │             │
         │           │    ┌────────▼────────┐    │
         │           │    │ OrgMember       │    │
         │           │    ├─────────────────┤    │
         │           └───▶│ userId          │    │
         │                │ organizationId  │    │
         │                │ role            │    │
         │                └─────────────────┘    │
         │                                       │
         └───────────────────────────────────────┘
```

## Component Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth group (login, register)
│   ├── (dashboard)/              # Dashboard group (protected)
│   ├── (marketing)/              # Public pages
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth handlers
│   │   ├── admin/                # Admin endpoints
│   │   ├── organizations/        # Org CRUD
│   │   ├── user/                 # User management
│   │   └── webhooks/             # Webhook handlers
│   └── docs/                     # Documentation
│
├── components/
│   ├── ui/                       # Base UI components (Radix)
│   ├── dashboard/                # Dashboard-specific
│   ├── landing/                  # Marketing components
│   └── docs/                     # Documentation components
│
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   ├── db/                       # Prisma client
│   ├── email/                    # Email templates
│   ├── feature-flags/            # Feature flag system
│   ├── rate-limit/               # Rate limiting
│   └── security/                 # Security utilities
│
└── config.js                     # Central configuration
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PRODUCTION                                   │
│                                                                     │
│  ┌─────────────────┐     ┌─────────────────┐                       │
│  │   Vercel Edge   │────▶│   Vercel        │                       │
│  │    Network      │     │   Functions     │                       │
│  └─────────────────┘     └────────┬────────┘                       │
│                                   │                                 │
│         ┌─────────────────────────┼─────────────────────────┐      │
│         │                         │                         │      │
│         ▼                         ▼                         ▼      │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐  │
│  │  Supabase   │         │   Upstash   │         │    S3/R2    │  │
│  │   (us-east) │         │   (global)  │         │  (us-east)  │  │
│  └─────────────┘         └─────────────┘         └─────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                          STAGING                                     │
│                                                                     │
│  Same architecture as production with separate:                     │
│  - Vercel project                                                   │
│  - Supabase project                                                 │
│  - Redis instance                                                   │
│  - Environment variables                                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        DEVELOPMENT                                   │
│                                                                     │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐           │
│  │  localhost  │     │  Local DB   │     │  Local      │           │
│  │    :3000    │     │  (Postgres) │     │  .env       │           │
│  └─────────────┘     └─────────────┘     └─────────────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────────────┐
│                      SECURITY ARCHITECTURE                           │
│                                                                     │
│  Layer 1: Network                                                   │
│  ├── DDoS Protection (Vercel/Cloudflare)                           │
│  ├── SSL/TLS 1.3                                                   │
│  └── WAF Rules                                                      │
│                                                                     │
│  Layer 2: Edge                                                      │
│  ├── Rate Limiting (Upstash)                                       │
│  ├── CORS Validation                                               │
│  ├── CSP Headers with Nonce                                        │
│  └── Security Headers (HSTS, X-Frame-Options, etc.)               │
│                                                                     │
│  Layer 3: Application                                               │
│  ├── Authentication (NextAuth)                                      │
│  ├── Authorization (RBAC)                                          │
│  ├── CSRF Protection                                               │
│  ├── Input Validation (Zod)                                        │
│  └── XSS Prevention (DOMPurify)                                    │
│                                                                     │
│  Layer 4: Data                                                      │
│  ├── Encryption at Rest (Supabase)                                 │
│  ├── Encryption in Transit (TLS)                                   │
│  ├── Row Level Security (RLS)                                      │
│  └── Audit Logging                                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Related Documentation

- [SLA/SLO Definitions](./SLA-SLO.md)
- [Capacity Planning](./CAPACITY-PLANNING.md)
- [Disaster Recovery](./DISASTER-RECOVERY.md)
- [API Documentation](./src/lib/openapi/spec.ts)
