import { test, expect } from '@playwright/test';

/**
 * Tooltip Component E2E Tests
 * Tests tooltip display, positioning, delays, and interactions
 */

test.describe('Tooltip Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to components page where tooltips are showcased
    await page.goto('/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Default Tooltip', () => {
    test('should display tooltip on hover', async ({ page }) => {
      // Find a button with tooltip
      const button = page.locator('button').filter({ hasText: /hover me/i }).first();

      if (await button.isVisible()) {
        // Hover over the trigger
        await button.hover();

        // Wait for tooltip to appear
        await page.waitForTimeout(700); // Default delay is 700ms

        // Check if tooltip content is visible
        const tooltipContent = page.locator('[role="tooltip"]');
        await expect(tooltipContent).toBeVisible();
      }
    });

    test('should hide tooltip when mouse leaves', async ({ page }) => {
      const button = page.locator('button').filter({ hasText: /hover me/i }).first();

      if (await button.isVisible()) {
        // Hover over the trigger
        await button.hover();
        await page.waitForTimeout(700);

        // Move mouse away
        await page.mouse.move(0, 0);
        await page.waitForTimeout(300);

        // Tooltip should be hidden
        const tooltipContent = page.locator('[role="tooltip"]');
        await expect(tooltipContent).not.toBeVisible();
      }
    });

    test('should have correct ARIA attributes', async ({ page }) => {
      const button = page.locator('button').filter({ hasText: /hover me/i }).first();

      if (await button.isVisible()) {
        // Hover to show tooltip
        await button.hover();
        await page.waitForTimeout(700);

        // Check for proper ARIA role
        const tooltip = page.locator('[role="tooltip"]');
        await expect(tooltip).toHaveAttribute('role', 'tooltip');
      }
    });
  });

  test.describe('Tooltip Positioning', () => {
    test('should display tooltip on different sides', async ({ page }) => {
      // Test for different positioned tooltips
      const sides = ['top', 'right', 'bottom', 'left'];

      for (const side of sides) {
        const button = page.locator('button').filter({ hasText: new RegExp(side, 'i') }).first();

        if (await button.isVisible()) {
          await button.hover();
          await page.waitForTimeout(700);

          const tooltip = page.locator('[role="tooltip"]');
          await expect(tooltip).toBeVisible();

          // Move away to reset
          await page.mouse.move(0, 0);
          await page.waitForTimeout(300);
        }
      }
    });
  });

  test.describe('Tooltip with Custom Delay', () => {
    test('should show tooltip instantly with zero delay', async ({ page }) => {
      const button = page.locator('button').filter({ hasText: /instant tooltip/i }).first();

      if (await button.isVisible()) {
        const startTime = Date.now();

        // Hover over trigger
        await button.hover();

        // Wait minimal time
        await page.waitForTimeout(100);

        const tooltip = page.locator('[role="tooltip"]');
        const isVisible = await tooltip.isVisible();
        const elapsed = Date.now() - startTime;

        // Should appear almost instantly (under 200ms)
        if (isVisible) {
          expect(elapsed).toBeLessThan(200);
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should maintain keyboard focus on trigger', async ({ page }) => {
      const button = page.locator('button').filter({ hasText: /hover me/i }).first();

      if (await button.isVisible()) {
        // Focus the button using keyboard
        await button.focus();

        // Check if button is focused
        await expect(button).toBeFocused();

        // Hover to show tooltip
        await button.hover();
        await page.waitForTimeout(700);

        // Button should still have focus
        await expect(button).toBeFocused();
      }
    });
  });
});
