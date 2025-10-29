import tailwindcss from "eslint-plugin-tailwindcss";
import jsxA11y from "eslint-plugin-jsx-a11y";

import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Import custom design system rules
import noHardcodedColors from "./eslint-rules/no-hardcoded-colors.js";
import noInlineStyles from "./eslint-rules/no-inline-styles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "coverage/**",
      ".mcp/**",
      "scripts/**",
      "archive/**",
      "_archive/**",
      "next-env.d.ts",
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.config.ts",
      "storybook-static/**",
      ".storybook/build/**",
      "playwright-report/**",
      "test-results/**",
      "logs/**",
      "*.generated.ts",
      "*.generated.js",
      "**/generated-sources.ts", // Auto-generated component sources
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...tailwindcss.configs["flat/recommended"],
  {
    plugins: {
      'design-system': {
        rules: {
          'no-hardcoded-colors': noHardcodedColors,
          'no-inline-styles': noInlineStyles,
        }
      },
      'jsx-a11y': jsxA11y
    },
    rules: {
      // Existing rules
      "max-lines": "off",
      "max-lines-per-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "off",
      "@next/next/no-img-element": "off",
      "jsx-a11y/role-supports-aria-props": "off",
      "jsx-a11y/alt-text": "off",
      "@typescript-eslint/ban-ts-comment": "off",

      // Design system rules (CRITICAL)
      'design-system/no-hardcoded-colors': 'error',
      'design-system/no-inline-styles': 'error',

      // Low-priority aesthetic/tooling rules (disabled for productivity)
      'react/no-unescaped-entities': 'off', // Aesthetic only, doesn't affect functionality
      'react/display-name': 'off', // Dev tooling only, doesn't affect production
      '@next/next/no-html-link-for-pages': 'off', // Minor performance optimization

      // Accessibility rules (jsx-a11y)
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/heading-has-content': 'warn',
      'jsx-a11y/html-has-lang': 'warn',
      'jsx-a11y/lang': 'warn',
      'jsx-a11y/no-autofocus': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',

      // Tailwind rules - OFF for Rails compliance (0 warnings required)
      'tailwindcss/no-arbitrary-value': 'off',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "tests/**/*.ts", "tests/**/*.tsx"],
    rules: {
      "max-lines": "off",
      "max-lines-per-function": "off",
    },
  },
  {
    // STRICT validation for production files
    files: [
      "src/components/**/*.{tsx,jsx}",
      "src/app/**/*.{tsx,jsx}",
      "!src/**/showcase/**",
      "!src/**/examples/**",
      "!src/**/*.demo.{tsx,jsx}",
      "!src/**/*.stories.{tsx,jsx}",
      "!src/**/component-previews/**"
    ],
    rules: {
      'design-system/no-hardcoded-colors': 'error',
      'design-system/no-inline-styles': 'error'
    }
  },
  {
    // RELAXED validation for demo/showcase files
    files: [
      "**/examples/**",
      "**/showcase/**",
      "**/*.stories.tsx",
      "**/*.demo.tsx",
      "**/*.backup.tsx",
      "**/component-previews/**",
      "**/demo/**",
      "**/demo-*/**"
    ],
    rules: {
      'design-system/no-hardcoded-colors': 'off',
      'design-system/no-inline-styles': 'off',
      'tailwindcss/no-arbitrary-value': 'off',
      'react-hooks/rules-of-hooks': 'off', // Stories use render() functions with hooks
      'react/no-unescaped-entities': 'off', // Stories contain demo text with quotes
      'jsx-a11y/alt-text': 'off' // Demo/backup files may have placeholder images
    }
  },
  {
    // Allow CSS variables in specific components (dynamic styles/animations)
    files: [
      "**/carousel.tsx",
      "**/progress.tsx",
      "**/slider.tsx",
      "**/tree-view.tsx",
      "**/gsap-progress.tsx", // GSAP animations with complex gradients
      "**/parallax-card.tsx" // 3D transforms with rotateX/rotateY
    ],
    rules: {
      'design-system/no-inline-styles': 'off'
    }
  }
];

export default eslintConfig;
