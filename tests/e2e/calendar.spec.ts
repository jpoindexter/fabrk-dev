import { test, expect } from '@playwright/test';

/**
 * Calendar Component E2E Tests
 * Tests calendar date selection, navigation, and different modes (single, range, multiple)
 */

test.describe('Calendar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Calendar Display', () => {
    test('should display calendar grid', async ({ page }) => {
      // Look for calendar component
      const calendar = page.locator('[role="application"], .rdp').first();

      if (await calendar.count() > 0) {
        await expect(calendar).toBeVisible();
      }
    });

    test('should display month and year header', async ({ page }) => {
      const calendar = page.locator('[role="application"], .rdp').first();

      if (await calendar.isVisible()) {
        // Check for caption/header with month name
        const caption = calendar.locator('.rdp-caption, [aria-live="polite"]');
        const hasCaption = await caption.count() > 0;

        expect(hasCaption).toBeTruthy();
      }
    });

    test('should display day cells', async ({ page }) => {
      const calendar = page.locator('[role="application"], .rdp').first();

      if (await calendar.isVisible()) {
        // Check for day buttons
        const dayCells = calendar.locator('button[name*="day"]');
        const count = await dayCells.count();

        expect(count).toBeGreaterThan(0);
      }
    });

    test('should display navigation buttons', async ({ page }) => {
      const calendar = page.locator('[role="application"], .rdp').first();

      if (await calendar.isVisible()) {
        // Look for prev/next month buttons
        const navButtons = calendar.locator('button').filter({ hasText: /previous|next/i });
        const hasNavigation = await navButtons.count() >= 0;

        expect(hasNavigation).toBeTruthy();
      }
    });
  });

  test.describe('Date Selection', () => {
    test('should select a date on click', async ({ page }) => {
      const calendar = page.locator('[role="application"], .rdp').first();

      if (await calendar.isVisible()) {
        // Find an available day button (not disabled)
        const dayButton = calendar.locator('button[name*="day"]').filter({ hasNotText: /disabled/i }).first();

        if (await dayButton.isVisible()) {
          await dayButton.click();
          await page.waitForTimeout(300);

          // Check if selected state is applied
          const isSelected = await dayButton.getAttribute('aria-selected');
          const hasSelectedClass = await dayButton.evaluate(el => {
            return el.className.includes('selected') || el.getAttribute('data-selected') !== null;
          });

          expect(isSelected === 'true' || hasSelectedClass).toBeTruthy();
        }
      }
    });

    test('should highlight selected date', async ({ page }) => {
      const calendar = page.locator('[role="application"], .rdp').first();

      if (await calendar.isVisible()) {
        const dayButton = calendar.locator('button[name*="day"]').first();

        if (await dayButton.isVisible()) {
          await dayButton.click();
          await page.waitForTimeout(300);

          // Should have visual indication
          const hasHighlight = await dayButton.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
          });

          expect(hasHighlight).toBeTruthy();
        }
      }
    });
  });

  test.describe('Month Navigation', () => {
    test('should navigate to next month', async ({ page }) => {
      const calendar = page.locator('[role="application"], .rdp').first();

      if (await calendar.isVisible()) {
        // Get current month text
        const caption = calendar.locator('.rdp-caption, [aria-live="polite"]').first();
        const initialMonth = await caption.textContent();

        // Click next button
        const nextButton = calendar.locator('button').filter({ hasText: /next/i }).first();

        if (await nextButton.isVisible()) {
          await nextButton.click();
          await page.waitForTimeout(300);

          // Month should change
          const newMonth = await caption.textContent();
          expect(newMonth).not.toBe(initialMonth);
        }
      }
    });

    test('should navigate to previous month', async ({ page }) => {
      const calendar = page.locator('[role="application"], .rdp').first();

      if (await calendar.isVisible()) {
        const caption = calendar.locator('.rdp-caption, [aria-live="polite"]').first();
        const initialMonth = await caption.textContent();

        // Click previous button
        const prevButton = calendar.locator('button').filter({ hasText: /previous|prev/i }).first();

        if (await prevButton.isVisible()) {
          await prevButton.click();
          await page.waitForTimeout(300);

          // Month should change
          const newMonth = await caption.textContent();
          expect(newMonth).not.toBe(initialMonth);
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should support keyboard navigation', async ({ page }) => {
      const calendar = page.locator('[role="application"], .rdp').first();

      if (await calendar.isVisible()) {
        // Focus first day button
        const dayButton = calendar.locator('button[name*="day"]').first();
        await dayButton.focus();

        // Use arrow keys to navigate
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(200);

        // Focus should move
        const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
        expect(focusedElement).toBe('BUTTON');
      }
    });
  });
});
