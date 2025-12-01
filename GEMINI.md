# Fabrk Boilerplate Context for Gemini

## Project Overview

**Fabrk** is a premium enterprise-grade Next.js 15 SaaS boilerplate designed to accelerate the development of professional SaaS applications. It includes a comprehensive set of production-ready components, templates, and features.

### Core Tech Stack

*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript 5 (Strict Mode)
*   **Database:** PostgreSQL (via Prisma ORM)
*   **Authentication:** NextAuth v5 (Credentials + OAuth)
*   **Styling:** Tailwind CSS, Radix UI, Lucide React
*   **Payments:** Stripe
*   **Email:** Resend
*   **Testing:** Vitest (Unit/Integration), Playwright (E2E)
*   **CI/CD:** GitHub Actions

## Building and Running

The following commands are available via `npm`:

*   **Development Server:** `npm run dev` (Starts on http://localhost:3000)
*   **Build for Production:** `npm run build` (Generates `.next` folder)
*   **Start Production Server:** `npm start`
*   **Database Management:**
    *   `npm run db:push`: Push schema changes to the database
    *   `npm run db:seed`: Seed the database with initial data
    *   `npm run db:studio`: Open Prisma Studio
*   **Testing:**
    *   `npm test`: Run unit tests (Vitest)
    *   `npm run test:e2e`: Run E2E tests (Playwright)
    *   `npm run test:coverage`: Run tests with coverage report
*   **Code Quality:**
    *   `npm run lint`: Run ESLint
    *   `npm run type-check`: Run TypeScript compiler check
    *   `npm run format`: Format code with Prettier

## Development Conventions

*   **File Structure:**
    *   `src/app`: Next.js App Router pages, layouts, and API routes.
    *   `src/components`: React components organized by feature (e.g., `ui`, `dashboard`, `landing`).
    *   `src/lib`: Utility functions, configuration, and shared logic.
    *   `prisma`: Database schema (`schema.prisma`) and seed scripts.
    *   `tests`: Test files (E2E, accessibility).

*   **Coding Style:**
    *   **TypeScript:** Strict mode is enforced. Avoid `any`.
    *   **Components:** Use functional components with hooks. Prefer Server Components unless client-side interactivity (`"use client"`) is required.
    *   **Naming:**
        *   Files: `kebab-case` (e.g., `user-profile.tsx`)
        *   Components: `PascalCase` (e.g., `UserProfile`)
        *   Functions: `camelCase` (e.g., `getUserProfile`)
    *   **Styling:** Use Tailwind CSS utility classes. Follow the design tokens defined in `globals.css`.

*   **Testing:**
    *   Write unit tests for logic-heavy components and utility functions.
    *   Write E2E tests for critical user flows (e.g., authentication, payments).
    *   Ensure accessibility using `npm run test:a11y`.

## Architecture Highlights

*   **Authentication:** NextAuth v5 handles user sessions. Users can sign in via email/password or OAuth providers (e.g., Google, GitHub).
*   **Database Schema:** The `prisma/schema.prisma` file defines the data model, including `User`, `Organization`, `Payment`, `Subscription`, and `Team` entities.
*   **API Routes:** API endpoints are located in `src/app/api`. They typically use Next.js Route Handlers.
*   **Design System:** The UI is built on top of Radix UI primitives and styled with Tailwind CSS. It follows a "Neobrutalist" aesthetic by default but supports multiple themes.

## Key Configuration Files

*   `next.config.ts`: Next.js configuration.
*   `package.json`: Project dependencies and scripts.
*   `prisma/schema.prisma`: Database schema definition.
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `.env.example`: Template for environment variables.
