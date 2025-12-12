# Repository Guidelines

## Project Structure & Module Organization
- Next.js + TypeScript lives in `src/`; shared helpers in `src/lib/`, styles in `src/styles/`, assets in `public/`.
- Jobs, email workers, and audits sit under `.internal/` and `scripts/`. Database schema is `prisma/schema.prisma`; seeds in `prisma/seed.ts`.
- Unit/integration tests stay near code in `__tests__/`; Playwright suites (e2e, a11y, visual) are in `tests/`.

## Build, Test, and Development Commands
- Install: `npm install` (Node 20+). Dev server: `npm run dev` (kills stale :3000 automatically).
- Build: `npm run build` (`prisma generate` + `next build`); production path `npm run build:prod` adds `prisma migrate deploy`.
- Quality: `npm run lint` (TS/JS), `npm run lint:css` (styles), `npm run format:check` (Prettier), `npm run type-check`.
- Tests: `npm test` (Vitest), `npm run test:watch`, `npm run test:coverage`. Playwright: `npm run test:e2e`, `npm run test:a11y`, `npm run test:visual`.
- Data: `npm run db:push`, `npm run db:migrate`, `npm run db:reset`, `npm run db:seed`; inspect with `npm run db:studio`.

## Coding Style & Naming Conventions
- TypeScript-first; prefer functional components. Imports ordered; use tsconfig base URL for absolute paths.
- 2-space indent, single quotes. Names: components `PascalCase`, hooks/helpers `camelCase`, files `kebab-case.ts[x]`.
- ESLint (flat), Prettier, Stylelint, and lint-staged enforce consistency; run `npm run lint:all` before pushing. Reuse existing UI primitives first.

## Testing Guidelines
- Frameworks: Vitest + Testing Library for unit/integration; Playwright for e2e, accessibility, and visual snapshots.
- Place unit specs in `__tests__/` beside implementations; name `*.spec.ts[x]` or `*.test.ts[x]`. Playwright specs stay in `tests/`.
- Favor assertion-rich tests over snapshots; update visual baselines with `npm run test:visual:update` only for intentional UI changes. Include an e2e path for auth/data flows.

## Commit & Pull Request Guidelines
- Use concise, present-tense commits (e.g., `add billing webhook handler`, `fix onboarding copy`). Group related changes; avoid WIP noise.
- PRs should cover scope, testing notes (`npm test`, `npm run test:e2e`, etc.), screenshots for UI changes, and linked issue/Linear ticket. Note schema changes (`prisma migrate dev`) and commit migrations.
- Keep diffs focused; ensure lint, type-check, and relevant tests pass locally.

## Security & Configuration Tips
- Do not commit secrets; keep developer envs in `.env.local` and update `.env` templates when adding variables. Rotate any exposed keys used in `.internal/` scripts.
- Stripe/email workers (`jobs:*`, `email:*`) require env vars; document new ones in README or a brief `.env.example` note.
- Validate inputs with Zod and favor route handlers/server actions to limit client exposure.
