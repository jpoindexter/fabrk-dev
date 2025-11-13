import { test, expect } from '@playwright/test';

/**
 * Command Component E2E Tests
 * Tests command palette search, keyboard navigation, and dialog interaction
 */

test.describe('Command Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Command Input and Search', () => {
    test('should display command input', async ({ page }) => {
      // Look for command input
      const commandInput = page.locator('input[placeholder*="command"], input[placeholder*="search"]').first();

      if (await commandInput.isVisible()) {
        await expect(commandInput).toBeVisible();
        await expect(commandInput).toBeEnabled();
      }
    });

    test('should filter items based on search input', async ({ page }) => {
      const commandInput = page.locator('input[placeholder*="command"], input[placeholder*="search"]').first();

      if (await commandInput.isVisible()) {
        // Type search query
        await commandInput.fill('calendar');
        await page.waitForTimeout(300);

        // Check if results are filtered
        const calendarItem = page.locator('[cmdk-item]').filter({ hasText: /calendar/i }).first();
        const isVisible = await calendarItem.isVisible();

        // Calendar item should be visible
        expect(isVisible).toBeTruthy();
      }
    });

    test('should show empty state when no results found', async ({ page }) => {
      const commandInput = page.locator('input[placeholder*="command"], input[placeholder*="search"]').first();

      if (await commandInput.isVisible()) {
        // Type query that won't match
        await commandInput.fill('xyznonexistent123');
        await page.waitForTimeout(300);

        // Check for empty state message
        const emptyMessage = page.locator('text=/no results/i, [cmdk-empty]').first();
        const isEmpty = await emptyMessage.isVisible();

        expect(isEmpty).toBeTruthy();
      }
    });
  });

  test.describe('Command Dialog', () => {
    test('should open command dialog on button click', async ({ page }) => {
      // Find button to open dialog
      const openButton = page.locator('button').filter({ hasText: /open command/i }).first();

      if (await openButton.isVisible()) {
        await openButton.click();
        await page.waitForTimeout(300);

        // Dialog should be visible
        const dialog = page.locator('[role="dialog"]');
        await expect(dialog).toBeVisible();
      }
    });

    test('should close dialog on Escape key', async ({ page }) => {
      const openButton = page.locator('button').filter({ hasText: /open command/i }).first();

      if (await openButton.isVisible()) {
        // Open dialog
        await openButton.click();
        await page.waitForTimeout(300);

        // Press Escape
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);

        // Dialog should be hidden
        const dialog = page.locator('[role="dialog"]');
        await expect(dialog).not.toBeVisible();
      }
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should navigate items with arrow keys', async ({ page }) => {
      const commandInput = page.locator('input[placeholder*="command"], input[placeholder*="search"]').first();

      if (await commandInput.isVisible()) {
        // Focus input
        await commandInput.click();

        // Press down arrow to select first item
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(200);

        // Check if an item has aria-selected
        const selectedItem = page.locator('[cmdk-item][aria-selected="true"]');
        const isSelected = await selectedItem.count() > 0;

        expect(isSelected).toBeTruthy();
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have correct ARIA attributes', async ({ page }) => {
      const commandInput = page.locator('input[placeholder*="command"]').first();

      if (await commandInput.isVisible()) {
        // Check input attributes
        const hasRole = await commandInput.getAttribute('role');
        const hasCombobox = hasRole === 'combobox' || (await commandInput.getAttribute('type')) === 'text';

        expect(hasCombobox).toBeTruthy();
      }
    });
  });
});
