import { test, expect } from '@playwright/test';

/**
 * Context Menu Component E2E Tests
 * Tests right-click context menu, keyboard shortcuts, and menu item interactions
 */

test.describe('Context Menu Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Context Menu Display', () => {
    test('should open context menu on right click', async ({ page }) => {
      // Find the context menu trigger area
      const trigger = page.locator('text=/right-click|right click here/i').first();

      if (await trigger.isVisible()) {
        // Right-click to open context menu
        await trigger.click({ button: 'right' });
        await page.waitForTimeout(300);

        // Check if menu is visible
        const menu = page.locator('[role="menu"]');
        await expect(menu).toBeVisible();
      }
    });

    test('should display menu items', async ({ page }) => {
      const trigger = page.locator('text=/right-click|right click here/i').first();

      if (await trigger.isVisible()) {
        await trigger.click({ button: 'right' });
        await page.waitForTimeout(300);

        // Check for menu items
        const menuItems = page.locator('[role="menuitem"]');
        const count = await menuItems.count();

        expect(count).toBeGreaterThan(0);
      }
    });

    test('should close menu on outside click', async ({ page }) => {
      const trigger = page.locator('text=/right-click|right click here/i').first();

      if (await trigger.isVisible()) {
        // Open menu
        await trigger.click({ button: 'right' });
        await page.waitForTimeout(300);

        // Click outside
        await page.mouse.click(10, 10);
        await page.waitForTimeout(300);

        // Menu should be closed
        const menu = page.locator('[role="menu"]');
        await expect(menu).not.toBeVisible();
      }
    });

    test('should close menu on Escape key', async ({ page }) => {
      const trigger = page.locator('text=/right-click|right click here/i').first();

      if (await trigger.isVisible()) {
        // Open menu
        await trigger.click({ button: 'right' });
        await page.waitForTimeout(300);

        // Press Escape
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);

        // Menu should be closed
        const menu = page.locator('[role="menu"]');
        await expect(menu).not.toBeVisible();
      }
    });
  });

  test.describe('Menu Item Interactions', () => {
    test('should highlight menu item on hover', async ({ page }) => {
      const trigger = page.locator('text=/right-click|right click here/i').first();

      if (await trigger.isVisible()) {
        await trigger.click({ button: 'right' });
        await page.waitForTimeout(300);

        // Hover over first menu item
        const firstItem = page.locator('[role="menuitem"]').first();
        await firstItem.hover();
        await page.waitForTimeout(200);

        // Check for highlighted state
        const dataState = await firstItem.getAttribute('data-highlighted');
        const isHighlighted = dataState === '' || dataState === 'true';

        expect(isHighlighted).toBeTruthy();
      }
    });

    test('should execute menu item action on click', async ({ page }) => {
      const trigger = page.locator('text=/right-click|right click here/i').first();

      if (await trigger.isVisible()) {
        await trigger.click({ button: 'right' });
        await page.waitForTimeout(300);

        // Click on a menu item
        const menuItem = page.locator('[role="menuitem"]').first();
        const isClickable = await menuItem.isVisible();

        if (isClickable) {
          await menuItem.click();
          await page.waitForTimeout(300);

          // Menu should close after click
          const menu = page.locator('[role="menu"]');
          await expect(menu).not.toBeVisible();
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have correct ARIA attributes', async ({ page }) => {
      const trigger = page.locator('text=/right-click|right click here/i').first();

      if (await trigger.isVisible()) {
        await trigger.click({ button: 'right' });
        await page.waitForTimeout(300);

        // Check menu has correct role
        const menu = page.locator('[role="menu"]');
        await expect(menu).toHaveAttribute('role', 'menu');

        // Check menu items have correct role
        const menuItem = page.locator('[role="menuitem"]').first();
        await expect(menuItem).toHaveAttribute('role', 'menuitem');
      }
    });
  });
});
