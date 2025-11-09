# Token & Theme Migration (JAR-01)

- Added canonical design tokens in `src/lib/design-system/tokens.ts` (palette, spacing, typography, radii, shadows) with Zod schema validation.
- Tailwind now sources theme values from the token map (`tailwind.config.ts`).
- Global CSS variables (`src/app/globals.css`) mirror the light/dark token sets; non-token CSS variables were removed.
- Error/empty states and legal pages now consume semantic Tailwind utilities (no raw hex colors).
- Hex enforcement added via `scripts/scan-stray-hex.ts` and ESLint rules (`eslint-rules/*`).

## 2024-03-08 — Token Convergence Hardening

- Expanded `src/lib/design-system/tokens.ts` to include full semantic + interactive palettes (primary/secondary/muted/success/etc.) so Tailwind + CSS vars stay in sync.
- Regenerated light/dark CSS variable map in `src/app/globals.css` to reference the updated palette (spaces instead of comma-delimited hsl).
- Converted dashboard/landing/table surfaces (analytics/admin/user-profile/comparison/pricing, hero components, data table primitives) to Tailwind semantic utilities—no lingering `#007AFF`/`#666666` literals.
- Rewrote `scripts/scan-stray-hex` as a Node ESM script (no tsx IPC) and tightened the detector regex, ensuring CI blocks stray hex outside whitelisted assets.
