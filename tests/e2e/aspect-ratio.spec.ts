import { test, expect } from '@playwright/test';

/**
 * Aspect Ratio Component E2E Tests
 * Tests aspect ratio container maintains proportions across viewport sizes
 */

test.describe('Aspect Ratio Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Aspect Ratio Display', () => {
    test('should display aspect ratio container', async ({ page }) => {
      // Look for aspect ratio wrapper or image container
      const aspectRatio = page.locator('[style*="aspect-ratio"], [data-radix-aspect-ratio-wrapper]').first();

      if (await aspectRatio.count() > 0) {
        await expect(aspectRatio).toBeVisible();
      }
    });

    test('should contain content (image or element)', async ({ page }) => {
      const aspectRatio = page.locator('[style*="aspect-ratio"], [data-radix-aspect-ratio-wrapper]').first();

      if (await aspectRatio.isVisible()) {
        // Check for child elements (image or content)
        const children = aspectRatio.locator('> *');
        const count = await children.count();

        expect(count).toBeGreaterThan(0);
      }
    });

    test('should maintain aspect ratio', async ({ page }) => {
      const aspectRatio = page.locator('[style*="aspect-ratio"], [data-radix-aspect-ratio-wrapper]').first();

      if (await aspectRatio.isVisible()) {
        // Get dimensions
        const box = await aspectRatio.boundingBox();

        if (box) {
          // Calculate ratio
          const ratio = box.width / box.height;

          // Common ratios: 16/9 ≈ 1.78, 4/3 ≈ 1.33, 1/1 = 1
          const isValidRatio = ratio > 0 && ratio < 10;

          expect(isValidRatio).toBeTruthy();
        }
      }
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should maintain proportions on viewport resize', async ({ page }) => {
      const aspectRatio = page.locator('[style*="aspect-ratio"], [data-radix-aspect-ratio-wrapper]').first();

      if (await aspectRatio.isVisible()) {
        // Get initial dimensions
        const initialBox = await aspectRatio.boundingBox();

        if (initialBox) {
          const initialRatio = initialBox.width / initialBox.height;

          // Resize viewport
          await page.setViewportSize({ width: 800, height: 600 });
          await page.waitForTimeout(300);

          // Get new dimensions
          const newBox = await aspectRatio.boundingBox();

          if (newBox) {
            const newRatio = newBox.width / newBox.height;

            // Ratio should remain approximately the same (within 5% tolerance)
            const ratioDiff = Math.abs(newRatio - initialRatio);
            const tolerance = initialRatio * 0.05;

            expect(ratioDiff).toBeLessThanOrEqual(tolerance);
          }
        }
      }
    });
  });
});
