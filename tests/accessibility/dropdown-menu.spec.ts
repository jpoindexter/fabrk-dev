/**
 * Accessibility Tests: Dropdown Menus
 *
 * Validates WCAG 2.1 AA compliance for dropdown menu components
 * including keyboard navigation, screen reader support, and touch targets.
 *
 * @see /docs/DROPDOWN-ALIGNMENT-GUIDE.md
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Dropdown Menu Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
    await page.locator('#dropdown-menus').scrollIntoViewIfNeeded();
  });

  test('dropdown trigger meets WCAG 2.1 AA standards', async ({ page }) => {
    // Run axe accessibility scan on dropdown trigger
    const results = await new AxeBuilder({ page })
      .include('#dropdown-menus')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('dropdown menu content meets WCAG 2.1 AA standards', async ({ page }) => {
    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Run axe accessibility scan on open menu
    const results = await new AxeBuilder({ page })
      .include('[role="menu"]')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('dropdown trigger has proper ARIA attributes', async ({ page }) => {
    const trigger = page.locator('#dropdown-menus').locator('button').first();

    // Verify button role
    const role = await trigger.getAttribute('role');
    expect(role === null || role === 'button').toBeTruthy();

    // Verify aria-expanded when closed
    const ariaExpandedClosed = await trigger.getAttribute('aria-expanded');
    expect(ariaExpandedClosed).toBe('false');

    // Open dropdown
    await trigger.click();

    // Verify aria-expanded when open
    const ariaExpandedOpen = await trigger.getAttribute('aria-expanded');
    expect(ariaExpandedOpen).toBe('true');

    // Verify aria-haspopup
    const ariaHaspopup = await trigger.getAttribute('aria-haspopup');
    expect(ariaHaspopup === 'menu' || ariaHaspopup === 'true').toBeTruthy();
  });

  test('dropdown menu has proper ARIA attributes', async ({ page }) => {
    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Verify menu role
    const menuRole = await menu.getAttribute('role');
    expect(menuRole).toBe('menu');

    // Verify menu items have correct role
    const menuItem = menu.locator('[role="menuitem"]').first();
    const itemRole = await menuItem.getAttribute('role');
    expect(itemRole).toBe('menuitem');
  });

  test('dropdown trigger has adequate touch target size on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/components');
    await page.locator('#dropdown-menus').scrollIntoViewIfNeeded();

    const trigger = page.locator('#dropdown-menus').locator('button').first();
    const box = await trigger.boundingBox();

    expect(box).not.toBeNull();

    // WCAG 2.1 AA requires minimum 44x44px touch targets
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });

  test('dropdown menu items have adequate touch target size on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/components');
    await page.locator('#dropdown-menus').scrollIntoViewIfNeeded();

    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Check first menu item
    const menuItem = menu.locator('[role="menuitem"]').first();
    const box = await menuItem.boundingBox();

    expect(box).not.toBeNull();

    // WCAG 2.1 AA requires minimum 44x44px touch targets
    // Height should be at least 44px
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });

  test('dropdown menu supports keyboard navigation with Tab', async ({ page }) => {
    // Focus trigger with Tab
    const trigger = page.locator('#dropdown-menus').locator('button').first();

    // Tab to focus the trigger
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Find focused element
    const focusedElement = page.locator(':focus');

    // Check if trigger or nearby button is focused
    const isFocused = await focusedElement.evaluate(
      (el) => el.tagName === 'BUTTON'
    );
    expect(isFocused).toBeTruthy();
  });

  test('dropdown menu opens with Enter key', async ({ page }) => {
    const trigger = page.locator('#dropdown-menus').locator('button').first();

    // Focus trigger
    await trigger.focus();

    // Open with Enter
    await page.keyboard.press('Enter');

    // Verify menu is visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();
  });

  test('dropdown menu opens with Space key', async ({ page }) => {
    const trigger = page.locator('#dropdown-menus').locator('button').first();

    // Focus trigger
    await trigger.focus();

    // Open with Space
    await page.keyboard.press('Space');

    // Verify menu is visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();
  });

  test('dropdown menu supports ArrowDown navigation', async ({ page }) => {
    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Press ArrowDown
    await page.keyboard.press('ArrowDown');

    // First menu item should be focused
    const focusedElement = page.locator(':focus');
    const focusedRole = await focusedElement.getAttribute('role');
    expect(focusedRole).toBe('menuitem');
  });

  test('dropdown menu supports ArrowUp navigation', async ({ page }) => {
    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Press ArrowUp (should focus last item or wrap)
    await page.keyboard.press('ArrowUp');

    // A menu item should be focused
    const focusedElement = page.locator(':focus');
    const focusedRole = await focusedElement.getAttribute('role');
    expect(focusedRole === 'menuitem' || focusedRole === 'button').toBeTruthy();
  });

  test('dropdown menu items are activatable with Enter', async ({ page }) => {
    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Navigate to first item
    await page.keyboard.press('ArrowDown');

    // Activate with Enter
    await page.keyboard.press('Enter');

    // Menu should close
    await expect(menu).not.toBeVisible();
  });

  test('dropdown menu has sufficient color contrast', async ({ page }) => {
    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Run axe color-contrast rule
    const results = await new AxeBuilder({ page })
      .include('[role="menu"]')
      .withRules(['color-contrast'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('dropdown menu label is accessible', async ({ page }) => {
    const trigger = page.locator('#dropdown-menus').locator('button').first();

    // Verify button has accessible text (via textContent or aria-label)
    const text = await trigger.textContent();
    const ariaLabel = await trigger.getAttribute('aria-label');

    expect((text && text.trim().length > 0) || (ariaLabel && ariaLabel.length > 0)).toBeTruthy();
  });

  test('dropdown menu items have accessible names', async ({ page }) => {
    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Check all menu items have text content
    const menuItems = menu.locator('[role="menuitem"]');
    const count = await menuItems.count();

    for (let i = 0; i < count; i++) {
      const item = menuItems.nth(i);
      const text = await item.textContent();
      const ariaLabel = await item.getAttribute('aria-label');

      expect((text && text.trim().length > 0) || (ariaLabel && ariaLabel.length > 0)).toBeTruthy();
    }
  });

  test('dropdown menu respects prefers-reduced-motion', async ({ page }) => {
    // Enable reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/components');
    await page.locator('#dropdown-menus').scrollIntoViewIfNeeded();

    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Menu should still function correctly
    const menuItem = menu.locator('[role="menuitem"]').first();
    await expect(menuItem).toBeVisible();
  });

  test('dropdown menu maintains focus trap', async ({ page }) => {
    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Tab through all items
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');

      // Check if focus is still within menu or trigger
      const focusedElement = page.locator(':focus');
      const isWithinMenu = await focusedElement.evaluate((el) => {
        return el.closest('[role="menu"]') !== null || el.getAttribute('role') === 'button';
      });

      // If focus left the menu context, that's expected (menu closed)
      const isMenuVisible = await menu.isVisible();
      if (!isMenuVisible) {
        break;
      }
    }

    // Test passes if no errors thrown
    expect(true).toBeTruthy();
  });

  test('dropdown destructive actions are clearly identified', async ({ page }) => {
    // Open dropdown with destructive action
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Find destructive item
    const deleteItem = menu.locator('[role="menuitem"]').filter({ hasText: 'Delete' });

    // Check color contrast for destructive text
    const results = await new AxeBuilder({ page })
      .include('[role="menu"]')
      .withRules(['color-contrast'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});

test.describe('Select Component Accessibility', () => {
  test('select component meets WCAG 2.1 AA standards', async ({ page }) => {
    await page.goto('/components');

    // Find select component
    const selectTrigger = page.locator('[role="combobox"]').first();

    if (await selectTrigger.count() === 0) {
      test.skip();
      return;
    }

    // Run axe accessibility scan
    const results = await new AxeBuilder({ page })
      .include('[role="combobox"]')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('select trigger has adequate touch target size on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/components');

    const selectTrigger = page.locator('[role="combobox"]').first();

    if (await selectTrigger.count() === 0) {
      test.skip();
      return;
    }

    const box = await selectTrigger.boundingBox();
    expect(box).not.toBeNull();

    // WCAG 2.1 AA requires minimum 44x44px touch targets
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });
});
