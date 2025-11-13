# Repository Guidelines

## Project Structure & Module Organization
Next.js App Router code ships from `src/app`, shared UI primitives stay in `src/components`, and reusable logic belongs to `src/hooks` and `src/lib`. Supporting types, emails, and middleware sit under `src/types`, `src/emails`, and `src/middleware.ts`. Prisma schema, migrations, and seeds live in `prisma/`, while static assets and favicons stay in `public/`. Automation helpers and queue workers go in `scripts/`, and internal docs sit in `docs/`. Use `sample_landing/` only for experiments—production flows go through `src/app`.

## Build, Test, and Development Commands
- `npm run dev`: Clear port 3000 collisions and start the Next.js dev server.
- `npm run build`: Run `prisma generate` and compile the production bundle.
- `npm run start`: Serve the compiled build.
- `npm run lint`: Execute the stray-hex scan plus ESLint rules.
- `npm run format` / `format:check`: Apply or verify Prettier + Tailwind ordering.
- `npm run test`, `test:watch`, `test:coverage`: Run Vitest suites; target >85% coverage on touched lines.
- `npm run db:migrate`, `db:push`, `db:reset`, `db:seed`: Manage schema drift and fixtures.

## Coding Style & Naming Conventions
Author code in TypeScript with 2-space indentation and trailing commas. Components use PascalCase filenames (`UserCard.tsx`), hooks use camelCase `useThing.ts`, and utilities prefer kebab-case. Keep Tailwind classes as the primary styling mechanism; global tokens and CSS live in `src/styles`. Lint before every push—`eslint.config.mjs` plus strict TypeScript settings should leave no warnings.

## Testing Guidelines
Vitest is configured via `vitest.config.ts`; colocate tests as `*.test.ts(x)` or inside `__tests__` folders. Use Testing Library for behavior-first assertions (`getByRole`, `findByText`). Mock Prisma and outbound clients through helpers in `src/test/`. Run `npm run test:coverage` before review and note any intentional gaps in the PR. `npm run test:e2e` is a placeholder until Playwright/Cypress lands.

## Commit & Pull Request Guidelines
Follow a conventional tone (`feat(auth): add magic link onboarding`) and keep commits scoped to one concern (schema change + implementation + tests). PRs should describe the problem, outline the solution, list the commands/tests run, and include screenshots for UI updates. Reference issues with `Closes #123` and request review only after lint, tests, and migrations succeed.

## Security & Configuration Tips
Never commit `.env*` files. Document every new variable in `README.md` or `docs/` before deployment. Use `stripe:listen` and Prisma CLI helpers instead of ad-hoc scripts. Background jobs (`scripts/job-worker.js`) must read credentials from the environment, and new integrations should expose configuration through typed helpers in `src/lib`.
