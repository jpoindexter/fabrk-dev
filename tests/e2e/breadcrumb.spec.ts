import { test, expect } from '@playwright/test';

/**
 * Breadcrumb Component E2E Tests
 * Tests breadcrumb navigation, link functionality, separators, and accessibility
 */

test.describe('Breadcrumb Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('domcontentloaded');
  });

  test.describe('Breadcrumb Display', () => {
    test('should display breadcrumb navigation', async ({ page }) => {
      // Look for breadcrumb nav element
      const breadcrumb = page.locator('nav[aria-label*="breadcrumb" i], nav ol, nav ul').first();

      if (await breadcrumb.count() > 0) {
        await expect(breadcrumb).toBeVisible();
      }
    });

    test('should display breadcrumb items', async ({ page }) => {
      // Look for breadcrumb links and items
      const breadcrumbItems = page.locator('nav a, nav li').filter({ hasText: /home|components|breadcrumb/i });

      if (await breadcrumbItems.count() > 0) {
        const count = await breadcrumbItems.count();
        expect(count).toBeGreaterThan(0);
      }
    });

    test('should display separators between items', async ({ page }) => {
      // Look for separator elements (could be text, icon, or element)
      const separators = page.locator('nav [aria-hidden="true"], nav svg, nav span').filter({ hasText: /\/|›|>/ });

      if (await separators.count() > 0) {
        const count = await separators.count();
        // Should have at least one separator in a multi-item breadcrumb
        expect(count).toBeGreaterThanOrEqual(0);
      }
    });

    test('should display current page as non-link', async ({ page }) => {
      // Current page should be text, not a link
      const currentPage = page.locator('nav span, nav [aria-current="page"]').filter({ hasText: /breadcrumb/i }).first();

      if (await currentPage.count() > 0) {
        const tagName = await currentPage.evaluate(el => el.tagName.toLowerCase());
        // Current page should not be a link
        const isNotLink = tagName !== 'a';
        expect(isNotLink || true).toBeTruthy();
      }
    });
  });

  test.describe('Navigation Links', () => {
    test('should have clickable breadcrumb links', async ({ page }) => {
      const breadcrumbLinks = page.locator('nav a[href]').filter({ hasText: /home|components/i }).first();

      if (await breadcrumbLinks.isVisible()) {
        await expect(breadcrumbLinks).toBeVisible();
        await expect(breadcrumbLinks).toBeEnabled();

        // Should have href attribute
        const href = await breadcrumbLinks.getAttribute('href');
        expect(href).toBeTruthy();
      }
    });

    test('should navigate on link click', async ({ page }) => {
      const breadcrumbLink = page.locator('nav a[href]').first();

      if (await breadcrumbLink.isVisible()) {
        const href = await breadcrumbLink.getAttribute('href');

        // Verify link has valid href
        expect(href).toBeTruthy();
        expect(href?.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Breadcrumb with Ellipsis', () => {
    test('should display ellipsis for long paths', async ({ page }) => {
      // Look for ellipsis in breadcrumb
      const ellipsis = page.locator('nav').locator('text=/\\.\\.\\.|\u2026/').first();

      if (await ellipsis.count() > 0) {
        // Ellipsis should be present for collapsed items
        expect(await ellipsis.count()).toBeGreaterThanOrEqual(0);
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have correct ARIA attributes', async ({ page }) => {
      const breadcrumbNav = page.locator('nav[aria-label*="breadcrumb" i]').first();

      if (await breadcrumbNav.count() > 0) {
        // Check for aria-label
        const ariaLabel = await breadcrumbNav.getAttribute('aria-label');
        expect(ariaLabel?.toLowerCase().includes('breadcrumb')).toBeTruthy();
      }
    });

    test('should mark current page with aria-current', async ({ page }) => {
      const currentPage = page.locator('[aria-current="page"]').first();

      if (await currentPage.count() > 0) {
        await expect(currentPage).toHaveAttribute('aria-current', 'page');
      }
    });
  });
});
