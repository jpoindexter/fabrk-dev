# Gap-Closing Plan: FABRK vs ShipAI.today

Date: 2026-03-06
Status: APPROVED
Reference: `docs/COMPETITIVE_ANALYSIS.md`

---

## Revised Gap Assessment

After auditing the actual codebase, FABRK already has several features the competitive analysis listed as missing:

| Feature | Status | Location |
|---------|--------|----------|
| SEO toolkit | EXISTS | `src/lib/seo/`, `src/app/sitemap.ts`, `src/app/robots.ts` |
| Health endpoint | EXISTS | `src/app/api/health/route.ts` |
| Cache layer | EXISTS | `src/lib/cache.ts` |
| Rate limiting | EXISTS | `src/lib/rate-limit/` |
| Monitoring | EXISTS | `src/lib/monitoring/` |
| Storage/uploads | EXISTS | `src/lib/storage/`, `src/lib/uploads/` |
| Feature flags | EXISTS | `src/lib/features/` (access-control, tier-config) |
| AI provider abstraction | EXISTS | `src/lib/ai/provider.ts` |

**Actual remaining gaps:** 14 items across 4 phases.

---

## Phase 1: Quick Wins (Week 1) - 15-20 hours

These require minimal effort but close visible competitive gaps.

### 1.1 i18n Support
**Gap:** ShipAI has next-intl with 7 languages. FABRK has none.
**Plan:**
- Install `next-intl`
- Configure for English, Spanish, French, German (4 languages)
- Add locale switcher component using existing `Select` UI component
- Wrap app layout with `NextIntlClientProvider`
- Create `messages/` directory with translation JSON files
- Add i18n middleware for locale detection
**Effort:** 4-6 hours
**Repo:** fabrk-dev

### 1.2 Docker Compose for Local Dev — DONE
`docker-compose.yml` with PostgreSQL 17 + Redis 7.4, `.dockerignore`, `npm run docker:*` scripts.

### 1.3 Environment Strategy — DONE
`SERVICE_*` and `FEATURE_*` toggles added to `src/lib/env/index.ts` and `.env.example`.

### 1.4 Recipes Documentation — DONE
5 recipes in `docs/recipes/`: rebrand, add feature, add payment, customize theme, deploy.

### 1.5 Branding System — DONE
`metadata.ts` refactored to import from `config/app.ts`. SEO schemas split into two files (<300 lines each). Fake aggregateRating removed. Hardcoded emails/names replaced with config references. `sitemap.ts`, `robots.ts`, `email-core.ts`, `changelog/rss` now use env vars.

---

## Phase 2: Core Infrastructure (Weeks 2-3) - 30-40 hours

These close the most impactful technical gaps.

### 2.1 Redis Integration — DONE
`ioredis` installed. `src/lib/redis.ts` singleton with `SERVICE_REDIS` toggle. `src/lib/cache.ts` upgraded to use Redis with in-memory fallback (write-through). `REDIS_URL` added to env config. All cache tests pass.

### 2.2 Background Jobs — DONE
`bullmq` installed. `src/lib/jobs/` with queue, worker, scheduler, typed payloads. 4 job types: email, cleanup, usage metering, webhooks. Cron scheduler for recurring cleanup. `npm run jobs:worker` script.

### 2.3 Structured Logging — DONE
Logger upgraded from console-based to Pino. JSON in production, pretty in development. Sensitive data redaction via Pino `redact`. `LOG_LEVEL` env var support. Child logger support. Same `logger.info/warn/error/debug` API.

### 2.4 Admin Dashboard Wiring
**Gap:** ShipAI has full admin panel. FABRK has admin components but they're not fully wired.
**Plan:**
- Audit existing admin components: `admin-metrics-card.tsx`, `audit-log.tsx`, `user-management-table.tsx`, `system-health-widget.tsx`
- Wire `user-management-table.tsx` to real Prisma user queries
- Wire `admin-metrics-card.tsx` to real analytics (signups, active users, revenue)
- Wire `system-health-widget.tsx` to health endpoint data
- Add usage analytics view (API calls, AI usage, storage)
- Add billing overview (subscriptions, MRR, churn)
**Effort:** 8-12 hours
**Repo:** fabrk-dev

---

## Phase 3: AI Orchestration (Weeks 3-4) - 30-40 hours

This closes the biggest competitive gap. ShipAI's 11 AI handlers is their headline feature.

### 3.1 Vercel AI SDK Integration — DONE
`@ai-sdk/anthropic` added. `provider.ts` now supports Anthropic > OpenAI > Google > Ollama priority. All AI SDK packages updated to latest (v3/v5). Zero type errors.

### 3.2 Pre-Built AI Handlers — DONE (Core Set)
Existing routes already cover: chat (streaming), text (summarize/rewrite/translate/expand/grammar/tone), image (DALL-E), form generation (structured output), speech-to-text, text-to-speech. Added: `search.ts` handler with SearXNG integration + AI synthesis. API route at `/api/ai/search`. Feature flags: `FEATURE_SEARCH`, `FEATURE_DEEP_SEARCH`, `SERVICE_SEARCH`.

### 3.3 Vector Memory (RAG) — DONE
Full memory system at `src/lib/ai/memory/`: `types.ts` (VectorStore interface), `embeddings.ts` (Vercel AI SDK embed), `in-memory-store.ts` (dev fallback with cosine similarity), `qdrant-store.ts` (production Qdrant HTTP API, no SDK needed, auto-creates collection). API route at `/api/ai/memory` (GET/POST/DELETE). Env: `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_COLLECTION`, `SERVICE_VECTOR_DB`, `FEATURE_MEMORY`.

---

## Phase 4: Documentation & Polish (Week 5) - 15-20 hours

### 4.1 Full Documentation Site
**Gap:** ShipAI has comprehensive docs with getting started, features, operations, deployment, recipes.
**Plan:**
- Create documentation structure matching or exceeding ShipAI:
  - Getting Started (setup, configuration, troubleshooting)
  - Codebase (architecture, directory structure, data flow)
  - Features (auth, billing, AI, themes, components)
  - Operations (database, jobs, monitoring, maintenance)
  - Deployment (Vercel, Docker, production checklist)
  - Recipes (rebrand, add feature, customize theme, etc.)
- Use existing blog infrastructure or add dedicated docs section
**Effort:** 8-10 hours
**Repo:** fabrk-dev

### 4.2 Comparison Pages
**Gap:** No head-to-head comparison content for SEO.
**Plan:**
- Create `/compare/shipai` page
- Create `/compare/shipfast` page
- Create `/compare` index page listing all comparisons
- Each page: feature table, honest pros/cons, CTA
- SEO optimized for "FABRK vs ShipAI" type searches
**Effort:** 4-6 hours
**Repo:** fabrk-dev

### 4.3 Performance Benchmarking
**Gap:** ShipAI claims 98 Lighthouse. FABRK hasn't published scores.
**Plan:**
- Run Lighthouse on all key pages
- Fix any issues to hit 95+ across all categories
- Add scores to landing page
- Set up automated Lighthouse CI
**Effort:** 3-4 hours
**Repo:** fabrk-dev

---

## Phase 5: Framework Extraction (Ongoing, Parallel)

All features built in Phases 1-4 should be designed for extraction to fabrk-framework.

### Package Mapping
| Feature | fabrk-dev Location | Framework Package |
|---------|-------------------|-------------------|
| AI orchestration | `src/lib/ai/` | `@fabrk/ai` |
| Components | `src/components/ui/` | `@fabrk/components` |
| Design system | `src/design-system/` | `@fabrk/design-system` |
| Config/env | `src/config/`, `src/lib/env/` | `@fabrk/config` |
| Auth patterns | `src/lib/auth.ts` | `@fabrk/core` |
| Jobs/queues | `src/lib/jobs/` | `@fabrk/core` |
| Redis/cache | `src/lib/redis.ts`, `src/lib/cache.ts` | `@fabrk/config` |

### Extraction Criteria
Before extracting any module:
1. Working and tested in fabrk-dev
2. Clean interface with no business logic leakage
3. Configurable via options/env vars
4. TypeScript types exported
5. README with usage examples

---

## Timeline Summary

| Phase | Duration | Hours | Key Deliverables |
|-------|----------|-------|-----------------|
| 1: Quick Wins | Week 1 | 15-20h | i18n, Docker, env strategy, recipes, branding |
| 2: Core Infrastructure | Weeks 2-3 | 30-40h | Redis, BullMQ, Pino logging, admin dashboard |
| 3: AI Orchestration | Weeks 3-4 | 30-40h | Vercel AI SDK, 8 handlers, vector memory |
| 4: Docs & Polish | Week 5 | 15-20h | Full docs, comparison pages, Lighthouse 95+ |
| 5: Framework Extract | Ongoing | Parallel | Extract to @fabrk/* packages |
| **Total** | **5 weeks** | **90-120h** | |

---

## Success Criteria

After all phases, FABRK matches or exceeds ShipAI on every dimension (AI handlers, Docker, i18n, jobs, vector memory, docs, Lighthouse 95+) while maintaining advantages in design system (18 themes), pricing (free), payment flexibility (3 providers), and honesty (no fake social proof).
