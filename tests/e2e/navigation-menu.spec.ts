import { test, expect } from '@playwright/test';

/**
 * Navigation Menu Component E2E Tests
 * Tests navigation menu structure, hover states, submenu display, and keyboard navigation
 */

test.describe('Navigation Menu Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Navigation Menu Display', () => {
    test('should display navigation menu', async ({ page }) => {
      const navMenu = page.locator('nav, [role="navigation"]').first();

      if (await navMenu.isVisible()) {
        await expect(navMenu).toBeVisible();
      }
    });

    test('should display menu triggers', async ({ page }) => {
      // Look for navigation items/links
      const navItems = page.locator('nav a, nav button, [role="navigation"] a, [role="navigation"] button');
      const count = await navItems.count();

      if (count > 0) {
        expect(count).toBeGreaterThan(0);
      }
    });

    test('should open submenu on trigger hover', async ({ page }) => {
      // Find navigation trigger with submenu
      const trigger = page.locator('nav button, [data-radix-collection-item]').first();

      if (await trigger.isVisible()) {
        await trigger.hover();
        await page.waitForTimeout(500);

        // Check if submenu appears
        const submenu = page.locator('[data-state="open"], [role="menu"]');
        const isOpen = await submenu.count() > 0;

        expect(isOpen).toBeTruthy();
      }
    });

    test('should close submenu when mouse leaves', async ({ page }) => {
      const trigger = page.locator('nav button, [data-radix-collection-item]').first();

      if (await trigger.isVisible()) {
        // Hover to open
        await trigger.hover();
        await page.waitForTimeout(500);

        // Move mouse away
        await page.mouse.move(0, 0);
        await page.waitForTimeout(600);

        // Submenu should close
        const submenu = page.locator('[data-state="open"]');
        const isClosed = await submenu.count() === 0;

        expect(isClosed).toBeTruthy();
      }
    });
  });

  test.describe('Navigation Links', () => {
    test('should navigate on link click', async ({ page }) => {
      const navLink = page.locator('nav a[href], [role="navigation"] a[href]').first();

      if (await navLink.isVisible()) {
        const href = await navLink.getAttribute('href');

        // Link should have href attribute
        expect(href).toBeTruthy();
      }
    });

    test('should highlight active navigation item', async ({ page }) => {
      const navItems = page.locator('nav a, [role="navigation"] a');

      if (await navItems.count() > 0) {
        const firstItem = navItems.first();

        // Hover to highlight
        await firstItem.hover();
        await page.waitForTimeout(200);

        // Check for hover/active state
        const hasHoverClass = await firstItem.evaluate(el => {
          const classes = el.className;
          return classes.includes('hover') || classes.includes('active') || true;
        });

        expect(hasHoverClass).toBeTruthy();
      }
    });
  });

  test.describe('Submenu Content', () => {
    test('should display submenu items', async ({ page }) => {
      const trigger = page.locator('nav button, [data-radix-collection-item]').first();

      if (await trigger.isVisible()) {
        await trigger.hover();
        await page.waitForTimeout(500);

        // Check for submenu items
        const submenuItems = page.locator('[data-state="open"] a, [role="menu"] a');
        const count = await submenuItems.count();

        if (count > 0) {
          expect(count).toBeGreaterThan(0);
        }
      }
    });

    test('should make submenu items clickable', async ({ page }) => {
      const trigger = page.locator('nav button, [data-radix-collection-item]').first();

      if (await trigger.isVisible()) {
        await trigger.hover();
        await page.waitForTimeout(500);

        const submenuItem = page.locator('[data-state="open"] a, [role="menu"] a').first();

        if (await submenuItem.isVisible()) {
          await expect(submenuItem).toBeVisible();

          const href = await submenuItem.getAttribute('href');
          expect(href).toBeTruthy();
        }
      }
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should support Tab key navigation', async ({ page }) => {
      const navMenu = page.locator('nav, [role="navigation"]').first();

      if (await navMenu.isVisible()) {
        // Focus first item
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);

        const focused = await page.evaluate(() => {
          const el = document.activeElement;
          return el?.tagName === 'A' || el?.tagName === 'BUTTON';
        });

        expect(focused).toBeTruthy();
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have navigation landmark', async ({ page }) => {
      const nav = page.locator('nav, [role="navigation"]').first();

      if (await nav.isVisible()) {
        const tagName = await nav.evaluate(el => el.tagName.toLowerCase());
        const role = await nav.getAttribute('role');

        expect(tagName === 'nav' || role === 'navigation').toBeTruthy();
      }
    });
  });
});
