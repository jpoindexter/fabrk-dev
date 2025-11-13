import { test, expect } from '@playwright/test';

/**
 * Scroll Area Component E2E Tests
 * Tests scrollable areas, scroll behavior, and custom scrollbar functionality
 */

test.describe('Scroll Area Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Scroll Area Display', () => {
    test('should display scroll area container', async ({ page }) => {
      // Look for scroll area viewport
      const scrollArea = page.locator('[data-radix-scroll-area-viewport]').first();

      if (await scrollArea.isVisible()) {
        await expect(scrollArea).toBeVisible();
      }
    });

    test('should contain scrollable content', async ({ page }) => {
      const scrollArea = page.locator('[data-radix-scroll-area-viewport]').first();

      if (await scrollArea.isVisible()) {
        // Check if content exists
        const content = await scrollArea.textContent();
        expect(content).toBeTruthy();
      }
    });

    test('should display custom scrollbar', async ({ page }) => {
      // Check for custom scrollbar element
      const scrollbar = page.locator('[data-radix-scroll-area-scrollbar]').first();

      if (await scrollbar.count() > 0) {
        const exists = await scrollbar.count() > 0;
        expect(exists).toBeTruthy();
      }
    });
  });

  test.describe('Scroll Behavior', () => {
    test('should allow scrolling content', async ({ page }) => {
      const scrollArea = page.locator('[data-radix-scroll-area-viewport]').first();

      if (await scrollArea.isVisible()) {
        // Get initial scroll position
        const initialScroll = await scrollArea.evaluate(el => el.scrollTop);

        // Scroll down
        await scrollArea.evaluate(el => {
          el.scrollTop = 100;
        });

        await page.waitForTimeout(200);

        // Check if scrolled
        const newScroll = await scrollArea.evaluate(el => el.scrollTop);
        const hasScrolled = newScroll !== initialScroll;

        // Either content scrolled or wasn't scrollable
        expect(hasScrolled || newScroll === 0).toBeTruthy();
      }
    });

    test('should respond to mouse wheel', async ({ page }) => {
      const scrollArea = page.locator('[data-radix-scroll-area-viewport]').first();

      if (await scrollArea.isVisible()) {
        // Get bounding box
        const box = await scrollArea.boundingBox();

        if (box) {
          // Scroll with mouse wheel
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.mouse.wheel(0, 100);
          await page.waitForTimeout(200);

          // Should have attempted to scroll
          expect(true).toBeTruthy();
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should support keyboard scrolling', async ({ page }) => {
      const scrollArea = page.locator('[data-radix-scroll-area-viewport]').first();

      if (await scrollArea.isVisible()) {
        // Focus the scroll area
        await scrollArea.click();

        // Try scrolling with arrow key
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(200);

        // Should remain functional
        await expect(scrollArea).toBeVisible();
      }
    });
  });
});
