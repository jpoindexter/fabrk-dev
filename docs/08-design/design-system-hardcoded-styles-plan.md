# Design System Hardcoded Styles Plan

## 1. Problem Statement

The design system requires that colors, typography, and other visual styles are expressed via tokens/utilities rather than hardcoded values. Today, most UI follows the system, but there are notable pockets of hardcoded colors (hex values, `bg-black`/`text-white`, inline styles) and a broken `scan:hex` tool, which together undermine consistency and enforcement.

## 2. Current State

### 2.1 Design system & tokens

- **Global theme tokens** live in `src/app/globals.css`:
  - CSS variables like `--background`, `--foreground`, `--primary`, `--accent`, semantic states, and chart colors.
  - Tailwind v4 `@theme` mappings expose these as `--color-*` tokens used by `bg-primary`, `text-muted-foreground`, etc.
- **Typography tokens** (font families) are also defined in `globals.css`:
  - `--font-sans`, `--font-mono` mapped to Geist fonts.
- **Design reference documentation** in `docs/design/cursor-design-system.md` defines a richer palette and typography/shadow system, but is not fully wired into runtime tokens.

### 2.2 Hex color enforcement script

- `scripts/utilities/scan-stray-hex.mjs` enforces a "no hex in src" rule with exceptions:
  - Allowed paths: `emails/`, `src/emails/`, `public/`, `sample_landing/`, `logs/`, and any file matching `/tech-stack-section\.tsx$/`.
  - For all other `src/**` files tracked by git, it scans for `#[0-9a-fA-F]{3,6}` and fails the run on any match.
- **Current issue:** `npm run scan:hex` fails before scanning due to a missing tracked file:

  ```javascript path=null start=null
  const files = execSync("git ls-files", { encoding: "utf8" })
    .trim()
    .split("\n")
    .filter(Boolean);

  files.forEach((file) => {
    if (allowPatterns.some((regex) => regex.test(file))) return;
    if (!file.startsWith("src")) return;

    const absolute = path.resolve(file);
    const lines = readFileSync(absolute, "utf8").split(/\r?\n/); // ENOENT for removed file
  });
  ```

  - The error references `src/app/(legal)/cookies/page.tsx`, which is still tracked by git but no longer exists on disk.
  - As a result, we **do not currently have reliable CI enforcement** for stray hex.

### 2.3 Hardcoded hex colors inside `src/`

Using `grep` for `#[0-9a-fA-F]{3,6}` and cross-checking against `allowPatterns`, we see several hardcoded hex usages in `src/` that the script would treat as violations once fixed:

- **Technology logo SVGs** in `TechStackSection`:

  ```tsx path=/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/home/tech-stack-section.tsx start=91
  <circle cx="12" cy="12" r="2" fill="#61DAFB" />
  ...
  <rect width="24" height="24" fill="#3178C6" rx="2" />
  ...
  <path d="..." fill="#06B6D4" />
  ```

- **Color picker presets** in `ColorPicker`:

  ```tsx path=/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/ui/color-picker.tsx start=25
  const defaultPresets = [
    "#000000",
    "#FFFFFF",
    "#EF4444",
    "#F97316",
    "#F59E0B",
    // ...more Tailwind-esque hex values
  ];
  ```

- **Inline HTML email previews** embedded as strings in `email-templates` showcase:

  ```tsx path=/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/app/library/email-templates/page.tsx start=71
  preview: `<!DOCTYPE html>
  <html lang="en">
  ...
  <body style="...; background-color: #f5f5f5;">
    <table ... style="background-color: #f5f5f5; ...">
    ...
    <td style="... background-color: #000000; ... color: #ffffff; ...">Fabrk</td>
    ...
  </body>
  </html>`,
  ```

- **Storybook/demo assets under `src/stories/**`** contain hex in CSS and SVGs used only for documentation/demos.

Note: hex values in `src/emails/**` are currently allowed by `allowPatterns`, but still represent a separate "mini design system" for email templates.

### 2.4 Tailwind utility color classes (`bg-black`, `text-white`, etc.)

A `grep` for `bg-white`, `text-white`, `bg-black`, `text-black`, and related classes shows many usages; representative examples:

- **Startup landing variation (intentional black theme)**:

  ```tsx path=/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/app/variations/startup/page.tsx start=17
  <div className="min-h-screen bg-black text-white">
    ...
    <nav className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
    ...
    <Button
      size="sm"
      className="bg-gradient-to-r from-pink-500 to-purple-600 ... text-white ..."
    >
  ```

- **Lightbox UI controls**:

  ```tsx path=/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/ui/lightbox.tsx start=156
  <div
    className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm",
      ...
    )}
  >
  ...
  <Button
    variant="ghost"
    size="icon"
    className="absolute right-4 top-4 ... border-2 border-white bg-white text-black hover:bg-white/90"
  >
  ...
  <p className="text-sm text-white">{currentItem.caption}</p>
  ```

- **Tech stack logo lockup** (white text on foreground block):

  ```tsx path=/Users/jasonpoindexter/Documents/GitHub/Fabrk_plate/src/components/home/tech-stack-section.tsx start=234
  <div className="flex flex-col items-center gap-2 ...">
    <div className="flex size-12 items-center justify-center rounded-lg bg-foreground">
      <span className="font-mono text-xl font-bold text-white">$</span>
    </div>
  </div>
  ```

These classes bypass the theme tokens (e.g. `bg-primary`, `text-primary-foreground`, `bg-background`) and make it harder to adjust the visual system globally (especially for adding new themes).

### 2.5 Inline styles and fonts

- Inline styles are used sparingly and often for **dynamic or SVG-specific** concerns:
  - `TechStackSection`: `style={{ maskType: "alpha" }}` with an explicit ESLint override comment.
  - `ColorPicker`: inline `style={{ backgroundColor: localColor }}` for user-chosen colors and preview boxes.
  - `Lightbox`: inline `style` for dynamic `transform: scale(...)` and cursor behavior.
- There is **no evidence of arbitrary `font-family` usage** outside the design system; fonts are controlled via `globals.css` and Tailwind font utilities.

Overall, fonts are consistent; the primary issues are color-related.

## 3. Proposed Changes (Plan Only)

> Note: This is a planning document. Do **not** implement any changes until explicitly approved.

### 3.1 Fix and harden hex enforcement tooling

1. **Make `scan-stray-hex.mjs` resilient to missing git-tracked files**:
   - Wrap `readFileSync` in a try/catch and skip files that no longer exist on disk, logging them once for cleanup.
   - Alternatively, use `git ls-files --eol` / `git status` to ensure only existing files are scanned.
2. **Decide and document the allowed hex zones**:
   - Keep `src/emails/**` and `public/**` as special cases (email HTML, SVG assets).
   - Explicitly decide whether Storybook demo assets under `src/stories/**` should be:
     - a) fully design-system aligned and thus subject to hex bans, or
     - b) treated as design documentation and added to `allowPatterns`.
3. **Add CI enforcement**:
   - Ensure `npm run scan:hex` runs in CI and fails the pipeline on any new violations once the script is stable.

### 3.2 Normalize color usage in application UI

1. **Introduce/extend semantic tokens for black/white and special cases**:
   - If the design system genuinely needs "pure black" and "pure white" (e.g., `bg-black`, `text-white`), add semantic tokens such as `background-hero`, `foreground-hero`, or `border-strong` in `globals.css` and map them through Tailwind.
   - Avoid using raw `bg-black`, `text-white`, `border-white`, or hard-coded `/10` alpha variants in components.
2. **Refactor key components to use tokens/utilities**:
   - `src/app/variations/startup/page.tsx`:
     - Replace `bg-black`/`text-white` and `border-white/XX` with semantic classes derived from tokens (e.g. new `bg-hero`, `text-hero-foreground`, `border-hero`), or reuse existing tokens (`bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`) where they match intent.
     - For gradients using Tailwind palette (`from-pink-500`, `to-blue-500`), consider introducing a small set of **accent gradient utilities** defined via CSS variables or Tailwind plugin, instead of referencing raw color names.
   - `src/components/ui/lightbox.tsx`:
     - Replace `bg-black/95`, `border-white`, `bg-white`, `text-black`, `text-white` with semantic combinations (e.g. `bg-overlay`, `text-overlay-foreground`, `border-overlay`) backed by tokens.
   - `src/components/home/tech-stack-section.tsx` (text portions):
     - Replace `text-white` inside the `shadcn/ui` badge with a tokenized foreground class.
3. **Update tests and stories that assert on these classes**:
   - Files under `src/components/ui/__tests__/` and `src/components/**.stories.tsx` that expect `text-white`/`bg-black` will need to be updated to assert the new token-based classes.

### 3.3 Centralize brand and preset colors

1. **Tech stack icon colors** (`TechStackSection`):
   - Extract the hex colors for React, TypeScript, Tailwind, Vitest, Playwright, etc. into a central token map, e.g. `src/lib/design/brand-colors.ts` or a section in `src/config.js`.
   - Replace inline `fill="#61DAFB"`, `fill="#3178C6"`, etc. with `fill={brandColors.react}` to keep brand colors in one place.
2. **Color picker presets** (`ColorPicker`):
   - Move `defaultPresets` into a shared design token module (e.g. `src/lib/design/color-presets.ts`) that documents why each hex is allowed.
   - Consider mapping presets to semantic names (`"success"`, `"warning"`, etc.) where applicable.
3. **Email template HTML previews**:
   - Decide if email HTML should have its own minimal design token system (e.g. constants for background, text, primary button, error banner) to avoid scattered hex values in inline style strings.
   - If yes, factor hex values in `email-templates/page.tsx` and `src/emails/**` into a small config object imported by all email generators.

### 3.4 Strengthen linting for design system rules

1. **Leverage existing `design-system/no-inline-styles` rule**:
   - Review the ESLint configuration to see how `design-system/no-inline-styles` is applied and where exceptions are needed (e.g. SVG `maskType`, dynamic transforms).
   - Add explicit comments or rule options for legitimate exceptions (SVG, dynamic user colors, animations), while keeping the rule strict elsewhere.
2. **Add a lint rule for disallowed Tailwind color utilities**:
   - Implement or configure a custom ESLint rule (or Tailwind-specific lint) that flags usage of raw palette classes like `bg-black`, `text-white`, `from-pink-500`, etc. outside of an explicit allowlist.
   - Ensure the rule runs on `src/**` and is part of `npm run lint`.

### 3.5 Documentation updates

1. **Update design documentation** in `docs/design/cursor-design-system.md` or a new `docs/design/system-implementation.md` section to reflect:
   - The allowed hex zones.
   - The semantic color tokens and how to use them.
   - Guidelines for email and marketing variations (e.g., when a bold black background like `StartupVariation` is acceptable and how to implement it via tokens).
2. **Add a short "Design System Rules" section** to `WARP.md` (or cross-link it) summarizing:
   - "No raw hex in `src/**` except in allowed zones."
   - "No raw `bg-black`/`text-white` etc.; use semantic tokens."
   - "Inline styles only for dynamic behavior or SVG technical needs, not static design values."

---

This plan should be revisited as we discover additional hardcoded styles or refine the design system. Each phase can be implemented and reviewed independently, starting with tooling fixes (3.1) and then moving through UI refactors (3.2–3.3) and linting/documentation (3.4–3.5).