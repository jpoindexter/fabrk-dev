/**
 * Automated Theme Accessibility Testing
 * Tests all 20 DaisyUI themes for WCAG 2.1 AA compliance
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// All 20 DaisyUI themes
const THEMES = [
  // Light themes
  'light', 'cupcake', 'bumblebee', 'emerald', 'corporate',
  'retro', 'pastel', 'fantasy', 'autumn', 'business',
  // Dark themes
  'dark', 'synthwave', 'cyberpunk', 'valentine', 'halloween',
  'forest', 'aqua', 'lofi', 'luxury', 'dracula'
];

test.describe('Documentation Template - Theme Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to documentation template
    await page.goto('http://localhost:3000/templates/documentation');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  for (const theme of THEMES) {
    test(`should meet WCAG AA standards in ${theme} theme`, async ({ page }) => {
      console.log(`\n🎨 Testing theme: ${theme}`);

      // Set theme via localStorage (simulating theme switcher)
      await page.evaluate((themeName) => {
        localStorage.setItem('theme', themeName);
        document.documentElement.setAttribute('data-theme', themeName);
      }, theme);

      // Wait for theme to apply
      await page.waitForTimeout(500);

      // Take screenshot for visual verification
      await page.screenshot({
        path: `tests/theme-screenshots/${theme}.png`,
        fullPage: true
      });

      // Run axe accessibility audit
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Log violations
      if (accessibilityScanResults.violations.length > 0) {
        console.log(`\n❌ ${theme} theme has ${accessibilityScanResults.violations.length} violation(s):`);

        accessibilityScanResults.violations.forEach((violation, idx) => {
          console.log(`\n  ${idx + 1}. ${violation.id}: ${violation.description}`);
          console.log(`     Impact: ${violation.impact}`);
          console.log(`     Help: ${violation.helpUrl}`);
          console.log(`     Affected elements: ${violation.nodes.length}`);

          violation.nodes.forEach((node, nodeIdx) => {
            console.log(`     - Element ${nodeIdx + 1}: ${node.html.substring(0, 100)}...`);
            if (node.any.length > 0) {
              console.log(`       Issue: ${node.any[0].message}`);
            }
          });
        });
      } else {
        console.log(`✅ ${theme} theme passed all accessibility checks!`);
      }

      // Assert no violations (this will fail the test if violations are found)
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});

test.describe('Documentation Template - Contrast Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/templates/documentation');
    await page.waitForLoadState('networkidle');
  });

  for (const theme of THEMES) {
    test(`should have sufficient text contrast in ${theme} theme`, async ({ page }) => {
      // Set theme
      await page.evaluate((themeName) => {
        localStorage.setItem('theme', themeName);
        document.documentElement.setAttribute('data-theme', themeName);
      }, theme);

      await page.waitForTimeout(500);

      // Run axe audit with specific focus on color contrast
      const contrastResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .include('main') // Focus on main content area
        .analyze();

      // Filter for contrast violations only
      const contrastViolations = contrastResults.violations.filter(
        v => v.id === 'color-contrast' || v.id === 'color-contrast-enhanced'
      );

      if (contrastViolations.length > 0) {
        console.log(`\n⚠️  ${theme} theme has contrast issues:`);
        contrastViolations.forEach(violation => {
          violation.nodes.forEach(node => {
            console.log(`  - ${node.html.substring(0, 80)}...`);
            if (node.any.length > 0) {
              console.log(`    ${node.any[0].message}`);
            }
          });
        });
      }

      // Assert no contrast violations
      expect(contrastViolations).toEqual([]);
    });
  }
});

test.describe('Documentation Template - Keyboard Navigation', () => {
  test('should have visible focus indicators across all themes', async ({ page }) => {
    await page.goto('http://localhost:3000/templates/documentation');
    await page.waitForLoadState('networkidle');

    // Test a sample of themes (every 4th theme)
    const sampleThemes = THEMES.filter((_, idx) => idx % 4 === 0);

    for (const theme of sampleThemes) {
      await page.evaluate((themeName) => {
        localStorage.setItem('theme', themeName);
        document.documentElement.setAttribute('data-theme', themeName);
      }, theme);

      await page.waitForTimeout(300);

      // Tab through interactive elements
      await page.keyboard.press('Tab'); // First focusable element
      await page.keyboard.press('Tab'); // Next element
      await page.keyboard.press('Tab'); // Next element

      // Check that focused element has visible focus ring
      const focusedElement = await page.evaluateHandle(() => document.activeElement);
      const hasFocusRing = await focusedElement.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        // Check for outline, box-shadow, or border that indicates focus
        return styles.outline !== 'none' ||
               styles.boxShadow !== 'none' ||
               styles.borderColor !== 'transparent';
      });

      expect(hasFocusRing).toBeTruthy();
    }
  });
});
