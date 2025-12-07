# Monorepo Restructure Plan

**Objective:** Split the codebase into distinct "Zones" using Next.js Route Groups. This ensures clear separation between the Marketing Site (your website), the Product (the SaaS boilerplate), and Authentication flows, while keeping everything in a single monorepo.

**Target Audience for this Doc:** You (The Founder) & AI Assistants.

---

## 1. The New Architecture

We are moving from a "flat" structure to a "grouped" structure. URLs will **NOT** change.

```text
src/app/
├── (marketing)/           <-- ZONE 1: Marketing Site
│   ├── layout.tsx         <-- Marketing Layout (Navbar + Footer)
│   ├── page.tsx           <-- Landing Page (fabrk.dev/)
│   ├── about/             <-- fabrk.dev/about
│   ├── pricing/           <-- fabrk.dev/pricing
│   ├── contact/           <-- fabrk.dev/contact
│   ├── blog/              <-- fabrk.dev/blog
│   ├── features/          <-- fabrk.dev/features
│   ├── (legal)/           <-- Sub-group for legal pages (Terms, Privacy)
│   └── ...
│
├── (platform)/            <-- ZONE 2: SaaS App (The Product)
│   ├── layout.tsx         <-- App Layout (Sidebar + Header + Auth Check)
│   ├── dashboard/         <-- app.fabrk.dev/dashboard (or /dashboard)
│   ├── settings/          <-- /settings
│   ├── billing/           <-- /billing
│   └── ...
│
├── (auth)/                <-- ZONE 3: Authentication
│   ├── layout.tsx         <-- Auth Layout (Centered Card, Minimal)
│   ├── login/             <-- /login
│   ├── register/          <-- /register
│   └── ...
│
└── layout.tsx             <-- ROOT LAYOUT (Providers, Fonts, Analytics ONLY)
```

---

## 2. Migration Steps

### Phase 1: Create Route Groups
1.  Create `src/app/(marketing)` folder.
2.  Create `src/app/(platform)` folder.
3.  Create `src/app/(auth)` folder.

### Phase 2: Move Pages (The "Big Shift")

**Move to `(marketing)`:**
*   `src/app/page.tsx` (The Landing Page)
*   `src/app/about/`
*   `src/app/blog/`
*   `src/app/contact/`
*   `src/app/features/`
*   `src/app/pricing/`
*   `src/app/purchase/`
*   `src/app/success/`
*   `src/app/(legal)/` (Move the whole group inside marketing)

**Move to `(platform)`:**
*   *Current `src/app/(dashboard)` contents will be renamed/moved here.*
*   If you want to rename `(dashboard)` to `(platform)`, we do that. Or we just put `dashboard` inside `(platform)`.
*   *Decision:* Rename `src/app/(dashboard)` -> `src/app/(platform)`.

**Move to `(auth)`:**
*   *(If you have separate auth pages, move them here. Currently they might be inside `(dashboard)` or templates)*.

### Phase 3: Layout Refactor

**1. Root Layout (`src/app/layout.tsx`):**
*   **Keep:** `<html>`, `<body>`, Fonts (`GeistSans`), Providers (`ThemeScript`, `PostHog`, `CookieConsent`).
*   **Remove:** Any specific Navbar or Footer imports if they exist (currently they seem to be in page templates).

**2. Marketing Layout (`src/app/(marketing)/layout.tsx`):**
*   **Create New File.**
*   **Imports:** `<SiteNavigation />` and `<Footer />`.
*   **Structure:**
    ```tsx
    export default function MarketingLayout({ children }) {
      return (
        <>
          <SiteNavigation />
          <main>{children}</main>
          <Footer />
        </>
      );
    }
    ```

**3. Platform Layout (`src/app/(platform)/layout.tsx`):**
*   **Existing:** This is your current `src/app/(dashboard)/layout.tsx`.
*   **Action:** Ensure it stays focused on the Dashboard Sidebar/Header.

---

## 3. Clean Up "Dev Shit" & Internal Files

We need to separate the *Product* from the *Project Management*.

**Create `/.internal/` (at root):**
*   Move `scripts/` (ONLY the dev/maintenance scripts) -> `/.internal/scripts/`
*   Move `docs/` (The planning docs, not the user docs) -> `/.internal/planning/`
*   Move `research/` -> `/.internal/research/`

**Keep Public:**
*   `scripts/setup.sh` (If customers need it)
*   `src/app/docs` (The actual documentation site)

---

## 4. Sync Script Update

Once this structure is live, `scripts/sync-to-official.sh` becomes much safer.

**New Logic:**
1.  **COPY** `src/app/(platform)` -> `dest/src/app/(dashboard)` (Rename back for customers if preferred, or keep `(platform)`).
2.  **COPY** `src/app/(auth)`.
3.  **COPY** `src/app/api`.
4.  **COPY** `src/components`.
5.  **IGNORE** `src/app/(marketing)`.
6.  **REPLACE** `src/app/page.tsx` with the generic boilerplate landing page.

This "Whitelist" approach guarantees no marketing files leak.

---

## 5. Verification Checklist

- [ ] **URLs:** `localhost:3000/pricing` still loads?
- [ ] **Dashboard:** `localhost:3000/dashboard` still loads?
- [ ] **Styles:** Do marketing pages still have the correct font/theme?
- [ ] **Build:** Does `npm run build` pass? (Checks for broken relative imports).
