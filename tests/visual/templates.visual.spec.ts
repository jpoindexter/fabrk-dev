import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Template Pages
 *
 * These tests capture full-page screenshots and compare them against baselines.
 * Run `npm run test:visual:update` to create/update baseline snapshots.
 */

const templatePages = [
  '/templates',
  '/templates/authentication',
  '/templates/authentication/sign-in',
  '/templates/authentication/sign-up',
  '/templates/authentication/forgot-password',
  '/templates/authentication/two-factor',
  '/templates/dashboards',
  '/templates/analytics-dashboard',
  '/templates/billing-dashboard',
  '/templates/team-dashboard',
  '/templates/pricing-page',
  '/templates/profile',
  '/templates/settings-page',
  '/templates/user-management',
  '/templates/security-privacy',
  '/templates/notifications',
  '/templates/onboarding',
  '/templates/modals',
  '/templates/empty-states',
  '/templates/error-pages',
  '/templates/blog',
  '/templates/blog/post',
  '/templates/email-templates',
  '/templates/marketing',
  '/templates/landing-variations',
  '/templates/chart-library',
  '/templates/search-results',
  '/templates/admin-panels',
  '/templates/account-pages',
  '/templates/documentation',
];

test.describe('Template Pages Visual Regression', () => {
  for (const url of templatePages) {
    test(`visual: ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      // Wait for any animations to complete
      await page.waitForTimeout(500);

      const screenshotName = `template${url.replace(/\//g, '-')}.png`;
      await expect(page).toHaveScreenshot(screenshotName, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});
