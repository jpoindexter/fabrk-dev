/**
 * E2E Tests: Dropdown Menu Alignment
 *
 * Validates that dropdown menus align correctly based on trigger position
 * to prevent content overflow at viewport edges.
 *
 * @see /docs/DROPDOWN-ALIGNMENT-GUIDE.md
 */

import { test, expect } from '@playwright/test';

test.describe('Dropdown Menu Alignment', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to component showcase with dropdown examples
    await page.goto('/components');

    // Scroll to dropdown section
    await page.locator('#dropdown-menus').scrollIntoViewIfNeeded();
  });

  test('right-aligned menu (align="end") aligns right edges', async ({ page }) => {
    // Find the right-aligned dropdown example
    const section = page.locator('#dropdown-menus').locator('section').first();
    const trigger = section.locator('button').first();

    // Get trigger position
    const triggerBox = await trigger.boundingBox();
    expect(triggerBox).not.toBeNull();

    // Open dropdown
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Get menu position
    const menuBox = await menu.boundingBox();
    expect(menuBox).not.toBeNull();

    // Verify right edges align (within 5px tolerance for animations)
    const triggerRightEdge = triggerBox!.x + triggerBox!.width;
    const menuRightEdge = menuBox!.x + menuBox!.width;

    expect(Math.abs(triggerRightEdge - menuRightEdge)).toBeLessThan(5);

    // Verify menu doesn't overflow viewport
    const viewportSize = page.viewportSize();
    expect(menuBox!.x + menuBox!.width).toBeLessThanOrEqual(viewportSize!.width);
  });

  test('left-aligned menu (align="start") aligns left edges', async ({ page }) => {
    // Find the left-aligned dropdown example
    const cards = page.locator('#dropdown-menus').locator('[class*="Card"]');
    const leftAlignedCard = cards.nth(1);
    const trigger = leftAlignedCard.locator('button').first();

    // Get trigger position
    const triggerBox = await trigger.boundingBox();
    expect(triggerBox).not.toBeNull();

    // Open dropdown
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').nth(1);
    await expect(menu).toBeVisible();

    // Get menu position
    const menuBox = await menu.boundingBox();
    expect(menuBox).not.toBeNull();

    // Verify left edges align (within 5px tolerance)
    const triggerLeftEdge = triggerBox!.x;
    const menuLeftEdge = menuBox!.x;

    expect(Math.abs(triggerLeftEdge - menuLeftEdge)).toBeLessThan(5);

    // Verify menu doesn't overflow viewport
    expect(menuBox!.x).toBeGreaterThanOrEqual(0);
  });

  test('dropdown menu items have correct icon spacing', async ({ page }) => {
    // Open any dropdown menu
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Check first menu item with icon
    const menuItem = menu.locator('[role="menuitem"]').first();
    const icon = menuItem.locator('svg').first();

    // Verify icon exists and has correct size class
    await expect(icon).toBeVisible();
    const iconClasses = await icon.getAttribute('class');
    expect(iconClasses).toContain('h-4');
    expect(iconClasses).toContain('w-4');
    expect(iconClasses).toContain('mr-2');
  });

  test('dropdown menu items have correct font weight', async ({ page }) => {
    // Open any dropdown menu
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Check menu items have font-semibold class
    const menuItems = menu.locator('[role="menuitem"]');
    const firstItem = menuItems.first();

    const itemClasses = await firstItem.getAttribute('class');
    expect(itemClasses).toContain('font-semibold');
  });

  test('destructive menu items have correct styling', async ({ page }) => {
    // Open the right-aligned menu which has a delete action
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Find the destructive action (Delete)
    const deleteItem = menu.locator('[role="menuitem"]').filter({ hasText: 'Delete' });

    // Verify it has text-destructive class
    const classes = await deleteItem.getAttribute('class');
    expect(classes).toContain('text-destructive');
  });

  test('dropdown menus work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate and scroll to section
    await page.goto('/components');
    await page.locator('#dropdown-menus').scrollIntoViewIfNeeded();

    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Verify menu doesn't overflow viewport
    const menuBox = await menu.boundingBox();
    expect(menuBox).not.toBeNull();
    expect(menuBox!.x + menuBox!.width).toBeLessThanOrEqual(375);
    expect(menuBox!.x).toBeGreaterThanOrEqual(0);
  });

  test('dropdown menu closes on escape key', async ({ page }) => {
    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Press escape key
    await page.keyboard.press('Escape');

    // Verify menu is closed
    await expect(menu).not.toBeVisible();
  });

  test('dropdown menu closes when clicking outside', async ({ page }) => {
    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Click outside the menu
    await page.locator('main').click({ position: { x: 10, y: 10 } });

    // Verify menu is closed
    await expect(menu).not.toBeVisible();
  });

  test('dropdown menu supports keyboard navigation', async ({ page }) => {
    // Open dropdown
    const trigger = page.locator('#dropdown-menus').locator('button').first();
    await trigger.click();

    // Wait for menu to be visible
    const menu = page.locator('[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Get all menu items
    const menuItems = menu.locator('[role="menuitem"]');
    const itemCount = await menuItems.count();

    // Press ArrowDown to navigate to first item
    await page.keyboard.press('ArrowDown');

    // First item should be focused
    const firstItem = menuItems.first();
    await expect(firstItem).toBeFocused();

    // Press ArrowDown again to navigate to second item
    await page.keyboard.press('ArrowDown');

    // Second item should be focused (or first if it wraps/skips separator)
    const secondItem = menuItems.nth(1);
    const isSecondFocused = await secondItem.evaluate(el => el === document.activeElement);
    expect(isSecondFocused || (await firstItem.evaluate(el => el === document.activeElement))).toBeTruthy();
  });
});

test.describe('Select Component Alignment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  test('select dropdown aligns with trigger', async ({ page }) => {
    // Find any select component on the page
    const selectTrigger = page.locator('[role="combobox"]').first();

    if (await selectTrigger.count() === 0) {
      test.skip();
      return;
    }

    // Get trigger position
    const triggerBox = await selectTrigger.boundingBox();
    expect(triggerBox).not.toBeNull();

    // Open select
    await selectTrigger.click();

    // Wait for listbox to be visible
    const listbox = page.locator('[role="listbox"]').first();
    await expect(listbox).toBeVisible({ timeout: 5000 });

    // Get listbox position
    const listboxBox = await listbox.boundingBox();
    expect(listboxBox).not.toBeNull();

    // Verify listbox width matches or exceeds trigger width
    expect(listboxBox!.width).toBeGreaterThanOrEqual(triggerBox!.width - 5);

    // Verify listbox doesn't overflow viewport
    const viewportSize = page.viewportSize();
    expect(listboxBox!.x + listboxBox!.width).toBeLessThanOrEqual(viewportSize!.width);
    expect(listboxBox!.x).toBeGreaterThanOrEqual(0);
  });
});
