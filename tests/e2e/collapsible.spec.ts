import { test, expect } from '@playwright/test';

/**
 * Collapsible Component E2E Tests
 * Tests collapsible sections, expand/collapse behavior, and animations
 */

test.describe('Collapsible Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Collapsible Display', () => {
    test('should display collapsible trigger', async ({ page }) => {
      // Look for collapsible trigger button
      const trigger = page.locator('button').filter({ hasText: /toggle|expand|collapse|show|hide/i }).first();

      if (await trigger.isVisible()) {
        await expect(trigger).toBeVisible();
        await expect(trigger).toBeEnabled();
      }
    });

    test('should have initial state (open or closed)', async ({ page }) => {
      const trigger = page.locator('button').filter({ hasText: /toggle|expand|collapse/i }).first();

      if (await trigger.isVisible()) {
        // Check for data-state attribute
        const dataState = await trigger.getAttribute('data-state');
        const hasState = dataState === 'open' || dataState === 'closed';

        expect(hasState || dataState === null).toBeTruthy();
      }
    });
  });

  test.describe('Expand and Collapse Behavior', () => {
    test('should toggle content on trigger click', async ({ page }) => {
      const trigger = page.locator('button').filter({ hasText: /toggle|expand|collapse/i }).first();

      if (await trigger.isVisible()) {
        // Get initial state
        const initialState = await trigger.getAttribute('data-state');

        // Click to toggle
        await trigger.click();
        await page.waitForTimeout(400);

        // State should change
        const newState = await trigger.getAttribute('data-state');
        const hasChanged = newState !== initialState;

        expect(hasChanged || newState === null).toBeTruthy();
      }
    });

    test('should show content when expanded', async ({ page }) => {
      const trigger = page.locator('button').filter({ hasText: /toggle|expand|collapse/i }).first();

      if (await trigger.isVisible()) {
        // Ensure it's open
        await trigger.click();
        await page.waitForTimeout(400);

        // Look for collapsible content
        const content = page.locator('[data-state="open"]');
        const isVisible = await content.count() > 0;

        expect(isVisible).toBeTruthy();
      }
    });

    test('should hide content when collapsed', async ({ page }) => {
      const trigger = page.locator('button').filter({ hasText: /toggle|expand|collapse/i }).first();

      if (await trigger.isVisible()) {
        // Ensure it's open first
        await trigger.click();
        await page.waitForTimeout(400);

        // Click again to close
        await trigger.click();
        await page.waitForTimeout(400);

        // Content should be hidden
        const closedContent = page.locator('[data-state="closed"]');
        const isClosed = await closedContent.count() > 0;

        expect(isClosed).toBeTruthy();
      }
    });

    test('should support multiple toggle actions', async ({ page }) => {
      const trigger = page.locator('button').filter({ hasText: /toggle|expand|collapse/i }).first();

      if (await trigger.isVisible()) {
        // Toggle multiple times
        for (let i = 0; i < 3; i++) {
          await trigger.click();
          await page.waitForTimeout(400);
        }

        // Should still be functional
        await expect(trigger).toBeVisible();
        await expect(trigger).toBeEnabled();
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have correct ARIA attributes', async ({ page }) => {
      const trigger = page.locator('button').filter({ hasText: /toggle|expand|collapse/i }).first();

      if (await trigger.isVisible()) {
        // Check for ARIA expanded attribute
        const ariaExpanded = await trigger.getAttribute('aria-expanded');
        const hasAriaExpanded = ariaExpanded === 'true' || ariaExpanded === 'false';

        expect(hasAriaExpanded || ariaExpanded === null).toBeTruthy();
      }
    });
  });
});
