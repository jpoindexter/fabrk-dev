# Repository Guidelines

## Project Structure & Module Organization
- Next.js 15 app lives in `src/app` with route handlers and layouts; shared UI sits in `src/components` and design tokens/utilities in `src/lib`.
- Forms, hooks, and types are in `src/hooks` and `src/types`; transactional emails in `src/emails`.
- Database schema and migrations reside in `prisma` (seed script at `prisma/seed.ts`).
- Tests are organized by kind in `tests/unit`, `tests/e2e`, and `tests/accessibility`; Storybook stories sit under `src/stories`.
- Public assets live in `public`; configuration and scripts in `config`, `scripts`, and `eslint-rules`.

## Build, Test, and Development Commands
- `npm run dev` — start the Next.js dev server (kills any stray :3000 process first).
- `npm run build` — generate Prisma client then build the production bundle.
- `npm start` — run the production build locally.
- `npm run lint` — hex scan plus ESLint (flat config) over `src`.
- `npm run type-check` — TypeScript without emitting.
- `npm run format` / `format:check` — Prettier with Tailwind plugin.
- `npm run test` / `test:watch` / `test:coverage` — Vitest suites and coverage.
- `npm run test:e2e` (or `...:headed`, `...:debug`) — Playwright flows; `npm run test:a11y` targets accessibility specs.
- `npm run storybook` / `build-storybook` — component workbench.

## Coding Style & Naming Conventions
- TypeScript strict; avoid `any`. Prefer named exports and small, composable components.
- ESLint rules live in `eslint.config.mjs` with repo-specific rules in `eslint-rules`; fix issues before pushing.
- Prettier (3.x) + Tailwind plugin governs formatting; use 2-space indent and single quotes where applicable.
- Components and hooks use PascalCase and camelCase; files generally match the default export (e.g., `UserMenu.tsx`).
- Follow existing folder conventions (route groups in `src/app/(group)/...`, utilities in `src/lib`).

## Testing Guidelines
- Unit/integration specs live alongside `tests/unit` (Vitest + Testing Library); name files `*.test.ts(x)`.
- E2E coverage in `tests/e2e` with Playwright fixtures; accessibility checks in `tests/accessibility` using axe.
- Add assertions for new behaviors and update snapshots when UI shifts; aim to keep `npm run test:coverage` stable for critical modules.
- Run `npm run test:all` before submitting significant changes; include screenshots for UI changes when feasible.

## Commit & Pull Request Guidelines
- Write concise, imperative commits (e.g., `Add dashboard empty state`, `Fix Stripe webhook retry logic`); group related changes and keep noise out.
- Reference issues in PR descriptions (`Fixes #123`) and complete the PR template: change summary, testing steps, screenshots (before/after), and checklists.
- Ensure lint, type-check, and relevant tests pass before requesting review; call out migrations, env var changes, or breaking changes explicitly.

## Security & Configuration Tips
- Copy `.env.example` to `.env.local` for local runs; never commit secrets. Stripe and OAuth keys are required for payment/auth flows.
- Use `npm run db:push` and `npm run db:seed` to sync and populate the database; run `prisma db push --force-reset` only when you understand the impact.
- Keep third-party API keys scoped and rotated; review `SECURITY.md` for incident reporting and handling guidelines.
