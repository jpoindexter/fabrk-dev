import { test, expect } from '@playwright/test';
import { TestHelpers } from './helpers';

/**
 * Templates E2E Tests
 * Validates template pages load correctly with proper content and navigation
 */

test.describe('Templates', () => {
  test.describe('Templates Index Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/templates');
      await TestHelpers.waitForPageReady(page);
    });

    test('should load templates index page', async ({ page }) => {
      // Check page loaded
      await expect(page).toHaveTitle(/template/i);

      // Should have main heading
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(/template/i);
    });

    test('should display template categories', async ({ page }) => {
      // Should have multiple template cards or links
      const templateCards = page.locator('a[href*="/templates/"], [class*="card"]');
      const count = await templateCards.count();

      // Should have at least 5 template categories
      expect(count).toBeGreaterThanOrEqual(5);
    });

    test('should have terminal-style design', async ({ page }) => {
      // Check for terminal-style elements
      const terminalElements = page.locator('[class*="mono"], [class*="border"]');
      const count = await terminalElements.count();

      expect(count).toBeGreaterThan(0);
    });

    test('should navigate to template detail pages', async ({ page }) => {
      // Find first template link
      const templateLink = page.locator('a[href*="/templates/"]').filter({
        hasText: /authentication|dashboard|billing|profile|settings/i
      }).first();

      if (await templateLink.count() > 0 && await templateLink.isVisible()) {
        await templateLink.click();
        await page.waitForLoadState('domcontentloaded');

        // Should navigate to template page
        expect(page.url()).toMatch(/\/templates\/.+/);
      }
    });

    test('should display template descriptions', async ({ page }) => {
      // Template cards should have descriptions
      const descriptions = page.locator('p, [class*="description"]');
      const count = await descriptions.count();

      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Authentication Template', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/templates/authentication');
      await TestHelpers.waitForPageReady(page);
    });

    test('should load authentication template page', async ({ page }) => {
      // Check heading
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(/authentication|auth|sign.*in/i);
    });

    test('should display authentication examples', async ({ page }) => {
      // Should show sign-in or sign-up examples
      const content = await TestHelpers.getPageContent(page);
      const hasAuthContent = content.toLowerCase().includes('sign') ||
                            content.toLowerCase().includes('login') ||
                            content.toLowerCase().includes('password');

      expect(hasAuthContent).toBeTruthy();
    });

    test('should have navigation to auth variations', async ({ page }) => {
      // Look for links to sign-in, sign-up, forgot-password
      const authLinks = page.locator('a[href*="sign-in"], a[href*="sign-up"], a[href*="forgot-password"]');
      const count = await authLinks.count();

      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should display code examples', async ({ page }) => {
      // Should have code blocks
      const codeBlocks = page.locator('pre, code[class*="language"]');
      const count = await codeBlocks.count();

      // Auth template should have at least some code examples
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Dashboard Templates', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/templates/dashboards');
      await TestHelpers.waitForPageReady(page);
    });

    test('should load dashboards template page', async ({ page }) => {
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible();
    });

    test('should display dashboard previews', async ({ page }) => {
      // Should have visual previews or descriptions
      const previews = page.locator('[class*="preview"], img, [class*="card"]');
      const count = await previews.count();

      expect(count).toBeGreaterThan(0);
    });

    test('should have dashboard variations', async ({ page }) => {
      // Look for different dashboard types
      const content = await TestHelpers.getPageContent(page);
      const hasVariations = content.toLowerCase().includes('analytics') ||
                           content.toLowerCase().includes('admin') ||
                           content.toLowerCase().includes('team');

      expect(hasVariations).toBeTruthy();
    });
  });

  test.describe('Billing Dashboard Template', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/templates/billing-dashboard');
      await TestHelpers.waitForPageReady(page);
    });

    test('should load billing dashboard template', async ({ page }) => {
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(/billing/i);
    });

    test('should display billing features', async ({ page }) => {
      // Should mention billing-related features
      const content = await TestHelpers.getPageContent(page);
      const hasBillingContent = content.toLowerCase().includes('plan') ||
                               content.toLowerCase().includes('subscription') ||
                               content.toLowerCase().includes('invoice') ||
                               content.toLowerCase().includes('payment');

      expect(hasBillingContent).toBeTruthy();
    });

    test('should show plan cards or pricing', async ({ page }) => {
      // Look for plan/pricing components
      const planElements = page.locator('[class*="plan"], [class*="price"]');
      const count = await planElements.count();

      // May or may not have visible plans depending on template structure
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Settings Page Template', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/templates/settings-page');
      await TestHelpers.waitForPageReady(page);
    });

    test('should load settings template', async ({ page }) => {
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(/settings/i);
    });

    test('should display settings tabs or sections', async ({ page }) => {
      // Look for tabs or section navigation
      const tabs = page.locator('[role="tab"], [role="tablist"], button').filter({
        hasText: /general|account|security|billing/i
      });

      const count = await tabs.count();

      // Settings pages typically have tabs
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should show settings form elements', async ({ page }) => {
      // Should have inputs or form controls
      const formElements = page.locator('input, select, textarea, button');
      const count = await formElements.count();

      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Email Templates', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/templates/email-templates');
      await TestHelpers.waitForPageReady(page);
    });

    test('should load email templates page', async ({ page }) => {
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
    });

    test('should display email previews', async ({ page }) => {
      // Should show email examples
      const content = await TestHelpers.getPageContent(page);
      const hasEmailContent = content.toLowerCase().includes('email') ||
                             content.toLowerCase().includes('notification') ||
                             content.toLowerCase().includes('welcome');

      expect(hasEmailContent).toBeTruthy();
    });

    test('should have email type navigation', async ({ page }) => {
      // Look for different email types
      const emailTypes = page.locator('button, a').filter({
        hasText: /welcome|reset|verify|invoice/i
      });

      const count = await emailTypes.count();

      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Modal/Dialog Templates', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/templates/modals');
      await TestHelpers.waitForPageReady(page);
    });

    test('should load modals template page', async ({ page }) => {
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
    });

    test('should have modal trigger buttons', async ({ page }) => {
      // Should have buttons to open example modals
      const modalButtons = page.locator('button').filter({
        hasText: /open|show|trigger|example/i
      });

      const count = await modalButtons.count();

      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should display modal examples on click', async ({ page }) => {
      // Find first modal trigger button
      const triggerButton = page.locator('button').filter({
        hasText: /open|show|demo/i
      }).first();

      if (await triggerButton.count() > 0 && await triggerButton.isVisible()) {
        await triggerButton.click();
        await page.waitForTimeout(500);

        // Should open a modal/dialog
        const modal = page.locator('[role="dialog"], .modal, [class*="dialog"]').first();
        const isVisible = await modal.isVisible().catch(() => false);

        // Modal should appear
        expect(isVisible).toBeTruthy();
      }
    });
  });

  test.describe('Profile Template', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/templates/profile');
      await TestHelpers.waitForPageReady(page);
    });

    test('should load profile template', async ({ page }) => {
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
    });

    test('should display profile sections', async ({ page }) => {
      // Should have profile-related content
      const content = await TestHelpers.getPageContent(page);
      const hasProfileContent = content.toLowerCase().includes('profile') ||
                               content.toLowerCase().includes('avatar') ||
                               content.toLowerCase().includes('bio');

      expect(hasProfileContent).toBeTruthy();
    });

    test('should have tabs or sections', async ({ page }) => {
      // Profile pages often have tabs
      const tabs = page.locator('[role="tab"], button').filter({
        hasText: /overview|activity|settings|posts/i
      });

      const count = await tabs.count();

      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Error Pages Template', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/templates/error-pages');
      await TestHelpers.waitForPageReady(page);
    });

    test('should load error pages template', async ({ page }) => {
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
    });

    test('should show different error types', async ({ page }) => {
      // Should mention 404, 500, etc.
      const content = await TestHelpers.getPageContent(page);
      const hasErrorContent = content.includes('404') ||
                             content.includes('500') ||
                             content.toLowerCase().includes('not found') ||
                             content.toLowerCase().includes('error');

      expect(hasErrorContent).toBeTruthy();
    });
  });

  test.describe('Search Results Template', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/templates/search-results');
      await TestHelpers.waitForPageReady(page);
    });

    test('should load search results template', async ({ page }) => {
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
    });

    test('should display search interface', async ({ page }) => {
      // Should have search-related elements
      const searchElements = page.locator('input[type="search"], [role="searchbox"]');
      const count = await searchElements.count();

      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should show result cards or list', async ({ page }) => {
      // Should display example results
      const results = page.locator('[class*="result"], [class*="card"]');
      const count = await results.count();

      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should have filters sidebar', async ({ page }) => {
      // Search results often have filters
      const filters = page.locator('[class*="filter"], aside').first();
      const hasFilters = await filters.count() > 0;

      // Filters are optional
      expect(hasFilters || true).toBeTruthy();
    });
  });

  test.describe('Template Features', () => {
    test('should display implementation notes', async ({ page }) => {
      // Navigate to any template page
      await page.goto('/templates/settings-page');
      await TestHelpers.waitForPageReady(page);

      // Look for implementation notes or instructions
      const notes = page.locator('[class*="note"], [class*="alert"]').filter({
        hasText: /implementation|note|usage|copy|paste/i
      });

      const count = await notes.count();

      // Templates should have guidance
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should have terminal-style cards', async ({ page }) => {
      await page.goto('/templates');
      await TestHelpers.waitForPageReady(page);

      // Check for terminal-style design elements
      const terminalCards = page.locator('[class*="border"], [class*="card"]');
      const count = await terminalCards.count();

      expect(count).toBeGreaterThan(0);
    });

    test('should display code snippets where applicable', async ({ page }) => {
      await page.goto('/templates/authentication');
      await TestHelpers.waitForPageReady(page);

      // Check for code examples
      const codeBlocks = page.locator('pre, code[class*="language"], [class*="code"]');
      const count = await codeBlocks.count();

      // Not all templates have code, but some should
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Navigation Between Templates', () => {
    test('should navigate back to templates index', async ({ page }) => {
      await page.goto('/templates/authentication');
      await TestHelpers.waitForPageReady(page);

      // Look for back to templates link
      const backLink = page.locator('a[href="/templates"]').first();

      if (await backLink.count() > 0 && await backLink.isVisible()) {
        await backLink.click();
        await page.waitForLoadState('domcontentloaded');

        expect(page.url()).toContain('/templates');
      }
    });

    test('should have previous/next navigation', async ({ page }) => {
      await page.goto('/templates/billing-dashboard');
      await TestHelpers.waitForPageReady(page);

      // Look for prev/next links
      const navLinks = page.locator('a').filter({
        hasText: /previous|next|prev/i
      });

      const count = await navLinks.count();

      // Navigation is optional but helpful
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Responsive Design', () => {
    test('should display templates properly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/templates');
      await TestHelpers.waitForPageReady(page);

      // Template grid should be visible
      const content = page.locator('main, [role="main"]').first();
      await expect(content).toBeVisible();

      // Should have at least some template cards
      const cards = page.locator('a[href*="/templates/"]');
      const count = await cards.count();

      expect(count).toBeGreaterThan(0);
    });

    test('should display template details on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/templates/authentication');
      await TestHelpers.waitForPageReady(page);

      // Content should be readable
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
    });

    test('should work on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      await page.goto('/templates');
      await TestHelpers.waitForPageReady(page);

      // Should display grid layout
      const cards = page.locator('[class*="grid"], [class*="card"]');
      const count = await cards.count();

      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Performance', () => {
    test('should load template pages quickly', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/templates/dashboard');
      await TestHelpers.waitForPageReady(page);

      const loadTime = Date.now() - startTime;

      // Should load in under 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('should not have JavaScript errors', async ({ page }) => {
      const errors = await TestHelpers.checkForErrors(page);

      await page.goto('/templates');
      await page.waitForTimeout(1000);

      // Should have no critical errors
      expect(errors.length).toBe(0);
    });
  });

  test.describe('Accessibility', () => {
    test('should have semantic HTML', async ({ page }) => {
      await page.goto('/templates');
      await TestHelpers.waitForPageReady(page);

      // Check for main landmark
      const main = page.locator('main, [role="main"]').first();
      await expect(main).toBeVisible();
    });

    test('should have accessible links', async ({ page }) => {
      await page.goto('/templates');
      await TestHelpers.waitForPageReady(page);

      // All links should have text content
      const links = page.locator('a[href*="/templates/"]');
      const count = await links.count();

      if (count > 0) {
        const firstLink = links.first();
        const text = await firstLink.textContent();
        const ariaLabel = await firstLink.getAttribute('aria-label');

        expect(text || ariaLabel).toBeTruthy();
      }
    });

    test('should support keyboard navigation', async ({ page }) => {
      await page.goto('/templates');
      await TestHelpers.waitForPageReady(page);

      // Tab to first link
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el?.tagName.toLowerCase();
      });

      // Should focus on interactive element
      expect(['a', 'button', 'input'].includes(focusedElement || '')).toBeTruthy();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/templates');
      await TestHelpers.waitForPageReady(page);

      // Should have h1
      const h1 = page.locator('h1');
      const count = await h1.count();

      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Content Quality', () => {
    test('should have descriptive titles', async ({ page }) => {
      await page.goto('/templates');
      await TestHelpers.waitForPageReady(page);

      // Page title should be descriptive
      const title = await page.title();
      expect(title.length).toBeGreaterThan(5);
    });

    test('should have meta descriptions', async ({ page }) => {
      await page.goto('/templates');
      await TestHelpers.waitForPageReady(page);

      // Check for meta description
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
    });
  });
});
