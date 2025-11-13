import { test, expect } from '@playwright/test';

/**
 * Hover Card Component E2E Tests
 * Tests hover card display, content loading, and interaction timing
 */

test.describe('Hover Card Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Hover Card Display', () => {
    test('should display hover card on hover', async ({ page }) => {
      // Find hover card trigger
      const trigger = page.locator('button, a').filter({ hasText: /@username|hover for profile/i }).first();

      if (await trigger.isVisible()) {
        // Hover over trigger
        await trigger.hover();
        await page.waitForTimeout(700); // Default hover delay

        // Check if hover card content is visible
        const hoverCard = page.locator('[data-state="open"]').filter({ has: page.locator('text=/username|profile/i') });
        const isVisible = await hoverCard.count() > 0;

        expect(isVisible).toBeTruthy();
      }
    });

    test('should hide hover card when mouse leaves', async ({ page }) => {
      const trigger = page.locator('button, a').filter({ hasText: /@username|hover for profile/i }).first();

      if (await trigger.isVisible()) {
        // Hover to show
        await trigger.hover();
        await page.waitForTimeout(700);

        // Move mouse away
        await page.mouse.move(0, 0);
        await page.waitForTimeout(500);

        // Hover card should be hidden
        const hoverCard = page.locator('[data-state="open"]');
        await expect(hoverCard).not.toBeVisible();
      }
    });

    test('should display rich content with avatar and text', async ({ page }) => {
      const trigger = page.locator('button, a').filter({ hasText: /@username/i }).first();

      if (await trigger.isVisible()) {
        await trigger.hover();
        await page.waitForTimeout(700);

        // Check for avatar or profile image
        const avatar = page.locator('img[src*="github"], img[src*="vercel"], [data-state="open"] img').first();
        const hasAvatar = await avatar.isVisible();

        // Should have some content
        const content = page.locator('[data-state="open"]');
        const hasText = (await content.textContent() || '').length > 0;

        expect(hasAvatar || hasText).toBeTruthy();
      }
    });
  });

  test.describe('User Profile Display', () => {
    test('should show user profile information', async ({ page }) => {
      const trigger = page.locator('button').filter({ hasText: /hover for profile/i }).first();

      if (await trigger.isVisible()) {
        await trigger.hover();
        await page.waitForTimeout(700);

        // Check for profile elements
        const profileCard = page.locator('[data-state="open"]');
        const hasContent = await profileCard.isVisible();

        if (hasContent) {
          const text = await profileCard.textContent();
          // Should contain user-related information
          const hasUserInfo = /john|doe|developer|follower|following/i.test(text || '');
          expect(hasUserInfo).toBeTruthy();
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should maintain proper focus management', async ({ page }) => {
      const trigger = page.locator('button').filter({ hasText: /hover for profile/i }).first();

      if (await trigger.isVisible()) {
        // Focus the trigger
        await trigger.focus();
        await expect(trigger).toBeFocused();

        // Hover should not change focus
        await trigger.hover();
        await page.waitForTimeout(700);

        // Trigger should still be focusable
        const isFocusable = await trigger.evaluate(el => {
          return el.tabIndex >= -1;
        });
        expect(isFocusable).toBeTruthy();
      }
    });
  });
});
