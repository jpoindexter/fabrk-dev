---
title: 'Code Quality: Pre-Commit Hooks and Automated Linting'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'code-quality-pre-commit-hooks'
description: 'Fabrk enforces code quality automatically with Husky pre-commit hooks, ESLint, Prettier, and TypeScript checks.'
publishedAt: '2026-01-22T10:00:00.000Z'
---

**Quality gates that run automatically.**

---

## The Quality Problem

Code quality degrades without enforcement:

- Inconsistent formatting
- Linting errors pile up
- Type errors slip through
- Code reviews catch preventable issues

Fabrk prevents this with automated checks.

---

## Pre-Commit Stack

Every commit runs:

1. **TypeScript** - Type checking
2. **ESLint** - Code linting with auto-fix
3. **Prettier** - Code formatting

If any check fails, the commit is blocked.

---

## How It Works

Fabrk uses **Husky** for git hooks and **lint-staged** for efficient checking:

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

Only staged files are checked, keeping commits fast.

---

## TypeScript Checking

Every commit verifies types:

```bash
# Runs automatically on commit
npm run type-check
```

Catches:
- Missing types
- Type mismatches
- Import errors
- Unused variables

---

## ESLint Configuration

Fabrk uses ESLint flat config:

```javascript
// eslint.config.mjs
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  ...tseslint.configs.recommended,
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      // Enforce hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript specific
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
```

---

## Prettier Configuration

Consistent formatting:

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

No more debates about formatting.

---

## Running Checks Manually

```bash
# Run all linting
npm run lint

# Run formatting
npm run format

# Run TypeScript check
npm run type-check

# Run all checks (like pre-commit)
npm run validate
```

---

## Bypassing Hooks

For emergencies only:

```bash
git commit --no-verify -m "Emergency fix"
```

Use sparingly. Skipped checks mean skipped quality.

---

## CI Integration

The same checks run in CI:

```yaml
# .github/workflows/ci.yml
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run build
```

Pull requests are blocked if checks fail.

---

## VS Code Integration

Fabrk includes VS Code settings:

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

Files are formatted and linted on save.

---

## Custom Rules

Add project-specific rules:

```javascript
// eslint.config.mjs
{
  rules: {
    // Enforce import order
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal'],
    }],

    // Ban console.log in production code
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    // Enforce design system usage
    'no-restricted-syntax': [{
      selector: 'Literal[value=/bg-white|text-gray/]',
      message: 'Use design tokens instead of hardcoded colors',
    }],
  },
}
```

---

## Design System Linting

Fabrk includes design system validation:

```bash
npm run design:lint
```

Catches:
- Hardcoded colors
- Missing mode.radius
- Non-token spacing values
- Incorrect imports

---

## The Commit Flow

1. Developer stages changes: `git add .`
2. Developer commits: `git commit -m "Add feature"`
3. **Husky** triggers pre-commit hook
4. **lint-staged** runs on staged files:
   - ESLint checks and fixes
   - Prettier formats
5. **TypeScript** checks entire project
6. If all pass → commit succeeds
7. If any fail → commit blocked with errors

---

## Error Recovery

When a commit fails:

```bash
# See what failed
npm run lint

# Auto-fix what can be fixed
npm run lint -- --fix

# Check types
npm run type-check

# Fix issues manually if needed
# Then commit again
git commit -m "Add feature"
```

---

## Performance

lint-staged only checks staged files:

```
✔ Preparing lint-staged...
✔ Running tasks for staged files...
  ✔ src/app/page.tsx — 1 file
    ✔ eslint --fix
    ✔ prettier --write
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...
```

Large codebases stay fast because only changed files are checked.

---

## Best Practices

1. **Never skip hooks** - Fix the issue, don't bypass
2. **Run checks locally** - Before pushing
3. **Keep rules consistent** - Same in dev and CI
4. **Auto-fix when possible** - ESLint and Prettier handle it
5. **Document exceptions** - If you disable a rule, explain why

---

## Getting Started

Hooks are set up automatically when you run `npm install`.

If hooks aren't running:

```bash
npx husky install
```

Quality enforcement, built in.

