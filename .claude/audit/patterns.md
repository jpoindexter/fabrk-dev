# Audit Patterns

Regex patterns for finding design system violations.

## Styling Violations

```bash
# Rounded corners (banned except traffic dots)
rounded-(?:sm|lg|xl|2xl|3xl|\[)

# Hardcoded colors
#[0-9a-fA-F]{3,8}
rgb\(|rgba\(|hsl\(|hsla\(
(bg|text|border)-(red|blue|green|yellow|purple|pink|orange|gray|slate|zinc)-\d+

# Banned shadows
shadow-(?:md|lg|xl|2xl)

# Inline styles
style=\{
```

## Component Violations

```bash
# Missing terminal styling on components
<Button(?![^>]*rounded-none)
<Input(?![^>]*rounded-none)
<Card(?![^>]*rounded-none)

# Native elements (should use UI components)
<button(?!\s+type=)
<input(?!\s+type=\"hidden)
<select\s+
```

## Code Quality

```bash
# Console statements (use logger)
console\.(log|warn|error|info|debug)

# TODO comments
//\s*(TODO|FIXME|HACK|XXX)

# TypeScript escape hatches
@ts-ignore|@ts-expect-error

# Direct env access (use env.ts)
process\.env\.(?!NODE_ENV)
```

## Usage

Run these with grep:
```bash
grep -rE "rounded-(?:sm|lg|xl|2xl|3xl)" src/app src/components --include="*.tsx"
grep -rE "#[0-9a-fA-F]{3,8}" src/ --include="*.tsx"
```

Or use the built-in scan:
```bash
npm run scan:hex
```
