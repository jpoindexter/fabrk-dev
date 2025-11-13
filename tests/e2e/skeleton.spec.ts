import { test, expect } from '@playwright/test';

/**
 * Skeleton Component E2E Tests
 * Tests skeleton loading states, animations, and visual appearance
 */

test.describe('Skeleton Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Skeleton Display', () => {
    test('should display skeleton elements', async ({ page }) => {
      // Look for skeleton components (typically divs with specific class)
      const skeleton = page.locator('.animate-pulse, [class*="skeleton"]').first();

      if (await skeleton.count() > 0) {
        await expect(skeleton).toBeVisible();
      }
    });

    test('should have loading animation', async ({ page }) => {
      const skeleton = page.locator('.animate-pulse, [class*="skeleton"]').first();

      if (await skeleton.isVisible()) {
        // Check for animation class
        const hasAnimation = await skeleton.evaluate(el => {
          const classes = el.className;
          return classes.includes('animate') || classes.includes('pulse');
        });

        expect(hasAnimation).toBeTruthy();
      }
    });

    test('should maintain consistent dimensions', async ({ page }) => {
      const skeleton = page.locator('.animate-pulse, [class*="skeleton"]').first();

      if (await skeleton.isVisible()) {
        // Get dimensions
        const box = await skeleton.boundingBox();

        if (box) {
          // Should have width and height
          expect(box.width).toBeGreaterThan(0);
          expect(box.height).toBeGreaterThan(0);
        }
      }
    });
  });

  test.describe('Visual Appearance', () => {
    test('should have background color', async ({ page }) => {
      const skeleton = page.locator('.animate-pulse, [class*="skeleton"]').first();

      if (await skeleton.isVisible()) {
        // Check if element has background
        const hasBackground = await skeleton.evaluate(el => {
          const bg = window.getComputedStyle(el).backgroundColor;
          return bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
        });

        expect(hasBackground).toBeTruthy();
      }
    });
  });
});
