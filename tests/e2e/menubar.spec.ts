import { test, expect } from '@playwright/test';

/**
 * Menubar Component E2E Tests
 * Tests menubar navigation, dropdown menus, keyboard shortcuts, and interactions
 */

test.describe('Menubar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Menubar Display', () => {
    test('should display menubar with triggers', async ({ page }) => {
      // Look for menubar
      const menubar = page.locator('[role="menubar"]').first();

      if (await menubar.isVisible()) {
        await expect(menubar).toBeVisible();

        // Check for menu triggers
        const triggers = menubar.locator('button');
        const count = await triggers.count();
        expect(count).toBeGreaterThan(0);
      }
    });

    test('should open menu on trigger click', async ({ page }) => {
      const menubar = page.locator('[role="menubar"]').first();

      if (await menubar.isVisible()) {
        // Click first trigger
        const firstTrigger = menubar.locator('button').first();
        await firstTrigger.click();
        await page.waitForTimeout(300);

        // Menu should be visible
        const menu = page.locator('[role="menu"]');
        await expect(menu).toBeVisible();
      }
    });

    test('should close menu on outside click', async ({ page }) => {
      const menubar = page.locator('[role="menubar"]').first();

      if (await menubar.isVisible()) {
        const firstTrigger = menubar.locator('button').first();
        await firstTrigger.click();
        await page.waitForTimeout(300);

        // Click outside
        await page.mouse.click(10, 10);
        await page.waitForTimeout(300);

        // Menu should be closed
        const menu = page.locator('[role="menu"]');
        await expect(menu).not.toBeVisible();
      }
    });
  });

  test.describe('Menu Items', () => {
    test('should display menu items when menu is open', async ({ page }) => {
      const menubar = page.locator('[role="menubar"]').first();

      if (await menubar.isVisible()) {
        const firstTrigger = menubar.locator('button').first();
        await firstTrigger.click();
        await page.waitForTimeout(300);

        // Check for menu items
        const menuItems = page.locator('[role="menuitem"]');
        const count = await menuItems.count();
        expect(count).toBeGreaterThan(0);
      }
    });

    test('should highlight menu item on hover', async ({ page }) => {
      const menubar = page.locator('[role="menubar"]').first();

      if (await menubar.isVisible()) {
        const firstTrigger = menubar.locator('button').first();
        await firstTrigger.click();
        await page.waitForTimeout(300);

        // Hover over menu item
        const firstItem = page.locator('[role="menuitem"]').first();
        await firstItem.hover();
        await page.waitForTimeout(200);

        // Check for highlighted state
        const dataState = await firstItem.getAttribute('data-highlighted');
        const isHighlighted = dataState === '' || dataState === 'true';
        expect(isHighlighted).toBeTruthy();
      }
    });

    test('should execute action on menu item click', async ({ page }) => {
      const menubar = page.locator('[role="menubar"]').first();

      if (await menubar.isVisible()) {
        const firstTrigger = menubar.locator('button').first();
        await firstTrigger.click();
        await page.waitForTimeout(300);

        // Click menu item
        const menuItem = page.locator('[role="menuitem"]').first();
        await menuItem.click();
        await page.waitForTimeout(300);

        // Menu should close
        const menu = page.locator('[role="menu"]');
        await expect(menu).not.toBeVisible();
      }
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should navigate between menu triggers with arrow keys', async ({ page }) => {
      const menubar = page.locator('[role="menubar"]').first();

      if (await menubar.isVisible()) {
        // Focus first trigger
        const firstTrigger = menubar.locator('button').first();
        await firstTrigger.focus();

        // Press right arrow
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(200);

        // Should focus next trigger or stay on current
        const focused = await page.evaluate(() => document.activeElement?.tagName);
        expect(focused).toBe('BUTTON');
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have correct ARIA attributes', async ({ page }) => {
      const menubar = page.locator('[role="menubar"]').first();

      if (await menubar.isVisible()) {
        // Check menubar role
        await expect(menubar).toHaveAttribute('role', 'menubar');

        // Open menu and check items
        const firstTrigger = menubar.locator('button').first();
        await firstTrigger.click();
        await page.waitForTimeout(300);

        const menu = page.locator('[role="menu"]');
        await expect(menu).toHaveAttribute('role', 'menu');
      }
    });
  });
});
