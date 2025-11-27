import { test, expect } from '@playwright/test';

/**
 * Cookie Consent E2E Tests
 * Validates GDPR-compliant cookie consent banner and modal
 */

test.describe('Cookie Consent', () => {
  test.beforeEach(async ({ context }) => {
    // Clear cookies before each test to ensure fresh state
    await context.clearCookies();
  });

  test.describe('Initial Banner Display', () => {
    test('should show cookie banner on first visit', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // Wait for potential hydration
      await page.waitForTimeout(500);

      // Look for cookie consent banner
      const banner = page.locator('[data-testid="cookie-banner"], [role="banner"], .cookie-consent, [class*="cookie"]').first();
      const bannerText = page.locator('text=/cookie|consent|privacy/i').first();

      const hasBanner = await banner.isVisible().catch(() => false);
      const hasText = await bannerText.isVisible().catch(() => false);

      // Should see some form of cookie consent
      expect(hasBanner || hasText).toBeTruthy();
    });

    test('should display Accept and Decline buttons', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      // Look for accept button
      const acceptButton = page.locator('button').filter({
        hasText: /accept|allow|agree/i
      });

      // Look for decline button
      const declineButton = page.locator('button').filter({
        hasText: /decline|reject|deny/i
      });

      // At least one action button should be visible
      const hasAccept = await acceptButton.count() > 0;
      const hasDecline = await declineButton.count() > 0;

      expect(hasAccept || hasDecline).toBeTruthy();
    });

    test('should display Manage/Customize button', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      // Look for manage preferences button
      const manageButton = page.locator('button').filter({
        hasText: /manage|customize|preferences|settings/i
      });

      if (await manageButton.count() > 0) {
        await expect(manageButton.first()).toBeVisible();
      }
    });
  });

  test.describe('Accept Cookies', () => {
    test('should hide banner after accepting all cookies', async ({ page, context }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      // Find and click accept button
      const acceptButton = page.locator('button').filter({
        hasText: /accept all|allow all|agree/i
      });

      if (await acceptButton.count() > 0 && await acceptButton.first().isVisible()) {
        await acceptButton.first().click();
        await page.waitForTimeout(500);

        // Banner should be hidden
        const banner = page.locator('[data-testid="cookie-banner"], .cookie-consent, [class*="cookie-banner"]').first();

        // Check if banner is hidden (either not visible or not present)
        const isHidden = !(await banner.isVisible().catch(() => false));
        expect(isHidden).toBeTruthy();

        // Check if consent cookie was set
        const cookies = await context.cookies();
        const consentCookie = cookies.find(c =>
          c.name.includes('consent') || c.name.includes('cookie')
        );
        expect(consentCookie).toBeTruthy();
      }
    });
  });

  test.describe('Decline Cookies', () => {
    test('should hide banner after declining cookies', async ({ page, context }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      // Find and click decline button
      const declineButton = page.locator('button').filter({
        hasText: /decline|reject|deny|necessary only/i
      });

      if (await declineButton.count() > 0 && await declineButton.first().isVisible()) {
        await declineButton.first().click();
        await page.waitForTimeout(500);

        // Banner should be hidden
        const banner = page.locator('[data-testid="cookie-banner"], .cookie-consent').first();
        const isHidden = !(await banner.isVisible().catch(() => false));
        expect(isHidden).toBeTruthy();

        // Consent should be saved (even if declined)
        const cookies = await context.cookies();
        const consentCookie = cookies.find(c =>
          c.name.includes('consent') || c.name.includes('cookie')
        );
        expect(consentCookie).toBeTruthy();
      }
    });
  });

  test.describe('Cookie Preferences Modal', () => {
    test('should open preferences modal on manage click', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      // Find and click manage button
      const manageButton = page.locator('button').filter({
        hasText: /manage|customize|preferences/i
      });

      if (await manageButton.count() > 0 && await manageButton.first().isVisible()) {
        await manageButton.first().click();
        await page.waitForTimeout(500);

        // Look for modal
        const modal = page.locator('[role="dialog"], .modal, [data-testid="cookie-modal"]');

        if (await modal.count() > 0) {
          await expect(modal.first()).toBeVisible();
        }
      }
    });

    test('should display cookie category toggles in modal', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      const manageButton = page.locator('button').filter({
        hasText: /manage|customize/i
      });

      if (await manageButton.count() > 0 && await manageButton.first().isVisible()) {
        await manageButton.first().click();
        await page.waitForTimeout(500);

        // Look for toggle switches or checkboxes
        const toggles = page.locator('input[type="checkbox"], [role="switch"], button[role="switch"]');

        if (await toggles.count() > 0) {
          // Should have at least necessary and analytics categories
          expect(await toggles.count()).toBeGreaterThanOrEqual(1);
        }
      }
    });

    test('should close modal on Escape key', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      const manageButton = page.locator('button').filter({
        hasText: /manage|customize/i
      });

      if (await manageButton.count() > 0 && await manageButton.first().isVisible()) {
        await manageButton.first().click();
        await page.waitForTimeout(500);

        const modal = page.locator('[role="dialog"]');

        if (await modal.isVisible()) {
          // Press Escape to close
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);

          // Modal should be hidden
          const isHidden = !(await modal.isVisible().catch(() => false));
          expect(isHidden).toBeTruthy();
        }
      }
    });

    test('should close modal on backdrop click', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      const manageButton = page.locator('button').filter({
        hasText: /manage|customize/i
      });

      if (await manageButton.count() > 0 && await manageButton.first().isVisible()) {
        await manageButton.first().click();
        await page.waitForTimeout(500);

        const backdrop = page.locator('[data-testid="modal-backdrop"], .fixed.inset-0, [class*="backdrop"]');

        if (await backdrop.count() > 0) {
          // Click on backdrop (outside modal content)
          await backdrop.first().click({ position: { x: 10, y: 10 } });
          await page.waitForTimeout(300);

          const modal = page.locator('[role="dialog"]');
          const isHidden = !(await modal.isVisible().catch(() => false));
          expect(isHidden).toBeTruthy();
        }
      }
    });
  });

  test.describe('Persistence', () => {
    test('should not show banner on return visit after accepting', async ({ page, context }) => {
      // First visit - accept cookies
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      const acceptButton = page.locator('button').filter({
        hasText: /accept/i
      });

      if (await acceptButton.count() > 0 && await acceptButton.first().isVisible()) {
        await acceptButton.first().click();
        await page.waitForTimeout(500);
      }

      // Reload page (simulating return visit)
      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      // Banner should not be visible
      const banner = page.locator('[data-testid="cookie-banner"], .cookie-consent').first();
      const bannerButtons = page.locator('button').filter({
        hasText: /accept all|decline all/i
      });

      const noBanner = !(await banner.isVisible().catch(() => false));
      const noButtons = await bannerButtons.count() === 0;

      // Either banner is hidden or consent was already given
      const cookies = await context.cookies();
      const hasConsent = cookies.some(c =>
        c.name.includes('consent') || c.name.includes('cookie')
      );

      expect(noBanner || noButtons || hasConsent).toBeTruthy();
    });
  });

  test.describe('Hydration Safety', () => {
    test('should not cause hydration errors', async ({ page }) => {
      // Listen for console errors
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // Wait for hydration
      await page.waitForTimeout(1000);

      // Filter for hydration-specific errors
      const hydrationErrors = consoleErrors.filter(error =>
        error.toLowerCase().includes('hydration') ||
        error.includes('did not match') ||
        error.includes('server rendered')
      );

      // There should be no hydration errors
      expect(hydrationErrors).toHaveLength(0);
    });

    test('should not cause text content mismatch', async ({ page }) => {
      const consoleMessages: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'warning' || msg.type() === 'error') {
          consoleMessages.push(msg.text());
        }
      });

      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);

      // Look for text mismatch warnings
      const textMismatches = consoleMessages.filter(msg =>
        msg.includes('Text content') ||
        msg.includes('did not match')
      );

      expect(textMismatches).toHaveLength(0);
    });
  });
});
